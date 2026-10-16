// Advanced Technologies page content — sourced from the hospital's live page
// (chiragglobalhospitals.com/advanced-technologies). Images in /public/technologies.
import type { IconName } from '../components/Icon.astro';

type Condition = 'piles' | 'fistula' | 'fissure' | 'pilonidal';

export const CONDITION_LABELS: Record<Condition, { label: string; slug: string }> = {
  piles: { label: 'Piles', slug: 'piles-hemorrhoids' },
  fistula: { label: 'Fistula', slug: 'fistula' },
  fissure: { label: 'Fissure', slug: 'fissure' },
  pilonidal: { label: 'Pilonidal sinus', slug: 'pilonidal-sinus' },
};

/** Minimally invasive proctology innovations */
export const INNOVATIONS: { icon: IconName; tag: string; title: string; text: string }[] = [
  {
    icon: 'target',
    tag: 'Early detection',
    title: 'CHIPRO Sign',
    text: 'Identifies anal gland infection early, detecting an intersphincteric sinus or abscess before a fistula forms, so treatment can be simpler.',
  },
  {
    icon: 'eye',
    tag: 'Visualisation',
    title: 'Visual Rectoscope System (VRS)',
    text: 'A pocket-sized, disposable high-resolution scope that connects to a smartphone for clear, real-time views of the anal canal.',
  },
  {
    icon: 'scan',
    tag: 'Imaging',
    title: '360° Fistula Scan',
    text: 'Endoanal ultrasound combined with a sonofistulogram, performed by the operating surgeon, to map the complete fistula tract and hidden extensions.',
  },
  {
    icon: 'activity',
    tag: 'Echo-guided surgery',
    title: 'CEREG Procedure',
    text: 'Circumferential Endoanal Real-Time Echo Guided surgery: real-time ultrasound guides the surgeon to the tract while protecting sphincter function.',
  },
  {
    icon: 'zap',
    tag: 'Laser',
    title: 'Laser precision treatment',
    text: 'A fine laser fibre delivers controlled energy to treat piles, fistula and pilonidal sinus, avoiding large open wounds where suitable.',
  },
  {
    icon: 'clipboard',
    tag: 'Diagnosis',
    title: 'Evidence-based diagnosis',
    text: 'Clinical examination combined with visual documentation improves accuracy, avoids unnecessary procedures and guides the treatment plan.',
  },
];

/** Visual Rectoscope System spotlight */
export const VRS = {
  features: [
    'High-resolution imaging of the anal canal and lower rectum',
    'Camera locking keeps the focal distance stable',
    'Plugs into a smartphone (USB, micro USB or Type-C)',
    'Image and video capture for documentation',
    'Disposable scopes for better hygiene',
    'Lets you see and understand your own condition',
  ],
  specs: [
    { label: 'Resolution', value: 'HD, real-time' },
    { label: 'Type', value: 'Disposable' },
    { label: 'Connectivity', value: 'USB / Type-C' },
    { label: 'Portability', value: 'Pocket-sized' },
  ],
};

/** 360° Fistula Scan protocol */
export const FISTULA_SCAN = {
  image: '/technologies/endoanal-ultrasound.webp',
  benefits: [
    'Maps the full extent of the disease',
    'Identifies hidden tract extensions',
    'Helps plan definitive treatment',
    'Reduces the risk of incomplete treatment and recurrence',
    'Performed directly by the operating surgeon',
  ],
};

export interface Procedure {
  short: string;
  name: string;
  text: string;
  image: string;
  /** 'cover' for photos; 'contain' for product shots on dark backgrounds */
  fit: 'cover' | 'contain';
  conditions: Condition[];
}

/** Advanced procedures — most are day-care */
export const PROCEDURES: Procedure[] = [
  {
    short: 'DGHAL',
    name: 'Doppler-guided HAL',
    text: 'A Doppler probe locates and ties off the arteries feeding the piles, treating the cause with less post-operative pain and no large wounds.',
    image: '/technologies/dghal.webp',
    fit: 'contain',
    conditions: ['piles'],
  },
  {
    short: 'Laser',
    name: 'Laser treatment',
    text: 'A fine laser fibre ablates or seals diseased tissue with precision. Used for piles, fistula and pilonidal sinus.',
    image: '/technologies/laser-treatment.webp',
    fit: 'cover',
    conditions: ['piles', 'fistula', 'pilonidal'],
  },
  {
    short: 'RF surgery',
    name: 'Radiofrequency surgery',
    text: 'High-frequency energy cuts and coagulates at the same time, reducing bleeding and supporting faster healing.',
    image: '/technologies/radiofrequency-surgery.webp',
    fit: 'cover',
    conditions: ['piles', 'fistula', 'fissure'],
  },
  {
    short: 'Harmonic',
    name: 'Harmonic (ultrasonic) surgery',
    text: 'Ultrasonic energy cuts and seals tissue together, with excellent control of bleeding and minimal heat injury. Used for piles and skin tags.',
    image: '/technologies/harmonic-surgery.webp',
    fit: 'contain',
    conditions: ['piles'],
  },
  {
    short: 'IRC',
    name: 'Infrared coagulation',
    text: 'Controlled infrared energy shrinks piles by reducing their blood supply. Used for first- and second-degree piles.',
    image: '/technologies/infrared-coagulation.webp',
    fit: 'cover',
    conditions: ['piles'],
  },
  {
    short: 'VRS-guided',
    name: 'Visual-guided surgery',
    text: 'Real-time visual guidance helps the surgeon locate internal openings, so treatment is complete.',
    image: '/technologies/vrs-guided-surgery.webp',
    fit: 'cover',
    conditions: ['fistula', 'pilonidal'],
  },
];

/** Principles of surgery */
export const PRINCIPLES: { title: string; text: string }[] = [
  { title: 'Preserve sphincter function', text: 'Protecting continence and avoiding long-term complications is a priority in every procedure.' },
  { title: 'Treat the disease completely', text: 'Incomplete treatment is the main cause of recurrence, so the full extent of disease is identified first.' },
  { title: 'Minimal tissue damage', text: 'Technology reduces trauma to healthy tissue, supporting healing and function.' },
  { title: 'Individualised treatment', text: 'Chosen for your diagnosis, the extent of disease, your overall health and your Prakruthi.' },
  { title: 'Day-care and early recovery', text: 'Planned day-care procedures allow early mobilisation and shorter hospital stays.' },
  { title: 'Informed decisions', text: 'You get a full explanation of your diagnosis, options, benefits and limitations before deciding.' },
];

/** "Right treatment, not just surgery" pillars */
export const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'search', title: 'Precise diagnosis', text: 'Protocol-based, evidence-driven assessment supported by VRS technology.' },
  { icon: 'layers', title: 'Tailored treatment', text: 'A plan for you, combining surgery, medical management and Ayurveda where helpful.' },
  { icon: 'leaf', title: 'Long-term recovery', text: 'Post-operative Ayurvedic support and lifestyle guidance for lasting healing.' },
];
