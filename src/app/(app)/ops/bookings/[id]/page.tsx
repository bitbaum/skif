import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import {
  ConstraintList,
  RequirementList,
  languagesText,
  presenceText,
  RatingSummary,
  ReasonList,
  ReportList,
  StatusBadge,
  Timeline,
} from "@/components/booking";
import { Badge, Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { Field, TextInput } from "@/components/fields";
import { BOOKING_LIMITS } from "@/config/services";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions } from "@/domain/lifecycle";
import { fitLabel, type MatchResult } from "@/domain/matching";
import { PAYMENT_LABELS } from "@/domain/payment";
import { getBookingForOps } from "@/server/bookings";
import { matchForBooking } from "@/server/matching";
import { listComplaintsForBooking } from "@/server/complaints";
import { getCustomerProfile } from "@/server/customers";
import { complaintCategoryLabel } from "@/config/complaints";
import { STATUS_LABELS as COMPLAINT_STATUS_LABELS } from "@/domain/complaints";
import Link from "next/link";
import { getPreferences } from "@/server/preferences";
import { audit } from "@/server/audit";
import { requireOps } from "@/server/viewer";
import { IncidentReview } from "@/components/incident-review";
import { BookingThread } from "@/components/booking-thread";
import { openThreadFor } from "@/server/booking-thread";
import { assignAction, opsCancelAction, reviewIncidentAction, unassignAction } from "../../actions";

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
              <Badge tone={r.band === "GOOD" ? "neutral" : "accent"}>{fitLabel(r.band)}</Badge>
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
            <ReasonList reasons={r.reasons} />
          </li>
        ))}
      </ol>
      {match.excluded.length > 0 && (
        <div>
          <h3 className="mb-1 text-sm font-semibold">Not eligible</h3>
          <ul className="space-y-3 text-sm">
            {match.excluded.map((e) => (
              <li key={e.id} className="space-y-2">
                <p className="text-muted">
                  {e.displayName} — {e.reason}
                </p>
                {e.overridable && (
                  <details>
                    <summary className="cursor-pointer text-sm text-muted underline">Assign anyway…</summary>
                    <ActionForm
                      action={assignAction}
                      submitLabel="Assign anyway"
                      variant="secondary"
                      hidden={{ bookingId, protectorId: e.id }}
                      className="mt-2 space-y-2"
                    >
                      <Field label="Why override the matcher?" hint="Recorded on the booking; visible to Operations only.">
                        <TextInput name="overrideReason" maxLength={BOOKING_LIMITS.notesMax} required />
                      </Field>
                    </ActionForm>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function OpsBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireOps();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const db = getDb();
  const detail = await getBookingForOps(db, id.data);
  if (!detail) notFound();
  await audit(db, viewer.sub, "VIEW_BOOKING", { type: "BOOKING", id: id.data });
  const { booking, protector, events, rating, reports } = detail;
  const canAssign = availableActions(booking.status, "OPS").includes("ASSIGN");
  const canCancel = availableActions(booking.status, "OPS").includes("CANCEL");
  const canUnassign = availableActions(booking.status, "OPS").includes("UNASSIGN");
  const [match, prefs, profile, bookingComplaints, thread] = await Promise.all([
    canAssign ? matchForBooking(db, booking) : null,
    getPreferences(db, booking.customerSub),
    getCustomerProfile(db, booking.customerSub),
    listComplaintsForBooking(db, booking.id),
    openThreadFor(db, booking, viewer, "OPS"),
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
              ["Customer", profile?.preferredName ?? "No name given"],
              ["Meeting point", booking.meetingPoint],
              ["Notes", booking.notes || "—"],
              ["Presence", presenceText(booking.presenceStyle)],
              ["Languages", languagesText(booking.languages)],
              ["Requirements", <RequirementList key="r" service={booking.service} extra={booking.requiredCapabilities} />],
              ["Hard limits", <ConstraintList key="c" constraints={booking.hardConstraints} />],
              ["What matters to them", prefs?.valuesNote || "—"],
              ["Protector", protector?.displayName ?? "Not assigned"],
              ["Payment", PAYMENT_LABELS[booking.paymentStatus]],
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-3">
            {canUnassign && (
              <ActionForm
                action={unassignAction}
                submitLabel="Take the Protector off this job"
                variant="secondary"
                hidden={{ bookingId: booking.id }}
                className=""
              />
            )}
            {canCancel && (
              <ActionForm
                action={opsCancelAction}
                submitLabel="Cancel booking"
                variant="danger"
                hidden={{ bookingId: booking.id }}
                className=""
              />
            )}
          </div>
        </Card>
        {thread && <BookingThread bookingId={booking.id} seat="OPS" view={thread} className="md:col-span-2" />}
        <Card title="Lifecycle">
          <Timeline events={events} showNotes />
        </Card>
        <Card title="Customer's rating">
          <RatingSummary rating={rating} />
        </Card>
        {bookingComplaints.length > 0 && (
          <Card title="Complaints">
            <ul className="space-y-1 text-sm">
              {bookingComplaints.map((c) => (
                <li key={c.id}>
                  <Link href={`/ops/complaints/${c.id}`} className="text-accent underline">
                    {complaintCategoryLabel(c.category)}
                  </Link>{" "}
                  — {COMPLAINT_STATUS_LABELS[c.status]}
                </li>
              ))}
            </ul>
          </Card>
        )}
        <Card title="Reports and incidents">
          <ReportList reports={reports} showReview />
          {reports
            .filter((r) => r.review && r.review !== "RESOLVED")
            .map((r) => (
              <div key={r.id} className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-sm font-medium">Review incident from {formatWhen(r.createdAt)}</p>
                <IncidentReview incident={r} action={reviewIncidentAction} />
              </div>
            ))}
        </Card>
      </div>
    </>
  );
}
