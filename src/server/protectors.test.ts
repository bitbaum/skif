import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import type { ProtectorApplication } from "@/domain/inputs";
import { createTestDb } from "@/test/db";
import { windowFromClock } from "@/domain/availability";
import { listAvailability, saveAvailability } from "./availability";
import { applyAsProtector, assessCapability, listCapabilities, setProtectorStatus } from "./protectors";

const application: ProtectorApplication = {
  displayName: "Mira",
  bio: "Calm.",
  experienceYears: 4,
  languages: ["de"],
  services: ["NIGHT_OUT"],
  presenceStyles: ["DISCREET"],
  capabilities: [{ key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2030-01-01" }],
};

describe("protector profiles and capabilities", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
  });

  it("records who verified a capability, and resets it when the declaration changes", async () => {
    const p = await applyAsProtector(db, "oc-mira", application);
    const [cap] = await listCapabilities(db, p.id);
    expect(cap?.verification).toBe("SELF_DECLARED");

    await assessCapability(db, cap!.id, "VERIFIED", "oc-ops");
    const [verified] = await listCapabilities(db, p.id);
    expect(verified).toMatchObject({ verification: "VERIFIED", assessedBy: "oc-ops" });

    // Re-saving the same declaration keeps the verification…
    await applyAsProtector(db, "oc-mira", application);
    expect((await listCapabilities(db, p.id))[0]?.verification).toBe("VERIFIED");

    // …changing it does not, and a dropped capability disappears.
    const upgraded = { ...application.capabilities[0]!, level: "ADVANCED" as const };
    await applyAsProtector(db, "oc-mira", {
      ...application,
      capabilities: [upgraded, { key: "NIGHTLIFE", level: "BASIC", certification: "", evidence: "", expiresOn: null }],
    });
    const after = await listCapabilities(db, p.id);
    expect(after.map((c) => [c.capability, c.verification, c.assessedBy])).toEqual([
      ["FIRST_AID", "SELF_DECLARED", null],
      ["NIGHTLIFE", "SELF_DECLARED", null],
    ]);
    await applyAsProtector(db, "oc-mira", { ...application, capabilities: [] });
    expect(await listCapabilities(db, p.id)).toEqual([]);
  });

  it("allows only the declared status moves, and reopens a rejected application on update", async () => {
    const p = await applyAsProtector(db, "oc-mira", application);
    expect((await setProtectorStatus(db, p.id, "SUSPENDED", "oc-ops")).success).toBe(false);
    expect((await setProtectorStatus(db, p.id, "REJECTED", "oc-ops")).success).toBe(true);
    const reopened = await applyAsProtector(db, "oc-mira", application);
    expect(reopened.status).toBe("APPLIED");
  });
});

describe("availability", () => {
  it("replaces the whole week on save", async () => {
    const db = await createTestDb();
    const p = await applyAsProtector(db, "oc-mira", application);
    await saveAvailability(db, p.id, [windowFromClock(5, 20 * 60, 4 * 60), windowFromClock(6, 20 * 60, 4 * 60)]);
    await saveAvailability(db, p.id, [windowFromClock(1, 9 * 60, 17 * 60)]);
    const rows = await listAvailability(db, p.id);
    expect(rows.map((r) => [r.weekday, r.startMinute, r.durationMinutes])).toEqual([[1, 540, 480]]);
    await saveAvailability(db, p.id, []);
    expect(await listAvailability(db, p.id)).toEqual([]);
  });
});
