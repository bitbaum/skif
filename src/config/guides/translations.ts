/**
 * A guide in the reader's language: the translated Guide when one exists,
 * otherwise the English one. Translations live in ./i18n/<locale>/, one file
 * per guide, mirroring the English file's shape exactly.
 */
import type { Locale } from "@/i18n/locales";
import { GUIDES_DE } from "./i18n/de";
import { GUIDES_FR } from "./i18n/fr";
import { GUIDES_IT } from "./i18n/it";
import type { Guide } from "./types";

export const GUIDE_TRANSLATIONS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, Guide>>>> = {
  de: GUIDES_DE,
  fr: GUIDES_FR,
  it: GUIDES_IT,
};

export function guideIn(guide: Guide, locale: Locale): Guide {
  return locale === "en" ? guide : (GUIDE_TRANSLATIONS[locale][guide.slug] ?? guide);
}
