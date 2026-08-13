"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
};

export default function TiltCard({ children, className = "", max = 7 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(el, {
      rotateX: (0.5 - py) * max,
      rotateY: (px - 0.5) * max,
      scale: 1.02,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        left: `${px * 100}%`,
        top: `${py * 100}%`,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5, overwrite: "auto" });
    }
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}
      >
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
