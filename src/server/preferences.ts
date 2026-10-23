import "server-only";
import { eq } from "drizzle-orm";
import { preferenceProfiles } from "@/db/schema";
import type { Db } from "@/db/types";
import type { PreferencesInput } from "@/domain/inputs";
import { DEFAULT_PREFERENCES } from "@/domain/preference-defaults";

export type PreferenceProfile = typeof preferenceProfiles.$inferSelect;

export async function getPreferences(
  db: Db,
  sub: string,
): Promise<PreferenceProfile | null> {
  const [row] = await db
    .select()
    .from(preferenceProfiles)
    .where(eq(preferenceProfiles.sub, sub));
  return row ?? null;
}

export async function savePreferences(
  db: Db,
  sub: string,
  input: PreferencesInput,
): Promise<void> {
  const values = { ...input, updatedAt: new Date() };
  await db
    .insert(preferenceProfiles)
    .values({ sub, ...values })
    .onConflictDoUpdate({ target: preferenceProfiles.sub, set: values });
}

/** Start someone on the defaults, and never touch a profile they already
 * have: asking to "start now" twice, or after setting limits, changes nothing. */
export async function ensureDefaultPreferences(
  db: Db,
  sub: string,
): Promise<void> {
  await db
    .insert(preferenceProfiles)
    .values({ sub, ...DEFAULT_PREFERENCES, updatedAt: new Date() })
    .onConflictDoNothing();
}
