import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { languagesText, StatusBadge } from "@/components/booking";
import { Badge, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { listAllBookings } from "@/server/bookings";
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

export default async function OpsPage() {
  await requireOps();
  const db = getDb();
  const [bookings, protectors, incidents, openComplaints] = await Promise.all([
    listAllBookings(db),
    listProtectors(db),
    listOpenIncidents(db),
    listOpenComplaints(db),
  ]);
  const waiting = bookings.filter((b) => b.status === "REQUESTED").length;

  return (
    <>
      <PageHeader title="Operations" lead={`${waiting} booking(s) waiting for a Protector.`} />
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
        {bookings.length === 0 ? (
          <Empty>No bookings yet.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 pr-4 font-medium">Service</th>
                  <th className="py-2 pr-4 font-medium">Area</th>
                  <th className="py-2 pr-4 font-medium">Protector</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-2 pr-4">
                      <Link href={`/ops/bookings/${b.id}`} className="text-accent underline">
                        {formatWhen(b.startsAt)}
                      </Link>
                    </td>
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
        )}
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
