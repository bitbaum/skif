import { describe, expect, it } from "vitest";
import { bookingInput, describeIssue } from "./inputs";

describe("describeIssue", () => {
  it("names a booking's start time as the form does, not as the code does", () => {
    const parsed = bookingInput.safeParse({
      service: "NIGHT_OUT",
      startsAt: "2020-01-01T20:00",
      hours: 3,
      area: "KREIS_1",
      meetingPoint: "Bahnhofstrasse 1",
      notes: "",
      requiredCapabilities: [],
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success)
      expect(describeIssue(parsed.error)).toBe(
        "Start time: must be in the future",
      );
  });

  it("lets a form's own labels win, and falls back to the path for a field it does not know", () => {
    const parsed = bookingInput.safeParse({ service: "NIGHT_OUT" });
    if (parsed.success) throw new Error("expected a failure");
    expect(
      describeIssue(parsed.error, { startsAt: "When" }).startsWith("When:"),
    ).toBe(true);
    expect(
      describeIssue({
        issues: [{ path: ["mystery"], message: "Bad" }],
      } as never),
    ).toBe("mystery: bad");
  });
});
