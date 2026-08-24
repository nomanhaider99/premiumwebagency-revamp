import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import IndustryWork from "@/components/sections/IndustryWork";
import CapabilityHub from "@/components/CapabilityHub";
import AIDelivery from "@/components/sections/AIDelivery";
import CTABand from "@/components/sections/CTABand";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ServiceCard from "@/components/ServiceCard";
import WorkCard from "@/components/WorkCard";
import FAQAccordion from "@/components/FAQAccordion";
import PillButton from "@/components/motif/PillButton";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { DIFFERENTIATORS } from "@/data/site";

/** the homepage FAQ draws one question from each of the first six services */
const HOME_FAQS = services.slice(0, 6).map((s) => s.faqs[0]);

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />

      {/* the capability hub keeps its own band now the hero carries the scene */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="How it fits together"
            title={
              <>
                One centre,{" "}
                <span className="gradient-text">every discipline</span> hanging
                off it.
              </>
            }
            description="Design, engineering and growth all report to the same middle — which is why nothing gets lost between them."
          />
          <CapabilityHub />
        </div>
      </section>

      <IndustryWork />

      {/* what we do */}
      <section id="services" className="container-px scroll-mt-24 py-20 lg:py-28">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One studio.{" "}
              <span className="gradient-text">Every discipline</span> your brand
              needs.
            </>
          }
          action={
            <PillButton href="/services" tone="glass">
              All services
            </PillButton>
          }
        />

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* why us */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              Built the way it should be —{" "}
              <span className="gradient-text">end to end</span>.
            </>
          }
        />

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
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

      <AIDelivery />

      {/* work */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Recent projects{" "}
              <span className="gradient-text">we&apos;re proud of.</span>
            </>
          }
          action={
            <PillButton href="/work" tone="glass">
              View all work
            </PillButton>
          }
        />

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <RevealItem key={project.slug} className="h-full">
              <WorkCard project={project} />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* client voices */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeading
          eyebrow="Client voices"
          title={
            <>
              Trusted by teams who{" "}
              <span className="gradient-text">expect more.</span>
            </>
          }
        />

        <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="glass-card flex h-full flex-col p-7">
                <blockquote className="flex-1 text-[14px] leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-[color:var(--border)] pt-5">
                  <p className="text-[13px] font-medium text-[color:var(--text)]">
                    {t.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* faq */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                The questions we{" "}
                <span className="gradient-text">hear most.</span>
              </>
            }
            description="Every answer here is the same one we give on a first call."
          />
          <Reveal delay={0.08}>
            <FAQAccordion items={HOME_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand
        eyebrow="Let's build something premium"
        title={
          <>
            Ready to elevate your brand{" "}
            <span className="gradient-text">online?</span>
          </>
        }
        ctaLabel="Book an intro call"
        secondary={{ label: "View our work", href: "/work" }}
      />
    </>
  );
}
