/** What a customer can complain about (SPEC §5, §10). */
export const COMPLAINT_CATEGORIES = [
  { key: "DISRESPECT", label: "I was treated disrespectfully" },
  { key: "UNPROFESSIONAL", label: "Unprofessional conduct" },
  { key: "FELT_UNSAFE", label: "I felt unsafe with them" },
  { key: "PRIVACY", label: "My privacy was not respected" },
  { key: "SERVICE", label: "The service itself (timing, booking, communication)" },
  { key: "OTHER", label: "Something else" },
] as const;

export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number]["key"];
export const COMPLAINT_CATEGORY_KEYS = COMPLAINT_CATEGORIES.map((c) => c.key) as [
  ComplaintCategory,
  ...ComplaintCategory[],
];

export function complaintCategoryLabel(key: string): string {
  return COMPLAINT_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export const COMPLAINT_TEXT_MAX = 2000;
