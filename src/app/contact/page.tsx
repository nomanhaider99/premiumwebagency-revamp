import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Premium Web Agency",
  description:
    "Tell us about your project — web design, development, marketing, or SEO.",
};

const info = [
  { label: "Email", value: "hello@premiumwebagency.com", href: "mailto:hello@premiumwebagency.com" },
  { label: "Phone", value: "+1 (555) 010-2030", href: "tel:+15550102030" },
  { label: "Studio", value: "Remote-first · Worldwide", href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build your next{" "}
            <span className="text-[color:var(--color-primary)]">
              premium
            </span>{" "}
            website.
          </>
        }
        description="Tell us a bit about your project and goals. We'll get back to you within one business day to schedule an intro call."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <AnimateIn>
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              Get in touch
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-ink)] sm:text-4xl">
              Direct access to the team building your site.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[color:var(--color-ink)]/65">
              No account managers, no hand-offs — you&apos;ll work directly
              with the designers and engineers on your project from day one.
            </p>

            <div className="mt-10 space-y-6">
              {info.map((item) => (
                <div key={item.label}>
                  <p className="text-xs uppercase tracking-widest text-[color:var(--color-ink)]/40">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block font-[family-name:var(--font-alt)] text-lg text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-[family-name:var(--font-alt)] text-lg text-[color:var(--color-ink)]">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn
            delay={0.1}
            className="rounded-3xl border border-[color:var(--color-ink)]/10 bg-[color:var(--color-mist)]/40 p-8 lg:p-10"
          >
            <ContactForm />
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
