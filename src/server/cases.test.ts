import { describe, expect, it } from "vitest";
import { createTestDb } from "@/test/db";
import {
  addIndicator,
  addTimelineEntry,
  createCaseFile,
  deleteCaseFile,
  getCaseFile,
  listCaseFiles,
  removeIndicator,
  removeTimelineEntry,
  setStepDone,
  updateCaseFile,
} from "./cases";

const INPUT = {
  kind: "REMOTE_ACCESS" as const,
  title: "Fake PostFinance call",
  summary: "",
  happenedOn: "2026-10-30",
  policeReference: "",
};

describe("case files", () => {
  it("are their owner's alone", async () => {
    const db = await createTestDb();
    const c = await createCaseFile(db, "anna", INPUT);
    expect(await getCaseFile(db, "anna", c.id)).not.toBeNull();
    expect(await getCaseFile(db, "mallory", c.id)).toBeNull();
    expect(await listCaseFiles(db, "mallory")).toEqual([]);
    expect(
      (
        await addIndicator(db, "mallory", c.id, {
          kind: "PHONE",
          value: "x",
          note: "",
        })
      ).success,
    ).toBe(false);
    expect(
      (
        await updateCaseFile(db, "mallory", c.id, {
          ...INPUT,
          title: "mine now",
        })
      ).success,
    ).toBe(false);
    expect((await deleteCaseFile(db, "mallory", c.id)).success).toBe(false);
    expect((await getCaseFile(db, "anna", c.id))?.title).toBe(
      "Fake PostFinance call",
    );
  });

  it("keeps a timeline, the scammers' details and the steps taken", async () => {
    const db = await createTestDb();
    const c = await createCaseFile(db, "anna", INPUT);
    await addTimelineEntry(db, "anna", c.id, {
      at: "2026-10-30T10:07",
      what: "First AnyDesk connection",
    });
    await addIndicator(db, "anna", c.id, {
      kind: "PHONE",
      value: "+41 77 977 81 81",
      note: "WhatsApp",
    });
    await setStepDone(db, "anna", c.id, "BANK", true);
    await setStepDone(db, "anna", c.id, "BANK", true);
    let saved = (await getCaseFile(db, "anna", c.id))!;
    expect(saved.timeline).toHaveLength(1);
    expect(saved.indicators[0]).toMatchObject({
      kind: "PHONE",
      value: "+41 77 977 81 81",
    });
    expect(saved.stepsDone).toEqual(["BANK"]);

    await removeTimelineEntry(db, "anna", c.id, saved.timeline[0]!.id);
    await removeIndicator(db, "anna", c.id, saved.indicators[0]!.id);
    await setStepDone(db, "anna", c.id, "BANK", false);
    saved = (await getCaseFile(db, "anna", c.id))!;
    expect(saved.timeline).toEqual([]);
    expect(saved.indicators).toEqual([]);
    expect(saved.stepsDone).toEqual([]);
  });

  it("refuses a step that does not apply to the kind of case", async () => {
    const db = await createTestDb();
    const c = await createCaseFile(db, "anna", { ...INPUT, kind: "PURCHASE" });
    expect(
      (await setStepDone(db, "anna", c.id, "REMOVE_TOOLS", true)).success,
    ).toBe(false);
    expect(
      (await setStepDone(db, "anna", c.id, "TELEPORT", true)).success,
    ).toBe(false);
  });

  it("deletes for good", async () => {
    const db = await createTestDb();
    const c = await createCaseFile(db, "anna", INPUT);
    expect((await deleteCaseFile(db, "anna", c.id)).success).toBe(true);
    expect(await getCaseFile(db, "anna", c.id)).toBeNull();
  });

  it("treats a malformed id as not found", async () => {
    const db = await createTestDb();
    expect(await getCaseFile(db, "anna", "not-a-uuid")).toBeNull();
  });
});
