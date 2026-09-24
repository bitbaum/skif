import "server-only";
import { and, asc, eq, inArray, notInArray } from "drizzle-orm";
import type { VerificationStatus } from "@/config/capabilities";
import { protectorCapabilities, protectors } from "@/db/schema";
import type { Db } from "@/db/types";
import type { CapabilityDeclaration, ProtectorApplication } from "@/domain/inputs";
import { mayMove, type ProtectorStatus } from "@/domain/protector-status";
import { fail, ok, type Result } from "@/domain/result";
import { audit } from "./audit";

export type Protector = typeof protectors.$inferSelect;
export type ProtectorCapability = typeof protectorCapabilities.$inferSelect;

export async function getProtectorBySub(db: Db, sub: string): Promise<Protector | null> {
  const [row] = await db.select().from(protectors).where(eq(protectors.sub, sub));
  return row ?? null;
}

export async function getProtector(db: Db, id: string): Promise<Protector | null> {
  const [row] = await db.select().from(protectors).where(eq(protectors.id, id));
  return row ?? null;
}

const sameDeclaration = (row: ProtectorCapability, d: CapabilityDeclaration) =>
  row.level === d.level &&
  row.certification === d.certification &&
  row.evidence === d.evidence &&
  row.expiresOn === d.expiresOn;

/** Replace a Protector's declared capabilities. A declaration that changes
 * goes back to self-declared: Operations verified the old one, not this. */
async function saveCapabilities(db: Db, protectorId: string, declared: readonly CapabilityDeclaration[]) {
  const existing = await listCapabilities(db, protectorId);
  const keys = declared.map((d) => d.key);
  await db
    .delete(protectorCapabilities)
    .where(
      and(
        eq(protectorCapabilities.protectorId, protectorId),
        keys.length ? notInArray(protectorCapabilities.capability, keys) : undefined,
      ),
    );
  for (const d of declared) {
    const row = existing.find((e) => e.capability === d.key);
    if (row && sameDeclaration(row, d)) continue;
    const values = {
      level: d.level,
      certification: d.certification,
      evidence: d.evidence,
      expiresOn: d.expiresOn,
      verification: "SELF_DECLARED" as const,
      assessedBy: null,
      assessedAt: null,
      updatedAt: new Date(),
    };
    await db
      .insert(protectorCapabilities)
      .values({ protectorId, capability: d.key, ...values })
      .onConflictDoUpdate({
        target: [protectorCapabilities.protectorId, protectorCapabilities.capability],
        set: values,
      });
  }
}

/** Apply, or update an application. An approved Protector editing their
 * profile keeps their status; changed capabilities need verifying again. */
export async function applyAsProtector(db: Db, sub: string, input: ProtectorApplication): Promise<Protector> {
  const { capabilities, ...profile } = input;
  return db.transaction(async (tx) => {
    const [row] = await tx
      .insert(protectors)
      .values({ sub, ...profile })
      .onConflictDoUpdate({ target: protectors.sub, set: profile })
      .returning();
    await saveCapabilities(tx, row!.id, capabilities);
    if (row!.status !== "REJECTED") return row!;
    // Updating a rejected application puts it back in front of Operations.
    const [reopened] = await tx
      .update(protectors)
      .set({ status: "APPLIED" })
      .where(eq(protectors.id, row!.id))
      .returning();
    return reopened!;
  });
}

export async function listProtectors(db: Db): Promise<Protector[]> {
  return db.select().from(protectors).orderBy(asc(protectors.status), asc(protectors.displayName));
}

/** Operations changes a Protector's status; the change is audited. */
export async function setProtectorStatus(
  db: Db,
  id: string,
  status: ProtectorStatus,
  actorSub: string,
): Promise<Result> {
  const current = await getProtector(db, id);
  if (!current) return fail("Protector not found");
  if (!mayMove(current.status, status)) return fail(`Cannot move a Protector from ${current.status} to ${status}`);
  await db.transaction(async (tx) => {
    await tx
      .update(protectors)
      .set({ status, approvedAt: status === "APPROVED" ? new Date() : null })
      .where(eq(protectors.id, id));
    await audit(tx, actorSub, "CHANGE_PROTECTOR_STATUS", { type: "PROTECTOR", id }, { from: current.status, to: status });
  });
  return ok(undefined);
}

export async function listCapabilities(db: Db, protectorId: string): Promise<ProtectorCapability[]> {
  return db
    .select()
    .from(protectorCapabilities)
    .where(eq(protectorCapabilities.protectorId, protectorId))
    .orderBy(asc(protectorCapabilities.capability));
}

export async function capabilitiesFor(db: Db, protectorIds: readonly string[]): Promise<ProtectorCapability[]> {
  if (protectorIds.length === 0) return [];
  return db
    .select()
    .from(protectorCapabilities)
    .where(inArray(protectorCapabilities.protectorId, [...protectorIds]));
}

/** Operations verifies or rejects one declared capability, and is recorded
 * as its assessor. */
export async function assessCapability(
  db: Db,
  capabilityId: string,
  verification: Exclude<VerificationStatus, "SELF_DECLARED">,
  assessorSub: string,
): Promise<Result<{ protectorId: string }>> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(protectorCapabilities)
      .set({ verification, assessedBy: assessorSub, assessedAt: new Date() })
      .where(eq(protectorCapabilities.id, capabilityId))
      .returning({ protectorId: protectorCapabilities.protectorId, capability: protectorCapabilities.capability });
    if (!row) return fail("Capability not found");
    await audit(tx, assessorSub, "ASSESS_CAPABILITY", { type: "CAPABILITY", id: capabilityId }, {
      capability: row.capability,
      verification,
    });
    return ok({ protectorId: row.protectorId });
  });
}
