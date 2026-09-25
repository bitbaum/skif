import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import { answers, customerWithPreferences } from "@/test/fixtures";
import { createAssessment, getAssessment, listAssessments } from "./assessments";
import { createEnvironment, ensureLifeEnvironment, getEnvironment, listEnvironments } from "./environments";

describe("environments", () => {
  it("belong to their owner, and an assessment can only use one's own", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-a");
    await customerWithPreferences(db, "oc-b");
    const flat = await createEnvironment(db, "oc-a", { type: "HOME", name: "Flat", area: "Kreis 3" });
    const club = await createEnvironment(db, "oc-b", { type: "VENUE", name: "Club", area: null });

    expect((await listEnvironments(db, "oc-a")).map((e) => e.name)).toEqual(["Flat"]);
    expect(await getEnvironment(db, "oc-a", club.id)).toBeNull();

    const theirs = await createAssessment(db, "oc-a", answers(club.id));
    expect(theirs).toEqual({ success: false, error: "Choose one of your places" });

    const mine = await createAssessment(db, "oc-a", answers(flat.id, { concerns: ["BURGLARY"] }));
    if (!mine.success) throw new Error(mine.error);
    expect((await getAssessment(db, "oc-a", mine.data.id))?.environment).toMatchObject({ name: "Flat", type: "HOME" });
    expect(await getAssessment(db, "oc-b", mine.data.id)).toBeNull();
    expect((await listAssessments(db, "oc-a")).map((a) => a.environment.name)).toEqual(["Flat"]);
  });
});

describe("the Protected Life", () => {
  it("is one per person, created once, and takes whole-life concerns", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-a");
    const life = await ensureLifeEnvironment(db, "oc-a");
    expect(await ensureLifeEnvironment(db, "oc-a")).toEqual(life);
    expect((await ensureLifeEnvironment(db, "oc-b")).id).not.toBe(life.id);
    expect(life).toMatchObject({ type: "PERSON", name: "My life as a whole", area: null });

    const made = await createAssessment(
      db,
      "oc-a",
      answers(life.id, { concerns: ["ACCOUNT_TAKEOVER", "RELATIVE_TARGETED"], budget: "FREE" }),
    );
    if (!made.success) throw new Error(made.error);
    expect(made.data.plan).toMatchObject({ nothingToBuy: true });
    expect("findings" in made.data.plan && made.data.plan.findings.map((f) => f.concern)).toEqual([
      "ACCOUNT_TAKEOVER",
      "RELATIVE_TARGETED",
    ]);
  });
});
