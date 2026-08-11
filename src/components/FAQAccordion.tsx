"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/data/services";

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left lg:px-8"
            >
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-white sm:text-lg">
                {item.question}
              </span>
              <Plus
                aria-hidden
                className={`h-5 w-5 shrink-0 text-[color:var(--color-primary)] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                strokeWidth={2}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-white/65 lg:px-8">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
