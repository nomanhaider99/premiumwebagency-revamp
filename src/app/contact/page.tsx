import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/ContactForm";
import HexBadge from "@/components/motif/HexBadge";
import StatusPill from "@/components/motif/StatusPill";
import { SITE, SOCIALS } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Premium Web Agency",
  description:
    "Tell us about your project — web design, development, marketing, or SEO.",
};

const INFO = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: <Mail strokeWidth={1.7} />,
  },
  {
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}`,
    icon: <Phone strokeWidth={1.7} />,
  },
  {
    label: "Studio",
    value: SITE.location,
    href: undefined,
    icon: <MapPin strokeWidth={1.7} />,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build your next{" "}
            <span className="gradient-text">premium</span> website.
          </>
        }
        description="Tell us a bit about your project and goals. We'll get back to you within one business day to schedule an intro call."
      />

      <section className="container-px py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  Direct access to the team{" "}
                  <span className="gradient-text">building your site.</span>
                </>
              }
              description="No account managers, no hand-offs — you'll work directly with the designers and engineers on your project from day one."
            />

            <Reveal delay={0.08} className="mt-8">
              <StatusPill>Replies within 1 business day</StatusPill>
            </Reveal>

            <Reveal stagger delay={0.1} className="mt-8 flex flex-col gap-3">
              {INFO.map((item) => {
                const body = (
                  <span className="glass-card flex items-center gap-4 p-4">
                    <HexBadge compact label={item.label} icon={item.icon} />
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[14px] text-[color:var(--text)]">
                        {item.value}
                      </span>
                    </span>
                  </span>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {body}
                  </a>
                ) : (
                  <div key={item.label}>{body}</div>
                );
              })}
            </Reveal>

            <Reveal delay={0.16} className="mt-8 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full font-mono text-[10px] uppercase text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
                >
                  {s.short}
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.08} className="glass-card p-7 lg:p-9">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
