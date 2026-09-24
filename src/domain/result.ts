/** Structured outcome for every operation that can fail for a user-facing reason. */
export type Result<T = undefined> = { success: true; data: T } | { success: false; error: string };

export const ok = <T>(data: T): Result<T> => ({ success: true, data });
export const fail = (error: string): { success: false; error: string } => ({ success: false, error });
