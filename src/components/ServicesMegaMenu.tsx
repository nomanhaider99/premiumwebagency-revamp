"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import { getServiceIcon } from "@/lib/service-icons";

const ROW_HEIGHT = 44;

export default function ServicesMegaMenu({
  active,
}: {
  active: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  const current = services[hovered];
  const Icon = getServiceIcon(current.id);

  return (
    <div className="group/services relative flex h-full items-center">
      <Link
        href="/services"
        className={`relative flex items-center gap-1 text-sm font-semibold transition-colors group ${
          active
            ? "text-[color:var(--color-ink)]"
            : "text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)]"
        }`}
      >
        Services
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/services:rotate-180" />
        <span
          className={`absolute -bottom-1 left-0 h-[2px] bg-[color:var(--color-primary)] transition-all duration-300 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>

      {/* mega menu */}
      <div className="invisible absolute left-1/2 top-full w-[820px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover/services:visible group-hover/services:translate-y-0 group-hover/services:opacity-100 group-focus-within/services:visible group-focus-within/services:translate-y-0 group-focus-within/services:opacity-100">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-ink)] shadow-2xl shadow-black/50">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="grid grid-cols-[270px_1fr]">
            {/* left: service list with a sliding active indicator */}
            <div className="relative border-r border-white/8 p-3" onMouseLeave={() => setHovered(0)}>
              <div
                aria-hidden
                className="absolute left-3 right-3 top-3 h-11 rounded-xl bg-white/[0.06] transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${hovered * ROW_HEIGHT}px)` }}
              />
              <ul className="relative">
                {services.map((s, i) => {
                  const RowIcon = getServiceIcon(s.id);
                  return (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.id}`}
                        onMouseEnter={() => setHovered(i)}
                        className={`flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm transition-colors duration-200 ${
                          hovered === i ? "text-white" : "text-white/45"
                        }`}
                      >
                        <RowIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        <span className="flex-1 truncate font-medium">{s.title}</span>
                        <span className="font-[family-name:var(--font-alt)] text-[10px] text-white/25">
                          {s.number}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* right: live preview of the hovered service */}
            <div className="relative flex flex-col justify-center overflow-hidden p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full opacity-25 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
                }}
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-sky)] text-white shadow-lg shadow-black/30">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-wide text-white">
                {current.title}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-[color:var(--color-sky)]">
                {current.tagline}
              </p>
              <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                {current.description}
              </p>
              <Link
                href={`/services/${current.id}`}
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform hover:translate-x-0.5"
              >
                Explore service
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5">
            <p className="font-[family-name:var(--font-alt)] text-xs text-white/35">
              120+ projects delivered &middot; 98% client retention
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-sky)] transition-transform hover:translate-x-0.5"
            >
              View all services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
