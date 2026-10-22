import "server-only";
import type { Link } from "@bitbaum/ai-kit";

/**
 * Where a spoken description goes to become text: Groq's Whisper models, the
 * same vendor and order heidi uses. NOT the chat chain — those models answer,
 * these transcribe, and pointing one at the other's endpoint 404s every link.
 * A second vendor is a change to this list and nothing else.
 */
const GROQ = {
  id: "groq",
  baseUrl: "https://api.groq.com/openai/v1",
  keyEnv: "GROQ_API_KEY",
  models: ["whisper-large-v3-turbo", "whisper-large-v3"],
  // Billed by audio seconds, not tokens: it draws on no token budget.
  dailyTokens: 0,
} as const;

export function speechChain(): Link[] {
  return GROQ.models.map((model) => ({ provider: { ...GROQ, models: [...GROQ.models] }, model }));
}

export function speechConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(env[GROQ.keyEnv]?.trim());
}

/** Whisper never answers "nothing": given silence it writes the likeliest
 * caption, often a subtitle credit. Typing that into someone's application
 * would be words they never said, so these count as silence. */
const SILENCE = ["", "thank you.", "thanks for watching!", "thank you for watching.", "you", "bye.", "untertitel im auftrag des zdf, 2017", "untertitel der amara.org-community", "vielen dank.", "merci.", "sous-titres réalisés par la communauté d'amara.org", "grazie."];

export function heardNothing(text: string): boolean {
  return SILENCE.includes(text.trim().toLowerCase());
}
