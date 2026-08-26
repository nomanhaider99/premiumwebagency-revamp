"use client";

import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import HexBadge from "@/components/motif/HexBadge";
import StatusPill from "@/components/motif/StatusPill";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";
import { PRIMARY_NAV } from "@/data/site";

/**
 * The desktop nav, with Services opening a full mega panel.
 *
 * The whole row is one Radix NavigationMenu rather than a lone dropdown
 * bolted beside plain links: that is what gets arrow-key movement across
 * every item, the trigger's `aria-expanded`, Escape to close, and the
 * pointer-intent delay that stops the panel flickering open as the cursor
 * crosses the word on its way somewhere else. All of it is easy to write
 * badly and hard to notice is wrong.
 *
 * The panel is centred in the viewport rather than hung off the trigger. At
 * this width, anchoring it to the word "Services" — which sits well right of
 * the gutter, after the logo — would push it off the edge of the screen on a
 * 1280px display and leave it out of the site's grid on every other.
 */
export default function ServicesMenu({
  pathname,
  scrolled,
}: {
  pathname: string;
  /** the navbar pill shrinks once the page is under it, and the panel follows */
  scrolled: boolean;
}) {
  const LINK_BASE = "relative text-[13px] transition-colors duration-200";
  const tone = (active: boolean) =>
    active
      ? "text-[color:var(--text)]"
      : "text-[color:var(--text-muted)] hover:text-[color:var(--text)]";

  return (
    <NavigationMenu.Root
      // long enough that crossing the word doesn't trigger it, short enough
      // that reaching for it doesn't feel like waiting
      delayDuration={180}
      className="relative ml-6 hidden lg:block"
    >
      <NavigationMenu.List className="flex items-center gap-7">
        {PRIMARY_NAV.map((link) => {
          const active = pathname.startsWith(link.href);

          if (link.href !== "/services") {
            return (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link asChild>
                  <Link href={link.href} className={`${LINK_BASE} ${tone(active)}`}>
                    {link.label}
                    {active && (
                      <span
                        aria-hidden
                        className="gradient-rule absolute -bottom-1.5 left-0 h-px w-full"
                      />
                    )}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={link.href}>
              <NavigationMenu.Trigger
                className={`group flex items-center gap-1.5 outline-none ${LINK_BASE} ${tone(
                  active
                )}`}
              >
                {link.label}
                <ChevronDown
                  aria-hidden
                  className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
                {active && (
                  <span
                    aria-hidden
                    className="gradient-rule absolute -bottom-1.5 left-0 h-px w-full"
                  />
                )}
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out">
                <ServicesPanel pathname={pathname} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      {/* Radix renders the open panel in here.
          Anchored to the viewport rather than to this list: the list starts
          after the logo, so a panel this wide hung off its left edge would
          run off the right of the screen at 1280px. Centring it also keeps it
          inside the site's gutters at every width. The offset tracks the pill,
          which loses height as the page scrolls under it, and
          `pointer-events-none` on the rail stops the strip either side of the
          panel swallowing clicks on the page. */}
      <div
        className={`pointer-events-none fixed inset-x-0 z-10 flex justify-center px-10 transition-[top] duration-300 ${
          scrolled ? "top-[5.1rem]" : "top-[5.6rem]"
        }`}
      >
        <NavigationMenu.Viewport className="pointer-events-auto data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2" />
      </div>
    </NavigationMenu.Root>
  );
}

/** The panel itself: a standfirst rail, then every service as a row. */
function ServicesPanel({ pathname }: { pathname: string }) {
  return (
    <div
      className="glass-card w-[min(72rem,calc(100vw-5rem))] overflow-hidden p-0"
      style={{
        // a menu floating over live page content needs a ground of its own;
        // glass alone is not opaque enough to read ten rows of copy on
        background: "color-mix(in srgb, var(--surface-solid) 96%, transparent)",
      }}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,17rem)_1fr]">
        {/* the rail */}
        <div className="relative flex flex-col justify-between gap-8 border-b border-[color:var(--border)] p-7 lg:border-b-0 lg:border-r">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(80% 60% at 0% 0%, color-mix(in srgb, var(--signal) 12%, transparent), transparent 70%), radial-gradient(70% 60% at 20% 100%, color-mix(in srgb, var(--circuit) 14%, transparent), transparent 72%)",
            }}
          />

          <div className="relative">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              What we do
            </p>
            <p className="mt-4 text-[1.15rem] leading-snug text-[color:var(--text)]">
              One studio,{" "}
              <span className="gradient-text">every discipline</span> your brand
              needs.
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed">
              Design, engineering and growth on one team — so nothing is lost in
              a handoff.
            </p>
          </div>

          <div className="relative flex flex-col items-start gap-4">
            <NavigationMenu.Link asChild>
              <Link
                href="/services"
                className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-[12.5px] font-medium text-[#04100c] shadow-[0_6px_24px_var(--glow)] transition-shadow duration-300 hover:shadow-[0_10px_34px_color-mix(in_srgb,var(--signal)_38%,transparent)]"
                style={{
                  background:
                    "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                }}
              >
                All services
                <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </NavigationMenu.Link>

            <StatusPill>Replies within 1 business day</StatusPill>
          </div>
        </div>

        {/* every service, two to a row */}
        <ul className="grid gap-1 p-4 sm:grid-cols-2">
          {services.map((service) => {
            const href = `/services/${service.id}`;
            const active = pathname === href;

            return (
              <li key={service.id}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={href}
                    className={`group/item flex items-start gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-[color:var(--bg-deep)] focus-visible:bg-[color:var(--bg-deep)] ${
                      active ? "bg-[color:var(--bg-deep)]" : ""
                    }`}
                  >
                    <HexBadge
                      compact
                      label={service.title}
                      icon={<ServiceIcon id={service.id} strokeWidth={1.7} />}
                      className="mt-0.5"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[color:var(--text)]">
                          {service.title}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="h-3 w-3 shrink-0 text-[color:var(--text-muted)] opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-hover/item:opacity-100"
                        />
                      </span>
                      <span className="mt-1 block text-[11.5px] leading-snug text-[color:var(--text-muted)]">
                        {service.tagline}
                      </span>
                    </span>

                    <span className="mt-0.5 shrink-0 font-mono text-[9px] tracking-[0.16em] text-[color:var(--text-muted)]">
                      {service.number}
                    </span>
                  </Link>
                </NavigationMenu.Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
