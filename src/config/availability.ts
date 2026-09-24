export const WEEKDAYS = [
  { day: 1, label: "Monday" },
  { day: 2, label: "Tuesday" },
  { day: 3, label: "Wednesday" },
  { day: 4, label: "Thursday" },
  { day: 5, label: "Friday" },
  { day: 6, label: "Saturday" },
  { day: 7, label: "Sunday" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number]["day"];

export function weekdayLabel(day: number): string {
  return WEEKDAYS.find((w) => w.day === day)?.label ?? String(day);
}
