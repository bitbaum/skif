import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { IndicatorList, StepList, TimelineList } from "@/components/case-file";
import { Field, Select, TextArea, TextInput } from "@/components/fields";
import {
  buttonClass,
  ButtonLink,
  Card,
  FoldCard,
  PageHeader,
} from "@/components/ui";
import {
  CASE_KINDS,
  CASE_LIMITS,
  caseKindLabel,
  INDICATOR_KINDS,
} from "@/config/cases";
import { getDb } from "@/db/client";
import { caseProgress, showLocalDate } from "@/domain/cases";
import { idInput } from "@/domain/inputs";
import { getCaseFile } from "@/server/cases";
import { requireViewer } from "@/server/viewer";
import {
  addIndicatorAction,
  addTimelineAction,
  deleteCaseAction,
  removeEntryAction,
  stepAction,
  updateCaseAction,
} from "../actions";

export const metadata: Metadata = { title: "Case file" };

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const c = await getCaseFile(getDb(), viewer.sub, id.data);
  if (!c) notFound();
  const progress = caseProgress(c.kind, c.stepsDone);
  const hidden = { caseId: c.id };

  const removeFrom = (list: "timeline" | "indicators") =>
    function RemoveEntry({
      entryId,
      label,
    }: {
      entryId: string;
      label: string;
    }) {
      return (
        <form action={removeEntryAction}>
          <input type="hidden" name="caseId" value={c.id} />
          <input type="hidden" name="list" value={list} />
          <input type="hidden" name="entryId" value={entryId} />
          <button type="submit" aria-label={label} className={buttonClass.link}>
            Remove
          </button>
        </form>
      );
    };

  return (
    <>
      <PageHeader
        title={c.title}
        lead={[
          caseKindLabel(c.kind),
          c.happenedOn && showLocalDate(c.happenedOn),
          `${progress.done} of ${progress.total} steps done`,
        ]
          .filter(Boolean)
          .join(" · ")}
      >
        <ButtonLink href={`/cases/${c.id}/report`}>
          Report for the police
        </ButtonLink>
      </PageHeader>

      {progress.next && (
        <Card className="mb-6 border-accent">
          <p className="text-sm font-semibold">Next: {progress.next.text}</p>
          <p className="mt-1 text-sm text-fg-secondary">
            {progress.next.detail}
          </p>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
        <div className="space-y-6">
          <Card title="Timeline">
            <TimelineList
              entries={c.timeline}
              remove={removeFrom("timeline")}
            />
            <ActionForm
              action={addTimelineAction}
              hidden={hidden}
              submitLabel="Add to the timeline"
              variant="secondary"
              className="mt-4 space-y-3 border-t border-line pt-4"
            >
              <Field
                label="When"
                hint="Your call log, chat and bank statement have the exact times."
              >
                <TextInput name="at" type="datetime-local" required />
              </Field>
              <Field label="What happened">
                <TextArea
                  name="what"
                  rows={2}
                  maxLength={CASE_LIMITS.whatMax}
                  placeholder="They called from +41 77 … and said they were from PostFinance."
                  required
                />
              </Field>
            </ActionForm>
          </Card>

          <Card title="What the scammers left behind">
            <p className="mb-3 text-sm text-fg-secondary">
              Numbers, names, accounts and IDs, written exactly as you saw them.
              This is what the police can trace.
            </p>
            <IndicatorList
              items={c.indicators}
              remove={removeFrom("indicators")}
            />
            <ActionForm
              action={addIndicatorAction}
              hidden={hidden}
              submitLabel="Add the detail"
              variant="secondary"
              className="mt-4 space-y-3 border-t border-line pt-4"
            >
              <Field label="Kind">
                <Select
                  name="kind"
                  options={INDICATOR_KINDS.map((k) => ({
                    key: k.key,
                    label: k.label,
                  }))}
                />
              </Field>
              <Field
                label="Detail"
                hint="Copy it letter for letter: +41 77 977 81 81, not “a Swiss mobile number”."
              >
                <TextInput
                  name="value"
                  maxLength={CASE_LIMITS.valueMax}
                  required
                />
              </Field>
              <Field label="Note" hint="Optional: where you found it.">
                <TextInput
                  name="note"
                  maxLength={CASE_LIMITS.noteMax}
                  placeholder="In connection_trace.txt"
                />
              </Field>
            </ActionForm>
          </Card>

          <FoldCard
            title="About this case"
            action="Edit"
            preview={
              c.policeReference
                ? `Police case number ${c.policeReference}`
                : "Add the police case number once you have it."
            }
          >
            <ActionForm
              action={updateCaseAction}
              hidden={hidden}
              submitLabel="Save"
              variant="secondary"
              className="space-y-3"
            >
              <Field label="What happened?">
                <Select
                  name="kind"
                  defaultValue={c.kind}
                  options={CASE_KINDS.map((k) => ({
                    key: k.key,
                    label: k.label,
                  }))}
                />
              </Field>
              <Field label="A short name">
                <TextInput
                  name="title"
                  defaultValue={c.title}
                  maxLength={CASE_LIMITS.titleMax}
                  required
                />
              </Field>
              <Field label="When did it happen?">
                <TextInput
                  name="happenedOn"
                  type="date"
                  defaultValue={c.happenedOn}
                />
              </Field>
              <Field label="Police case number">
                <TextInput
                  name="policeReference"
                  defaultValue={c.policeReference}
                  maxLength={CASE_LIMITS.referenceMax}
                />
              </Field>
              <Field label="In your own words">
                <TextArea
                  name="summary"
                  defaultValue={c.summary}
                  rows={6}
                  maxLength={CASE_LIMITS.summaryMax}
                />
              </Field>
            </ActionForm>
          </FoldCard>
        </div>

        <div className="space-y-6">
          <Card title="Limit the damage">
            <StepList
              kind={c.kind}
              done={c.stepsDone}
              control={(step, isDone) => (
                <form action={stepAction}>
                  <input type="hidden" name="caseId" value={c.id} />
                  <input type="hidden" name="step" value={step.key} />
                  <input type="hidden" name="done" value={isDone ? "0" : "1"} />
                  <button
                    type="submit"
                    aria-pressed={isDone}
                    aria-label={
                      isDone
                        ? `Mark “${step.text}” as not done`
                        : `Mark “${step.text}” as done`
                    }
                    className={`flex size-11 shrink-0 items-center justify-center rounded-lg border text-base ${isDone ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface"}`}
                  >
                    {isDone ? "✓" : ""}
                  </button>
                </form>
              )}
            />
          </Card>

          <FoldCard title="Delete this case file" action="Delete">
            <form action={deleteCaseAction} className="space-y-3">
              <input type="hidden" name="caseId" value={c.id} />
              <Field
                label="Type DELETE to confirm"
                hint="It is gone for good: print or copy the report first if you still need it."
              >
                <TextInput
                  name="confirm"
                  autoComplete="off"
                  required
                  pattern="DELETE"
                />
              </Field>
              <button type="submit" className={buttonClass.danger}>
                Delete for good
              </button>
            </form>
          </FoldCard>
        </div>
      </div>
    </>
  );
}
