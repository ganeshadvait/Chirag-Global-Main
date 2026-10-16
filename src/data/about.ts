// Content for the About Us sub-pages. Events live in ./events.ts, certificates in ./certificates.ts.

export const ABOUT_LINKS = [
  { href: '/about/patient-reviews', label: 'Patient Reviews', icon: 'star', text: 'What our patients say about their care.' },
  { href: '/about/events', label: 'Events', icon: 'clipboard', text: 'Health talks, camps and hospital news.' },
  { href: '/about/advanced-technologies', label: 'Advanced Technologies', icon: 'zap', text: 'The techniques behind our day-care treatments.' },
  { href: '/about/educational-videos', label: 'Educational Videos', icon: 'youtube', text: 'Our specialists explain conditions and treatments.' },
  { href: '/about/hospital-certificates', label: 'Hospital Certificates', icon: 'shield', text: 'Accreditation and recognition.' },
] as const;
