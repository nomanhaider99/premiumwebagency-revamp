"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function WorkCard({ project }: { project: Project }) {
  const still = useReducedMotion();

  return (
    <motion.article
      whileHover={still ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card group h-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_14px_60px_color-mix(in_srgb,var(--circuit)_18%,transparent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--signal) 55%, transparent), color-mix(in srgb, var(--circuit) 65%, transparent))",
          }}
        />
        <div aria-hidden className="grid-texture absolute inset-0 opacity-40" />

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <span className="glass-scrim rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text)]">
              {project.year}
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 text-[color:var(--text)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="text-[1.25rem] font-medium text-[color:var(--text)]">
            {project.name}
          </p>
        </div>
      </div>

      <div className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--signal-ink)]">
          {project.category}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color:var(--border)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[color:var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
