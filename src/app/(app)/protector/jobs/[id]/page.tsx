import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList, ReasonList, RequirementList, languagesText, presenceText, ReportList, StatusBadge } from "@/components/booking";
import { CheckboxGroup, Field, RadioGroup, Select, TextArea } from "@/components/fields";
import { INCIDENT_SEVERITIES, OBSERVATIONS } from "@/config/reports";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { BOOKING_LIMITS, serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions, protectorHasAccepted, type BookingAction } from "@/domain/lifecycle";
import { getJobForProtector } from "@/server/bookings";
import { requireApprovedProtector } from "@/server/viewer";
import { BookingThread } from "@/components/booking-thread";
import { findBookingFor, openThreadFor } from "@/server/booking-thread";
import { protectorJobAction, reportAction } from "../../actions";

export const metadata: Metadata = { title: "Job" };

const ACTION_BUTTONS: Partial<Record<BookingAction, { label: string; variant: "primary" | "secondary" | "danger" }>> = {
  ACCEPT: { label: "Accept job", variant: "primary" },
  DECLINE: { label: "Decline", variant: "danger" },
  CHECK_IN: { label: "Check in — I've arrived", variant: "primary" },
  START: { label: "Start — I'm with them", variant: "primary" },
  COMPLETE: { label: "Complete", variant: "primary" },
};

const REPORT_KINDS = [
  { key: "REPORT", label: "Report", description: "How the job went." },
  { key: "INCIDENT", label: "Incident", description: "Something happened that Operations must know about." },
];

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireApprovedProtector();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const db = getDb();
  const job = await getJobForProtector(db, viewer.protector.id, id.data);
  const booking = await findBookingFor(db, id.data);
  const thread = booking ? await openThreadFor(db, booking, viewer, "PROTECTOR") : null;
  if (!job) {
    // Taken off this job: nothing of it remains theirs but the part of the
    // thread they already saw (threadkit's leftAt).
    if (!booking || !thread) notFound();
    return (
      <>
        <PageHeader title={serviceLabel(booking.service)} lead={formatWhen(booking.startsAt)} />
        <BookingThread bookingId={booking.id} seat="PROTECTOR" view={thread} />
      </>
    );
  }
  const actions = availableActions(job.status, "PROTECTOR");
  const accepted = protectorHasAccepted(job.status);

  return (
    <>
      <PageHeader title={serviceLabel(job.service)} lead={`${formatWhen(job.startsAt)} · ${job.hours}h · ${job.area}`}>
        <StatusBadge status={job.status} />
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="What the job needs">
          <DefinitionList
            items={[
              ["Name to use", accepted ? (job.customerName ?? "Not given") : "Shown once you accept"],
              ["Meeting point", job.meetingPoint ?? "Shown once you accept"],
              ["Notes", job.notes ?? "Shown once you accept"],
              ["Presence", presenceText(job.presenceStyle)],
              ["Languages", languagesText(job.languages)],
              ["Requirements", <RequirementList key="r" service={job.service} extra={job.requiredCapabilities} />],
              ["Their hard limits", <ConstraintList key="c" constraints={job.hardConstraints} />],
            ]}
          />
          {job.hardConstraints.includes("NO_AUTO_POLICE_SHARING") && (
            <p className="mt-4 rounded-lg bg-warn-soft p-3 text-sm text-warn">
              They&apos;ve asked that nothing goes to the police without their decision. Ask them first — except in an emergency.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            {actions.map((a) => {
              const button = ACTION_BUTTONS[a];
              return button ? (
                <ActionForm
                  key={a}
                  action={protectorJobAction}
                  submitLabel={button.label}
                  variant={button.variant}
                  hidden={{ bookingId: job.id, action: a }}
                  className=""
                />
              ) : null;
            })}
          </div>
        </Card>
        {thread && <BookingThread bookingId={job.id} seat="PROTECTOR" view={thread} className="md:col-span-2" />}
        {job.whyMatched.length > 0 && (
          <Card title="Why you were matched">
            <ReasonList reasons={job.whyMatched} />
          </Card>
        )}
        <Card title="Reports">
          <ReportList reports={job.reports} />
          {accepted && (
            <div className="mt-5 border-t border-line pt-5">
              <ActionForm action={reportAction} submitLabel="File" hidden={{ bookingId: job.id }}>
                <RadioGroup legend="Type" name="kind" options={REPORT_KINDS} selected="REPORT" />
                <CheckboxGroup
                  legend="What happened? Tick all that apply"
                  name="observations"
                  options={OBSERVATIONS}
                  selected={[]}
                  inline
                />
                <Field label="Severity" hint="Incidents only.">
                  <Select name="severity" options={[{ key: "", label: "—" }, ...INCIDENT_SEVERITIES]} />
                </Field>
                <Field label="In your words">
                  <TextArea name="summary" maxLength={BOOKING_LIMITS.notesMax} required />
                </Field>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="policeInvolved" className="accent-accent" />
                  The police were involved
                </label>
              </ActionForm>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
