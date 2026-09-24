import { describe, expect, it } from "vitest";
import { isAvailable, windowFromClock } from "./availability";
import { zonedLocalToDate } from "./time";

// 2026-10-02 is a Friday, 2026-10-03 a Saturday.
const at = (local: string) => zonedLocalToDate(local)!;
const FRIDAY_NIGHT = windowFromClock(5, 20 * 60, 4 * 60); // Fri 20:00 → Sat 04:00

describe("isAvailable", () => {
  it("covers a booking inside the window", () => {
    expect(isAvailable([FRIDAY_NIGHT], at("2026-10-02T21:00"), 4)).toBe(true);
  });
  it("covers a booking after midnight via the previous day's window", () => {
    expect(isAvailable([FRIDAY_NIGHT], at("2026-10-03T01:00"), 3)).toBe(true);
  });
  it("refuses a booking that outlasts the window", () => {
    expect(isAvailable([FRIDAY_NIGHT], at("2026-10-03T02:00"), 3)).toBe(false);
    expect(isAvailable([FRIDAY_NIGHT], at("2026-10-02T19:00"), 2)).toBe(false);
  });
  it("refuses another day, and no windows at all", () => {
    expect(isAvailable([FRIDAY_NIGHT], at("2026-10-01T21:00"), 1)).toBe(false);
    expect(isAvailable([], at("2026-10-02T21:00"), 1)).toBe(false);
  });
  it("reads Zürich time, not UTC", () => {
    const morning = windowFromClock(5, 8 * 60, 9 * 60);
    expect(isAvailable([morning], at("2026-10-02T08:00"), 1)).toBe(true);
  });
  it("chains back-to-back windows across midnight", () => {
    const allWeek = [1, 2, 3, 4, 5, 6, 7].map((d) => windowFromClock(d, 0, 0));
    expect(isAvailable(allWeek, at("2026-10-02T22:30"), 6)).toBe(true);
    // Sunday night into Monday wraps the week.
    const sundayMonday = [windowFromClock(7, 20 * 60, 0), windowFromClock(1, 0, 3 * 60)];
    expect(isAvailable(sundayMonday, at("2026-10-04T22:00"), 4)).toBe(true);
    expect(isAvailable(sundayMonday, at("2026-10-04T22:00"), 6)).toBe(false);
  });
  it("treats an equal from/to as a full day", () => {
    expect(windowFromClock(1, 0, 0).durationMinutes).toBe(24 * 60);
  });
});
