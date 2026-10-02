/**
 * Sign-in is OrangeCat OIDC only. There is no users table and no adapter:
 * the session is a JWT and the OIDC `sub` — carried as `token.actorId` — is
 * the person's identity. The provider and the session refresh are
 * @bitbaum/accountkit/orangecat, shared by every bitbaum app: once the access
 * token expires the session refreshes, and when OrangeCat refuses
 * (Disconnect, Sign out everywhere, account deleted) `actorId` is dropped and
 * the person is signed out here too.
 *
 * A "dev" credentials provider exists solely so the flows can be exercised on
 * a laptop without OIDC client credentials. It is mounted only when
 * NODE_ENV is "development" AND SKIF_DEV_LOGIN=1; a production build inlines
 * NODE_ENV, so it can never be mounted there.
 */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { z } from "zod";
import { orangecatProvider, syncOcSession } from "@bitbaum/accountkit/orangecat";
import { authConfig } from "@/config/auth";

const providers: Provider[] = [];

if (authConfig.orangecat) {
  // Identity only, and no email: Skif never asks for one.
  providers.push(orangecatProvider({ ...authConfig.orangecat, scopes: "openid profile" }));
}

if (authConfig.devLogin) {
  providers.push(
    Credentials({
      id: "dev",
      name: "Development login",
      credentials: { sub: { label: "Identity (any string)" } },
      authorize(credentials) {
        const parsed = z.object({ sub: z.string().trim().min(1).max(64) }).safeParse(credentials);
        if (!parsed.success) return null;
        return { id: `dev:${parsed.data.sub}`, name: parsed.data.sub };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/signin", error: "/auth/error" },
  callbacks: {
    async jwt({ token, account, profile }) {
      // The dev login has no OrangeCat grant to refresh; its sub is its identity.
      if (account?.provider === "dev") token.actorId = token.sub;
      return syncOcSession({ token, account, profile }, authConfig.orangecat);
    },
    session({ session, token }) {
      // actorId, never token.sub: a revoked grant drops actorId, not sub.
      if (typeof token.actorId === "string") session.user.id = token.actorId;
      return session;
    },
  },
});
