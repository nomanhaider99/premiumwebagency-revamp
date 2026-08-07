import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "/services#design" },
      { label: "Development", href: "/services#development" },
      { label: "Marketing", href: "/services#marketing" },
      { label: "SEO", href: "/services#seo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-ink)] text-white">
      <div className="noise-overlay" />
      <div className="container-px relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <span className="inline-flex items-center rounded-xl bg-white px-3 py-1.5">
                <Image
                  src="/logo.webp"
                  alt="Premium Web Agency"
                  width={180}
                  height={61}
                  className="h-9 w-auto"
                />
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              A premium web design & development studio helping ambitious
              brands look, feel, and perform at the top of their market —
              through design, engineering, and growth marketing.
            </p>
            <a
              href="mailto:hello@premiumwebagency.com"
              className="mt-6 inline-block font-[family-name:var(--font-alt)] text-lg text-[color:var(--color-sky)] hover:text-white transition-colors"
            >
              hello@premiumwebagency.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 hover:text-[color:var(--color-sky)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Say hello
            </h4>
            <p className="mt-5 text-sm text-white/75">
              +1 (555) 010-2030
              <br />
              Remote-first · Worldwide
            </p>
            <div className="mt-6 flex gap-3">
              {["In", "Ig", "X", "Bh"].map((s) => (
                <span
                  key={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/70 transition-colors hover:border-[color:var(--color-sky)] hover:text-[color:var(--color-sky)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Premium Web Agency. All rights reserved.</p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
