import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import StatCounter from "@/components/StatCounter";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "About — Premium Web Agency",
  description:
    "We're a design, development, and growth studio built for brands that want to lead their market.",
};

const values = [
  {
    title: "Craft over templates",
    description:
      "Every project is designed from first principles for your brand — never a reskinned template.",
  },
  {
    title: "Design and growth, together",
    description:
      "Beautiful sites that don't convert aren't done. We build with SEO and marketing in mind from day one.",
  },
  {
    title: "Obsessed with detail",
    description:
      "Motion, spacing, copy, load time — the details most agencies skip are where we spend our time.",
  },
  {
    title: "A true partnership",
    description:
      "We work as an extension of your team, with direct access to the people building your site.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A studio built for brands who refuse to look{" "}
            <span className="text-[color:var(--color-primary)]">average.</span>
          </>
        }
        description="Premium Web Agency is a boutique team of designers, engineers, and strategists who believe your website should be your hardest-working asset — not your biggest compromise."
      />

      <section className="py-24 lg:py-32">
        <div className="container-px grid gap-16 lg:grid-cols-2 lg:gap-24">
          <AnimateIn>
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              Our story
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-ink)] sm:text-4xl">
              We started this studio because most agencies make you choose.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[color:var(--color-ink)]/65">
              <p>
                Design shops that ignore performance. Dev shops that ignore
                brand. Marketing agencies that inherit a site they had no
                hand in building. We built Premium Web Agency to close that
                gap — one team responsible for how your brand looks, works,
                and grows.
              </p>
              <p>
                Today we partner with founders, marketing leaders, and
                operators who need a site that carries real weight: fast,
                distinctive, and built to convert traffic into revenue.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15} stagger className="grid grid-cols-2 gap-8 content-start">
            <StatCounter value={120} suffix="+" label="Projects delivered" />
            <StatCounter value={40} suffix="+" label="Brands trusted us" />
            <StatCounter value={98} suffix="%" label="Client retention" />
            <StatCounter value={12} suffix="+" label="Years combined expertise" />
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[color:var(--color-mist)]/50 py-24 lg:py-32">
        <div className="container-px">
          <AnimateIn className="max-w-2xl">
            <span className="font-[family-name:var(--font-alt)] text-sm font-medium uppercase tracking-widest text-[color:var(--color-primary)]">
              What we believe
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-ink)] sm:text-4xl">
              The principles behind every project.
            </h2>
          </AnimateIn>

          <AnimateIn stagger className="mt-16 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-3xl border border-[color:var(--color-ink)]/10 bg-white p-8"
              >
                <span className="font-[family-name:var(--font-alt)] text-sm text-[color:var(--color-ink)]/35">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-ink)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink)]/60">
                  {v.description}
                </p>
              </div>
            ))}
          </AnimateIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-center text-white lg:py-32">
        <div className="noise-overlay" />
        <div className="container-px relative">
          <AnimateIn>
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Want to see if we&apos;re the right fit?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="light">
              Get in touch
              <span aria-hidden>→</span>
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
