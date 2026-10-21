import "server-only";
import { authConfig } from "@/config/auth";

/**
 * The ways a person can sign in to (or create) their account, read from
 * OrangeCat — the account provider — rather than typed here, so the sign-in
 * page cannot promise a method OrangeCat has switched off. Email is always
 * there; social providers come from OrangeCat's public provider list.
 */
const LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  apple: "Apple",
  facebook: "Facebook",
  x: "X",
  linkedin: "LinkedIn",
};

export const EMAIL_METHOD = "Email, with a password or a one-time code";

export async function signInMethods(): Promise<string[]> {
  const issuer = authConfig.orangecat?.issuer;
  if (!issuer) return [EMAIL_METHOD];
  try {
    const res = await fetch(`${issuer}/api/auth/oauth-providers`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    const body = (await res.json()) as { data?: { providers?: unknown } };
    const providers = Array.isArray(body.data?.providers) ? body.data.providers : [];
    return [EMAIL_METHOD, ...providers.flatMap((p) => (typeof p === "string" && LABELS[p] ? [LABELS[p]] : []))];
  } catch {
    return [EMAIL_METHOD];
  }
}
