"use client";

import { Check } from "lucide-react";
import { useSyncExternalStore } from "react";
import type { ChecklistStep } from "@/config/checklists";

const KEY = (slug: string) => `skif:checklist:${slug}`;
const CHANGED = "skif:checklist";

/** Ticked steps live in this browser only, read as an external store so the
 * server render (nothing ticked) and the first browser render agree. Storage
 * can be absent or throw (private windows, blocked site data); the list then
 * works without memory. */
function read(slug: string): string {
  try {
    return localStorage.getItem(KEY(slug)) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): number[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((n): n is number => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function write(slug: string, done: number[]) {
  try {
    localStorage.setItem(KEY(slug), JSON.stringify(done));
  } catch {
    /* no storage: nothing is remembered */
  }
  window.dispatchEvent(new Event(CHANGED));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGED, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGED, onChange);
  };
}

export type ChecklistViewWords = { stepsDone: string; done: string; again: string; privacy: string };

export function ChecklistView({ slug, steps, words }: { slug: string; steps: readonly ChecklistStep[]; words: ChecklistViewWords }) {
  const raw = useSyncExternalStore(subscribe, () => read(slug), () => "[]");
  const done = parse(raw);

  function toggle(i: number) {
    write(slug, done.includes(i) ? done.filter((n) => n !== i) : [...done, i]);
  }

  const count = done.length;
  return (
    <div>
      <div className="flex items-center gap-4">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={count}
          aria-label={words.stepsDone}
          className="h-2 flex-1 overflow-hidden rounded-full bg-subtle"
        >
          <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(count / steps.length) * 100}%` }} />
        </div>
        <span className="font-mono text-sm tabular-nums text-fg-secondary">
          {count}/{steps.length}
        </span>
      </div>

      <ol className="mt-6 divide-y divide-subtle border-y border-subtle">
        {steps.map((step, i) => {
          const checked = done.includes(i);
          return (
            <li key={step.text}>
              <label className="flex min-h-11 cursor-pointer gap-4 py-4 has-focus-visible:outline-2 has-focus-visible:outline-accent">
                <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(i)} />
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors ${checked ? "border-accent bg-accent text-accent-ink" : "border-strong"}`}
                >
                  {checked && <Check className="size-4" strokeWidth={3} />}
                </span>
                <span className="flex-1">
                  <span className={`block leading-relaxed ${checked ? "text-fg-tertiary line-through decoration-1" : "text-fg-primary"}`}>
                    <span className="mr-2 font-mono text-xs tabular-nums text-fg-tertiary">{String(i + 1).padStart(2, "0")}</span>
                    {step.text}
                  </span>
                  {step.detail && <span className="mt-1 block text-sm leading-relaxed text-fg-secondary">{step.detail}</span>}
                </span>
              </label>
            </li>
          );
        })}
      </ol>
      {count === steps.length && (
        <p role="status" className="mt-6 rounded-card bg-accent-soft p-4 text-accent">
          {words.done}
        </p>
      )}
      {count > 0 && (
        <button type="button" className="mt-4 inline-flex min-h-11 items-center text-sm text-fg-tertiary underline-offset-4 hover:underline" onClick={() => write(slug, [])}>
          {words.again}
        </button>
      )}
      <p className="mt-6 text-xs text-fg-tertiary">{words.privacy}</p>
    </div>
  );
}
