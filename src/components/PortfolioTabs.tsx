"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimateIn from "@/components/AnimateIn";
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
  const [active, setActive] = useState<(ProjectTag | "All")>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(active)),
    [active, projects]
  );

  return (
    <div>
      <Tabs value={active} onValueChange={(v) => setActive(v as ProjectTag | "All")}>
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-full border border-[color:var(--color-ink)]/10 bg-[color:var(--color-mist)]/60 p-1.5">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full px-4 py-2 text-sm font-medium text-[color:var(--color-ink)]/60 data-active:bg-[color:var(--color-ink)] data-active:text-white data-active:shadow-none"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimateIn
        key={active}
        stagger
        className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </AnimateIn>

      {filtered.length === 0 && (
        <p className="mt-14 text-center text-sm text-[color:var(--color-ink)]/50">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
