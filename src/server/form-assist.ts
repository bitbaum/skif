import "server-only";
import { createFormAssistHandler, type AuthorizeResult } from "@bitbaum/ai-kit/server";
import type { CompleteFn, FormTarget } from "@bitbaum/ai-kit/forms";
import { AI_MESSAGES } from "@/config/ai";
import { AI_FORMS } from "@/config/ai-forms";
import type { Result } from "@/domain/result";

export type FormAssistDeps = {
  /** The signed-in person's OIDC sub, or null. */
  signedIn: () => Promise<string | null>;
  configured: () => boolean;
  /** Count one attempt against the person's allowance. */
  limit: (sub: string) => Promise<Result<null>>;
  complete: CompleteFn;
  targets?: readonly FormTarget[];
};

const HISTORY_KEYS = ["role", "text"] as const;

/**
 * Rebuild the request body so only what the form registry declares can reach
 * a model: current values for the target's own fields, the person's own
 * turns, their instruction. Anything else a client sends — a `pageContext`,
 * a value for a field the form does not declare — is dropped here, because
 * location and incident data must never leave Skif, and the route must not be
 * a way to send arbitrary page text to a provider.
 */
export function narrowBody(body: unknown, targets: readonly FormTarget[]): unknown {
  if (body === null || typeof body !== "object" || Array.isArray(body)) return body;
  const raw = body as Record<string, unknown>;
  const target = targets.find((t) => t.key === raw.target);
  if (!target) return { target: raw.target };
  const declared = new Set(target.fields.filter((f) => !f.aiExcluded).map((f) => f.name));
  const values =
    raw.values && typeof raw.values === "object" && !Array.isArray(raw.values)
      ? Object.fromEntries(Object.entries(raw.values).filter(([name]) => declared.has(name)))
      : {};
  const history = Array.isArray(raw.history)
    ? raw.history.map((turn: unknown) =>
        turn && typeof turn === "object"
          ? Object.fromEntries(HISTORY_KEYS.map((k) => [k, (turn as Record<string, unknown>)[k]]))
          : turn,
      )
    : [];
  return { target: target.key, intent: raw.intent, instruction: raw.instruction, values, history };
}

/** The one form-assist endpoint. Order matters: who is asking, then whether
 * there is a model at all, then the rate limit — so an unconfigured deploy
 * never spends anyone's allowance, and nothing reaches a model unsigned. */
export function formAssistHandler(deps: FormAssistDeps): (request: Request) => Promise<Response> {
  const targets = deps.targets ?? AI_FORMS;
  const handle = createFormAssistHandler({
    targets,
    complete: deps.complete,
    messages: { unavailable: AI_MESSAGES.unavailable },
    authorize: async (): Promise<AuthorizeResult> => {
      const sub = await deps.signedIn();
      if (!sub) return { ok: false, status: 401, error: AI_MESSAGES.signIn };
      if (!deps.configured()) return { ok: false, status: 503, error: AI_MESSAGES.unconfigured };
      const limited = await deps.limit(sub);
      if (!limited.success) return { ok: false, status: 429, error: limited.error };
      return { ok: true };
    },
  });

  return async (request) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    return handle(
      new Request(request.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(narrowBody(body, targets)),
      }),
    );
  };
}
