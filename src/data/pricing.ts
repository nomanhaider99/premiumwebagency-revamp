import type { ProjectTag } from "@/data/projects";

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
  features: string[];
};

export type PricingCategory = ProjectTag | "All";

export const pricingCategories: PricingCategory[] = [
  "All",
  "Web Design",
  "Development",
  "E-commerce",
  "SEO",
  "Marketing",
  "Branding",
];

export const plansByCategory: Record<PricingCategory, Plan[]> = {
  All: [
    {
      id: "starter",
      name: "Starter",
      tagline: "For brands launching their first premium site",
      monthly: 1200,
      yearly: 960,
      features: [
        "5-page custom web design",
        "Mobile-first responsive build",
        "Basic on-page SEO setup",
        "1 round of revisions",
        "30-day post-launch support",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "For teams ready to invest in design & marketing",
      monthly: 2800,
      yearly: 2240,
      featured: true,
      features: [
        "Up to 12 pages, custom design",
        "Headless CMS integration",
        "Technical & on-page SEO",
        "Conversion-focused UX",
        "Unlimited revisions",
        "90-day post-launch support",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      tagline: "For brands running full-funnel growth programs",
      monthly: 5500,
      yearly: 4400,
      features: [
        "Unlimited pages & templates",
        "E-commerce / custom app builds",
        "Full-funnel paid media strategy",
        "Dedicated design & dev pod",
        "Priority support & SLAs",
        "Quarterly growth reporting",
      ],
    },
  ],
  "Web Design": [
    {
      id: "design-starter",
      name: "Starter",
      tagline: "A clean, custom site that gets you live fast",
      monthly: 1200,
      yearly: 960,
      features: [
        "5-page custom UI/UX design",
        "Mobile-first responsive build",
        "1 round of revisions",
        "Basic design system",
        "30-day post-launch support",
      ],
    },
    {
      id: "design-growth",
      name: "Growth",
      tagline: "Research-led design built to convert",
      monthly: 2400,
      yearly: 1920,
      featured: true,
      features: [
        "Up to 12 pages, custom design",
        "UX research & wireframing",
        "Interaction design & prototyping",
        "Full design system",
        "Unlimited revisions",
        "90-day post-launch support",
      ],
    },
    {
      id: "design-scale",
      name: "Scale",
      tagline: "For brands with a large, evolving site",
      monthly: 4200,
      yearly: 3360,
      features: [
        "Unlimited pages & templates",
        "User testing & validation",
        "Advanced design system & documentation",
        "Dedicated design pod",
        "Priority support & SLAs",
      ],
    },
  ],
  Development: [
    {
      id: "dev-starter",
      name: "Starter",
      tagline: "A fast, solid build on a modern stack",
      monthly: 1400,
      yearly: 1120,
      features: [
        "WordPress or custom front-end build",
        "Responsive implementation",
        "Basic performance optimization",
        "1 round of revisions",
        "30-day post-launch support",
      ],
    },
    {
      id: "dev-growth",
      name: "Growth",
      tagline: "Full-stack builds with real engineering behind them",
      monthly: 3000,
      yearly: 2400,
      featured: true,
      features: [
        "Headless CMS integration",
        "Full-stack & API development",
        "Performance & accessibility optimization",
        "Unlimited revisions",
        "90-day post-launch support",
      ],
    },
    {
      id: "dev-scale",
      name: "Scale",
      tagline: "For complex, custom applications",
      monthly: 6000,
      yearly: 4800,
      features: [
        "Custom full-stack applications",
        "Complex API & back-end architecture",
        "Dedicated development pod",
        "Priority support & SLAs",
        "Quarterly performance reporting",
      ],
    },
  ],
  "E-commerce": [
    {
      id: "ecom-starter",
      name: "Starter",
      tagline: "Get selling with a proven storefront",
      monthly: 1800,
      yearly: 1440,
      features: [
        "Shopify or WooCommerce storefront",
        "Standard checkout setup",
        "Product catalog setup",
        "1 round of revisions",
        "30-day post-launch support",
      ],
    },
    {
      id: "ecom-growth",
      name: "Growth",
      tagline: "A custom storefront engineered to convert",
      monthly: 3500,
      yearly: 2800,
      featured: true,
      features: [
        "Custom storefront design & build",
        "Optimized checkout & payment flows",
        "Inventory & catalog architecture",
        "Unlimited revisions",
        "90-day post-launch support",
      ],
    },
    {
      id: "ecom-scale",
      name: "Scale",
      tagline: "For high-volume, multi-platform stores",
      monthly: 7000,
      yearly: 5600,
      features: [
        "Platform migration (Magento, OpenCart, custom)",
        "Advanced checkout & subscription flows",
        "Dedicated e-commerce dev pod",
        "Priority support & SLAs",
        "Quarterly growth reporting",
      ],
    },
  ],
  SEO: [
    {
      id: "seo-starter",
      name: "Starter",
      tagline: "Get the technical foundation right",
      monthly: 900,
      yearly: 720,
      features: [
        "Technical SEO audit",
        "On-page optimization (up to 10 pages)",
        "Keyword research",
        "Monthly reporting",
      ],
    },
    {
      id: "seo-growth",
      name: "Growth",
      tagline: "Compounding visibility, month over month",
      monthly: 1800,
      yearly: 1440,
      featured: true,
      features: [
        "Keyword & content strategy",
        "Ongoing on-page optimization",
        "Link building & authority",
        "Monthly reporting",
      ],
    },
    {
      id: "seo-scale",
      name: "Scale",
      tagline: "For category-leading organic growth",
      monthly: 3500,
      yearly: 2800,
      features: [
        "Enterprise technical SEO",
        "Content production at scale",
        "Dedicated SEO strategist",
        "Quarterly growth reporting",
      ],
    },
  ],
  Marketing: [
    {
      id: "mkt-starter",
      name: "Starter",
      tagline: "Get a single channel performing",
      monthly: 1000,
      yearly: 800,
      features: [
        "Single-channel paid media",
        "Monthly content calendar",
        "Basic CRO recommendations",
        "Monthly reporting",
      ],
    },
    {
      id: "mkt-growth",
      name: "Growth",
      tagline: "Multi-channel campaigns that compound",
      monthly: 2200,
      yearly: 1760,
      featured: true,
      features: [
        "Multi-channel paid media & PPC",
        "Social media marketing & management",
        "Content & email strategy",
        "Ongoing CRO testing",
      ],
    },
    {
      id: "mkt-scale",
      name: "Scale",
      tagline: "A full-funnel growth program",
      monthly: 4500,
      yearly: 3600,
      features: [
        "Full-funnel campaign strategy",
        "Dedicated growth pod",
        "Quarterly growth reporting",
        "Priority support & SLAs",
      ],
    },
  ],
  Branding: [
    {
      id: "brand-starter",
      name: "Starter",
      tagline: "A mark you can build on",
      monthly: 1000,
      yearly: 800,
      features: [
        "Logo design & concepts",
        "Basic style guide",
        "Business card design",
        "1 round of revisions",
      ],
    },
    {
      id: "brand-growth",
      name: "Growth",
      tagline: "A consistent identity across every touchpoint",
      monthly: 2000,
      yearly: 1600,
      featured: true,
      features: [
        "Full brand identity system",
        "Style guide & asset library",
        "Print & digital collateral",
        "Unlimited revisions",
      ],
    },
    {
      id: "brand-scale",
      name: "Scale",
      tagline: "For multi-brand or sub-brand portfolios",
      monthly: 3800,
      yearly: 3040,
      features: [
        "Multi-brand / sub-brand systems",
        "Full guidelines documentation",
        "Dedicated brand pod",
        "Priority support & SLAs",
      ],
    },
  ],
};
