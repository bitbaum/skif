import { describe, expect, it } from "vitest";
import { LEVEL_FACTOR, MATCH_WEIGHTS, VERIFICATION_FACTOR } from "@/config/matching";
import type { HeldCapability } from "./capabilities";
import { rankProtectors, type MatchCandidate } from "./matching";

const base: MatchCandidate = {
  id: "a",
  displayName: "Anna",
  services: ["NIGHT_OUT"],
  languages: ["de"],
  capabilities: [],
  presenceStyles: ["DISCREET"],
  ratingScore: null,
  ratingCount: 0,
  completedRecently: 0,
  busy: false,
};

const request = { service: "NIGHT_OUT", languages: ["de"], presenceStyle: "DISCREET" } as const;
const DAY = "2026-10-01";
const rank = (candidates: MatchCandidate[]) => rankProtectors(request, candidates, DAY);

const held = (overrides: Partial<HeldCapability> = {}): HeldCapability => ({
  key: "DE_ESCALATION",
  level: "ADVANCED",
  verification: "VERIFIED",
  expiresOn: null,
  ...overrides,
});

describe("rankProtectors", () => {
  it("explains every point of the score", () => {
    const { ranked } = rank([{ ...base, capabilities: [held()] }]);
    const top = ranked[0]!;
    expect(top.score).toBe(top.reasons.reduce((s, r) => s + r.points, 0));
    expect(top.reasons.map((r) => r.label)).toContain("De-escalation — advanced, verified");
    expect(top.score).toBe(
      MATCH_WEIGHTS.sharedLanguage + MATCH_WEIGHTS.relevantCapability + MATCH_WEIGHTS.presenceStyle,
    );
  });

  it("ranks judgement skills and good ratings higher", () => {
    const { ranked } = rank([
      { ...base, id: "b", displayName: "Ben" },
      { ...base, id: "c", displayName: "Chiara", capabilities: [held()], ratingScore: 1, ratingCount: 3 },
    ]);
    expect(ranked.map((r) => r.id)).toEqual(["c", "b"]);
  });

  it("excludes with a reason instead of silently dropping", () => {
    const { ranked, excluded } = rank([
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
    const a = rank(candidates);
    const b = rank([...candidates].reverse());
    expect(a).toEqual(b);
    expect(a.ranked.map((r) => r.displayName)).toEqual(["Anna", "Zoe"]);
  });

  it("spreads work to Protectors with fewer recent jobs", () => {
    const { ranked } = rank([
      { ...base, id: "x", displayName: "Anna", completedRecently: 5 },
      { ...base, id: "y", displayName: "Zoe" },
    ]);
    expect(ranked[0]!.id).toBe("y");
  });

  it("counts a verified capability more than a self-declared one", () => {
    const { ranked } = rank([
      { ...base, id: "self", displayName: "Anna", capabilities: [held({ verification: "SELF_DECLARED" })] },
      { ...base, id: "ver", displayName: "Zoe", capabilities: [held()] },
    ]);
    expect(ranked.map((r) => r.id)).toEqual(["ver", "self"]);
    const self = ranked.find((r) => r.id === "self")!;
    expect(self.reasons).toContainEqual({
      label: "De-escalation — advanced, not yet verified",
      points: Math.round(MATCH_WEIGHTS.relevantCapability * LEVEL_FACTOR.ADVANCED * VERIFICATION_FACTOR.SELF_DECLARED),
    });
  });

  it("gives nothing for a certificate that has expired by the day of the job", () => {
    const expired = held({ key: "FIRST_AID", expiresOn: "2026-09-30" });
    const { ranked } = rank([{ ...base, capabilities: [expired] }]);
    expect(ranked[0]!.reasons).toContainEqual({ label: "First aid — certificate expired", points: 0 });
    const stillValid = rankProtectors(request, [{ ...base, capabilities: [expired] }], "2026-09-30");
    expect(stillValid.ranked[0]!.reasons.find((r) => r.label.startsWith("First aid"))!.points).toBeGreaterThan(0);
  });

  it("gives nothing for a capability Operations rejected", () => {
    const { ranked } = rank([{ ...base, capabilities: [held({ verification: "REJECTED" })] }]);
    expect(ranked[0]!.reasons).toContainEqual({ label: "De-escalation — not accepted", points: 0 });
  });

  it("weighs level", () => {
    const { ranked } = rank([
      { ...base, id: "b", displayName: "Anna", capabilities: [held({ level: "BASIC" })] },
      { ...base, id: "a", displayName: "Zoe", capabilities: [held({ level: "ADVANCED" })] },
    ]);
    expect(ranked.map((r) => r.id)).toEqual(["a", "b"]);
  });
});
