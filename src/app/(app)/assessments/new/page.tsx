import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { CheckboxGroup, Field, RadioGroup, TextInput } from "@/components/fields";
import { Card, PageHeader } from "@/components/ui";
import {
  ASSESSMENT_LIMITS,
  COST_TIERS,
  concernsFor,
  EXPOSURES,
  measuresFor,
  PROTECTED,
  THREATS,
} from "@/config/assessment";
import { environmentTypeLabel } from "@/config/environments";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { getEnvironment } from "@/server/environments";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { createAssessmentAction } from "../actions";

export const metadata: Metadata = { title: "Assess a place" };

const BUDGET_OPTIONS = COST_TIERS.map((c) => ({ key: c.key, label: c.budget }));

export default async function NewAssessmentPage({ searchParams }: { searchParams: Promise<{ place?: string }> }) {
  const viewer = await requireViewer();
  const db = getDb();
  if (!(await getPreferences(db, viewer.sub))) redirect("/preferences?next=/assessments");
  const place = idInput.safeParse((await searchParams).place);
  if (!place.success) notFound();
  const environment = await getEnvironment(db, viewer.sub, place.data);
  if (!environment) notFound();

  return (
    <>
      <PageHeader
        title={`Assess: ${environment.name}`}
        lead={`${environmentTypeLabel(environment.type)}. Answer what you like — every question can be left empty, and "nothing" is a fine answer.`}
      />
      <Card>
        <ActionForm action={createAssessmentAction} submitLabel="Build my Safety Plan" hidden={{ environmentId: environment.id }}>
          <CheckboxGroup legend="Who or what are you protecting?" name="protecting" options={PROTECTED} selected={[]} inline />
          <CheckboxGroup
            legend="What worries you?"
            hint="Tick none if nothing does."
            name="concerns"
            options={concernsFor(environment.type)}
            selected={[]}
          />
          <CheckboxGroup
            legend="Does any of this apply?"
            hint="Routines and exposure can make some things more likely, whether or not they worry you."
            name="exposures"
            options={EXPOSURES}
            selected={[]}
          />
          <CheckboxGroup
            legend="Is there a known threat?"
            hint="This makes the related steps a high priority. If you are in danger now, call 117 (police) or 144 (ambulance) — Skif is not an emergency service."
            name="threats"
            options={THREATS}
            selected={[]}
          />
          <CheckboxGroup
            legend="What do you already have or do?"
            name="measures"
            options={measuresFor(environment.type)}
            selected={[]}
          />
          <RadioGroup legend="What would you spend?" name="budget" options={BUDGET_OPTIONS} selected="FREE" />
          <Field label="Anything coming up? (optional)" hint="A trip, an event, a public appearance — in a few words.">
            <TextInput name="upcoming" maxLength={ASSESSMENT_LIMITS.upcomingMax} />
          </Field>
        </ActionForm>
      </Card>
    </>
  );
}
