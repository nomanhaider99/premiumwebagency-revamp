"use client";

import { useMemo, useState } from "react";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import WorkCard from "@/components/WorkCard";
import type { Project, ProjectTag } from "@/data/projects";

const categories: (ProjectTag | "All")[] = [
  "All",
  "Web Design",
  "Development",
  "E-commerce",
  "SEO",
  "Marketing",
  "Branding",
];

export default function PortfolioTabs({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectTag | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All" ? projects : projects.filter((p) => p.tags.includes(active)),
    [active, projects]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={`h-9 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
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
              {cat}
            </button>
          );
        })}
      </div>

      <Reveal
        key={active}
        stagger
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p) => (
          <RevealItem key={p.slug} className="h-full">
            <WorkCard project={p} />
          </RevealItem>
        ))}
      </Reveal>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[13px]">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
