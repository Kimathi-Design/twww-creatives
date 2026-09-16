/** TWWW proposal content — page-by-page copy as agreed */

export const SLIDE_W = 1920;
export const SLIDE_H = 1080;

export const CRISP_PDF_FILENAME = "TWWW_MediaPal_Proposal.pdf";
export const EDITABLE_PDF_FILENAME = "TWWW_MediaPal_Proposal_Editable.pdf";

export const IMAGES = {
  cover: "/twww/generated/bg/bg-cover.webp",
  brief: "/twww/generated/bg/bg-brief.webp",
  response: "/twww/generated/bg/bg-response.webp",
  journey: "/twww/generated/bg/bg-journey.webp",
  audience: "/twww/generated/bg/bg-audience.webp",
  kenya: "/twww/generated/bg/bg-inventory-kenya.webp",
  markets: "/twww/generated/bg/bg-inventory-markets.webp",
  moment: "/twww/generated/bg/bg-moment.webp",
  contextual: "/twww/generated/bg/bg-contextual.webp",
  ctv: "/twww/generated/bg/bg-ctv.webp",
  creativesIntro: "/twww/generated/bg/bg-creatives-intro.webp",
  creativesDecide: "/twww/generated/bg/bg-creatives-decide.webp",
  creativesShare: "/twww/generated/bg/bg-creatives-share.webp",
  why: "/twww/generated/bg/bg-why.webp",
  measure: "/twww/generated/bg/bg-measure.webp",
  next: "/twww/generated/bg/bg-next.webp",
  contact: "/twww/generated/bg/bg-contact.webp",
  journey1: "/twww/generated/journey/journey-decide.webp",
  journey2: "/twww/generated/journey/journey-shop.webp",
  journey3: "/twww/generated/journey/journey-prepare.webp",
  journey4: "/twww/generated/journey/journey-eat.webp",
  journey5: "/twww/generated/journey/journey-share.webp",
  pub1: "/twww/generated/publishers/pub-tasty.webp",
  pub2: "/twww/generated/publishers/pub-nation.webp",
  pub3: "/twww/generated/publishers/pub-kenyans.webp",
  pub4: "/twww/generated/publishers/pub-tuko.webp",
  pub5: "/twww/generated/publishers/pub-standard.webp",
  pub6: "/twww/generated/publishers/pub-star.webp",
  marketKenya: "/twww/generated/markets/market-kenya.webp",
  tz: "/twww/generated/markets/market-tanzania.webp",
  ug: "/twww/generated/markets/market-uganda.webp",
  job1: "/twww/generated/jobs/job-famous.webp",
  job2: "/twww/generated/jobs/job-frequent.webp",
  job3: "/twww/generated/jobs/job-theirs.webp",
  momentCards: ["/twww/generated/moment/moment-12-2.webp", "/twww/generated/moment/moment-4-7.webp", "/twww/generated/moment/moment-5-7.webp", "/twww/generated/moment/moment-weekends.webp"],
  contextualCards: ["/twww/generated/contextual/ctx-placements.webp", "/twww/generated/contextual/ctx-food-lifestyle.webp", "/twww/generated/contextual/ctx-association.webp", "/twww/generated/contextual/ctx-no-data.webp"],
  ctvCards: ["/twww/generated/ctv/ctv-devices.webp", "/twww/generated/ctv/ctv-streaming.webp", "/twww/generated/ctv/ctv-household.webp", "/twww/generated/ctv/ctv-brandsafe.webp"],
  whyCards: ["/twww/generated/why/why-occasion.webp", "/twww/generated/why/why-inventory.webp", "/twww/generated/why/why-activation.webp", "/twww/generated/why/why-omni.webp"],
  measureCards: ["/twww/generated/measure/measure-reach.webp", "/twww/generated/measure/measure-occasions.webp", "/twww/generated/measure/measure-markets.webp", "/twww/generated/measure/measure-engagement.webp", "/twww/generated/measure/measure-banners.webp", "/twww/generated/measure/measure-ctv.webp", "/twww/generated/measure/measure-brand.webp", "/twww/generated/measure/measure-retail.webp"],
  logo: "/twww/coca-cola-logo.webp",
  logoWhite: "/twww/coca-cola-logo.webp",
  mediapal: "/twww/mediapal-logo.svg",
  coke: "/twww/coca-cola-logo.webp",
  icon: "/twww/mediapal-icon.png",
  appleIcon: "/twww/mediapal-apple-touch.png",
  wta2026: "/ats/images/profile/awards.webp",
  wta2025: "/ats/images/profile/awards.webp",
  wta2024: "/ats/images/profile/awards.webp",
} as const;

export const CLIENTS = [] as const;
export const PARTNERS = [] as const;

export const CONTACT = {
  phones: [] as string[],
  email: "hello@mediapal.net",
  website: "www.mediapal.net",
  address: ["Nairobi, Kenya"],
  eldoret: "",
} as const;

/** Viewer titles — length drives SLIDE_COUNT */
export const slideTitles = [
  "Cover",
  "The brief",
  "Our response",
  "Meal journey",
  "Audience discovery",
  "Ad inventory discovery",
  "Market inventory reach",
  "Moment Ads",
  "Contextual",
  "Connected TV",
  "High-impact creatives",
  "Creatives · Decide & Shop",
  "Creatives · Prepare, Eat & Share",
  "Why MediaPal",
  "Measurement",
  "Next steps",
  "Contact",
] as const;

export const SLIDE_COUNT = slideTitles.length;

export const COVER = {
  eyebrow: "The Coca-Cola Company · Meals",
  titleLines: ["The World", "Will Wait."] as const,
  subhead: "Media implementation proposal",
} as const;

export const BRIEF = {
  eyebrow: "The brief",
  titleLines: ["An occasion gap.", "Not a penetration gap."] as const,
  lead:
    "Kenya’s meal occasion sits at 4% against an Africa benchmark of 48% — a 44-point occasion gap, not a penetration gap. The job is to make Coke the automatic addition to meals that already happen, especially at home.",
  media: [
    {
      label: "Same consumers",
      body: "Same week. One more meal that includes a Coke.",
    },
    {
      label: "Home supper",
      body: "Home supper is the frequency engine; out-of-home is the reminder that precedes it.",
    },
    {
      label: "Win earlier",
      body: "Media must win the decision before the food is served.",
    },
    {
      label: "Automatic addition",
      body: "Make Coke the default add to meals that already happen.",
    },
  ] as const,
  strip: [
    { value: "20", label: "Median age" },
    { value: "93%", label: "Smartphone" },
    { value: "5–7pm", label: "Dinner window" },
    { value: "90%", label: "TV viewing in-home" },
  ] as const,
  gap: [
    { value: "4%", label: "Kenya today" },
    { value: "48%", label: "Africa benchmark" },
    { value: "44", label: "Point gap" },
  ] as const,
} as const;

export const RESPONSE = {
  eyebrow: "Our response",
  title: "Activate around meal moments",
  lead:
    "MediaPal activates Coca-Cola around the moments that decide whether a Coke joins the meal — across Kenya, Tanzania and Uganda — then reinforces enjoyment at the table and turns the occasion into the next week’s invitation.",
  close:
    "Build the association. Own the decision. Reinforce the habit. Make the occasion shareable.",
  jobs: [
    {
      title: "Make it famous",
      body: "Support national association with premium video, CTV storytelling and high-impact digital presence that works with TV, radio and OOH.",
      image: IMAGES.job1,
    },
    {
      title: "Make it frequent",
      body: "Own repeat digital presence around lunch, journey-home and supper dayparts with Moment Ads, contextual environments and premium video.",
      image: IMAGES.job2,
    },
    {
      title: "Make it theirs",
      body: "Seed participation and shareable meal culture through social-ready formats, community content environments and occasion bursts.",
      image: IMAGES.job3,
    },
  ] as const,
} as const;

export const JOURNEY = {
  eyebrow: "The meal journey",
  title: "Buy the moment, not just the channel",
  subhead: "MediaPal maps media to the five moments in the meal journey.",
  footer:
    "The share stage seeds next week’s decide stage — this is a loop, not a funnel.",
  stages: [
    {
      label: "Decide",
      time: "4–7pm",
      image: IMAGES.journey1,
      points: [
        "Commute home, drive-time radio, roadside OOH.",
        "Remind the household: Coke belongs with supper.",
        "Inspire with content and offers before purchase.",
      ],
    },
    {
      label: "Shop",
      time: "4–7pm",
      image: IMAGES.journey2,
      points: [
        "Duka and retail catchments around the shopper.",
        "Geo-triggered mobile media at the point of buy.",
        "Make the Coke addition visible at the choice.",
      ],
    },
    {
      label: "Prepare",
      time: "12–2pm / 4–7pm",
      image: IMAGES.journey3,
      points: [
        "Food, recipe, cooking and lifestyle content.",
        "Inspiration and pairing ideas before the table.",
        "Build the pairing before the table is set.",
      ],
    },
    {
      label: "Eat",
      time: "7–9.30pm",
      image: IMAGES.journey4,
      points: [
        "CTV / premium video and TV-on environments.",
        "Own the home supper occasion with the meal.",
        "Reinforce enjoyment and togetherness at table.",
      ],
    },
    {
      label: "Share",
      time: "Evenings / weekends",
      image: IMAGES.journey5,
      points: [
        "Turn the meal into participation and share.",
        "Amplify through community content and talk.",
        "Leverage choma, celebrations and holidays.",
      ],
    },
  ] as const,
} as const;

export const AUDIENCE = {
  eyebrow: "Audience",
  title: "Audience discovery",
  lead1:
    "MediaPal uses a combination of behavioural signals, curated media environments, location, device and contextual insights to identify consumers around moments that influence Coca-Cola meal occasions.",
  lead2:
    "The goal is to help Coca-Cola understand where meal decisions happen, the content surrounding those decisions, and which environments offer the best opportunity for building a repeated association between Coca-Cola and meals.",
  find: [
    {
      label: "Behavioural and interest targeting",
      body: "Food, cooking, family, lifestyle, entertainment and consumption interests.",
    },
    {
      label: "Geolocation and retail targeting",
      body: "Urban areas, commute corridors, duka, retail catchments and relevant meal locations.",
    },
    {
      label: "Contextual audience signals",
      body: "Content environments related to food, recipes, cooking and dining.",
    },
  ] as const,
  lockupTitle: "Coca-Cola Audience Intelligence",
  lockupSub: "Connected. Contextual. Occasion Led.",
  wheelHero: "/twww/generated/audience/wheel-hero.jpg",
  occasions: [
    {
      label: "Work lunch",
      image: "/twww/generated/audience/occasion-work-lunch.jpg",
    },
    {
      label: "Weekend choma",
      image: "/twww/generated/audience/occasion-weekend-choma.jpg",
    },
    {
      label: "Weekday supper",
      image: "/twww/generated/audience/occasion-weekday-supper.jpg",
    },
    {
      label: "Christmas table",
      image: "/twww/generated/audience/occasion-christmas-table.jpg",
    },
  ] as const,
  signals: [
    {
      label: "Location",
      body: "Urban hubs, commute routes, retail catchments",
      color: "#e61a27",
    },
    {
      label: "Media Environment",
      body: "Daily Nation, Tuko, Standard, Kenyans.co.ke, lifestyle apps",
      color: "#132d7a",
    },
    {
      label: "Interests",
      body: "Food, cooking, dining, family, lifestyle, music, travel",
      color: "#2f9e44",
    },
    {
      label: "Device Type",
      body: "Mobile, desktop, Connected TV",
      color: "#e61a27",
    },
    {
      label: "Context",
      body: "Recipes, cooking, dining, family, food content",
      color: "#9b2d8a",
    },
    {
      label: "Time of Day",
      body: "12–2pm, 4–7pm, 7–9.30pm, weekends",
      color: "#0d9488",
    },
    {
      label: "Meal Occasion",
      body: "Work lunch, weekday supper, weekend choma, Christmas table",
      color: "#f15a29",
    },
    {
      label: "Retail Proximity",
      body: "Duka and shopping locations",
      color: "#c2410c",
    },
    {
      label: "Gender",
      body: "Male + Female,\nbalanced reach",
      color: "#1e3a8a",
    },
    {
      label: "Age",
      body: "18+ adults,\ncore purchase ages",
      color: "#ea580c",
    },
  ] as const,
} as const;

export const KENYA = {
  eyebrow: "Inventory · Kenya",
  title: "Ad inventory discovery",
  subhead: "Premium publishers and apps in Kenya",
  global: "3M+ publishers & apps globally",
  metrics: [
    { value: "8.71B", label: "Impressions" },
    { value: "28.6M", label: "Unique reach" },
    { value: "47.7M", label: "Unique devices" },
  ] as const,
  gender: "Male 58% · Female 37% · Undefined 5%",
  age: [
    { value: "42%", label: "25–34" },
    { value: "21%", label: "18–24" },
    { value: "19%", label: "35–44" },
    { value: "6%", label: "45–54" },
    { value: "3%", label: "55–64" },
    { value: "2%", label: "65+" },
    { value: "8%", label: "Undefined" },
  ] as const,
  lead:
    "MediaPal offers extensive premium inventory across Kenya and Africa at large which will enable us to build Coca-Cola’s presence around everyday meal occasions at scale while maintaining strong local relevance in each market.",
  publishers: [
    {
      name: "Tasty",
      cat: "Food",
      line: "Easy Dinner Ideas for Everyday Meals",
      image: IMAGES.pub1,
    },
    {
      name: "Daily Nation",
      cat: "News",
      line: "Food Brings Kenyans Together",
      image: IMAGES.pub2,
    },
    {
      name: "Kenyans.co.ke",
      cat: "Lifestyle",
      line: "Great Food, Stronger Connections",
      image: IMAGES.pub3,
    },
    {
      name: "TUKO",
      cat: "Family",
      line: "Family Meals Make Life Better",
      image: IMAGES.pub4,
    },
    {
      name: "The Standard",
      cat: "Food",
      line: "Good Food Brighter Futures",
      image: IMAGES.pub5,
    },
    {
      name: "The Star",
      cat: "Entertainment",
      line: "Good Food Great Company",
      image: IMAGES.pub6,
    },
  ] as const,
  unlocks: [
    {
      label: "Premium publishers and mobile apps",
      body: "Food, lifestyle, entertainment and everyday content environments.",
    },
    {
      label: "Contextual and moment-led targeting",
      body: "Activate across the Decide, Shop, Prepare, Eat and Share journey.",
    },
    {
      label: "Flexible audience and market allocation",
      body: "Optimise investment based on reach, engagement and occasion performance.",
    },
    {
      label: "Video, display, audio and CTV inventory",
      body: "Reach consumers across key meal moments and screens.",
    },
    {
      label: "Market-wide geo targeting",
      body: "Reach key urban areas, retail catchments and relevant meal occasions.",
    },
  ] as const,
} as const;

export const EAST_AFRICA = {
  eyebrow: "Inventory · East Africa",
  title: "Ad inventory discovery · Tanzania & Uganda",
  lead:
    "The same meal-moment system extends into Tanzania and Uganda — so Coca-Cola can build frequent meal association across East Africa with one activation approach and market-level optimisation.",
  markets: [
    {
      name: "Tanzania",
      body: "Impressions · 637M. Unique reach · 10.6M. Gender — Male 59% · Female 37% · Undefined 5%. Age — 25–34 30% · 18–24 26% · 35–44 21% · 45–54 9% · Undefined 8% · 55–64 3% · 65+ 3%.",
      image: IMAGES.tz,
    },
    {
      name: "Uganda",
      body: "Impressions · 723M. Unique reach · 12.4M. Gender — Male 58% · Female 37% · Undefined 5%. Age — 25–34 42% · 18–24 21% · 35–44 19% · Undefined 8% · 45–54 6% · 55–64 3% · 65+ 2%.",
      image: IMAGES.ug,
    },
  ] as const,
  how: [
    {
      label: "Same journey map",
      body: "Same Decide → Shop → Prepare → Eat → Share map.",
    },
    {
      label: "Localised environments",
      body: "Localised contextual and publisher environments.",
    },
    {
      label: "Shared creatives",
      body: "Shared creative territories with market-level daypart and geo weighting.",
    },
    {
      label: "Learn then scale",
      body: "Learn from Kenya, then scale what works.",
    },
  ] as const,
  footer: "One brief. Three markets. One meal-moment system.",
} as const;

/** Three equal market reach cards — Kenya · Tanzania · Uganda */
export const INVENTORY_MARKETS = [
  {
    name: "Kenya",
    code: "KE",
    image: IMAGES.marketKenya,
    map: "/twww/maps/kenya.svg",
    impressions: "8.71B",
    reach: "28.6M",
    devices: "47.7M",
    gender: [
      { label: "Male", value: "58%" },
      { label: "Female", value: "37%" },
      { label: "Undefined", value: "5%" },
    ],
    age: [
      { label: "25–34", value: "42%" },
      { label: "18–24", value: "21%" },
      { label: "35–44", value: "19%" },
      { label: "45–54", value: "6%" },
      { label: "55–64", value: "3%" },
      { label: "65+", value: "2%" },
      { label: "Undefined", value: "8%" },
    ],
  },
  {
    name: "Tanzania",
    code: "TZ",
    image: IMAGES.tz,
    map: "/twww/maps/tanzania.svg",
    impressions: "637M",
    reach: "10.6M",
    devices: "",
    gender: [
      { label: "Male", value: "59%" },
      { label: "Female", value: "37%" },
      { label: "Undefined", value: "5%" },
    ],
    age: [
      { label: "25–34", value: "30%" },
      { label: "18–24", value: "26%" },
      { label: "35–44", value: "21%" },
      { label: "45–54", value: "9%" },
      { label: "55–64", value: "3%" },
      { label: "65+", value: "3%" },
      { label: "Undefined", value: "8%" },
    ],
  },
  {
    name: "Uganda",
    code: "UG",
    image: IMAGES.ug,
    map: "/twww/maps/uganda.svg",
    impressions: "723M",
    reach: "12.4M",
    devices: "",
    gender: [
      { label: "Male", value: "58%" },
      { label: "Female", value: "37%" },
      { label: "Undefined", value: "5%" },
    ],
    age: [
      { label: "25–34", value: "42%" },
      { label: "18–24", value: "21%" },
      { label: "35–44", value: "19%" },
      { label: "45–54", value: "6%" },
      { label: "55–64", value: "3%" },
      { label: "65+", value: "2%" },
      { label: "Undefined", value: "8%" },
    ],
  },
] as const;

export const MOMENT = {
  eyebrow: "Activation",
  title: "Moment Ads",
  subhead: "Engage consumers in real meal moments",
  lead1:
    "MediaPal Moment Ads help Coca-Cola connect with consumers when meal decisions are being made — using real-time signals such as time, location, context and behaviour.",
  lead2:
    "We activate around key Kenya and East Africa meal moments — from work lunches to the journey home and weekend social occasions — so Coca-Cola messaging lands when it matters most.",
  moments: [
    {
      label: "12–2pm",
      body: "Work lunch and midday meal occasions.",
      image: IMAGES.momentCards[0],
    },
    {
      label: "4–7pm",
      body: "Journey home and retail decision.",
      image: IMAGES.momentCards[1],
    },
    {
      label: "5–7pm",
      body: "Home dinner and family meal.",
      image: IMAGES.momentCards[2],
    },
    {
      label: "Weekends",
      body: "Choma, social gatherings and celebrations.",
      image: IMAGES.momentCards[3],
    },
  ] as const,
  strip: [
    { label: "Activate", body: "Activate around key meal moments." },
    { label: "Timely", body: "Deliver timely, relevant messaging." },
    { label: "Signals", body: "Use time and location signals." },
    { label: "Association", body: "Build Coca-Cola’s meal association." },
  ] as const,
  close: "Right message. Right moment. Right meal occasion.",
} as const;

export const CONTEXTUAL = {
  eyebrow: "Activation",
  title: "Contextual advertising",
  subhead: "Reach consumers where meal moments happen",
  lead1:
    "Contextual advertising places Coca-Cola inside premium food, cooking, lifestyle and entertainment content that shapes meal decisions — strengthening meal association and choice at the table without relying on personal data.",
  lead2:
    "Keyword and semantic targeting across recipes, cooking, lunch and dinner ideas, Kenyan cuisine, groceries, restaurants, music, sport and lifestyle environments.",
  cards: [
    {
      label: "Relevant placements",
      body: "Right message in the content environments that shape meal decisions.",
      image: IMAGES.contextualCards[0],
    },
    {
      label: "Food & lifestyle",
      body: "Recipes, cooking, Kenyan cuisine, groceries, music, sport and lifestyle.",
      image: IMAGES.contextualCards[1],
    },
    {
      label: "Meal association",
      body: "Stronger Coke-with-meals link and engagement at the table.",
      image: IMAGES.contextualCards[2],
    },
    {
      label: "Context, not data",
      body: "Keyword and semantic targeting — no personal data required.",
      image: IMAGES.contextualCards[3],
    },
  ] as const,
  strip: [
    { label: "Moments", body: "Reach where meal moments happen" },
    { label: "Context", body: "Powered by context, not personal data" },
    { label: "Premium", body: "Premium publishers and search" },
    { label: "Choice", body: "Drive choice at the table" },
  ] as const,
  footer: "Right message. Right context. Real impact.",
  close: "Be present in the moments that matter most.",
} as const;

export const CTV = {
  eyebrow: "Activation",
  title: "Connected TV (CTV)",
  subhead: "Premium streaming. Precise targeting. Stronger meal association.",
  lead1:
    "CTV reaches consumers at home while families prepare, serve and enjoy meals — combining the storytelling power of TV with digital precision across 1M+ LG Connected TV devices and leading smart TV OEMs in Kenya.",
  lead2:
    "Buy into the home supper window — into and through 7–9.30pm — when the meal and the screen share the room.",
  cards: [
    {
      label: "1M+ LG Connected TV",
      body: "Connected TV devices in Kenya.",
      image: IMAGES.ctvCards[0],
    },
    {
      label: "Premium streaming",
      body: "Premium streaming inventory across leading TV OEMs.",
      image: IMAGES.ctvCards[1],
    },
    {
      label: "Household targeting",
      body: "Data-driven household targeting for meal occasions.",
      image: IMAGES.ctvCards[2],
    },
    {
      label: "Brand-safe video",
      body: "High-impact video in brand-safe viewing environments.",
      image: IMAGES.ctvCards[3],
    },
  ] as const,
  strip: [
    { label: "Supper", body: "Buy into the 7–9.30pm supper window" },
    { label: "Shared", body: "When meal and screen share the room" },
    { label: "Precision", body: "Storytelling with digital precision" },
    { label: "Association", body: "Build stronger meal association" },
  ] as const,
  close: "Right message. Right screen. Right meal moments.",
} as const;

export const CREATIVES_INTRO = {
  eyebrow: "Creatives",
  title: "High-impact creatives",
  subhead: "Engaging Creative That Drives Action",
  lead1:
    "MediaPal can help Coca-Cola turn campaign ideas into engaging digital experiences built around key moments in the meal journey.",
  lead2:
    "From high-impact video and immersive storytelling to interactive formats and real-time creative, our approach captures attention, strengthens brand recall and drives consumers from awareness to action across every platform.",
  points: [
    {
      label: "Interactive and engaging ad formats",
      body: "High-impact video, immersive storytelling and real-time creative built for meal moments.",
    },
    {
      label: "Cross-channel attribution",
      body: "Connect creative performance across platforms from awareness through to action.",
    },
    {
      label: "Continuous campaign optimisation",
      body: "Learn and refine in-flight so every format works harder for Coca-Cola.",
    },
    {
      label: "Built around the meal journey",
      body: "Creative timed to Decide, Shop, Prepare, Eat and Share — not generic brand bursts.",
    },
  ] as const,
  close: "From awareness to action across every platform.",
} as const;

export const CREATIVE_DECIDE = {
  eyebrow: "Creatives",
  title: "Decide & Shop",
  subhead: "Live banner executions that win the meal decision before the table.",
  lead:
    "These are live MediaPal banner creatives — built for the commute-home and retail window where supper is decided and the Coke is added or forgotten.",
  show: [
    "Leaderboard / billboard / MPU in news and lifestyle environments",
    "Mobile sticky / high-impact display near retail and urban geo",
    "Journey-home creative with a clear meal CTA",
  ] as const,
  label: "Format · Journey stage (Decide / Shop) · Daypart (4–7pm) · Market (KE / TZ / UG)",
  examples: [
    "Heading home? Don’t forget a Coke for your meal.",
    "Better meals together.",
  ] as const,
  footer: "Right message. Right moment. At the point of choice.",
  banners: [
    {
      label: "Coca-Cola Custom",
      type: "Custom rich unit · 320×480",
      use: "Decide & Shop — high-impact mobile for journey-home and retail catchments.",
      src: "https://live.mediapal.net/cdn/twww/coca-cola-custom/320x480/index.html",
    },
    {
      label: "Coca-Cola Tiles",
      type: "Interactive tiles · 320×480",
      use: "Decide & Shop — tap-to-explore meal pairings in news and lifestyle.",
      src: "https://live.mediapal.net/cdn/twww/coca-cola-tiles/320x480/index.html",
      /** Live stage is 320×570 (640×1140 @ 0.5); bottom-align in 480 clip. */
      frameHeight: 570,
      align: "bottom",
    },
    {
      label: "Hot or Not",
      type: "Engagement poll · 320×480",
      use: "Decide & Shop — playful choice mechanic that locks Coke to supper.",
      src: "https://live.mediapal.net/cdn/twww/hot-or-not/320x480/index.html",
    },
    {
      label: "Social Carousel",
      type: "Social carousel · 320×480",
      use: "Decide & Shop — swipeable meal moments for sticky and social inventory.",
      src: "https://live.mediapal.net/cdn/twww/social-carousel/320x480/index.html",
    },
  ] as const,
} as const;

export const CREATIVE_SHARE = {
  eyebrow: "Creatives",
  title: "Prepare, Eat & Share",
  subhead: "Live banner executions that lock Coke to the meal.",
  lead:
    "Live banners inside food, cooking, family and entertainment contexts — plus formats for the supper and share window when the meal is on.",
  show: [
    "Native / in-article / sidebar beside recipes and dinner ideas",
    "Vertical mobile / social-ready banners for evening and weekend",
    "Occasion bursts — weekend choma, celebrations, seasonal table",
  ] as const,
  label: "Format · Journey stage (Prepare / Eat / Share) · Daypart · Market (KE / TZ / UG)",
  examples: [
    "Good food brings us together.",
    "Good food tastes better together. Enjoy a Coke with your meal.",
    "Better meals together.",
  ] as const,
  footer: "From content to table — and from table to next week’s decision.",
} as const;

export const WHY = {
  eyebrow: "Why MediaPal",
  title: "Built for meal association that repeats.",
  lead1:
    "MediaPal is an independent programmatic network — proprietary tech to reach the right audiences across mobile, video, display and CTV.",
  lead2:
    "For Coca-Cola Meals across Kenya, Tanzania and Uganda: one system for meal-moment audiences, dayparts and content.",
  cards: [
    {
      label: "Occasion-led targeting",
      body: "Across Decide → Shop → Prepare → Eat → Share.",
      image: IMAGES.whyCards[0],
    },
    {
      label: "Premium East Africa inventory",
      body: "Kenya, Tanzania and Uganda across food, news, family and lifestyle.",
      image: IMAGES.whyCards[1],
    },
    {
      label: "Moment, contextual, CTV",
      body: "Activation for home and on-the-go meal decisions.",
      image: IMAGES.whyCards[2],
    },
    {
      label: "Omnichannel optimisation",
      body: "From first impression to repeat meal behaviour.",
      image: IMAGES.whyCards[3],
    },
  ] as const,
} as const;

export const MEASURE = {
  eyebrow: "Next",
  title: "Prove the pairing is sticking.",
  lede: "What we will track",
  track: [
    {
      label: "Reach & frequency",
      body: "Priority dayparts — 12–2 · 4–7 · 7–9.30 · weekends.",
      image: IMAGES.measureCards[0],
    },
    {
      label: "Meal occasions",
      body: "Work lunch, weekday supper, choma, seasonal.",
      image: IMAGES.measureCards[1],
    },
    {
      label: "Market split",
      body: "Kenya · Tanzania · Uganda.",
      image: IMAGES.measureCards[2],
    },
    {
      label: "Engagement quality",
      body: "Food and lifestyle contextual environments.",
      image: IMAGES.measureCards[3],
    },
    {
      label: "Live banners",
      body: "Performance by format, stage and market.",
      image: IMAGES.measureCards[4],
    },
    {
      label: "CTV",
      body: "Completion and household delivery in the supper window.",
      image: IMAGES.measureCards[5],
    },
    {
      label: "Proxy brand measures",
      body: "Aided Coke-with-meals association / intent for the next meal.",
      image: IMAGES.measureCards[6],
    },
    {
      label: "Retail-proximate",
      body: "Performance where geo is live.",
      image: IMAGES.measureCards[7],
    },
  ] as const,
  nextTitle: "Next steps",
  approach:
    "Learn weekly by moment, occasion and market. Shift weight to the stages and dayparts that move meal association — not just cheapest impressions.",
  approach2:
    "Kenya remains the learning base. Tanzania and Uganda scale what works — same journey map, localised dayparts and creative weightings, one commercial rhythm.",
  approach3:
    "Every flight should answer: did we grow Coke’s place at the meal, and which moments earned the next investment?",
  steps: [
    "Align occasion priorities and daypart weights by market (KE / TZ / UG).",
    "Lock creative territories and live banner set to approved TWWW assets.",
    "Build a test-and-learn flight plan — Kenya base, then TZ / UG scale.",
    "Confirm measurement dashboard and any brand-lift partner.",
    "Commercial proposal against agreed multi-market scope.",
  ] as const,
} as const;

export const CLOSE = {
  eyebrow: "Let's talk",
  titleLines: ["LET'S BUILD", "MEAL OCCASIONS."] as const,
  lead: "MediaPal is ready to activate The World Will Wait.",
} as const;

/** Back-compat aliases used by older imports */
export const JOBS = RESPONSE.jobs;
export const PUBLISHERS = KENYA.publishers;
export const KENYA_METRICS = KENYA.metrics;
export const OCCASIONS = AUDIENCE.occasions.map((o) => o.label);
