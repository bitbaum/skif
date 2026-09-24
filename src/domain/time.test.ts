import { describe, expect, it } from "vitest";
import { zonedLocalToDate } from "./time";

describe("zonedLocalToDate", () => {
  it("reads summer time as UTC+2", () => {
    expect(zonedLocalToDate("2026-07-01T20:00")?.toISOString()).toBe("2026-07-01T18:00:00.000Z");
  });
  it("reads winter time as UTC+1", () => {
    expect(zonedLocalToDate("2026-12-01T20:00")?.toISOString()).toBe("2026-12-01T19:00:00.000Z");
  });
  it("handles the day after the spring switch", () => {
    expect(zonedLocalToDate("2026-03-29T12:00")?.toISOString()).toBe("2026-03-29T10:00:00.000Z");
  });
  it("rejects anything else", () => {
    expect(zonedLocalToDate("tomorrow")).toBeNull();
  });
});
