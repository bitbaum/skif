/**
 * The Operations booking queue's controls and table. Every control is a link
 * or a GET form, so the queue works with JavaScript off; every link is written
 * by listkit's codec (via `@/domain/ops-queue`), never by hand.
 */
import Link from "next/link";
import { pageWindow, type ListQuery, type PageInfo, type ParamsLike } from "listkit";
import { serviceLabel, SERVICES } from "@/config/services";
import {
  bookingRef,
  OPS_QUEUE_PATH,
  OPS_QUEUE_SPEC,
  pageHref,
  toggleHref,
  type QueueFacet,
  type QueueRow,
} from "@/domain/ops-queue";
import { BOOKING_STATUSES, STATUS_LABELS } from "@/domain/lifecycle";
import { StatusBadge } from "./booking";
import { buttonClass, Empty, formatWhen } from "./ui";

type Current = { params: ParamsLike; query: ListQuery };

const FACET_OPTIONS: Record<QueueFacet, { legend: string; options: { key: string; label: string }[] }> = {
  status: { legend: "Status", options: BOOKING_STATUSES.map((s) => ({ key: s, label: STATUS_LABELS[s] })) },
  service: { legend: "Service", options: SERVICES.map((s) => ({ key: s.key, label: s.label })) },
};

const chipClass = {
  on: "border-accent bg-accent-soft text-accent",
  off: "border-line bg-surface text-muted hover:bg-bg",
} as const;

function FacetChips({ facet, counts, params, query }: Current & { facet: QueueFacet; counts: Record<string, number> }) {
  const { legend, options } = FACET_OPTIONS[facet];
  const selected = query.facets[facet] ?? [];
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted">{legend}</p>
      <ul className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o.key);
          return (
            <li key={o.key}>
              <Link
                href={toggleHref(params, query, facet, o.key)}
                aria-current={on ? "true" : undefined}
                className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${chipClass[on ? "on" : "off"]}`}
              >
                {o.label}
                <span className="tabular-nums opacity-80">{counts[o.key] ?? 0}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const DIRECTIONS = [
  { key: "desc", label: "Latest first" },
  { key: "asc", label: "Earliest first" },
] as const;

const selectClass = "min-h-11 rounded-lg border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none";

/** Search and sort. Facet selections ride along as hidden fields; submitting
 * never carries `page`, so a new search starts on page 1. */
function SearchForm({ query }: { query: ListQuery }) {
  return (
    <form action={OPS_QUEUE_PATH} method="get" role="search" className="flex flex-wrap items-end gap-3">
      {Object.entries(query.facets).map(([key, values]) => (
        <input key={key} type="hidden" name={key} value={values.join(",")} />
      ))}
      <label className="min-w-48 flex-1 space-y-1">
        <span className="block text-sm font-medium text-muted">Search</span>
        <input
          type="search"
          name="q"
          defaultValue={query.q}
          placeholder="Reference, service, area or Protector"
          className={`w-full ${selectClass}`}
        />
      </label>
      <label className="space-y-1">
        <span className="block text-sm font-medium text-muted">Sort by</span>
        <select name="sort" defaultValue={query.sort} className={selectClass}>
          {OPS_QUEUE_SPEC.sorts.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-1">
        <span className="block text-sm font-medium text-muted">Order</span>
        <select name="dir" defaultValue={query.dir} className={selectClass}>
          {DIRECTIONS.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className={buttonClass.secondary}>
        Apply
      </button>
    </form>
  );
}

export function QueueControls({ params, query, counts }: Current & { counts: Record<QueueFacet, Record<string, number>> }) {
  return (
    <div className="mb-4 space-y-4">
      <SearchForm query={query} />
      <FacetChips facet="status" counts={counts.status} params={params} query={query} />
      <FacetChips facet="service" counts={counts.service} params={params} query={query} />
    </div>
  );
}

export function QueueTable({ rows, narrowed, clear }: { rows: QueueRow[]; narrowed: boolean; clear: string }) {
  if (rows.length === 0) {
    return narrowed ? (
      <Empty>
        No bookings match.{" "}
        <Link href={clear} className="inline-flex min-h-11 items-center text-accent underline">
          Clear search and filters
        </Link>
      </Empty>
    ) : (
      <Empty>No bookings yet.</Empty>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-muted">
          <tr>
            <th className="py-2 pr-4 font-medium">When</th>
            <th className="py-2 pr-4 font-medium">Ref</th>
            <th className="py-2 pr-4 font-medium">Service</th>
            <th className="py-2 pr-4 font-medium">Area</th>
            <th className="py-2 pr-4 font-medium">Protector</th>
            <th className="py-2 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((b) => (
            <tr key={b.id}>
              <td className="py-2 pr-4 whitespace-nowrap">
                <Link href={`/ops/bookings/${b.id}`} className="inline-flex min-h-11 items-center text-accent underline">
                  {formatWhen(b.startsAt)}
                </Link>
              </td>
              <td className="py-2 pr-4 font-mono text-sm">{bookingRef(b.id)}</td>
              <td className="py-2 pr-4">{serviceLabel(b.service)}</td>
              <td className="py-2 pr-4">{b.area}</td>
              <td className="py-2 pr-4">{b.protectorName ?? "—"}</td>
              <td className="py-2 pr-4">
                <StatusBadge status={b.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const pagerLink = "inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1 hover:bg-bg";

export function QueuePager({ params, query, page }: Current & { page: PageInfo }) {
  if (page.total === 0) return null;
  return (
    <nav aria-label="Booking pages" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
      <p className="text-muted">
        {page.firstItem}–{page.lastItem} of {page.total}
      </p>
      {page.totalPages > 1 && (
        <ul className="flex flex-wrap items-center gap-2">
          {page.hasPrev && (
            <li>
              <Link href={pageHref(params, query, page.page - 1)} className={pagerLink} rel="prev">
                Previous
              </Link>
            </li>
          )}
          {pageWindow(page.page, page.totalPages).map((n, i) =>
            n === null ? (
              <li key={`gap-${i}`} className="text-muted" aria-hidden>
                …
              </li>
            ) : (
              <li key={n}>
                {n === page.page ? (
                  <span aria-current="page" className="rounded-lg border border-accent bg-accent-soft px-3 py-1 text-accent">
                    {n}
                  </span>
                ) : (
                  <Link href={pageHref(params, query, n)} className={pagerLink}>
                    {n}
                  </Link>
                )}
              </li>
            ),
          )}
          {page.hasNext && (
            <li>
              <Link href={pageHref(params, query, page.page + 1)} className={pagerLink} rel="next">
                Next
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
