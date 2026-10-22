import { describe, expect, it } from "vitest";
import { EMERGENCY_NUMBERS } from "./emergency";
import { COUNTRIES, countryByCode, countryForTimeZone } from "./emergency-world";

describe("emergency numbers by country", () => {
  it("lists each country once, with a source for every row", () => {
    expect(new Set(COUNTRIES.map((c) => c.code)).size).toBe(COUNTRIES.length);
    for (const c of COUNTRIES) {
      expect(c.source.startsWith("https://"), c.code).toBe(true);
      for (const n of [c.police, c.ambulance, c.fire, ...(c.extra ?? []).map((x) => x.number)]) expect(n, c.code).toMatch(/^\d{2,5}$/);
    }
  });

  it("agrees with the Swiss numbers used everywhere else", () => {
    const ch = countryByCode("CH")!;
    const swiss = Object.fromEntries(EMERGENCY_NUMBERS.map((e) => [e.label, e.number]));
    expect([ch.police, ch.ambulance, ch.fire]).toEqual([swiss.Police, swiss.Ambulance, swiss.Fire]);
    expect(ch.extra?.map((x) => x.number)).toContain(swiss["European emergency number"]);
  });

  it("guesses a country only from zones it knows, and every guess has numbers", () => {
    expect(countryForTimeZone("Europe/Zurich")).toBe("CH");
    expect(countryForTimeZone("America/Indiana/Indianapolis")).toBe("US");
    expect(countryForTimeZone("America/Toronto")).toBe("CA");
    expect(countryForTimeZone("Australia/Sydney")).toBe("AU");
    expect(countryForTimeZone("Asia/Kathmandu")).toBeUndefined();
    for (const zone of ["Europe/Zurich", "Europe/Kyiv", "Asia/Calcutta", "Pacific/Honolulu"]) {
      expect(countryByCode(countryForTimeZone(zone)!), zone).toBeDefined();
    }
  });
});
