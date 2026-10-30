import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndicatorList, StepList, TimelineList } from "@/components/case-file";
import { PrintButton } from "@/components/print-button";
import { ButtonLink, Card } from "@/components/ui";
import { caseKindLabel } from "@/config/cases";
import { DISPLAY_LOCALE, TIME_ZONE } from "@/config/locale";
import { getDb } from "@/db/client";
import { caseReportText, showLocalDate } from "@/domain/cases";
import { idInput } from "@/domain/inputs";
import { getCaseFile } from "@/server/cases";
import { requireViewer } from "@/server/viewer";

export const metadata: Metadata = { title: "Case report" };

/** The account a person hands over: printed (or saved as PDF from the print
 * dialog) for the police, or copied as text into the BACS or bank form. */
export default async function CaseReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const c = await getCaseFile(getDb(), viewer.sub, id.data);
  if (!c) notFound();
  const printedOn = new Intl.DateTimeFormat(DISPLAY_LOCALE, {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  }).format(new Date());
  const text = caseReportText(c, printedOn);

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <PrintButton label="Print or save as PDF" />
        <ButtonLink href={`/cases/${c.id}`} variant="secondary">
          Back to the case file
        </ButtonLink>
      </div>

      <header className="space-y-1">
        <p className="text-sm text-fg-tertiary">
          Case report · written down on {printedOn}
        </p>
        <h1 className="font-heading text-3xl font-semibold">{c.title}</h1>
        <p className="text-fg-secondary">
          {caseKindLabel(c.kind)}
          {c.happenedOn && ` · ${showLocalDate(c.happenedOn)}`}
          {c.policeReference && ` · Police case number ${c.policeReference}`}
        </p>
      </header>

      {c.summary && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">What happened</h2>
          <p className="whitespace-pre-line text-sm">{c.summary}</p>
        </section>
      )}

      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-semibold">Timeline</h2>
        <TimelineList entries={c.timeline} />
      </section>

      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-semibold">
          What the scammers left behind
        </h2>
        <IndicatorList items={c.indicators} />
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Steps taken</h2>
        <StepList kind={c.kind} done={c.stepsDone} />
      </section>

      <Card title="As text" className="print:hidden">
        <p className="mb-3 text-sm text-fg-secondary">
          The same report as plain text, to paste into the BACS or police form,
          or an email to your bank.
        </p>
        <textarea
          readOnly
          value={text}
          rows={14}
          aria-label="The report as text"
          className="w-full rounded-lg border border-line bg-surface p-3 font-mono text-sm"
        />
      </Card>
    </article>
  );
}
