/**
 * The messages the emergency page lets someone send from their own phone.
 * Pure, so the exact words are tested; the words themselves come from the
 * page's language (src/config/text, `emergencyPanel.messages`). Nothing here
 * reaches Skif: the text is built in the browser and handed to the phone's
 * share sheet or SMS app.
 */

export type Position = { latitude: number; longitude: number; accuracy: number };

export type MessageWords = {
  location: (metres: number, time: string, link: string) => string;
  plan: string;
  with: string;
  backBy: string;
  ifNot: string;
  ifNotDefault: string;
};

/** An OpenStreetMap link to a point: opens in any browser, needs no account,
 * and tells no map company who asked. */
export function mapLink({ latitude, longitude }: Pick<Position, "latitude" | "longitude">): string {
  const lat = latitude.toFixed(5);
  const lon = longitude.toFixed(5);
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
}

export function locationMessage(words: MessageWords, pos: Position, at: Date, timeZone?: string): string {
  const time = at.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
  return words.location(Math.max(1, Math.round(pos.accuracy)), time, mapLink(pos));
}

export type Plan = { where: string; with?: string; backBy?: string; ifNot?: string };

export function planMessage(words: MessageWords, plan: Plan): string {
  const lines = [`${words.plan}: ${plan.where.trim()}.`];
  if (plan.with?.trim()) lines.push(`${words.with}: ${plan.with.trim()}.`);
  if (plan.backBy?.trim()) lines.push(`${words.backBy}: ${plan.backBy.trim()}.`);
  lines.push(plan.ifNot?.trim() ? `${words.ifNot}: ${plan.ifNot.trim()}` : words.ifNotDefault);
  return lines.join("\n");
}

/** An sms: link with a body. iOS and Android both read `?&body=`. */
export function smsLink(body: string): string {
  return `sms:?&body=${encodeURIComponent(body)}`;
}
