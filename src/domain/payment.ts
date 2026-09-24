/**
 * Payment abstraction. Year one is settled manually by Operations, so the only
 * provider records PAYMENT_PENDING and never claims money moved. A real
 * provider plugs in behind `PaymentProvider` without touching bookings.
 */
export const PAYMENT_STATUSES = ["PAYMENT_PENDING", "PAID"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface PaymentProvider {
  /** Called when a booking is created; returns the booking's initial payment status. */
  open(bookingId: string): Promise<PaymentStatus>;
}

export const manualPayments: PaymentProvider = {
  async open() {
    return "PAYMENT_PENDING";
  },
};

export const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  PAYMENT_PENDING: "Payment pending — Operations will confirm the price and settle it with you",
  PAID: "Paid",
};
