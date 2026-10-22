import { describe, expect, it } from "vitest";
import { buildSafetyPlan, type PlanInput } from "./safety-plan";
import { lessonsFrom, outcomeSentence, type StepOutcome } from "./step-outcomes";

const input = (overrides: Partial<PlanInput> = {}): PlanInput => ({
  environment: "HOME",
  concerns: ["BURGLARY"],
  exposures: [],
  threats: [],
  upcoming: "",
  measures: [],
  constraints: [],
  budget: "HIGH",
  leans: {},
  ...overrides,
});

describe("what a plan learns from Did it help?", () => {
  it("counts a step that helped as had, and sets aside one that did not or was not wanted", () => {
    const outcomes = new Map<string, StepOutcome>([
      ["A", { status: "DONE", helped: "YES" }],
      ["B", { status: "DONE", helped: "SOMEWHAT" }],
      ["C", { status: "DONE", helped: "NO" }],
      ["D", { status: "NOT_FOR_ME", helped: null }],
      ["E", { status: "DONE", helped: null }],
    ]);
    expect(lessonsFrom(outcomes)).toEqual({ worked: ["A", "B"], setAside: ["C", "D"] });
  });

  it("recommends the next option, and says why, when the first did not help", () => {
    const first = buildSafetyPlan(input()).findings[0]!;
    const tried = first.recommended!.key;
    expect(first.alternatives.length).toBeGreaterThan(0);
    const next = buildSafetyPlan(input({ lessons: { worked: [], setAside: [tried] } })).findings[0]!;
    expect(next.recommended!.key).toBe(first.alternatives[0]);
    expect(next.setAside).toEqual([tried]);
    expect(next.recommended!.why.join(" ")).toMatch(/didn't help or wasn't for you/);
  });

  it("treats a step that helped like something the person already does", () => {
    const first = buildSafetyPlan(input()).findings[0]!;
    const next = buildSafetyPlan(input({ lessons: { worked: [first.recommended!.key], setAside: [] } })).findings[0]!;
    expect(next.outcome).toBe("COVERED");
    expect(next.alreadyCovered).toContain(first.recommended!.key);
  });

  it("leaves a plan exactly as before when nothing has been said", () => {
    expect(buildSafetyPlan(input({ lessons: { worked: [], setAside: [] } }))).toEqual(buildSafetyPlan(input()));
  });

  it("says what each answer means for the next plan", () => {
    expect(outcomeSentence(undefined)).toBeNull();
    expect(outcomeSentence({ status: "DONE", helped: null })).toBe("Done.");
    expect(outcomeSentence({ status: "DONE", helped: "NO" })).toMatch(/suggests something else/);
    expect(outcomeSentence({ status: "DONE", helped: "YES" })).toMatch(/counts it/);
  });
});
