/**
 * "Did it help?" — what a person says about each step a Safety Plan gave
 * them, and what their next plan learns from it. Keyed by person and step,
 * not by plan: the same step in two plans is one experience.
 */
export const STEP_STATUSES = ["DONE", "NOT_FOR_ME"] as const;
export type StepStatus = (typeof STEP_STATUSES)[number];

export const STEP_HELPED = ["YES", "SOMEWHAT", "NO"] as const;
export type StepHelped = (typeof STEP_HELPED)[number];

export type StepOutcome = { status: StepStatus; helped: StepHelped | null };

export const HELPED_LABELS: Record<StepHelped, string> = {
  YES: "Yes",
  SOMEWHAT: "A little",
  NO: "No",
};

/** What the next plan takes from the answers so far. */
export type PlanLessons = {
  /** Done, and it helped: counts like a measure the person already has. */
  worked: string[];
  /** Done and it did not help, or "not for me": recommended no more. */
  setAside: string[];
};

export function lessonsFrom(outcomes: ReadonlyMap<string, StepOutcome>): PlanLessons {
  const worked: string[] = [];
  const setAside: string[] = [];
  for (const [key, o] of outcomes) {
    if (o.status === "NOT_FOR_ME" || o.helped === "NO") setAside.push(key);
    else if (o.helped === "YES" || o.helped === "SOMEWHAT") worked.push(key);
  }
  return { worked: worked.sort(), setAside: setAside.sort() };
}

/** One line for a step's row, once the person has said something about it. */
export function outcomeSentence(o: StepOutcome | undefined): string | null {
  if (!o) return null;
  if (o.status === "NOT_FOR_ME") return "Not for you. Your next plan suggests something else.";
  if (o.helped === "YES") return "Done, and it helped. Your next plan counts it as something you have.";
  if (o.helped === "SOMEWHAT") return "Done, and it helped a little. Your next plan counts it as something you have.";
  if (o.helped === "NO") return "Done, but it didn't help. Your next plan suggests something else.";
  return "Done.";
}
