/**
 * Skif's mark: a recumbent stag in the Scythian animal style (the gold
 * Kostromskaya stag is the best-known example) — legs folded, antlers swept
 * back in a row of curls. Drawn in currentColor, so it follows the theme.
 * The favicon (src/app/icon.svg) carries the same paths.
 */
export function SkifMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <g transform="translate(0 3.5)" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3 27 C5 23 9 21 13 20.5 C16 20 18 21.5 19 24 L23 31 C28 33 34 33 40 32 C47 31 53 30 57 33 C60.5 35.5 60.5 40.5 57 43 C54 45 49 45 45 44.5 L27 44.5 C21.5 44.5 17.5 40 17 35 L14 29 C12 28 9 28.5 6 29 C4 29.3 2.5 28.5 3 27 Z M11.2 23.6 a1.3 1.3 0 1 0 0.01 0 Z"
        />
        <path d="M16.5 21 L20 15.5 L20.5 21.5 Z" />
        <path d="M28 42 L15 47 L12.5 50 L17.5 50 L31 45 Z" />
        <path d="M50 42 L37 47 L34.5 50 L39.5 50 L53 45 Z" />
        <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
          <path d="M15 20 C22 11 40 9 58 27" />
          <path d="M21.5 14.5 c-1.5 -4 2 -6.5 4 -4.5" />
          <path d="M29 11.6 c-1.5 -4 2 -6.5 4 -4.5" />
          <path d="M37 11.3 c-1 -4 2.5 -6 4.5 -4" />
          <path d="M44.5 13.8 c-0.5 -4 3 -5.5 4.8 -3.3" />
          <path d="M51 18 c0 -4 3.5 -5 5 -2.6" />
        </g>
      </g>
    </svg>
  );
}
