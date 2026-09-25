import "server-only";
import { chainFrom, complete, freeChain, usableChain, type Env, type Link } from "@bitbaum/ai-kit";
import type { CompleteFn } from "@bitbaum/ai-kit/forms";
import { AI_CONFIG, AI_MESSAGES } from "@/config/ai";

export type AiStatus = "configured" | "unconfigured";

/** The model chain this deployment can actually use: ai-kit's free chain
 * across vendors, minus every vendor with no key. Never a single pinned id. */
export function aiChain(env: Env = process.env): Link[] {
  return chainFrom(env[AI_CONFIG.modelEnv], usableChain(freeChain(AI_CONFIG.envPrefix), env));
}

/** Whether any model key is set. Reads the environment only — no network
 * call — so a health check can report it for free. */
export function aiStatus(env: Env = process.env): AiStatus {
  return aiChain(env).length > 0 ? "configured" : "unconfigured";
}

/**
 * The model caller ai-forms hands its prompt to. Walks the chain with
 * ai-kit's `complete()` (per-link deadline, the three kinds of 429, an empty
 * 200 treated as a failure). On failure it throws a sentence meant for the
 * person — never a vendor's response body, which is for the server log.
 */
export function modelCaller({ env = process.env, fetchImpl }: { env?: Env; fetchImpl?: typeof fetch } = {}): CompleteFn {
  return async ({ system, prompt, maxTokens, temperature }) => {
    const chain = aiChain(env);
    if (chain.length === 0) throw new Error(AI_MESSAGES.unconfigured);
    try {
      const { text } = await complete({
        chain,
        env,
        fetchImpl,
        maxTokens,
        temperature,
        timeoutMs: AI_CONFIG.timeoutMs,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      });
      return text;
    } catch (error) {
      console.error("form-assist: no model answered:", error instanceof Error ? error.message : error);
      throw new Error(AI_MESSAGES.failed);
    }
  };
}
