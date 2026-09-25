"use client";

import { AiFormAssistant, type AiFormAssistantLabels, type UseAiForm } from "@bitbaum/ai-kit/react";
import { AI_MESSAGES } from "@/config/ai";
import { buttonClass } from "./ui";

const CLASSES = {
  root: "space-y-3 rounded-card border border-line bg-bg p-4",
  header: "flex flex-wrap items-center justify-between gap-3",
  title: "text-sm font-semibold",
  hint: "text-sm text-muted",
  textarea: "w-full rounded-lg border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none",
  actions: "flex flex-wrap items-center gap-3",
  submit: buttonClass.primary,
  secondary: buttonClass.secondary,
  status: "text-sm text-accent",
  error: "text-sm text-danger",
  suggestions: "flex flex-wrap items-center gap-2",
  suggestionsTitle: "text-sm font-medium text-muted",
  suggestion: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-3 py-1 text-sm hover:bg-bg disabled:opacity-50",
};

/**
 * The assist box above a form. `disclosure` is shown every time, above the
 * box, because what is typed there leaves Skif for a model provider — the
 * person decides with that in front of them. When no model is configured the
 * box is replaced by a sentence saying so, and the form below works by hand.
 */
export function AiAssist({
  form,
  configured,
  disclosure,
  labels,
}: {
  form: UseAiForm;
  configured: boolean;
  disclosure: string;
  labels: Partial<AiFormAssistantLabels>;
}) {
  if (!configured) {
    return <p className="rounded-card border border-dashed border-line p-4 text-sm text-muted">{AI_MESSAGES.unconfigured}</p>;
  }
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">{disclosure}</p>
      <AiFormAssistant form={form} classNames={CLASSES} labels={labels} />
    </div>
  );
}
