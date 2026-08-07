"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const budgets = ["$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const successRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("sent");
      requestAnimationFrame(() => {
        if (successRef.current) {
          gsap.fromTo(
            successRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        }
      });
    }, 900);
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        className="rounded-3xl border border-[color:var(--color-primary)]/25 bg-[color:var(--color-primary)]/5 p-10 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-2xl text-white">
          ✓
        </span>
        <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--color-ink)]">
          Message sent.
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-ink)]/60">
          Thanks for reaching out — we&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-[color:var(--color-ink)]">
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Jane Doe"
            className="mt-2 w-full rounded-xl border border-[color:var(--color-ink)]/15 bg-white px-4 py-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-ink)]/35 focus:border-[color:var(--color-primary)]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[color:var(--color-ink)]">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="jane@company.com"
            className="mt-2 w-full rounded-xl border border-[color:var(--color-ink)]/15 bg-white px-4 py-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-ink)]/35 focus:border-[color:var(--color-primary)]"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[color:var(--color-ink)]">
          Company
        </label>
        <input
          type="text"
          name="company"
          placeholder="Company name"
          className="mt-2 w-full rounded-xl border border-[color:var(--color-ink)]/15 bg-white px-4 py-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-ink)]/35 focus:border-[color:var(--color-primary)]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[color:var(--color-ink)]">
          Project budget
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label
              key={b}
              className="cursor-pointer rounded-full border border-[color:var(--color-ink)]/15 px-4 py-2 text-sm text-[color:var(--color-ink)]/70 transition-colors has-[:checked]:border-[color:var(--color-primary)] has-[:checked]:bg-[color:var(--color-primary)] has-[:checked]:text-white"
            >
              <input type="radio" name="budget" value={b} className="sr-only" />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[color:var(--color-ink)]">
          Tell us about your project
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="What are you looking to build?"
          className="mt-2 w-full resize-none rounded-xl border border-[color:var(--color-ink)]/15 bg-white px-4 py-3 text-sm text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-ink)]/35 focus:border-[color:var(--color-primary)]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-ink)] px-7 py-4 text-sm font-medium text-white transition-all hover:bg-[color:var(--color-primary)] disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send message"}
        {status !== "loading" && <span aria-hidden>→</span>}
      </button>
    </form>
  );
}
