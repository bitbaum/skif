/** A research article in the reader's language, or the English one. */
import type { Locale } from "@/i18n/locales";
import { RESEARCH_DE } from "./i18n/de";
import { RESEARCH_FR } from "./i18n/fr";
import { RESEARCH_IT } from "./i18n/it";
import type { Research } from "./types";

export const RESEARCH_TRANSLATIONS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, Research>>>> = {
  de: RESEARCH_DE,
  fr: RESEARCH_FR,
  it: RESEARCH_IT,
};

export function researchIn(r: Research, locale: Locale): Research {
  return locale === "en" ? r : (RESEARCH_TRANSLATIONS[locale][r.slug] ?? r);
}
