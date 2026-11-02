// Home page content. Images live in /public/images; any missing image
// falls back to a brand gradient, so the page still renders cleanly.

export const IMAGES = {
  // WebP versions sized for display (originals: Cirag-Logo-Header.png, NABH-Cirag-Logo-1024x717.png,
  // chitrag-38_transparent-logo.png, Chirag-Chairman.png)
  logo: '/chirag-logo.webp',
  hero: '/chirag%20all%20doctors.webp',
  building: '/chirag%20hospital.webp',
  nabh: '/nabh-logo.webp',
  experience: '/experience-38-years.webp',
  chairman: '/chirag-chairman.webp',
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
  { icon: 'users', title: 'Expert surgeon team', text: 'Colorectal specialists under one roof.' },
  { icon: 'zap', title: 'Minimally invasive treatment', text: 'Laser and advanced techniques where suitable.' },
  { icon: 'clock', title: 'Day-care procedures', text: 'Go home the same day where suitable.' },
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

// Google reviews, quoted word for word (including reviewers' own spelling).
// TODO: confirm permission to publish before launch
export const REVIEWS = [
  {
    quote:
      "As a software employee, I had piles for 7 months. At Chirag Hospital, doctors explained everything clearly and suggested medicines, diet, and yoga. Within a week, my pain reduced, and now I'm doing well. Friendly doctors and caring staff—highly recommended.",
    name: 'Syam',
    tag: 'Google review',
    tone: 'lavender',
  },
  {
    quote:
      'Dr. Rajasekhar and his team are amazing—friendly, caring, and attentive. My piles surgery was handled smoothly by Dr. Rajasekhar and Dr. Pruthvija, and billing issues were resolved quickly. Highly recommend Chirag Hospital.',
    name: 'Abddul',
    tag: 'Google review',
    tone: 'cream',
  },
  {
    quote:
      'I had a great experience with Dr. Rajasekhar and team. Very supportive and professional staff. Recovery was smooth and comfortable. Highly recommended for piles treatment.',
    name: 'Sai',
    tag: 'Google review',
    tone: 'lavender',
  },
  {
    quote:
      "I had piles for 2 years. After treatment with Dr. Rajasekhar, I'm fully recovered. Treatment quality is excellent and worth it.",
    name: 'Abddul',
    tag: 'Google review',
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
      'Medical visa invitation letter and document support',
    ],
  },
  {
    icon: 'plane',
    label: 'Arrival in Bangalore',
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
      'Consultation and diagnosis on arrival at our Bangalore hospital',
      'Procedure by our colorectal and proctology team',
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
      'Online follow-up consultations after you return home',
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

// Homepage FAQs
export const HOME_FAQS = [
  {
    q: 'Which is the best hospital for piles treatment in Bangalore?',
    a: 'Chirag Global Hospitals in BTM Layout has treated piles, fissure and fistula since 1986, with a dedicated team of proctologists and colorectal surgeons. The best hospital for you is one where the doctor explains your options clearly, so meet the team before you decide.',
  },
  {
    q: 'When should I see a doctor for piles?',
    a: 'See a doctor if you have bleeding during or after a motion, pain, a lump near the anus, or itching that does not settle. Do not assume bleeding is piles, because other conditions can cause it. An examination is the only way to know.',
  },
  {
    q: 'Is piles surgery a day-care procedure?',
    a: 'Many piles treatments, including laser and DG-HAL with RAR, can be done as day-care where suitable. Your doctor will confirm after examining you.',
  },
  {
    q: 'Will my consultation be private?',
    a: 'Yes. Every consultation is one-to-one with a specialist in a private room, and your details are only seen by the care team.',
  },
  {
    q: 'Will I know the cost before treatment?',
    a: 'Yes. Once a treatment plan is agreed, we share a clear cost estimate before any procedure is scheduled.',
  },
];
