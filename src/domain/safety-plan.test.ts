import { describe, expect, it } from "vitest";
import { CONCERN_KEYS } from "@/config/assessment";
import { HARD_CONSTRAINT_KEYS } from "@/config/constraints";
import { ENVIRONMENT_TYPE_KEYS } from "@/config/environments";
import { findIntervention, needsPurchase } from "@/config/interventions";
import { deriveFindings } from "./findings";
import { buildSafetyPlan, type PlanInput } from "./safety-plan";

const input = (overrides: Partial<PlanInput> = {}): PlanInput => ({
  environment: "HOME",
  concerns: [],
  exposures: [],
  threats: [],
  upcoming: "",
  measures: [],
  constraints: [],
  budget: "HIGH",
  leans: {},
  ...overrides,
});
const plan = (overrides: Partial<PlanInput> = {}) => buildSafetyPlan(input(overrides));
const only = (overrides: Partial<PlanInput>) => {
  const p = plan(overrides);
  expect(p.findings).toHaveLength(1);
  return p.findings[0]!;
};

describe("deriveFindings", () => {
  it("makes a ticked worry a finding, with its reason", () => {
    expect(deriveFindings(input({ concerns: ["BURGLARY"] }))).toEqual([
      { concern: "BURGLARY", priority: "MEDIUM", because: ["You said this worries you"] },
    ]);
  });

  it("surfaces what an exposure makes likely, even unticked, at low priority", () => {
    const [f] = deriveFindings(input({ environment: "JOURNEY", exposures: ["LATE_ALONE"] }));
    expect(f).toMatchObject({ concern: "ARRIVING_AT_NIGHT", priority: "LOW" });
  });

  it("raises a concern two exposures point at to medium, and a known threat to high", () => {
    const two = deriveFindings(input({ environment: "JOURNEY", exposures: ["LATE_ALONE", "PREDICTABLE_ROUTINE"] }));
    expect(two.find((f) => f.concern === "FOLLOWED")?.priority).toBe("MEDIUM");
    const threat = deriveFindings(input({ threats: ["SPECIFIC_PERSON"] }));
    expect(threat.map((f) => [f.concern, f.priority])).toEqual([
      ["UNWANTED_VISITORS", "HIGH"],
      ["ARRIVING_AT_NIGHT", "HIGH"],
      ["BEING_FOUND", "HIGH"],
    ]);
    expect(threat[0]!.because).toEqual(["Known threat: a specific person has threatened or harassed me"]);
  });

  it("ignores what doesn't apply to the kind of place", () => {
    expect(deriveFindings(input({ environment: "VEHICLE", concerns: ["BURGLARY", "GUEST_CONFLICT"] }))).toEqual([]);
  });

  it("turns an upcoming occasion into a finding in the person's words", () => {
    expect(deriveFindings(input({ upcoming: "Conference in Davos, 12 Jan" }))).toEqual([
      { concern: "UPCOMING_EVENT", priority: "MEDIUM", because: ["You mentioned: “Conference in Davos, 12 Jan”"] },
    ]);
  });
});

describe("buildSafetyPlan", () => {
  it("says nothing to buy when there is nothing to address", () => {
    const p = plan();
    expect(p).toMatchObject({ version: 2, findings: [], nothingToBuy: true });
  });

  it("recommends the least intrusive option first, and says why", () => {
    const f = only({ concerns: ["UNWANTED_VISITORS"] });
    expect(f.recommended).toEqual({
      key: "DOOR_POLICY",
      why: ["The least intrusive option within your limits and budget that addresses this.", "Needs nothing bought."],
    });
  });

  it("never recommends, or offers, anything that breaks a hard limit", () => {
    const p = plan({
      concerns: ["BURGLARY", "UNWANTED_VISITORS", "ARRIVING_AT_NIGHT", "BEING_FOUND"],
      threats: ["SPECIFIC_PERSON"],
      constraints: [...HARD_CONSTRAINT_KEYS],
    });
    for (const f of p.findings) {
      for (const key of [f.recommended?.key, ...f.alternatives, ...f.overBudget]) {
        if (key) expect(findIntervention(key)?.conflictsWith, key).toEqual([]);
      }
    }
    const burglary = p.findings.find((f) => f.concern === "BURGLARY")!;
    expect(burglary.excluded.find((e) => e.key === "MONITORED_ALARM")!.constraints).toEqual([
      "NO_AUTO_POLICE_SHARING",
      "LOCAL_ONLY_PROCESSING",
    ]);
  });

  it("keeps anything over budget out of the recommendation, but visible", () => {
    const f = only({ concerns: ["ARRIVING_AT_NIGHT"], budget: "FREE" });
    expect(needsPurchase(findIntervention(f.recommended!.key)!.kind)).toBe(false);
    expect(f.overBudget).toContain("ENTRANCE_LIGHT");
    expect(plan({ concerns: ["ARRIVING_AT_NIGHT"], budget: "FREE" }).nothingToBuy).toBe(true);
  });

  it("flags a purchase when a threat makes paying proportionate — within budget only", () => {
    const threatened = plan({ threats: ["SPECIFIC_PERSON"], budget: "MEDIUM" });
    const night = threatened.findings.find((f) => f.concern === "ARRIVING_AT_NIGHT")!;
    expect(night.recommended?.key).toBe("ACCOMPANIED_HOME");
    expect(threatened.nothingToBuy).toBe(false);

    const free = plan({ threats: ["SPECIFIC_PERSON"], budget: "FREE" });
    expect(free.findings.find((f) => f.concern === "ARRIVING_AT_NIGHT")!.overBudget).toContain("ACCOMPANIED_HOME");
    expect(free.nothingToBuy).toBe(true);
  });

  it("prefers free over paid when both are equally private", () => {
    expect(only({ concerns: ["ARRIVING_AT_NIGHT"] }).recommended?.key).toBe("ROUTE_VARIATION");
  });

  it("offers only what suits the kind of place", () => {
    const home = plan({ threats: ["PAST_INCIDENT"] });
    for (const f of home.findings) {
      expect([f.recommended?.key, ...f.alternatives]).not.toContain("DEESCALATION_TRAINING");
    }
  });

  it("counts what the person already does — unless a known threat justifies more", () => {
    const covered = only({ concerns: ["ARRIVING_AT_NIGHT"], measures: ["CHECK_IN_CONTACT"] });
    expect(covered).toMatchObject({ outcome: "COVERED", recommended: null, alreadyCovered: ["CHECK_IN_ROUTINE"] });

    const threatened = plan({ threats: ["SPECIFIC_PERSON"], measures: ["CHECK_IN_CONTACT"] });
    const night = threatened.findings.find((f) => f.concern === "ARRIVING_AT_NIGHT")!;
    expect(night.outcome).toBe("RECOMMENDED");
    expect(night.recommended!.why).toContain("What you already do helps, but a known threat justifies more.");
  });

  it("picks the most effective option for a high-priority finding", () => {
    const f = plan({ threats: ["SPECIFIC_PERSON"] }).findings.find((x) => x.concern === "BEING_FOUND")!;
    expect(findIntervention(f.recommended!.key)!.benefit).toBe("HIGH");
    expect(f.recommended!.why[0]).toBe(
      "The most effective option within your limits and budget — this is a high priority.",
    );
  });

  it("always finds something free within every limit, for any concern at any place", () => {
    for (const environment of ENVIRONMENT_TYPE_KEYS) {
      const p = plan({
        environment,
        concerns: [...CONCERN_KEYS].filter((c) => c !== "UPCOMING_EVENT"),
        upcoming: "Something coming up",
        constraints: [...HARD_CONSTRAINT_KEYS],
        budget: "FREE",
      });
      for (const f of p.findings) expect(f.outcome, `${environment}/${f.concern}`).toBe("RECOMMENDED");
      expect(p.nothingToBuy).toBe(true);
    }
  });

  it("keeps a Protector out for someone who wants no one with them", () => {
    const f = only({ upcoming: "Gala dinner", constraints: ["NO_HUMAN_PROTECTOR"] });
    expect(f.excluded).toEqual([{ key: "EVENT_PROTECTOR", constraints: ["NO_HUMAN_PROTECTOR"] }]);
  });

  it("serves a nightclub's conflict worry with people and training, not surveillance first (Person D)", () => {
    const f = only({ environment: "VENUE", concerns: ["GUEST_CONFLICT"] });
    expect(f.recommended?.key).toBe("HOUSE_RULES_BRIEFING");
    expect(f.alternatives.indexOf("VENUE_CCTV")).toBe(f.alternatives.length - 1);
  });
});
