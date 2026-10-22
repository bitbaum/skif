/**
 * The assessment's words in German, French and Italian: concerns, places,
 * steps (interventions), costs and scales. English is the source — the config
 * the plan engine runs on — and these files mirror its keys
 * (assessment.{de,fr,it}.json; text.test.ts checks every key is there). Each
 * accessor falls back to English, so a missing string shows English, never a
 * key.
 */
import { COST_TIERS, type CostTier } from "../assessment";
import { CONCERNS, type ConcernKey } from "../concerns";
import { ENVIRONMENT_TYPES, type EnvironmentType } from "../environments";
import { INTERVENTION_KINDS, INTERVENTIONS, LEVELS, type Intervention, type InterventionKind, type Level } from "../interventions";
import type { Locale } from "@/i18n/locales";
import de from "./assessment.de.json";
import fr from "./assessment.fr.json";
import it from "./assessment.it.json";

type Labelled = { label: string; description?: string };

export type AssessmentWords = {
  interventions: Record<string, { title: string; tradeoffs: string }>;
  concerns: Record<string, Labelled>;
  environments: Record<string, Labelled>;
  costTiers: Record<string, { label: string; budget: string }>;
  kinds: Record<string, string>;
  levels: Record<string, string>;
  privacyImpact: string[];
  autonomyImpact: string[];
  evidenceBases: Record<string, string>;
};

const BY_LOCALE: Partial<Record<Locale, AssessmentWords>> = { de, fr, it };

/** For the test. */
export const ASSESSMENT_TRANSLATIONS = BY_LOCALE;

export function stepText(i: Pick<Intervention, "key" | "title" | "tradeoffs">, locale: Locale): { title: string; tradeoffs: string } {
  return BY_LOCALE[locale]?.interventions[i.key] ?? { title: i.title, tradeoffs: i.tradeoffs };
}

export function concernText(key: ConcernKey, locale: Locale): string {
  return BY_LOCALE[locale]?.concerns[key]?.label ?? CONCERNS.find((c) => c.key === key)?.label ?? key;
}

export function environmentText(key: EnvironmentType, locale: Locale): Labelled {
  const t = BY_LOCALE[locale]?.environments[key];
  if (t) return t;
  const e = ENVIRONMENT_TYPES.find((x) => x.key === key);
  return { label: e?.label ?? key, description: e?.description };
}

export function costText(key: CostTier, locale: Locale): string {
  return BY_LOCALE[locale]?.costTiers[key]?.label ?? COST_TIERS.find((c) => c.key === key)?.label ?? key;
}

export function kindText(key: InterventionKind, locale: Locale): string {
  return BY_LOCALE[locale]?.kinds[key] ?? INTERVENTION_KINDS.find((k) => k.key === key)?.label ?? key;
}

export function levelWord(key: Level, locale: Locale): string {
  return BY_LOCALE[locale]?.levels[key] ?? LEVELS.find((l) => l.key === key)?.label ?? key;
}

/** Every intervention key, for the test's completeness check. */
export const INTERVENTION_KEYS = (INTERVENTIONS as readonly Intervention[]).map((i) => i.key);
