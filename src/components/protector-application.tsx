"use client";

import { useAiForm } from "@bitbaum/ai-kit/react";
import { PROTECTOR_APPLICATION_FORM } from "@/config/ai-forms";
import { LANGUAGES, PRESENCE_STYLES } from "@/config/constraints";
import { PROTECTOR_LIMITS } from "@/config/protectors";
import { SERVICES } from "@/config/services";
import type { ProtectorCapability } from "@/server/protectors";
import { ActionForm, type FormAction } from "./action-form";
import { AiAssist } from "./ai-assist";
import { CapabilityFields } from "./capability-fields";
import { CheckboxGroup, Field, TextArea, TextInput } from "./fields";

/** Says exactly what leaves Skif, and that nothing is decided by it. */
const DISCLOSURE =
  "What you type in this box, together with what the form already holds, is sent to an external AI provider only to fill in the form — nothing is saved until you submit, and Operations still reviews your application.";

const LABELS = {
  fillTitle: "Describe your experience, and the form fills in",
  refineTitle: "Change it by asking",
  fillHint: "Your background, languages, the work you do and how you work. Check every field before you submit.",
  fillPlaceholder: "e.g. Eight years in event security, first-aid certified, I speak German and English…",
};

const AI_NOTE = "Filled in by the assistant — check it.";

/**
 * The Protector application, with one AI assist box above it. The hook owns
 * the form's state so the person and the assistant write to the same fields;
 * the inputs keep their names, so the server action receives exactly what it
 * did before and validates it the same way. The model never submits.
 */
export function ProtectorApplication({
  action,
  submitLabel,
  initial,
  held,
  aiConfigured,
}: {
  action: FormAction;
  submitLabel: string;
  initial: Record<string, string | string[]>;
  held: ProtectorCapability[];
  aiConfigured: boolean;
}) {
  const form = useAiForm({
    target: PROTECTOR_APPLICATION_FORM.key,
    fields: PROTECTOR_APPLICATION_FORM.fields,
    initialValues: initial,
  });
  const list = (name: string) => {
    const v = form.values[name];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  };
  const note = (name: string) => (form.isAiTouched(name) ? AI_NOTE : undefined);

  return (
    <div className="space-y-6">
      <AiAssist form={form} configured={aiConfigured} disclosure={DISCLOSURE} labels={LABELS} />
      <ActionForm action={action} submitLabel={submitLabel}>
        <Field label="Name shown to customers" hint={note("displayName")}>
          <TextInput
            name="displayName"
            maxLength={PROTECTOR_LIMITS.displayNameMax}
            value={form.text("displayName")}
            onChange={(e) => form.setValue("displayName", e.target.value)}
            required
          />
        </Field>
        <Field label="About you" hint={note("bio") ?? "How you keep situations calm. Customers read this."}>
          <TextArea
            name="bio"
            maxLength={PROTECTOR_LIMITS.bioMax}
            value={form.text("bio")}
            onChange={(e) => form.setValue("bio", e.target.value)}
            required
          />
        </Field>
        <CheckboxGroup
          legend="Services you offer"
          name="services"
          options={SERVICES}
          hint={note("services")}
          selected={list("services")}
          onChange={(next) => form.setValue("services", next)}
        />
        <CheckboxGroup
          legend="Languages"
          name="languages"
          options={LANGUAGES}
          hint={note("languages")}
          selected={list("languages")}
          onChange={(next) => form.setValue("languages", next)}
        />
        <Field label="Years of relevant experience" hint={note("experienceYears")}>
          <TextInput
            type="number"
            name="experienceYears"
            min={0}
            max={PROTECTOR_LIMITS.experienceYearsMax}
            value={form.text("experienceYears")}
            onChange={(e) => form.setValue("experienceYears", e.target.value)}
            required
          />
        </Field>
        <CapabilityFields held={held} bind={{ value: form.text, set: form.setValue }} />
        <CheckboxGroup
          legend="Styles you work in"
          name="presenceStyles"
          options={PRESENCE_STYLES}
          hint={note("presenceStyles")}
          selected={list("presenceStyles")}
          onChange={(next) => form.setValue("presenceStyles", next)}
        />
      </ActionForm>
    </div>
  );
}
