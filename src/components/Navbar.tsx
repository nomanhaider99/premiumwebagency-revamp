"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--color-ink)]/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <span className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/5 transition-shadow duration-300">
            <Image
              src="/logo.webp"
              alt="Premium Web Agency"
              width={180}
              height={61}
              priority
              className="h-8 w-auto"
            />
          </span>
        </Link>

        <div className="hidden md:flex h-full items-center gap-10">
          {links.map((link) => {
            const active = pathname === link.href;

            if (link.href === "/services") {
              return (
                <ServicesMegaMenu key={link.href} active={active} />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors group ${
                  active ? "text-white" : "text-white/70 hover:text-white"
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

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[color:var(--color-ink)] transition-all hover:bg-[color:var(--color-sky)] hover:shadow-lg hover:shadow-[color:var(--color-primary)]/30"
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
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="md:hidden hidden flex-col gap-1 bg-[color:var(--color-ink)]/95 backdrop-blur-md px-6 pb-6 pt-2 shadow-lg"
        style={{ display: "none" }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="py-3 text-base font-medium text-white border-b border-white/10 last:border-none"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[color:var(--color-ink)]"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
