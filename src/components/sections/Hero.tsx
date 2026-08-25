"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import CircuitLines from "@/components/motif/CircuitLines";
import DriftingOrb from "@/components/motif/DriftingOrb";
import HexBadge from "@/components/motif/HexBadge";
import HeroStage from "@/components/hero3d/HeroStage";
import PillButton from "@/components/motif/PillButton";
import ContactCTA from "@/components/motif/ContactCTA";
import StatusPill from "@/components/motif/StatusPill";
import HeroAgentTrigger from "@/components/agent/HeroAgentTrigger";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";

const SPRING = { type: "spring", stiffness: 120, damping: 20 } as const;

const HEADLINE =
  "text-[2.8rem] leading-[1.02] text-balance sm:text-[3.6rem] lg:text-[4.6rem]";

/** the disciplines chip row — real services, in the site's own words */
const CHIPS = ["design", "development", "ecommerce", "seo", "ai"];

/** three things the site can actually stand behind, drawn from its own copy */
const PROMISES = [
  "One team from first sketch to first-page ranking",
  "Designed from first principles, never a reskinned theme",
  "AI woven through delivery, not bolted on",
];

/** loose glass in the hero: walk a cursor near one and it comes to you, or
 *  grab it and throw it — sized and paced so no two swing in unison */
const BUBBLES = [
  { className: "left-[2%] bottom-[9%] h-14 w-14 lg:h-24 lg:w-24", frost: 0.5, period: 13, phase: 0 },
  { className: "left-[36%] bottom-[5%] h-10 w-10 lg:h-16 lg:w-16", frost: 0.3, period: 9, phase: 1.6 },
  { className: "right-[8%] top-[14%] hidden h-12 w-12 lg:block lg:h-20 lg:w-20", frost: 0.4, period: 16, phase: 0.7 },
  { className: "left-[56%] bottom-[12%] hidden h-12 w-12 lg:block lg:h-14 lg:w-14", frost: 0.25, period: 11, phase: 2.4 },
];

/**
 * One orchestrated sequence rather than a scatter of separate reveals: every
 * block in the column comes off a single staggered parent. That restraint is
 * what keeps a hero this full from reading as generated.
 *
 * The agent scene is a full-bleed layer *behind* everything, which is why the
 * copy carries an explicit `relative z-10` and sits over a scrim.
 */
export default function Hero() {
  const still = useReducedMotion();

  const parent = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };
  const child = {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: SPRING },
  };

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-40 lg:min-h-[50rem] lg:pt-36 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
        <div className="aurora absolute inset-x-0 top-0 h-[38rem]" />
        <CircuitLines className="mask-fade-b absolute inset-x-0 top-0 h-[30rem] w-full" />
      </div>

      {/* the agent, sitting under every content layer */}
      <HeroStage className="absolute inset-0 -z-20 opacity-80 lg:opacity-100" />

      {/* legibility scrim: the mesh is bright enough to fight the copy, so the
          side the copy lives on gets darkened — downward on phones, where the
          copy sits above the agent, and leftward from lg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, color-mix(in srgb, var(--bg) 88%, transparent) 46%, color-mix(in srgb, var(--bg) 60%, transparent) 72%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 12%, color-mix(in srgb, var(--bg) 72%, transparent) 42%, transparent 66%)",
        }}
      />

      {BUBBLES.map((b) => (
        <DriftingOrb key={b.className} {...b} />
      ))}

      <div className="container-px relative z-10">
        <motion.div
          initial={still ? false : "hidden"}
          animate="shown"
          variants={parent}
          className="max-w-2xl"
        >
          <motion.div variants={child}>
            <StatusPill>Now booking — replies within 1 business day</StatusPill>
          </motion.div>

          <motion.div variants={child} className="mt-6">
            <h1 className={HEADLINE}>
              Premium web,{" "}
              <span className="gradient-text gradient-text-pan">
                end to end
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={child}
            className="mt-7 max-w-xl text-[16px] leading-relaxed lg:text-[17px]"
          >
            A design-first studio crafting high-end websites, custom software,
            and full-funnel growth for brands that want to lead their market.
          </motion.p>

          <motion.ul variants={child} className="mt-7 flex flex-col gap-2.5">
            {PROMISES.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[14px]">
                <span
                  aria-hidden
                  className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                  }}
                >
                  <Check className="h-2.5 w-2.5 text-[#04100c]" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </motion.ul>

          {/* the agent sits above the CTA row, not inside it: a fourth pill
              would disappear into the other three, and this is the one thing
              on the page that answers back */}
          <motion.div variants={child} className="mt-8">
            <HeroAgentTrigger />
          </motion.div>

          <motion.div
            variants={child}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <ContactCTA />
            <PillButton href="/work" tone="glass">
              View our work
            </PillButton>
          </motion.div>

          <motion.div variants={child} className="mt-9 flex flex-wrap gap-2">
            {CHIPS.map((id) => {
              const s = services.find((x) => x.id === id);
              if (!s) return null;
              return (
                <HexBadge
                  key={id}
                  label={s.title}
                  icon={<ServiceIcon id={id} strokeWidth={1.7} />}
                />
              );
            })}
          </motion.div>

          <motion.dl
            variants={child}
            className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-[color:var(--border)] pt-6"
          >
            {[
              ["120+", "Projects delivered"],
              ["98%", "Client retention"],
              ["3.4x", "Avg. organic growth"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-mono text-[1.5rem] text-[color:var(--text)]">
                  {value}
                </dt>
                <dd className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.14em]">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
