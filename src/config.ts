import { slugify } from './lib/utils';
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
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
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

const ABOUT_PAGES = ['Patient Reviews', 'Events', 'Advanced Technologies', 'Educational Videos', 'Hospital Certificates'];

// Treatment and doctor sub-menus are generated from their data files, so the menu always matches the pages.
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About Us',
    children: ABOUT_PAGES.map((label) => ({ label, href: `/about/${slugify(label)}` })),
  },
  {
    href: '/treatments',
    label: 'Treatments',
    children: TREATMENTS_LIST.map((t) => ({ label: t.navLabel, href: `/treatments/${t.slug}` })),
  },
  {
    href: '/doctors',
    label: 'Our Doctors',
    children: DOCTORS.filter((d) => !d.hideFromMenu).map((d) => ({ label: d.name, href: `/doctors/${d.slug}` })),
  },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
];
