import { describe, expect, it } from "vitest";
import { COURSES, type Course } from "./academy";
import { guideBySlug } from "./guides";

describe("academy", () => {
  it("points a course only at a guide that exists", () => {
    for (const c of COURSES as readonly Course[]) if (c.guide) expect(guideBySlug(c.guide), c.key).toBeDefined();
  });

  it("gives every course a key unique across the Academy, since sign-ups store it", () => {
    const keys = COURSES.map((c) => c.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
