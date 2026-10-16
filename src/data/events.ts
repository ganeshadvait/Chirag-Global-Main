// Hospital events — content from chiragglobalhospitals.com/chirag-global-hospitals-events
// and each event's page. Photos in /public/events/<slug>/. Newest first.
import type { IconName } from '../components/Icon.astro';

export type EventCategory = 'Celebration' | 'Conference' | 'Health camp' | 'Medical education' | 'Media' | 'Awareness';

export const CATEGORY_ICONS: Record<EventCategory, IconName> = {
  Celebration: 'star',
  Conference: 'users',
  'Health camp': 'activity',
  'Medical education': 'clipboard',
  Media: 'youtube',
  Awareness: 'shield',
};

export interface HospitalEvent {
  slug: string;
  title: string;
  /** ISO start date, e.g. '2026-05-23' */
  date: string;
  /** Shown instead of the formatted date when the exact date isn't known, or for ranges */
  dateLabel?: string;
  venue: string;
  category: EventCategory;
  /** One sentence for cards */
  excerpt: string;
  body: string[];
  highlights?: string[];
  cover: string;
  gallery: string[];
}

const img = (slug: string, ...n: number[]) => n.map((i) => `/events/${slug}/${i}.webp`);

export const EVENTS: HospitalEvent[] = [
  {
    slug: 'founders-day-2026',
    title: 'Founders Day Celebration 2026: a journey of vision, service and innovation',
    date: '2026-05-23',
    venue: 'Chirag Global Hospitals, Bengaluru',
    category: 'Celebration',
    excerpt: 'Honouring the doctors, staff and supporters who helped the Chirag healthcare family grow.',
    body: [
      'Chirag Global Hospitals celebrated Founders Day on 23 May 2026, honouring the doctors, healthcare professionals, staff, well-wishers and supporters who have contributed to the growth of the institution.',
      'Teams from across the Chirag healthcare family shared their work and their plans for the future, with a shared commitment to innovation, research, education and patient-centred care.',
    ],
    highlights: [
      'Felicitation of doctors, healthcare professionals, staff and supporters',
      'Chirag Multi Speciality Hospital presented its work in emergency care, critical care, surgery and multidisciplinary services',
      'Chiraayu Ayurveda Hospital shared its integrative approach to colo-ano-rectal and digestive health',
      'The Palliative Care division described its work in pain management, supportive care and emotional healing',
    ],
    cover: '/events/founders-day-2026/1.webp',
    gallery: img('founders-day-2026', 1, 2),
  },
  {
    slug: 'kscasicon-2026',
    title: 'Dr. Rajasekhar M. R. invited as Chairperson at KSCASICON 2026',
    date: '2026-02-13',
    dateLabel: '13–15 February 2026',
    venue: 'RIMS, Raichur',
    category: 'Conference',
    excerpt: 'Chairing a session at the 44th annual conference of the Karnataka State Chapter of the Association of Surgeons of India.',
    body: [
      'Dr. Rajasekhar M. R., Chairman of Chirag Global Hospitals, was invited as a Chairperson at KSCASICON 2026, the 44th Annual Conference of the Karnataka State Chapter of the Association of Surgeons of India, held at RIMS, Raichur.',
      'His participation reflects the hospital’s involvement in surgical education, innovation and ethical surgical practice.',
    ],
    highlights: [
      '44th Annual Conference of the Karnataka State Chapter of the Association of Surgeons of India',
      'Held at RIMS, Raichur, from 13 to 15 February 2026',
      'Dr. Rajasekhar M. R. served as a Chairperson',
    ],
    cover: '/events/kscasicon-2026/1.webp',
    gallery: img('kscasicon-2026', 1, 2),
  },
  {
    slug: 'cme-goa-2026',
    title: 'CME in Goa: Recent Advances in Proctology',
    date: '2026-01-12',
    venue: 'Gomantak Ayurveda Mahavidyalaya & Research Centre, Shiroda, Goa',
    category: 'Medical education',
    excerpt: 'Dr. Rajasekhar M. R. spoke to students and interns on the latest developments in colo-ano-rectal care.',
    body: [
      'Dr. Rajasekhar M. R., Senior Colorectal Surgeon and Chairman of Chirag Global Hospitals, was a guest speaker at a Continuing Medical Education (CME) programme in Goa on 12 January 2026.',
      'His session, “Recent Advances in Proctology”, covered the latest developments in colo-ano-rectal care for interns, postgraduate and undergraduate students.',
    ],
    highlights: [
      'Session: “Recent Advances in Proctology”',
      'Audience: interns, postgraduate and undergraduate students',
      'Focus: the latest developments in colo-ano-rectal care',
    ],
    cover: '/events/cme-goa-2026/2.webp',
    gallery: img('cme-goa-2026', 2, 1, 3),
  },
  {
    slug: 'arogya-samvada-2025',
    title: 'Republic Kannada Arogya Samvada 2025',
    date: '2026-01-16',
    dateLabel: 'January 2026',
    venue: 'Republic TV Kannada',
    category: 'Media',
    excerpt: 'Dr. Rajasekhar M. R. spoke on Arogya Samvada, a health awareness programme on Republic TV Kannada.',
    body: [
      'Dr. Rajasekhar M. R., Chairman and Senior Colorectal Surgeon at Chirag Global Hospitals, featured on Arogya Samvada, a special health awareness programme telecast on Republic TV Kannada.',
    ],
    cover: '/events/arogya-samvada-2025/1.webp',
    gallery: img('arogya-samvada-2025', 1, 2),
  },
  {
    slug: 'health-camp-maralegavi',
    title: 'Free health camp at Shree Kshetra Maralegavi Mutt',
    date: '2025-12-06',
    venue: 'Shree Kshetra Maralegavi Mutt, Kanakapura Taluk',
    category: 'Health camp',
    excerpt: 'Free consultations and screening for piles, fissure, fistula and digestive health, with an overwhelming response.',
    body: [
      'On 6 December 2025, Chirag Global Hospitals conducted a free medical camp at Shree Kshetra Maralegavi Mutt, as part of the Guruvandana Mahotsava honouring Dr. Mummadi Shivarudra Mahaswamigalu.',
      'Our medical team offered consultations and screenings throughout the day, and the camp received an overwhelming response.',
    ],
    highlights: [
      'Free health consultations for general health concerns',
      'Screening for piles, fissure, fistula and other anorectal conditions',
      'Evaluation of constipation, gastric and digestive problems',
      'Ayurvedic, diet and lifestyle counselling',
    ],
    cover: '/events/health-camp-maralegavi/1.webp',
    gallery: img('health-camp-maralegavi', 1, 2, 3, 4, 5, 6),
  },
  {
    slug: 'world-piles-day-2025',
    title: 'World Piles Day and the opening of our Constipation Clinic',
    date: '2025-11-20',
    venue: 'Chirag Global Hospitals, BTM 2nd Stage, Bengaluru',
    category: 'Awareness',
    excerpt: 'Marking World Piles Day with the inauguration of a dedicated Constipation Clinic.',
    body: [
      'Chirag Global Hospitals marked World Piles Day on 20 November 2025 and inaugurated a new Constipation Clinic.',
      'The day renewed our commitment to safe, effective treatment for piles, fissure, fistula, constipation and other anorectal conditions.',
    ],
    highlights: ['World Piles Day awareness', 'Inauguration of the Constipation Clinic', 'Focus on piles, fissure, fistula and constipation care'],
    cover: '/events/world-piles-day-2025/3.webp',
    gallery: img('world-piles-day-2025', 3, 2, 4, 5),
  },
];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

export const formatEventDate = (e: Pick<HospitalEvent, 'date' | 'dateLabel'>) =>
  e.dateLabel ?? new Date(`${e.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const eventDay = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }),
    year: d.getFullYear(),
  };
};
