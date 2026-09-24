import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { languagesText, StatusBadge } from "@/components/booking";
import { Badge, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { skillLabel } from "@/config/protectors";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { listAllBookings } from "@/server/bookings";
import { listProtectors, type Protector } from "@/server/protectors";
import { requireOps } from "@/server/viewer";
import { protectorStatusAction } from "./actions";

export const metadata: Metadata = { title: "Operations" };

const NEXT_PROTECTOR_STATUS: Record<Protector["status"], { status: "APPROVED" | "SUSPENDED"; label: string }> = {
  APPLIED: { status: "APPROVED", label: "Approve" },
  APPROVED: { status: "SUSPENDED", label: "Suspend" },
  SUSPENDED: { status: "APPROVED", label: "Reinstate" },
};

export default async function OpsPage() {
  await requireOps();
  const db = getDb();
  const [bookings, protectors] = await Promise.all([listAllBookings(db), listProtectors(db)]);
  const waiting = bookings.filter((b) => b.status === "REQUESTED").length;

  return (
    <>
      <PageHeader title="Operations" lead={`${waiting} booking(s) waiting for a Protector.`} />
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
            {protectors.map((p) => {
              const next = NEXT_PROTECTOR_STATUS[p.status];
              return (
                <li key={p.id} className="flex flex-wrap items-start gap-4 py-4">
                  <div className="min-w-0 flex-1 space-y-1 text-sm">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{p.displayName}</span>
                      <Badge tone={p.status === "APPROVED" ? "accent" : "warn"}>{p.status}</Badge>
                    </p>
                    <p className="whitespace-pre-wrap text-muted">{p.bio}</p>
                    <p className="text-muted">
                      {p.services.map(serviceLabel).join(", ")} · {languagesText(p.languages)}
                    </p>
                    <p className="text-muted">{p.skills.map(skillLabel).join(", ") || "No training listed"}</p>
                  </div>
                  <ActionForm
                    action={protectorStatusAction}
                    submitLabel={next.label}
                    variant={next.status === "SUSPENDED" ? "danger" : "primary"}
                    hidden={{ protectorId: p.id, status: next.status }}
                    className=""
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </>
  );
}
