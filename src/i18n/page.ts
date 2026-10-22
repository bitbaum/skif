import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, type Locale } from "./locales";

export type LocaleParams = Promise<{ locale: string }>;

/**
 * The language of a public page, from its URL. Every page and layout under
 * app/[locale] calls this first: it marks the page for static rendering in
 * that language (next-intl needs it per page and per layout) and turns an
 * unknown language into a 404.
 */
export async function pageLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
