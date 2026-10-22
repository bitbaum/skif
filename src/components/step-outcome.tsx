import { HELPED_LABELS, outcomeSentence, STEP_HELPED, type StepOutcome } from "@/domain/step-outcomes";
import { buttonClass } from "./ui";

const cell = `${buttonClass.secondary} w-full`;

/**
 * Under one step of a Safety Plan: "I did this" / "Not for me", then "Did it
 * help?". One form, one button per answer, so it works without JavaScript and
 * the choices sit as equal cells. What is said here shapes the next plan.
 */
export function StepOutcomeControls({
  stepKey,
  outcome,
  action,
}: {
  stepKey: string;
  outcome: StepOutcome | undefined;
  action: (form: FormData) => Promise<void>;
}) {
  const sentence = outcomeSentence(outcome);
  const asking = outcome?.status === "DONE" && !outcome.helped;
  return (
    <form action={action} className="mt-2 space-y-2">
      <input type="hidden" name="step" value={stepKey} />
      {!outcome && (
        <div className="grid grid-cols-2 gap-2">
          <button type="submit" name="answer" value="DONE" className={cell}>
            I did this
          </button>
          <button type="submit" name="answer" value="NOT_FOR_ME" className={cell}>
            Not for me
          </button>
        </div>
      )}
      {asking && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Did it help?</legend>
          <div className="grid grid-cols-3 gap-2">
            {STEP_HELPED.map((h) => (
              <button key={h} type="submit" name="answer" value={h} className={cell}>
                {HELPED_LABELS[h]}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {outcome && !asking && sentence && (
        <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
          <span>{sentence}</span>
          <button type="submit" name="answer" value="UNDO" className={buttonClass.link}>
            Change
          </button>
        </p>
      )}
    </form>
  );
}
