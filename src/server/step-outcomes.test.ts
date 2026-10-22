import { describe, expect, it } from "vitest";
import { INTERVENTIONS } from "@/config/interventions";
import { createTestDb } from "@/test/db";
import { outcomesOf, setStepOutcome } from "./step-outcomes";

const KEY = INTERVENTIONS[0]!.key;

describe("step outcomes", () => {
  it("records done, then whether it helped, keeps the answer on a repeat, and forgets on undo", async () => {
    const db = await createTestDb();
    await setStepOutcome(db, "a", KEY, { status: "DONE" });
    expect((await outcomesOf(db, "a")).get(KEY)).toEqual({ status: "DONE", helped: null });
    await setStepOutcome(db, "a", KEY, { status: "DONE", helped: "YES" });
    await setStepOutcome(db, "a", KEY, { status: "DONE" });
    expect((await outcomesOf(db, "a")).get(KEY)).toEqual({ status: "DONE", helped: "YES" });
    expect((await outcomesOf(db, "b")).size).toBe(0);
    await setStepOutcome(db, "a", KEY, null);
    expect((await outcomesOf(db, "a")).size).toBe(0);
  });

  it("clears 'did it help' when a step becomes not for me", async () => {
    const db = await createTestDb();
    await setStepOutcome(db, "a", KEY, { status: "DONE", helped: "NO" });
    await setStepOutcome(db, "a", KEY, { status: "NOT_FOR_ME" });
    expect((await outcomesOf(db, "a")).get(KEY)).toEqual({ status: "NOT_FOR_ME", helped: null });
  });

  it("refuses a step that does not exist", async () => {
    const db = await createTestDb();
    await expect(setStepOutcome(db, "a", "TELEPORT", { status: "DONE" })).rejects.toThrow(/Unknown step/);
  });
});
