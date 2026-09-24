import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList, RatingSummary, ReportList, StatusBadge, Timeline, languagesText } from "@/components/booking";
import { Field, RadioGroup, TextArea } from "@/components/fields";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { RATING_COMMENT_MAX, RATING_DIMENSIONS, RATING_SCALE } from "@/config/ratings";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions } from "@/domain/lifecycle";
import { PAYMENT_LABELS } from "@/domain/payment";
import { getBookingForCustomer } from "@/server/bookings";
import { requireViewer } from "@/server/viewer";
import { cancelBookingAction, rateBookingAction } from "../actions";

export const metadata: Metadata = { title: "Booking" };

const SCALE_OPTIONS = RATING_SCALE.map((s) => ({ key: String(s.value), label: s.label }));

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const detail = await getBookingForCustomer(getDb(), viewer.sub, id.data);
  if (!detail) notFound();
  const { booking, protector, events, rating, reports } = detail;
  const canCancel = availableActions(booking.status, "CUSTOMER").includes("CANCEL");

  return (
    <>
      <PageHeader title={serviceLabel(booking.service)} lead={`${formatWhen(booking.startsAt)} · ${booking.area}`}>
        <StatusBadge status={booking.status} />
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Details">
          <DefinitionList
            items={[
              ["Hours", booking.hours],
              ["Meeting point", booking.meetingPoint],
              ["Notes", booking.notes || "—"],
              ["Hard limits", <ConstraintList key="c" constraints={booking.hardConstraints} />],
              ["Languages", languagesText(booking.languages)],
              ["Payment", PAYMENT_LABELS[booking.paymentStatus]],
            ]}
          />
          {canCancel && (
            <div className="mt-5">
              <ActionForm
                action={cancelBookingAction}
                submitLabel="Cancel booking"
                variant="danger"
                hidden={{ bookingId: booking.id }}
              />
            </div>
          )}
        </Card>
        <Card title="Your Protector">
          {protector ? (
            <div className="space-y-2 text-sm">
              <p className="font-medium">{protector.displayName}</p>
              <p className="whitespace-pre-wrap text-muted">{protector.bio}</p>
              <p className="text-muted">Speaks {languagesText(protector.languages)}</p>
            </div>
          ) : (
            <p className="text-sm text-muted">Operations is choosing someone for you.</p>
          )}
        </Card>
        <Card title="What happened">
          <Timeline events={events} />
        </Card>
        <Card title="How it felt">
          {booking.status === "COMPLETED" && !rating ? (
            <ActionForm action={rateBookingAction} submitLabel="Send" hidden={{ bookingId: booking.id }}>
              {RATING_DIMENSIONS.map((d) => (
                <RadioGroup key={d.key} legend={d.question} name={d.key} options={SCALE_OPTIONS} inline />
              ))}
              <Field label="Anything else (optional)">
                <TextArea name="comment" maxLength={RATING_COMMENT_MAX} />
              </Field>
            </ActionForm>
          ) : booking.status === "COMPLETED" ? (
            <RatingSummary rating={rating} />
          ) : (
            <p className="text-sm text-muted">You can tell us how it felt once it&apos;s completed.</p>
          )}
        </Card>
        {reports.length > 0 && (
          <Card title="Protector's reports" className="md:col-span-2">
            <ReportList reports={reports} />
          </Card>
        )}
      </div>
    </>
  );
}
