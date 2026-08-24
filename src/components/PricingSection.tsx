"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PillButton from "@/components/motif/PillButton";
import {
  plansByCategory,
  pricingCategories,
  type PricingCategory,
} from "@/data/pricing";

type Cycle = "monthly" | "yearly";

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-9 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
        active
          ? "text-[#04100c]"
          : "glass-quiet text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
      }`}
      style={
        active
          ? {
              background:
                "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

export default function PricingSection() {
  const [category, setCategory] = useState<PricingCategory>("All");
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const still = useReducedMotion();

  const plans = useMemo(() => plansByCategory[category], [category]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {pricingCategories.map((cat) => (
          <Chip key={cat} active={cat === category} onClick={() => setCategory(cat)}>
            {cat}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <Chip active={cycle === "monthly"} onClick={() => setCycle("monthly")}>
          Monthly
        </Chip>
        <Chip active={cycle === "yearly"} onClick={() => setCycle("yearly")}>
          Yearly — save 20%
        </Chip>
      </div>

      <div key={category} className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = cycle === "monthly" ? plan.monthly : plan.yearly;

          return (
            <motion.div
              key={plan.id}
              whileHover={still ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`glass-card relative flex h-full flex-col p-7 ${
                plan.featured
                  ? "shadow-[0_14px_60px_color-mix(in_srgb,var(--signal)_20%,transparent)]"
                  : ""
              }`}
            >
              {plan.featured && (
                <span
                  className="absolute right-6 top-6 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#04100c]"
                  style={{
                    background:
                      "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                  }}
                >
                  Most popular
                </span>
              )}

              <h3 className="text-[1.15rem]">{plan.name}</h3>
              <p className="mt-2 text-[13px]">{plan.tagline}</p>

              <p className="mt-7 flex items-end gap-1.5">
                <span className="font-mono text-[2.1rem] leading-none text-[color:var(--text)]">
                  ${price.toLocaleString()}
                </span>
                <span className="pb-1 font-mono text-[11px] text-[color:var(--text-muted)]">
                  /mo
                </span>
              </p>

              <ul className="mt-7 flex-1 space-y-2.5 border-t border-[color:var(--border)] pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--signal)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <PillButton
                  href="/contact"
                  tone={plan.featured ? "signal" : "glass"}
                  className="w-full"
                >
                  Get started
                </PillButton>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
