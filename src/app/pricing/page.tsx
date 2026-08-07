import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import PricingSection from "@/components/PricingSection";
import MagneticButton from "@/components/MagneticButton";

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
            <span className="text-[color:var(--color-primary)]">quality</span>{" "}
            of the work.
          </>
        }
        description="Transparent packages for brands that want premium design, development, and growth — no hidden scope, no surprises."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn>
            <PricingSection />
          </AnimateIn>

          <AnimateIn className="mt-16 text-center">
            <p className="text-sm text-[color:var(--color-ink)]/50">
              Need something bespoke?{" "}
              <a
                href="/contact"
                className="font-medium text-[color:var(--color-primary)] hover:underline"
              >
                Let&apos;s scope a custom engagement
              </a>
              .
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-center text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <AnimateIn>
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Not sure which plan fits?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="light">
              Book an intro call
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
