export const WEEKDAYS = [
  { day: 1, label: "Monday", short: "Mon" },
  { day: 2, label: "Tuesday", short: "Tue" },
  { day: 3, label: "Wednesday", short: "Wed" },
  { day: 4, label: "Thursday", short: "Thu" },
  { day: 5, label: "Friday", short: "Fri" },
  { day: 6, label: "Saturday", short: "Sat" },
  { day: 7, label: "Sunday", short: "Sun" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number]["day"];

export function weekdayLabel(day: number): string {
  return WEEKDAYS.find((w) => w.day === day)?.label ?? String(day);
}
