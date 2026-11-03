import { slugify } from '../lib/utils';

/** A focus chip: plain text, or text with some words linking to treatment pages */
export type FocusItem = string | (string | { text: string; href: string })[];

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  quals: string;
  initials: string;
  photo?: string;
  /** Areas the doctor sees patients for (shown as chips on the profile) */
  focus: FocusItem[];
  /** Optional longer biography paragraphs — add when supplied by the hospital */
  bio?: string[];
  /** Optional hero line under the name (defaults to qualifications · hospital) */
  subtitle?: string;
  /** Optional profile heading (defaults to "About <name>") */
  aboutTitle?: string;
  /** Optional SEO <title> for the profile page, used exactly as written */
  metaTitle?: string;
  /** Optional SEO meta description for the profile page */
  metaDescription?: string;
  /** Optional primary SEO keyword for the profile page */
  keyword?: string;
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
    keyword: 'top proctologist in Bangalore',
    metaTitle: 'Dr. Rajasekhar M. R. | Chief Proctologist in Bangalore',
    metaDescription:
      'Meet Dr. Rajasekhar M. R., founder of Chirag Global Hospitals, Bangalore. Senior colorectal surgeon with 42+ years of experience. Book a consultation.',
    subtitle:
      'MBBS, MS General Surgeon, Senior Colorectal Surgeon & Chief Proctologist at Chirag Global Hospitals, Bangalore',
    aboutTitle: 'About Dr. Rajasekhar M. R., proctologist in Bangalore',
    bio: [
      'Dr. Rajasekhar M. R. is a highly respected colorectal surgeon with over 42 years of surgical experience, including 30+ years dedicated exclusively to colorectal and proctology practice. He is the visionary founder of Chirag Global Hospitals and a pioneer in advanced colorectal care.',
    ],
    focus: [
      'Colo-proctology',
      [
        { text: 'Piles', href: '/treatments/piles-hemorrhoids' },
        ', ',
        { text: 'fissure', href: '/treatments/fissure' },
        ' and ',
        { text: 'fistula', href: '/treatments/fistula' },
      ],
      'Diagnosis and treatment planning',
    ],
  },
  {
    name: 'Dr. Shreedevi K. N.',
    role: 'Gastroenterology and Colorectal Surgeon',
    quals: 'MBBS, MS, FSGE',
    initials: 'SK',
    photo: '/doctorshreedevicard.avif',
    keyword: 'colorectal surgeon in Bangalore',
    metaTitle: 'Dr. Shreedevi K. N. | Colorectal Surgeon in Bangalore',
    metaDescription:
      'Dr. Shreedevi K. N., CEO of Chirag Global Hospitals, Bangalore. Colorectal surgeon and surgical gastroenterologist for anorectal and colon conditions.',
    subtitle: 'CEO, Chirag Global Hospitals · Colorectal Surgeon & Surgical Gastroenterologist, Bangalore',
    aboutTitle: 'About Dr. Shreedevi K. N., Consultant Colorectal Surgeon',
    bio: [
      'Dr. Shreedevi K. N. is a skilled and dynamic colorectal surgeon known for her patient-centric approach and precision in surgical care. She has been closely mentored in advanced proctology and is actively contributing to next-generation leadership at Chirag Global Hospitals.',
    ],
    focus: ['Colorectal surgery', 'Anorectal conditions', 'Colorectal cancer'],
  },
  {
    name: 'Dr. Prithvija Chakravarthy',
    role: 'Proctologist',
    quals: 'BAMS, MD',
    initials: 'PC',
    photo: '/doctorprithvicard.avif',
    metaTitle: 'Dr. Prithvija Chakravarthy | Proctologist in Bangalore',
    metaDescription:
      'Dr. Prithvija Chakravarthy is a proctologist at Chirag Global Hospitals, Bangalore, combining Ayurveda with modern diagnostics for anorectal conditions.',
    subtitle: 'BAMS, MD, Proctologist at Chirag Global Hospitals, Bangalore',
    bio: [
      'Dr. Prithvija Chakravarthy is an Ayurvedic physician with more than a decade of clinical experience. She practices an integrative approach, combining classical Ayurveda with modern diagnostics to provide holistic, patient-centered care.',
      'She is known for preparing personalized Ayurvedic formulations based on individual constitution and disease state.',
    ],
    focus: ['Proctology', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Suchitra N. Adiga',
    role: 'Proctologist',
    quals: 'BAMS, MS',
    initials: 'SA',
    photo: '/doctorsuchithracard.avif',
    metaTitle: 'Dr. Suchitra N. Adiga | Proctologist in Bangalore',
    metaDescription:
      'Dr. Suchitra N. Adiga is a consultant proctologist at Chirag Global Hospitals, Bangalore, treating anorectal disorders with Ayurvedic and modern care.',
    subtitle: 'BAMS, MS, Consultant Proctologist at Chirag Global Hospitals, Bangalore',
    bio: [
      'Dr. Suchitra N. Adiga is an experienced proctologist specializing in integrative management of ano-rectal disorders using both Ayurvedic and modern approaches.',
    ],
    focus: ['Proctology', 'Anal fistula', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Rahul Hegana',
    // TODO: add photo
    role: 'Anaesthesiologist',
    quals: 'BAMS, MD',
    initials: 'RH',
    metaTitle: 'Dr. Rahul Hegana | Anaesthesiologist in Bangalore',
    metaDescription:
      'Dr. Rahul Hegana is an anaesthesiologist and pain management specialist at Chirag Global Hospitals, Bangalore, supporting safe day-care procedures.',
    subtitle: 'BAMS, MD, Anaesthesiologist & Pain Management Specialist at Chirag Global Hospitals, Bangalore',
    bio: [
      'Dr. Rahul Hegana is a skilled anaesthesiologist and pain management specialist with expertise in perioperative care and advanced pain relief techniques. He plays a vital role in ensuring patient safety, comfort, and effective pain control during and after surgical procedures.',
    ],
    focus: ['Anaesthesia', 'Day-care procedures'],
  },
  {
    name: 'Dr. Nayan Kumar',
    // TODO: add photo
    role: 'Anaesthesiologist',
    quals: 'MBBS, DNB',
    initials: 'NK',
    metaTitle: 'Dr. Nayan Kumar | Anaesthesiologist in Bangalore',
    metaDescription:
      'Dr. Nayan Kumar is an anaesthesiologist at Chirag Global Hospitals, Bangalore, providing safe perioperative care for day-care and surgical procedures.',
    subtitle: 'MBBS, DNB, Anaesthesiologist at Chirag Global Hospitals, Bangalore',
    bio: [
      'Dr. Nayan Kumar is a skilled anaesthesiologist ensuring safe and effective perioperative care with expertise in anesthesia management.',
    ],
    focus: ['Anaesthesia', 'Day-care procedures'],
  },
  {
    name: 'Dr. Jyotsna Vemulapalli',
    role: 'General Surgeon',
    quals: 'MBBS, MS (General Surgery)',
    initials: 'JV',
    photo: '/doctorjyotsnacard.avif',
    metaTitle: 'Dr. Jyotsna Vemulapalli | General Surgeon in Bangalore',
    metaDescription:
      'Dr. Jyotsna Vemulapalli is a general surgeon at Chirag Global Hospitals, Bangalore, providing compassionate surgical care for anorectal conditions.',
    subtitle: 'MBBS, MS, General Surgeon at Chirag Global Hospitals, Bangalore',
    bio: ['Dr. Jyotsna Vemulapalli is a committed medical professional delivering reliable and compassionate surgical care.'],
    focus: ['General surgery', 'Anorectal conditions'],
  },
  {
    name: 'Dr. Padmanabh R. Bhat',
    role: 'General Surgeon',
    quals: 'MBBS, MS (General Surgery), FRCS (Edinburgh)',
    initials: 'PB',
    photo: '/doctorpadmanabhcard.avif',
    metaTitle: 'Dr. Padmanabh R. Bhat | General Surgeon in Bangalore',
    metaDescription:
      'Dr. Padmanabh R. Bhat is a consultant general surgeon at Chirag Global Hospitals, Bangalore, with 32+ years of surgical experience.',
    subtitle: 'MBBS, MS, FRCS, General Surgeon at Chirag Global Hospitals, Bangalore',
    bio: [
      'Dr. Padmanabh R. Bhat is a highly experienced Consultant Surgeon with over 32 years of surgical experience and 28 years of teaching experience. With strong academic and clinical expertise, he has contributed significantly to surgical education and research, alongside delivering safe and effective patient care.',
    ],
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
