/**
 * The Academy's words in German, French and Italian: areas, courses, the
 * capabilities a course builds, and who delivers it. English is the config
 * itself (src/config/academy.ts, capabilities.ts); each accessor falls back
 * to it, so a missing string shows English, never a key. text.test.ts checks
 * every key is translated.
 */
import { ACADEMY_AREAS, COURSES, DELIVERY, type Course } from "../academy";
import { capabilityLabel } from "../capabilities";
import type { Locale } from "@/i18n/locales";
import { ACADEMY_DE } from "./academy.de";
import { ACADEMY_FR } from "./academy.fr";
import { ACADEMY_IT } from "./academy.it";

export type AcademyWords = {
  areas: Record<string, { title: string; intro: string }>;
  courses: Record<string, { title: string; outcome: string }>;
  capabilities: Record<string, string>;
  delivery: Record<string, string>;
};

export const ACADEMY_TRANSLATIONS: Readonly<Record<Exclude<Locale, "en">, AcademyWords>> = { de: ACADEMY_DE, fr: ACADEMY_FR, it: ACADEMY_IT };

const tr = (locale: Locale): AcademyWords | undefined => (locale === "en" ? undefined : ACADEMY_TRANSLATIONS[locale]);

export function areaText(key: string, locale: Locale): { title: string; intro: string } {
  const a = ACADEMY_AREAS.find((x) => x.key === key);
  return tr(locale)?.areas[key] ?? { title: a?.title ?? key, intro: a?.intro ?? "" };
}

export function courseText(c: Pick<Course, "key" | "title" | "outcome">, locale: Locale): { title: string; outcome: string } {
  return tr(locale)?.courses[c.key] ?? { title: c.title, outcome: c.outcome };
}

export function capabilityText(key: string, locale: Locale): string {
  return tr(locale)?.capabilities[key] ?? capabilityLabel(key);
}

export function deliveryText(key: string, locale: Locale): string {
  return tr(locale)?.delivery[key] ?? DELIVERY.find((d) => d.key === key)?.label ?? key;
}

/** For the completeness test. */
export const ACADEMY_KEYS = {
  areas: ACADEMY_AREAS.map((a) => a.key),
  courses: COURSES.map((c) => c.key),
  delivery: DELIVERY.map((d) => d.key),
};
