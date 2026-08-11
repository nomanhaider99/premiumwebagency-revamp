import Link from "next/link";
import type { Service } from "@/data/services";
import { getServiceIcon } from "@/lib/service-icons";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.id);

  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative z-0 block h-full transition-transform duration-500 ease-out hover:z-30 hover:-translate-y-2 focus-visible:z-30 focus-visible:-translate-y-2"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 ease-out group-hover:rounded-b-none group-hover:shadow-2xl group-hover:shadow-[color:var(--color-primary)]/15 group-focus-within:rounded-b-none group-focus-within:shadow-2xl group-focus-within:shadow-[color:var(--color-primary)]/15">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-3 right-4 select-none font-[family-name:var(--font-display)] text-8xl font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-[color:var(--color-primary)]/10"
        >
          {service.number}
        </span>

        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-sky)] text-white shadow-lg shadow-black/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>

        <h3 className="relative mt-8 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-wide text-white">
          {service.title}
        </h3>
        <p className="relative mt-1 text-sm font-medium text-[color:var(--color-primary)]">
          {service.tagline}
        </p>
        <p className="relative mt-4 text-sm leading-relaxed text-white/60">
          {service.description}
        </p>

        <div className="flex-1" />

        <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors duration-300 group-hover:text-[color:var(--color-primary)]">
          Explore service
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>

      {/* Feature disclosure: absolutely positioned so it flies out below the
          card on hover without growing this grid item — otherwise sibling
          cards in the same row would stretch to match (align-items: stretch). */}
      <div className="pointer-events-none absolute inset-x-0 top-full z-20 origin-top scale-y-0 rounded-b-3xl border border-t-0 border-white/10 bg-[color:var(--color-surface)] px-8 pb-8 opacity-0 shadow-2xl shadow-[color:var(--color-primary)]/15 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:scale-y-100 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        <ul className="space-y-2 border-t border-white/10 pt-6">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <span className="h-1 w-1 rounded-full bg-[color:var(--color-primary)]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
