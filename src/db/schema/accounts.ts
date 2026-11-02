/**
 * Accounts: the same tables in every fleet product (@bitbaum/accountkit/auth).
 * They hold a person's ways in (password, passkeys, a second factor, OrangeCat
 * and the shared sign-in) and their sessions. Skif's own rows still key on
 * the person's `actorId` (see src/auth.ts), never on these tables' ids.
 */
export * from "@bitbaum/accountkit/auth/schema";
