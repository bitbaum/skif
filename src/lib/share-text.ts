/**
 * The messages the emergency page lets someone send from their own phone.
 * Pure, so the exact words are tested. Nothing here reaches Skif: the text is
 * built in the browser and handed to the phone's share sheet or SMS app.
 */

export type Position = { latitude: number; longitude: number; accuracy: number };

/** An OpenStreetMap link to a point: opens in any browser, needs no account,
 * and tells no map company who asked. */
export function mapLink({ latitude, longitude }: Pick<Position, "latitude" | "longitude">): string {
  const lat = latitude.toFixed(5);
  const lon = longitude.toFixed(5);
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
}

export function locationMessage(pos: Position, at: Date, timeZone?: string): string {
  const time = at.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
  return `I need help. I am here, give or take ${Math.max(1, Math.round(pos.accuracy))} m, as of ${time}: ${mapLink(pos)}`;
}

export type Plan = { where: string; with?: string; backBy?: string; ifNot?: string };

export function planMessage(plan: Plan): string {
  const lines = [`My plan: ${plan.where.trim()}.`];
  if (plan.with?.trim()) lines.push(`With: ${plan.with.trim()}.`);
  if (plan.backBy?.trim()) lines.push(`Back by: ${plan.backBy.trim()}.`);
  lines.push(plan.ifNot?.trim() ? `If you have not heard from me by then: ${plan.ifNot.trim()}` : "If you have not heard from me by then, call me, and if I do not answer, call the police.");
  return lines.join("\n");
}

/** An sms: link with a body. iOS and Android both read `?&body=`. */
export function smsLink(body: string): string {
  return `sms:?&body=${encodeURIComponent(body)}`;
}
