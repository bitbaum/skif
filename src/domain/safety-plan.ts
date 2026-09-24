/**
 * Builds a Safety Plan from an assessment. Pure and deterministic: for each
 * concern it recommends the most proportionate intervention (least intrusive,
 * then cheapest) that respects every hard constraint — unless something the
 * person already does addresses it. "Nothing to buy" is a first-class outcome, not a fallback.
 */
import type { HardConstraintKey } from "@/config/constraints";
import {
  costRank,
  INTERVENTIONS,
  type ConcernKey,
  type Intervention,
  type MeasureKey,
} from "@/config/assessment";

export type PlanInput = {
  concerns: readonly ConcernKey[];
  measures: readonly MeasureKey[];
  constraints: readonly HardConstraintKey[];
};

export type ExcludedIntervention = { key: string; constraints: HardConstraintKey[] };

export type ConcernPlan = {
  concern: ConcernKey;
  /** The most proportionate eligible intervention, or null when what the
   * person already does covers it. */
  recommended: string | null;
  /** Interventions the person's existing measures already cover. */
  alreadyCovered: string[];
  /** Stronger or costlier eligible options, most proportionate first. */
  alternatives: string[];
  /** Options ruled out by a hard constraint, with which one. */
  excluded: ExcludedIntervention[];
};

export type SafetyPlan = {
  constraints: HardConstraintKey[];
  concerns: ConcernPlan[];
  /** True when nothing recommended requires buying a product or service. */
  nothingToBuy: boolean;
};

function proportionality(a: Intervention, b: Intervention): number {
  return (
    a.intrusiveness - b.intrusiveness ||
    costRank(a.cost) - costRank(b.cost) ||
    a.key.localeCompare(b.key)
  );
}

function planForConcern(concern: ConcernKey, input: PlanInput): ConcernPlan {
  const candidates = (INTERVENTIONS as readonly Intervention[])
    .filter((i) => i.addresses.includes(concern))
    .sort(proportionality);

  const excluded: ExcludedIntervention[] = [];
  const alreadyCovered: string[] = [];
  const eligible: string[] = [];

  for (const i of candidates) {
    const broken = i.conflictsWith.filter((c) => input.constraints.includes(c));
    if (broken.length > 0) excluded.push({ key: i.key, constraints: broken });
    else if (i.coveredBy && input.measures.includes(i.coveredBy)) alreadyCovered.push(i.key);
    else eligible.push(i.key);
  }

  // What they already do counts: a concern something they already do
  // addresses needs nothing new. Stronger options stay visible as alternatives.
  const covered = alreadyCovered.length > 0;

  return {
    concern,
    recommended: covered ? null : (eligible[0] ?? null),
    alreadyCovered,
    alternatives: covered ? eligible : eligible.slice(1),
    excluded,
  };
}

export function buildSafetyPlan(input: PlanInput): SafetyPlan {
  const concerns = [...new Set(input.concerns)].map((c) => planForConcern(c, input));
  const nothingToBuy = concerns.every((c) => {
    if (c.recommended === null) return true;
    return !INTERVENTIONS.find((i) => i.key === c.recommended)?.purchase;
  });
  return { constraints: [...input.constraints], concerns, nothingToBuy };
}
