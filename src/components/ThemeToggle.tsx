"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";

/**
 * Skiper UI's sun↔moon morph (the `skiper4` variant whose mask slides across
 * the disc — the cleanest of the five against this palette) driven by
 * `useThemeToggle` from `skiper26` rather than the local `useState` the demo
 * ships with. That hook is what actually calls `document.startViewTransition`,
 * so the theme crossfades instead of snapping; where the API is missing
 * (Safari and Firefox before it landed) the hook falls back to a plain switch,
 * which is why there is no feature check of our own here.
 *
 * The icon renders in its light state until the hook has resolved the theme.
 * The page itself never flashes — next-themes' inline script stamps the class
 * before first paint — but `resolvedTheme` cannot be read on the server, so
 * the icon is the one thing that has to settle after hydration rather than
 * risk a mismatched tree.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const clipId = useId();
  // the hook already starts `false` and syncs after hydration, so it is the
  // mount guard — a second one here would only add a render
  const { isDark: dark, toggleTheme } = useThemeToggle({
    variant: "circle-blur",
    start: "top-right",
  });

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--text)] transition-colors duration-300 hover:border-[color:var(--border-strong)] active:scale-95 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="h-[18px] w-[18px]"
      >
        <clipPath id={clipId}>
          <motion.path
            animate={{ y: dark ? 10 : 0, x: dark ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <motion.circle
            animate={{ r: dark ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: dark ? -100 : 0,
              scale: dark ? 0.5 : 1,
              opacity: dark ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
}
