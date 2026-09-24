import type { ConcernKey, CostTier, MeasureKey } from "../assessment";
import type { AxisKey, HardConstraintKey } from "../constraints";
import type { EnvironmentType } from "../environments";

/**
 * SSOT for the intervention catalogue (SPEC §2, §12). Every intervention keeps
 * its dimensions apart — benefit, evidence, privacy, autonomy, cost — rather
 * than folding them into one score.
 *
 * Honesty about evidence (§16): every benefit and confidence below is Skif's
 * own judgment, not yet backed by cited research, and says so. None is rated
 * high-confidence until evidence exists.
 */

export const LEVELS = [
  { key: "LOW", label: "Low" },
  { key: "MEDIUM", label: "Medium" },
  { key: "HIGH", label: "High" },
] as const;
export type Level = (typeof LEVELS)[number]["key"];

export function levelText(key: Level): string {
  return LEVELS.find((l) => l.key === key)?.label ?? key;
}

/** What following the intervention actually involves (§12). Anything that
 * involves a product, a professional service or a Protector means spending money. */
export const INTERVENTION_KINDS = [
  { key: "BEHAVIOURAL", label: "Something you do", purchase: false },
  { key: "ENVIRONMENTAL", label: "A change to the place", purchase: false },
  { key: "PRODUCT", label: "Needs a product", purchase: true },
  { key: "PROFESSIONAL_SERVICE", label: "Needs a professional service", purchase: true },
  { key: "PROTECTOR", label: "Needs a Protector", purchase: true },
] as const;
export type InterventionKind = (typeof INTERVENTION_KINDS)[number]["key"];

export function kindLabel(key: InterventionKind): string {
  return INTERVENTION_KINDS.find((k) => k.key === key)?.label ?? key;
}

export function needsPurchase(kind: InterventionKind): boolean {
  return INTERVENTION_KINDS.find((k) => k.key === kind)?.purchase ?? true;
}

/** Where a benefit rating comes from (§16). Only SKIF_JUDGMENT is used today. */
export const EVIDENCE_BASES = [
  { key: "RESEARCH", label: "Published research" },
  { key: "INTERNAL_OBSERVATION", label: "Observed in Skif deployments" },
  { key: "EXPERT_OPINION", label: "Named expert's opinion" },
  { key: "SKIF_JUDGMENT", label: "Skif's own judgment — no research cited yet" },
  { key: "VENDOR_CLAIM", label: "Manufacturer's claim, unverified" },
] as const;
export type EvidenceBasis = (typeof EVIDENCE_BASES)[number]["key"];

export function basisLabel(key: EvidenceBasis): string {
  return EVIDENCE_BASES.find((b) => b.key === key)?.label ?? key;
}

export const PRIVACY_IMPACT = [
  { level: 0, label: "No data, no devices watching" },
  { level: 1, label: "Shares a little with people you choose" },
  { level: 2, label: "Records or signals beyond your home" },
  { level: 3, label: "Watches people or leaves your control" },
] as const;

export const AUTONOMY_IMPACT = [
  { level: 0, label: "Changes nothing about how you live" },
  { level: 1, label: "Asks a small routine of you" },
  { level: 2, label: "Something else decides or acts for you" },
  { level: 3, label: "Restricts what you can do" },
] as const;

type Impact = 0 | 1 | 2 | 3;

export function privacyLabel(level: number): string {
  return PRIVACY_IMPACT.find((i) => i.level === level)?.label ?? String(level);
}

export function autonomyLabel(level: number): string {
  return AUTONOMY_IMPACT.find((i) => i.level === level)?.label ?? String(level);
}

/** Which pole of a preference axis an intervention sits at; DISCRETION is
 * the presence style (-1 discreet, 1 visible). Unlisted axes are neutral. */
export type Leans = Partial<Record<AxisKey | "DISCRETION", -1 | 1>>;

export type Intervention = {
  key: string;
  title: string;
  addresses: readonly ConcernKey[];
  privacyImpact: Impact;
  autonomyImpact: Impact;
  cost: CostTier;
  kind: InterventionKind;
  benefit: Level;
  evidence: { confidence: Level; basis: EvidenceBasis };
  /** Hard constraints this intervention would break; any overlap with the
   * person's active constraints excludes it. */
  conflictsWith: readonly HardConstraintKey[];
  /** A measure the person already has that makes this redundant. */
  coveredBy?: MeasureKey;
  tradeoffs: string;
  leans: Leans;
  /** The kinds of place it makes sense for; everywhere when absent. */
  environments?: readonly EnvironmentType[];
};

export function suits(i: Intervention, env: EnvironmentType): boolean {
  return !i.environments || i.environments.includes(env);
}
