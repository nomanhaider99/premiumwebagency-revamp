"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/MagneticButton";
import { plansByCategory, pricingCategories, type PricingCategory } from "@/data/pricing";

type Cycle = "monthly" | "yearly";

export default function PricingSection() {
  const [category, setCategory] = useState<PricingCategory>("All");
  const [cycle, setCycle] = useState<Cycle>("monthly");

  const plans = useMemo(() => plansByCategory[category], [category]);

  return (
    <div>
      <Tabs value={category} onValueChange={(v) => setCategory(v as PricingCategory)}>
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-full border border-white/10 bg-white/5 p-1.5">
          {pricingCategories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/60 data-active:bg-white data-active:text-[color:var(--color-ink)] data-active:shadow-none"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Tabs value={cycle} onValueChange={(v) => setCycle(v as Cycle)}>
          <TabsList className="h-auto rounded-full border border-white/10 bg-white/5 p-1">
            <TabsTrigger
              value="monthly"
              className="rounded-full px-5 py-2 text-sm font-medium text-white/60 data-active:bg-white data-active:text-[color:var(--color-ink)] data-active:shadow-none"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="rounded-full px-5 py-2 text-sm font-medium text-white/60 data-active:bg-white data-active:text-[color:var(--color-ink)] data-active:shadow-none"
            >
              Yearly
              <span className="ml-1.5 rounded-full bg-[color:var(--color-primary)]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[color:var(--color-primary)]">
                Save 20%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div key={category} className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
        {plans.map((plan) => {
          const price = cycle === "monthly" ? plan.monthly : plan.yearly;
          return (
            <div
              key={plan.id}
              className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 ${
                plan.featured
                  ? "border-[color:var(--color-primary)]/30 bg-[color:var(--color-surface)] text-white shadow-2xl shadow-[color:var(--color-primary)]/20 lg:-translate-y-4"
                  : "border-white/10 bg-white/[0.03] text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-[color:var(--color-primary)]/10"
              }`}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-8 bg-[color:var(--color-primary)] text-white">
                  Most popular
                </Badge>
              )}

              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {plan.name}
              </h3>
              <p className="mt-1.5 text-sm text-white/60">
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white">
                  ${price.toLocaleString()}
                </span>
                <span className="pb-1.5 text-sm text-white/50">
                  /mo
                </span>
              </div>

              <ul className="mt-8 flex-1 space-y-3 border-t border-white/15 pt-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-white/75"
                  >
                    <span
                      className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        plan.featured ? "bg-[color:var(--color-sky)]" : "bg-[color:var(--color-primary)]"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton
                  href="/contact"
                  variant={plan.featured ? "light" : "outline"}
                  className="w-full justify-center"
                >
                  Get started
                </MagneticButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
