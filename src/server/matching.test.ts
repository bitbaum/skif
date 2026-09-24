import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import { MATCH_WEIGHTS } from "@/config/matching";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { applyBookingAction } from "./lifecycle";
import { matchForBooking } from "./matching";
import { assessCapability, listCapabilities } from "./protectors";

describe("matchForBooking", () => {
  it("applies a customer's must-have only once Operations has verified it", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-cust", { languages: [] });
    const mira = await approvedProtector(db, "oc-mira", {
      services: ["GET_HOME"],
      capabilities: [{ key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2099-01-01" }],
    });
    const booking = await book(db, "oc-cust", { service: "GET_HOME", requiredCapabilities: ["FIRST_AID"] });
    expect(booking.requiredCapabilities).toEqual(["FIRST_AID"]);

    expect((await matchForBooking(db, booking)).excluded).toEqual([
      { id: mira.id, displayName: "Mira", reason: "First aid required — not yet verified", overridable: true },
    ]);
    const [aid] = await listCapabilities(db, mira.id);
    await assessCapability(db, aid!.id, "VERIFIED", "oc-ops");
    expect((await matchForBooking(db, booking)).ranked.map((r) => r.displayName)).toEqual(["Mira"]);
  });

  it("credits completed jobs of the same service", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-cust");
    const mira = await approvedProtector(db, "oc-mira");
    const done = await book(db, "oc-cust");
    await applyBookingAction(db, done.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    const asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id } as const;
    for (const action of ["ACCEPT", "START", "COMPLETE"] as const) {
      await applyBookingAction(db, done.id, { action }, asMira);
    }
    const next = await book(db, "oc-cust");
    const [ranked] = (await matchForBooking(db, next)).ranked;
    expect(ranked!.reasons).toContainEqual({ label: "1 completed Night Out job(s)", points: MATCH_WEIGHTS.relevantJob });
    const other = await book(db, "oc-cust", { service: "GET_HOME" });
    const [forOther] = (await matchForBooking(db, other)).ranked;
    expect(forOther!.reasons.some((r) => r.label.includes("completed"))).toBe(false);
  });
});
