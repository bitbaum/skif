import { describe, expect, it } from "vitest";
import { CONCERN_KEYS, CONCERNS, concernsFor } from "../assessment";
import { HARM_FAMILY_KEYS } from "../harm-families";
import { PROVIDER_TYPES } from "../providers";
import { INTERVENTIONS, needsPurchase, providerOf, type Intervention } from ".";

const all = INTERVENTIONS as readonly Intervention[];
const familyOf = (i: Intervention) => i.addresses.map((c) => CONCERNS.find((x) => x.key === c)!.family);

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

  it("answers every harm family, not only physical safety (DOCTRINE: families of harm)", () => {
    for (const family of HARM_FAMILY_KEYS) {
      const concerns = CONCERNS.filter((c) => c.family === family && !c.derived);
      expect(concerns.length, family).toBeGreaterThan(0);
      const answers = all.filter((i) => familyOf(i).includes(family));
      expect(answers.some((i) => !needsPurchase(i.kind)), `${family}: something you do yourself`).toBe(true);
      expect(answers.some((i) => needsPurchase(i.kind)), `${family}: someone who can help`).toBe(true);
    }
  });

  it("asks about every harm family when the assessment is of a whole life", () => {
    const asked = new Set(concernsFor("PERSON").map((c) => c.family));
    expect([...asked].sort()).toEqual([...HARM_FAMILY_KEYS].sort());
  });

  it("names who delivers anything that costs money, and only that", () => {
    for (const i of all) {
      if (needsPurchase(i.kind)) expect(providerOf(i), i.key).toBeDefined();
      else expect(i.provider, i.key).toBeUndefined();
      if (i.kind === "PROTECTOR") expect(i.provider, i.key).toBeUndefined();
    }
  });

  it("lists non-physical providers the catalogue actually uses", () => {
    const used = new Set(all.map(providerOf));
    for (const p of PROVIDER_TYPES) expect(used.has(p.key), p.key).toBe(true);
  });
});
