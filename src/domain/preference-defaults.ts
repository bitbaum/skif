import type { PreferencesInput } from "./inputs";

/**
 * Where a new person starts: nothing ruled out, every trade-off balanced, a
 * discreet Protector, no language preference. Each is a real answer they can
 * change at any time, so "start now" asks them for nothing they have not
 * already got a sensible value for.
 */
export const DEFAULT_PREFERENCES: PreferencesInput = {
  hardConstraints: [],
  axes: {},
  presenceStyle: "DISCREET",
  languages: [],
  valuesNote: "",
};
