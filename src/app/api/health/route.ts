import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { opsMailStatus } from "@/server/ops-alerts";

/**
 * Liveness for the deploy check and the box watchdog: which app answered,
 * which commit it is serving, whether it can reach its database, and whether
 * Operations alerts can go out (config only; no network). Public,
 * so it says nothing more than that.
 *
 * Always 200 while the process is up: a restart cannot fix a database that is
 * down, so the answer goes in the body for a person or a deploy log to read.
 */
export const dynamic = "force-dynamic";

type Database = "ok" | "unconfigured" | "unreachable";

async function database(): Promise<Database> {
  if (!process.env.DATABASE_URL) return "unconfigured";
  try {
    await getDb().execute(sql`select 1`);
    return "ok";
  } catch {
    return "unreachable";
  }
}

export async function GET() {
  const db = await database();
  return NextResponse.json(
    { ok: db === "ok", app: "skif", commit: process.env.SKIF_BUILD_COMMIT || null, database: db, mail: opsMailStatus() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
