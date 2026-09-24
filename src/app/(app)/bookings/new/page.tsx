import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { ConstraintList, languagesText, presenceText } from "@/components/booking";
import { CheckboxGroup, Field, RadioGroup, Select, TextArea, TextInput, toOptions } from "@/components/fields";
import { Card, DefinitionList, PageHeader } from "@/components/ui";
import { capabilityLabel } from "@/config/capabilities";
import { AREAS, BOOKING_LIMITS, REQUIRABLE_CAPABILITIES, SERVICES } from "@/config/services";
import { getDb } from "@/db/client";
import { PAYMENT_LABELS } from "@/domain/payment";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { createBookingAction } from "../actions";

export const metadata: Metadata = { title: "Request a Protector" };

const SERVICE_OPTIONS = SERVICES.map((s) => ({
  key: s.key,
  label: s.label,
  description: s.requires.length
    ? `${s.description} Always with: ${s.requires.map(capabilityLabel).join(", ")}.`
    : s.description,
}));

const MUST_HAVE_OPTIONS = REQUIRABLE_CAPABILITIES.map((k) => ({ key: k, label: capabilityLabel(k) }));

export default async function NewBookingPage() {
  const viewer = await requireViewer();
  const prefs = await getPreferences(getDb(), viewer.sub);
  if (!prefs) redirect("/preferences?next=/bookings/new");

  return (
    <>
      <PageHeader title="Request a Protector" lead="Operations matches you with someone and shows why." />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <ActionForm action={createBookingAction} submitLabel="Send request">
            <RadioGroup legend="What do you need?" name="service" options={SERVICE_OPTIONS} selected="NIGHT_OUT" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="When" hint="Zürich time">
                <TextInput type="datetime-local" name="startsAt" required />
              </Field>
              <Field label="Hours">
                <TextInput
                  type="number"
                  name="hours"
                  min={BOOKING_LIMITS.minHours}
                  max={BOOKING_LIMITS.maxHours}
                  defaultValue={BOOKING_LIMITS.minHours}
                  required
                />
              </Field>
            </div>
            <Field label="Area" hint="Shown to the Protector before they accept.">
              <Select name="area" options={toOptions(AREAS)} />
            </Field>
            <Field label="Meeting point" hint="Revealed to the Protector only once they have accepted.">
              <TextInput name="meetingPoint" maxLength={BOOKING_LIMITS.meetingPointMax} required />
            </Field>
            <CheckboxGroup
              legend="Must-haves (optional)"
              hint="Only Protectors whose qualification Operations has verified will be matched."
              name="requiredCapabilities"
              options={MUST_HAVE_OPTIONS}
              selected={[]}
            />
            <Field label="Anything they should know (optional)" hint="Also revealed only after acceptance.">
              <TextArea name="notes" maxLength={BOOKING_LIMITS.notesMax} />
            </Field>
          </ActionForm>
        </Card>
        <Card title="From your preferences">
          <DefinitionList
            items={[
              ["Hard limits", <ConstraintList key="c" constraints={prefs.hardConstraints} />],
              ["Presence", presenceText(prefs.presenceStyle)],
              ["Languages", languagesText(prefs.languages)],
            ]}
          />
          <p className="mt-4 text-sm">
            <Link href="/preferences" className="text-accent underline">
              Change preferences
            </Link>
          </p>
          <p className="mt-4 text-xs text-muted">{PAYMENT_LABELS.PAYMENT_PENDING}.</p>
        </Card>
      </div>
    </>
  );
}
