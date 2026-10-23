import { describe, expect, it } from "vitest";
import { capabilityFieldName } from "@/config/capabilities";
import { applicationValues } from "./protector-form";

describe("application form values", () => {
  it("starts a first application blank, so experience is never a silent 0", () => {
    expect(applicationValues(null, [])).toEqual({});
  });

  it("keys a saved profile and its capabilities exactly as the form posts them", () => {
    const values = applicationValues(
      {
        displayName: "Anna",
        bio: "Calm.",
        services: ["NIGHT_OUT"],
        languages: ["de"],
        experienceYears: 0,
        presenceStyles: ["DISCREET"],
      },
      [{ capability: "FIRST_AID", level: "BASIC", evidence: "Red Cross course" }],
    );
    expect(values).toMatchObject({ displayName: "Anna", experienceYears: "0", languages: ["de"] });
    expect(values[capabilityFieldName("FIRST_AID", "level")]).toBe("BASIC");
    expect(values[capabilityFieldName("FIRST_AID", "evidence")]).toBe("Red Cross course");
  });
});

describe("application errors", () => {
  it("name the field as the form does, and say what to do", async () => {
    const { protectorApplication, describeIssue } = await import("./inputs");
    const { APPLICATION_FIELD_LABELS } = await import("@/config/protectors");
    const parsed = protectorApplication.safeParse({
      displayName: "Anna",
      bio: "Calm.",
      experienceYears: "8",
      languages: ["en"],
      services: ["NIGHT_OUT"],
      presenceStyles: [],
      capabilities: [],
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) expect(describeIssue(parsed.error, APPLICATION_FIELD_LABELS)).toBe("Styles you work in: choose at least one");
  });
});
