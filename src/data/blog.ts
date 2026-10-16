export interface BlogSection {
  heading: string;
  paragraphs: string[]; // 1–3 paragraphs
  list?: string[]; // optional bullet list shown after the paragraphs
}

export interface BlogPost {
  slug: string;
  title: string;
  tag: string; // category chip
  treatmentSlug: string; // related treatment page slug
  image: string;
  excerpt: string; // 1–2 sentences for cards / meta description (max ~30 words)
  readMinutes: number; // realistic estimate from word count (~200 wpm)
  sections: BlogSection[]; // 4–6 sections, ~600–800 words total
  keyTakeaways: string[]; // 3–4 bullets
}

export const POSTS: BlogPost[] = [
  {
    slug: "cereg-for-anal-fistula",
    title: "CEREG for anal fistula: how echo-guided treatment differs",
    tag: "Fistula",
    treatmentSlug: "fistula",
    image: "/images/blog-fistula.jpg",
    excerpt:
      "Why mapping an anal fistula with ultrasound before surgery matters, and how echo-guided assessment helps your surgeon plan treatment while protecting the muscles that control continence.",
    readMinutes: 4,
    sections: [
      {
        heading: "What is an anal fistula?",
        paragraphs: [
          "An anal fistula is a small tunnel that forms between the inside of the back passage and the skin near the anus. Most fistulas develop after an anal abscess, a collection of pus that has drained but left a track behind. Typical symptoms include discharge of pus or blood, irritation of the skin, and pain or swelling that may come and go.",
          "Anal fistulas are common, and they are treatable. Many people delay seeking help because the symptoms feel embarrassing, but specialists see these problems every day and consultations are private. A fistula rarely heals completely on its own, so an assessment is the sensible first step.",
        ],
      },
      {
        heading: "Why mapping the fistula tract matters",
        paragraphs: [
          "No two fistulas are exactly alike. A simple fistula runs a short, straight course and crosses little or none of the anal sphincter muscles. A complex fistula may pass through a larger part of the sphincter, have more than one branch, or extend into deeper spaces around the rectum.",
          "The anal sphincter muscles are what allow you to hold in wind and stool, so knowing exactly where the tract runs in relation to them is essential. A clear map helps the surgeon choose an approach that treats the fistula while protecting continence, and it reduces the chance of a hidden branch being missed, which is one of the reasons fistulas can return.",
        ],
        list: [
          "Where the internal opening is inside the anal canal",
          "How much of the sphincter muscle the tract crosses",
          "Whether there are side branches or pockets of infection",
          "Whether the fistula is simple or complex",
        ],
      },
      {
        heading: "How echo-guided (ultrasound) assessment helps",
        paragraphs: [
          "Endoanal ultrasound uses a slim probe placed gently in the anal canal to produce real-time images of the sphincter muscles and surrounding tissues. It can show the course of the fistula tract, its relationship to the muscles, and any associated collections. The examination is usually done as an outpatient or at the time of surgery, and most people find it tolerable.",
          "With this information, the surgeon can plan treatment before the operation rather than relying only on what can be felt or seen during it. This is the idea behind the echo-guided approach used at Chirag: using imaging to understand the anatomy of each fistula as fully as possible before deciding how to treat it.",
        ],
      },
      {
        heading: "How it compares with examination alone and MRI",
        paragraphs: [
          "A careful clinical examination remains the starting point, and for many simple fistulas it may be enough. However, examination alone can miss deeper or branching tracts. Imaging adds detail that helps in less straightforward cases.",
          "MRI of the pelvis is another well-established way to map fistulas and is particularly useful for very complex or high tracts. Endoanal ultrasound and MRI each have strengths, and in some situations both are used. Your specialist will recommend the most appropriate investigation for you.",
        ],
      },
      {
        heading: "From mapping to treatment",
        paragraphs: [
          "Once the fistula has been mapped, the surgeon decides on the treatment. Options include fistulotomy, where the tract is laid open so it can heal from the base; fistulectomy, where the tract is removed; seton placement, where a soft thread is used to drain the tract; and sphincter-sparing techniques for fistulas that involve more of the muscle.",
          "The right choice depends on your individual anatomy, symptoms and general health. Your specialist will explain the options, the expected recovery and any risks after examining you, so you can make an informed decision together.",
        ],
      },
      {
        heading: "When to see a specialist",
        paragraphs: [
          "Please seek medical advice if you notice any of the following. Seek urgent care if you have severe pain with fever, as this may indicate an abscess that needs prompt drainage.",
        ],
        list: [
          "Persistent or recurring discharge of pus or blood near the anus",
          "A painful, swollen lump around the back passage",
          "Fever or feeling generally unwell with anal pain",
          "Symptoms that return after an abscess has been drained",
          "Any change in bowel habit or rectal bleeding that does not settle",
        ],
      },
    ],
    keyTakeaways: [
      "Anal fistulas are common and treatable, and consultations are private.",
      "Mapping the tract shows how it relates to the sphincter muscles that control continence.",
      "Endoanal ultrasound and MRI can both help plan surgery; your specialist will advise which suits you.",
      "The type of operation is chosen after mapping, based on your individual anatomy.",
    ],
  },
  {
    slug: "complications-of-untreated-anal-fissures",
    title: "Complications of untreated anal fissures",
    tag: "Anal fissure",
    treatmentSlug: "fissure",
    image: "/images/blog-fissure.jpg",
    excerpt:
      "Most anal fissures heal with simple care, but some become long-lasting. Learn what can happen if a fissure is ignored, the warning signs, and the treatment options available.",
    readMinutes: 4,
    sections: [
      {
        heading: "What is an anal fissure?",
        paragraphs: [
          "An anal fissure is a small tear in the lining of the anal canal. It often follows passing a hard or large stool, but it can also occur with diarrhoea, after childbirth, or without an obvious cause. The typical symptoms are sharp pain during and after a bowel movement, sometimes lasting for hours, and a small amount of bright red blood on the toilet paper.",
          "Fissures are very common and affect people of all ages. Many heal within a few weeks with simple measures. Feeling embarrassed is natural, but there is no need to suffer in silence; doctors treat fissures routinely and consultations are private.",
        ],
      },
      {
        heading: "Why some fissures do not heal",
        paragraphs: [
          "The pain of a fissure causes the internal anal sphincter muscle to go into spasm. This spasm increases pressure in the anal canal and reduces blood flow to the tear, which slows healing. Fear of pain can also lead people to put off going to the toilet, making stools harder and causing the tear to reopen.",
          "This pain, spasm and re-injury cycle is the main reason a fissure can persist. A fissure that has lasted more than about six to eight weeks is usually described as chronic.",
        ],
      },
      {
        heading: "Possible complications",
        paragraphs: [
          "Leaving a fissure untreated does not mean something serious will happen, but a number of problems can develop over time.",
        ],
        list: [
          "Chronic fissure: a deeper, longer-lasting tear that is less likely to heal with simple measures alone",
          "Sentinel pile: a small skin tag that forms at the outer edge of a chronic fissure and is often mistaken for a pile",
          "Persistent sphincter spasm, which keeps the pain cycle going",
          "Rarely, infection, leading to an abscess or an anal fistula",
          "Changes in bowel habits, such as delaying bowel movements, which can worsen constipation",
          "Effects on quality of life, including disturbed sleep, difficulty sitting, and anxiety around going to the toilet",
        ],
      },
      {
        heading: "The treatment ladder",
        paragraphs: [
          "Treatment usually starts with simple steps and moves on only if needed. Many acute fissures heal with the first measures alone.",
          "If a fissure becomes chronic, your doctor may prescribe topical medicines that relax the sphincter muscle and improve blood flow to the area. When these do not work, procedures such as botulinum toxin injection or a minor operation called lateral internal sphincterotomy may be considered. Your specialist will advise on the most suitable option after an examination.",
        ],
        list: [
          "Increase fibre gradually through fruit, vegetables, whole grains and pulses",
          "Drink plenty of fluids through the day",
          "Do not strain, and go to the toilet when you feel the urge",
          "Take warm sitz baths to ease spasm and discomfort",
          "Use pain relief or soothing creams as advised by your doctor",
        ],
      },
      {
        heading: "When to see a specialist",
        paragraphs: [
          "It is worth getting checked if a fissure is not improving, and some symptoms should always be assessed by a doctor because they can have other causes.",
        ],
        list: [
          "Pain or bleeding lasting more than a few weeks despite home care",
          "Heavy bleeding, or dark or maroon-coloured blood",
          "A painful swelling, discharge of pus, or fever",
          "A lasting change in bowel habit or unexplained weight loss",
          "Fissures that keep coming back",
        ],
      },
    ],
    keyTakeaways: [
      "Anal fissures are common and most heal with simple care.",
      "Untreated fissures can become chronic because of a pain and muscle spasm cycle.",
      "Possible complications include a sentinel pile and, rarely, an abscess or fistula.",
      "Treatment ranges from diet and sitz baths to medicines and procedures; your specialist will advise.",
    ],
  },
  {
    slug: "pilonidal-sinus-risk-factors",
    title: "Pilonidal sinus risk factors: who is most likely to get it?",
    tag: "Pilonidal sinus",
    treatmentSlug: "pilonidal-sinus",
    image: "/images/blog-pilonidal.jpg",
    excerpt:
      "Pilonidal sinus is more common in young men, people who sit for long hours and those with coarse body hair. Learn the risk factors, prevention tips and when to seek help.",
    readMinutes: 4,
    sections: [
      {
        heading: "What is a pilonidal sinus?",
        paragraphs: [
          "A pilonidal sinus is a small hole or tunnel in the skin at the top of the cleft between the buttocks. It is thought to develop when loose hairs are pushed into the skin, causing a reaction that leads to a small cavity. It may cause no symptoms at first, but it can become infected and form a painful, swollen abscess that discharges pus or blood.",
          "Pilonidal sinus is common, especially in young adults, and it is treatable. It can feel awkward to talk about, but doctors see it often and examinations are carried out privately and respectfully.",
        ],
      },
      {
        heading: "Who is most at risk?",
        paragraphs: [
          "Anyone can develop a pilonidal sinus, but certain factors make it more likely. Having one or more of these does not mean you will get it; they simply raise the chances.",
        ],
        list: [
          "Male sex: it is several times more common in men than women",
          "Age: it most often appears between puberty and about 35 years of age",
          "Hair: thick, dense or coarse body hair, especially around the buttocks",
          "Prolonged sitting: for example drivers, IT professionals and others with desk-based work",
          "Excess body weight, which deepens the cleft and increases friction",
          "A family history of pilonidal sinus",
          "A deep natal cleft (the groove between the buttocks)",
          "Friction and sweating from tight clothing, heat or physical activity",
          "Poor local hygiene, which allows loose hair and debris to collect",
        ],
      },
      {
        heading: "Why these factors matter",
        paragraphs: [
          "Most of these risk factors share a common theme: they make it easier for loose hair to collect in the natal cleft and be pushed into the skin. Sitting for long periods presses and rubs the area, while sweat and friction soften the skin and help hairs work their way in.",
          "Some factors, such as sex, age and family history, cannot be changed. Others, such as sitting habits, weight and hygiene, can be managed, which may lower the risk of the problem starting or coming back after treatment.",
        ],
      },
      {
        heading: "Practical prevention tips",
        paragraphs: [
          "These everyday measures are sensible for anyone at higher risk, and they are often advised after treatment as well.",
        ],
        list: [
          "Keep the area clean and dry, and wash daily",
          "Take short breaks to stand and move if you sit for long hours",
          "Wear loose, breathable clothing",
          "Aim for a healthy weight with regular activity",
          "Ask your doctor whether hair removal in the area is advisable for you",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "A pilonidal sinus that is not causing symptoms may only need monitoring, but you should see a doctor if you notice any of the following. A rapidly enlarging, very painful swelling with fever needs prompt attention.",
        ],
        list: [
          "Pain, tenderness or swelling at the top of the buttock cleft",
          "Discharge of pus or blood, or an unpleasant smell",
          "Fever or feeling unwell alongside these symptoms",
          "Symptoms that keep returning after an infection has settled",
        ],
      },
      {
        heading: "An overview of treatment",
        paragraphs: [
          "Treatment depends on whether the sinus is infected and how often it has caused problems. An acute abscess usually needs draining. For a long-standing or recurring sinus, options range from minimally invasive procedures that clean out the tract to surgery that removes the affected tissue, sometimes with techniques to flatten the cleft.",
          "Your specialist will advise on the most suitable option after an examination, and will explain wound care and the steps that can help reduce the risk of it returning.",
        ],
      },
    ],
    keyTakeaways: [
      "Pilonidal sinus is most common in young men with coarse body hair and long sitting hours.",
      "Many risk factors, such as sitting habits, weight and hygiene, can be managed.",
      "See a doctor for pain, swelling or discharge at the top of the buttock cleft.",
      "Treatment ranges from drainage to surgery; your specialist will advise after an examination.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
