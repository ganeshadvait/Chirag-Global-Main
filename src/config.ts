import { ROUTES, doctorHref, treatmentHref } from './lib/routes';
import { TREATMENTS_LIST } from './data/treatments';
import { DOCTORS } from './data/doctors';

// Site-wide settings. Edit these to rebrand the site.
export const SITE = {
  name: 'Chirag Global Hospitals',
  shortName: 'Chirag',
  description:
    "Bengaluru's specialist hospital for piles, fissure, fistula and colorectal conditions since 1986.",
  email: 'info@chiragglobalhospitals.com',
  phone: '080 6591 6422',
  emergency: '+91 90199 54658',
  // TODO: confirm WhatsApp number before launch (flagged in the design)
  whatsapp: '+91 93804 98256',
  address: '103, 6th Cross Rd, Dollar Layout, BTM 2nd Stage, Bengaluru 560076',
  shortAddress: 'BTM 2nd Stage, Bengaluru',
  mapsUrl: 'https://maps.google.com/?q=Chirag+Global+Hospitals+BTM+2nd+Stage+Bengaluru',
  hours: { weekdays: '9am to 7pm', sunday: '10am to 12pm' },
  accreditation: 'NABH Entry Level certified',
  // Search engine indexing for the whole site. false = every page carries
  // <meta name="robots" content="noindex, nofollow">, so Google and others keep it out of
  // search results (used while the new site is being prepared). Set to true at launch.
  indexing: false,
  // Google Apps Script web app that appends "Request an appointment" form leads to the
  // leads Google Sheet (same script the WordPress site posts to). The browser posts to it
  // directly, so the URL is public; the script must be deployed with access "Anyone".
  leadsEndpoint:
    'https://script.google.com/macros/s/AKfycbxXPCnZmTUfwpWBVY5N_QmuElvPOj59s0dFykd_ZxYKsn8sfuNwyQW8VEDyES7ihhjA/exec',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: 'https://www.youtube.com/@dr.rajasekharmysore',
    linkedin: '#',
  },
};

/** Strip spaces etc. for tel:/wa.me links */
export const digits = (s: string) => s.replace(/[^\d+]/g, '');

/** Pre-filled opening message for every WhatsApp chat */
export const WHATSAPP_MESSAGE = 'Hi, I need help booking an appointment.';

/** wa.me link to the care team, opening with `text` already typed in */
export const whatsappLink = (text: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

export interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

// About sub-pages: label → address (WordPress URLs, see src/lib/routes.ts)
const ABOUT_PAGES = [
  { label: 'Patient Reviews', href: ROUTES.patientReviews },
  { label: 'Events', href: ROUTES.events },
  { label: 'Advanced Technologies', href: ROUTES.advancedTechnologies },
  { label: 'Educational Videos', href: ROUTES.educationalVideos },
  { label: 'Hospital Certificates', href: ROUTES.hospitalCertificates },
];

// Treatment and doctor sub-menus are generated from their data files, so the menu always matches the pages.
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about-us',
    label: 'About Us',
    children: ABOUT_PAGES,
  },
  {
    href: '/treatments',
    label: 'Treatments',
    children: TREATMENTS_LIST.map((t) => ({ label: t.navLabel, href: treatmentHref(t.slug) })),
  },
  {
    href: '/doctors',
    label: 'Our Doctors',
    children: DOCTORS.filter((d) => !d.hideFromMenu).map((d) => ({ label: d.name, href: doctorHref(d.slug) })),
  },
  { href: '/health-updates-2', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
];
