import { authLabelsFor } from "@bitbaum/accountkit/auth";
import { returnPath } from "@bitbaum/accountkit/orangecat";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { authStatus, getSession, mailConfigured } from "@/auth";
import { SkifSignIn, SkifSignUp } from "@/components/auth-screens";
import { SkifMark } from "@/components/site/skif-mark";
import { methodsFor } from "@/config/auth";
import { siteText } from "@/config/site";
import { isUnlocalizedPath, localizedPath } from "@/i18n/locales";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return { title: siteText(await pageLocale(params)).ACCOUNT.pageTitle, robots: { index: false } };
}

const AFTER_SIGN_IN = "/act";

type Search = Promise<{ mode?: string; from?: string; next?: string; token?: string; error?: string; method?: string }>;

/**
 * Skif's account screen: every way in on one page, AccountKit's own forms.
 * `?mode=create` is the sign-up form; without it, the sign-in form, which
 * also carries recovery (its mailed link comes back here with a token) and
 * the second-factor step. Nobody needs an account anywhere else to get a
 * Skif account.
 */
export default async function SignInPage({ params: route, searchParams }: { params: LocaleParams; searchParams: Search }) {
  const locale = await pageLocale(route);
  const { ACCOUNT } = siteText(locale);
  const query = await searchParams;
  const creating = query.mode === "create";
  // Back to where they were going, in the language they were reading in
  // (signed-in pages have no language in their URL). A reset link and a
  // failed provider round trip come back with `next`, the rest with `from`.
  const asked = returnPath(query.from ?? query.next, AFTER_SIGN_IN);
  const next = isUnlocalizedPath(asked) ? asked : localizedPath(asked, locale);
  const recovering = Boolean(query.token) || (query.error === "INVALID_TOKEN" && query.method !== "magic-link");
  if (!recovering && (await getSession())) redirect(next);

  const labels = authLabelsFor(locale);
  const methods = methodsFor(mailConfigured());
  const signInPath = localizedPath("/signin", locale);
  const withFrom = (mode: "create" | null) =>
    `${signInPath}?${new URLSearchParams({ ...(mode ? { mode } : {}), from: asked }).toString()}`;
  const words = creating ? ACCOUNT.create : ACCOUNT.signIn;

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <SkifMark className="size-12 text-gold" />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-display text-fg-primary">
        {recovering ? (labels.recovery?.reset ?? words.title) : words.title}
      </h1>
      <p className="mt-2 leading-relaxed text-fg-secondary">{words.lede}</p>

      <div className="mt-8">
        {!authStatus().ready ? (
          <p className="rounded-card border border-subtle p-4 text-sm text-fg-secondary">{ACCOUNT.notConfigured}</p>
        ) : creating ? (
          <SkifSignUp labels={labels} methods={methods} next={next} signUpPath={withFrom("create")} signInPath={withFrom(null)} />
        ) : (
          <SkifSignIn
            labels={labels}
            methods={methods}
            next={next}
            signInPath={signInPath}
            signUpPath={withFrom("create")}
            initialError={Boolean(query.error) && !recovering}
          />
        )}
      </div>

      <p className="mt-6 border-t border-subtle pt-6 text-xs leading-relaxed text-fg-tertiary">{ACCOUNT.fineprint}</p>
    </div>
  );
}
