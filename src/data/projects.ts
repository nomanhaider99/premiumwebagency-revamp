export type ProjectTag =
  | "Web Design"
  | "Development"
  | "E-commerce"
  | "SEO"
  | "Marketing"
  | "Branding";

export type Project = {
  slug: string;
  name: string;
  category: string;
  tags: ProjectTag[];
  year: string;
  gradient: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "aurora-finance",
    name: "Aurora Finance",
    category: "Web Design & Development",
    tags: ["Web Design", "Development"],
    year: "2025",
    gradient: "from-[#053742] via-[#0c5a6b] to-[#39a2db]",
    description:
      "A full brand-to-web rebuild for a wealth management platform, focused on trust, clarity, and conversion.",
  },
  {
    slug: "verdant-goods",
    name: "Verdant Goods",
    category: "E-commerce & SEO",
    tags: ["E-commerce", "SEO"],
    year: "2025",
    gradient: "from-[#39a2db] via-[#5cb6e6] to-[#a2dbfa]",
    description:
      "Headless commerce build paired with a technical SEO overhaul that lifted organic revenue by 3.4x.",
  },
  {
    slug: "northline-studio",
    name: "Northline Studio",
    category: "Web Design & Marketing",
    tags: ["Web Design", "Marketing"],
    year: "2024",
    gradient: "from-[#053742] via-[#1c6e7d] to-[#a2dbfa]",
    description:
      "A portfolio and booking experience for a creative studio, launched with a full-funnel paid media strategy.",
  },
  {
    slug: "haven-clinics",
    name: "Haven Clinics",
    category: "Web Development & SEO",
    tags: ["Development", "SEO"],
    year: "2024",
    gradient: "from-[#0c5a6b] via-[#39a2db] to-[#e8f0f2]",
    description:
      "Multi-location healthcare site built for speed and local SEO, now ranking #1 across 12 markets.",
  },
  {
    slug: "meridian-capital",
    name: "Meridian Capital",
    category: "Brand & Web Design",
    tags: ["Branding", "Web Design"],
    year: "2024",
    gradient: "from-[#053742] via-[#39a2db] to-[#a2dbfa]",
    description:
      "A premium digital identity for an investment firm entering a new market segment.",
  },
  {
    slug: "loom-and-co",
    name: "Loom & Co.",
    category: "E-commerce Development",
    tags: ["E-commerce", "Development"],
    year: "2023",
    gradient: "from-[#1c6e7d] via-[#39a2db] to-[#e8f0f2]",
    description:
      "A custom Shopify-alternative storefront built for a fast-scaling direct-to-consumer furniture brand.",
  },
];
