import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import type { ProtectorApplication } from "@/domain/inputs";
import { createTestDb } from "@/test/db";
import { applyAsProtector, assessCapability, listCapabilities, setProtectorStatus } from "./protectors";

const application: ProtectorApplication = {
  displayName: "Mira",
  bio: "Calm.",
  experienceYears: 4,
  languages: ["de"],
  services: ["NIGHT_OUT"],
  presenceStyles: ["DISCREET"],
  capabilities: [{ key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2030-01-01" }],
};

describe("protector profiles and capabilities", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
  });

  it("records who verified a capability, and resets it when the declaration changes", async () => {
    const p = await applyAsProtector(db, "oc-mira", application);
    const [cap] = await listCapabilities(db, p.id);
    expect(cap?.verification).toBe("SELF_DECLARED");

    await assessCapability(db, cap!.id, "VERIFIED", "oc-ops");
    const [verified] = await listCapabilities(db, p.id);
    expect(verified).toMatchObject({ verification: "VERIFIED", assessedBy: "oc-ops" });

    // Re-saving the same declaration keeps the verification…
    await applyAsProtector(db, "oc-mira", application);
    expect((await listCapabilities(db, p.id))[0]?.verification).toBe("VERIFIED");

    // …changing it does not, and a dropped capability disappears.
    const upgraded = { ...application.capabilities[0]!, level: "ADVANCED" as const };
    await applyAsProtector(db, "oc-mira", {
      ...application,
      capabilities: [upgraded, { key: "NIGHTLIFE", level: "BASIC", certification: "", evidence: "", expiresOn: null }],
    });
    const after = await listCapabilities(db, p.id);
    expect(after.map((c) => [c.capability, c.verification, c.assessedBy])).toEqual([
      ["FIRST_AID", "SELF_DECLARED", null],
      ["NIGHTLIFE", "SELF_DECLARED", null],
    ]);
    await applyAsProtector(db, "oc-mira", { ...application, capabilities: [] });
    expect(await listCapabilities(db, p.id)).toEqual([]);
  });

  it("allows only the declared status moves, and reopens a rejected application on update", async () => {
    const p = await applyAsProtector(db, "oc-mira", application);
    expect((await setProtectorStatus(db, p.id, "SUSPENDED")).success).toBe(false);
    expect((await setProtectorStatus(db, p.id, "REJECTED")).success).toBe(true);
    const reopened = await applyAsProtector(db, "oc-mira", application);
    expect(reopened.status).toBe("APPLIED");
  });
});

describe("migration 0001", () => {
  it("carries v1 skill tags across as self-declared capabilities", async () => {
    const pg = new PGlite();
    const statements = (file: string) =>
      readFileSync(`drizzle/${file}`, "utf8").split("--> statement-breakpoint").filter((s) => s.trim());
    for (const sql of statements("0000_init.sql")) await pg.exec(sql);
    await pg.exec(
      `INSERT INTO protectors (sub, display_name, bio, skills) VALUES ('oc-v1', 'V1', 'bio', '{DE_ESCALATION,FIRST_AID}')`,
    );
    for (const sql of statements("0001_capabilities.sql")) await pg.exec(sql);
    const { rows } = await pg.query<{ capability: string; level: string; verification: string }>(
      "SELECT capability, level, verification FROM protector_capabilities ORDER BY capability",
    );
    expect(rows).toEqual([
      { capability: "DE_ESCALATION", level: "PROFICIENT", verification: "SELF_DECLARED" },
      { capability: "FIRST_AID", level: "PROFICIENT", verification: "SELF_DECLARED" },
    ]);
  });
});
