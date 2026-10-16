import { slugify } from '../lib/utils';

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  quals: string;
  initials: string;
  photo?: string;
  /** Areas the doctor sees patients for (shown as chips on the profile) */
  focus: string[];
  /** Optional longer biography paragraphs — add when supplied by the hospital */
  bio?: string[];
  /** Hide from the "Our Doctors" menu (still gets a profile and appears in team lists) */
  hideFromMenu?: boolean;
}

type DoctorInput = Omit<Doctor, 'slug'>;

// Order matches the "Our Doctors" menu.
const doctors: DoctorInput[] = [
  {
    name: 'Dr. Rajasekhar M. R.',
    role: 'Founder and Chief Proctologist',
    quals: 'MBBS, MS',
    initials: 'RM',
    photo: '/doctorchiragcard.avif',
    focus: ['Colo-proctology', 'Piles, fissure and fistula', 'Diagnosis and treatment planning'],
  },
  {
    name: 'Dr. Shreedevi K. N.',
    role: 'Gastroenterology and Colorectal Surgeon',
    quals: 'MBBS, MS, FSGE',
    initials: 'SK',
    photo: '/doctorshreedevicard.avif',
    focus: ['Colorectal surgery', 'Anorectal conditions', 'Colorectal cancer'],
  },
  {
    name: 'Dr. Prithvija Chakravarthy',
    role: 'Proctologist',
    quals: 'BAMS, MD',
    initials: 'PC',
    photo: '/doctorprithvicard.avif',
    focus: ['Proctology', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Suchitra N. Adiga',
    role: 'Proctologist',
    quals: 'BAMS, MS',
    initials: 'SA',
    photo: '/doctorsuchithracard.avif',
    focus: ['Proctology', 'Anal fistula', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Rahul Hegana',
    // TODO: add photo
    role: 'Anaesthesiologist',
    quals: 'BAMS, MD',
    initials: 'RH',
    focus: ['Anaesthesia', 'Day-care procedures'],
  },
  {
    name: 'Dr. Nayan Kumar',
    // TODO: add photo
    role: 'Anaesthesiologist',
    quals: 'MBBS, DNB',
    initials: 'NK',
    focus: ['Anaesthesia', 'Day-care procedures'],
  },
  {
    name: 'Dr. Jyotsna Vemulapalli',
    role: 'General Surgeon',
    quals: 'MBBS, MS',
    initials: 'JV',
    photo: '/doctorjyotsnacard.avif',
    focus: ['General surgery', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Padmanabh R. Bhat',
    role: 'General Surgeon',
    quals: 'MBBS, MS, FRCS',
    initials: 'PB',
    photo: '/doctorpadmanabhcard.avif',
    focus: ['General surgery', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Chandrika',
    // TODO: add photo
    role: 'Senior Gynaecologist',
    quals: 'MBBS, DGO',
    initials: 'CH',
    focus: ['Gynaecology', "Women's health"],
    hideFromMenu: true,
  },
];

export const DOCTORS: Doctor[] = doctors.map((d) => ({ ...d, slug: slugify(d.name) }));

export const getDoctor = (slug: string) => DOCTORS.find((d) => d.slug === slug);
