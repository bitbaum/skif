import "server-only";
import { eq } from "drizzle-orm";
import { customerProfiles } from "@/db/schema";
import type { Db } from "@/db/types";
import type { ProfileInput } from "@/domain/inputs";

export type CustomerProfile = typeof customerProfiles.$inferSelect;

export async function getCustomerProfile(db: Db, sub: string): Promise<CustomerProfile | null> {
  const [row] = await db.select().from(customerProfiles).where(eq(customerProfiles.sub, sub));
  return row ?? null;
}

export async function saveCustomerProfile(db: Db, sub: string, input: ProfileInput): Promise<void> {
  const values = { ...input, updatedAt: new Date() };
  await db
    .insert(customerProfiles)
    .values({ sub, ...values })
    .onConflictDoUpdate({ target: customerProfiles.sub, set: values });
}
