import { WEEKDAYS } from "@/config/availability";
import { availabilityField } from "@/domain/inputs";
import { minuteToClock } from "@/domain/time";
import type { AvailabilityRow } from "@/server/availability";

const inputClass = "rounded-lg border border-line bg-surface px-2 py-1.5 text-sm";

/** A from/to pair per weekday, in Zürich time. An end before the start runs overnight. */
export function AvailabilityFields({ windows }: { windows: readonly AvailabilityRow[] }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">When can you work?</legend>
      <p className="text-xs text-muted">
        Zürich time. Leave a day empty if you&apos;re not available. An end earlier than the start runs past midnight.
      </p>
      {WEEKDAYS.map(({ day, label }) => {
        const w = windows.find((x) => x.weekday === day);
        return (
          <div key={day} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="w-24">{label}</span>
            <input
              type="time"
              name={availabilityField(day, "from")}
              aria-label={`${label} from`}
              defaultValue={w ? minuteToClock(w.startMinute) : ""}
              className={inputClass}
            />
            <span className="text-muted">to</span>
            <input
              type="time"
              name={availabilityField(day, "to")}
              aria-label={`${label} to`}
              defaultValue={w ? minuteToClock(w.startMinute + w.durationMinutes) : ""}
              className={inputClass}
            />
          </div>
        );
      })}
    </fieldset>
  );
}

/** "Fri 20:00–04:00" lines, for read-only views. */
export function AvailabilitySummary({ windows }: { windows: readonly AvailabilityRow[] }) {
  if (windows.length === 0) return <span className="text-muted">Not set — can&apos;t be matched</span>;
  return (
    <ul className="space-y-0.5">
      {windows.map((w) => (
        <li key={w.id}>
          {WEEKDAYS.find((d) => d.day === w.weekday)?.label}: {minuteToClock(w.startMinute)}–
          {minuteToClock(w.startMinute + w.durationMinutes)}
        </li>
      ))}
    </ul>
  );
}
