import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { availabilityLine, AvailabilityFields } from "@/components/availability-fields";
import { BookingSections } from "@/components/booking-list";
import { ProtectorApplication } from "@/components/protector-application";
import { Badge, Card, Empty, FoldCard, PageHeader } from "@/components/ui";
import { getDb } from "@/db/client";
import { listAvailability } from "@/server/availability";
import { PROTECTOR_STATUS_LABELS } from "@/domain/protector-status";
import { applicationValues } from "@/domain/protector-form";
import { aiStatus } from "@/server/ai";
import { listProtectorJobs } from "@/server/bookings";
import { listCapabilities, type Protector } from "@/server/protectors";
import { requireViewer } from "@/server/viewer";
import { applyAction, availabilityAction, protectorComplaintAction } from "./actions";
import { ComplaintActions } from "@/components/complaints";
import { complaintCategoryLabel } from "@/config/complaints";
import { complaintActions, STATUS_LABELS as COMPLAINT_STATUS_LABELS } from "@/domain/complaints";
import { listComplaintsForProtector } from "@/server/complaints";

export const metadata: Metadata = { title: "Protector" };

const STATUS_NOTE: Record<Protector["status"], string> = {
  APPLIED: "Your application is with Operations. You'll see jobs here once you're approved.",
  APPROVED: "You're approved. Jobs Operations assigns to you appear below.",
  SUSPENDED: "Your profile is paused. Contact Operations.",
  REJECTED: "Operations did not accept your application. You can update it and it will be reviewed again.",
};

export default async function ProtectorPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const viewer = await requireViewer();
  const { protector } = viewer;
  const { saved } = await searchParams;
  const db = getDb();
  const jobs = protector?.status === "APPROVED" ? await listProtectorJobs(db, protector.id) : [];
  const held = protector ? await listCapabilities(db, protector.id) : [];
  const windows = protector ? await listAvailability(db, protector.id) : [];
  const asked = protector?.status === "APPROVED" ? await listComplaintsForProtector(db, protector.id) : [];
  // A question waiting on the Protector's answer is the first thing to do.
  const awaitingYou = asked.some((c) => complaintActions(c.status, "PROTECTOR").length > 0);
  const questions =
    asked.length > 0 ? (
      <Card title="Questions from Operations" className="mb-6">
        <ul className="space-y-5">
          {asked.map((c) => (
            <li key={c.id} className="space-y-2 text-sm">
              <p className="flex flex-wrap items-center gap-2">
                <strong>{complaintCategoryLabel(c.category)}</strong>
                <Badge tone={c.status === "UPHELD" ? "danger" : "warn"}>{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                <Link href={`/protector/jobs/${c.bookingId}`} className="inline-flex min-h-11 items-center text-accent underline">
                  The job
                </Link>
              </p>
              <p className="whitespace-pre-wrap">{c.summaryForProtector}</p>
              {c.protectorResponse && <p className="text-muted">Your response: {c.protectorResponse}</p>}
              {c.appeal && <p className="text-muted">Your appeal: {c.appeal}</p>}
              <ComplaintActions
                complaintId={c.id}
                actions={complaintActions(c.status, "PROTECTOR")}
                action={protectorComplaintAction}
              />
            </li>
          ))}
        </ul>
      </Card>
    ) : null;
  const needsAvailability = windows.length === 0 && (protector?.status === "APPLIED" || protector?.status === "APPROVED");
  const application = (
    <ProtectorApplication
      action={applyAction}
      submitLabel={protector ? "Save profile" : "Send application"}
      initial={applicationValues(protector, held)}
      held={held}
      aiConfigured={aiStatus() === "configured"}
    />
  );

  return (
    <>
      <PageHeader
        title={protector ? "Your Protector profile" : "Become a Protector"}
        lead="Skif Protectors are chosen for judgment and calm, not intimidation."
      >
        {protector && (
          <Badge tone={protector.status === "APPROVED" ? "accent" : "warn"}>{PROTECTOR_STATUS_LABELS[protector.status]}</Badge>
        )}
      </PageHeader>
      {saved && <p className="mb-4 rounded-lg bg-accent-soft p-3 text-sm text-accent">Saved.</p>}
      {protector && <p className="mb-6 text-muted">{STATUS_NOTE[protector.status]}</p>}
      {needsAvailability && (
        <div className="mb-6 rounded-lg border border-warn bg-warn-soft px-3 pt-3 text-sm text-warn">
          <p>Operations can only match you to jobs in hours you&apos;re available.</p>
          <a href="#availability" className="inline-flex min-h-11 items-center font-medium underline">
            Set your availability
          </a>
        </div>
      )}
      {awaitingYou && questions}
      {protector?.status === "APPROVED" && (
        <Card title="Your jobs" className="mb-6">
          {jobs.length === 0 ? (
            <Empty>No jobs assigned yet.</Empty>
          ) : (
            <BookingSections bookings={jobs} href={(id) => `/protector/jobs/${id}`} heading="h3" />
          )}
        </Card>
      )}
      {!awaitingYou && questions}
      {protector && (
        <FoldCard
          title="Availability"
          action="Change"
          preview={availabilityLine(windows)}
          open={windows.length === 0}
          id="availability"
          className="mb-6 scroll-mt-4"
        >
          <ActionForm action={availabilityAction} submitLabel="Save availability">
            <AvailabilityFields windows={windows} />
          </ActionForm>
        </FoldCard>
      )}
      {protector ? (
        // Open only when a rejection makes changing it the next step.
        <FoldCard title="Your profile" action="Edit" open={protector.status === "REJECTED"}>
          {application}
        </FoldCard>
      ) : (
        <Card title="Application">{application}</Card>
      )}
    </>
  );
}
