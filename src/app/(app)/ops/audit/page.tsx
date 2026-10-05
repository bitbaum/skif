import type { Metadata } from "next";
import Link from "next/link";
import { Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { getDb } from "@/db/client";
import { AUDIT_LABELS, AUDIT_PAGE_SIZE, type AuditSubject } from "@/domain/audit";
import { listAudit } from "@/server/audit";
import { requireOps } from "@/server/viewer";

export const metadata: Metadata = { title: "Audit · Operations" };

const SUBJECT_LINK: Partial<Record<AuditSubject, (id: string) => string>> = {
  BOOKING: (id) => `/ops/bookings/${id}`,
  COMPLAINT: (id) => `/ops/complaints/${id}`,
  PROTECTOR: (id) => `/ops/protectors/${id}`,
};

type AuditEvent = Awaited<ReturnType<typeof listAudit>>[number];

function What({ action, href }: { action: AuditEvent["action"]; href?: string }) {
  return href ? (
    <Link href={href} className="inline-flex min-h-11 items-center text-accent underline">
      {AUDIT_LABELS[action]}
    </Link>
  ) : (
    <span>{AUDIT_LABELS[action]}</span>
  );
}

function detailText(detail: AuditEvent["detail"]): string {
  return detail ? Object.entries(detail).map(([k, v]) => `${k}: ${v}`).join(" · ") : "—";
}

export default async function AuditPage() {
  await requireOps();
  const events = await listAudit(getDb());

  return (
    <>
      <PageHeader
        title="Audit log"
        lead={`Who in Operations opened or changed something sensitive — the latest ${AUDIT_PAGE_SIZE}.`}
      />
      <Card>
        {events.length === 0 ? (
          <Empty>Nothing recorded yet.</Empty>
        ) : (
          <>
            {/* A phone gets one entry per event: four columns don't fit 390px. */}
            <ul className="divide-y divide-line md:hidden">
              {events.map((e) => (
                <li key={e.id} className="space-y-1 py-3 text-sm">
                  <What action={e.action} href={SUBJECT_LINK[e.subjectType]?.(e.subjectId)} />
                  <p className="text-muted">
                    {formatWhen(e.at)} · <span className="font-mono">{e.actorSub}</span>
                  </p>
                  {e.detail && <p className="text-muted">{detailText(e.detail)}</p>}
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="text-muted">
                  <tr>
                    <th className="py-2 pr-4 font-medium">When</th>
                    <th className="py-2 pr-4 font-medium">Who</th>
                    <th className="py-2 pr-4 font-medium">What</th>
                    <th className="py-2 pr-4 font-medium">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td className="py-2 pr-4 whitespace-nowrap">{formatWhen(e.at)}</td>
                      <td className="py-2 pr-4 font-mono text-sm">{e.actorSub}</td>
                      <td className="py-2 pr-4">
                        <What action={e.action} href={SUBJECT_LINK[e.subjectType]?.(e.subjectId)} />
                      </td>
                      <td className="py-2 pr-4 text-muted">{detailText(e.detail)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
