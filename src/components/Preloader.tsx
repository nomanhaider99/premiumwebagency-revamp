"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finish = () => {
      root.style.overflow = prevOverflow;
      setHidden(true);
    };

    if (reduceMotion) {
      if (numRef.current) numRef.current.textContent = "100";
      if (barRef.current) barRef.current.style.width = "100%";
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(overlayRef.current, { opacity: 0, duration: 0.4, delay: 0.2 });
      return () => {
        tl.kill();
        root.style.overflow = prevOverflow;
      };
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      markRef.current,
      { opacity: 0, y: 12, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    )
      .to(
        counter,
        {
          val: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(counter.val);
            if (numRef.current) numRef.current.textContent = String(v);
            if (barRef.current) barRef.current.style.width = `${v}%`;
          },
        },
        "-=0.25"
      )
      .to(contentRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.45,
        ease: "power2.in",
        delay: 0.2,
      })
      .to(
        overlayRef.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        "-=0.1"
      );

    return () => {
      tl.kill();
      root.style.overflow = prevOverflow;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[color:var(--color-ink)]"
    >
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

      <div
        ref={contentRef}
        className="relative flex flex-col items-center"
      >
        <div className="relative flex items-center justify-center">
          <span
            ref={markRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2.25rem,9vw,4.5rem)] font-bold tracking-[0.08em] text-white/20"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 100px at center, transparent 0px, transparent 100px, black 190px)",
              maskImage:
                "radial-gradient(circle 100px at center, transparent 0px, transparent 100px, black 190px)",
            }}
          >
            premium<span className="text-[color:var(--color-primary)]/30">web</span>agency
          </span>

          <div className="relative z-10 flex items-baseline gap-1 font-[family-name:var(--font-display)] text-white">
            <span ref={numRef} className="text-6xl font-bold tracking-wide sm:text-7xl">
              0
            </span>
            <span className="text-2xl font-bold text-white/40 sm:text-3xl">%</span>
          </div>
        </div>

        <div className="relative mt-6 h-px w-48 overflow-hidden rounded-full bg-white/10 sm:w-60">
          <div
            ref={barRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-sky)]"
          />
        </div>

        <p className="mt-6 font-[family-name:var(--font-alt)] text-xs uppercase tracking-widest text-white/35">
          Crafting something premium
        </p>
      </div>
    </div>
  );
}
