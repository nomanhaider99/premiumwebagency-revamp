"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type AnimateInProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  y?: number;
  duration?: number;
  /** stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean;
  staggerAmount?: number;
};

export default function AnimateIn({
  children,
  className,
  as = "div",
  delay = 0,
  y = 36,
  duration = 0.9,
  stagger = false,
  staggerAmount = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerAmount : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration, stagger, staggerAmount]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
