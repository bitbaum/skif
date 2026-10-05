import { DISPLAY_LOCALE } from "@/config/locale";

const rules = new Intl.PluralRules(DISPLAY_LOCALE);

/** "1 booking", "3 bookings": a count with the noun that agrees with it. */
export function counted(n: number, one: string, other: string): string {
  return `${n} ${rules.select(n) === "one" ? one : other}`;
}
