/**
 * Safety Plans are stored as they were decided, so a plan made under an older
 * version of the rules keeps its old shape. `readPlan` turns any stored plan
 * into the current one for display — nothing is recomputed.
 */
import type { ConcernKey } from "@/config/assessment";
import type { HardConstraintKey } from "@/config/constraints";
import type { ExcludedIntervention, SafetyPlan } from "./safety-plan";

/** v1 (PR #2): one entry per ticked concern, no findings, no budget. */
type PlanV1 = {
  version?: undefined;
  constraints: HardConstraintKey[];
  concerns: {
    concern: ConcernKey;
    recommended: string | null;
    alreadyCovered: string[];
    alternatives: string[];
    excluded: ExcludedIntervention[];
  }[];
  nothingToBuy: boolean;
};

export type StoredPlan = SafetyPlan | PlanV1;

export function readPlan(plan: StoredPlan): SafetyPlan {
  if (plan.version === 2) return plan;
  return {
    version: 2,
    constraints: plan.constraints,
    budget: null,
    nothingToBuy: plan.nothingToBuy,
    findings: plan.concerns.map((c) => ({
      concern: c.concern,
      priority: "MEDIUM",
      because: ["You said this worries you"],
      outcome: c.recommended ? "RECOMMENDED" : "COVERED",
      recommended: c.recommended ? { key: c.recommended, why: [] } : null,
      alreadyCovered: c.alreadyCovered,
      alternatives: c.alternatives,
      overBudget: [],
      excluded: c.excluded,
    })),
  };
}
