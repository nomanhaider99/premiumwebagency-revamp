import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ServiceCard from "@/components/ServiceCard";
import WorkCard from "@/components/WorkCard";
import FAQAccordion from "@/components/FAQAccordion";
import HexBadge from "@/components/motif/HexBadge";
import PillButton from "@/components/motif/PillButton";
import CTABand from "@/components/sections/CTABand";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};

  return {
    title: `${service.title} — Premium Web Agency`,
    description: service.description,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const index = services.findIndex((s) => s.id === slug);
  if (index === -1) notFound();

  const service = services[index];
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  const relatedProjects = service.relatedTag
    ? projects.filter((p) => p.tags.includes(service.relatedTag!)).slice(0, 3)
    : [];

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.number}`}
        title={
          <>
            {service.title} —{" "}
            <span className="gradient-text">{service.tagline}</span>
          </>
        }
        description={service.description}
        actions={
          <>
            <PillButton href="/contact">Get a quote</PillButton>
            <PillButton href="/pricing" tone="glass">
              View pricing
            </PillButton>
          </>
        }
      />

      {/* what's included */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="What's included"
          title={
            <>
              Everything you need,{" "}
              <span className="gradient-text">none of the handoffs.</span>
            </>
          }
        />

        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {service.features.map((feature, i) => (
            <RevealItem key={feature}>
              <div className="glass-card flex items-center gap-4 p-5">
                <HexBadge
                  compact
                  label={feature}
                  icon={<ServiceIcon id={service.id} strokeWidth={1.7} />}
                />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[14px] text-[color:var(--text)]">
                    {feature}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {relatedProjects.length > 0 && (
        <section className="container-px py-16 lg:py-24">
          <SectionHeading
            eyebrow="Related work"
            title={
              <>
                {service.title} projects{" "}
                <span className="gradient-text">we&apos;ve shipped.</span>
              </>
            }
            action={
              <PillButton href="/work" tone="glass">
                View all work
              </PillButton>
            }
          />
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <RevealItem key={project.slug} className="h-full">
                <WorkCard project={project} />
              </RevealItem>
            ))}
          </Reveal>
        </section>
      )}

      {/* faq */}
      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Common questions about{" "}
                <span className="gradient-text">
                  {service.title.toLowerCase()}.
                </span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <FAQAccordion items={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* other services */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="Explore more"
          title={
            <>
              Other services{" "}
              <span className="gradient-text">that pair well.</span>
            </>
          }
        />

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-[color:var(--border)] pt-8">
          <Link
            href={`/services/${prev.id}`}
            className="group flex items-center gap-3 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
          >
            <span className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full">
              <ArrowLeft className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em]">
                Previous
              </span>
              <span className="text-[14px]">{prev.title}</span>
            </span>
          </Link>

          <Link
            href={`/services/${next.id}`}
            className="group flex items-center gap-3 text-right text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
          >
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em]">
                Next
              </span>
              <span className="text-[14px]">{next.title}</span>
            </span>
            <span className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      <CTABand
        eyebrow="Let's talk"
        title={
          <>
            Ready to start your{" "}
            <span className="gradient-text">
              {service.title.toLowerCase()} project?
            </span>
          </>
        }
        description="Tell us about your goals and we'll map out the right approach — no pressure, just a clear plan."
        ctaLabel="Let's talk"
      />
    </>
  );
}
