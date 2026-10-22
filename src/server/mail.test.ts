import {
  signInbound,
  inboundHandler,
  type InboundMail,
} from "@bitbaum/mail-kit";
import { describe, expect, it, vi } from "vitest";
import { createTestDb } from "@/test/db";
import {
  getMail,
  listInbox,
  purgeExpiredMail,
  receiveMail,
  replyToMail,
  setHandled,
  skifAddress,
} from "./mail";

function mail(over: Partial<InboundMail> = {}): InboundMail {
  return {
    id: "d-1",
    messageId: "abc@example.org",
    receivedAt: new Date().toISOString(),
    to: "hello@skif.orangecat.ch",
    from: { address: "anna@example.org", name: "Anna" },
    subject: "Can I book someone for Saturday?",
    text: "Hello, I need someone to walk me home from the station on Saturday night.",
    attachments: [],
    auth: { spf: "pass", dkim: "pass", dmarc: "pass" },
    ...over,
  };
}

const model = (answer: object) => async () => JSON.stringify(answer);
const sorted = {
  kind: "booking",
  urgency: "normal",
  summary: "Wants a Protector on Saturday.",
  language: "en",
  needsHuman: true,
};
const LIVE = {
  RESEND_API_KEY: "re_live_key",
  AUTH_URL: "https://skif.orangecat.ch",
};

describe("mail sent to Skif", () => {
  it("keeps a message once however often the gateway delivers it, sorted by the model", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail(), model(sorted));
    await receiveMail(db, mail(), model(sorted));
    const { open, handled } = await listInbox(db);
    expect(open).toHaveLength(1);
    expect(handled).toHaveLength(0);
    expect(open[0]).toMatchObject({
      kind: "booking",
      summary: "Wants a Protector on Saturday.",
      triagedBy: "model",
      fromAddress: "anna@example.org",
    });
  });

  it("still keeps the message when no model answers, sorted by rules", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail(), async () => {
      throw new Error("vendor down");
    });
    expect((await getMail(db, "d-1"))?.triagedBy).toBe("rules");
  });

  it("files spam as handled, so nobody has to open it", async () => {
    const db = await createTestDb();
    await receiveMail(
      db,
      mail(),
      model({ ...sorted, kind: "spam", needsHuman: false }),
    );
    const { open, handled } = await listInbox(db);
    expect(open).toHaveLength(0);
    expect(handled[0]?.handledBy).toBe("triage");
  });

  it("puts urgent mail first and marks a sender that failed authentication", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail({ id: "a" }), model(sorted));
    await receiveMail(
      db,
      mail({ id: "b", auth: { spf: "fail", dkim: "none", dmarc: "fail" } }),
      model({ ...sorted, urgency: "urgent" }),
    );
    const { open } = await listInbox(db);
    expect(open.map((m) => m.id)).toEqual(["b", "a"]);
    expect(open[0]?.suspect).toBe(true);
  });

  it("answers to the Reply-To address when the sender gave one", async () => {
    const db = await createTestDb();
    await receiveMail(
      db,
      mail({ replyTo: { address: "anna.private@example.org" } }),
      model(sorted),
    );
    expect((await getMail(db, "d-1"))?.fromAddress).toBe(
      "anna.private@example.org",
    );
  });

  it("deletes a message after the retention period, answered or not", async () => {
    const db = await createTestDb();
    const day = 24 * 60 * 60 * 1000;
    await receiveMail(
      db,
      mail({
        id: "old",
        receivedAt: new Date(Date.now() - 91 * day).toISOString(),
      }),
      model(sorted),
    );
    await receiveMail(
      db,
      mail({
        id: "recent",
        receivedAt: new Date(Date.now() - 89 * day).toISOString(),
      }),
      model(sorted),
    );
    expect(await getMail(db, "old")).toBeNull();
    expect(await getMail(db, "recent")).not.toBeNull();
    await purgeExpiredMail(db, new Date(Date.now() + 2 * day));
    expect(await getMail(db, "recent")).toBeNull();
  });

  it("moves a message between open and done", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail(), model(sorted));
    await setHandled(db, "d-1", "ops-1", true);
    expect((await listInbox(db)).open).toHaveLength(0);
    await setHandled(db, "d-1", "ops-1", false);
    expect((await listInbox(db)).open).toHaveLength(1);
  });
});

describe("answering from Skif", () => {
  it("sends from Skif with replies coming back to hello@, then marks it answered", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail(), model(sorted));
    const send = vi.fn(async () => ({ sent: true as const, id: "r-1" }));
    expect(
      await replyToMail(db, "d-1", "ops-1", "Yes, we can.", {
        send,
        env: LIVE,
      }),
    ).toEqual({ ok: true });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "anna@example.org",
        subject: "Re: Can I book someone for Saturday?",
        text: "Yes, we can.",
        replyTo: "hello@skif.orangecat.ch",
      }),
      expect.objectContaining({
        idempotencyKey: expect.stringMatching(/^reply-/),
      }),
    );
    const stored = await getMail(db, "d-1");
    expect(stored?.repliedAt).toBeInstanceOf(Date);
    expect(stored?.handledBy).toBe("ops-1");
  });

  it("refuses to pretend: no mail set up, an empty answer or a failed send leave it open", async () => {
    const db = await createTestDb();
    await receiveMail(db, mail(), model(sorted));
    const failing = vi.fn(async () => ({
      sent: false as const,
      error: "429",
      retryable: true,
    }));
    expect(
      await replyToMail(db, "d-1", "ops-1", "Yes.", { env: {} }),
    ).toMatchObject({ ok: false });
    expect(
      await replyToMail(db, "d-1", "ops-1", "   ", { env: LIVE }),
    ).toMatchObject({ ok: false });
    expect(
      await replyToMail(db, "d-1", "ops-1", "Yes.", {
        send: failing,
        env: LIVE,
      }),
    ).toMatchObject({ ok: false });
    expect((await listInbox(db)).open).toHaveLength(1);
  });

  it("names its own address from the deployment, hello@ on its host", () => {
    expect(skifAddress({ AUTH_URL: "https://skif.orangecat.ch" })).toBe(
      "hello@skif.orangecat.ch",
    );
    expect(skifAddress({})).toBe("hello@skif.orangecat.ch");
  });
});

describe("the gateway's door", () => {
  it("lets in only mail signed with the shared secret", async () => {
    const received: string[] = [];
    const POST = inboundHandler({
      secret: "s3cret",
      onMail: (m) => void received.push(m.id),
    });
    const body = JSON.stringify(mail());
    const post = (signature: string) =>
      POST(
        new Request("http://x/api/mail/inbound", {
          method: "POST",
          body,
          headers: { "x-mail-signature": signature },
        }),
      );
    expect((await post(signInbound(body, "wrong"))).status).toBe(401);
    expect((await post(signInbound(body, "s3cret"))).status).toBe(200);
    expect(received).toEqual(["d-1"]);
  });
});
