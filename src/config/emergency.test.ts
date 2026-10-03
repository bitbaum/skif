import { describe, expect, it } from "vitest";
import { EMERGENCY_NUMBERS, emergencyNumbersText } from "./emergency";

describe("emergency config", () => {
  it("lists the Swiss public emergency numbers once each", () => {
    const numbers = EMERGENCY_NUMBERS.map((e) => e.number);
    expect(numbers).toEqual(["117", "144", "118", "112"]);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("names every number in prose", () => {
    const text = emergencyNumbersText();
    for (const e of EMERGENCY_NUMBERS) expect(text).toContain(`${e.number} (${e.label.toLowerCase()})`);
  });
});
