import Reveal from "@/components/motion/Reveal";
import CircuitLines from "@/components/motif/CircuitLines";
import PillButton from "@/components/motif/PillButton";
import ContactCTA from "@/components/motif/ContactCTA";

type CTABandProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  ctaLabel: string;
  ctaHref?: string;
  secondary?: { label: string; href: string };
};

/** The closing panel every page hands off to the footer with. */
export default function CTABand({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = "/contact",
  secondary,
}: CTABandProps) {
  return (
    <section className="container-px py-16 lg:py-24">
      <Reveal className="glass-card relative overflow-hidden px-6 py-16 text-center lg:px-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora absolute inset-0" />
          <CircuitLines className="absolute inset-0 h-full w-full opacity-70" />
        </div>

        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            {eyebrow}
          </p>
        )}
        <h2 className="mx-auto mt-4 max-w-2xl text-[1.9rem] leading-[1.12] text-balance sm:text-[2.4rem]">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {/* anything aimed at contact opens the dialog rather than navigating */}
          {ctaHref === "/contact" ? (
            <ContactCTA>{ctaLabel}</ContactCTA>
          ) : (
            <PillButton href={ctaHref}>{ctaLabel}</PillButton>
          )}
          {secondary && (
            <PillButton href={secondary.href} tone="glass">
              {secondary.label}
            </PillButton>
          )}
        </div>
      </Reveal>
    </section>
  );
}
