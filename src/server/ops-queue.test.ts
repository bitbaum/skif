import { applyQuery } from "listkit";
import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { OPS_QUEUE_SPEC, parseQueueQuery } from "@/domain/ops-queue";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { applyBookingAction } from "./lifecycle";
import { listOpsQueue } from "./ops-queue";

const CUSTOMER = "oc-cust";
const HOUR = 60 * 60 * 1000;
const inHours = (h: number) => new Date(Date.now() + h * HOUR);

describe("the Operations queue in SQL", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
    const mira = await approvedProtector(db, "oc-mira");
    const assigned = await book(db, CUSTOMER, { service: "NIGHT_OUT", area: "Kreis 4", startsAt: inHours(30) });
    await applyBookingAction(db, assigned.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    await book(db, CUSTOMER, { service: "GET_HOME", area: "Kreis 5", startsAt: inHours(10) });
    await book(db, CUSTOMER, { service: "NIGHT_OUT", area: "Kreis 1", startsAt: inHours(50) });
    await book(db, CUSTOMER, { service: "FAMILY", area: "Outside the city", startsAt: inHours(20) });
  });

  /** The SQL engine must mean exactly what the spec means: run the same query
   * through listkit's array engine over every row and compare. */
  async function agrees(params: Record<string, string>) {
    const query = parseQueueQuery(params);
    const all = (await listOpsQueue(db, parseQueueQuery({}))).rows;
    const sql = await listOpsQueue(db, query);
    const mem = applyQuery(all, OPS_QUEUE_SPEC, query);
    expect(sql.rows.map((r) => r.id)).toEqual(mem.rows.map((r) => r.id));
    expect(sql.page).toEqual(mem.page);
    expect(sql.counts).toEqual(mem.counts);
    return sql;
  }

  it("with no filter, is every booking, newest request first", async () => {
    const queue = await agrees({});
    expect(queue.rows.map((r) => r.area)).toEqual(["Outside the city", "Kreis 1", "Kreis 5", "Kreis 4"]);
    expect(queue.waiting).toBe(3);
  });

  it("filters by status and service, and counts each facet with its own selection lifted", async () => {
    const queue = await agrees({ status: "REQUESTED", service: "NIGHT_OUT" });
    expect(queue.rows.map((r) => r.area)).toEqual(["Kreis 1"]);
    expect(queue.counts.status).toMatchObject({ REQUESTED: 1, ASSIGNED: 1 });
    expect(queue.counts.service).toMatchObject({ NIGHT_OUT: 1, GET_HOME: 1, FAMILY: 1 });
    // The count beside a filter never depends on whether anyone asked for it.
    expect(queue.waiting).toBe(3);
  });

  it("searches reference, service label, area and Protector — case-insensitively", async () => {
    expect((await agrees({ q: "getting HOME" })).rows.map((r) => r.area)).toEqual(["Kreis 5"]);
    expect((await agrees({ q: "outside" })).rows).toHaveLength(1);
    expect((await agrees({ q: "mira" })).rows.map((r) => r.protectorName)).toEqual(["Mira"]);
    const [first] = (await listOpsQueue(db, parseQueueQuery({}))).rows;
    expect((await agrees({ q: first!.id.slice(0, 8).toUpperCase() })).rows.map((r) => r.id)).toEqual([first!.id]);
  });

  it("treats % and _ as text, not wildcards", async () => {
    expect((await agrees({ q: "%" })).rows).toEqual([]);
    expect((await agrees({ q: "_" })).rows).toEqual([]);
    expect((await agrees({ q: "Kreis_4" })).rows).toEqual([]);
  });

  it("sorts by start time either way", async () => {
    expect((await agrees({ sort: "starts", dir: "asc" })).rows.map((r) => r.area)).toEqual([
      "Kreis 5",
      "Outside the city",
      "Kreis 4",
      "Kreis 1",
    ]);
    await agrees({ sort: "starts" });
  });

  it("clamps a page past the end to the last page that exists", async () => {
    const queue = await agrees({ page: "9" });
    expect(queue.page).toMatchObject({ page: 1, totalPages: 1, clamped: true });
  });
});
