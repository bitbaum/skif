import { describe, expect, it } from "vitest";
import { axisFields, preferencesInput } from "@/domain/inputs";
import { createTestDb } from "@/test/db";
import { getPreferences, savePreferences } from "./preferences";

describe("preferences", () => {
  it("parses axis answers from the form, balanced when unanswered", () => {
    const form = new FormData();
    form.set("axis.PRIVACY", "-1");
    form.set("axis.HARDENING", "1");
    const parsed = preferencesInput.parse({
      hardConstraints: ["LOCAL_ONLY_PROCESSING"],
      axes: axisFields(form),
      presenceStyle: "DISCREET",
      languages: [],
      valuesNote: "",
    });
    expect(parsed.axes).toEqual({ PRIVACY: -1, HARDENING: 1 });
  });

  it("rejects a lean that isn't left, balanced or right, and an unknown axis", () => {
    const base = { hardConstraints: [], presenceStyle: "DISCREET", languages: [], valuesNote: "" };
    expect(preferencesInput.safeParse({ ...base, axes: { PRIVACY: "2" } }).success).toBe(false);
    expect(preferencesInput.safeParse({ ...base, axes: { SURVEILLANCE: "1" } }).success).toBe(false);
  });

  it("stores the axes with the rest of the profile", async () => {
    const db = await createTestDb();
    await savePreferences(db, "oc-a", {
      hardConstraints: ["NO_HUMAN_PROTECTOR"],
      axes: { HUMAN_TECH: 1, SCOPE: -1 },
      presenceStyle: "VISIBLE",
      languages: ["en"],
      valuesNote: "",
    });
    expect(await getPreferences(db, "oc-a")).toMatchObject({
      hardConstraints: ["NO_HUMAN_PROTECTOR"],
      axes: { HUMAN_TECH: 1, SCOPE: -1 },
    });
  });
});
