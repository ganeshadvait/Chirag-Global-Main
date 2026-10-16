/** URL-safe slug: "Dr. Shreedevi K. N." → "shreedevi-k-n", "Piles/Hemorrhoids" → "piles-hemorrhoids" */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/^dr\.?\s+/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Shared shape for FAQ lists */
export interface FaqItem {
  q: string;
  a: string;
}
