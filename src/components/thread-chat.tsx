"use client";

import { ChatStarters, ChatThread, Composer, type ChatMessageData } from "@bitbaum/chatkit/react";
import "@bitbaum/chatkit/styles.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendThreadMessageAction } from "@/app/(app)/thread-actions";
import { THREAD_PLACEHOLDER, THREAD_POLL_MS, THREAD_STARTERS, type ThreadSeat } from "@/config/thread";

export type ThreadChatMessage = { id: string; body: string; mine: boolean; speaker: string; time: string };

/** The fleet chat (@bitbaum/chatkit) over a booking's thread. Everything
 * here was already filtered for this viewer on the server. */
export function ThreadChat({
  bookingId,
  seat,
  messages,
  canWrite,
}: {
  bookingId: string;
  seat: ThreadSeat;
  messages: ThreadChatMessage[];
  canWrite: boolean;
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No live stream: while the thread is open and on screen, ask for news now
  // and then. The server re-applies every visibility rule on each refresh.
  useEffect(() => {
    if (!canWrite) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, THREAD_POLL_MS);
    return () => clearInterval(timer);
  }, [canWrite, router]);

  async function send(text: string): Promise<boolean> {
    setSending(true);
    try {
      const result = await sendThreadMessageAction({ bookingId, seat, body: text });
      setError(result?.error ?? null);
      return !result?.error;
    } catch {
      setError("That did not go through. Try again.");
      return false;
    } finally {
      setSending(false);
    }
  }

  const chat: ChatMessageData[] = messages.map((m) => ({
    id: m.id,
    role: m.mine ? "user" : "assistant",
    content: m.body,
    speaker: { name: m.speaker, id: m.speaker.toLowerCase().replace(/\s+/g, "-") },
  }));
  const times = new Map(messages.map((m) => [m.id, m.time]));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex max-h-96 min-h-0 flex-col">
        <ChatThread
          messages={chat}
          showSpeakers
          renderFooter={(m) => <p className="text-sm text-muted">{times.get(m.id)}</p>}
          empty={
            canWrite ? (
              <ChatStarters starters={THREAD_STARTERS[seat]} onPick={(text) => void send(text)} />
            ) : (
              <p className="text-sm text-muted">No messages.</p>
            )
          }
        />
      </div>
      {canWrite && (
        <Composer
          onSend={(text) => send(text)}
          placeholder={THREAD_PLACEHOLDER[seat]}
          ariaLabel="Message"
          sending={sending}
          // Deliberately off. chatkit's mic tries the browser's Web Speech first
          // (Chrome streams that audio to Google) and falls back to a model
          // vendor's transcription; people speak meeting points here, and no
          // location or incident data may leave Skif's own database.
          voice={false}
          density="compact"
          header={
            error ? (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
