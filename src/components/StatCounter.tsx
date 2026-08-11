"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type StatCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: StatCounterProps) {
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, prefix]);

  return (
    <div>
      <span
        ref={numRef}
        className="font-[family-name:var(--font-alt)] text-5xl font-semibold tracking-tight text-white lg:text-6xl"
      >
        {prefix}0{suffix}
      </span>
      <p className="mt-2 text-sm text-white/60">{label}</p>
    </div>
  );
}
