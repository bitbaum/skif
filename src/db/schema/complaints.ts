/** Confidential complaints. The customer's own words (`body`) never leave
 * Operations; the Protector sees only `summaryForProtector`. */
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { protectors } from "./people";
import { complaintCategory, complaintStatus, createdAt } from "./shared";

export const complaints = pgTable(
  "complaints",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id),
    customerSub: text("customer_sub").notNull(),
    /** The Protector on the booking when the complaint was made, if any. */
    protectorId: uuid("protector_id").references(() => protectors.id),
    category: complaintCategory("category").notNull(),
    body: text("body").notNull(),
    status: complaintStatus("status").notNull().default("RECEIVED"),
    summaryForProtector: text("summary_for_protector"),
    protectorResponse: text("protector_response"),
    appeal: text("appeal"),
    /** Operations' reasoning. Operations-only. */
    decisionNote: text("decision_note"),
    decidedBy: text("decided_by"),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [
    index("complaints_status_idx").on(t.status),
    index("complaints_protector_idx").on(t.protectorId),
    index("complaints_booking_idx").on(t.bookingId),
  ],
);
