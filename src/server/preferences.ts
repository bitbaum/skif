import "server-only";
import { eq } from "drizzle-orm";
import { preferenceProfiles } from "@/db/schema";
import type { Db } from "@/db/types";
import type { PreferencesInput } from "@/domain/inputs";

export type PreferenceProfile = typeof preferenceProfiles.$inferSelect;

export async function getPreferences(db: Db, sub: string): Promise<PreferenceProfile | null> {
  const [row] = await db.select().from(preferenceProfiles).where(eq(preferenceProfiles.sub, sub));
  return row ?? null;
}

export async function savePreferences(db: Db, sub: string, input: PreferencesInput): Promise<void> {
  const values = { ...input, updatedAt: new Date() };
  await db
    .insert(preferenceProfiles)
    .values({ sub, ...values })
    .onConflictDoUpdate({ target: preferenceProfiles.sub, set: values });
}
