/** Which guides are translated, without loading them: for the client-side
 * "still in English" notice. translations.test.ts keeps it honest. */
import type { Locale } from "@/i18n/locales";
import { SLUGS_DE } from "./i18n/de/slugs";
import { SLUGS_FR } from "./i18n/fr/slugs";
import { SLUGS_IT } from "./i18n/it/slugs";

const SLUGS: Readonly<Record<Locale, readonly string[] | "all">> = { en: "all", de: SLUGS_DE, fr: SLUGS_FR, it: SLUGS_IT };

export function isGuideTranslated(slug: string, locale: Locale): boolean {
  const list = SLUGS[locale];
  return list === "all" || list.includes(slug);
}

/** For the guides index: every guide in this language. */
export function allGuidesTranslated(slugs: readonly string[], locale: Locale): boolean {
  return slugs.every((s) => isGuideTranslated(s, locale));
}
