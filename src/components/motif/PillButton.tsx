"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "signal" | "glass";

type PillButtonProps = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  /** renders a link; omit and pass `onClick` to render a button instead */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const BASE =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-medium transition-shadow duration-300 whitespace-nowrap";

const TONES: Record<Tone, string> = {
  signal:
    "text-[#04100c] shadow-[0_6px_24px_var(--glow)] hover:shadow-[0_10px_34px_color-mix(in_srgb,var(--signal)_38%,transparent)]",
  glass:
    "glass-quiet rounded-full text-[color:var(--text)] hover:border-[color:var(--border-strong)]",
};

const SIGNAL_FILL = {
  background:
    "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
} as const;

/**
 * The CTA shape: a pill that lifts very slightly and brightens its glow on
 * hover. It scales, and that is all — nothing here rotates or bounces.
 *
 * Renders an anchor when it navigates and a real `<button>` when it acts —
 * an anchor wired to `onClick` alone is unreachable by keyboard in the way a
 * button is, and reads wrong to a screen reader.
 */
export default function PillButton({
  children,
  tone = "signal",
  className,
  href,
  onClick,
  type = "button",
}: PillButtonProps) {
  const still = useReducedMotion();
  const classes = cn(BASE, TONES[tone], className);
  const style = tone === "signal" ? SIGNAL_FILL : undefined;

  return (
    <motion.div
      className="inline-block"
      whileHover={still ? undefined : { scale: 1.03 }}
      whileTap={still ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {href ? (
        <Link href={href} className={classes} style={style} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={classes} style={style}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
