import { describe, expect, it } from "vitest";
import { DEVELOPMENT_LABELS, PUBLIC_DEVELOPMENT } from "./development";

const publicText = [
  PUBLIC_DEVELOPMENT.what ?? "",
  ...PUBLIC_DEVELOPMENT.roadmap.flatMap((r) => [r.title, ...r.milestones.map((m) => (typeof m === "string" ? m : m.title))]),
  ...PUBLIC_DEVELOPMENT.changelog.map((c) => c.done),
  ...Object.values(DEVELOPMENT_LABELS),
];

describe("public roadmap and changelog", () => {
  it("is written for the public: no PR numbers, file names or build jargon", () => {
    for (const text of publicText) {
      expect(text, text).not.toMatch(/#\d|\bPR\b|\.(md|ts|tsx)\b|\bP[0-2]\b|docs\/|src\/|\bmerged?\b|Playwright|\bOIDC\b/i);
    }
  });

  it("shows three to five next steps, never an empty roadmap", () => {
    expect(PUBLIC_DEVELOPMENT.roadmap.length).toBeGreaterThanOrEqual(3);
    expect(PUBLIC_DEVELOPMENT.roadmap.length).toBeLessThanOrEqual(5);
  });

  it("makes no dated promises about planned work", () => {
    for (const item of PUBLIC_DEVELOPMENT.roadmap) expect(item.targetDate, item.title).toBeNull();
  });

  it("lists changes newest first, with real dates", () => {
    const dates = PUBLIC_DEVELOPMENT.changelog.map((c) => c.date);
    for (const d of dates) expect(Number.isNaN(Date.parse(d)), d).toBe(false);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});
