"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { buttonClass } from "./ui";

/** What every server action behind a form returns: nothing on success (it
 * redirects or revalidates), or a message to show next to the form. */
export type ActionState = { error: string } | null;
export type FormAction = (state: ActionState, form: FormData) => Promise<ActionState>;

function Submit({ label, variant, pending }: { label: string; variant: keyof typeof buttonClass; pending: boolean }) {
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
  const formRef = useRef<HTMLFormElement>(null);
  // The server action itself, so without JavaScript the browser can still
  // post the form to it.
  const [state, formAction, pending] = useActionState(action, null);
  // A form passed to <form action> is reset by React after every submit, so a
  // refused one lost everything the person had typed (a whole incident report,
  // for one missed box). With JavaScript the submit is dispatched here instead,
  // which keeps the fields, and the form is cleared only once it succeeded.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(() => formAction(form));
  };
  const wasPending = useRef(false);
  useEffect(() => {
    if (wasPending.current && !pending && state === null) formRef.current?.reset();
    wasPending.current = pending;
  }, [pending, state]);
  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} className={className}>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <Submit label={submitLabel} variant={variant} pending={pending} />
        {state?.error && (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
