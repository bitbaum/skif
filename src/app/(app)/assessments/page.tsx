import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList } from "@/components/booking";
import { Field, Select, TextInput, toOptions } from "@/components/fields";
import { StatusBadge } from "@/components/booking";
import { VerdictBadge } from "@/components/safety-plan";
import {
  buttonClass,
  ButtonLink,
  Card,
  Empty,
  formatWhen,
  PageHeader,
} from "@/components/ui";
import {
  ENVIRONMENT_LIMITS,
  environmentTypeLabel,
  PLACE_TYPES,
} from "@/config/environments";
import { FieldIcon } from "@/components/site/field-icon";
import { findIntervention } from "@/config/interventions";
import { HARM_FAMILIES } from "@/config/harm-families";
import { serviceLabel } from "@/config/services";
import { AREAS } from "@/config/services";
import { getDb } from "@/db/client";
import { nextForYou, type NextItem } from "@/domain/next-for-you";
import { readPlan } from "@/domain/plan-versions";
import { planSteps } from "@/domain/safety-plan";
import { listAssessments } from "@/server/assessments";
import { listCustomerBookings } from "@/server/bookings";
import { outcomesOf } from "@/server/step-outcomes";
import { listEnvironments } from "@/server/environments";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { assessLifeAction, createEnvironmentAction } from "./actions";

export const metadata: Metadata = { title: "Safety assessment" };

const AREA_OPTIONS = [
  { key: "", label: "Prefer not to say" },
  ...toOptions(AREAS),
];

export default async function AssessmentsPage() {
  const viewer = await requireViewer();
  const db = getDb();
  const prefs = await getPreferences(db, viewer.sub);
  if (!prefs) redirect("/preferences?next=/assessments");
  const [past, environments, outcomes, bookings] = await Promise.all([
    listAssessments(db, viewer.sub),
    listEnvironments(db, viewer.sub),
    outcomesOf(db, viewer.sub),
    listCustomerBookings(db, viewer.sub),
  ]);
  const places = environments.filter((e) => e.type !== "PERSON");
  const latest = past[0];
  const next = nextForYou({
    latestPlan: latest
      ? { assessmentId: latest.id, steps: planSteps(readPlan(latest.plan)) }
      : null,
    outcomes,
    bookings,
  });

  return (
    <>
      <PageHeader
        title="Safety assessment"
        lead="Tell us what matters to you and what worries you, and what you already do. You get the most proportionate plan within your limits and budget — and if the answer is to buy nothing, we say so."
      />
      {next.length > 0 && (
        <Card title="Next for you" className="mb-6">
          <ul className="divide-y divide-line">
            {next.map((item) => (
              <NextRow key={item.kind} item={item} />
            ))}
          </ul>
        </Card>
      )}
      <Card title="Your life as a whole" className="mb-6">
        <p className="text-sm">
          Start here. Safety is more than locks and doors: we look at every part
          of your life, and never ask you to list who might attack you.
        </p>
        <ul
          className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-fg-secondary sm:grid-cols-3 lg:grid-cols-5"
          aria-label="What we look at"
        >
          {HARM_FAMILIES.map((f) => (
            <li
              key={f.key}
              className="flex items-center gap-2"
              title={f.description}
            >
              <FieldIcon
                field={f.key}
                className="size-4 shrink-0 text-fg-tertiary"
              />
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
              <Empty>
                Add a home, venue, route or occasion to assess it on its own.
              </Empty>
            ) : (
              <ul className="divide-y divide-line">
                {places.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-wrap items-center gap-3 py-3 text-sm"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted">
                      {environmentTypeLabel(p.type)}
                      {p.area ? ` · ${p.area}` : ""}
                    </span>
                    <span className="ml-auto">
                      <ButtonLink
                        href={`/assessments/new?place=${p.id}`}
                        variant="secondary"
                      >
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
                    <Link
                      href={`/assessments/${a.id}`}
                      className="text-accent underline"
                    >
                      {a.environment.name}
                    </Link>
                    <span className="text-muted">
                      {formatWhen(a.createdAt)}
                    </span>
                    <VerdictBadge plan={readPlan(a.plan)} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Add a place">
            <ActionForm
              action={createEnvironmentAction}
              submitLabel="Add and assess"
              variant="secondary"
              className="space-y-3"
            >
              <Field label="Name">
                <TextInput
                  name="name"
                  placeholder="My flat"
                  maxLength={ENVIRONMENT_LIMITS.nameMax}
                  required
                />
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
              <Link
                href="/preferences?next=/assessments"
                className="text-accent underline"
              >
                Change
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

/** One line of "Next for you": what it is, and one link to do it. */
function NextRow({ item }: { item: NextItem }) {
  if (item.kind === "BOOKING") {
    return (
      <li>
        <Link
          href={`/bookings/${item.bookingId}`}
          className="block space-y-1 py-3 text-sm"
        >
          <span className="flex items-center justify-between gap-3">
            <span className="font-medium">
              Your booking: {serviceLabel(item.service)}
            </span>
            <StatusBadge status={item.status} />
          </span>
          <span className="block text-muted">{formatWhen(item.startsAt)}</span>
        </Link>
      </li>
    );
  }
  const title = findIntervention(item.stepKey)?.title;
  if (!title) return null;
  return (
    <li>
      <Link
        href={`/assessments/${item.assessmentId}#steps`}
        className="block space-y-1 py-3 text-sm"
      >
        <span className="block font-medium">
          {item.kind === "HELPED" ? "Did it help?" : "Your next step"}
        </span>
        <span className="block text-muted">{title}</span>
      </Link>
    </li>
  );
}
