"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.4,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const styles = {
    solid:
      "bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-sky)] hover:shadow-lg hover:shadow-[color:var(--color-primary)]/30",
    outline:
      "border border-white/20 text-white hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]",
    light:
      "bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-sky)]",
  };

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
