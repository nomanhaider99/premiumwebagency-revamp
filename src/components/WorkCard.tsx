import type { Project } from "@/data/projects";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
      >
        <div className="noise-overlay" />
        <div className="absolute inset-0 flex items-end justify-between p-7">
          <span className="font-[family-name:var(--font-alt)] text-sm text-white/80">
            {project.year}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-[color:var(--color-ink)] group-hover:rotate-45">
            ↗
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide text-white">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-white/55">
            {project.category}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {project.description}
      </p>
    </div>
  );
}
