import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import { customerWithPreferences } from "@/test/fixtures";
import { createAssessment, getAssessment, listAssessments } from "./assessments";
import { createEnvironment, getEnvironment, listEnvironments } from "./environments";

describe("environments", () => {
  it("belong to their owner, and an assessment can only use one's own", async () => {
    const db = await createTestDb();
    await customerWithPreferences(db, "oc-a");
    await customerWithPreferences(db, "oc-b");
    const flat = await createEnvironment(db, "oc-a", { type: "HOME", name: "Flat", area: "Kreis 3" });
    const club = await createEnvironment(db, "oc-b", { type: "VENUE", name: "Club", area: null });

    expect((await listEnvironments(db, "oc-a")).map((e) => e.name)).toEqual(["Flat"]);
    expect(await getEnvironment(db, "oc-a", club.id)).toBeNull();

    const theirs = await createAssessment(db, "oc-a", { environmentId: club.id, concerns: [], measures: [] });
    expect(theirs).toEqual({ success: false, error: "Choose one of your places" });

    const mine = await createAssessment(db, "oc-a", { environmentId: flat.id, concerns: ["BURGLARY"], measures: [] });
    if (!mine.success) throw new Error(mine.error);
    expect((await getAssessment(db, "oc-a", mine.data.id))?.environment).toMatchObject({ name: "Flat", type: "HOME" });
    expect(await getAssessment(db, "oc-b", mine.data.id)).toBeNull();
    expect((await listAssessments(db, "oc-a")).map((a) => a.environment.name)).toEqual(["Flat"]);
  });
});
