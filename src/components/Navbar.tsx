"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MD_BREAKPOINT = 768;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const [pillWidth, setPillWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const sizer = sizerRef.current;
    if (!sizer) return;

    const update = () => {
      if (window.innerWidth < MD_BREAKPOINT) {
        setPillWidth(undefined);
        return;
      }
      const natural = sizer.offsetWidth + 2;
      const wide = Math.min(window.innerWidth * 0.92, 1152);
      setPillWidth(scrolled ? Math.max(wide, natural) : natural);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(sizer);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [scrolled]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(
        el,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        el.querySelectorAll("a"),
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, delay: 0.05, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [open]);

  const navContent = (
    <>
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.webp"
          alt="Premium Web Agency"
          width={180}
          height={61}
          priority
          className="h-9 w-auto"
        />
      </Link>

      <div className="hidden md:flex h-full shrink-0 items-center gap-7 whitespace-nowrap">
        {links.map((link) => {
          const active = pathname === link.href;

          if (link.href === "/services") {
            return <ServicesMegaMenu key={link.href} active={active} />;
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors group ${
                active
                  ? "text-[color:var(--color-ink)]"
                  : "text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)]"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[color:var(--color-primary)] transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </div>

      <div className="hidden md:block shrink-0">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[color:var(--color-primary)] hover:shadow-lg hover:shadow-[color:var(--color-primary)]/30"
        >
          Start a project
        </Link>
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-[color:var(--color-ink)] transition-transform duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-[color:var(--color-ink)] transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-[color:var(--color-ink)] transition-transform duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4 transition-all duration-300">
      {/* invisible twin, used only to measure the pill's natural content width */}
      <div
        ref={sizerRef}
        aria-hidden
        className="invisible absolute left-0 top-0 inline-flex h-16 items-center gap-6 border border-transparent pl-6 pr-3 md:gap-8 md:pr-4"
      >
        {navContent}
      </div>

      <nav
        style={pillWidth ? { width: `${pillWidth}px` } : undefined}
        className={`inline-flex h-16 items-center gap-6 border border-black/10 bg-white/90 py-2 backdrop-blur-xl transition-all duration-300 md:gap-8 ${
          scrolled
            ? "rounded-2xl pl-10 pr-8 shadow-[0_12px_40px_rgba(0,0,0,0.2)] md:pr-9 md:justify-between"
            : "rounded-full pl-6 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.15)] md:pr-4"
        }`}
      >
        {navContent}
      </nav>

      <div
        ref={menuRef}
        className="md:hidden hidden w-[min(90vw,20rem)] flex-col gap-1 rounded-2xl mt-2 bg-white/95 backdrop-blur-md px-6 pb-6 pt-2 shadow-lg border border-black/10"
        style={{ display: "none" }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="py-3 text-base font-medium text-[color:var(--color-ink)] border-b border-black/10 last:border-none"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-sm font-medium text-white"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
