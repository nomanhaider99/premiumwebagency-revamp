"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import HeroForm from "@/components/HeroForm";
import HeroScene from "@/components/HeroScene";

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
          ".hero-stats",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-visual",
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.8"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[color:var(--color-ink)] pt-40 pb-28 text-white lg:pt-48 lg:pb-32"
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

      {/* ambient 3D glass form — sits behind the form card, adds depth without competing for legibility */}
      <HeroScene className="pointer-events-none absolute right-[-10%] top-1/2 hidden h-[720px] w-[720px] -translate-y-1/2 opacity-95 md:block lg:right-[-6%]" />

      <div className="container-px relative z-10 grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-[family-name:var(--font-alt)] text-sm text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-primary)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-primary)]" />
            </span>
            Web Design &middot; Development &middot; Marketing &middot; SEO
          </span>

          <h1 className="mt-8 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
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
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <a
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-[color:var(--color-primary)]"
            >
              View our work
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        <HeroForm />
      </div>
    </section>
  );
}
