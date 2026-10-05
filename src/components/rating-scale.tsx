import { RATING_SCALE } from "@/config/ratings";
import { segmentClass } from "./ui";

/** "Nothing tense happened": the answer to an optional question that did not apply. */
export const NOT_APPLICABLE = { key: "", label: "Nothing tense happened" } as const;

/**
 * One rating question: its labelled scale as a single row of five, so seven
 * questions read as seven rows on a phone, not seven wrapped blocks. An
 * optional question gets "Nothing tense happened" as its own row above,
 * chosen until the person says otherwise.
 */
export function RatingScale({ name, question, optional }: { name: string; question: string; optional: boolean }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{question}</legend>
      {optional && (
        <label className={segmentClass}>
          <input type="radio" name={name} value={NOT_APPLICABLE.key} defaultChecked className="sr-only" />
          {NOT_APPLICABLE.label}
        </label>
      )}
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {RATING_SCALE.map((s) => (
          <label key={s.value} className={`${segmentClass} px-0.5 text-xs leading-tight sm:text-sm`}>
            <input type="radio" name={name} value={s.value} required={!optional} className="sr-only" />
            {s.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
