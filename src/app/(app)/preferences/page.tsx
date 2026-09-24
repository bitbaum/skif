import type { Metadata } from "next";
import { ActionForm } from "@/components/action-form";
import { AxisFields } from "@/components/axis-fields";
import { CheckboxGroup, Field, RadioGroup, TextArea, TextInput } from "@/components/fields";
import { Card, PageHeader } from "@/components/ui";
import { HARD_CONSTRAINTS, LANGUAGES, PRESENCE_STYLES } from "@/config/constraints";
import { PROTECTOR_LIMITS } from "@/config/protectors";
import { BOOKING_LIMITS } from "@/config/services";
import { getDb } from "@/db/client";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { getCustomerProfile } from "@/server/customers";
import { savePreferencesAction, saveProfileAction } from "./actions";

export const metadata: Metadata = { title: "Safety preferences" };

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; next?: string }>;
}) {
  const viewer = await requireViewer();
  const db = getDb();
  const [prefs, profile] = await Promise.all([getPreferences(db, viewer.sub), getCustomerProfile(db, viewer.sub)]);
  const { saved, next } = await searchParams;

  return (
    <>
      <PageHeader
        title="Your Safety Preference Profile"
        lead="What you value and what you won't accept. Hard limits are never traded off — anything that would break one is excluded, and we tell you so."
      />
      {saved && <p className="mb-4 rounded-lg bg-accent-soft p-3 text-sm text-accent">Saved.</p>}
      {!prefs && (
        <p className="mb-4 rounded-lg bg-warn-soft p-3 text-sm text-warn">
          Set these once before you book or run a safety assessment.
        </p>
      )}
      <Card title="How should your Protector address you?" className="mb-6">
        <ActionForm action={saveProfileAction} submitLabel="Save name">
          <Field
            label="Name to use"
            hint="Any name you like — it needn't be your legal one. A Protector sees it only after accepting your booking."
          >
            <TextInput
              name="preferredName"
              maxLength={PROTECTOR_LIMITS.displayNameMax}
              defaultValue={profile?.preferredName ?? ""}
              required
            />
          </Field>
        </ActionForm>
      </Card>
      <Card title="Limits and preferences">
        <ActionForm action={savePreferencesAction} submitLabel="Save preferences" hidden={next ? { next } : {}}>
          <CheckboxGroup
            legend="Hard limits"
            hint="Tick everything you never want, under any circumstances."
            name="hardConstraints"
            options={HARD_CONSTRAINTS}
            selected={prefs?.hardConstraints ?? []}
          />
          <AxisFields leans={prefs?.axes ?? {}} />
          <RadioGroup
            legend="Discretion or visible deterrence: how visible should a Protector be?"
            name="presenceStyle"
            options={PRESENCE_STYLES}
            selected={prefs?.presenceStyle ?? "DISCREET"}
          />
          <CheckboxGroup
            legend="Languages you'd like to be spoken to in"
            hint="Leave empty for no preference. A Protector sharing none of these won't be matched to you."
            name="languages"
            options={LANGUAGES}
            selected={prefs?.languages ?? []}
          />
          <Field label="What matters to you (optional)" hint="Shared with Operations, not with Protectors.">
            <TextArea name="valuesNote" maxLength={BOOKING_LIMITS.notesMax} defaultValue={prefs?.valuesNote ?? ""} />
          </Field>
        </ActionForm>
      </Card>
    </>
  );
}
