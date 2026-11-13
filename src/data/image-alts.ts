// Alt text for every image on the site, by file path. Components call altFor(src) so an image
// has the same description wherever it appears. The title attribute is copied from the alt at
// build time (integrations/image-titles.mjs).
//
// Decorative images (icons next to a heading, video thumbnails beside their title) use ''
// so screen readers skip them; their meaning is already in the text next to them.

const ALTS: Record<string, string> = {
  // Brand, hospital and doctors
  '/chirag-logo.webp': 'Chirag Global Hospitals logo',
  '/experience-38-years.webp': 'Chirag Global Hospitals with 38+ years of healthcare experience',
  '/nabh-logo.webp': 'NABH Entry Level certification logo',
  '/chirag-doctors-team-1600.webp': 'Team of doctors at Chirag Global Hospitals',
  '/chirag-doctors-team-900.webp': 'Team of doctors at Chirag Global Hospitals',
  '/chirag hospital.webp': 'Chirag Global Hospitals building and entrance in BTM 2nd Stage, Bengaluru',
  '/doctorchiragcard.webp': 'Dr. Rajasekhar M. R., Founder and Chief Proctologist at Chirag Global Hospitals',
  '/doctorshreedevicard.webp': 'Dr. Shreedevi K. N., Gastroenterology and Colorectal Surgeon',
  '/doctorprithvicard.webp': 'Dr. Prithvija Chakravarthy, Proctologist at Chirag Global Hospitals',
  '/doctorsuchithracard.webp': 'Dr. Suchitra N. Adiga, Proctologist at Chirag Global Hospitals',
  '/doctorjyotsnacard.webp': 'Dr. Jyotsna Vemulapalli, General Surgeon at Chirag Global Hospitals',
  '/doctorpadmanabhcard.webp': 'Dr. Padmanabh R. Bhat, General Surgeon at Chirag Global Hospitals',
  '/chirag-chairman.webp': 'Dr. Rajasekhar M. R., Founder and Chairman of Chirag Global Hospitals',

  // Treatment images
  '/treatments/piles-hemorrhoids.webp': 'Piles treatment images illustrating swollen haemorrhoidal veins in the anal canal',
  '/treatments/fissure.webp': 'Anal fissure images depicting a split in the lining of the anus',
  '/treatments/fistula.webp': 'Anal fistula images depicting an abnormal passage between the anal canal and skin',
  '/treatments/pilonidal-sinus.webp': 'Pilonidal sinus images illustrating an infected sinus cavity beneath the skin',
  '/treatments/constipation.webp': 'Constipation images depicting accumulated stool in the colon and rectum',
  '/treatments/colon-cancer.webp': 'Colon cancer images illustrating tumour development within the large intestine',
  '/treatments/ulcerative-colitis.webp': 'Ulcerative colitis images depicting inflammation and ulcer formation in the colon',
  '/treatments/rectal-prolapse.webp': 'Rectal prolapse images illustrating the downward displacement of rectal tissue through the anus',

  // Technology images
  '/technologies/dghal.webp': 'Doppler HAL technology images showing equipment for identifying haemorrhoidal blood vessels',
  '/technologies/laser-treatment.webp': 'Laser surgery equipment images showing a medical laser system with digital controls',
  '/technologies/radiofrequency-surgery.webp': 'Radiofrequency surgery equipment images featuring an electrosurgical unit and connecting instruments',
  '/technologies/harmonic-surgery.webp': 'Harmonic scalpel technology images showing an ultrasonic generator and surgical handpiece',
  '/technologies/infrared-coagulation.webp': 'Infrared coagulation equipment images featuring a specialised treatment applicator',
  '/technologies/endoanal-ultrasound.webp': 'Endoanal ultrasound technology images showing diagnostic imaging equipment and display monitor',
  '/technologies/vrs-guided-surgery.webp': 'VRS guided surgery images featuring surgeons performing a procedure in an operating room',

  // Event and gallery photographs
  '/events/founders-day-2026/1.webp': 'Guests attending the Chirag Global Hospitals Founders Day 2026 celebration',
  '/events/founders-day-2026/2.webp': 'Guests participating in the ceremonial presentation at Chirag Global Hospitals Founders Day 2026',
  '/events/kscasicon-2026/1.webp': 'Dr. Rajasekhar M. R. at the KSCASICON 2026 medical conference',
  '/events/kscasicon-2026/2.webp': 'Medical professionals and dignitaries attending the KSCASICON 2026 conference',
  '/events/cme-goa-2026/1.webp': 'Dr. Rajasekhar M. R. honoured at the proctology CME conference in Goa',
  '/events/cme-goa-2026/2.webp': 'Traditional lamp-lighting ceremony at the proctology CME event in Goa',
  '/events/cme-goa-2026/3.webp': 'Dr. Rajasekhar M. R. delivering a presentation at the proctology CME in Goa',
  '/events/arogya-samvada-2025/1.webp': 'Dr. Rajasekhar M. R. receiving recognition at the Arogya Samvada health programme',
  '/events/arogya-samvada-2025/2.webp': 'Arogya Samvada 2025 health awareness programme featuring Dr. Rajasekhar M. R. on Republic TV Kannada',
  '/events/health-camp-maralegavi/1.webp': 'Community gathering with a religious leader at Shree Kshetra Maralegavi Mutt',
  '/events/health-camp-maralegavi/2.webp': 'Doctors providing medical consultations to attendees at the Maralegavi health camp',
  '/events/health-camp-maralegavi/3.webp': 'Medical team interacting with patients during consultations at the Maralegavi health camp',
  '/events/health-camp-maralegavi/4.webp': 'Healthcare staff assisting patients with registration and medical documentation at the Maralegavi health camp',
  '/events/health-camp-maralegavi/5.webp': 'Medical professionals conducting health examinations for an elderly attendee at Maralegavi',
  '/events/health-camp-maralegavi/6.webp': 'Blood pressure screening conducted during the Maralegavi community health camp',
  '/events/world-piles-day-2025/2.webp': 'Dr. Rajasekhar M. R. addressing attendees during the World Piles Day celebration',
  '/events/world-piles-day-2025/3.webp': 'Chirag Global Hospitals staff and guests at the Constipation Clinic entrance during World Piles Day',
  '/events/world-piles-day-2025/4.webp': 'Audience attending the World Piles Day awareness programme at Chirag Global Hospitals',
  '/events/world-piles-day-2025/5.webp': 'Guests listening to medical awareness presentations at the World Piles Day event',

  // Certificates and licences
  '/certificates/kpme-chirag-global.webp': 'Chirag Global Hospitals KPME registration certificate',
  '/certificates/nabh.webp': 'NABH Entry Level accreditation certificate of Chirag Global Hospitals',
  '/certificates/kpme-chiraayu-ayurveda.webp': 'Chiraayu Ayurveda KPME registration certificate',
  '/certificates/pcpndt-form-b.webp': 'PCPNDT Form B registration certificate for the ultrasound clinic',
  '/certificates/kspcb-bmw-authorization.webp': 'Karnataka State Pollution Control Board authorisation for biomedical waste management',
  '/certificates/bmw-destruction-certificate.webp': 'Biomedical waste destruction and disposal certificate',
  '/certificates/annual-report-1.webp': 'Biomedical waste annual report Form IV – Page 1',
  '/certificates/trade-licence-2026-27.webp': 'Chirag Global Hospitals trade licence for 2026–2027',
  '/certificates/trade-licence-2025-26.webp': 'Chirag Global Hospitals trade licence for 2025–2026',
  '/certificates/trade-licence-2024-25.webp': 'Chirag Global Hospitals trade licence for 2024–2025',
};

// Folders of decorative images: always alt=""
const DECORATIVE = ['/icons/', '/videos/'];

/**
 * Alt text for an image path. Decorative icons and video thumbnails get ''.
 * Images not listed above (e.g. blog covers) keep the `fallback` given by the component.
 */
export const altFor = (src: string | undefined, fallback = ''): string => {
  if (!src) return fallback;
  const path = decodeURI(src.split('?')[0]);
  if (DECORATIVE.some((d) => path.startsWith(d))) return '';
  if (ALTS[path] !== undefined) return ALTS[path];
  // Later pages of the biomedical waste annual report follow page 1's wording
  const page = path.match(/^\/certificates\/annual-report-(\d+)\.webp$/)?.[1];
  if (page) return `Biomedical waste annual report Form IV – Page ${page}`;
  return fallback;
};
