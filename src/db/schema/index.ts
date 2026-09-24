/**
 * Database schema, one module per area. There is deliberately no users table:
 * identity is the OrangeCat OIDC `sub`, stored as text wherever a row belongs
 * to a person.
 */
export * from "./assessments";
export * from "./bookings";
export * from "./complaints";
export * from "./people";
export * from "./shared";
