"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "@/lib/service-icons";
import HexBadge from "@/components/motif/HexBadge";
import type { Service } from "@/data/services";

/**
 * A service as a glass card. Hover lifts the scale a touch and deepens the
 * glow — the shadow intensifying is what sells the card as a physical plane.
 */
export default function ServiceCard({ service }: { service: Service }) {
  const still = useReducedMotion();

  return (
    <motion.div
      whileHover={still ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/services/${service.id}`}
        className="glass-card group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-[0_14px_60px_color-mix(in_srgb,var(--signal)_16%,transparent)]"
      >
        <div className="flex items-start justify-between">
          <HexBadge
            compact
            label={service.title}
            icon={<ServiceIcon id={service.id} strokeWidth={1.7} />}
          />
          <span className="font-mono text-[10px] tracking-[0.16em] text-[color:var(--text-muted)]">
            {service.number}
          </span>
        </div>

        <h3 className="mt-6 text-[1.1rem]">{service.title}</h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--signal-ink)]">
          {service.tagline}
        </p>
        <p className="mt-4 flex-1 text-[13px] leading-relaxed">
          {service.description}
        </p>

        <ul className="mt-5 space-y-1.5 border-t border-[color:var(--border)] pt-4">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px]">
              <span
                aria-hidden
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                style={{ background: "var(--signal)" }}
              />
              {f}
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--text)]">
          Explore service
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}
