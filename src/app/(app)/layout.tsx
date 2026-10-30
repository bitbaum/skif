import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { AppNav, type AppNavLink } from "@/components/app-nav";
import { Document, ROOT_METADATA } from "@/components/shell/document";
import { PublicFooter } from "@/components/site/public-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SHELL } from "@/components/site/shell";
import { siteText } from "@/config/site";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/locales";
import { isLokiWatcher, requireViewer } from "@/server/viewer";

export const metadata: Metadata = ROOT_METADATA;

/** Signed in, Skif looks and moves exactly as it does signed out: the same
 * header (with the fleet account menu) and footer, plus one row of the
 * person's own sections under it. These pages have no language in their URL;
 * the chrome follows the language the reader last chose (NEXT_LOCALE). */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  const found = await getLocale();
  const locale = isLocale(found) ? found : DEFAULT_LOCALE;
  const { MY_SKIF } = siteText(locale);
  const links: AppNavLink[] = [
    ...MY_SKIF.sections,
    { href: MY_SKIF.protector.href, label: viewer.protector ? MY_SKIF.protector.jobs : MY_SKIF.protector.label },
    ...(viewer.isOps ? [{ href: MY_SKIF.ops.href, label: MY_SKIF.ops.label, fullLoad: isLokiWatcher(viewer.sub) }] : []),
  ];

  return (
    <Document lang={locale}>
      <NextIntlClientProvider locale={locale}>
      {/* A printed page (a case report) is the page alone, without the chrome. */}
      <div className="print:hidden">
        <SiteHeader account={{ name: viewer.name }} />
        <div className="border-b border-subtle bg-surface-page">
          <AppNav links={links} className={SHELL} />
        </div>
      </div>
      <main className={`${SHELL} py-8 print:py-0`}>{children}</main>
      <div className="print:hidden">
        <PublicFooter locale={locale} />
      </div>
      </NextIntlClientProvider>
    </Document>
  );
}
