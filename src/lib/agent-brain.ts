import { services } from "@/data/services";
import { plansByCategory } from "@/data/pricing";
import { SITE } from "@/data/site";

/**
 * The agent's answers.
 *
 * Everything it says is derived from the site's own data — services, plans,
 * contact details — rather than written a second time here. A concierge that
 * quotes a price the pricing page has never heard of is worse than no
 * concierge at all, so the numbers below are read, never retyped.
 *
 * Routing is intent-first and keyword-matched: deliberately small, legible,
 * and offline. `reply()` is the single seam — swap its body for a call to a
 * model endpoint and every piece of UI around it keeps working unchanged.
 */

export type AgentReply = {
  text: string;
  /** follow-ups offered under the answer, to keep the conversation moving */
  chips?: string[];
  /** surface the hand-off to a person under this answer */
  handoff?: boolean;
};

type Intent = {
  id: string;
  /** matched against the lowercased message; first intent to match wins */
  patterns: RegExp;
  answer: () => AgentReply;
};

const plans = plansByCategory.All;
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const serviceLine = (id: string) => {
  const s = services.find((x) => x.id === id);
  return s ? `**${s.title}** — ${s.tagline}. ${s.description}` : "";
};

/** the chips shown on a cold thread, and after answers that end a branch */
export const STARTER_PROMPTS = [
  "What do you build?",
  "How much does a website cost?",
  "How long does a project take?",
  "Can you help with SEO?",
];

/**
 * Order matters — the first pattern to match wins, so the narrow intents
 * (asking for a person, asking for a price) sit above the broad ones.
 */
const INTENTS: Intent[] = [
  {
    id: "human",
    patterns:
      /\b(human|real person|sales rep|call me|book a call|speak to|talk to (a|someone)|schedule a)\b/,
    answer: () => ({
      text: `Of course — a person is the right call here. Switch to the **Talk to a human** tab and leave your details, or email ${SITE.email} directly. Someone from the studio replies within one business day.`,
      handoff: true,
    }),
  },
  {
    id: "greeting",
    patterns: /^(hi|hey|hello|yo|good (morning|afternoon|evening))\b/,
    answer: () => ({
      text: `Hi — good to meet you. I'm the ${SITE.name} agent. I can walk you through what we build, what it costs, how long it takes, and how we work. What's on your mind?`,
      chips: STARTER_PROMPTS,
    }),
  },
  {
    id: "plan-detail",
    patterns: /\b(growth plan|in growth|starter plan|scale plan|plan include|what.s in)\b/,
    answer: () => {
      const growth = plans.find((p) => p.id === "growth") ?? plans[0];
      return {
        text: [
          `**${growth.name}** — ${money(growth.monthly)}/mo. ${growth.tagline}.`,
          ``,
          ...growth.features.map((f) => `· ${f}`),
          ``,
          `Most teams land here. If you need e-commerce, a custom app, or paid media, Scale is the tier that carries those.`,
        ].join("\n"),
        chips: ["What are the other plans?", "I'd like a quote"],
      };
    },
  },
  {
    id: "pricing",
    patterns:
      /\b(price|pricing|cost|costs|budget|quote|how much|rate|rates|expensive|afford|retainer|plans)\b/,
    answer: () => ({
      text: [
        `Engagements run as monthly plans, each custom-scoped after an intro call:`,
        ``,
        ...plans.map(
          (p) =>
            `**${p.name}** — from ${money(p.monthly)}/mo (${money(p.yearly)}/mo billed yearly). ${p.tagline}.`
        ),
        ``,
        `The Pricing page breaks every plan down by discipline. Tell me roughly what you're building and I'll point you at the right tier.`,
      ].join("\n"),
      chips: ["What's in the Growth plan?", "How long does a project take?", "I'd like a quote"],
    }),
  },
  {
    id: "timeline",
    patterns: /\b(how long|timeline|timeframe|turnaround|deadline|when can|lead time|how fast|how quick)\b/,
    answer: () => ({
      text: [
        `It depends on scope, but as a working guide:`,
        ``,
        `· **Brand or landing page** — 2–3 weeks`,
        `· **Marketing site, 8–12 pages** — 5–8 weeks`,
        `· **E-commerce or custom app** — 8–16 weeks`,
        ``,
        `Design and engineering sit on the same team, so there's no handoff gap between them — that gap is usually where timelines go.`,
      ].join("\n"),
      chips: ["How do you work?", "How much does it cost?"],
    }),
  },
  {
    id: "process",
    patterns: /\b(process|how do you work|workflow|steps|approach|methodology|onboard)\b/,
    answer: () => ({
      text: [
        `Four phases, and you see real work at the end of each one:`,
        ``,
        `**1 · Discovery** — goals, audience, competitors, and what success means in actual numbers.`,
        `**2 · Design** — a high-fidelity direction in Figma, approved before a line of code.`,
        `**3 · Build** — engineered for performance and accessibility, staging links throughout.`,
        `**4 · Grow** — launch, then SEO and iteration against the numbers set in discovery.`,
        ``,
        `AI runs through delivery rather than sitting beside it — that's how the pace holds without thinning the craft.`,
      ].join("\n"),
      chips: ["How long does a project take?", "What's your tech stack?"],
    }),
  },
  {
    id: "seo",
    patterns: /\b(seo|search engine|rank|ranking|rankings|google|organic|keywords)\b/,
    answer: () => ({
      text: `${serviceLine("seo")}\n\nIt's the same team that designed and built the site, so technical SEO isn't retrofitted onto someone else's markup — it's in the build from day one. Clients average 3.4× organic growth.`,
      chips: ["How much does SEO cost?", "How long does it take to rank?"],
    }),
  },
  {
    id: "ecommerce",
    patterns: /\b(ecommerce|e-commerce|shop|store|storefront|shopify|checkout|cart|sell online)\b/,
    answer: () => ({
      text: `${serviceLine("ecommerce")}\n\nWe build on headless stacks as readily as on Shopify — the right call depends on catalogue size, merchandising, and who edits it day to day.`,
      chips: ["How much does a store cost?", "How long does it take?"],
    }),
  },
  {
    id: "ai",
    patterns: /\b(ai|artificial intelligence|llm|chatbot|automation|automate|machine learning|gpt|assistant)\b/,
    answer: () => ({
      text: `${serviceLine("ai")}\n\nIn practice: assistants like this one, automations that remove work nobody should be doing by hand, and turning your own data into something a team can decide from.`,
      chips: ["Could you build one of these for us?", "How much does it cost?"],
    }),
  },
  {
    id: "services",
    patterns:
      /\b(services|what do you (do|build|offer|make)|capabilit|help with|specialis|specializ|offer)\b/,
    answer: () => ({
      text: [
        `We run the whole path in one studio — design, engineering, and growth:`,
        ``,
        ...services.slice(0, 6).map((s) => `· **${s.title}** — ${s.tagline}`),
        ``,
        `Plus ${services
          .slice(6)
          .map((s) => s.title)
          .join(", ")}. Which is closest to what you need?`,
      ].join("\n"),
      chips: ["Tell me about AI engineering", "Can you help with SEO?", "Do you build e-commerce?"],
    }),
  },
  {
    id: "design",
    patterns: /\b(design|ui|ux|figma|redesign|brand|branding|logo|identity|mockup|wireframe)\b/,
    answer: () => ({
      text: `${serviceLine("design")}\n\nEvery project is designed from first principles for your brand — never a reskinned theme. You approve a high-fidelity direction in Figma before anything gets built.`,
      chips: ["How long does design take?", "Can I see your work?"],
    }),
  },
  {
    id: "development",
    patterns: /\b(develop|code|coding|engineer|stack|tech|next\.?js|react|cms|headless|api|integrat|app|software)\b/,
    answer: () => ({
      text: `${serviceLine("development")}\n\nTypically Next.js and React on a headless CMS, deployed on edge infrastructure — chosen per project rather than by habit, and always with the performance and accessibility scores to back it up.`,
      chips: ["How do you work?", "Do you do maintenance?"],
    }),
  },
  {
    id: "support",
    patterns: /\b(support|maintenance|maintain|hosting|uptime|after launch|sla|ongoing)\b/,
    answer: () => ({
      text: `${serviceLine("support")}\n\nEvery plan carries post-launch support — 30 days on Starter, 90 on Growth, priority SLAs on Scale.`,
      chips: ["What are the plans?", "I'd like to talk to someone"],
    }),
  },
  {
    id: "work",
    patterns: /\b(portfolio|your work|case stud|examples|clients|projects|showcase|previous)\b/,
    answer: () => ({
      text: `120+ projects delivered with 98% client retention — e-commerce, SaaS, health, real estate and more. The **Work** page carries the case studies, filterable by industry and discipline.`,
      chips: ["What do you build?", "How much does it cost?"],
    }),
  },
  {
    id: "contact",
    patterns: /\b(contact|email|phone|reach you|located|where are you|timezone|hours)\b/,
    answer: () => ({
      text: `${SITE.email} · ${SITE.phone}. We're ${SITE.location.toLowerCase()}, working since ${SITE.since}, and we reply within one business day. The **Talk to a human** tab goes straight to the team.`,
      handoff: true,
    }),
  },
  {
    id: "start",
    patterns: /\b(start|get going|hire|work with|engage|proposal|brief|interested|new project)\b/,
    answer: () => ({
      text: `Happy to get that moving. Tell me the project in a sentence or two — what it is, roughly what it needs to do — and I'll point you at the right plan. When you're ready for a person, the **Talk to a human** tab books the intro call.`,
      handoff: true,
    }),
  },
];

const FALLBACK: AgentReply = {
  text: `I'd rather not guess at that one. I'm solid on what we build, what it costs, how long it takes, and how we work — or I can hand you to the team, who can answer anything I can't.`,
  chips: STARTER_PROMPTS,
  handoff: true,
};

/** Route a message to an answer. The single seam a real model would replace. */
export function reply(message: string): AgentReply {
  const text = message.trim().toLowerCase();
  if (!text) return FALLBACK;

  const hit = INTENTS.find((intent) => intent.patterns.test(text));
  return hit ? hit.answer() : FALLBACK;
}

/** The opening message, shown before anyone has typed anything. */
export const GREETING = `Hi — I'm the ${SITE.name} agent. Ask me what we build, what it costs, or how we work. Prefer a person? There's one a tab away.`;

/** Rotating teaser for the hero trigger — real questions, in our own words. */
export const TEASERS = [
  "What does a premium site cost?",
  "How long until we launch?",
  "Can you fix our search rankings?",
  "Do you build e-commerce?",
  "How do you use AI in delivery?",
];
