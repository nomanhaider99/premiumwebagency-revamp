import Reveal from "@/components/motion/Reveal";
import CircuitLines from "@/components/motif/CircuitLines";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  actions?: React.ReactNode;
};

/** Inner-page counterpart to the home hero — same light, sized down. */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute inset-x-0 top-0 h-[26rem]" />
        <CircuitLines className="mask-fade-b absolute inset-x-0 top-0 h-[22rem] w-full" />
      </div>

      <div className="container-px flex flex-col items-center text-center">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] leading-[1.08] text-balance sm:text-[2.7rem] lg:text-[3.1rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed">
            {description}
          </p>
        </Reveal>
        {actions && (
          <Reveal delay={0.18} className="mt-9 flex flex-wrap justify-center gap-3">
            {actions}
          </Reveal>
        )}
      </div>
    </section>
  );
}
