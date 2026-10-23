import type { Metadata } from "next";
import { ActionForm } from "@/components/action-form";
import { AxisFields } from "@/components/axis-fields";
import {
  CheckboxGroup,
  Field,
  RadioGroup,
  TextArea,
  TextInput,
} from "@/components/fields";
import { Card, FoldCard, PageHeader } from "@/components/ui";
import {
  HARD_CONSTRAINTS,
  LANGUAGES,
  LANGUAGES_SHOWN,
  PRESENCE_STYLES,
} from "@/config/constraints";
import { PROTECTOR_LIMITS } from "@/config/protectors";
import { BOOKING_LIMITS } from "@/config/services";
import { getDb } from "@/db/client";
import { getPreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";
import { getCustomerProfile } from "@/server/customers";
import {
  quickStartAction,
  savePreferencesAction,
  saveProfileAction,
} from "./actions";

export const metadata: Metadata = { title: "Safety preferences" };

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; next?: string }>;
}) {
  const viewer = await requireViewer();
  const db = getDb();
  const [prefs, profile] = await Promise.all([
    getPreferences(db, viewer.sub),
    getCustomerProfile(db, viewer.sub),
  ]);
  const { saved, next } = await searchParams;

  return (
    <>
      <PageHeader
        title="Your Safety Preference Profile"
        lead="What you value and what you won't accept. Hard limits are never traded off — anything that would break one is excluded, and we tell you so."
      />
      {saved && (
        <p className="mb-4 rounded-lg bg-accent-soft p-3 text-sm text-accent">
          Saved.
        </p>
      )}
      {!prefs && (
        <Card title="Start now" className="mb-6">
          <ActionForm
            action={quickStartAction}
            submitLabel="Continue"
            hidden={next ? { next } : {}}
          >
            <p className="text-sm text-muted">
              Nothing is ruled out, every trade-off is balanced and a Protector
              is discreet. That is a fine place to start: you can change any of
              it later under Preferences, and your plans and bookings will
              follow.
            </p>
            <Field
              label="Name to use (optional)"
              hint="Any name you like — it needn't be your legal one. Only needed to book a Protector, who sees it after accepting."
            >
              <TextInput
                name="preferredName"
                maxLength={PROTECTOR_LIMITS.displayNameMax}
                defaultValue={profile?.preferredName ?? ""}
              />
            </Field>
          </ActionForm>
        </Card>
      )}
      {prefs && (
        <Card title="How should your Protector address you?" className="mb-6">
          <ActionForm
            action={saveProfileAction}
            submitLabel="Save name"
            hidden={next ? { next } : {}}
          >
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
      )}
      <Prefs fold={!prefs}>
        <ActionForm
          action={savePreferencesAction}
          submitLabel="Save preferences"
          hidden={next ? { next } : {}}
        >
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
            more={LANGUAGES_SHOWN}
            selected={prefs?.languages ?? []}
            inline
          />
          <Field
            label="What matters to you (optional)"
            hint="Shared with Operations, not with Protectors."
          >
            <TextArea
              name="valuesNote"
              maxLength={BOOKING_LIMITS.notesMax}
              defaultValue={prefs?.valuesNote ?? ""}
            />
          </Field>
        </ActionForm>
      </Prefs>
    </>
  );
}

/** The full form: the page itself for someone who has one, folded behind
 * "set your limits first" for someone about to start on the defaults. */
function Prefs({
  fold,
  children,
}: {
  fold: boolean;
  children: React.ReactNode;
}) {
  return fold ? (
    <FoldCard
      title="Set your limits and preferences first"
      action="Open"
      preview="Optional: hard limits, trade-offs, languages."
    >
      {children}
    </FoldCard>
  ) : (
    <Card title="Limits and preferences">{children}</Card>
  );
}
