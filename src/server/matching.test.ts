import { describe, expect, it } from "vitest";
import { windowFromClock } from "@/domain/availability";
import { createTestDb } from "@/test/db";
import { saveAvailability } from "./availability";
import { createBooking } from "./bookings";
import { matchForBooking } from "./matching";
import { savePreferences } from "./preferences";
import { applyAsProtector, assessCapability, listCapabilities, setProtectorStatus } from "./protectors";

const ALWAYS = [1, 2, 3, 4, 5, 6, 7].map((d) => windowFromClock(d, 0, 0));

describe("matchForBooking", () => {
  it("applies a customer's must-have only once Operations has verified it", async () => {
    const db = await createTestDb();
    await savePreferences(db, "oc-cust", { hardConstraints: [], presenceStyle: "DISCREET", languages: [], valuesNote: "" });
    const mira = await applyAsProtector(db, "oc-mira", {
      displayName: "Mira",
      bio: "Calm.",
      experienceYears: 3,
      languages: ["de"],
      services: ["GET_HOME"],
      presenceStyles: ["DISCREET"],
      capabilities: [{ key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2099-01-01" }],
    });
    await setProtectorStatus(db, mira.id, "APPROVED");
    await saveAvailability(db, mira.id, ALWAYS);

    const created = await createBooking(db, "oc-cust", {
      service: "GET_HOME",
      startsAt: new Date(Date.now() + 86_400_000),
      hours: 1,
      area: "Kreis 3",
      meetingPoint: "Idaplatz",
      notes: "",
      requiredCapabilities: ["FIRST_AID"],
    });
    if (!created.success) throw new Error(created.error);
    expect(created.data.requiredCapabilities).toEqual(["FIRST_AID"]);

    expect((await matchForBooking(db, created.data)).excluded).toEqual([
      { id: mira.id, displayName: "Mira", reason: "First aid required — not yet verified" },
    ]);
    const [aid] = await listCapabilities(db, mira.id);
    await assessCapability(db, aid!.id, "VERIFIED", "oc-ops");
    expect((await matchForBooking(db, created.data)).ranked.map((r) => r.displayName)).toEqual(["Mira"]);
  });
});
