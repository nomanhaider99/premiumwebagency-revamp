/**
 * The industry verticals the work browser is tabbed by.
 *
 * `dribbbleSearch` is where each tab sources its inspiration, and the tab
 * links out to it. `shots` is deliberately empty: Dribbble shots belong to the
 * designers who posted them, so republishing them here as this agency's
 * portfolio would be passing off someone else's work. Drop real screenshots
 * into `shots` and the grid renders them instead of the generated preview.
 */

export type Shot = {
  /** an image in /public, or any host allowed in next.config remotePatterns */
  src: string;
  alt: string;
  /** credit line, required for anything not produced in-house */
  credit?: string;
  href?: string;
};

export type Industry = {
  id: string;
  label: string;
  /** the lucide icon name resolved in industry-icons */
  icon: string;
  blurb: string;
  dribbbleSearch: string;
  /** the two-stop tint the generated preview is drawn in */
  tint: [string, string];
  shots: Shot[];
};

export const industries: Industry[] = [
  {
    id: "medical",
    label: "Medical",
    icon: "stethoscope",
    blurb:
      "Practice sites and patient portals built for trust, accessibility, and local search.",
    dribbbleSearch: "https://dribbble.com/search/medical-website",
    tint: ["#38bdf8", "#6366f1"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/20238692/file/still-6181560f3bd4ddb0e4fc055adf3b24e5.png?format=webp&resize=400x300&vertical=center",
        alt: "MYDNA Medical Website Landing Page Design",
        credit: "MYDNA Medical Website Landing Page Design",
        href: "https://dribbble.com/shots/25565409-MYDNA-Medical-Website-Landing-Page-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47319516/file/b603d1bd4ebf3b848b9d315ec5620bab.jpg?format=webp&resize=400x300&vertical=center",
        alt: "Medical Website UI Design",
        credit: "Medical Website UI Design",
        href: "https://dribbble.com/shots/27259579-Medical-Website-UI-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/43373253/file/original-bd515d7c23279630d483dc03835da31f.png?crop=0x0-2870x2153&format=webp&resize=320x240&vertical=center",
        alt: "Nuvica Medical UI UX Medical Website Landing page design",
        credit: "Nuvica Medical UI UX Medical Website Landing page design",
        href: "https://dribbble.com/shots/26043320-Nuvica-Medical-UI-UX-Medical-Website-Landing-page-design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44296598/file/ae2e8650240e223c733cbfbdd79c7764.png?format=webp&resize=320x240&vertical=center",
        alt: "Online Medical Website Design",
        credit: "Online Medical Website Design",
        href: "https://dribbble.com/shots/26336777-Online-Medical-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/9268030/file/original-2c451f46b06789458e5647cfc55f2f15.png?format=webp&resize=320x240&vertical=center",
        alt: "AxisCare Medical Website Landing Page",
        credit: "AxisCare Medical Website Landing Page",
        href: "https://dribbble.com/shots/22262189-AxisCare-Medical-Website-Landing-Page",
      },
      {
        src: "https://cdn.dribbble.com/userupload/14684664/file/original-39990d44f500852d3ae58c22374eecdb.png?format=webp&resize=320x240&vertical=center",
        alt: "Medical Website",
        credit: "Medical Website",
        href: "https://dribbble.com/shots/24208576-Medical-Website",
      },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: "wrench",
    blurb:
      "Service-area sites with fast quote flows and booking that converts on mobile.",
    dribbbleSearch: "https://dribbble.com/search/plumbing-website",
    tint: ["#0ea5e9", "#0f766e"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/47722908/file/e66150c73929b73279e9f2f80064eea7.png?crop=0x0-1600x1200&format=webp&resize=400x300&vertical=center",
        alt: "Drainix Advanced Plumbing Website Design",
        credit: "Drainix Advanced Plumbing Website Design",
        href: "https://dribbble.com/shots/27374539-Drainix-Advanced-Plumbing-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44533330/file/still-94818f5b16323b2658e5c41164badb42.png?format=webp&resize=400x300&vertical=center",
        alt: "Web Design for Home Services Plumbing Companies",
        credit: "Web Design for Home Services Plumbing Companies",
        href: "https://dribbble.com/shots/26409505-Web-Design-for-Home-Services-Plumbing-Companies",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44544825/file/e9bc86e65841065255f10684892c46b7.png?format=webp&resize=320x240&vertical=center",
        alt: "Home Cleaning Website Plumbing Website design",
        credit: "Home Cleaning Website Plumbing Website design",
        href: "https://dribbble.com/shots/26412981-Home-Cleaning-Website-Plumbing-Website-design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44470345/file/6a8f0b93c673e6b715b1d19c91810fb0.png?format=webp&resize=320x240&vertical=center",
        alt: "Home Service Website Plumbing Website Design",
        credit: "Home Service Website Plumbing Website Design",
        href: "https://dribbble.com/shots/26391201-Home-Service-Website-Plumbing-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47828176/file/918a763d11c5f0991a69baf73e9b3710.png?format=webp&resize=320x240&vertical=center",
        alt: "Plumbing website design",
        credit: "Plumbing website design",
        href: "https://dribbble.com/shots/27404347-Plumbing-website-design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47649980/file/34bbf9f9e6d3aec1689ee9c622d49a1d.png?format=webp&resize=320x240&vertical=center",
        alt: "Plumbing Website Design in Framer",
        credit: "Plumbing Website Design in Framer",
        href: "https://dribbble.com/shots/27354440-Plumbing-Website-Design-in-Framer",
      },
    ],
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: "fan",
    blurb:
      "Seasonal campaigns, maintenance plans, and dispatch-ready enquiry handling.",
    dribbbleSearch: "https://dribbble.com/search/hvac-website",
    tint: ["#f97316", "#0284c7"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/47358521/file/929116d7967f40f004ef9f37c11a30d5.png?format=webp&resize=400x300&vertical=center",
        alt: "HVAC Website Design CoolFix",
        credit: "HVAC Website Design CoolFix",
        href: "https://dribbble.com/shots/27270697-HVAC-Website-Design-CoolFix",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48523583/file/0bb35277fd69d76251ad4768ab9c42fa.jpg?format=webp&resize=400x300&vertical=center",
        alt: "Heating Cooling HVAC Website Design",
        credit: "Heating Cooling HVAC Website Design",
        href: "https://dribbble.com/shots/27597014-Heating-Cooling-HVAC-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48199544/file/d384bdad66755684e077187c46e7d45d.png?format=webp&resize=320x240&vertical=center",
        alt: "HVAC Website Design Modern Heating Cooling Landing Page UI",
        credit: "HVAC Website Design Modern Heating Cooling Landing Page UI",
        href: "https://dribbble.com/shots/27508613-HVAC-Website-Design-Modern-Heating-Cooling-Landing-Page-UI",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48712944/file/67f560adf95237f8996b3e4368668f07.jpg?format=webp&resize=320x240&vertical=center",
        alt: "HVAC Website UI UX Design ComfortAir",
        credit: "HVAC Website UI UX Design ComfortAir",
        href: "https://dribbble.com/shots/27647625-HVAC-Website-UI-UX-Design-ComfortAir",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48494569/file/26772e24c63eb4e2c2e4cd372c38f572.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Heating Cooling HVAC Website Design",
        credit: "Heating Cooling HVAC Website Design",
        href: "https://dribbble.com/shots/27589139-Heating-Cooling-HVAC-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47207416/file/ea9e7fb29d8fc215f517c11c7cd9f851.jpg?format=webp&resize=320x240&vertical=center",
        alt: "HVAC Website Landing Page Design",
        credit: "HVAC Website Landing Page Design",
        href: "https://dribbble.com/shots/27226669-HVAC-Website-Landing-Page-Design",
      },
    ],
  },
  {
    id: "dental",
    label: "Dental",
    icon: "smile",
    blurb:
      "Treatment pages, before-and-after galleries, and online appointment booking.",
    dribbbleSearch: "https://dribbble.com/search/dental-website",
    tint: ["#22d3ee", "#a855f7"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/46257349/file/bdab06b599dc8d245220a62d827c4150.png?format=webp&resize=400x300&vertical=center",
        alt: "Glowdent Dental Website Design",
        credit: "Glowdent Dental Website Design",
        href: "https://dribbble.com/shots/26944747-Glowdent-Dental-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/46459511/file/45c7edbeada216bacd9e66c2340c4c14.jpg?format=webp&resize=400x300&vertical=center",
        alt: "Dent va Dental Website Hero Section",
        credit: "Dent va Dental Website Hero Section",
        href: "https://dribbble.com/shots/27004993-Dent-va-Dental-Website-Hero-Section",
      },
      {
        src: "https://cdn.dribbble.com/userupload/46075591/file/a95202f6d993fbfc8bf2930b83a4563c.png?format=webp&resize=320x240&vertical=center",
        alt: "Dental Website",
        credit: "Dental Website",
        href: "https://dribbble.com/shots/26888318-Dental-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44651803/file/d9c070edf75f147a1100d2d36df9a8ab.png?format=webp&resize=320x240&vertical=center",
        alt: "Crains Dental Dental Website Landing Page UI Design",
        credit: "Crains Dental Dental Website Landing Page UI Design",
        href: "https://dribbble.com/shots/26445958-Crains-Dental-Dental-Website-Landing-Page-UI-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/43990926/file/still-6224fd465e24eab4acf12fc15a8d3351.png?format=webp&resize=320x240&vertical=center",
        alt: "Celestia Modern Dental Website UI Design",
        credit: "Celestia Modern Dental Website UI Design",
        href: "https://dribbble.com/shots/26239707-Celestia-Modern-Dental-Website-UI-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/43611006/file/still-fbe0fdb76ecffdc506834319e4e2ba2f.png?format=webp&resize=320x240&vertical=center",
        alt: "Nova Dental Dental Website UI UX design",
        credit: "Nova Dental Dental Website UI UX design",
        href: "https://dribbble.com/shots/26119579-Nova-Dental-Dental-Website-UI-UX-design",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: "scale",
    blurb:
      "Practice-area architecture and case-result pages engineered for organic reach.",
    dribbbleSearch: "https://dribbble.com/search/law-firm-website",
    tint: ["#64748b", "#1e293b"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/45808771/file/c6567731cab1644ad844a61418f07276.jpg?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center",
        alt: "Law Firm Website",
        credit: "Law Firm Website",
        href: "https://dribbble.com/shots/26806323-Law-Firm-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/45905054/file/66bc899e884979039822116164ca2e7c.jpg?format=webp&resize=400x300&vertical=center",
        alt: "Law Firm Website",
        credit: "Law Firm Website",
        href: "https://dribbble.com/shots/26835482-Law-Firm-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/18314683/file/original-3476372a6ccee03859775cd91c4bc540.png?format=webp&resize=320x240&vertical=center",
        alt: "Law Firm Website Home Page",
        credit: "Law Firm Website Home Page",
        href: "https://dribbble.com/shots/25436084-Law-Firm-Website-Home-Page",
      },
      {
        src: "https://cdn.dribbble.com/userupload/46020012/file/77ab7bb006bd2f451aee2b93c39c2c6c.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Law firm Website",
        credit: "Law firm Website",
        href: "https://dribbble.com/shots/26870991-Law-firm-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/14104284/file/original-ca48e0efead4e2bc4730f50bd7bb90ff.png?format=webp&resize=320x240&vertical=center",
        alt: "Law Firm Website Practices Types Page",
        credit: "Law Firm Website Practices Types Page",
        href: "https://dribbble.com/shots/24008362-Law-Firm-Website-Practices-Types-Page",
      },
      {
        src: "https://cdn.dribbble.com/userupload/14668817/file/original-8e48eb103554b9682f67a5a4ad6b309c.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Law firm website UI Design",
        credit: "Law firm website UI Design",
        href: "https://dribbble.com/shots/24202972-Law-firm-website-UI-Design",
      },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: "building",
    blurb:
      "Listing search, IDX integrations, and agent profiles that generate enquiries.",
    dribbbleSearch: "https://dribbble.com/search/real-estate-website",
    tint: ["#14b8a6", "#4f46e5"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/45867978/file/still-c5e25acb0e6a1805ec2951c79609a012.png?format=webp&resize=400x300&vertical=center",
        alt: "Real Estate Website Design",
        credit: "Real Estate Website Design",
        href: "https://dribbble.com/shots/26824916-Real-Estate-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44019642/file/original-7f9894d1cb1605470b3399a79f165345.png?format=webp&resize=400x300&vertical=center",
        alt: "ARKO Real Estate Website",
        credit: "ARKO Real Estate Website",
        href: "https://dribbble.com/shots/26248799-ARKO-Real-Estate-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/19564469/file/original-fd6fb3b9ef09eeba7004324951163af4.png?format=webp&resize=320x240&vertical=center",
        alt: "Real Estate Website Template",
        credit: "Real Estate Website Template",
        href: "https://dribbble.com/shots/25548322-Real-Estate-Website-Template",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47645632/file/still-c7c5dc6bf263d6debfe952575fc335ab.png?format=webp&resize=320x240&vertical=center",
        alt: "ELORIA Luxury Real Estate Website Design",
        credit: "ELORIA Luxury Real Estate Website Design",
        href: "https://dribbble.com/shots/27353169-ELORIA-Luxury-Real-Estate-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/43212245/file/original-0d1c4dc5148c284dabef69e1bab887ab.png?format=webp&resize=320x240&vertical=center",
        alt: "Real Estate Website",
        credit: "Real Estate Website",
        href: "https://dribbble.com/shots/25992431-Real-Estate-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48323600/file/still-df94da6f2cc89f304524f439b843cb8b.png?format=webp&resize=320x240&vertical=center",
        alt: "Landing Page Design for Luxury Real Estate Brands",
        credit: "Landing Page Design for Luxury Real Estate Brands",
        href: "https://dribbble.com/shots/27542168-Landing-Page-Design-for-Luxury-Real-Estate-Brands",
      },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: "utensils",
    blurb:
      "Menus, reservations, and ordering that stay fast on a phone in a dark room.",
    dribbbleSearch: "https://dribbble.com/search/restaurant-website",
    tint: ["#f43f5e", "#f59e0b"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/46704420/file/still-81aa402138efbbbea84191166a38fd97.png?format=webp&resize=400x300&vertical=center",
        alt: "Restaurant Website Design The Nocturne",
        credit: "Restaurant Website Design The Nocturne",
        href: "https://dribbble.com/shots/27077122-Restaurant-Website-Design-The-Nocturne",
      },
      {
        src: "https://cdn.dribbble.com/userupload/42852847/file/original-25bd3d1556793a298831d36c91599952.jpg?format=webp&resize=400x300&vertical=center",
        alt: "Chips N Chops Restaurant Website UIUX Design",
        credit: "Chips N Chops Restaurant Website UIUX Design",
        href: "https://dribbble.com/shots/25878757-Chips-N-Chops-Restaurant-Website-UIUX-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47288983/file/0e84ac97fb6971b92d161ed94b2889c9.png?format=webp&resize=320x240&vertical=center",
        alt: "Kado Restaurant website",
        credit: "Kado Restaurant website",
        href: "https://dribbble.com/shots/27250546-Kado-Restaurant-website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48601369/file/d60cc94fb6ed8e392f210ff7540ac893.png?format=webp&resize=320x240&vertical=center",
        alt: "Restaurant Website Burger Website Restaurant Landing Page",
        credit: "Restaurant Website Burger Website Restaurant Landing Page",
        href: "https://dribbble.com/shots/27617560-Restaurant-Website-Burger-Website-Restaurant-Landing-Page",
      },
      {
        src: "https://cdn.dribbble.com/userupload/9625731/file/original-181dca7e11d6d16e07a82f53c3850728.png?format=webp&resize=320x240&vertical=center",
        alt: "Restaurant Website",
        credit: "Restaurant Website",
        href: "https://dribbble.com/shots/22395715-Restaurant-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/31794201/file/still-4b00ea29e211ef9b535a518ef0357af0.png?format=webp&resize=320x240&vertical=center",
        alt: "Chinese Restaurant Website Interactions",
        credit: "Chinese Restaurant Website Interactions",
        href: "https://dribbble.com/shots/15691359-Chinese-Restaurant-Website-Interactions",
      },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: "dumbbell",
    blurb:
      "Class schedules, membership funnels, and trainer pages built around sign-ups.",
    dribbbleSearch: "https://dribbble.com/search/gym-fitness-website",
    tint: ["#84cc16", "#0891b2"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/6459861/file/original-5eeef7d5356ee40c3084280bb7a86837.png?format=webp&resize=400x300&vertical=center",
        alt: "ZONIXX Gym Fitness Website",
        credit: "ZONIXX Gym Fitness Website",
        href: "https://dribbble.com/shots/21269502-ZONIXX-Gym-Fitness-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48715791/file/a352067a21c1a1d2bc82189a457226ef.png?crop=240x0-1680x1080&format=webp&resize=400x300&vertical=center",
        alt: "IronPulse Fitness Modern Gym Fitness Website",
        credit: "IronPulse Fitness Modern Gym Fitness Website",
        href: "https://dribbble.com/shots/27648464-IronPulse-Fitness-Modern-Gym-Fitness-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44265665/file/8bef4d0fc6501e1953c345e6dbcbfbc3.png?format=webp&resize=320x240&vertical=center",
        alt: "Gym Fitness Website",
        credit: "Gym Fitness Website",
        href: "https://dribbble.com/shots/26326704-Gym-Fitness-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/45629215/file/2918b0d8360d7ef7130125f904f14c69.png?format=webp&resize=320x240&vertical=center",
        alt: "Bartos Gym Fitness Website",
        credit: "Bartos Gym Fitness Website",
        href: "https://dribbble.com/shots/26749276-Bartos-Gym-Fitness-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48779341/file/d42deb7fc3e93e7a119c8814621142a4.png?format=webp&resize=320x240&vertical=center",
        alt: "Elite Fitness Club Modern gym fitness website",
        credit: "Elite Fitness Club Modern gym fitness website",
        href: "https://dribbble.com/shots/27665436-Elite-Fitness-Club-Modern-gym-fitness-website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/48717012/file/fd5e3b21dfd8ccc7d504a2ad5b9781c9.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Premium Gym Fitness Website Design",
        credit: "Premium Gym Fitness Website Design",
        href: "https://dribbble.com/shots/27648704-Premium-Gym-Fitness-Website-Design",
      },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    icon: "hard-hat",
    blurb:
      "Project galleries, trade credentials, and tender-ready enquiry capture.",
    dribbbleSearch: "https://dribbble.com/search/construction-website",
    tint: ["#eab308", "#78350f"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/48175327/file/6fb2c1fee7864b7f40c73a85904a74c1.jpeg?format=webp&resize=400x300&vertical=center",
        alt: "GP Industrial Architecture Construction Website Projects Page",
        credit: "GP Industrial Architecture Construction Website Projects Page",
        href: "https://dribbble.com/shots/27502308-GP-Industrial-Architecture-Construction-Website-Projects-Page",
      },
      {
        src: "https://cdn.dribbble.com/userupload/45417448/file/01bfdbb58a4c33724b6d7f61e70283c4.png?format=webp&resize=400x300&vertical=center",
        alt: "BuildNest About Page Concept for Construction Website",
        credit: "BuildNest About Page Concept for Construction Website",
        href: "https://dribbble.com/shots/26682976-BuildNest-About-Page-Concept-for-Construction-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/47392966/file/a31d0d6357f2825ca82eeb2f76a2ef4f.png?format=webp&resize=320x240&vertical=center",
        alt: "Home Renovation and Construction Website Design",
        credit: "Home Renovation and Construction Website Design",
        href: "https://dribbble.com/shots/27280283-Home-Renovation-and-Construction-Website-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/18673480/file/original-bdaa94de43c5c93aed21ea8a2b318536.png?crop=0x0-3201x2401&format=webp&resize=320x240&vertical=center",
        alt: "Constructions Website UIUX Design About us",
        credit: "Constructions Website UIUX Design About us",
        href: "https://dribbble.com/shots/25500393-Constructions-Website-UIUX-Design-About-us",
      },
      {
        src: "https://cdn.dribbble.com/userupload/43542557/file/original-0a2ba9de76ab05c35f6f3ddc17ced772.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Cretonix Construction Website",
        credit: "Cretonix Construction Website",
        href: "https://dribbble.com/shots/26097469-Cretonix-Construction-Website",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44157595/file/original-5b16ad86cc2d4e81cdf07bb5db550b26.png?format=webp&resize=320x240&vertical=center",
        alt: "Parkview Construction Website Design",
        credit: "Parkview Construction Website Design",
        href: "https://dribbble.com/shots/26292669-Parkview-Construction-Website-Design",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "shopping-bag",
    blurb:
      "Storefronts engineered for checkout speed and repeat purchase, not themed templates.",
    dribbbleSearch: "https://dribbble.com/search/ecommerce-website",
    tint: ["#8b5cf6", "#ec4899"],
    shots: [
      {
        src: "https://cdn.dribbble.com/userupload/43747962/file/original-7809a3393e32deebf614d485f09b3b37.png?format=webp&resize=400x300&vertical=center",
        alt: "Ecommerce Website Design for Crockery Kitchenware Brands",
        credit: "Ecommerce Website Design for Crockery Kitchenware Brands",
        href: "https://dribbble.com/shots/26163743-Ecommerce-Website-Design-for-Crockery-Kitchenware-Brands",
      },
      {
        src: "https://cdn.dribbble.com/userupload/3772713/file/still-fc903bb220a0746203642bc9bce89e08.png?format=webp&resize=400x300&vertical=center",
        alt: "Shopcart Ecommerce Web Design for Electronics Stores",
        credit: "Shopcart Ecommerce Web Design for Electronics Stores",
        href: "https://dribbble.com/shots/19614098-Shopcart-Ecommerce-Web-Design-for-Electronics-Stores",
      },
      {
        src: "https://cdn.dribbble.com/userupload/23744972/file/original-f09ad4491cf30c1628e68083ad7d12ad.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Ecommerce website Header Exploration",
        credit: "Ecommerce website Header Exploration",
        href: "https://dribbble.com/shots/25602656-Ecommerce-website-Header-Exploration",
      },
      {
        src: "https://cdn.dribbble.com/userupload/45970016/file/9fd47dd6f0a0e7a97c5bdee3c2ad1b75.png?format=webp&resize=320x240&vertical=center",
        alt: "Ecommerce Website UI Design",
        credit: "Ecommerce Website UI Design",
        href: "https://dribbble.com/shots/26855286-Ecommerce-Website-UI-Design",
      },
      {
        src: "https://cdn.dribbble.com/userupload/44359504/file/01d4b7ac7f7b6e0c9e4c6f1d512d94c6.jpg?format=webp&resize=320x240&vertical=center",
        alt: "Modern Ecommerce Website UI UX Concept Fashion Retail Shop",
        credit: "Modern Ecommerce Website UI UX Concept Fashion Retail Shop",
        href: "https://dribbble.com/shots/26356688-Modern-Ecommerce-Website-UI-UX-Concept-Fashion-Retail-Shop",
      },
      {
        src: "https://cdn.dribbble.com/userupload/46422969/file/e667bc46dc85d620d0020ce0e8d1a57f.png?format=webp&resize=320x240&vertical=center",
        alt: "Watch eCommerce Website",
        credit: "Watch eCommerce Website",
        href: "https://dribbble.com/shots/26994197-Watch-eCommerce-Website",
      },
    ],
  },
];
