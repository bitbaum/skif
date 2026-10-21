/** The public pages' horizontal frame: the shared shell width and gutters,
 * the same frame sitekit's masthead uses, so header, sections and footer
 * line up to the pixel. */
export const SHELL = "mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-8";

/** Mono caps label: eyebrows, indices, small metadata. */
export const LABEL = "font-mono text-xs uppercase tracking-caps text-fg-tertiary";

/** Skif's buttons, the same shape sitekit gives a hero's actions, so every
 * button on every page, signed in or out, is one shape: a filled pill for
 * the main one, an outlined pill for the rest, a red outline to delete.
 * components/ui's buttonClass is these. */
const PILL =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const ACTION = {
  primary: `${PILL} bg-accent text-surface-page hover:opacity-90`,
  secondary: `${PILL} border-2 border-strong text-fg-primary hover:border-accent hover:text-accent`,
  danger: `${PILL} border-2 border-danger text-danger hover:bg-danger-soft`,
} as const;
