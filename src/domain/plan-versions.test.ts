import { describe, expect, it } from "vitest";
import { readPlan, type StoredPlan } from "./plan-versions";
import { buildSafetyPlan } from "./safety-plan";

describe("readPlan", () => {
  it("shows a v1 plan as it was decided, in today's shape", () => {
    const v1: StoredPlan = {
      constraints: ["NO_CLOUD_VIDEO"],
      concerns: [
        {
          concern: "BURGLARY",
          recommended: null,
          alreadyCovered: ["NEIGHBOUR_ARRANGEMENT"],
          alternatives: ["LIVED_IN_ROUTINE"],
          excluded: [{ key: "INDOOR_CAMERA", constraints: ["NO_CLOUD_VIDEO"] }],
        },
        { concern: "UNWANTED_VISITORS", recommended: "DOOR_POLICY", alreadyCovered: [], alternatives: [], excluded: [] },
      ],
      nothingToBuy: true,
    };
    const plan = readPlan(v1);
    expect(plan).toMatchObject({ version: 2, budget: null, nothingToBuy: true, constraints: ["NO_CLOUD_VIDEO"] });
    expect(plan.findings.map((f) => [f.concern, f.outcome, f.recommended?.key ?? null])).toEqual([
      ["BURGLARY", "COVERED", null],
      ["UNWANTED_VISITORS", "RECOMMENDED", "DOOR_POLICY"],
    ]);
    expect(plan.findings[0]!.excluded).toEqual(v1.concerns[0]!.excluded);
  });

  it("returns a current plan untouched", () => {
    const current = buildSafetyPlan({
      environment: "HOME",
      concerns: ["BURGLARY"],
      exposures: [],
      threats: [],
      upcoming: "",
      measures: [],
      constraints: [],
      budget: "LOW",
    });
    expect(readPlan(current)).toBe(current);
  });
});
