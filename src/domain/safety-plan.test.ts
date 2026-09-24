import { describe, expect, it } from "vitest";
import { INTERVENTIONS } from "@/config/assessment";
import { buildSafetyPlan } from "./safety-plan";

const ALL_CONSTRAINTS = [
  "NO_FACIAL_RECOGNITION",
  "NO_INTERIOR_CAMERAS",
  "NO_CLOUD_VIDEO",
  "NO_AUTO_POLICE_SHARING",
] as const;

describe("buildSafetyPlan", () => {
  it("says nothing to buy when there is no concern", () => {
    const plan = buildSafetyPlan({ concerns: [], measures: [], constraints: [] });
    expect(plan.nothingToBuy).toBe(true);
    expect(plan.concerns).toEqual([]);
  });

  it("recommends the most proportionate option first", () => {
    const plan = buildSafetyPlan({ concerns: ["UNWANTED_VISITORS"], measures: [], constraints: [] });
    expect(plan.concerns[0]!.recommended).toBe("DOOR_POLICY");
    expect(plan.nothingToBuy).toBe(true);
  });

  it("never recommends, or lists as an alternative, anything breaking a hard constraint", () => {
    const plan = buildSafetyPlan({
      concerns: ["BURGLARY", "UNWANTED_VISITORS", "ARRIVING_AT_NIGHT", "BEING_FOUND"],
      measures: [],
      constraints: [...ALL_CONSTRAINTS],
    });
    for (const c of plan.concerns) {
      for (const key of [c.recommended, ...c.alternatives]) {
        const i = INTERVENTIONS.find((x) => x.key === key);
        if (i) expect(i.conflictsWith).toEqual([]);
      }
    }
    const burglary = plan.concerns.find((c) => c.concern === "BURGLARY")!;
    expect(burglary.excluded.map((e) => e.key).sort()).toEqual([
      "CLOUD_DOORBELL_CAMERA",
      "INDOOR_CAMERA",
      "MONITORED_ALARM",
    ]);
    expect(burglary.excluded.find((e) => e.key === "MONITORED_ALARM")!.constraints).toEqual([
      "NO_AUTO_POLICE_SHARING",
    ]);
  });

  it("lists invasive options as alternatives when the person has not ruled them out", () => {
    const plan = buildSafetyPlan({ concerns: ["BURGLARY"], measures: [], constraints: [] });
    expect(plan.concerns[0]!.excluded).toEqual([]);
    expect(plan.concerns[0]!.alternatives).toContain("MONITORED_ALARM");
  });

  it("counts what the person already does", () => {
    const plan = buildSafetyPlan({
      concerns: ["ARRIVING_AT_NIGHT"],
      measures: ["CHECK_IN_CONTACT"],
      constraints: [],
    });
    const night = plan.concerns[0]!;
    expect(night.alreadyCovered).toEqual(["CHECK_IN_ROUTINE"]);
    expect(night.recommended).toBeNull();
    expect(night.alternatives).toContain("ENTRANCE_LIGHT");
    expect(plan.nothingToBuy).toBe(true);
  });

  it("flags a purchase when the proportionate answer costs money", () => {
    const plan = buildSafetyPlan({ concerns: ["ARRIVING_AT_NIGHT"], measures: [], constraints: [] });
    expect(plan.concerns[0]!.recommended).toBe("ENTRANCE_LIGHT");
    expect(plan.nothingToBuy).toBe(false);
  });
});
