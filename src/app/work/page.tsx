import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import PortfolioTabs from "@/components/PortfolioTabs";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Premium Web Agency",
  description:
    "A selection of web design, development, and growth projects delivered by Premium Web Agency.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Projects built to look sharp and{" "}
            <span className="text-[color:var(--color-primary)]">
              perform sharper.
            </span>
          </>
        }
        description="A selection of brands we've helped design, build, and grow — across finance, e-commerce, healthcare, and beyond."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px">
          <PortfolioTabs projects={projects} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-center text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <AnimateIn>
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Your brand could be next.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="light">
              Start a project
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
