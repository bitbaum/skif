/**
 * Migrations that move existing data are tested against rows written by the
 * schema before them — the same SQL files the box applies, in order.
 */
import { readdirSync, readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { describe, expect, it } from "vitest";

const FILES = readdirSync("drizzle").filter((f) => /^\d{4}_.*\.sql$/.test(f)).sort();

/** Apply the numbered migrations from `from` through `through`, inclusive. */
async function migrateThrough(pg: PGlite, through: string, from = "0000") {
  for (const file of FILES.filter((f) => f.slice(0, 4) >= from && f.slice(0, 4) <= through)) {
    for (const sql of readFileSync(`drizzle/${file}`, "utf8").split("--> statement-breakpoint")) {
      if (sql.trim()) await pg.exec(sql);
    }
  }
}

describe("migration 0006", () => {
  it("opens every legacy incident for review and leaves plain reports alone", async () => {
    const pg = new PGlite();
    await migrateThrough(pg, "0003");
    await pg.exec(`
      INSERT INTO protectors (id, sub, display_name, bio) VALUES ('00000000-0000-4000-8000-000000000001', 'oc-p', 'P', 'b');
      INSERT INTO bookings (id, customer_sub, service, starts_at, hours, area, meeting_point, presence_style, payment_status)
        VALUES ('00000000-0000-4000-8000-000000000002', 'c', 'NIGHT_OUT', now(), 2, 'Kreis 1', 'x', 'DISCREET', 'PAYMENT_PENDING');
      INSERT INTO reports (booking_id, protector_id, kind, summary) VALUES
        ('00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'INCIDENT', 'old incident'),
        ('00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'REPORT', 'old report');
    `);
    await migrateThrough(pg, "0006", "0004");
    const { rows } = await pg.query<{ kind: string; review: string | null; severity: string | null }>(
      "SELECT kind, review, severity FROM reports ORDER BY kind::text",
    );
    expect(rows).toEqual([
      { kind: "INCIDENT", review: "OPEN", severity: null },
      { kind: "REPORT", review: null, severity: null },
    ]);
  });
});

describe("migration 0001", () => {
  it("carries v1 skill tags across as self-declared capabilities", async () => {
    const pg = new PGlite();
    await migrateThrough(pg, "0000");
    await pg.exec(
      `INSERT INTO protectors (sub, display_name, bio, skills) VALUES ('oc-v1', 'V1', 'bio', '{DE_ESCALATION,FIRST_AID}')`,
    );
    await migrateThrough(pg, "0001", "0001");
    const { rows } = await pg.query<{ capability: string; level: string; verification: string }>(
      "SELECT capability, level, verification FROM protector_capabilities ORDER BY capability",
    );
    expect(rows).toEqual([
      { capability: "DE_ESCALATION", level: "PROFICIENT", verification: "SELF_DECLARED" },
      { capability: "FIRST_AID", level: "PROFICIENT", verification: "SELF_DECLARED" },
    ]);
  });
});
