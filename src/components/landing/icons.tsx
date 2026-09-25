import type { DoorIcon } from "@/config/landing";

/** Line icons in currentColor, so they follow the theme without a colour of their own. */
const PATHS: Record<DoorIcon, React.ReactNode> = {
  // Two people, side by side.
  companion: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M16 13.2a5 5 0 0 1 5 4.8v2" />
    </>
  ),
  // A person inside a circle of what matters to them.
  life: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 18a5 5 0 0 1 9 0" />
    </>
  ),
  // A place with a door.
  venue: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
};

export function LandingIcon({ name }: { name: DoorIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
