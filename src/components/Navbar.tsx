"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatusPill from "@/components/motif/StatusPill";
import ContactCTA from "@/components/motif/ContactCTA";
import { PRIMARY_NAV, SITE } from "@/data/site";

/**
 * A floating glass pill rather than a full-width bar: it sits inset from the
 * top with a gutter either side, and tightens and deepens its glass once the
 * page has scrolled under it. Order along the row matches the reference —
 * links, then the status pill, then the CTA, with the theme toggle last.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
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
              ? "glass-quiet h-14 shadow-[0_8px_40px_var(--glow)]"
              : "h-16 border border-transparent"
          }`}
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

          <nav className="ml-6 hidden items-center gap-7 lg:flex">
            {PRIMARY_NAV.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] transition-colors duration-200 ${
                    active
                      ? "text-[color:var(--text)]"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden
                      className="gradient-rule absolute -bottom-1.5 left-0 h-px w-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

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
              <nav className="flex flex-col">
                {PRIMARY_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-[color:var(--border)] py-4 text-[1.35rem] text-[color:var(--text)]"
                  >
                    {link.label}
                  </Link>
                ))}
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
