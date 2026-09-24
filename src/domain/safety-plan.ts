/**
 * Builds a Safety Plan from an assessment (SPEC §12). Pure and deterministic.
 *
 * For each finding it recommends one intervention and says why:
 *  - never one that breaks a hard constraint (listed as excluded, with which);
 *  - never one over budget (listed separately, so the person sees it exists);
 *  - only what suits the kind of place (no staff training for a flat);
 *  - for most findings, the *least intrusive* option that addresses it
 *    (privacy first, then cost, then freedom);
 *  - for a high-priority finding (a known threat), the *most effective* one,
 *    because proportionality cuts both ways;
 *  - nothing new when what the person already does covers it — unless the
 *    finding is high priority.
 * "Nothing to buy" is a first-class outcome, not a fallback.
 */
import type { HardConstraintKey } from "@/config/constraints";
import { costRank, type ConcernKey, type CostTier, type MeasureKey } from "@/config/assessment";
import { findIntervention, INTERVENTIONS, needsPurchase, suits, type Intervention, type Level } from "@/config/interventions";
import { deriveFindings, type Finding, type FindingInput } from "./findings";

export type PlanInput = FindingInput & {
  measures: readonly MeasureKey[];
  constraints: readonly HardConstraintKey[];
  budget: CostTier;
};

export type ExcludedIntervention = { key: string; constraints: HardConstraintKey[] };
export type Recommendation = { key: string; why: string[] };

export type FindingPlan = Finding & {
  /** RECOMMENDED: one step below. COVERED: what they already do is enough.
   * NOTHING_FITS: every option breaks a limit or the budget. */
  outcome: "RECOMMENDED" | "COVERED" | "NOTHING_FITS";
  recommended: Recommendation | null;
  alreadyCovered: string[];
  /** Other options within limits and budget, in the order we'd suggest them. */
  alternatives: string[];
  overBudget: string[];
  excluded: ExcludedIntervention[];
};

export type SafetyPlan = {
  version: 2;
  constraints: HardConstraintKey[];
  /** Null only on plans made before budgets were asked (see plan-versions.ts). */
  budget: CostTier | null;
  findings: FindingPlan[];
  /** True when nothing recommended requires buying a product or service. */
  nothingToBuy: boolean;
};

const BENEFIT_RANK: Record<Level, number> = { LOW: 0, MEDIUM: 1, HIGH: 2 };

/** Privacy first, then money, then how much it asks of the person's freedom. */
function leastIntrusive(a: Intervention, b: Intervention): number {
  return (
    a.privacyImpact - b.privacyImpact ||
    costRank(a.cost) - costRank(b.cost) ||
    a.autonomyImpact - b.autonomyImpact ||
    BENEFIT_RANK[b.benefit] - BENEFIT_RANK[a.benefit] ||
    a.key.localeCompare(b.key)
  );
}

function mostEffective(a: Intervention, b: Intervention): number {
  return BENEFIT_RANK[b.benefit] - BENEFIT_RANK[a.benefit] || leastIntrusive(a, b);
}

function whyRecommended(i: Intervention, finding: Finding, covered: boolean): string[] {
  const why =
    finding.priority === "HIGH"
      ? ["The most effective option within your limits and budget — this is a high priority."]
      : ["The least intrusive option within your limits and budget that addresses this."];
  if (covered) why.push("What you already do helps, but a known threat justifies more.");
  if (!needsPurchase(i.kind)) why.push("Needs nothing bought.");
  return why;
}

function planFinding(finding: Finding, input: PlanInput): FindingPlan {
  const high = finding.priority === "HIGH";
  const candidates = (INTERVENTIONS as readonly Intervention[])
    .filter((i) => (i.addresses as readonly ConcernKey[]).includes(finding.concern) && suits(i, input.environment))
    .sort(high ? mostEffective : leastIntrusive);

  const excluded: ExcludedIntervention[] = [];
  const alreadyCovered: string[] = [];
  const overBudget: string[] = [];
  const eligible: Intervention[] = [];
  for (const i of candidates) {
    const broken = i.conflictsWith.filter((c) => input.constraints.includes(c));
    if (broken.length > 0) excluded.push({ key: i.key, constraints: broken });
    else if (i.coveredBy && input.measures.includes(i.coveredBy)) alreadyCovered.push(i.key);
    else if (costRank(i.cost) > costRank(input.budget)) overBudget.push(i.key);
    else eligible.push(i);
  }

  const covered = alreadyCovered.length > 0;
  const base = { ...finding, alreadyCovered, overBudget, excluded };
  if (covered && !high) {
    return { ...base, outcome: "COVERED", recommended: null, alternatives: eligible.map((i) => i.key) };
  }
  const [best, ...rest] = eligible;
  if (!best) return { ...base, outcome: "NOTHING_FITS", recommended: null, alternatives: [] };
  return {
    ...base,
    outcome: "RECOMMENDED",
    recommended: { key: best.key, why: whyRecommended(best, finding, covered) },
    alternatives: rest.map((i) => i.key),
  };
}

export function buildSafetyPlan(input: PlanInput): SafetyPlan {
  const findings = deriveFindings(input).map((f) => planFinding(f, input));
  const nothingToBuy = findings.every((f) => {
    const i = f.recommended && findIntervention(f.recommended.key);
    return !i || !needsPurchase(i.kind);
  });
  return { version: 2, constraints: [...input.constraints], budget: input.budget, findings, nothingToBuy };
}
