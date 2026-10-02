import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInError } from "@bitbaum/accountkit";
import { signIn } from "@/auth";
import { authConfig } from "@/config/auth";
import { retryAfter } from "@/server/rate-limit";

export const metadata: Metadata = { title: "Sign-in did not finish", robots: { index: false } };

const AFTER_SIGN_IN = "/bookings";

/**
 * Where Auth.js sends a sign-in that did not finish. It used to be Auth.js's
 * bare "Error" page. "Try again" starts the sign-in again (through the same
 * rate limit as the sign-in page); the provider's error code is never shown.
 */
export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function retry() {
    "use server";
    const minutes = await retryAfter("SIGN_IN");
    if (minutes > 0) redirect(`/signin?wait=${minutes}`);
    await signIn("orangecat", { redirectTo: AFTER_SIGN_IN });
  }

  return (
    <main className="px-6">
      <SignInError
        error={authConfig.orangecat ? error : "Configuration"}
        retry={retry}
        home="/"
        labels={{ kicker: "Sign in to Skif" }}
      />
    </main>
  );
}
