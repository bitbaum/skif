import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { environments } from "@/db/schema";
import type { Db } from "@/db/types";
import { environmentTypeLabel } from "@/config/environments";
import type { EnvironmentInput } from "@/domain/inputs";

export type Environment = typeof environments.$inferSelect;

export async function createEnvironment(db: Db, ownerSub: string, input: EnvironmentInput): Promise<Environment> {
  const [row] = await db.insert(environments).values({ ownerSub, ...input }).returning();
  return row!;
}

/** The person's Protected Life (docs/DOCTRINE.md): the root their places hang
 * off, and what non-place concerns are assessed against. Created on first use. */
export async function ensureLifeEnvironment(db: Db, ownerSub: string): Promise<Environment> {
  const [existing] = await db
    .select()
    .from(environments)
    .where(and(eq(environments.ownerSub, ownerSub), eq(environments.type, "PERSON")));
  if (existing) return existing;
  const [row] = await db
    .insert(environments)
    .values({ ownerSub, type: "PERSON", name: environmentTypeLabel("PERSON"), area: null })
    .returning();
  return row!;
}

export async function listEnvironments(db: Db, ownerSub: string): Promise<Environment[]> {
  return db.select().from(environments).where(eq(environments.ownerSub, ownerSub)).orderBy(asc(environments.name));
}

/** Only ever the owner's own environment. */
export async function getEnvironment(db: Db, ownerSub: string, id: string): Promise<Environment | null> {
  const [row] = await db
    .select()
    .from(environments)
    .where(and(eq(environments.id, id), eq(environments.ownerSub, ownerSub)));
  return row ?? null;
}
