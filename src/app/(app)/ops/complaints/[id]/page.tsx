import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComplaintActions } from "@/components/complaints";
import { Badge, Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { complaintCategoryLabel } from "@/config/complaints";
import { getDb } from "@/db/client";
import { complaintActions, STATUS_LABELS } from "@/domain/complaints";
import { idInput } from "@/domain/inputs";
import { getComplaint } from "@/server/complaints";
import { audit } from "@/server/audit";
import { requireOps } from "@/server/viewer";
import { opsComplaintAction } from "../../actions";

export const metadata: Metadata = { title: "Complaint · Operations" };

export default async function OpsComplaintPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireOps();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const complaint = await getComplaint(getDb(), id.data);
  if (!complaint) notFound();
  await audit(getDb(), viewer.sub, "VIEW_COMPLAINT", { type: "COMPLAINT", id: id.data });

  return (
    <>
      <PageHeader title={complaintCategoryLabel(complaint.category)} lead={`Received ${formatWhen(complaint.createdAt)}`}>
        <Badge tone="warn">{STATUS_LABELS[complaint.status]}</Badge>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="What the customer wrote (Operations only)">
          <p className="whitespace-pre-wrap text-sm">{complaint.body}</p>
          <p className="mt-4 text-sm">
            <Link href={`/ops/bookings/${complaint.bookingId}`} className="text-accent underline">
              The booking
            </Link>
            {complaint.protectorId && (
              <>
                {" · "}
                <Link href={`/ops/protectors/${complaint.protectorId}`} className="text-accent underline">
                  The Protector
                </Link>
              </>
            )}
          </p>
        </Card>
        <Card title="Review">
          <DefinitionList
            items={[
              ["Shown to Protector", complaint.summaryForProtector ?? "Nothing yet"],
              ["Protector's response", complaint.protectorResponse ?? "—"],
              ["Appeal", complaint.appeal ?? "—"],
              ["Decision note", complaint.decisionNote ?? "—"],
              ["Decided", complaint.decidedAt ? formatWhen(complaint.decidedAt) : "—"],
            ]}
          />
          <p className="my-4 text-xs text-muted">
            A complaint never changes a Protector&apos;s ranking by itself. Decide on the facts; suspend from the
            Protector&apos;s page if needed.
          </p>
          <ComplaintActions
            complaintId={complaint.id}
            actions={complaintActions(complaint.status, "OPS").filter((a) => a !== "ASK_PROTECTOR" || complaint.protectorId)}
            action={opsComplaintAction}
          />
        </Card>
      </div>
    </>
  );
}
