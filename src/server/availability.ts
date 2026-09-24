import "server-only";
import { asc, eq, inArray } from "drizzle-orm";
import { protectorAvailability } from "@/db/schema";
import type { Db } from "@/db/types";
import type { AvailabilityWindow } from "@/domain/availability";

export type AvailabilityRow = typeof protectorAvailability.$inferSelect;

export async function listAvailability(db: Db, protectorId: string): Promise<AvailabilityRow[]> {
  return db
    .select()
    .from(protectorAvailability)
    .where(eq(protectorAvailability.protectorId, protectorId))
    .orderBy(asc(protectorAvailability.weekday));
}

export async function availabilityFor(db: Db, protectorIds: readonly string[]): Promise<AvailabilityRow[]> {
  if (protectorIds.length === 0) return [];
  return db.select().from(protectorAvailability).where(inArray(protectorAvailability.protectorId, [...protectorIds]));
}

/** Replace the Protector's weekly availability with these windows. */
export async function saveAvailability(db: Db, protectorId: string, windows: readonly AvailabilityWindow[]) {
  await db.transaction(async (tx) => {
    await tx.delete(protectorAvailability).where(eq(protectorAvailability.protectorId, protectorId));
    if (windows.length > 0) {
      await tx.insert(protectorAvailability).values(windows.map((w) => ({ protectorId, ...w })));
    }
  });
}
