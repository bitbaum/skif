"use client";

import { DEFAULT_DICTATION_MESSAGES } from "@bitbaum/chatkit";
import { useDictation } from "@bitbaum/chatkit/react";
import type { UseAiForm } from "@bitbaum/ai-kit/react";
import { Mic, Square } from "lucide-react";
import { useState } from "react";
import { buttonClass } from "./ui";

/**
 * Say it instead of typing it: one press records, a second press ends the take,
 * and what was said goes to the form's assistant exactly as if it had been
 * typed into the box above — the same fill, the same undo, the same review.
 *
 * Server transcription first, never the browser's recogniser: Chrome streams
 * that audio to Google, and Skif sends a person's words to as few companies as
 * it can. Nothing is remembered on the device. The language is the page's
 * (<html lang>), which names the language Skif is being read in.
 */
export function SpeakToForm({ form }: { form: UseAiForm }) {
  const [heard, setHeard] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const dictation = useDictation({
    prefer: "server",
    rememberKey: null,
    transcribe: async (audio, locale) => {
      const body = new FormData();
      body.set("audio", audio);
      body.set("locale", locale);
      const res = await fetch("/api/ai/transcribe", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
      if (!res.ok) {
        setFailed(json.error ?? "Speaking isn't available right now. Type instead — nothing is lost.");
        return "";
      }
      return json.text ?? "";
    },
    onText: (text) => {
      const said = text.trim();
      if (!said) return;
      setHeard(said);
      void form.ask(said);
    },
  });
  if (!dictation.supported) return null;

  const listening = dictation.status === "listening";
  const working = dictation.status === "transcribing";
  const problem = failed ?? (dictation.problem ? DEFAULT_DICTATION_MESSAGES[dictation.problem] : null);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className={`${listening ? buttonClass.primary : buttonClass.secondary} gap-2`}
        disabled={working || form.busy}
        aria-pressed={listening}
        onClick={() => {
          setFailed(null);
          dictation.clearProblem();
          dictation.toggle();
        }}
      >
        {listening ? <Square aria-hidden className="size-4" /> : <Mic aria-hidden className="size-4" />}
        {listening ? "Done — fill the form" : working ? "Writing down what you said…" : "Say it instead"}
      </button>
      {listening && <p className="text-sm text-muted">Listening. Say what you would have typed, then press Done.</p>}
      {problem && (
        <p role="alert" className="text-sm text-danger">
          {problem}
        </p>
      )}
      {heard && !listening && !working && (
        <p className="text-sm text-muted">
          Heard: <span className="text-ink">“{heard}”</span>
        </p>
      )}
    </div>
  );
}
