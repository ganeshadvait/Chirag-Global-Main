// Home page content. Images live in /public/images; any missing image
// falls back to a brand gradient, so the page still renders cleanly.

export const IMAGES = {
  logo: '/Cirag-Logo-Header.png',
  hero: '/chirag%20all%20doctors.webp',
  building: '/chirag%20hospital.webp',
  nabh: '/NABH-Cirag-Logo-1024x717.png',
  experience: '/chitrag-38_transparent-logo.png',
  // Not supplied yet: these fall back to brand gradients / initials
  chairman: '/Chirag-Chairman.png',
};

export const STATS = [
  { value: '4.7', suffix: '★', label: 'from 1,428 Google reviews' },
  { value: '1986', label: 'Colorectal care since' },
  { value: '9', label: 'Doctors on one team' },
  { value: '8', label: 'Conditions treated' },
];

export const CONCERNS = [
  'Piles (haemorrhoids)',
  'Anal fissure',
  'Anal fistula',
  'Pilonidal sinus',
  'Rectal prolapse',
  'Constipation',
  'Ulcerative colitis',
  'Colon cancer',
  'Other / not sure',
];

export const ABOUT_FEATURES = [
  { icon: 'users', title: 'Experienced surgeon team', text: 'Colorectal specialists under one roof.' },
  { icon: 'zap', title: 'Minimally invasive care', text: 'Laser and advanced techniques where suitable.' },
  { icon: 'clock', title: 'Day-care procedures', text: 'Structured follow-up after treatment.' },
  { icon: 'lock', title: 'Private consultations', text: 'Respectful, one-to-one care.' },
] as const;

export const JOURNEY = [
  {
    icon: 'message',
    title: 'Consultation',
    text: 'A private, one-to-one conversation with a senior specialist about your symptoms and history.',
    cta: 'Start with step one',
  },
  {
    icon: 'search',
    title: 'Diagnosis',
    text: 'A gentle clinical examination and, where needed, tests to identify the exact condition.',
    cta: 'Book a diagnosis',
  },
  {
    icon: 'clipboard',
    title: 'Treatment plan',
    text: 'Your options explained clearly, including the procedure, recovery time and cost, before you decide.',
    cta: 'Discuss your plan',
  },
  {
    icon: 'activity',
    title: 'Procedure',
    text: 'Minimally invasive treatment, often as a day-care procedure, by the same team that diagnosed you.',
    cta: 'Ask about procedures',
  },
  {
    icon: 'smile',
    title: 'Recovery',
    text: 'Structured follow-up visits and diet guidance so you return to normal life with confidence.',
    cta: 'Plan your recovery',
  },
] as const;

// TODO: confirm permission to publish, or replace with recent reviews before launch
export const REVIEWS = [
  {
    quote:
      'Dr Rajasekhar sir helped me a lot in diagnosing and curing my problem. He took extra time and counseled my way out of my problem.',
    name: 'Kalyan',
    tag: 'Google review',
    tone: 'lavender',
  },
  {
    quote: 'Hospital environment also very good especially nursing staff is extremely good.',
    name: 'E S Naresh',
    tag: 'Fistula treatment',
    tone: 'cream',
  },
] as const;

export const VIDEOS = [
  {
    title: 'Chirag Global Hospitals in the news',
    speaker: 'Dr. Rajasekhar M. R., Founder',
    duration: '14:03',
    tag: 'In the news',
    youtubeId: '',
    thumb: 'from-brand-500 to-brand-700',
  },
  {
    title: 'Understanding anal fistula and its treatment',
    speaker: 'Dr. Suchitra N. Adiga, Proctologist',
    duration: '9:42',
    tag: 'Fistula',
    youtubeId: '',
    thumb: 'from-amber-300 to-amber-500',
  },
  {
    title: 'Rectal cancer: what you should know',
    speaker: 'Dr. Shreedevi K. N., Surgical Gastroenterologist',
    duration: '3:21',
    tag: 'Colorectal cancer',
    youtubeId: '',
    thumb: 'from-ink-700 to-brand-600',
  },
];

export const INTERNATIONAL = [
  {
    icon: 'file',
    label: 'Before you travel',
    heading: 'We review your case and prepare you for the trip.',
    points: [
      'Share reports online for a specialist review',
      'Treatment plan and cost estimate in advance',
      'Medical visa invitation letter and documents',
    ],
  },
  {
    icon: 'plane',
    label: 'Arrival in Bengaluru',
    heading: 'A smooth landing, with someone to meet you.',
    points: [
      'Airport pick-up on request',
      'Help with nearby accommodation',
      'A dedicated coordinator for your stay',
    ],
  },
  {
    icon: 'shield',
    label: 'Your treatment',
    heading: 'Specialist care with clear updates for your family.',
    points: [
      'Consultation and diagnosis on arrival',
      'Procedure by the colorectal team',
      'Regular updates in your preferred language where possible',
    ],
  },
  {
    icon: 'pin',
    label: 'Recovery and return',
    heading: 'Fit to fly, with follow-up from home.',
    points: [
      'Fitness-to-travel review before you leave',
      'Discharge summary and medical records',
      'Online follow-up consultations',
    ],
  },
] as const;

export const FAQS = [
  {
    q: 'Will my consultation be private?',
    a: 'Yes. Every consultation is one-to-one with a specialist in a private room, and your details are only seen by the care team.',
  },
  {
    q: 'Can I see a woman surgeon?',
    a: 'Yes. Our team includes women colorectal surgeons. Mention your preference when you book and we will arrange it.',
  },
  {
    q: 'Will I get a diagnosis on my first visit?',
    a: 'In most cases, yes. The specialist examines you during the first visit and explains what they find. If a test is needed, we tell you why before doing it.',
  },
  {
    q: 'What should I bring?',
    a: 'Bring any previous reports, prescriptions and a list of medicines you currently take, along with a photo ID.',
  },
  {
    q: 'Will I know the cost before treatment?',
    a: 'Yes. Once a treatment plan is agreed, we share a clear cost estimate before any procedure is scheduled.',
  },
];
