import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import { application, approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { listAudit } from "./audit";
import { applyBookingAction } from "./lifecycle";
import { applyAsProtector, assessCapability, listCapabilities, setProtectorStatus } from "./protectors";

describe("audit", () => {
  it("records who changed a Protector's status and assessed a capability, without content", async () => {
    const db = await createTestDb();
    const p = await applyAsProtector(db, "oc-mira", application);
    await setProtectorStatus(db, p.id, "APPROVED", "oc-ops-anna");
    const [cap] = await listCapabilities(db, p.id);
    await assessCapability(db, cap!.id, "VERIFIED", "oc-ops-ben");
    expect((await setProtectorStatus(db, p.id, "APPLIED", "oc-ops-anna")).success).toBe(false);

    const log = await listAudit(db);
    expect(log.map((e) => [e.actorSub, e.action, e.subjectType, e.detail])).toEqual([
      ["oc-ops-ben", "ASSESS_CAPABILITY", "CAPABILITY", { capability: cap!.capability, verification: "VERIFIED" }],
      ["oc-ops-anna", "CHANGE_PROTECTOR_STATUS", "PROTECTOR", { from: "APPLIED", to: "APPROVED" }],
    ]);
  });

  it("records an override of the matcher, but not an ordinary assignment", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-cust");
    const mira = await approvedProtector(db, "oc-mira");
    const jules = await approvedProtector(db, "oc-jules", { displayName: "Jules", languages: ["fr"] });
    const normal = await book(db, "oc-cust");
    const other = await book(db, "oc-cust", { startsAt: new Date(Date.now() + 3 * 86_400_000) });
    const before = (await listAudit(db)).length;
    await applyBookingAction(db, normal.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    expect((await listAudit(db)).length).toBe(before);
    await applyBookingAction(db, other.id, { action: "ASSIGN", protectorId: jules.id, overrideReason: "Agreed by phone" }, OPS);
    const [latest] = await listAudit(db);
    expect(latest).toMatchObject({ action: "OVERRIDE_MATCH", subjectId: other.id, detail: { protectorId: jules.id } });
    expect(JSON.stringify(latest)).not.toContain("Agreed by phone");
  });
});
