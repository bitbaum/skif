import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { Field, TextInput } from "@/components/fields";
import { buttonClass, Card } from "@/components/ui";
import { FeedbackWidget } from "@/components/feedback-widget";
import { authConfig } from "@/config/auth";
import { refusalMessage, retryAfter } from "@/server/rate-limit";

export const metadata: Metadata = { title: "Sign in" };

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

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-6 text-2xl font-semibold">Sign in to Skif</h1>
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
        <p className="mt-4 text-sm text-muted">
          Skif keeps no account of its own: your OrangeCat identity is all we store to know it&apos;s you.
        </p>
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
      <FeedbackWidget />
    </main>
  );
}
