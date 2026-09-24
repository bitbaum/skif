import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import type { Db } from "./types";

let db: Db | undefined;

/** The app's database. Lazy, so pages that never touch the database (the
 * landing page) render even when DATABASE_URL is not configured. */
export function getDb(): Db {
  if (db) return db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  db = drizzle(new Pool({ connectionString: url }), { schema });
  return db;
}
