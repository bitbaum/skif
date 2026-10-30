import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { Field, RadioGroup, TextArea, TextInput } from "@/components/fields";
import { Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { CASE_KINDS, CASE_LIMITS, caseKindLabel } from "@/config/cases";
import { getDb } from "@/db/client";
import { caseProgress } from "@/domain/cases";
import { listCaseFiles } from "@/server/cases";
import { requireViewer } from "@/server/viewer";
import { createCaseAction } from "./actions";

export const metadata: Metadata = { title: "Case files" };

export default async function CasesPage() {
  const viewer = await requireViewer();
  const cases = await listCaseFiles(getDb(), viewer.sub);

  return (
    <>
      <PageHeader
        title="Case files"
        lead="For when a scam has already happened. Write down what happened while it is fresh, keep what the scammers left behind, tick off the steps that limit the damage, and print one clear account for the bank and the police. Only you can see a case file."
      />
      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <Card title="Start a case file">
          <p className="mb-4 text-sm text-fg-secondary">
            If money is leaving your account right now, call your bank on the
            number on your card first. This can wait ten minutes; that call
            cannot.
          </p>
          <ActionForm
            action={createCaseAction}
            submitLabel="Start the case file"
            className="space-y-4"
          >
            <RadioGroup
              legend="What happened?"
              name="kind"
              options={CASE_KINDS.map((k) => ({
                key: k.key,
                label: k.label,
                description: k.hint,
              }))}
              selected="REMOTE_ACCESS"
              describeChosen
            />
            <Field
              label="A short name"
              hint="Only for you, to tell case files apart."
            >
              <TextInput
                name="title"
                placeholder="Fake PostFinance call"
                maxLength={CASE_LIMITS.titleMax}
                required
              />
            </Field>
            <Field label="When did it happen?">
              <TextInput name="happenedOn" type="date" />
            </Field>
            <Field
              label="In your own words"
              hint="You can add to it later. Who contacted you, what they said, what you did."
            >
              <TextArea
                name="summary"
                maxLength={CASE_LIMITS.summaryMax}
                rows={5}
              />
            </Field>
          </ActionForm>
        </Card>
        <Card title="Your case files">
          {cases.length === 0 ? (
            <Empty>None yet.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {cases.map((c) => {
                const p = caseProgress(c.kind, c.stepsDone);
                return (
                  <li key={c.id} className="py-3 text-sm">
                    <Link
                      href={`/cases/${c.id}`}
                      className="flex min-h-11 items-center font-medium text-accent underline"
                    >
                      {c.title}
                    </Link>
                    <span className="block text-muted">
                      {caseKindLabel(c.kind)} · {formatWhen(c.createdAt)} ·{" "}
                      {p.done} of {p.total} steps done
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
