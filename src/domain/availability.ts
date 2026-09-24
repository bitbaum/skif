/**
 * Weekly availability, in Zürich wall-clock time. A window starts on a weekday
 * and may run past midnight (nightlife work often does), so a booking at 01:00
 * on Saturday can be covered by Friday's 20:00–04:00 window.
 */
import { MINUTES_PER_DAY, zonedWeekMinute } from "./time";

export type AvailabilityWindow = {
  weekday: number;
  startMinute: number;
  /** 1 … 24h. */
  durationMinutes: number;
};

const MINUTES_PER_HOUR = 60;

/** From a "from"/"to" pair: a "to" at or before "from" means it ends the next day. */
export function windowFromClock(weekday: number, from: number, to: number): AvailabilityWindow {
  const duration = to > from ? to - from : to + MINUTES_PER_DAY - from;
  return { weekday, startMinute: from, durationMinutes: duration };
}

const WEEK = 7 * MINUTES_PER_DAY;

type Interval = { start: number; end: number };

/** Minutes since Monday 00:00. */
const weekMinute = (weekday: number, minute: number) => (weekday - 1) * MINUTES_PER_DAY + minute;

/** Windows as one timeline: back-to-back or overlapping windows merge, so
 * Monday 00:00–24:00 plus Tuesday 00:00–08:00 covers a Monday-night job. The
 * week is copied either side so Sunday nights run into Monday. */
function timeline(windows: readonly AvailabilityWindow[]): Interval[] {
  const intervals = windows
    .flatMap((w) => {
      const start = weekMinute(w.weekday, w.startMinute);
      return [-WEEK, 0, WEEK].map((shift) => ({ start: start + shift, end: start + shift + w.durationMinutes }));
    })
    .sort((a, b) => a.start - b.start);
  const merged: Interval[] = [];
  for (const i of intervals) {
    const last = merged[merged.length - 1];
    if (last && i.start <= last.end) last.end = Math.max(last.end, i.end);
    else merged.push({ ...i });
  }
  return merged;
}

/** Is the Protector available for the whole booking, start to end? */
export function isAvailable(windows: readonly AvailabilityWindow[], startsAt: Date, hours: number): boolean {
  const { weekday, minute } = zonedWeekMinute(startsAt);
  const start = weekMinute(weekday, minute);
  const end = start + hours * MINUTES_PER_HOUR;
  return timeline(windows).some((i) => i.start <= start && end <= i.end);
}
