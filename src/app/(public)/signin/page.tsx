import { authorizationParams, returnPath, SOCIAL_PROVIDERS, type EntryMode } from "@bitbaum/accountkit/orangecat";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { Field, TextInput } from "@/components/fields";
import { ACTION } from "@/components/site/shell";
import { SkifMark } from "@/components/site/skif-mark";
import { buttonClass, Card } from "@/components/ui";
import { authConfig } from "@/config/auth";
import { ACCOUNT } from "@/config/site";
import { refusalMessage, retryAfter } from "@/server/rate-limit";

export const metadata: Metadata = { title: "Create an account or sign in" };

const AFTER_SIGN_IN = "/act";

type Search = Promise<{ mode?: string; from?: string; wait?: string }>;

/** Counts the attempt; a refusal comes back to this page with the reason. */
async function limitSignIn(back: string): Promise<void> {
  const minutes = await retryAfter("SIGN_IN");
  if (minutes > 0) redirect(`${back}${back.includes("?") ? "&" : "?"}wait=${minutes}`);
}

/**
 * Skif's own account screen. The person chooses here — create or sign in, by
 * email, Google or GitHub — and the account service (OrangeCat, via
 * @bitbaum/accountkit) opens already in that state: on "Create account", with
 * their email filled in, or straight at Google or GitHub. Nobody has to know
 * what OrangeCat is to get a Skif account.
 */
export default async function SignInPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const mode: EntryMode = params.mode === "create" ? "sign-up" : "sign-in";
  const from = returnPath(params.from, AFTER_SIGN_IN);
  const wait = Number.parseInt(params.wait ?? "", 10);
  const session = await auth();
  if (session?.user?.id) redirect(from);

  const words = mode === "sign-up" ? ACCOUNT.create : ACCOUNT.signIn;
  const here = `/signin?${new URLSearchParams({ ...(mode === "sign-up" ? { mode: "create" } : {}), from }).toString()}`;
  const other = `/signin?${new URLSearchParams({ ...(mode === "sign-up" ? {} : { mode: "create" }), from }).toString()}`;

  async function start(form: FormData) {
    "use server";
    await limitSignIn(here);
    const provider = form.get("provider");
    const email = form.get("email");
    await signIn(
      "orangecat",
      { redirectTo: from },
      authorizationParams({
        mode,
        provider: typeof provider === "string" ? provider : null,
        email: typeof email === "string" ? email : null,
      }),
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <SkifMark className="size-12 text-gold" />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-display text-fg-primary">{words.title}</h1>
      <p className="mt-2 leading-relaxed text-fg-secondary">{words.lede}</p>

      {wait > 0 && (
        <p role="alert" className="mt-6 rounded-card border border-warn bg-warn-soft p-3 text-sm text-warn">
          {refusalMessage(wait)}
        </p>
      )}

      {authConfig.orangecat ? (
        <form action={start} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_PROVIDERS.map((p) => (
              <button key={p} type="submit" name="provider" value={p} formNoValidate className={`${ACTION.secondary} w-full`}>
                {ACCOUNT.providers[p]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-fg-tertiary">
            <span className="h-px flex-1 bg-subtle" />
            or with email
            <span className="h-px flex-1 bg-subtle" />
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-fg-primary">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block min-h-11 w-full rounded-lg border border-strong bg-surface-page px-3 text-fg-primary focus-visible:outline-2 focus-visible:outline-accent"
              />
            </label>
            <button type="submit" className={`${ACTION.primary} w-full`}>
              {words.submit}
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-8 rounded-card border border-subtle p-4 text-sm text-fg-secondary">{ACCOUNT.notConfigured}</p>
      )}

      <p className="mt-6 text-sm text-fg-secondary">
        {words.switchPrompt}{" "}
        <Link href={other} className="inline-flex min-h-11 items-center font-medium text-accent underline-offset-4 hover:underline">
          {words.switchLabel}
        </Link>
      </p>
      <p className="mt-6 border-t border-subtle pt-6 text-xs leading-relaxed text-fg-tertiary">{ACCOUNT.fineprint}</p>

      {authConfig.devLogin && (
        <Card title="Development login" className="mt-8">
          <form
            className="space-y-4"
            action={async (form: FormData) => {
              "use server";
              await limitSignIn(here);
              await signIn("dev", { sub: form.get("sub"), redirectTo: from });
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
