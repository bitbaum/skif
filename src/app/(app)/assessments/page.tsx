import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList } from "@/components/booking";
import { CheckboxGroup, Field, TextInput } from "@/components/fields";
import { Badge, Card, formatWhen, PageHeader } from "@/components/ui";
import { ASSESSMENT_LIMITS, CONCERNS, MEASURES } from "@/config/assessment";
import { getDb } from "@/db/client";
import { listAssessments } from "@/server/assessments";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { createAssessmentAction } from "./actions";

export const metadata: Metadata = { title: "Safety assessment" };

export default async function AssessmentsPage() {
  const viewer = await requireViewer();
  const db = getDb();
  const prefs = await getPreferences(db, viewer.sub);
  if (!prefs) redirect("/preferences?next=/assessments");
  const past = await listAssessments(db, viewer.sub);

  return (
    <>
      <PageHeader
        title="Safety assessment"
        lead="Tell us what worries you about a place and what you already do. You get the most proportionate plan within your limits — and if the answer is to buy nothing, we say so."
      />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <ActionForm action={createAssessmentAction} submitLabel="Build my Safety Plan">
            <Field label="Which place?">
              <TextInput name="placeName" placeholder="My flat" maxLength={ASSESSMENT_LIMITS.placeNameMax} required />
            </Field>
            <CheckboxGroup
              legend="What worries you?"
              hint="Tick none if nothing does — that's a valid answer."
              name="concerns"
              options={CONCERNS}
              selected={[]}
            />
            <CheckboxGroup legend="What do you already have or do?" name="measures" options={MEASURES} selected={[]} />
          </ActionForm>
        </Card>
        <div className="space-y-6">
          <Card title="Your hard limits">
            <ConstraintList constraints={prefs.hardConstraints} />
            <p className="mt-3 text-sm">
              <Link href="/preferences?next=/assessments" className="text-accent underline">
                Change
              </Link>
            </p>
          </Card>
          <Card title="Past plans">
            {past.length === 0 ? (
              <p className="text-sm text-muted">None yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {past.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-2">
                    <Link href={`/assessments/${a.id}`} className="text-accent underline">
                      {a.placeName}
                    </Link>
                    <span className="text-muted">{formatWhen(a.createdAt)}</span>
                    {a.plan.nothingToBuy && <Badge tone="accent">Nothing to buy</Badge>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
