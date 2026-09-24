import { describe, expect, it } from "vitest";
import { MATCH_WEIGHTS } from "@/config/matching";
import { rankProtectors, type MatchCandidate } from "./matching";

const base: MatchCandidate = {
  id: "a",
  displayName: "Anna",
  services: ["NIGHT_OUT"],
  languages: ["de"],
  skills: [],
  presenceStyles: ["DISCREET"],
  ratingScore: null,
  ratingCount: 0,
  completedRecently: 0,
  busy: false,
};

const request = { service: "NIGHT_OUT", languages: ["de"], presenceStyle: "DISCREET" } as const;

describe("rankProtectors", () => {
  it("explains every point of the score", () => {
    const { ranked } = rankProtectors(request, [{ ...base, skills: ["DE_ESCALATION"] }]);
    const top = ranked[0]!;
    expect(top.score).toBe(top.reasons.reduce((s, r) => s + r.points, 0));
    expect(top.reasons.map((r) => r.label)).toContain("De-escalation training");
    expect(top.score).toBe(
      MATCH_WEIGHTS.sharedLanguage + MATCH_WEIGHTS.relevantSkill + MATCH_WEIGHTS.presenceStyle,
    );
  });

  it("ranks judgement skills and good ratings higher", () => {
    const { ranked } = rankProtectors(request, [
      { ...base, id: "b", displayName: "Ben" },
      { ...base, id: "c", displayName: "Chiara", skills: ["DE_ESCALATION"], ratingScore: 1, ratingCount: 3 },
    ]);
    expect(ranked.map((r) => r.id)).toEqual(["c", "b"]);
  });

  it("excludes with a reason instead of silently dropping", () => {
    const { ranked, excluded } = rankProtectors(request, [
      { ...base, id: "busy", busy: true },
      { ...base, id: "fr", languages: ["fr"] },
      { ...base, id: "venue", services: ["VENUE_STAFF"] },
    ]);
    expect(ranked).toEqual([]);
    expect(excluded.map((e) => e.reason)).toEqual([
      "Already committed to an overlapping booking",
      "Shares no language with the customer",
      "Does not offer Night Out",
    ]);
  });

  it("is deterministic on ties", () => {
    const candidates = [
      { ...base, id: "2", displayName: "Zoe" },
      { ...base, id: "1", displayName: "Anna" },
    ];
    const a = rankProtectors(request, candidates);
    const b = rankProtectors(request, [...candidates].reverse());
    expect(a).toEqual(b);
    expect(a.ranked.map((r) => r.displayName)).toEqual(["Anna", "Zoe"]);
  });

  it("spreads work to Protectors with fewer recent jobs", () => {
    const { ranked } = rankProtectors(request, [
      { ...base, id: "x", displayName: "Anna", completedRecently: 5 },
      { ...base, id: "y", displayName: "Zoe" },
    ]);
    expect(ranked[0]!.id).toBe("y");
  });
});
