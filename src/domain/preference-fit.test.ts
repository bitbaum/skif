import { describe, expect, it } from "vitest";
import { findIntervention } from "@/config/interventions";
import { describeLeans, leansOf, preferenceFit } from "./preference-fit";
import { buildSafetyPlan, type PlanInput } from "./safety-plan";

const input = (overrides: Partial<PlanInput>): PlanInput => ({
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
const recommended = (overrides: Partial<PlanInput>) => buildSafetyPlan(input(overrides)).findings[0]!.recommended!;

describe("preferenceFit", () => {
  it("names the leans an intervention fits and goes against", () => {
    const camera = findIntervention("LOCAL_DOORBELL_CAMERA")!;
    expect(preferenceFit(camera, { PRIVACY: -1, HUMAN_TECH: 1, SCOPE: 1 })).toEqual({
      with: ["technology"],
      against: ["privacy"],
    });
  });

  it("names leans in the preferences page's order, whatever order they're stored in", () => {
    expect(describeLeans({ DISCRETION: -1, SCOPE: 1, PRIVACY: -1 })).toEqual(["privacy", "community solutions", "discretion"]);
  });

  it("folds the presence style in as the discretion lean, and drops balanced axes", () => {
    expect(leansOf({ PRIVACY: -1, SCOPE: 0 }, "VISIBLE")).toEqual({ DISCRETION: 1, PRIVACY: -1 });
  });
});

describe("leans in the plan", () => {
  it("reorders acceptable options by the person's leans", () => {
    expect(recommended({ concerns: ["UNWANTED_VISITORS"] }).key).toBe("DOOR_POLICY");
    // Someone who leans towards technology (and is balanced on privacy) gets
    // a device first — a local one, since nothing cloud-based fits better.
    const tech = recommended({ concerns: ["UNWANTED_VISITORS"], leans: { HUMAN_TECH: 1 } });
    expect(tech.key).toBe("LOCAL_DOORBELL_CAMERA");
    // Add a privacy lean and the camera drops back behind the private options.
    expect(recommended({ concerns: ["UNWANTED_VISITORS"], leans: { HUMAN_TECH: 1, PRIVACY: -1 } }).key).toBe(
      "DOOR_VIEWER_FIT",
    );
    // Someone who leans towards community solutions gets the neighbour.
    expect(recommended({ concerns: ["UNWANTED_VISITORS"], leans: { SCOPE: 1 } }).key).toBe("NEIGHBOUR_ARRANGEMENT");
  });

  it("never lets a lean bring back something a hard limit or the budget excludes", () => {
    const p = buildSafetyPlan(
      input({
        concerns: ["BURGLARY"],
        leans: { PRIVACY: 1, AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: 1 },
        constraints: ["NO_CLOUD_VIDEO", "NO_INTERIOR_CAMERAS"],
        budget: "LOW",
      }),
    );
    const f = p.findings[0]!;
    expect(["CLOUD_DOORBELL_CAMERA", "INDOOR_CAMERA"]).not.toContain(f.recommended!.key);
    expect(f.overBudget).toContain("MONITORED_ALARM");
  });

  it("says which leans the recommendation follows, and which it can't", () => {
    const withLean = recommended({ concerns: ["UNWANTED_VISITORS"], leans: { PRIVACY: -1 } });
    expect(withLean.why).toContain("Fits your lean towards privacy.");
    const forced = recommended({ concerns: ["GUEST_CONFLICT"], environment: "VENUE", budget: "FREE", leans: { HUMAN_TECH: 1 } });
    expect(forced.key).toBe("HOUSE_RULES_BRIEFING");
    expect(forced.why.some((w) => w.startsWith("Goes against your lean towards technology"))).toBe(true);
  });

  it("keeps the most effective option first for a known threat, leans second", () => {
    const f = buildSafetyPlan(input({ threats: ["SPECIFIC_PERSON"], leans: { HUMAN_TECH: 1 } })).findings.find(
      (x) => x.concern === "ARRIVING_AT_NIGHT",
    )!;
    expect(findIntervention(f.recommended!.key)!.benefit).toBe("HIGH");
  });

  it("records the leans it followed on the plan", () => {
    expect(buildSafetyPlan(input({ leans: { SCOPE: 1 } })).leans).toEqual({ SCOPE: 1 });
  });
});
