import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import IndustryWork from "@/components/sections/IndustryWork";
import PillButton from "@/components/motif/PillButton";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Work — Premium Web Agency",
  description:
    "A selection of web design, development, and growth projects delivered by Premium Web Agency.",
};

const STATS = [
  ["120+", "Projects delivered"],
  ["98%", "Client retention"],
  ["3.4x", "Avg. organic growth"],
  ["12+", "Years combined expertise"],
] as const;

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Projects built to look sharp and{" "}
            <span className="gradient-text">perform sharper.</span>
          </>
        }
        description="A selection of brands we've helped design, build, and grow — across finance, e-commerce, healthcare, and beyond."
        actions={<PillButton href="/contact">Start a project</PillButton>}
      />

      <IndustryWork />

      <section className="container-px py-16">
        <Reveal stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(([value, label]) => (
            <RevealItem key={label}>
              <div className="glass-card p-6">
                <p className="font-mono text-[1.6rem] leading-none text-[color:var(--text)]">
                  {value}
                </p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em]">
                  {label}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CTABand
        eyebrow="Start a project"
        title={
          <>
            Your brand could be <span className="gradient-text">next.</span>
          </>
        }
        ctaLabel="Start a project"
        secondary={{ label: "View pricing", href: "/pricing" }}
      />
    </>
  );
}
