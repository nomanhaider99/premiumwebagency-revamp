import AnimateIn from "@/components/AnimateIn";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-[family-name:var(--font-alt)] text-sm text-[color:var(--color-sky)]">
            {eyebrow}
          </span>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {description}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
