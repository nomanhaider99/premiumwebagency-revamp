import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import PillButton from "@/components/motif/PillButton";
import CapabilityHub from "@/components/CapabilityHub";
import CTABand from "@/components/sections/CTABand";
import { DIFFERENTIATORS } from "@/data/site";

export const metadata: Metadata = {
  title: "About — Premium Web Agency",
  description:
    "We're a design, development, and growth studio built for brands that want to lead their market.",
};

const values = [
  {
    title: "Craft over templates",
    description:
      "Every project is designed from first principles for your brand — never a reskinned template.",
  },
  {
    title: "Design and growth, together",
    description:
      "Beautiful sites that don't convert aren't done. We build with SEO and marketing in mind from day one.",
  },
  {
    title: "Obsessed with detail",
    description:
      "Motion, spacing, copy, load time — the details most agencies skip are where we spend our time.",
  },
  {
    title: "A true partnership",
    description:
      "We work as an extension of your team, with direct access to the people building your site.",
  },
];

const STATS = [
  ["120+", "Projects delivered"],
  ["40+", "Brands trusted us"],
  ["98%", "Client retention"],
  ["12+", "Years combined expertise"],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A studio built for brands who refuse to look{" "}
            <span className="gradient-text">average.</span>
          </>
        }
        description="Premium Web Agency is a boutique team of designers, engineers, and strategists who believe your website should be your hardest-working asset — not your biggest compromise."
        actions={
          <>
            <PillButton href="/contact">Get in touch</PillButton>
            <PillButton href="/work" tone="glass">
              See our work
            </PillButton>
          </>
        }
      />

      {/* our story */}
      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  We started this studio because most agencies{" "}
                  <span className="gradient-text">make you choose.</span>
                </>
              }
            />
            <Reveal delay={0.06} className="mt-6 space-y-4 text-[14px] leading-relaxed">
              <p>
                Design shops that ignore performance. Dev shops that ignore
                brand. Marketing agencies that inherit a site they had no hand
                in building. We built Premium Web Agency to close that gap — one
                team responsible for how your brand looks, works, and grows.
              </p>
              <p>
                Today we partner with founders, marketing leaders, and operators
                who need a site that carries real weight: fast, distinctive, and
                built to convert traffic into revenue.
              </p>
            </Reveal>

            <Reveal stagger delay={0.1} className="mt-10 grid grid-cols-2 gap-4">
              {STATS.map(([value, label]) => (
                <RevealItem key={label}>
                  <div className="glass-card p-5">
                    <p className="font-mono text-[1.5rem] leading-none text-[color:var(--text)]">
                      {value}
                    </p>
                    <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.14em]">
                      {label}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          <CapabilityHub />
        </div>
      </section>

      {/* what we believe */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="What we believe"
          title={
            <>
              The principles behind{" "}
              <span className="gradient-text">every project.</span>
            </>
          }
        />
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <RevealItem key={v.title} className="h-full">
              <div className="glass-card h-full p-7">
                <h3 className="text-[1.1rem]">{v.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed">{v.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* differentiators */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              What you actually get{" "}
              <span className="gradient-text">working with us.</span>
            </>
          }
        />
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {DIFFERENTIATORS.map((card) => (
            <RevealItem key={card.title} className="h-full">
              <div className="glass-card h-full p-7">
                <h3 className="text-[1.1rem] leading-snug">{card.title}</h3>
                <p className="mt-4 text-[13px] leading-relaxed">{card.body}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CTABand
        eyebrow="Let's talk"
        title={
          <>
            Want to see if we&apos;re the{" "}
            <span className="gradient-text">right fit?</span>
          </>
        }
        ctaLabel="Get in touch"
        secondary={{ label: "See our work", href: "/work" }}
      />
    </>
  );
}
