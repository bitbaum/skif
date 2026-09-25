import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isNarrowed } from "listkit";
import { ActionForm } from "@/components/action-form";
import { languagesText } from "@/components/booking";
import { QueueControls, QueuePager, QueueTable } from "@/components/ops-queue";
import { Badge, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { canonicalQueueHref, clearHref, pageHref, parseQueueQuery } from "@/domain/ops-queue";
import { listOpsQueue } from "@/server/ops-queue";
import { PROTECTOR_MOVES, PROTECTOR_STATUS_LABELS } from "@/domain/protector-status";
import { listOpenIncidents } from "@/server/feedback";
import { listOpenComplaints } from "@/server/complaints";
import { complaintCategoryLabel } from "@/config/complaints";
import { STATUS_LABELS as COMPLAINT_STATUS_LABELS } from "@/domain/complaints";
import { listProtectors } from "@/server/protectors";
import { severityLabel } from "@/config/reports";
import { REVIEW_LABELS } from "@/domain/incidents";
import { requireOps } from "@/server/viewer";
import { protectorStatusAction } from "./actions";

export const metadata: Metadata = { title: "Operations" };

type SearchParams = Record<string, string | string[] | undefined>;

export default async function OpsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  // Authorisation first and unchanged: the queue's "no filter" is every
  // booking, which is only ever Operations' to see.
  await requireOps();
  const params = await searchParams;
  const query = parseQueueQuery(params);
  const canonical = canonicalQueueHref(params, query);
  if (canonical) redirect(canonical);

  const db = getDb();
  const [queue, protectors, incidents, openComplaints] = await Promise.all([
    listOpsQueue(db, query),
    listProtectors(db),
    listOpenIncidents(db),
    listOpenComplaints(db),
  ]);
  if (queue.page.clamped) redirect(pageHref(params, query, queue.page.page));
  const { waiting } = queue;

  return (
    <>
      <PageHeader title="Operations" lead={`${waiting} booking(s) waiting for a Protector.`}>
        <Link href="/ops/audit" className="inline-flex min-h-11 items-center text-sm text-accent underline">
          Audit log
        </Link>
      </PageHeader>
      {incidents.length > 0 && (
        <Card title={`Incidents to review (${incidents.length})`} className="mb-6">
          <ul className="space-y-2 text-sm">
            {incidents.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center gap-2">
                <Badge tone={i.severity === "HIGH" ? "danger" : "warn"}>
                  {i.severity ? severityLabel(i.severity) : "Severity unknown"}
                </Badge>
                <Badge>{REVIEW_LABELS[i.review]}</Badge>
                <Link href={`/ops/bookings/${i.bookingId}`} className="text-accent underline">
                  Filed {formatWhen(i.createdAt)}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {openComplaints.length > 0 && (
        <Card title={`Complaints to review (${openComplaints.length})`} className="mb-6">
          <ul className="space-y-2 text-sm">
            {openComplaints.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-2">
                <Badge tone="warn">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                <Link href={`/ops/complaints/${c.id}`} className="text-accent underline">
                  {complaintCategoryLabel(c.category)}
                </Link>
                <span className="text-muted">{formatWhen(c.createdAt)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <Card title="Bookings" className="mb-6">
        <QueueControls params={params} query={query} counts={queue.counts} />
        <QueueTable rows={queue.rows} narrowed={isNarrowed(query)} clear={clearHref(params, query)} />
        <QueuePager params={params} query={query} page={queue.page} />
      </Card>
      <Card title="Protectors">
        {protectors.length === 0 ? (
          <Empty>No applications yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {protectors.map((p) => (
              <li key={p.id} className="flex flex-wrap items-start gap-4 py-4">
                <div className="min-w-0 flex-1 space-y-1 text-sm">
                  <p className="flex flex-wrap items-center gap-2">
                    <Link href={`/ops/protectors/${p.id}`} className="font-medium text-accent underline">
                      {p.displayName}
                    </Link>
                    <Badge tone={p.status === "APPROVED" ? "accent" : "warn"}>{PROTECTOR_STATUS_LABELS[p.status]}</Badge>
                  </p>
                  <p className="text-muted">
                    {p.services.map(serviceLabel).join(", ")} · {languagesText(p.languages)} · {p.experienceYears}{" "}
                    years
                  </p>
                </div>
                {PROTECTOR_MOVES[p.status].map((m) => (
                  <ActionForm
                    key={m.to}
                    action={protectorStatusAction}
                    submitLabel={m.label}
                    variant={m.tone}
                    hidden={{ protectorId: p.id, status: m.to }}
                    className=""
                  />
                ))}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
