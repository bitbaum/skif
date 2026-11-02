"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { AccountMenu } from "@bitbaum/accountkit";
import { signOutAction } from "@/app/(app)/account-actions";
import { wordsFor } from "@/config/text";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";

/** Who is signed in, their account page and how to sign out: the fleet's one
 * account menu (@bitbaum/accountkit), in the reader's language. Identity
 * only; the app's sections are AppNav. */
export function Account({ name }: { name: string }) {
  const found = useLocale();
  const words = wordsFor(isLocale(found) ? found : DEFAULT_LOCALE);
  return (
    <AccountMenu
      user={{ name }}
      onSignOut={signOutAction}
      groups={[{ id: "account", items: [{ id: "account", label: words.account.yourAccount, href: "/account" }] }]}
      renderLink={(p) => <Link {...p} />}
      labels={words.accountMenu}
    />
  );
}
