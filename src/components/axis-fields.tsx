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
        return (
          <div key={axis.key} role="radiogroup" aria-label={`${axis.left} or ${axis.right}`} className="flex flex-wrap gap-2">
            {choices.map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
              >
                <input
                  type="radio"
                  name={axisField(axis.key)}
                  value={c.value}
                  defaultChecked={lean === c.value}
                  className="accent-accent"
                />
                {c.label}
              </label>
            ))}
          </div>
        );
      })}
    </fieldset>
  );
}
