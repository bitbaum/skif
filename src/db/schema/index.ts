/**
 * Database schema, one module per area. A row that belongs to a person stores
 * their `actorId` as text (src/auth.ts): the OrangeCat `sub` for everyone
 * whose first way in was OrangeCat, the account id for everyone else.
 */
export * from "./accounts";
export * from "./academy";
export * from "./assessments";
export * from "./audit";
export * from "./cases";
export * from "./bookings";
export * from "./complaints";
export * from "./mail";
export * from "./outcomes";
export * from "./people";
export * from "./shared";
export * from "./threads";
