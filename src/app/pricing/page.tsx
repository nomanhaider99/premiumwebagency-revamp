import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import PricingSection from "@/components/PricingSection";
import PillButton from "@/components/motif/PillButton";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Pricing — Premium Web Agency",
  description:
    "Simple, transparent pricing for premium web design, development, and growth marketing engagements.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Investment that matches the{" "}
            <span className="gradient-text">quality</span> of the work.
          </>
        }
        description="Transparent packages for brands that want premium design, development, and growth — no hidden scope, no surprises."
        actions={<PillButton href="/contact">Book an intro call</PillButton>}
      />

      <section className="container-px py-12 lg:py-20">
        <Reveal>
          <PricingSection />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-[13px]">
            Need something bespoke?{" "}
            <a
              href="/contact"
              className="text-[color:var(--text)] underline underline-offset-4"
            >
              Let&apos;s scope a custom engagement
            </a>
            .
          </p>
        </Reveal>
      </section>

      <CTABand
        eyebrow="Book an intro call"
        title={
          <>
            Not sure which <span className="gradient-text">plan fits?</span>
          </>
        }
        ctaLabel="Book an intro call"
        secondary={{ label: "See our services", href: "/services" }}
      />
    </>
  );
}
