"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IndustryIcon } from "@/lib/industry-icons";
import SectionHeading from "@/components/SectionHeading";
import { industries, type Industry } from "@/data/industries";

/**
 * The work browser, tabbed by industry.
 *
 * Each tab knows where its reference work lives on Dribbble and links out to
 * it. What it does *not* do is pull those shots in and present them as this
 * agency's portfolio — they belong to the designers who posted them. Until a
 * real screenshot is added to that industry's `shots`, the tile renders a
 * generated preview in the vertical's own tint, so the section is complete
 * without claiming work that isn't ours.
 */

/** a drawn stand-in: browser chrome, a hero block, and a content grid */
function GeneratedPreview({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const [from, to] = industry.tint;
  // three variations so a row of three never reads as the same image repeated
  const layout = index % 3;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
    >
      <div aria-hidden className="grid-texture absolute inset-0 opacity-25" />

      <div className="absolute inset-0 flex flex-col p-4">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-white/25" />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          {layout === 0 && (
            <>
              <span className="h-2.5 w-2/3 rounded-full bg-white/85" />
              <span className="mt-2 h-2 w-1/2 rounded-full bg-white/50" />
              <span className="mt-auto grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-10 rounded-md bg-white/25" />
                ))}
              </span>
            </>
          )}

          {layout === 1 && (
            <>
              <span className="flex gap-2">
                <span className="h-16 w-1/2 rounded-md bg-white/30" />
                <span className="flex w-1/2 flex-col gap-2">
                  <span className="h-2.5 w-full rounded-full bg-white/85" />
                  <span className="h-2 w-4/5 rounded-full bg-white/50" />
                  <span className="mt-auto h-6 w-2/3 rounded-full bg-white/35" />
                </span>
              </span>
              <span className="mt-auto h-8 rounded-md bg-white/20" />
            </>
          )}

          {layout === 2 && (
            <>
              <span className="mx-auto h-2.5 w-1/2 rounded-full bg-white/85" />
              <span className="mx-auto mt-2 h-2 w-1/3 rounded-full bg-white/50" />
              <span className="mt-auto grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-7 rounded-md bg-white/25" />
                ))}
              </span>
            </>
          )}
        </div>
      </div>

      <span className="absolute bottom-3 right-3 rounded-full bg-black/25 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
        {industry.label}
      </span>
    </div>
  );
}

export default function IndustryWork() {
  const [active, setActive] = useState(industries[0].id);
  const still = useReducedMotion();
  const industry = industries.find((i) => i.id === active)!;
  const tiles = industry.shots.length ? industry.shots : [null, null, null];

  return (
    <section className="container-px py-20 lg:py-28">
      <SectionHeading
        eyebrow="Work by industry"
        title={
          <>
            The verticals we build for{" "}
            <span className="gradient-text">every week.</span>
          </>
        }
        description="Pick a trade to see the kind of work we build for it. The references below are shots by other designers on Dribbble, credited and linked."
      />

      {/* the tabs */}
      <div
        role="tablist"
        aria-label="Industries"
        className="mt-10 flex flex-wrap gap-2"
      >
        {industries.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                isActive
                  ? "text-[#04100c]"
                  : "glass-quiet text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                    }
                  : undefined
              }
            >
              <IndustryIcon name={item.icon} className="h-3.5 w-3.5" strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="mt-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-xl text-[14px] leading-relaxed">
              {industry.blurb}
            </p>
            <a
              href={industry.dribbbleSearch}
              target="_blank"
              rel="noreferrer noopener"
              className="glass-quiet inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
            >
              Browse {industry.label} on Dribbble
              <ArrowUpRight aria-hidden className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((shot, i) => {
              const body = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[19px]">
                    {shot ? (
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <GeneratedPreview industry={industry} index={i} />
                    )}
                  </div>
                  {shot?.credit && (
                    <figcaption className="flex items-center gap-1.5 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                      <span className="truncate">{shot.credit}</span>
                      <ArrowUpRight aria-hidden className="h-3 w-3 shrink-0" />
                    </figcaption>
                  )}
                </>
              );

              return (
                <figure
                  key={shot ? shot.src : `placeholder-${i}`}
                  className="glass-card group overflow-hidden"
                >
                  {shot?.href ? (
                    <a
                      href={shot.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </figure>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
