/** Single source for the details that repeat across the header, hero and footer. */

export const SITE = {
  name: "Premium Web Agency",
  wordmark: "PREMIUM WEB AGENCY",
  email: "hello@premiumwebagency.com",
  phone: "+1 (555) 010-2030",
  location: "Remote-first · Worldwide",
  since: "2014",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com" },
  { label: "Instagram", short: "ig", href: "https://www.instagram.com" },
  { label: "X", short: "x", href: "https://x.com" },
  { label: "Behance", short: "be", href: "https://www.behance.net" },
] as const;

export const PRIMARY_NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

/** the three cards that carry the "why choose us" block */
export const DIFFERENTIATORS = [
  {
    title: "One Studio, Every Discipline",
    body: "Design, engineering, and growth sit on the same team, so nothing is lost in a handoff. One group is accountable for how your brand looks, works, and performs.",
    tone: "cyan",
  },
  {
    title: "AI Woven Through It",
    body: "AI runs through the work and the delivery — automating what shouldn't need a person, turning your data into decisions, and building intelligence into what you ship.",
    tone: "peach",
  },
  {
    title: "Craft Over Templates",
    body: "Every project is designed from first principles for your brand, never a reskinned theme — and engineered for the performance and accessibility scores to prove it.",
    tone: "lavender",
  },
] as const;
