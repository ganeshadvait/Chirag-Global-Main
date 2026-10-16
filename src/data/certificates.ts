// Hospital certificates — documents from chiragglobalhospitals.com/hospital-certificates.
// Details (issuer, numbers, validity) are transcribed from the documents themselves.
// Files: /public/certificates/<slug>.webp (preview) and <slug>.pdf (original).
import type { IconName } from '../components/Icon.astro';

export type CertGroup = 'Accreditation' | 'Registration' | 'Statutory compliance' | 'Trade licence';

export const GROUPS: { key: CertGroup; icon: IconName; text: string }[] = [
  { key: 'Accreditation', icon: 'shield', text: 'Independent assessment of quality and patient safety.' },
  { key: 'Registration', icon: 'clipboard', text: 'Registration with the Government of Karnataka and district authorities.' },
  { key: 'Statutory compliance', icon: 'leaf', text: 'Safe handling and disposal of bio-medical waste.' },
  { key: 'Trade licence', icon: 'file', text: 'Annual trade licence from the Bengaluru city corporation (BBMP).' },
];

export interface Certificate {
  slug: string;
  title: string;
  group: CertGroup;
  issuer: string;
  /** Key reference shown on the card (number, validity) */
  details: { label: string; value: string }[];
  text: string;
  /** Extra pages shown in the viewer after the main preview */
  pages?: string[];
}

export const CERTIFICATES: Certificate[] = [
  {
    slug: 'nabh',
    title: 'NABH Entry Level certification',
    group: 'Accreditation',
    issuer: 'National Accreditation Board for Hospitals & Healthcare Providers (NABH)',
    details: [{ label: 'Includes', value: 'Certificate and scope of services' }],
    text: 'NABH certification recognises a hospital’s commitment to patient safety and quality of care, assessed against national standards.',
  },
  {
    slug: 'kpme-chirag-global',
    title: 'Certificate of Registration: Chirag Global Hospitals',
    group: 'Registration',
    issuer: 'Department of Health and Family Welfare Services, Government of Karnataka',
    details: [
      { label: 'Reg. no.', value: 'BLU08318ALHL3' },
      { label: 'Category', value: 'Hospital (Level 3), allopathy' },
    ],
    text: 'Registered under the Karnataka Private Medical Establishments (Amended) Act 2018 to provide medical services as a hospital.',
  },
  {
    slug: 'kpme-chiraayu-ayurveda',
    title: 'Certificate of Registration: Chiraayu Ayurveda',
    group: 'Registration',
    issuer: 'Department of Health and Family Welfare Services, Government of Karnataka',
    details: [{ label: 'Act', value: 'KPME (Amended) Act 2018' }],
    text: 'Registration for our Ayurveda unit, which provides integrated care alongside our surgical team.',
  },
  {
    slug: 'pcpndt-form-b',
    title: 'Form B: registration of our ultrasound clinic',
    group: 'Registration',
    issuer: 'Appropriate Authority, Bengaluru Urban District',
    details: [{ label: 'Valid until', value: '23 September 2029' }],
    text: 'Registration under the PC-PNDT Act, 1994, required for any facility that performs ultrasonography.',
  },
  {
    slug: 'kspcb-bmw-authorization',
    title: 'Authorization under the Bio-Medical Waste Management Rules, 2016',
    group: 'Statutory compliance',
    issuer: 'Karnataka State Pollution Control Board',
    details: [
      { label: 'Authorization no.', value: '209235' },
      { label: 'Valid from', value: '25 June 2024' },
    ],
    text: 'Authorizes the hospital to generate, collect, store and hand over bio-medical waste for safe treatment and disposal.',
  },
  {
    slug: 'bmw-destruction-certificate',
    title: 'Bio-medical waste destruction certificate',
    group: 'Statutory compliance',
    issuer: 'Maridi Bio (common bio-medical waste treatment facility)',
    details: [{ label: 'Dated', value: '6 May 2026' }],
    text: 'Confirms that bio-medical waste from the hospital was received and destroyed by an authorized treatment facility.',
  },
  {
    slug: 'annual-report',
    title: 'Annual Report (Form IV)',
    group: 'Statutory compliance',
    issuer: 'Submitted to the Karnataka State Pollution Control Board',
    details: [{ label: 'Pages', value: '4' }],
    text: 'The yearly report on bio-medical waste generated and disposed of, filed under Rule 13 of the Bio-Medical Waste Management Rules.',
    pages: ['/certificates/annual-report-2.webp', '/certificates/annual-report-3.webp', '/certificates/annual-report-4.webp'],
  },
  {
    slug: 'trade-licence-2026-27',
    title: 'Trade Licence 2026–2027',
    group: 'Trade licence',
    issuer: 'Bruhat Bengaluru Mahanagara Palike, Health Department',
    details: [
      { label: 'Licence no.', value: 'BO261883171931153030' },
      { label: 'Year', value: '2026–2027' },
    ],
    text: 'Renewal of the trade licence to operate the hospital at Dollar Layout, BTM 2nd Stage.',
  },
  {
    slug: 'trade-licence-2025-26',
    title: 'Trade Licence 2025–2026',
    group: 'Trade licence',
    issuer: 'Bruhat Bengaluru Mahanagara Palike, Health Department',
    details: [{ label: 'Year', value: '2025–2026' }],
    text: 'Trade licence for the year 2025–2026.',
  },
  {
    slug: 'trade-licence-2024-25',
    title: 'Trade Licence 2024–2025',
    group: 'Trade licence',
    issuer: 'Bruhat Bengaluru Mahanagara Palike, Health Department',
    details: [{ label: 'Year', value: '2024–2025' }],
    text: 'Trade licence for the year 2024–2025.',
  },
];

export const preview = (c: Certificate) => (c.slug === 'annual-report' ? '/certificates/annual-report-1.webp' : `/certificates/${c.slug}.webp`);
export const pdf = (c: Certificate) => `/certificates/${c.slug}.pdf`;
