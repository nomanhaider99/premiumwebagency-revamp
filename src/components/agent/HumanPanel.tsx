"use client";

import { Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import StatusPill from "@/components/motif/StatusPill";
import { SITE } from "@/data/site";

/**
 * The other side of the dialog: the same contact form the rest of the site
 * uses, with the two direct channels above it.
 *
 * Reusing `ContactForm` rather than writing a second one is the point — a
 * duplicate form is how the two quietly drift apart, and this one already
 * handles its own submit and success states.
 */
export default function HumanPanel() {
  const channels = [
    {
      href: `mailto:${SITE.email}`,
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: SITE.email,
    },
    {
      href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}`,
      icon: <Phone className="h-4 w-4" />,
      label: "Phone",
      value: SITE.phone,
    },
  ];

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-sm text-[13px] leading-relaxed">
          Tell us about the project and a strategist gets back to you — no
          scripts, no queue.
        </p>
        <StatusPill>Replies within 1 business day</StatusPill>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="glass-quiet group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:border-[color:var(--border-strong)]"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#04100c]"
              style={{
                background:
                  "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
              }}
            >
              {c.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                {c.label}
              </span>
              <span className="block truncate text-[13px] text-[color:var(--text)]">
                {c.value}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 border-t border-[color:var(--border)] pt-6">
        <ContactForm />
      </div>
    </div>
  );
}
