import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { Field, TextArea } from "@/components/fields";
import {
  Badge,
  Card,
  DefinitionList,
  formatWhen,
  PageHeader,
} from "@/components/ui";
import {
  MAIL_KIND_LABELS,
  MAIL_REPLY_MAX,
  MAIL_RETENTION_DAYS,
  MAIL_URGENCY_LABELS,
} from "@/config/mail";
import { getDb } from "@/db/client";
import { audit } from "@/server/audit";
import { getMail, skifAddress } from "@/server/mail";
import { requireOps } from "@/server/viewer";
import { mailHandledAction, replyMailAction } from "../../actions";

export const metadata: Metadata = { title: "Message · Operations" };

export default async function OpsMailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const viewer = await requireOps();
  const id = decodeURIComponent((await params).id);
  const mail = await getMail(getDb(), id);
  if (!mail) notFound();
  await audit(getDb(), viewer.sub, "VIEW_MAIL", { type: "MAIL", id });
  const sender = mail.fromName
    ? `${mail.fromName} <${mail.fromAddress}>`
    : mail.fromAddress;

  return (
    <>
      <PageHeader
        title={mail.subject || "(no subject)"}
        lead={`From ${sender}, ${formatWhen(mail.receivedAt)}`}
      >
        <Link
          href="/ops#mail"
          className="inline-flex min-h-11 items-center text-sm text-accent underline"
        >
          All messages
        </Link>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="What they wrote (Operations only)">
          {mail.suspect && (
            <p className="mb-4 text-sm text-danger">
              The sender&apos;s address failed its authenticity checks: it may
              not be who it says. Do not act on links or payment details in it.
            </p>
          )}
          <p className="whitespace-pre-wrap break-words text-sm">
            {mail.body || "(empty)"}
          </p>
        </Card>
        <div className="space-y-6">
          <Card title="Sorted">
            <DefinitionList
              items={[
                ["Kind", MAIL_KIND_LABELS[mail.kind]],
                [
                  "Urgency",
                  <Badge
                    key="u"
                    tone={mail.urgency === "urgent" ? "danger" : "neutral"}
                  >
                    {MAIL_URGENCY_LABELS[mail.urgency]}
                  </Badge>,
                ],
                ["In short", mail.summary],
                ["Written in", mail.language.toUpperCase()],
                [
                  "Sorted by",
                  mail.triagedBy === "model"
                    ? "A model (check it)"
                    : "Simple rules: no model answered",
                ],
                [
                  "Answered",
                  mail.repliedAt ? formatWhen(mail.repliedAt) : "Not yet",
                ],
              ]}
            />
            <p className="mt-4 text-sm text-muted">
              Deleted {MAIL_RETENTION_DAYS} days after it arrived, answered or
              not.
            </p>
          </Card>
          <Card title="Answer">
            <ActionForm
              action={replyMailAction}
              submitLabel="Send the answer"
              hidden={{ mailId: mail.id }}
            >
              <Field
                label={`To ${mail.fromAddress}`}
                hint={`Sent from Skif; their reply comes back to ${skifAddress()} and lands here.`}
              >
                <TextArea
                  name="text"
                  rows={6}
                  maxLength={MAIL_REPLY_MAX}
                  required
                />
              </Field>
            </ActionForm>
            <div className="mt-4">
              <ActionForm
                action={mailHandledAction}
                submitLabel={
                  mail.handledAt
                    ? "Move back to open"
                    : "Done, no answer needed"
                }
                variant="secondary"
                hidden={{
                  mailId: mail.id,
                  handled: mail.handledAt ? "false" : "true",
                }}
                className=""
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
