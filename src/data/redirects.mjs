// Permanent (301) redirects for old URLs, carried over from the WordPress redirect plugin.
// Used by astro.config.mjs `redirects`. Add new ones here as  '/old-path': '/new-path'.

/** @type {Record<string, string>} */
const RULES = {
  '/2025/11/10': '/chirag-global-hospitals-events',
  '/6-super-foods-to-prevent-piles-learn-from-a-piles-specialist': '/piles-laser-treatment-in-bangalore',
  '/2024/12/26': '/chirag-global-hospitals-events',
  '/2024/11/26': '/chirag-global-hospitals-events',
  '/2024/08/06': '/',
  '/2024/09/24': '/',
  '/2024/07/09': '/',
  '/2024/08/14': '/',
  '/event': '/chirag-global-hospitals-events',
  '/contact-best-hospital-in-bangalore': '/contact-us',
  '/about-top-hospital-in-bangalore': '/about-us',
  '/laser-treatment-for-piles-2': '/laser-treatment-for-piles-in-bangalore',
  '/fissure-vs-piles': '/fissure-vs-piles-difference-guide-bangalore',
};

/** Astro redirects config: every rule as a 301 */
export const REDIRECTS = Object.fromEntries(
  Object.entries(RULES).map(([from, to]) => [from, { status: /** @type {301} */ (301), destination: to }]),
);
