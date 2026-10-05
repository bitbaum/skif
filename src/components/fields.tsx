import type { ReactNode } from "react";

type Option = { key: string; label: string; description?: string };

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-sm text-muted">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={inputClass} />;
}

export function Select({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly Option[] }) {
  return (
    <select {...props} className={inputClass}>
      {options.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ChoiceGroup({
  type,
  legend,
  name,
  options,
  selected,
  hint,
  inline = false,
  describeChosen = false,
  list = false,
  hideLegend = false,
  onChange,
}: {
  type: "checkbox" | "radio";
  legend: string;
  name: string;
  options: readonly Option[];
  selected: readonly string[];
  hint?: string;
  /** Lay short options (a rating scale) out in a row. */
  inline?: boolean;
  /** Show an option's description only once it is chosen, so a long list of
   * described options stays one line each until the person picks. */
  describeChosen?: boolean;
  /** One bordered list with dividers rather than a box per option: for long
   * lists of short options, where the boxes doubled the height. */
  list?: boolean;
  /** The legend is read by screen readers only (a fold's summary already shows it). */
  hideLegend?: boolean;
  /** Controlled: `selected` is the live value and every change is reported.
   * Without it the group is uncontrolled and `selected` is only the default. */
  onChange?: (next: string[]) => void;
}) {
  const toggle = (key: string, on: boolean) =>
    onChange?.(type === "radio" ? [key] : on ? [...selected, key] : selected.filter((k) => k !== key));
  return (
    <fieldset className="space-y-2">
      <legend className={hideLegend ? "sr-only" : "text-sm font-medium"}>{legend}</legend>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      <div
        className={
          list ? "divide-y divide-line rounded-lg border border-line bg-surface" : inline ? "flex flex-wrap gap-2" : "space-y-2"
        }
      >
        {options.map((o) => (
          <label
            key={o.key}
            className={
              list
                ? "group flex min-h-11 items-start gap-3 px-3 py-2.5 has-checked:bg-accent-soft"
                : "group flex items-start gap-3 rounded-lg border border-line bg-surface p-3 has-checked:border-accent"
            }
          >
            <input
              type={type}
              name={name}
              value={o.key}
              {...(onChange
                ? { checked: selected.includes(o.key), onChange: (e: React.ChangeEvent<HTMLInputElement>) => toggle(o.key, e.target.checked) }
                : { defaultChecked: selected.includes(o.key) })}
              required={type === "radio"}
              className="mt-1 accent-accent"
            />
            <span>
              <span className="block text-sm">{o.label}</span>
              {o.description && (
                <span className={`text-sm text-muted ${describeChosen ? "hidden group-has-checked:block" : "block"}`}>
                  {o.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CheckboxGroup(props: Omit<Parameters<typeof ChoiceGroup>[0], "type">) {
  return <ChoiceGroup type="checkbox" {...props} />;
}

export function RadioGroup(props: Omit<Parameters<typeof ChoiceGroup>[0], "type" | "selected"> & { selected?: string }) {
  return <ChoiceGroup type="radio" {...props} selected={props.selected ? [props.selected] : []} />;
}

/** Turn a config list of `{ key, label }` or plain strings into options. */
export function toOptions(list: readonly (string | Option)[]): Option[] {
  return list.map((o) => (typeof o === "string" ? { key: o, label: o } : o));
}

/** A titled part of a long form that opens on tap: every option stays one
 * tap away while the form reads as a list of its parts. */
export function FormFold({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-line bg-surface">
      <summary className="flex min-h-11 cursor-pointer list-none flex-col justify-center px-3 py-2 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3 text-sm font-medium">
          {title}
          <span aria-hidden className="text-muted group-open:rotate-180">
            ⌄
          </span>
        </span>
        {hint && <span className="text-sm text-muted">{hint}</span>}
      </summary>
      <div className="border-t border-line p-3">{children}</div>
    </details>
  );
}
