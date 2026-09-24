import { TIME_ZONE } from "@/config/locale";

const LOCAL_DATETIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

/** How far ahead of UTC the zone's wall clock is at instant `t`, in ms. */
function zoneOffsetMs(t: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(t));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second")) - t;
}

/** Read an `<input type="datetime-local">` value as wall-clock time in the
 * given zone, independent of the server's own time zone. */
export function zonedLocalToDate(local: string, timeZone: string = TIME_ZONE): Date | null {
  const m = LOCAL_DATETIME.exec(local);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number) as [number, number, number, number, number, number];
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  const first = wall - zoneOffsetMs(wall, timeZone);
  // Re-check at the corrected instant so dates near a DST switch land right.
  return new Date(wall - zoneOffsetMs(first, timeZone));
}
