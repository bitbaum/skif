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
          <div className="overflow-x-auto">
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
                {events.map((e) => {
                  const href = SUBJECT_LINK[e.subjectType]?.(e.subjectId);
                  return (
                    <tr key={e.id}>
                      <td className="py-2 pr-4 whitespace-nowrap">{formatWhen(e.at)}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{e.actorSub}</td>
                      <td className="py-2 pr-4">
                        {href ? (
                          <Link href={href} className="text-accent underline">
                            {AUDIT_LABELS[e.action]}
                          </Link>
                        ) : (
                          AUDIT_LABELS[e.action]
                        )}
                      </td>
                      <td className="py-2 pr-4 text-muted">
                        {e.detail ? Object.entries(e.detail).map(([k, v]) => `${k}: ${v}`).join(" · ") : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
