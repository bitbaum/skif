import {
  HeartPulse,
  KeyRound,
  LifeBuoy,
  type LucideIcon,
  MapPinned,
  MessageSquareWarning,
  Scale,
  ScanEye,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import type { HarmFamily } from "@/config/harm-families";

/** One icon per field of safety. A Record, so a new field without an icon
 * fails the type check rather than rendering blank. */
export const FIELD_ICONS: Record<HarmFamily, LucideIcon> = {
  PHYSICAL: Shield,
  CYBER: KeyRound,
  PRIVACY: ScanEye,
  REPUTATIONAL: MessageSquareWarning,
  FAMILY: Users,
  HEALTH: HeartPulse,
  FINANCIAL: Wallet,
  ENVIRONMENTAL: MapPinned,
  INSTITUTIONAL: Scale,
  RESILIENCE: LifeBuoy,
};

export function FieldIcon({ field, className = "size-5" }: { field: HarmFamily; className?: string }) {
  const Icon = FIELD_ICONS[field];
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
