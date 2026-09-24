import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList } from "@/components/booking";
import { CheckboxGroup, Field, Select, TextInput, toOptions } from "@/components/fields";
import { Badge, Card, formatWhen, PageHeader } from "@/components/ui";
import { CONCERNS, MEASURES } from "@/config/assessment";
import { ENVIRONMENT_LIMITS, ENVIRONMENT_TYPES, environmentTypeLabel } from "@/config/environments";
import { AREAS } from "@/config/services";
import { listEnvironments } from "@/server/environments";
import { getDb } from "@/db/client";
import { listAssessments } from "@/server/assessments";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { createAssessmentAction, createEnvironmentAction } from "./actions";

export const metadata: Metadata = { title: "Safety assessment" };

const AREA_OPTIONS = [{ key: "", label: "Prefer not to say" }, ...toOptions(AREAS)];

export default async function AssessmentsPage({ searchParams }: { searchParams: Promise<{ place?: string }> }) {
  const viewer = await requireViewer();
  const db = getDb();
  const prefs = await getPreferences(db, viewer.sub);
  if (!prefs) redirect("/preferences?next=/assessments");
  const [past, places] = await Promise.all([listAssessments(db, viewer.sub), listEnvironments(db, viewer.sub)]);
  const { place } = await searchParams;
  const placeOptions = places.map((p) => ({ key: p.id, label: `${p.name} (${environmentTypeLabel(p.type)})` }));

  return (
    <>
      <PageHeader
        title="Safety assessment"
        lead="Tell us what worries you about a place and what you already do. You get the most proportionate plan within your limits — and if the answer is to buy nothing, we say so."
      />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          {places.length === 0 ? (
            <p className="text-sm text-muted">Add the place or situation you want to assess first.</p>
          ) : (
            <ActionForm action={createAssessmentAction} submitLabel="Build my Safety Plan">
              <Field label="Which place?">
                <Select
                  name="environmentId"
                  options={placeOptions}
                  defaultValue={places.some((p) => p.id === place) ? place : places[0]?.id}
                />
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
          )}
        </Card>
        <div className="space-y-6">
          <Card title="Your places">
            {places.length > 0 && (
              <ul className="mb-4 space-y-1 text-sm">
                {places.map((p) => (
                  <li key={p.id}>
                    {p.name} <span className="text-muted">· {environmentTypeLabel(p.type)}{p.area ? ` · ${p.area}` : ""}</span>
                  </li>
                ))}
              </ul>
            )}
            <ActionForm action={createEnvironmentAction} submitLabel="Add place" variant="secondary" className="space-y-3">
              <Field label="Name">
                <TextInput name="name" placeholder="My flat" maxLength={ENVIRONMENT_LIMITS.nameMax} required />
              </Field>
              <Field label="What is it?">
                <Select name="type" options={ENVIRONMENT_TYPES} />
              </Field>
              <Field label="Area" hint="A district at most — never an address.">
                <Select name="area" options={AREA_OPTIONS} />
              </Field>
            </ActionForm>
          </Card>
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
                      {a.environment.name}
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
