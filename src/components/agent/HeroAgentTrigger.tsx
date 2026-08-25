"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, UserRound } from "lucide-react";
import AgentOrb from "@/components/agent/AgentOrb";
import { useAgentDialog } from "@/components/agent/AgentDialog";
import { TEASERS } from "@/lib/agent-brain";

/** the three questions worth putting in front of someone who just landed */
const SHORTCUTS = [
  "What do you build?",
  "How much does it cost?",
  "How long does it take?",
];

/**
 * The hero's way in to the agent.
 *
 * Shaped like a composer rather than a button on purpose: the agent's own
 * orb and a question already sitting in the field read as *this is where you
 * type*, which no third pill in the CTA row ever would. The questions cycle
 * so the bar keeps catching the eye without demanding it — the glow and the
 * orb carry the prominence, with nothing spinning around the edge.
 *
 * The whole bar is one real `<button>` — the shortcut chips beneath it are
 * siblings, not nested buttons, because a button inside a button is invalid
 * and browsers resolve it however they like.
 */
export default function HeroAgentTrigger() {
  const still = useReducedMotion();
  const { open } = useAgentDialog();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % TEASERS.length),
      3400
    );
    return () => window.clearInterval(id);
  }, [still]);

  return (
    <div className="max-w-xl">
      <motion.button
        type="button"
        onClick={() => open()}
        whileHover={still ? undefined : { scale: 1.012 }}
        whileTap={still ? undefined : { scale: 0.992 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="group relative flex w-full items-center gap-3.5 rounded-[18px] border border-[color:var(--border)] px-3 py-3 text-left shadow-[0_10px_40px_var(--glow)] transition-[box-shadow,border-color] duration-300 hover:border-[color:var(--border-strong)] hover:shadow-[0_16px_50px_color-mix(in_srgb,var(--signal)_26%,transparent)] sm:gap-4 sm:px-4"
        style={{
          background:
            "color-mix(in srgb, var(--surface-solid) 88%, transparent)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
        }}
      >
        <AgentOrb size={44} />

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold text-[color:var(--text)]">
              Talk to our AI Agent
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#04100c]"
              style={{
                background:
                  "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
              }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              Live
            </span>
          </span>

          {/* the rotating question. A fixed height keeps the swap from
              nudging the bar a pixel taller every cycle. */}
          <span className="relative mt-1 block h-[18px] overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={i}
                initial={still ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={still ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 truncate text-[12.5px] leading-[18px] text-[color:var(--text-muted)]"
              >
                “{TEASERS[i]}”
              </motion.span>
            </AnimatePresence>
          </span>
        </span>

        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#04100c] transition-transform duration-300 group-hover:translate-x-0.5"
          style={{
            background:
              "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
          }}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </span>
      </motion.button>

      {/* the shortcuts: each one opens the dialog with that question already
          asked, so the first answer arrives without anybody typing */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {SHORTCUTS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => open({ seed: q })}
            className="glass-quiet rounded-full px-3.5 py-1.5 text-[11.5px] text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--border-strong)] hover:text-[color:var(--text)]"
          >
            {q}
          </button>
        ))}

        <button
          type="button"
          onClick={() => open({ tab: "human" })}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11.5px] text-[color:var(--text-muted)] underline-offset-4 transition-colors hover:text-[color:var(--text)] hover:underline"
        >
          <UserRound className="h-3.5 w-3.5" />
          or talk to a human
        </button>
      </div>
    </div>
  );
}
