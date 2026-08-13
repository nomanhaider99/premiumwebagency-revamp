"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import HeroCodeWindow from "@/components/HeroCodeWindow";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 60, rotateX: 20, scale: 0.94, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-stats",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[color:var(--color-ink)] pt-40 pb-20 text-white lg:pt-48 lg:pb-24"
    >
      <div className="noise-overlay" />

      {/* quiet ambient vignette, kept soft and asymmetric */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10rem] h-[42rem] w-[42rem] rounded-full opacity-[0.12] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-14rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full opacity-[0.08] blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--color-sky) 0%, transparent 70%)",
        }}
      />

      {/* floating code editor window, behind the copy on the right */}
      <HeroCodeWindow className="pointer-events-none absolute right-[-2%] top-1/2 hidden -translate-y-1/2 opacity-95 md:block lg:right-[6%]" />

      <div className="container-px relative z-10">
        <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-[family-name:var(--font-alt)] text-sm text-white/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-primary)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-primary)]" />
          </span>
          Web Design &middot; Development &middot; Marketing &middot; SEO
        </span>

        <h1 className="mt-8 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-wide text-balance sm:text-5xl lg:text-6xl">
          <span className="hero-line block overflow-hidden">Websites built</span>
          <span className="hero-line block overflow-hidden">
            for brands that play at the{" "}
            <span className="text-[color:var(--color-primary)]">premium</span>{" "}
            level.
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-lg text-lg leading-relaxed text-white/65">
          We design, build, and grow high-end digital experiences — pairing
          award-worthy design with performance marketing and SEO that
          compounds. One studio, end to end.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="hero-cta">
            <MagneticButton href="/contact" variant="light">
              Start a project
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>
          <div className="hero-cta">
            <MagneticButton
              href="/work"
              variant="outline"
              className="!border-white/20 !text-white hover:!border-[color:var(--color-primary)] hover:!text-[color:var(--color-primary)]"
            >
              View our work
            </MagneticButton>
          </div>
        </div>

        <div className="hero-stats mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              120+
            </p>
            <p className="text-xs text-white/45">Projects delivered</p>
          </div>
          <span className="hidden h-8 w-px bg-white/10 sm:block" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              98%
            </p>
            <p className="text-xs text-white/45">Client retention</p>
          </div>
        </div>
      </div>
    </section>
  );
}
