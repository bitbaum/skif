/**
 * Accounts for Skif: the same account system as every fleet product
 * (@bitbaum/accountkit/auth). A person signs in with an email and a password,
 * an emailed sign-in link, a passkey, a second factor, "Continue with
 * OrangeCat" or the shared bitbaum sign-in, each offered only when its env is
 * set (src/config/auth.ts). OrangeCat is one button among them, never a
 * requirement.
 *
 * Skif's rows were keyed on the OrangeCat `sub` before it had accounts.
 * `legacyIdentityProvider: "orangecat"` keeps that key for everyone whose
 * first way in was OrangeCat, so their bookings, profiles and assessments stay
 * theirs with no data migration: their first OrangeCat sign-in here creates
 * the account and links it by that `sub`, never by an address. Everyone else
 * is their account id. `session.user.id` below is that id, the one every row
 * stores, as it was under Auth.js.
 */
import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthRuntime } from "@bitbaum/accountkit/auth/next";
import { createAuthMailer } from "@bitbaum/accountkit/auth/mail";
import { isDeliverable } from "@bitbaum/accountkit/auth";
import { getDb } from "@/db/client";
import { authSite, skifAuthOptions } from "@/config/auth";

export const authMail = createAuthMailer({ site: authSite() });
/** Whether account mail can be sent: recovery and sign-in links are offered only then. */
export const mailConfigured = () => authMail.configured;

export const { GET, POST, getSession, sessionFor, authStatus, getAuth } = createAuthRuntime(
  skifAuthOptions({ mail: authMail, getDatabase: () => getDb() }),
);

export type SkifSession = { user: { id: string; name: string | null } };

/** The signed-in person as the rest of Skif reads them, or null. */
export async function auth(): Promise<SkifSession | null> {
  const session = await getSession();
  if (!session) return null;
  // A new account has no name until the person gives one; the address stands
  // in, unless it is the placeholder an OrangeCat sign-in carries.
  const { name, email } = session.user;
  return { user: { id: session.user.actorId, name: name || (isDeliverable(email) ? email : null) } };
}

/** End the session and go where the caller asked. */
export async function signOut(options: { redirectTo: string }): Promise<never> {
  try {
    await getAuth().api.signOut({ headers: await headers() });
  } catch {
    // Already signed out, or accounts unavailable: either way, go on.
  }
  redirect(options.redirectTo);
}
