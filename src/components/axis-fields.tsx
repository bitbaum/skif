import { PREFERENCE_AXES, type AxisLeans } from "@/config/constraints";
import { axisField } from "@/domain/inputs";

/** One row per trade-off: lean left, stay balanced, or lean right. */
export function AxisFields({ leans }: { leans: AxisLeans }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">Where do you lean?</legend>
      <p className="text-sm text-muted">
        These never rule anything out — your hard limits do that. They decide which acceptable option we suggest
        first.
      </p>
      {PREFERENCE_AXES.map((axis) => {
        const lean = leans[axis.key] ?? 0;
        const choices = [
          { value: -1, label: axis.left },
          { value: 0, label: "Balanced" },
          { value: 1, label: axis.right },
        ];
        // Three equal columns, so an axis never wraps into a pair and an orphan
        // on a phone: the two poles always sit either side of "Balanced".
        return (
          <fieldset key={axis.key} className="space-y-1">
            <legend className="text-sm text-muted">
              {axis.left} or {axis.right}
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {choices.map((c) => (
                <label
                  key={c.value}
                  className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-surface px-2 py-2 text-center text-sm has-checked:border-accent has-checked:bg-accent-soft has-checked:font-medium has-checked:text-accent has-focus-visible:ring-2 has-focus-visible:ring-accent"
                >
                  <input
                    type="radio"
                    name={axisField(axis.key)}
                    value={c.value}
                    defaultChecked={lean === c.value}
                    className="sr-only"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
    </fieldset>
  );
}
