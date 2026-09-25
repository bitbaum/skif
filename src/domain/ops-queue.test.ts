import { describe, expect, it } from "vitest";
import { OPS_QUEUE } from "@/config/ops-queue";
import {
  bookingRef,
  canonicalQueueHref,
  clearHref,
  pageHref,
  parseQueueQuery,
  queueHref,
  servicesMatching,
  toggleHref,
} from "./ops-queue";

describe("parseQueueQuery", () => {
  it("drops statuses and services the config does not know", () => {
    const q = parseQueueQuery({ status: "REQUESTED,BOGUS", service: ["NIGHT_OUT", "'; drop"] });
    expect(q.facets).toEqual({ status: ["REQUESTED"], service: ["NIGHT_OUT"] });
  });

  it("defaults to newest first, page 1, and ignores a hand-typed page size", () => {
    const q = parseQueueQuery({ page: "0", size: "5000" });
    expect(q).toMatchObject({ sort: "newest", dir: "desc", page: 1, pageSize: OPS_QUEUE.pageSize });
  });

  it("caps the search length", () => {
    expect(parseQueueQuery({ q: "x".repeat(500) }).q).toHaveLength(OPS_QUEUE.searchMax);
  });
});

describe("queue links", () => {
  const params = { status: "REQUESTED", page: "3", q: "kreis" };
  const query = parseQueueQuery(params);

  it("toggling a facet keeps search and drops the page", () => {
    expect(toggleHref(params, query, "status", "ASSIGNED")).toBe("/ops?status=REQUESTED%2CASSIGNED&q=kreis");
    expect(toggleHref(params, query, "status", "REQUESTED")).toBe("/ops?q=kreis");
  });

  it("moving between pages keeps everything else", () => {
    expect(pageHref(params, query, 4)).toBe("/ops?status=REQUESTED&page=4&q=kreis");
    expect(pageHref(params, query, 1)).toBe("/ops?status=REQUESTED&q=kreis");
  });

  it("clearing keeps the sort", () => {
    const sorted = { ...params, sort: "starts" };
    expect(clearHref(sorted, parseQueueQuery(sorted))).toBe("/ops?sort=starts");
  });

  it("an empty query is the bare path", () => {
    const empty = parseQueueQuery({});
    expect(queueHref({}, empty, empty)).toBe("/ops");
  });
});

describe("canonicalQueueHref", () => {
  it("rewrites what a GET form submits into the codec's spelling", () => {
    const form = { status: ["REQUESTED", "ASSIGNED"], q: "", sort: "newest", dir: "desc" };
    expect(canonicalQueueHref(form, parseQueueQuery(form))).toBe("/ops?status=REQUESTED%2CASSIGNED");
  });

  it("leaves a canonical URL alone, so it can never loop", () => {
    const url = { status: "REQUESTED,ASSIGNED", q: "night", page: "2" };
    expect(canonicalQueueHref(url, parseQueueQuery(url))).toBeNull();
    expect(canonicalQueueHref({}, parseQueueQuery({}))).toBeNull();
  });

  it("strips values nobody could have produced from the page", () => {
    const url = { status: "BOGUS", size: "9" };
    expect(canonicalQueueHref(url, parseQueueQuery(url))).toBe("/ops");
  });
});

describe("search helpers", () => {
  it("finds services by their label, never by a raw enum", () => {
    expect(servicesMatching("night")).toEqual(["NIGHT_OUT"]);
    expect(servicesMatching("protect")).toEqual(["PERSONAL_PROTECTION", "PROTECTOR_DRIVER"]);
    expect(servicesMatching("")).toEqual([]);
  });

  it("a reference is the start of the id", () => {
    expect(bookingRef("3f2a9c1e-0000-4000-8000-000000000000")).toBe("3f2a9c1e");
  });
});
