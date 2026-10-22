import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import { interestCounts, interestsOf, isCourseKey, setInterest } from "./academy";

describe("course interest", () => {
  it("records, repeats harmlessly and withdraws a person's interest", async () => {
    const db = await createTestDb();
    await setInterest(db, "oc-a", "PARKOUR", true);
    await setInterest(db, "oc-a", "PARKOUR", true);
    await setInterest(db, "oc-a", "FIRST_AID", true);
    expect([...(await interestsOf(db, "oc-a"))].sort()).toEqual(["FIRST_AID", "PARKOUR"]);
    await setInterest(db, "oc-a", "FIRST_AID", false);
    expect([...(await interestsOf(db, "oc-a"))]).toEqual(["PARKOUR"]);
    expect([...(await interestsOf(db, "oc-b"))]).toEqual([]);
  });

  it("refuses a course that does not exist", async () => {
    const db = await createTestDb();
    expect(isCourseKey("PARKOUR")).toBe(true);
    expect(isCourseKey("TELEPORTATION")).toBe(false);
    await expect(setInterest(db, "oc-a", "TELEPORTATION", true)).rejects.toThrow(/Unknown course/);
  });

  it("counts people per course for Operations, most-wanted first, never naming them", async () => {
    const db = await createTestDb();
    for (const sub of ["a", "b", "c"]) await setInterest(db, sub, "PARKOUR", true);
    await setInterest(db, "a", "FIRST_AID", true);
    expect(await interestCounts(db)).toEqual([
      { courseKey: "PARKOUR", people: 3 },
      { courseKey: "FIRST_AID", people: 1 },
    ]);
  });
});
