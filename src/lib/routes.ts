// Every page address on the site, in one place. Most URLs match the main WordPress site's
// sitemap (chiragglobalhospitals.com/sitemap_index.xml), so pages keep the addresses Google
// has already indexed and links shared over the years keep working.
// Pages and components build links with these helpers rather than writing paths by hand.

/** Fixed pages */
export const ROUTES = {
  home: '/',
  about: '/about-us',
  contact: '/contact-us',
  treatments: '/treatments',
  doctors: '/doctors',
  blog: '/our-blogs',
  events: '/chirag-global-hospitals-events',
  advancedTechnologies: '/advanced-technologies',
  educationalVideos: '/educational-videos',
  patientReviews: '/patient-reviews',
  hospitalCertificates: '/hospital-certificates',
  privacyPolicy: '/privacy-policy',
} as const;

/** Treatment slug (src/data/treatments.ts) → its page on the WordPress site */
export const TREATMENT_PATHS: Record<string, string> = {
  'piles-hemorrhoids': 'piles-laser-treatment-in-bangalore',
  fissure: 'best-fissure-laser-treatment-in-bangalore',
  fistula: 'top-fistula-laser-treatment-hospital-in-bangalore',
  constipation: 'best-constipation-treatment-in-bangalore',
  'colon-cancer': 'colon-cancer-experts-in-bangalore',
  'pilonidal-sinus': 'pilonidal-sinus-specialists-in-bangalore',
  'ulcerative-colitis': 'ulcerative-colitis-treatment-in-bangalore',
  'rectal-prolapse': 'top-specialists-for-rectal-prolapse-treatment-in-bangalore',
};

/** Doctor slug (src/data/doctors.ts) → WordPress page, where it isn't simply "dr-<slug>" */
const DOCTOR_PATHS: Record<string, string> = {
  'jyotsna-vemulapalli': 'dr-jyotsna-v',
};

/** "/piles-laser-treatment-in-bangalore" */
export const treatmentHref = (slug: string) => `/${TREATMENT_PATHS[slug] ?? slug}`;
/** "/dr-rajasekhar-m-r" */
export const doctorHref = (slug: string) => `/${doctorPath(slug)}`;
export const doctorPath = (slug: string) => DOCTOR_PATHS[slug] ?? `dr-${slug}`;
/** Blog posts sit at the top level, as on WordPress: "/sitz-bath-for-piles" */
export const postHref = (slug: string) => `/${slug}`;
/** "/event/world-piles-day-2": events keep their slug from the blog site (src/data/events.ts) */
export const eventHref = (slug: string) => `/event/${eventPath(slug)}`;
export const eventPath = (slug: string) => EVENT_PATHS[slug] ?? slug;
/** Blog list pages: "/our-blogs", "/our-blogs/page/2" */
export const blogPageHref = (n: number) => (n === 1 ? ROUTES.blog : `${ROUTES.blog}/page/${n}`);
