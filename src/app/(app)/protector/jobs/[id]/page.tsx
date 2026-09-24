import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList, languagesText, presenceText, ReportList, StatusBadge } from "@/components/booking";
import { Field, RadioGroup, TextArea } from "@/components/fields";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { BOOKING_LIMITS, serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { availableActions, protectorHasAccepted, type BookingAction } from "@/domain/lifecycle";
import { getJobForProtector } from "@/server/bookings";
import { requireApprovedProtector } from "@/server/viewer";
import { protectorJobAction, reportAction } from "../../actions";

export const metadata: Metadata = { title: "Job" };

const ACTION_BUTTONS: Partial<Record<BookingAction, { label: string; variant: "primary" | "secondary" | "danger" }>> = {
  ACCEPT: { label: "Accept job", variant: "primary" },
  DECLINE: { label: "Decline", variant: "danger" },
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
  const job = await getJobForProtector(getDb(), viewer.protector.id, id.data);
  if (!job) notFound();
  const actions = availableActions(job.status, "PROTECTOR");
  const canReport = protectorHasAccepted(job.status);

  return (
    <>
      <PageHeader title={serviceLabel(job.service)} lead={`${formatWhen(job.startsAt)} · ${job.hours}h · ${job.area}`}>
        <StatusBadge status={job.status} />
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="What the job needs">
          <DefinitionList
            items={[
              ["Meeting point", job.meetingPoint ?? "Shown once you accept"],
              ["Notes", job.notes ?? "Shown once you accept"],
              ["Presence", presenceText(job.presenceStyle)],
              ["Languages", languagesText(job.languages)],
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
        <Card title="Reports">
          <ReportList reports={job.reports} />
          {canReport && (
            <div className="mt-5 border-t border-line pt-5">
              <ActionForm action={reportAction} submitLabel="File" hidden={{ bookingId: job.id }}>
                <RadioGroup legend="Type" name="kind" options={REPORT_KINDS} selected="REPORT" />
                <Field label="What happened">
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
