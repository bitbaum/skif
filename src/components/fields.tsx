import type { ReactNode } from "react";

type Option = { key: string; label: string; description?: string };

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted">{hint}</span>}
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
}: {
  type: "checkbox" | "radio";
  legend: string;
  name: string;
  options: readonly Option[];
  selected: readonly string[];
  hint?: string;
  /** Lay short options (a rating scale) out in a row. */
  inline?: boolean;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{legend}</legend>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div className={inline ? "flex flex-wrap gap-2" : "space-y-2"}>
        {options.map((o) => (
          <label key={o.key} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3">
            <input
              type={type}
              name={name}
              value={o.key}
              defaultChecked={selected.includes(o.key)}
              required={type === "radio"}
              className="mt-1 accent-accent"
            />
            <span>
              <span className="block text-sm">{o.label}</span>
              {o.description && <span className="block text-xs text-muted">{o.description}</span>}
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
