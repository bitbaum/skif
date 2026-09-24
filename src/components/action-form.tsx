"use client";

import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { buttonClass } from "./ui";

/** What every server action behind a form returns: nothing on success (it
 * redirects or revalidates), or a message to show next to the form. */
export type ActionState = { error: string } | null;
export type FormAction = (state: ActionState, form: FormData) => Promise<ActionState>;

function Submit({ label, variant }: { label: string; variant: keyof typeof buttonClass }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonClass[variant]}>
      {pending ? "Working…" : label}
    </button>
  );
}

export function ActionForm({
  action,
  submitLabel,
  variant = "primary",
  hidden = {},
  children,
  className = "space-y-5",
}: {
  action: FormAction;
  submitLabel: string;
  variant?: keyof typeof buttonClass;
  hidden?: Record<string, string>;
  children?: ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className={className}>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <Submit label={submitLabel} variant={variant} />
        {state?.error && (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
