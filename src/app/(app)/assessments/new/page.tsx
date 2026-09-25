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
  raisingFor,
  THREATS,
} from "@/config/assessment";
import { environmentTypeLabel } from "@/config/environments";
import { HARM_FAMILIES } from "@/config/harm-families";
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
  const life = environment.type === "PERSON";
  const concerns = concernsFor(environment.type);
  const families = HARM_FAMILIES.map((f) => ({ ...f, concerns: concerns.filter((c) => c.family === f.key) })).filter(
    (f) => f.concerns.length > 0,
  );

  return (
    <>
      <PageHeader
        title={life ? "What matters to you, and what are you worried about?" : `Assess: ${environment.name}`}
        lead={`${life ? "Your whole life, not only where you live" : environmentTypeLabel(environment.type)}. Answer what you like — every question can be left empty, and "nothing" is a fine answer.`}
      />
      <Card>
        <ActionForm action={createAssessmentAction} submitLabel="Build my Safety Plan" hidden={{ environmentId: environment.id }}>
          <CheckboxGroup legend="Who or what are you protecting?" name="protecting" options={PROTECTED} selected={[]} inline />
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">What worries you?</legend>
            <p className="text-xs text-muted">Tick none if nothing does.</p>
            {families.map((f) => (
              <CheckboxGroup key={f.key} legend={f.label} hint={f.description} name="concerns" options={f.concerns} selected={[]} />
            ))}
          </fieldset>
          <CheckboxGroup
            legend="Does any of this apply?"
            hint="Routines and exposure can make some things more likely, whether or not they worry you."
            name="exposures"
            options={raisingFor(EXPOSURES, environment.type)}
            selected={[]}
          />
          <CheckboxGroup
            legend="Is there a known threat?"
            hint="This makes the related steps a high priority. If you are in danger now, call 117 (police) or 144 (ambulance) — Skif is not an emergency service."
            name="threats"
            options={raisingFor(THREATS, environment.type)}
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
