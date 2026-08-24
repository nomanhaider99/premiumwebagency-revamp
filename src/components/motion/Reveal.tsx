"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const SPRING = { type: "spring", stiffness: 120, damping: 20 } as const;

/**
 * The one entrance in the system: fade plus a 16px rise, on a spring.
 * Smoothness here comes from the spring's shape, not from a longer duration —
 * stretching the timing is what makes a page feel sluggish rather than smooth.
 */
export const revealParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const revealChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: SPRING },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger the direct children instead of moving the block as one */
  stagger?: boolean;
  delay?: number;
  as?: "div" | "section" | "ul" | "header" | "article";
};

export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as = "div",
}: RevealProps) {
  const still = useReducedMotion();
  const Tag = motion[as];

  if (still) {
    // the finished state, not a quicker version of the animation
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10%" }}
      variants={
        stagger
          ? {
              hidden: {},
              shown: {
                transition: { staggerChildren: 0.08, delayChildren: delay },
              },
            }
          : {
              hidden: { opacity: 0, y: 16 },
              shown: { opacity: 1, y: 0, transition: { ...SPRING, delay } },
            }
      }
    >
      {children}
    </Tag>
  );
}

/** a single staggered item — only meaningful inside a `stagger` Reveal */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={revealChild}>
      {children}
    </motion.div>
  );
}
