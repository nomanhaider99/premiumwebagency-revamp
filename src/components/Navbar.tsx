"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatusPill from "@/components/motif/StatusPill";
import ContactCTA from "@/components/motif/ContactCTA";
import ServicesMenu from "@/components/nav/ServicesMenu";
import HexBadge from "@/components/motif/HexBadge";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";
import { PRIMARY_NAV, SITE } from "@/data/site";

/**
 * A floating glass pill rather than a full-width bar: it sits inset from the
 * top with a gutter either side, and tightens and deepens its glass once the
 * page has scrolled under it. Order along the row matches the reference —
 * links, then the status pill, then the CTA, with the theme toggle last.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const still = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 lg:pt-5">
      <div className="container-px">
        <div
          className={`flex items-center gap-4 rounded-full px-4 transition-all duration-300 lg:px-6 ${
            scrolled
              ? "h-14 border border-[color:var(--border)] shadow-[0_8px_40px_var(--glow)]"
              : "h-16 border border-transparent"
          }`}
          /* Once the page is under it the bar has to be opaque, not glass:
             `--surface` is 4% white in the dark theme, so the copy scrolling
             beneath was reading straight through the pill. A solid ground also
             drops the backdrop-filter, which was being recomputed every frame
             of the scroll for no benefit. */
          style={scrolled ? { background: "var(--surface-solid)" } : undefined}
        >
          <Link
            href="/"
            aria-label={SITE.name}
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.webp"
              alt={SITE.name}
              width={180}
              height={61}
              priority
              className="h-7 w-auto dark:brightness-0 dark:invert"
            />
          </Link>

          <ServicesMenu pathname={pathname} scrolled={scrolled} />

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden xl:block">
              <StatusPill>Replies within 1 business day</StatusPill>
            </span>
            <span className="hidden sm:block">
              <ContactCTA className="h-9 px-5" />
            </span>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text)] lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={still ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="fixed inset-x-0 top-[4.75rem] bottom-0 lg:hidden"
            style={{ background: "var(--bg)" }}
          >
            <div className="container-px flex h-full flex-col justify-between py-8">
              <nav className="flex flex-col overflow-y-auto">
                {PRIMARY_NAV.map((link) =>
                  link.href === "/services" ? (
                    <div
                      key={link.href}
                      className="border-b border-[color:var(--border)]"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex-1 py-4 text-[1.35rem] text-[color:var(--text)]"
                        >
                          {link.label}
                        </Link>
                        {/* a separate control, so tapping the word still
                            navigates and only the chevron expands */}
                        <button
                          type="button"
                          aria-label={
                            servicesOpen
                              ? "Collapse services"
                              : "Expand services"
                          }
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services"
                          onClick={() => setServicesOpen((v) => !v)}
                          className="glass-quiet ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        >
                          <motion.span
                            aria-hidden
                            animate={{ rotate: servicesOpen ? 180 : 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 220,
                              damping: 22,
                            }}
                            className="flex"
                          >
                            <ChevronDown className="h-4 w-4 text-[color:var(--text)]" />
                          </motion.span>
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.ul
                            key="services"
                            id="mobile-services"
                            initial={still ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                              still
                                ? { opacity: 0 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 160,
                              damping: 24,
                            }}
                            className="overflow-hidden"
                          >
                            {services.map((service) => (
                              <li key={service.id}>
                                <Link
                                  href={`/services/${service.id}`}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-3 py-2.5 pl-1"
                                >
                                  <HexBadge
                                    compact
                                    label={service.title}
                                    icon={
                                      <ServiceIcon
                                        id={service.id}
                                        strokeWidth={1.7}
                                      />
                                    }
                                  />
                                  <span className="text-[14px] text-[color:var(--text-muted)]">
                                    {service.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                            <li className="pb-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-[color:var(--border)] py-4 text-[1.35rem] text-[color:var(--text)]"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="flex flex-col gap-4">
                <StatusPill className="self-start">
                  Replies within 1 business day
                </StatusPill>
                <ContactCTA className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
