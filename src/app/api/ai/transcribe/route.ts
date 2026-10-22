import { ChainExhaustedError, transcribe } from "@bitbaum/ai-kit";
import { auth } from "@/auth";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/locales";
import { checkRateLimit } from "@/server/rate-limit";
import { heardNothing, speechChain, speechConfigured } from "@/server/speech";

export const dynamic = "force-dynamic";

/** One spoken description, generously. Past this it is not dictation. */
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Speech to text for the AI-assisted forms only (src/config/ai-forms.ts), so
 * a person can SAY their background instead of typing it. It transcribes and
 * nothing else; the audio lives for one request and is never stored. Signed
 * in, rate-limited per person, and logged without the vendor's body.
 */
export async function POST(request: Request) {
  const sub = (await auth())?.user?.id;
  if (!sub) return Response.json({ error: "Sign in to speak instead of typing." }, { status: 401 });
  if (!speechConfigured()) return Response.json({ error: "Speaking isn't switched on here. Type instead — it works the same." }, { status: 503 });
  const limited = await checkRateLimit("TRANSCRIBE", sub);
  if (!limited.success) return Response.json({ error: limited.error }, { status: 429 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Expected a recording." }, { status: 400 });
  }
  const audio = form.get("audio");
  if (!(audio instanceof Blob) || audio.size === 0) return Response.json({ error: "Expected a recording." }, { status: 400 });
  if (audio.size > MAX_BYTES) return Response.json({ error: "That recording is too long. Say it in two parts." }, { status: 413 });
  const raw = form.get("locale");
  const language = typeof raw === "string" && isLocale(raw.slice(0, 2)) ? raw.slice(0, 2) : DEFAULT_LOCALE;

  try {
    const { text } = await transcribe({ audio, filename: "dictation.webm", language, chain: speechChain(), timeoutMs: 20_000, signal: request.signal });
    return Response.json({ text: heardNothing(text) ? "" : text.trim() });
  } catch (error) {
    const detail = error instanceof ChainExhaustedError ? error.failures.map((f) => f.message).join(" | ") : String(error);
    console.warn("[transcribe]", detail.replace(/(gsk|sk)-[A-Za-z0-9_-]+/g, "[key]"));
    return Response.json({ error: "Speaking isn't available right now. Type instead — nothing is lost." }, { status: 502 });
  }
}
