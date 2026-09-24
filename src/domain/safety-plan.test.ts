import { describe, expect, it } from "vitest";
import { INTERVENTIONS } from "@/config/assessment";
import { HARD_CONSTRAINT_KEYS } from "@/config/constraints";
import { buildSafetyPlan } from "./safety-plan";

const ALL_CONSTRAINTS = HARD_CONSTRAINT_KEYS;

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
      "LOCAL_DOORBELL_CAMERA",
      "MONITORED_ALARM",
    ]);
    expect(burglary.excluded.find((e) => e.key === "MONITORED_ALARM")!.constraints).toEqual([
      "NO_AUTO_POLICE_SHARING",
      "LOCAL_ONLY_PROCESSING",
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

  it("keeps a Protector out of the plan for someone who wants no one with them", () => {
    const plan = buildSafetyPlan({ concerns: ["ARRIVING_AT_NIGHT"], measures: [], constraints: ["NO_HUMAN_PROTECTOR"] });
    expect(plan.concerns[0]!.excluded).toEqual([{ key: "ACCOMPANIED_HOME", constraints: ["NO_HUMAN_PROTECTOR"] }]);
    expect(plan.concerns[0]!.alternatives).not.toContain("ACCOMPANIED_HOME");
  });

  it("rules out even a local camera for no persistent recording or no exterior cameras", () => {
    for (const c of ["NO_PERSISTENT_RECORDING", "NO_EXTERIOR_CAMERAS"] as const) {
      const plan = buildSafetyPlan({ concerns: ["UNWANTED_VISITORS"], measures: [], constraints: [c] });
      expect(plan.concerns[0]!.excluded.map((e) => e.key)).toContain("LOCAL_DOORBELL_CAMERA");
    }
  });
});
