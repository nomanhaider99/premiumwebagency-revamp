import type { ProjectTag } from "@/data/projects";

export type FAQ = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  faqs: FAQ[];
  relatedTag?: ProjectTag;
};

export const services: Service[] = [
  {
    id: "design",
    number: "01",
    title: "Web Design",
    tagline: "Interfaces that feel premium",
    description:
      "Custom, brand-driven UI/UX design that positions you above the competition — grounded in conversion, refined down to the last pixel.",
    features: [
      "UX research & wireframing",
      "Visual & interaction design",
      "Design systems",
      "Prototyping & user testing",
    ],
    relatedTag: "Web Design",
    faqs: [
      {
        question: "Do you design in Figma, or straight into code?",
        answer:
          "Both — we typically design high-fidelity mockups and prototypes in Figma first so you can review and approve the direction, then hand off to development with a full design system attached.",
      },
      {
        question: "How many rounds of revisions are included?",
        answer:
          "Every design engagement includes structured revision rounds at each milestone. Most projects land in 2–3 rounds per stage — we'll scope the exact number based on your project size.",
      },
      {
        question: "Can you redesign an existing site without a full rebuild?",
        answer:
          "Yes. We regularly run visual and UX refreshes on top of existing front-ends, prioritizing the pages and flows that move the needle most.",
      },
    ],
  },
  {
    id: "development",
    number: "02",
    title: "Web Development",
    tagline: "Fast, scalable, built to last",
    description:
      "Hand-built on modern frameworks with performance and accessibility baked in — from WordPress builds to fully custom, full-stack applications.",
    features: [
      "Custom front-end builds",
      "WordPress & headless CMS builds",
      "Full-stack & API development",
      "Performance optimization",
    ],
    relatedTag: "Development",
    faqs: [
      {
        question: "What tech stack do you build on?",
        answer:
          "Mostly modern React/Next.js for custom builds, with WordPress or a headless CMS when content ownership matters most. We choose the stack based on your team's needs, not ours.",
      },
      {
        question: "Will I be able to update content myself after launch?",
        answer:
          "Yes — every build ships with a CMS or admin layer suited to how often you need to publish, plus documentation so your team isn't dependent on us for routine edits.",
      },
      {
        question: "Do you handle hosting and deployment?",
        answer:
          "We can set up and manage hosting end-to-end, or hand off a production-ready deployment to your existing infrastructure — whichever fits your team.",
      },
    ],
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-commerce",
    tagline: "Storefronts built to convert",
    description:
      "Platform-specific builds and custom storefronts engineered for checkout speed and repeat purchase — not just a themed template.",
    features: [
      "Shopify & WooCommerce development",
      "Magento & OpenCart builds",
      "Custom checkout & payment flows",
      "Inventory & catalog architecture",
    ],
    relatedTag: "E-commerce",
    faqs: [
      {
        question: "Which e-commerce platforms do you work with?",
        answer:
          "Primarily Shopify and WooCommerce, with Magento and OpenCart support for larger catalogs. For teams that have outgrown themes entirely, we also build fully custom storefronts.",
      },
      {
        question: "Can you migrate our store from another platform?",
        answer:
          "Yes — product catalogs, customer data, and order history migrations are part of most e-commerce engagements, planned to minimize downtime.",
      },
      {
        question: "Do you integrate with our existing inventory or ERP system?",
        answer:
          "We regularly connect storefronts to inventory management, ERP, and fulfillment systems via API so stock and orders stay in sync automatically.",
      },
    ],
  },
  {
    id: "mobile",
    number: "04",
    title: "Mobile App Development",
    tagline: "Native feel, cross-platform reach",
    description:
      "iOS, Android, and cross-platform apps built with the same design discipline as our web work — from prototype to app store.",
    features: [
      "iOS & Android development",
      "Cross-platform builds",
      "App UX & interaction design",
      "App Store submission & support",
    ],
    faqs: [
      {
        question: "Native or cross-platform — which do you recommend?",
        answer:
          "Cross-platform (React Native) covers most product needs at a lower cost and faster timeline. We recommend fully native only when you need deep hardware access or platform-specific performance.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes — we manage the full submission process, including store listings, screenshots, and review compliance, so your app goes live without last-minute rejections.",
      },
      {
        question: "Can the app share a backend with our website?",
        answer:
          "In most cases, yes. We design the API layer so your website and mobile app run on shared infrastructure, keeping data consistent across platforms.",
      },
    ],
  },
  {
    id: "branding",
    number: "05",
    title: "Branding & Identity",
    tagline: "A mark worth building around",
    description:
      "Logo, identity systems, and brand guidelines that give every touchpoint — web, print, social — a consistent, premium feel.",
    features: [
      "Logo design & concepts",
      "Brand identity systems",
      "Style guides & assets",
      "Business card & collateral design",
    ],
    relatedTag: "Branding",
    faqs: [
      {
        question: "What's included in a brand identity system?",
        answer:
          "Logo suite, color palette, typography, and usage guidelines — plus supporting assets like social templates and business collateral, all documented in a style guide.",
      },
      {
        question: "Do you offer just a logo, or is branding always a full package?",
        answer:
          "Standalone logo design is available, but most clients get more value from the full identity system since it keeps every touchpoint consistent from day one.",
      },
      {
        question: "Can branding work run alongside a new website build?",
        answer:
          "Yes, and it's often the ideal order of operations — the identity system directly informs the web design, so running them together keeps everything cohesive.",
      },
    ],
  },
  {
    id: "marketing",
    number: "06",
    title: "Marketing",
    tagline: "Growth with a strategy behind it",
    description:
      "Full-funnel digital marketing that turns traffic into pipeline — campaign strategy, content, and paid media that compound.",
    features: [
      "Paid media & PPC campaigns",
      "Social media marketing & management",
      "Content & email strategy",
      "Conversion rate optimization",
    ],
    relatedTag: "Marketing",
    faqs: [
      {
        question: "What platforms do you run paid media on?",
        answer:
          "Google, Meta, and LinkedIn most commonly, chosen based on where your audience actually converts — we don't spread budget across channels just to look comprehensive.",
      },
      {
        question: "How do you measure success?",
        answer:
          "Every campaign is tied to pipeline or revenue metrics, not just clicks or impressions. You'll get regular reporting tied to the goals we set together upfront.",
      },
      {
        question: "Do you require a long-term contract?",
        answer:
          "No — we work in monthly engagements and earn the renewal through results. Most clients stay because the numbers keep improving, not because they're locked in.",
      },
    ],
  },
  {
    id: "seo",
    number: "07",
    title: "SEO",
    tagline: "Compounding organic visibility",
    description:
      "Technical, on-page, and authority-building SEO designed to move rankings — and stay there — as your category evolves.",
    features: [
      "Technical SEO audits",
      "Keyword & content strategy",
      "On-page optimization",
      "Link building & authority",
    ],
    relatedTag: "SEO",
    faqs: [
      {
        question: "How long until we see ranking improvements?",
        answer:
          "Technical fixes can show impact within weeks, but meaningful ranking and traffic growth from content and authority work typically compounds over 3–6 months.",
      },
      {
        question: "Do you write the content, or just the strategy?",
        answer:
          "Both — we build the keyword and content strategy and can produce the content itself, or work alongside your in-house writers with a clear editorial brief.",
      },
      {
        question: "Is SEO worth it if we already run paid ads?",
        answer:
          "Yes — SEO reduces your long-term dependency on paid spend and keeps generating traffic even when campaigns pause, making the two channels complementary rather than redundant.",
      },
    ],
  },
  {
    id: "support",
    number: "08",
    title: "Support & Hosting",
    tagline: "Your site, always online and improving",
    description:
      "Ongoing maintenance, security monitoring, and managed hosting so your site stays fast, safe, and up to date long after launch.",
    features: [
      "Managed hosting & SSL",
      "Daily backups & uptime monitoring",
      "Security patches & bug fixes",
      "Ongoing speed & SEO tune-ups",
    ],
    faqs: [
      {
        question: "What happens if our site goes down?",
        answer:
          "Uptime monitoring alerts our team immediately, and most issues are resolved before you'd even notice — backed by daily backups so we can always roll back to a known-good state.",
      },
      {
        question: "Can you take over support for a site you didn't build?",
        answer:
          "Yes — we start with a technical audit of the existing build, then bring hosting, security, and maintenance up to our standard before ongoing support begins.",
      },
      {
        question: "Is this a monthly plan or a one-time service?",
        answer:
          "Support and hosting run as a monthly plan, sized to your site's traffic and complexity — cancel or adjust the tier any time your needs change.",
      },
    ],
  },
];
