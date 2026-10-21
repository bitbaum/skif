import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { Field, TextInput } from "@/components/fields";
import { buttonClass, Card } from "@/components/ui";
import { authConfig } from "@/config/auth";
import { refusalMessage, retryAfter } from "@/server/rate-limit";
import { signInMethods } from "@/server/sign-in-methods";

export const metadata: Metadata = { title: "Sign in or create an account" };

const AFTER_SIGN_IN = "/bookings";

/** Counts the attempt; a refusal comes back to this page with the reason. */
async function limitSignIn(): Promise<void> {
  const minutes = await retryAfter("SIGN_IN");
  if (minutes > 0) redirect(`/signin?wait=${minutes}`);
}

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ wait?: string }> }) {
  const wait = Number.parseInt((await searchParams).wait ?? "", 10);
  const session = await auth();
  if (session?.user?.id) redirect(AFTER_SIGN_IN);
  const methods = await signInMethods();

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-display text-fg-primary">Sign in or create an account</h1>
      <p className="mt-3 mb-8 leading-relaxed text-fg-secondary">
        Skif accounts are OrangeCat accounts: one account across the products built here, and Skif stores no password. New
        here? The same button creates your account.
      </p>
      {wait > 0 && (
        <p role="alert" className="mb-4 rounded-card border border-warn bg-warn-soft p-3 text-sm text-warn">
          {refusalMessage(wait)}
        </p>
      )}
      <Card>
        {authConfig.orangecat ? (
          <form
            action={async () => {
              "use server";
              await limitSignIn();
              await signIn("orangecat", { redirectTo: AFTER_SIGN_IN });
            }}
          >
            <button type="submit" className={`${buttonClass.primary} w-full`}>
              Continue with OrangeCat
            </button>
          </form>
        ) : (
          <p className="text-sm text-muted">
            Sign-in is not configured on this server yet (OrangeCat OIDC client missing).
          </p>
        )}
        <div className="mt-6 border-t border-line pt-4">
          <p className="text-sm font-medium">Ways to sign in</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {methods.map((m) => (
              <li key={m}>· {m}</li>
            ))}
          </ul>
        </div>
      </Card>
      {authConfig.devLogin && (
        <Card title="Development login" className="mt-6">
          <form
            className="space-y-4"
            action={async (form: FormData) => {
              "use server";
              await limitSignIn();
              await signIn("dev", { sub: form.get("sub"), redirectTo: AFTER_SIGN_IN });
            }}
          >
            <Field label="Identity" hint="Any string; becomes the dev:<identity> sub. Local only.">
              <TextInput name="sub" required />
            </Field>
            <button type="submit" className={buttonClass.secondary}>
              Sign in (dev)
            </button>
          </form>
        </Card>
      )}
    </div>
  );
}
