import { describe, expect, it } from "vitest";
import { CONCERN_KEYS } from "./assessment";
import { INTERVENTIONS, needsPurchase } from "./interventions";

describe("intervention catalogue", () => {
  it("claims no high confidence until real evidence is attached (SPEC §16)", () => {
    for (const i of INTERVENTIONS) {
      if (i.evidence.basis === "SKIF_JUDGMENT" || i.evidence.basis === "VENDOR_CLAIM") {
        expect(i.evidence.confidence, i.key).not.toBe("HIGH");
      }
      expect(i.evidence.basis, i.key).not.toBe("VENDOR_CLAIM");
    }
  });

  it("offers, for every concern, something that needs no purchase and breaks no hard limit", () => {
    for (const concern of CONCERN_KEYS) {
      const free = INTERVENTIONS.filter(
        (i) =>
          (i.addresses as readonly string[]).includes(concern) && !needsPurchase(i.kind) && i.conflictsWith.length === 0,
      );
      expect(free.length, concern).toBeGreaterThan(0);
    }
  });

  it("has unique keys", () => {
    expect(new Set(INTERVENTIONS.map((i) => i.key)).size).toBe(INTERVENTIONS.length);
  });
});
