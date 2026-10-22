import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Document, ROOT_METADATA } from "@/components/shell/document";
import { isLocale, LOCALES } from "@/i18n/locales";

export const metadata: Metadata = ROOT_METADATA;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** The public site's root, in the language of its URL (/de/…, /fr/…, /it/…,
 * English unprefixed). Static: every page is built once per language. */
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <Document lang={locale}>
      <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
    </Document>
  );
}
