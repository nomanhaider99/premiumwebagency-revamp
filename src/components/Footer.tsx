import Link from "next/link";
import Image from "next/image";
import CircuitLines from "@/components/motif/CircuitLines";
import { PRIMARY_NAV, SITE, SOCIALS } from "@/data/site";
import { services } from "@/data/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-quiet relative mt-24 overflow-hidden border-t">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <CircuitLines className="h-full w-full" />
      </div>

      <div className="container-px relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label={SITE.name} className="inline-flex">
              <Image
                src="/logo.webp"
                alt={SITE.name}
                width={180}
                height={61}
                className="h-8 w-auto dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed">
              A premium web design &amp; development studio helping ambitious
              brands look, feel, and perform at the top of their market —
              through design, engineering, and growth marketing.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full font-mono text-[10px] uppercase text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="text-[13px] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              Company
            </h2>
            <ul className="mt-5 space-y-2.5">
              {PRIMARY_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              Say hello
            </h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 block text-[13px] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
            >
              {SITE.email}
            </a>
            <p className="mt-2 text-[13px]">
              {SITE.phone}
              <br />
              {SITE.location}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          {/* Skiper UI's free tier asks for a credit somewhere on the page */}
          <p>
            Theme toggle by{" "}
            <a
              href="https://skiper-ui.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[color:var(--text)] underline underline-offset-4"
            >
              Skiper UI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
