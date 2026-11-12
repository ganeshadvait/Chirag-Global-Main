// Every page address on the site, in one place. The URLs match the main WordPress site's
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
  blog: '/health-updates-2',
  events: '/chirag-global-hospitals-events',
  advancedTechnologies: '/advanced-technologies',
  educationalVideos: '/educational-videos',
  patientReviews: '/patient-reviews',
  hospitalCertificates: '/hospital-certificates',
  privacyPolicy: '/privacy-policy',
  cookiePolicy: '/cookie-policy',
  medicalDisclaimer: '/medical-disclaimer',
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

/** Event slug (src/data/events.ts) → its /event/<slug>/ page on the WordPress site */
export const EVENT_PATHS: Record<string, string> = {
  'founders-day-2026': 'founders-day-celebration-2026-a-journey-of-vision-service-innovation',
  'kscasicon-2026': 'dr-rajasekhar-m-r-invited-as-chairperson-at-kscasicon-2026',
  'cme-goa-2026': 'cme-12-january-2026-goa',
  'arogya-samvada-2025': 'republic-kannada-arogya-samvada-2025',
  'health-camp-maralegavi': 'health-camp-conducted-at-shree-kshetra-maralegavi-mutt-6th-december-2025',
  'world-piles-day-2025': 'world-piles-day-2',
};

/** "/piles-laser-treatment-in-bangalore" */
export const treatmentHref = (slug: string) => `/${TREATMENT_PATHS[slug] ?? slug}`;
/** "/dr-rajasekhar-m-r" */
export const doctorHref = (slug: string) => `/${doctorPath(slug)}`;
export const doctorPath = (slug: string) => DOCTOR_PATHS[slug] ?? `dr-${slug}`;
/** Blog posts sit at the top level, as on WordPress: "/sitz-bath-for-piles" */
export const postHref = (slug: string) => `/${slug}`;
/** "/event/world-piles-day-2" */
export const eventHref = (slug: string) => `/event/${eventPath(slug)}`;
export const eventPath = (slug: string) => EVENT_PATHS[slug] ?? slug;
/** Blog list pages: "/health-updates-2", "/health-updates-2/page/2" (WordPress pagination) */
export const blogPageHref = (n: number) => (n === 1 ? ROUTES.blog : `${ROUTES.blog}/page/${n}`);
