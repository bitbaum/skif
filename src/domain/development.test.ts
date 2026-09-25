import { describe, expect, it } from "vitest";
import { developmentProfileFrom, leadParagraph } from "./development";

const skif = {
  slug: "skif",
  name: "Skif",
  what: "Holistic safety.\n\nFrom the owner:\n\nWho is this for?",
  status: "prospect",
  roadmap: [
    {
      title: "Phase 1",
      status: "active",
      progress: 140,
      targetDate: "2026-12-01",
      milestones: ["Plain row", { title: "Checked", done: true }],
      source: null,
    },
  ],
  changelog: [{ date: "2026-09-24", done: "Shipped v1 (PR #2)." }],
};

const map = (projects: unknown[]) => ({ generatedAt: "2026-09-25T00:00:00Z", projects });

describe("developmentProfileFrom", () => {
  it("projects the product's entry", () => {
    const profile = developmentProfileFrom(map([{ slug: "other" }, skif]), "skif");
    expect(profile).toEqual({
      slug: "skif",
      name: "Skif",
      what: "Holistic safety.",
      roadmap: [
        {
          title: "Phase 1",
          status: "active",
          progress: 100,
          targetDate: "2026-12-01",
          milestones: ["Plain row", { title: "Checked", done: true }],
          source: null,
        },
      ],
      changelog: [{ date: "2026-09-24", done: "Shipped v1 (PR #2)." }],
    });
  });

  it("keeps an empty roadmap empty rather than failing", () => {
    const profile = developmentProfileFrom(map([{ ...skif, roadmap: [] }]), "skif");
    expect(profile?.roadmap).toEqual([]);
  });

  it("fills optional roadmap fields with null when the producer omits them", () => {
    const profile = developmentProfileFrom(map([{ ...skif, roadmap: [{ title: "Next", milestones: [] }] }]), "skif");
    expect(profile?.roadmap[0]).toEqual({
      title: "Next",
      status: null,
      progress: null,
      targetDate: null,
      milestones: [],
      source: null,
    });
  });

  it("is not thrown off by a malformed neighbouring entry", () => {
    expect(developmentProfileFrom(map([{ slug: "other", roadmap: "oops" }, skif]), "skif")).not.toBeNull();
  });

  it.each([
    ["not an object", "nope"],
    ["no projects array", { projects: "x" }],
    ["product missing", map([{ ...skif, slug: "someone-else" }])],
    ["changelog is not a list", map([{ ...skif, changelog: null }])],
    ["changelog entry without text", map([{ ...skif, changelog: [{ date: "2026-09-24" }] }])],
    ["milestone of the wrong shape", map([{ ...skif, roadmap: [{ title: "x", milestones: [{ done: true }] }] }])],
    ["progress that is not a number", map([{ ...skif, roadmap: [{ title: "x", milestones: [], progress: "80" }] }])],
  ])("returns null when the payload is unusable: %s", (_, payload) => {
    expect(developmentProfileFrom(payload, "skif")).toBeNull();
  });
});

describe("leadParagraph", () => {
  it("keeps only the first paragraph", () => {
    expect(leadParagraph("One line.\n  \nMore.")).toBe("One line.");
  });

  it("returns null for nothing to show", () => {
    expect(leadParagraph(null)).toBeNull();
    expect(leadParagraph("   ")).toBeNull();
  });
});
