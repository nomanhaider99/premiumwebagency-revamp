import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import MagneticButton from "@/components/MagneticButton";
import ServiceCard from "@/components/ServiceCard";
import StatCounter from "@/components/StatCounter";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Premium Web Agency",
  description:
    "Web design, development, digital marketing, and SEO — delivered as one connected service.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Design, development, and growth —{" "}
            <span className="text-[color:var(--color-primary)]">
              under one roof.
            </span>
          </>
        }
        description="We don't hand you off between vendors. One team carries your brand from first sketch to first-page ranking. Explore each service below."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn
            stagger
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface)]/50 py-20">
        <div className="container-px">
          <AnimateIn
            stagger
            className="grid grid-cols-2 gap-10 lg:grid-cols-4"
          >
            <StatCounter value={120} suffix="+" label="Projects delivered" />
            <StatCounter value={98} suffix="%" label="Client retention" />
            <StatCounter value={3} suffix=".4x" label="Avg. organic growth" />
            <StatCounter value={8} label="Services, one team" />
          </AnimateIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-center text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <AnimateIn>
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-balance sm:text-4xl lg:text-5xl">
              Not sure which services you need?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/65">
              Tell us about your project and we&apos;ll map out the right mix
              of design, development, and growth.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.15} className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="light">
              Let&apos;s talk
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
