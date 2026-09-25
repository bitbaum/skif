/** The Operations booking queue: how much of it one page shows, and how long
 * a search may be. The filtering rules themselves are listkit's. */
export const OPS_QUEUE = {
  pageSize: 25,
  /** A reference is 8 characters and a service label under 30; anything
   * longer than this is not a search Operations typed. */
  searchMax: 80,
} as const;
