import type { Locale } from "@/i18n/locales";
import { DE } from "./de";
import { EN, type SiteWords } from "./en";
import { FR } from "./fr";
import { IT } from "./it";

export type { SiteWords } from "./en";

const WORDS: Record<Locale, SiteWords> = { en: EN, de: DE, fr: FR, it: IT };

export function wordsFor(locale: Locale): SiteWords {
  return WORDS[locale];
}
