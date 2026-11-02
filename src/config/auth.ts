import "server-only";
import { signInMethods, type SignInMethods } from "@bitbaum/accountkit/auth";
import type { AuthRuntimeOptions } from "@bitbaum/accountkit/auth/next";
import type { AuthMailer, AuthSite } from "@bitbaum/accountkit/auth/server";
import { PUBLIC_ORIGIN } from "@/config/site";

/**
 * Auth settings, read from the environment. Server-only: which ways in exist
 * is decided where they mount (src/auth.ts), and a button is shown only for a
 * method this deployment really has.
 */

/** Skif as the account system names it in mail and passkeys. AUTH_URL is
 * the public origin on the box; a local or CI run sets its own. */
export function authSite(env: Record<string, string | undefined> = process.env): AuthSite {
  return { url: env.AUTH_URL || env.BETTER_AUTH_URL || PUBLIC_ORIGIN, title: "Skif", slug: "skif" };
}

/**
 * How Skif's account runtime is built: the app (src/auth.ts) and the
 * real-database journeys (src/server/accounts.test.ts) use this one
 * definition, so the tests prove the configuration that ships.
 *
 * `legacyIdentityProvider: "orangecat"`: a person whose first way in was
 * OrangeCat keeps their OrangeCat `sub` as `actorId`, the key their rows were
 * written under before Skif had accounts.
 */
export function skifAuthOptions(options: {
  mail: AuthMailer;
  getDatabase: AuthRuntimeOptions["getDatabase"];
  env?: NodeJS.ProcessEnv;
}): AuthRuntimeOptions {
  const env = options.env ?? process.env;
  return {
    site: authSite(env),
    mail: options.mail,
    env,
    isDatabaseConfigured: (e) => Boolean(e.DATABASE_URL),
    getDatabase: options.getDatabase,
    legacyIdentityProvider: "orangecat",
  };
}

/** The ways in this deployment offers: password, passkey and a second factor
 * always; the emailed sign-in link and recovery when mail is configured;
 * OrangeCat and the shared bitbaum sign-in when their client is set. */
export function methodsFor(mailConfigured: boolean, env: NodeJS.ProcessEnv = process.env): SignInMethods {
  return signInMethods(env, mailConfigured);
}

/** A comma-separated list of actor ids, as a set. */
function subs(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

export const authConfig = {
  /** Actor ids with Operations access, comma-separated in SKIF_OPS_SUBS: an
   * OrangeCat `sub` for a person who came in through OrangeCat, the account
   * id for everyone else. */
  opsSubs: subs(process.env.SKIF_OPS_SUBS),
  /** Actor ids whose browser may load the Loki widget inside the signed-in
   * app (src/config/feedback.ts), comma-separated in SKIF_LOKI_WATCH_SUBS.
   * Empty by default: then the app has no third-party script for anyone. */
  lokiWatchSubs: subs(process.env.SKIF_LOKI_WATCH_SUBS),
} as const;
