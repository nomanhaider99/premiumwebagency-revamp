import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import MagneticButton from "@/components/MagneticButton";
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
        description="We don't hand you off between vendors. One team carries your brand from first sketch to first-page ranking."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px space-y-24 lg:space-y-32">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 grid gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <AnimateIn
                className={i % 2 === 1 ? "lg:order-2" : ""}
              >
                <span className="font-[family-name:var(--font-alt)] text-6xl font-medium text-[color:var(--color-primary)]/20 lg:text-8xl">
                  {service.number}
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-ink)] sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-base font-medium text-[color:var(--color-primary)]">
                  {service.tagline}
                </p>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[color:var(--color-ink)]/65">
                  {service.description}
                </p>
              </AnimateIn>

              <AnimateIn
                delay={0.1}
                className={`rounded-3xl border border-[color:var(--color-ink)]/10 bg-[color:var(--color-mist)]/40 p-8 lg:p-10 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <p className="font-[family-name:var(--font-alt)] text-sm uppercase tracking-widest text-[color:var(--color-ink)]/40">
                  What&apos;s included
                </p>
                <ul className="mt-6 space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-[10px] text-white">
                        ✓
                      </span>
                      <span className="text-[15px] text-[color:var(--color-ink)]/75">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-center text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <AnimateIn>
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
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
