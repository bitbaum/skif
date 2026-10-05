import { describe, expect, it } from "vitest";
import { counted } from "./plural";

describe("counted", () => {
  it("agrees the noun with the count", () => {
    expect(counted(0, "booking", "bookings")).toBe("0 bookings");
    expect(counted(1, "booking", "bookings")).toBe("1 booking");
    expect(counted(2, "booking", "bookings")).toBe("2 bookings");
  });
});
