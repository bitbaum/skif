import "server-only";

/**
 * Auth settings, read once from the environment. Server-only: these are
 * secrets, and the provider list must be decided where the providers mount.
 */
const ORANGECAT_ISSUER_DEFAULT = "https://orangecat.ch";

function orangecat() {
  const clientId = process.env.ORANGECAT_OAUTH_CLIENT_ID;
  const clientSecret = process.env.ORANGECAT_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return {
    issuer: process.env.ORANGECAT_OAUTH_ISSUER ?? ORANGECAT_ISSUER_DEFAULT,
    clientId,
    clientSecret,
  };
}

/** A comma-separated list of OIDC subs, as a set. */
function subs(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

export const authConfig = {
  orangecat: orangecat(),
  devLogin: process.env.NODE_ENV === "development" && process.env.SKIF_DEV_LOGIN === "1",
  /** OIDC subs with Operations access, comma-separated in SKIF_OPS_SUBS. */
  opsSubs: subs(process.env.SKIF_OPS_SUBS),
  /** OIDC subs whose browser may load the Loki widget inside the signed-in
   * app (src/config/feedback.ts), comma-separated in SKIF_LOKI_WATCH_SUBS.
   * Empty by default: then the app has no third-party script for anyone. */
  lokiWatchSubs: subs(process.env.SKIF_LOKI_WATCH_SUBS),
} as const;
