import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AnimateIn from "@/components/AnimateIn";
import ServiceCard from "@/components/ServiceCard";
import StatCounter from "@/components/StatCounter";
import ProcessSteps from "@/components/ProcessSteps";
import PortfolioTabs from "@/components/PortfolioTabs";
import PricingSection from "@/components/PricingSection";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-y border-white/8 py-10">
        <Marquee
          items={[
            "UI/UX DESIGN",
            "WEB DEVELOPMENT",
            "SEO",
            "BRAND STRATEGY",
            "PERFORMANCE MARKETING",
            "CRO",
          ]}
        />
      </section>

      <section id="services" className="bg-[color:var(--color-surface)]/50 py-20 lg:py-28">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              What we do
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-white text-balance sm:text-5xl">
              One studio. Every discipline your brand needs.
            </h2>
          </AnimateIn>

          <AnimateIn stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </AnimateIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container-px">
          <AnimateIn
            stagger
            className="grid grid-cols-2 gap-10 border-t border-white/10 pt-16 lg:grid-cols-4"
          >
            <StatCounter value={120} suffix="+" label="Projects delivered" />
            <StatCounter value={98} suffix="%" label="Client retention" />
            <StatCounter value={3} suffix=".4x" label="Avg. organic growth" />
            <StatCounter value={12} suffix="+" label="Years combined expertise" />
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[color:var(--color-ink)] py-20 text-white lg:py-28">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-sky)]">
              How we work
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-balance sm:text-5xl">
              A refined process, from discovery to growth.
            </h2>
          </AnimateIn>

          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px">
          <AnimateIn className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
                Selected work
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-white text-balance sm:text-5xl">
                Recent projects we&apos;re proud of.
              </h2>
            </div>
            <MagneticButton href="/work" variant="outline">
              View all work
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>

          <div className="mt-16">
            <PortfolioTabs projects={projects} />
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[color:var(--color-surface)]/50 py-20 lg:py-28">
        <div className="container-px">
          <AnimateIn className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
                Pricing
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-white text-balance sm:text-5xl">
                Simple, transparent packages.
              </h2>
            </div>
            <MagneticButton href="/pricing" variant="outline">
              Full pricing details
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>

          <div className="mt-16">
            <PricingSection />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              Client voices
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-white text-balance sm:text-5xl">
              Trusted by teams who expect more.
            </h2>
          </AnimateIn>

          <AnimateIn stagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TiltCard
                key={t.name}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <p className="font-[family-name:var(--font-alt)] text-3xl leading-none text-[color:var(--color-primary)]">
                  &ldquo;
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/75">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </TiltCard>
            ))}
          </AnimateIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-20 text-white lg:py-28">
        <div className="noise-overlay" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
        <div className="container-px relative text-center">
          <AnimateIn>
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-sky)]">
              Let&apos;s build something premium
            </span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-wide text-balance sm:text-5xl lg:text-6xl">
              Ready to elevate your brand online?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2} className="mt-10 flex justify-center">
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
