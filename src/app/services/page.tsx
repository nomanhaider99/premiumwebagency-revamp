import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ServiceCard from "@/components/ServiceCard";
import HexBadge from "@/components/motif/HexBadge";
import PillButton from "@/components/motif/PillButton";
import CTABand from "@/components/sections/CTABand";
import CapabilityHub from "@/components/CapabilityHub";
import { ServiceIcon } from "@/lib/service-icons";
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
            <span className="gradient-text">under one roof.</span>
          </>
        }
        description="We don't hand you off between vendors. One team carries your brand from first sketch to first-page ranking. Explore each service below."
        actions={
          <>
            <PillButton href="/contact">Let&apos;s talk</PillButton>
            <PillButton href="/pricing" tone="glass">
              View pricing
            </PillButton>
          </>
        }
      />

      {/* the deliverables, as hex chips */}
      <section className="container-px pb-8">
        <Reveal className="glass-quiet rounded-2xl p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            Everything we deliver
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <HexBadge
                key={s.id}
                label={s.features[0]}
                icon={<ServiceIcon id={s.id} strokeWidth={1.7} />}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-px py-16 lg:py-24">
        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="How it fits together"
            title={
              <>
                One team, one{" "}
                <span className="gradient-text">connected stack.</span>
              </>
            }
            description="Every discipline above hangs off the same centre — which is why nothing gets lost between them."
          />
          <CapabilityHub />
        </div>
      </section>

      <CTABand
        eyebrow="Get in touch"
        title={
          <>
            Not sure which{" "}
            <span className="gradient-text">services you need?</span>
          </>
        }
        description="Tell us about your project and we'll map out the right mix of design, development, and growth."
        ctaLabel="Let's talk"
      />
    </>
  );
}
