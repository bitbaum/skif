import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList, RequirementList, RatingSummary, ReportList, StatusBadge, Timeline, languagesText } from "@/components/booking";
import { Field, RadioGroup, Select, TextArea } from "@/components/fields";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { RATING_COMMENT_MAX, RATING_DIMENSIONS, RATING_SCALE } from "@/config/ratings";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions } from "@/domain/lifecycle";
import { PAYMENT_LABELS } from "@/domain/payment";
import { getBookingForCustomer } from "@/server/bookings";
import { requireViewer } from "@/server/viewer";
import { cancelBookingAction, fileComplaintAction, rateBookingAction } from "../actions";
import { COMPLAINT_CATEGORIES, COMPLAINT_TEXT_MAX, complaintCategoryLabel } from "@/config/complaints";
import { listCustomerComplaints } from "@/server/complaints";

export const metadata: Metadata = { title: "Booking" };

const SCALE_OPTIONS = RATING_SCALE.map((s) => ({ key: String(s.value), label: s.label }));
const NOT_APPLICABLE = { key: "", label: "Nothing tense happened" };

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const db = getDb();
  const detail = await getBookingForCustomer(db, viewer.sub, id.data);
  if (!detail) notFound();
  const myComplaints = await listCustomerComplaints(db, viewer.sub, id.data);
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
              ["Requirements", <RequirementList key="r" service={booking.service} extra={booking.requiredCapabilities} />],
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
                <RadioGroup
                  key={d.key}
                  legend={d.question}
                  name={d.key}
                  options={d.optional ? [NOT_APPLICABLE, ...SCALE_OPTIONS] : SCALE_OPTIONS}
                  selected={d.optional ? NOT_APPLICABLE.key : undefined}
                  inline
                />
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
        <Card title="Something wrong?">
          <p className="mb-4 text-sm text-muted">
            Tell Operations in confidence. Only Operations reads what you write here; if they ask your Protector about it,
            they do so in their own words.
          </p>
          {myComplaints.length > 0 && (
            <ul className="mb-4 space-y-1 text-sm">
              {myComplaints.map((c) => (
                <li key={c.id}>
                  {complaintCategoryLabel(c.category)} — <strong>{c.status}</strong>
                </li>
              ))}
            </ul>
          )}
          <ActionForm action={fileComplaintAction} submitLabel="Send to Operations" variant="secondary" hidden={{ bookingId: booking.id }}>
            <Field label="What is it about?">
              <Select name="category" options={COMPLAINT_CATEGORIES} />
            </Field>
            <Field label="What happened">
              <TextArea name="body" maxLength={COMPLAINT_TEXT_MAX} required />
            </Field>
          </ActionForm>
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
