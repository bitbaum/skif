import { describe, expect, it } from "vitest";
import { availabilityLine } from "./availability-fields";

const row = (weekday: number, startMinute: number, durationMinutes: number) =>
  ({ id: `w${weekday}`, protectorId: "p", weekday, startMinute, durationMinutes }) as never;

describe("availabilityLine", () => {
  it("says 'Every day' for the same hours all week, so seven lines become one", () => {
    const week = [1, 2, 3, 4, 5, 6, 7].map((d) => row(d, 600, 810));
    expect(availabilityLine(week)).toBe("Every day 10:00–23:30");
  });

  it("lists the days when the hours differ, and says so plainly when nothing is set", () => {
    expect(availabilityLine([row(1, 1200, 480), row(5, 1080, 480)])).toBe("Mon 20:00–04:00 · Fri 18:00–02:00");
    expect(availabilityLine([])).toMatch(/Not set/);
  });
});
