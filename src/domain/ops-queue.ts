/**
 * The Operations booking queue as a query: which facets it narrows by, what
 * its search looks at, how it sorts and pages — declared once, as a listkit
 * spec, so the URL codec, the SQL builder and the page all read the same one.
 *
 * Only ever used behind `requireOps()`. Operations may already see every
 * booking, so listkit's "empty selection filters nothing" is the whole queue
 * Operations was always shown — never a widening of what anyone may read.
 */
import {
  normalise,
  parseQuery,
  toggleInSet,
  writeQuery,
  type ListQuery,
  type ListSpec,
  type ParamsLike,
} from "listkit";
import { OPS_QUEUE } from "@/config/ops-queue";
import { SERVICE_KEYS, SERVICES, serviceLabel } from "@/config/services";
import { BOOKING_STATUSES, type BookingStatus } from "./lifecycle";

/** The fields of a queue row the spec reads. Everything here is already on
 * the Operations page; search deliberately reaches nothing else. */
export type QueueRow = {
  id: string;
  service: string;
  status: BookingStatus;
  area: string;
  protectorName: string | null;
  startsAt: Date;
  createdAt: Date;
};

/** A booking's short reference: the start of its id, as shown in the queue. */
export function bookingRef(id: string): string {
  return id.slice(0, 8);
}

export const QUEUE_FACETS = { status: "status", service: "service" } as const;
export type QueueFacet = keyof typeof QUEUE_FACETS;

export const OPS_QUEUE_SPEC: ListSpec<QueueRow> = {
  facets: [
    { key: QUEUE_FACETS.status, kind: "many", value: (r) => r.status, options: BOOKING_STATUSES },
    { key: QUEUE_FACETS.service, kind: "many", value: (r) => r.service, options: SERVICE_KEYS },
  ],
  search: { text: (r) => [r.id, serviceLabel(r.service), r.area, r.protectorName] },
  sorts: [
    { key: "newest", label: "Requested", by: [(r) => r.createdAt.getTime(), (r) => r.id] },
    { key: "starts", label: "Start time", by: [(r) => r.startsAt.getTime(), (r) => r.id] },
  ],
  defaultSort: "newest",
  defaultDir: "desc",
  defaultPageSize: OPS_QUEUE.pageSize,
};

export type QueueSort = "newest" | "starts";

/** Read the queue's query from the URL. Page size is fixed: `size` is not a
 * control on this page, so a hand-typed one is ignored rather than honoured. */
export function parseQueueQuery(params: ParamsLike): ListQuery {
  const query = parseQuery(params, OPS_QUEUE_SPEC, { maxPageSize: OPS_QUEUE.pageSize });
  return { ...query, q: query.q.slice(0, OPS_QUEUE.searchMax), pageSize: OPS_QUEUE.pageSize };
}

export function queueSort(query: ListQuery): QueueSort {
  return query.sort === "starts" ? "starts" : "newest";
}

/** The search text as the SQL engine should match it: casefolded and
 * whitespace-collapsed exactly as listkit's own `searchMatches` does. */
export function searchNeedle(query: ListQuery): string {
  return normalise(query.q);
}

/** Service keys whose label contains the search — labels live in config, not
 * in the database, so this half of the search is resolved here. */
export function servicesMatching(needle: string): string[] {
  if (!needle) return [];
  return SERVICES.filter((s) => normalise(s.label).includes(needle)).map((s) => s.key);
}

export const OPS_QUEUE_PATH = "/ops";

/** The queue's URL for a query, written over the params the reader arrived
 * with. Pass `previous` so a change to the result set drops the page. */
export function queueHref(current: ParamsLike, next: ListQuery, previous: ListQuery): string {
  const qs = writeQuery(current, next, OPS_QUEUE_SPEC, previous).toString();
  return qs ? `${OPS_QUEUE_PATH}?${qs}` : OPS_QUEUE_PATH;
}

/** The link that adds or removes one option of a facet. */
export function toggleHref(current: ParamsLike, query: ListQuery, facet: QueueFacet, option: string): string {
  const selected = query.facets[facet] ?? [];
  const next = { ...query, facets: { ...query.facets, [facet]: toggleInSet(selected, option) } };
  return queueHref(current, next, query);
}

export function pageHref(current: ParamsLike, query: ListQuery, page: number): string {
  return queueHref(current, { ...query, page }, query);
}

/** The link that clears search and filters but keeps the sort. */
export function clearHref(current: ParamsLike, query: ListQuery): string {
  return queueHref(current, { ...query, q: "", facets: {} }, query);
}

/** Params as a URLSearchParams, spelled the way listkit's codec copies them. */
function toParams(current: ParamsLike): URLSearchParams {
  if (current instanceof URLSearchParams) return new URLSearchParams(current);
  return new URLSearchParams(
    Object.entries(current).flatMap(([k, v]) =>
      v === undefined ? [] : (Array.isArray(v) ? v : [v]).map((s): [string, string] => [k, s]),
    ),
  );
}

/** The canonical URL for what the reader asked for, or null when they are
 * already on it. A GET form writes every field (`q=` blank, the default
 * sort); sending the reader on to the codec's own spelling keeps listkit the
 * only thing that ever writes this list's URL. */
export function canonicalQueueHref(current: ParamsLike, query: ListQuery): string | null {
  const params = toParams(current);
  const canonical = writeQuery(params, query, OPS_QUEUE_SPEC).toString();
  if (canonical === params.toString()) return null;
  return canonical ? `${OPS_QUEUE_PATH}?${canonical}` : OPS_QUEUE_PATH;
}
