/**
 * Sign-in is OrangeCat OIDC only. There is no users table and no adapter:
 * the session is a JWT and the OIDC `sub` is the person's identity.
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
import { authConfig } from "@/config/auth";

const providers: Provider[] = [];

if (authConfig.orangecat) {
  providers.push({
    id: "orangecat",
    name: "OrangeCat",
    type: "oidc",
    issuer: authConfig.orangecat.issuer,
    clientId: authConfig.orangecat.clientId,
    clientSecret: authConfig.orangecat.clientSecret,
    // OrangeCat's token endpoint accepts client_secret_post only.
    client: { token_endpoint_auth_method: "client_secret_post" },
    checks: ["pkce", "state"],
    authorization: { params: { scope: "openid profile" } },
  });
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
  pages: { signIn: "/signin" },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
