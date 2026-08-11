import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import MagneticButton from "@/components/MagneticButton";
import ServiceCard from "@/components/ServiceCard";
import WorkCard from "@/components/WorkCard";
import FAQAccordion from "@/components/FAQAccordion";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { getServiceIcon } from "@/lib/service-icons";

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
  const Icon = getServiceIcon(service.id);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  const relatedProjects = service.relatedTag
    ? projects.filter((p) => p.tags.includes(service.relatedTag!)).slice(0, 3)
    : [];

  const otherServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--color-ink)] pt-40 pb-28 text-white">
        <div className="noise-overlay" />
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[-14rem] left-[-8%] h-[24rem] w-[24rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-sky) 0%, transparent 70%)",
          }}
        />
        <div className="container-px relative">
          <AnimateIn>
            <nav className="flex items-center gap-2 text-sm text-white/45">
              <Link href="/services" className="transition-colors hover:text-white">
                Services
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/70">{service.title}</span>
            </nav>
          </AnimateIn>

          <AnimateIn delay={0.08} className="mt-8 flex items-center gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-sky)] text-white shadow-lg shadow-black/30">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="font-[family-name:var(--font-alt)] text-2xl font-medium text-white/25">
              {service.number}
            </span>
          </AnimateIn>

          <AnimateIn delay={0.14}>
            <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] tracking-wide text-balance sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-[color:var(--color-sky)]">
              {service.tagline}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {service.description}
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="/contact" variant="light">
              Get a quote
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="/pricing" variant="outline">
              View pricing
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              What&apos;s included
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-[color:var(--color-ink)] text-balance sm:text-4xl">
              Everything you need, none of the handoffs.
            </h2>
          </AnimateIn>

          <AnimateIn
            stagger
            className="mt-14 grid gap-5 sm:grid-cols-2"
          >
            {service.features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-start gap-4 rounded-2xl border border-[color:var(--color-ink)]/10 bg-[color:var(--color-mist)]/40 p-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-sm font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-[15px] font-medium leading-snug text-[color:var(--color-ink)]/80">
                  {feature}
                </p>
              </div>
            ))}
          </AnimateIn>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-[color:var(--color-mist)]/50 py-24 lg:py-32">
          <div className="container-px">
            <AnimateIn className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
                  Related work
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-[color:var(--color-ink)] text-balance sm:text-4xl">
                  {service.title} projects we&apos;ve shipped.
                </h2>
              </div>
              <MagneticButton href="/work" variant="outline">
                View all work
                <span aria-hidden>→</span>
              </MagneticButton>
            </AnimateIn>

            <AnimateIn
              stagger
              className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {relatedProjects.map((project) => (
                <WorkCard key={project.slug} project={project} />
              ))}
            </AnimateIn>
          </div>
        </section>
      )}

      <section className="py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              FAQ
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-[color:var(--color-ink)] text-balance sm:text-4xl">
              Common questions about {service.title.toLowerCase()}.
            </h2>
          </AnimateIn>

          <AnimateIn className="mt-14 max-w-3xl">
            <FAQAccordion items={service.faqs} />
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[color:var(--color-mist)]/50 py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              Explore more
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-[color:var(--color-ink)] text-balance sm:text-4xl">
              Other services that pair well.
            </h2>
          </AnimateIn>

          <AnimateIn stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </AnimateIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-10">
            <Link
              href={`/services/${prev.id}`}
              className="group flex items-center gap-3 text-white/60 transition-colors hover:text-white"
            >
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/35">
                  Previous
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {prev.title}
                </span>
              </span>
            </Link>
            <Link
              href={`/services/${next.id}`}
              className="group flex items-center gap-3 text-right text-white/60 transition-colors hover:text-white"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/35">
                  Next
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {next.title}
                </span>
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div className="pt-16 text-center">
            <AnimateIn>
              <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-balance sm:text-4xl lg:text-5xl">
                Ready to start your {service.title.toLowerCase()} project?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-white/65">
                Tell us about your goals and we&apos;ll map out the right
                approach — no pressure, just a clear plan.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.15} className="mt-10 flex justify-center">
              <MagneticButton href="/contact" variant="light">
                Let&apos;s talk
                <span aria-hidden>→</span>
              </MagneticButton>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
