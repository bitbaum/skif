import { describe, expect, it } from "vitest";
import { locationMessage, mapLink, planMessage, smsLink } from "./share-text";

describe("emergency messages", () => {
  it("links a point on OpenStreetMap to five decimals", () => {
    expect(mapLink({ latitude: 47.376887, longitude: 8.541694 })).toBe(
      "https://www.openstreetmap.org/?mlat=47.37689&mlon=8.54169#map=18/47.37689/8.54169",
    );
  });

  it("says where, how precisely and when", () => {
    const msg = locationMessage({ latitude: 47.37, longitude: 8.54, accuracy: 23.6 }, new Date("2026-10-21T19:40:00Z"), "Europe/Zurich");
    expect(msg).toBe("I need help. I am here, give or take 24 m, as of 21:40: https://www.openstreetmap.org/?mlat=47.37000&mlon=8.54000#map=18/47.37000/8.54000");
  });

  it("writes a plan with a default for when nobody hears back", () => {
    expect(planMessage({ where: " Hiking the Üetliberg ", backBy: "18:00" })).toBe(
      "My plan: Hiking the Üetliberg.\nBack by: 18:00.\nIf you have not heard from me by then, call me, and if I do not answer, call the police.",
    );
  });

  it("encodes the SMS body", () => {
    expect(smsLink("a b&c")).toBe("sms:?&body=a%20b%26c");
  });
});
