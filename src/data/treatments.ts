import type { FaqItem } from '../lib/utils';

export interface TreatmentOption {
  name: string;
  text: string; // 1–2 sentences
}

export interface Treatment {
  slug: string;
  name: string; // page title, e.g. 'Piles (haemorrhoids)'
  navLabel: string; // menu label
  short: string; // one sentence for cards (max ~20 words)
  image?: string;
  overview: string[]; // 2 paragraphs, plain language
  symptoms: string[]; // 5–7 short bullet items
  causes: string[]; // 4–6 short bullet items
  options: TreatmentOption[]; // 3–5 items
  recovery: string[]; // 3–5 short bullet items
  whenToSee: string; // 1–2 sentences: warning signs
  faqs: FaqItem[]; // exactly 3
}

export const TREATMENTS_LIST: Treatment[] = [
  {
    slug: 'piles-hemorrhoids',
    navLabel: 'Piles/Hemorrhoids',
    name: 'Piles (haemorrhoids)',
    short:
      'Swollen veins causing pain and bleeding, treated with laser and DG-HAL with RAR as a day-care procedure where suitable.',
    image: '/piles.webp',
    overview: [
      "Piles, or haemorrhoids, are swollen blood vessels in and around the back passage (anus and lower rectum). They are very common, affect people of all ages, and are nothing to be embarrassed about. Many people live with them for years before seeking help, but most cases can be treated effectively.",
      "Piles can be internal (inside the back passage) or external (under the skin around the anus). Mild piles often settle with simple changes to diet and toilet habits. Larger or persistent piles may need a procedure. At Chirag Global Hospitals, your specialist will examine you privately, explain what is causing your symptoms and discuss the options that suit you.",
    ],
    symptoms: [
      'Bright red blood on toilet paper or in the pan after passing stool',
      'Itching or irritation around the anus',
      'A lump or swelling near the anus',
      'Discomfort, aching or pain, especially when sitting',
      'A feeling that the bowel has not fully emptied',
      'Mucus discharge or soiling of underwear',
    ],
    causes: [
      'Straining on the toilet, often due to constipation',
      'A low-fibre diet and not drinking enough fluids',
      'Sitting on the toilet for long periods',
      'Pregnancy and childbirth',
      'Long-standing diarrhoea',
      'Heavy lifting and ageing, which can weaken supporting tissues',
    ],
    options: [
      {
        name: 'Diet and lifestyle changes',
        text: 'More fibre, enough water and avoiding straining can ease symptoms and help mild piles settle. These steps also help prevent piles from returning after treatment.',
      },
      {
        name: 'Medicines',
        text: 'Stool softeners, soothing creams or suppositories and pain relief may be suggested to control symptoms. These relieve discomfort but do not remove larger piles.',
      },
      {
        name: 'Laser treatment',
        text: 'Laser treatment uses focused energy to shrink the piles tissue. Where suitable, it can be done as a day-care procedure.',
      },
      {
        name: 'DG-HAL with RAR',
        text: 'Doppler-guided haemorrhoidal artery ligation with recto-anal repair reduces the blood supply to the piles and lifts prolapsing tissue back into place, without cutting away the piles. It may be suitable for certain internal piles.',
      },
      {
        name: 'Surgery (haemorrhoidectomy)',
        text: 'For large or complicated piles, your surgeon may recommend surgical removal. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Most people can go home the same day after a day-care procedure, where suitable',
      'Some discomfort is normal for a few days and is managed with pain relief',
      'A high-fibre diet, fluids and stool softeners help keep stools soft while you heal',
      'Warm sitz baths can ease soreness and keep the area clean',
      'A follow-up visit lets your doctor check healing and answer your questions',
    ],
    whenToSee:
      'Bleeding from the back passage should always be checked by a doctor, as it can have other causes. Seek prompt care for heavy or continuing bleeding, severe pain, a hard painful lump, fever, or a change in bowel habit lasting more than a few weeks.',
    faqs: [
      {
        q: 'Is the examination painful?',
        a: 'The examination is usually quick and gentle, and is done in a private room. Your doctor will explain each step beforehand, and you can ask for a pause at any time.',
      },
      {
        q: 'Can piles be treated without surgery?',
        a: 'Yes, many mild piles improve with diet changes, fluids and medicines. Larger or persistent piles may need a procedure, and your specialist will advise you after an examination.',
      },
      {
        q: 'Will piles come back after treatment?',
        a: 'Piles can return, particularly if constipation and straining continue. Keeping stools soft with fibre and fluids and not sitting on the toilet for long periods helps reduce this chance.',
      },
    ],
  },
  {
    slug: 'fissure',
    navLabel: 'Fissure',
    name: 'Anal fissure',
    short: 'A small tear causing sharp pain, treated with care for lasting comfort.',
    image: '/anal%20fissure.webp',
    overview: [
      "An anal fissure is a small tear in the thin, delicate lining of the anus. It often causes a sharp, cutting pain when passing stool, which can last for some time afterwards. Fissures are common and, although they can be very uncomfortable, they are treatable.",
      "Many fissures are short-lived (acute) and heal within a few weeks with simple measures. If a fissure does not heal, it may become long-standing (chronic), and the muscle around the anus can go into spasm, which slows healing. Our specialists offer specialised care for fissures, starting with gentle, non-surgical treatment wherever possible.",
    ],
    symptoms: [
      'Sharp pain during and after passing stool',
      'A burning or aching pain that can last for minutes or hours',
      'Small amounts of bright red blood on toilet paper',
      'Itching or irritation around the anus',
      'A small lump or skin tag near the tear in long-standing fissures',
      'Avoiding going to the toilet because of the pain',
    ],
    causes: [
      'Passing hard or large stools, often due to constipation',
      'Straining during bowel movements',
      'Ongoing diarrhoea',
      'Childbirth',
      'Tight anal sphincter muscles, which reduce blood flow and slow healing',
      'Less commonly, other bowel conditions such as inflammatory bowel disease',
    ],
    options: [
      {
        name: 'Diet and toilet habits',
        text: 'Keeping stools soft with fibre, fluids and stool softeners reduces strain on the tear and helps it heal. Warm sitz baths can relax the area and ease pain.',
      },
      {
        name: 'Medicated ointments',
        text: 'Prescription ointments can relax the anal muscle and improve blood flow so the fissure can heal. Local anaesthetic creams may also ease pain.',
      },
      {
        name: 'Procedures for chronic fissures',
        text: 'If a fissure does not heal with medicines, your surgeon may recommend a procedure to relax the anal muscle, such as a carefully performed sphincterotomy. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Most fissures improve gradually over a few weeks with the right care',
      'Keeping stools soft is the most important step during healing and afterwards',
      'Warm sitz baths and prescribed ointments help ease discomfort',
      'If a procedure is needed, most people return to normal activities fairly soon, as advised by the surgeon',
      'Follow-up visits allow your doctor to check that the fissure has healed',
    ],
    whenToSee:
      'See a doctor if pain or bleeding does not settle within a week or two, or if you have heavy bleeding, fever, discharge, or a change in bowel habit lasting more than a few weeks.',
    faqs: [
      {
        q: 'Is the examination painful?',
        a: 'Because a fissure can be tender, your doctor will be very gentle and may only need to look at the area at first. Your comfort and privacy are respected throughout.',
      },
      {
        q: 'Can a fissure heal without surgery?',
        a: 'Yes, many fissures heal with stool softeners, diet changes, sitz baths and medicated ointments. Surgery is usually considered only when a fissure does not heal with these measures.',
      },
      {
        q: 'Will it come back?',
        a: 'A fissure can return if hard stools or straining continue. Keeping your bowel habits regular and stools soft is the best way to lower this risk.',
      },
    ],
  },
  {
    slug: 'fistula',
    navLabel: 'Fistula',
    name: 'Anal fistula',
    short: 'An infected tunnel, treated with fistulotomy, fistulectomy and advanced options.',
    image: '/anal%20fistula.webp',
    overview: [
      "An anal fistula is a small tunnel that forms between the inside of the back passage and the skin near the anus. It usually develops after an anal abscess (a collection of pus) that has burst or been drained. Fistulas are not caused by poor hygiene, and they are a well-recognised, treatable condition.",
      "Fistulas rarely heal on their own, so most need a procedure. Some fistulas are simple and close to the skin, while others are complex and pass through more of the sphincter muscle that controls bowel control. Your surgeon will assess the fistula carefully and plan treatment that aims to heal it while protecting continence.",
    ],
    symptoms: [
      'An opening in the skin near the anus that may discharge pus or blood',
      'Repeated abscesses around the anus',
      'Pain and swelling around the anus, especially when sitting',
      'Skin irritation or itching from discharge',
      'Staining of underwear',
      'Fever or feeling unwell when an abscess forms',
    ],
    causes: [
      'A previous anal abscess, which is the most common cause',
      'Infection of the small glands inside the anus',
      "Inflammatory bowel conditions such as Crohn's disease",
      'Previous surgery or injury in the area',
      'Less commonly, infections such as tuberculosis',
    ],
    options: [
      {
        name: 'Assessment and imaging',
        text: 'Your surgeon will examine the area and may arrange scans such as an MRI to map the path of the fistula. This helps in planning the safest treatment.',
      },
      {
        name: 'Fistulotomy',
        text: 'For many simple fistulas, the tunnel is opened along its length so that it can heal from the inside out. This is often used when only a small amount of muscle is involved.',
      },
      {
        name: 'Fistulectomy',
        text: 'The fistula tract is carefully removed. This may be used for simple or complex fistulas, depending on their position.',
      },
      {
        name: 'Seton and other sphincter-saving options',
        text: 'For complex fistulas, your surgeon may place a seton (a soft thread) to help drainage, or use other techniques designed to protect the sphincter muscle. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Many fistula procedures can be done as day-care procedures, where suitable',
      'Wound care and regular sitz baths help keep the area clean while it heals',
      'Healing takes place gradually, and dressings may be needed for a while',
      'Pain relief and stool softeners help keep you comfortable',
      'Regular follow-up visits allow your surgeon to check healing closely',
    ],
    whenToSee:
      'Seek prompt medical care if you have increasing pain, swelling, redness or fever around the anus, as these can be signs of an abscess that needs draining.',
    faqs: [
      {
        q: 'Can a fistula heal on its own?',
        a: 'It is uncommon for an anal fistula to heal without treatment. Most people need a procedure, and your surgeon will discuss the most suitable approach for your fistula.',
      },
      {
        q: 'Will surgery affect my bowel control?',
        a: 'Protecting bowel control is a key part of planning fistula treatment. Your surgeon will choose an approach based on how much muscle is involved and will explain any risks before treatment.',
      },
      {
        q: 'Will it come back?',
        a: 'Fistulas can sometimes return, especially complex ones. Careful assessment, following wound care advice and attending follow-up visits help give the best chance of healing.',
      },
    ],
  },
  {
    slug: 'constipation',
    navLabel: 'Constipation',
    name: 'Constipation',
    short: 'Infrequent or difficult bowel movements, assessed carefully and managed with diet, medicines and specialist care.',
    image: '/treatments/constipation.webp',
    overview: [
      "Constipation means passing stools less often than usual, or having stools that are hard, dry and difficult to pass. It is very common and affects people of all ages. Occasional constipation is usually not serious, but long-term constipation can affect your comfort and quality of life.",
      "Constipation can also lead to other problems such as piles and fissures. Most cases improve with changes to diet and routine, and sometimes medicines. If constipation is long-standing or comes with other symptoms, your specialist may recommend tests to find the cause.",
    ],
    symptoms: [
      'Passing stools fewer than three times a week',
      'Hard, dry or lumpy stools',
      'Straining to pass stools',
      'A feeling that the bowel has not fully emptied',
      'Bloating or tummy discomfort',
      'Needing to spend a long time on the toilet',
    ],
    causes: [
      'Not eating enough fibre or drinking enough fluids',
      'Lack of physical activity',
      'Ignoring the urge to go to the toilet',
      'Some medicines, such as certain painkillers and iron tablets',
      'Pregnancy, changes in routine, or stress',
      'Less commonly, underlying conditions such as thyroid problems or problems with the pelvic floor muscles',
    ],
    options: [
      {
        name: 'Diet and lifestyle',
        text: 'Increasing fibre gradually, drinking enough water and staying active often help. A regular toilet routine and not ignoring the urge to go can also make a difference.',
      },
      {
        name: 'Medicines',
        text: 'Your doctor may suggest fibre supplements, stool softeners or laxatives for a period of time. These should be used as advised.',
      },
      {
        name: 'Tests where needed',
        text: 'If constipation is persistent or there are warning signs, tests such as blood tests or a colonoscopy may be recommended to look for an underlying cause.',
      },
      {
        name: 'Treating related problems',
        text: 'Where constipation has led to piles, fissures or problems with emptying the bowel, these can be assessed and treated. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Improvements from diet and routine changes often build up over a few weeks',
      'Your doctor may adjust medicines depending on how you respond',
      'Keeping a simple diary of bowel habits can help guide treatment',
      'Follow-up visits help make sure the cause has been properly addressed',
    ],
    whenToSee:
      'See a doctor promptly if constipation is new and lasts more than a few weeks, or comes with blood in the stool, unexplained weight loss, severe tummy pain, vomiting, or being unable to pass wind.',
    faqs: [
      {
        q: 'How often should I pass stools?',
        a: 'Normal bowel habits vary from person to person, from a few times a day to a few times a week. What matters most is a change from what is normal for you, or difficulty passing stools.',
      },
      {
        q: 'Is it safe to take laxatives regularly?',
        a: 'Many laxatives are safe when used as advised, but long-term use should be guided by a doctor. Your doctor can recommend the right type and help address the underlying cause.',
      },
      {
        q: 'Will I need a colonoscopy?',
        a: 'Not everyone with constipation needs a colonoscopy. It may be recommended if you have warning signs such as bleeding, weight loss, a recent change in bowel habit, or a family history of bowel cancer.',
      },
    ],
  },
  {
    slug: 'colon-cancer',
    navLabel: 'Colon Cancer',
    name: 'Colon cancer',
    short: 'Early assessment and colonoscopy for bowel symptoms, with treatment planned alongside the specialist team.',
    image: '/treatments/colon-cancer.webp',
    overview: [
      "Colon cancer, also called bowel or colorectal cancer, starts in the large bowel (colon) or rectum. It often develops slowly from small growths called polyps. Finding and removing polyps, or detecting cancer early, gives the best chance of successful treatment.",
      "Many bowel symptoms are caused by common conditions such as piles, but some symptoms should always be checked. Our colorectal specialists can assess your symptoms, arrange a colonoscopy where needed and, if cancer is found, plan your treatment with the wider specialist team.",
    ],
    symptoms: [
      'Blood in the stool or bleeding from the back passage',
      'A change in bowel habit lasting more than a few weeks',
      'Tummy pain, bloating or discomfort that does not go away',
      'Unexplained weight loss',
      'Tiredness or breathlessness, which can be signs of anaemia',
      'A feeling that the bowel has not fully emptied',
    ],
    causes: [
      'Increasing age, particularly over 50, though it can occur in younger people',
      'A family history of bowel cancer or polyps',
      'Long-standing inflammatory bowel disease, such as ulcerative colitis',
      'A diet high in red and processed meat and low in fibre',
      'Smoking, heavy alcohol use and being overweight',
      'Certain inherited genetic conditions',
    ],
    options: [
      {
        name: 'Assessment and colonoscopy',
        text: 'A colonoscopy allows the doctor to look inside the bowel, take small samples (biopsies) and often remove polyps. It is the key test for diagnosing bowel cancer.',
      },
      {
        name: 'Further tests',
        text: 'If cancer is found, scans and blood tests help work out its stage. This information guides treatment planning.',
      },
      {
        name: 'Surgery',
        text: 'Surgery to remove the affected part of the bowel is a common treatment for colon cancer. Whether it is suitable depends on the stage and your overall health.',
      },
      {
        name: 'Multidisciplinary care',
        text: 'Treatment may also include chemotherapy or radiotherapy, planned together with oncology specialists. Your specialist will explain which option suits you and coordinate referrals where needed.',
      },
    ],
    recovery: [
      'Recovery depends on the type of treatment and the stage of the cancer',
      'Your care team will guide you on diet, activity and wound care after any surgery',
      'Regular follow-up, which may include scans and colonoscopy, is an important part of care',
      'Support for you and your family is available throughout treatment',
    ],
    whenToSee:
      'See a doctor promptly if you notice blood in your stool, a change in bowel habit lasting more than a few weeks, unexplained weight loss, or ongoing tummy pain. These symptoms are often caused by other conditions, but they should always be checked.',
    faqs: [
      {
        q: 'Does bleeding from the back passage mean I have cancer?',
        a: 'Most bleeding is caused by common conditions such as piles or fissures. However, bleeding should always be checked by a doctor so that more serious causes can be ruled out.',
      },
      {
        q: 'Is a colonoscopy uncomfortable?',
        a: 'A colonoscopy is usually done with sedation to help you feel relaxed and comfortable. Your doctor will explain the bowel preparation and what to expect beforehand.',
      },
      {
        q: 'Can bowel cancer be prevented?',
        a: 'Not all bowel cancer can be prevented, but finding and removing polyps can lower the risk. A healthy diet, regular activity, not smoking and getting symptoms checked early all help.',
      },
    ],
  },
  {
    slug: 'pilonidal-sinus',
    navLabel: 'Pilonidal Sinus',
    name: 'Pilonidal sinus',
    short: 'A painful cyst near the tailbone, treated minimally invasively.',
    image: '/pilonidal%20sinus.webp',
    overview: [
      "A pilonidal sinus is a small hole or tunnel in the skin at the top of the cleft between the buttocks, near the tailbone. It often contains hair and skin debris, and can become infected, forming a painful abscess. It is most common in young adults, especially men, and in people with thick body hair.",
      "Some pilonidal sinuses cause no symptoms, while others lead to repeated infections. Treatment depends on whether the sinus is infected and how often it causes problems. Minimally invasive options can be used where suitable, and your surgeon will discuss the approach that best fits your situation.",
    ],
    symptoms: [
      'Pain and swelling near the tailbone',
      'One or more small pits or openings in the skin at the top of the buttock cleft',
      'Discharge of pus or blood, which may have an unpleasant smell',
      'Redness and tenderness around the area',
      'Pain when sitting',
      'Fever or feeling unwell when the area is infected',
    ],
    causes: [
      'Loose hairs pushing into the skin of the buttock cleft',
      'Friction and pressure, such as from prolonged sitting',
      'Thick or coarse body hair',
      'Sweating and a deep buttock cleft',
      'Being overweight',
    ],
    options: [
      {
        name: 'Drainage of an abscess',
        text: 'If the area is infected and has formed an abscess, it may need to be drained to relieve pain. This is often the first step before definitive treatment.',
      },
      {
        name: 'Minimally invasive treatment',
        text: 'Where suitable, minimally invasive techniques can clean out the sinus tract through small openings. These aim to reduce wound size and help a quicker return to normal activities.',
      },
      {
        name: 'Surgical excision',
        text: 'For larger or recurrent sinuses, your surgeon may recommend removing the sinus tract, with the wound either closed or left to heal from below. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Recovery time depends on the type of procedure and size of the wound',
      'Keeping the area clean and dry helps healing',
      'Regular dressing changes may be needed for a period of time',
      'Hair removal around the area may be advised to lower the chance of recurrence',
      'Follow-up visits allow your surgeon to check that the wound is healing well',
    ],
    whenToSee:
      'Seek prompt care if you have increasing pain, swelling, redness or discharge near the tailbone, or fever, as these may be signs of an infection or abscess.',
    faqs: [
      {
        q: 'Will a pilonidal sinus go away on its own?',
        a: 'A pilonidal sinus that causes no symptoms may not need treatment. However, if it becomes infected or keeps causing problems, it usually needs treatment from a surgeon.',
      },
      {
        q: 'Will it come back?',
        a: 'Pilonidal sinus can return after treatment. Following wound care advice, keeping the area clean and hair-free, and attending follow-up visits help reduce this chance.',
      },
      {
        q: 'How soon can I go back to work or college?',
        a: 'This depends on the type of procedure and your type of work. Your surgeon will give you personalised advice about returning to sitting, work and exercise.',
      },
    ],
  },
  {
    slug: 'ulcerative-colitis',
    navLabel: 'Ulcerative Colitis',
    name: 'Ulcerative colitis',
    short: 'A long-term inflammatory condition of the bowel, diagnosed carefully and managed with ongoing specialist care.',
    image: '/treatments/ulcerative-colitis.webp',
    overview: [
      "Ulcerative colitis is a long-term condition in which the lining of the large bowel (colon) and rectum becomes inflamed and develops small ulcers. It is a type of inflammatory bowel disease (IBD). Symptoms often come and go, with periods of flare-ups and periods of few or no symptoms (remission).",
      "There is currently no simple cure, but with the right diagnosis and treatment, many people control their symptoms well and lead full lives. Diagnosis usually involves a colonoscopy with biopsies, and treatment is planned with your specialist team and adjusted over time.",
    ],
    symptoms: [
      'Diarrhoea, often with blood or mucus',
      'An urgent need to pass stools',
      'Tummy pain and cramping',
      'Needing to pass stools frequently, including at night',
      'Tiredness and loss of appetite',
      'Weight loss',
      'Sometimes joint pain, mouth ulcers or eye irritation',
    ],
    causes: [
      'The exact cause is not fully understood',
      'An overactive immune response in the bowel',
      'Genetic factors, as it can run in families',
      'Environmental factors that may trigger the condition in some people',
      'It is not caused by stress or diet, though these may affect symptoms',
    ],
    options: [
      {
        name: 'Diagnosis with colonoscopy',
        text: 'A colonoscopy with biopsies helps confirm the diagnosis and shows how much of the bowel is affected. Blood and stool tests may also be needed.',
      },
      {
        name: 'Medicines',
        text: 'Medicines that reduce inflammation are the main treatment and may be used to settle flare-ups and keep the condition in remission. The choice of medicine depends on how severe and widespread the inflammation is.',
      },
      {
        name: 'Ongoing monitoring',
        text: 'Regular reviews help adjust treatment and check for complications. People with long-standing colitis may be advised to have periodic colonoscopies.',
      },
      {
        name: 'Surgery in some cases',
        text: 'If medicines do not control the condition or complications develop, surgery may be considered, planned with the wider specialist team. Your specialist will explain which option suits you after an assessment.',
      },
    ],
    recovery: [
      'Ulcerative colitis is managed over the long term rather than cured with a single treatment',
      'Taking medicines as prescribed, even when you feel well, helps prevent flare-ups',
      'Regular follow-up and blood tests help monitor your condition and treatment',
      'Your doctor can advise on diet and lifestyle during flare-ups and remission',
    ],
    whenToSee:
      'Seek urgent medical care if you have severe or bloody diarrhoea many times a day, fever, a fast heartbeat, severe tummy pain or swelling, or signs of dehydration.',
    faqs: [
      {
        q: 'Is ulcerative colitis the same as irritable bowel syndrome (IBS)?',
        a: 'No. Ulcerative colitis causes inflammation and ulcers in the bowel lining that can be seen on colonoscopy, while IBS does not. They are managed differently, so an accurate diagnosis is important.',
      },
      {
        q: 'Can ulcerative colitis be cured?',
        a: 'There is no simple cure, but many people keep the condition well controlled with medicines and regular follow-up. Your specialist will work with you to find a treatment plan that suits you.',
      },
      {
        q: 'Does ulcerative colitis increase the risk of bowel cancer?',
        a: 'Long-standing ulcerative colitis can slightly increase the risk of bowel cancer. This is why regular follow-up and, where advised, periodic colonoscopy are recommended.',
      },
    ],
  },
  {
    slug: 'rectal-prolapse',
    navLabel: 'Rectal Prolapse',
    name: 'Rectal prolapse',
    short: 'When the rectum slips out through the anus, assessed privately and treated with suitable surgical options.',
    image: '/treatments/rectal-prolapse.webp',
    overview: [
      "Rectal prolapse happens when part or all of the rectum (the last part of the bowel) slips down and comes out through the anus. At first it may only happen when passing stools and go back on its own, but over time it may need to be pushed back or may stay outside.",
      "Rectal prolapse is more common in older women, but it can affect anyone. It can feel distressing and embarrassing, but it is a recognised condition that specialists treat regularly. Treatment usually involves surgery, and your surgeon will explain the options in a private consultation.",
    ],
    symptoms: [
      'A lump or bulge coming out of the anus, especially when passing stools',
      'Needing to push the lump back in',
      'Mucus or blood discharge from the back passage',
      'Leakage of stool or difficulty controlling the bowels',
      'Constipation or a feeling of incomplete emptying',
      'Discomfort or a dragging feeling in the back passage',
    ],
    causes: [
      'Long-term straining due to constipation',
      'Weakening of the pelvic floor muscles with age',
      'Pregnancy and childbirth',
      'Previous surgery in the pelvic area',
      'Long-term diarrhoea or chronic coughing',
    ],
    options: [
      {
        name: 'Assessment',
        text: 'Your specialist will examine you privately and may arrange tests to check the bowel and pelvic floor. This helps confirm the diagnosis and rule out other causes such as large piles.',
      },
      {
        name: 'Managing bowel habits',
        text: 'Treating constipation, avoiding straining and pelvic floor exercises can help with symptoms, especially in mild cases or while waiting for surgery.',
      },
      {
        name: 'Surgery through the abdomen',
        text: 'The rectum can be lifted and fixed back in place through the abdomen, often using keyhole (laparoscopic) techniques where suitable.',
      },
      {
        name: 'Surgery from below',
        text: 'For some people, especially those less fit for abdominal surgery, the operation can be done through the anus. Your specialist will explain which option suits you after an examination.',
      },
    ],
    recovery: [
      'Recovery depends on the type of surgery performed',
      'Keeping stools soft and avoiding straining is important while healing',
      'Your surgeon will advise when you can return to lifting and normal activities',
      'Pelvic floor exercises may help with bowel control after treatment',
      'Regular follow-up allows your surgeon to monitor your recovery',
    ],
    whenToSee:
      'Seek urgent medical care if a prolapse cannot be pushed back, becomes very painful, swollen or dark in colour, or if there is heavy bleeding.',
    faqs: [
      {
        q: 'Is rectal prolapse the same as piles?',
        a: 'No, although they can look similar. Piles are swollen blood vessels, while rectal prolapse involves the wall of the rectum itself slipping out, so an examination is needed to tell them apart.',
      },
      {
        q: 'Can rectal prolapse be treated without surgery?',
        a: 'Managing constipation and doing pelvic floor exercises can ease symptoms, but they do not usually correct a full prolapse. Surgery is the main treatment for most people.',
      },
      {
        q: 'Will it come back after surgery?',
        a: 'Rectal prolapse can sometimes return after surgery. Avoiding straining, keeping stools soft and attending follow-up visits help reduce this chance.',
      },
    ],
  },
];

export const getTreatment = (slug: string) => TREATMENTS_LIST.find((t) => t.slug === slug);
