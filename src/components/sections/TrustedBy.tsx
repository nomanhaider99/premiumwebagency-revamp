import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

/**
 * The client strip. There is no logo set in the repo, so the names come
 * straight off the projects the site already publishes — real, currently
 * displayable clients rather than invented partners.
 */
export default function TrustedBy() {
  return (
    <section className="container-px py-8">
      <Reveal className="glass-quiet rounded-2xl px-6 py-6">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          Trusted by the teams behind
        </p>
        <Reveal
          stagger
          as="ul"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <li className="text-[14px] font-medium text-[color:var(--text)] opacity-80 transition-opacity hover:opacity-100">
                {p.name}
              </li>
            </RevealItem>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
