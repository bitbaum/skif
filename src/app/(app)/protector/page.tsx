import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { StatusBadge } from "@/components/booking";
import { AvailabilityFields } from "@/components/availability-fields";
import { ProtectorApplication } from "@/components/protector-application";
import { Badge, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
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
      {protector?.status === "APPROVED" && (
        <Card title="Your jobs" className="mb-6">
          {jobs.length === 0 ? (
            <Empty>No jobs assigned yet.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {jobs.map((j) => (
                <li key={j.id}>
                  <Link href={`/protector/jobs/${j.id}`} className="flex flex-wrap items-center gap-3 py-3 hover:bg-bg">
                    <span className="font-medium">{serviceLabel(j.service)}</span>
                    <span className="text-sm text-muted">
                      {formatWhen(j.startsAt)} · {j.area}
                    </span>
                    <span className="ml-auto">
                      <StatusBadge status={j.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
      {asked.length > 0 && (
        <Card title="Questions from Operations" className="mb-6">
          <ul className="space-y-5">
            {asked.map((c) => (
              <li key={c.id} className="space-y-2 text-sm">
                <p className="flex flex-wrap items-center gap-2">
                  <strong>{complaintCategoryLabel(c.category)}</strong>
                  <Badge tone={c.status === "UPHELD" ? "danger" : "warn"}>{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                  <Link href={`/protector/jobs/${c.bookingId}`} className="text-accent underline">
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
      )}
      {protector && (
        <Card title="Availability" className="mb-6">
          <ActionForm action={availabilityAction} submitLabel="Save availability">
            <AvailabilityFields windows={windows} />
          </ActionForm>
        </Card>
      )}
      <Card title={protector ? "Profile" : "Application"}>
        <ProtectorApplication
          action={applyAction}
          submitLabel={protector ? "Save profile" : "Apply"}
          initial={applicationValues(protector, held)}
          held={held}
          aiConfigured={aiStatus() === "configured"}
        />
      </Card>
    </>
  );
}
