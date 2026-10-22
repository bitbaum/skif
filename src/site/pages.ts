/**
 * The content pages (Method, Protectors, Business, Join, Privacy) in the
 * reader's language: the translated SitePage when one exists, otherwise the
 * English one built from config.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { Locale } from "@/i18n/locales";
import { businessPage } from "./business";
import { PAGES_DE } from "./i18n/de";
import { PAGES_FR } from "./i18n/fr";
import { PAGES_IT } from "./i18n/it";
import { joinPage } from "./join";
import { methodPage } from "./method";
import { privacyPage } from "./privacy";
import { protectorsPage } from "./protectors";

export const ENGLISH_PAGES = {
  method: methodPage,
  protectors: protectorsPage,
  business: businessPage,
  join: joinPage,
  privacy: privacyPage,
} as const satisfies Record<string, () => SitePage>;

export type PageName = keyof typeof ENGLISH_PAGES;

export const PAGE_TRANSLATIONS: Readonly<Record<Exclude<Locale, "en">, Partial<Record<PageName, SitePage>>>> = {
  de: PAGES_DE,
  fr: PAGES_FR,
  it: PAGES_IT,
};

export function pageIn(name: PageName, locale: Locale): SitePage {
  return (locale === "en" ? undefined : PAGE_TRANSLATIONS[locale][name]) ?? ENGLISH_PAGES[name]();
}
