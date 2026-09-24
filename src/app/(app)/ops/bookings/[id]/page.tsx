import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import {
  ConstraintList,
  languagesText,
  presenceText,
  RatingSummary,
  ReportList,
  StatusBadge,
  Timeline,
} from "@/components/booking";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions } from "@/domain/lifecycle";
import type { MatchResult } from "@/domain/matching";
import { PAYMENT_LABELS } from "@/domain/payment";
import { getBookingForOps } from "@/server/bookings";
import { matchForBooking } from "@/server/matching";
import { getPreferences } from "@/server/preferences";
import { requireOps } from "@/server/viewer";
import { assignAction, opsCancelAction } from "../../actions";

export const metadata: Metadata = { title: "Booking · Operations" };

function Matches({ bookingId, match }: { bookingId: string; match: MatchResult }) {
  return (
    <div className="space-y-4">
      {match.ranked.length === 0 && <p className="text-sm text-muted">No approved Protector can take this job.</p>}
      <ol className="space-y-3">
        {match.ranked.map((r, index) => (
          <li key={r.id} className="rounded-lg border border-line p-3">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted">#{index + 1}</span>
              <span className="font-medium">{r.displayName}</span>
              <span className="text-sm text-muted">{r.score} points</span>
              <span className="ml-auto">
                <ActionForm
                  action={assignAction}
                  submitLabel="Assign"
                  hidden={{ bookingId, protectorId: r.id }}
                  className=""
                />
              </span>
            </div>
            <ul className="space-y-0.5 text-sm">
              {r.reasons.map((reason) => (
                <li key={reason.label} className="flex justify-between gap-4">
                  <span>{reason.label}</span>
                  <span className="tabular-nums text-muted">
                    {reason.points > 0 ? "+" : ""}
                    {reason.points}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {match.excluded.length > 0 && (
        <div>
          <h3 className="mb-1 text-sm font-semibold">Not eligible</h3>
          <ul className="space-y-0.5 text-sm text-muted">
            {match.excluded.map((e) => (
              <li key={e.id}>
                {e.displayName} — {e.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function OpsBookingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOps();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const db = getDb();
  const detail = await getBookingForOps(db, id.data);
  if (!detail) notFound();
  const { booking, protector, events, rating, reports } = detail;
  const canAssign = availableActions(booking.status, "OPS").includes("ASSIGN");
  const canCancel = availableActions(booking.status, "OPS").includes("CANCEL");
  const [match, prefs] = await Promise.all([
    canAssign ? matchForBooking(db, booking) : null,
    getPreferences(db, booking.customerSub),
  ]);

  return (
    <>
      <PageHeader
        title={serviceLabel(booking.service)}
        lead={`${formatWhen(booking.startsAt)} · ${booking.hours}h · ${booking.area}`}
      >
        <StatusBadge status={booking.status} />
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        {match && (
          <Card title="Protectors, ranked — with reasons" className="md:col-span-2">
            <Matches bookingId={booking.id} match={match} />
          </Card>
        )}
        <Card title="Request">
          <DefinitionList
            items={[
              ["Meeting point", booking.meetingPoint],
              ["Notes", booking.notes || "—"],
              ["Presence", presenceText(booking.presenceStyle)],
              ["Languages", languagesText(booking.languages)],
              ["Hard limits", <ConstraintList key="c" constraints={booking.hardConstraints} />],
              ["What matters to them", prefs?.valuesNote || "—"],
              ["Protector", protector?.displayName ?? "Not assigned"],
              ["Payment", PAYMENT_LABELS[booking.paymentStatus]],
            ]}
          />
          {canCancel && (
            <div className="mt-5">
              <ActionForm
                action={opsCancelAction}
                submitLabel="Cancel booking"
                variant="danger"
                hidden={{ bookingId: booking.id }}
              />
            </div>
          )}
        </Card>
        <Card title="Lifecycle">
          <Timeline events={events} />
        </Card>
        <Card title="Customer's rating">
          <RatingSummary rating={rating} />
        </Card>
        <Card title="Reports and incidents">
          <ReportList reports={reports} />
        </Card>
      </div>
    </>
  );
}
