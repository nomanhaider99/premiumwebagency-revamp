"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import OptionWheel from "@/components/ui/OptionWheel";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import PillButton from "@/components/motif/PillButton";
import Reveal from "@/components/motion/Reveal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { services } from "@/data/services";

const TITLES = services.map((s) => s.title);

/**
 * What we do — the wheel picks, the card answers.
 *
 * The grid this replaced put ten cards on the page at once and asked the
 * reader to do the choosing. A wheel is the better shape for a list this
 * long: one thing is legible at a time, the rest stay visible as context,
 * and the card on the right carries the full detail for whatever is at the
 * centre. No copy changed — the same ten services, the same card.
 *
 * The wheel's row height is computed in JavaScript from `fontSize`, so the
 * size cannot be handed to a Tailwind breakpoint the way the rest of the
 * page's responsiveness is — it has to come through as a value.
 */
export default function WhatWeDo() {
  const [index, setIndex] = useState(0);
  const still = useReducedMotion();
  /* Two steps rather than one: the longest title ("Mobile App Development")
     has to fit the column without being clipped, and at 1024px there is only
     about half the width there is at 1280px. */
  const lg = useMediaQuery("(min-width: 1024px)");
  const xl = useMediaQuery("(min-width: 1280px)");
  const size = xl ? 2.5 : lg ? 2 : 1.5;

  const service = services[index];

  return (
    <section id="services" className="container-px scroll-mt-24 py-20 lg:py-28">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            One studio. <span className="gradient-text">Every discipline</span>{" "}
            your brand needs.
          </>
        }
        action={
          <PillButton href="/services" tone="glass">
            All services
          </PillButton>
        }
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <Reveal className="relative">
          <div className="h-[26rem] lg:h-[32rem] xl:h-[36rem]">
            <OptionWheel
              items={TITLES}
              defaultSelected={0}
              onChange={setIndex}
              side="left"
              fontSize={size}
              inset={xl ? 52 : lg ? 44 : 32}
              tilt={7}
              blur={still ? 0 : 1.6}
              // reduced motion gets the wheel's end state, not a faster ease
              smoothing={still ? 1 : 200}
            />
          </div>

          <p className="mt-2 pl-[32px] font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] lg:pl-[44px] xl:pl-[52px]">
            Scroll, drag or click to explore
          </p>
        </Reveal>

        {/* the card for whatever the wheel is holding at its centre */}
        <div className="min-h-[26rem] lg:min-h-[30rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={service.id}
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
