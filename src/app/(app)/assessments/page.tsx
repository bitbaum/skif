import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList } from "@/components/booking";
import { Field, Select, TextInput, toOptions } from "@/components/fields";
import { VerdictBadge } from "@/components/safety-plan";
import { buttonClass, ButtonLink, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { ENVIRONMENT_LIMITS, environmentTypeLabel, PLACE_TYPES } from "@/config/environments";
import { HARM_FAMILIES } from "@/config/harm-families";
import { AREAS } from "@/config/services";
import { getDb } from "@/db/client";
import { readPlan } from "@/domain/plan-versions";
import { listAssessments } from "@/server/assessments";
import { listEnvironments } from "@/server/environments";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { assessLifeAction, createEnvironmentAction } from "./actions";

export const metadata: Metadata = { title: "Safety assessment" };

const AREA_OPTIONS = [{ key: "", label: "Prefer not to say" }, ...toOptions(AREAS)];

export default async function AssessmentsPage() {
  const viewer = await requireViewer();
  const db = getDb();
  const prefs = await getPreferences(db, viewer.sub);
  if (!prefs) redirect("/preferences?next=/assessments");
  const [past, environments] = await Promise.all([listAssessments(db, viewer.sub), listEnvironments(db, viewer.sub)]);
  const places = environments.filter((e) => e.type !== "PERSON");

  return (
    <>
      <PageHeader
        title="Safety assessment"
        lead="Tell us what matters to you and what worries you, and what you already do. You get the most proportionate plan within your limits and budget — and if the answer is to buy nothing, we say so."
      />
      <Card title="Your life as a whole" className="mb-6">
        <p className="text-sm">
          Start here. Safety is more than locks and doors: we look at every part of your life, and never ask you to list
          who might attack you.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted" aria-label="What we look at">
          {HARM_FAMILIES.map((f) => (
            <li key={f.key} className="rounded-full border border-line px-3 py-1" title={f.description}>
              {f.label}
            </li>
          ))}
        </ul>
        <form action={assessLifeAction} className="mt-4">
          <button type="submit" className={buttonClass.primary}>
            What matters to you, and what are you worried about?
          </button>
        </form>
      </Card>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card title="Your places">
            {places.length === 0 ? (
              <Empty>Add a home, venue, route or occasion to assess it on its own.</Empty>
            ) : (
              <ul className="divide-y divide-line">
                {places.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted">
                      {environmentTypeLabel(p.type)}
                      {p.area ? ` · ${p.area}` : ""}
                    </span>
                    <span className="ml-auto">
                      <ButtonLink href={`/assessments/new?place=${p.id}`} variant="secondary">
                        Assess
                      </ButtonLink>
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
                    <VerdictBadge plan={readPlan(a.plan)} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Add a place">
            <ActionForm action={createEnvironmentAction} submitLabel="Add and assess" variant="secondary" className="space-y-3">
              <Field label="Name">
                <TextInput name="name" placeholder="My flat" maxLength={ENVIRONMENT_LIMITS.nameMax} required />
              </Field>
              <Field label="What is it?">
                <Select name="type" options={PLACE_TYPES} />
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
        </div>
      </div>
    </>
  );
}
