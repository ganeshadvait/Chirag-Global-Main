// Content for the About Us sub-pages. Events live in ./events.ts, certificates in ./certificates.ts.

export const ABOUT_LINKS = [
  { href: '/patient-reviews', label: 'Patient Reviews', image: '/icons/explore/patient-reviews.webp', text: 'What our patients say about their care.' },
  { href: '/chirag-global-hospitals-events', label: 'Events', image: '/icons/explore/events.webp', text: 'Health talks, camps and hospital news.' },
  { href: '/advanced-technologies', label: 'Advanced Technologies', image: '/icons/explore/advanced-technologies.webp', text: 'The techniques behind our day-care treatments.' },
  { href: '/educational-videos', label: 'Educational Videos', image: '/icons/explore/educational-videos.webp', text: 'Our specialists explain conditions and treatments.' },
  { href: '/hospital-certificates', label: 'Hospital Certificates', image: '/icons/explore/hospital-certificates.webp', text: 'Accreditation and recognition.' },
] as const;
