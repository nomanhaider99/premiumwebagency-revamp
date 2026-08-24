"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/services";

/**
 * Glass rows. The chevron rotates and the panel's height animates through
 * `AnimatePresence` rather than a CSS grid trick, so the exit is animated too
 * and a fast double-click cannot leave a half-open row behind.
 */
export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number>(0);
  const still = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-trigger-${i}`;

        return (
          <div key={item.question} className="glass-card overflow-hidden">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="text-[15px] font-medium text-[color:var(--text)]">
                  {item.question}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)]"
                >
                  <ChevronDown className="h-3.5 w-3.5 text-[color:var(--text)]" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={still ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[13px] leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
