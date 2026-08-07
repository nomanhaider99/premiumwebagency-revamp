export type Service = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
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
  },
];
