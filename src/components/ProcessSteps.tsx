"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Compass, PenTool, Code2, TrendingUp, type LucideIcon } from "lucide-react";

const steps: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig into your brand, market, and goals to define what premium means for you.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts, wireframes, and refined visual design — built around conversion and clarity.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Pixel-accurate, performance-first builds with animation and interaction layered in.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Launch backed by SEO and marketing so the site keeps performing long after go-live.",
    icon: TrendingUp,
  },
];

export default function ProcessSteps() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 75%",
        end: "bottom 65%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (lineRef.current) gsap.set(lineRef.current, { scaleX: self.progress });
          nodeRefs.current.forEach((node, i) => {
            if (!node) return;
            const threshold = i / (steps.length - 1);
            node.classList.toggle("is-active", self.progress >= threshold - 0.02);
          });
        },
      });

      gsap.fromTo(
        ".process-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {/* connecting progress line, desktop only */}
      <div className="pointer-events-none absolute left-0 right-0 top-[9px] hidden lg:block">
        <div className="h-px w-full bg-white/10" />
        <div
          ref={lineRef}
          className="absolute inset-0 h-px w-full origin-left bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-sky)]"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="process-card relative">
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="process-node relative z-10 mb-6 hidden h-[18px] w-[18px] items-center justify-center rounded-full border border-white/20 bg-[color:var(--color-ink)] transition-colors duration-300 lg:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/30 transition-colors duration-300" />
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.05] lg:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-3 select-none font-[family-name:var(--font-display)] text-7xl font-bold leading-none text-white/[0.04]"
                >
                  {step.number}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-sky)] text-white shadow-lg shadow-black/20">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
