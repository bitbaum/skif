import "server-only";
import { asc, eq } from "drizzle-orm";
import { protectors } from "@/db/schema";
import type { Db } from "@/db/types";
import type { ProtectorApplication } from "@/domain/inputs";
import { fail, ok, type Result } from "@/domain/result";

export type Protector = typeof protectors.$inferSelect;
export type ProtectorStatus = Protector["status"];

export async function getProtectorBySub(db: Db, sub: string): Promise<Protector | null> {
  const [row] = await db.select().from(protectors).where(eq(protectors.sub, sub));
  return row ?? null;
}

/** Apply, or update an application. An approved Protector editing their
 * profile keeps their status; Operations reviews changes on their list. */
export async function applyAsProtector(db: Db, sub: string, input: ProtectorApplication): Promise<Protector> {
  const [row] = await db
    .insert(protectors)
    .values({ sub, ...input })
    .onConflictDoUpdate({ target: protectors.sub, set: input })
    .returning();
  return row!;
}

export async function listProtectors(db: Db): Promise<Protector[]> {
  return db.select().from(protectors).orderBy(asc(protectors.status), asc(protectors.displayName));
}

export async function setProtectorStatus(db: Db, id: string, status: ProtectorStatus): Promise<Result> {
  const [row] = await db
    .update(protectors)
    .set({ status, approvedAt: status === "APPROVED" ? new Date() : null })
    .where(eq(protectors.id, id))
    .returning({ id: protectors.id });
  return row ? ok(undefined) : fail("Protector not found");
}
