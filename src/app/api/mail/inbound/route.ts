import { inboundHandler } from "@bitbaum/mail-kit";
import { getDb } from "@/db/client";
import { receiveMail, triageCaller } from "@/server/mail";

/**
 * Where the box's mail gateway delivers mail sent to hello@skif.orangecat.ch.
 * mail-kit checks the signature (MAIL_INBOUND_SECRET) and refuses anything
 * unsigned, stale or too large before this code runs; a 500 makes the
 * gateway retry, so a failed write never loses a message.
 */
export const dynamic = "force-dynamic";

export const POST = inboundHandler({
  onMail: (mail) => receiveMail(getDb(), mail, triageCaller()),
});
