import { authLabelsFor, isDeliverable } from "@bitbaum/accountkit/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getAuth, getSession, mailConfigured } from "@/auth";
import { SkifAccount } from "@/components/auth-screens";
import { PageHeader } from "@/components/ui";
import { methodsFor } from "@/config/auth";
import { siteText } from "@/config/site";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

/** Everything about one's own account: name, address, password, passkeys,
 * the second factor, linked sign-ins, and deleting the account. */
export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/signin?from=/account");
  const found = await getLocale();
  const locale = isLocale(found) ? found : DEFAULT_LOCALE;
  const accounts = await getAuth()
    .api.listUserAccounts({ headers: await headers() })
    .catch(() => [] as { providerId: string }[]);
  const { user } = session;
  return (
    <div className="max-w-xl">
      <PageHeader title={siteText(locale).ACCOUNT.yourAccount} />
      <SkifAccount
        labels={authLabelsFor(locale)}
        methods={methodsFor(mailConfigured())}
        user={{
          name: user.name ?? "",
          email: isDeliverable(user.email) ? user.email : null,
          emailVerified: Boolean(user.emailVerified),
          role: "customer",
          twoFactorEnabled: Boolean(user.twoFactorEnabled),
        }}
        linked={(accounts as { providerId: string }[]).map((a) => a.providerId)}
        accountPath="/account"
        homePath="/"
      />
    </div>
  );
}
