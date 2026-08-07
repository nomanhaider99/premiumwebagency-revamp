"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const projectTypes = ["Website", "E-commerce", "Web app", "SEO & growth"];

export default function HeroForm() {
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
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        }
      });
    }, 900);
  };

  return (
    <div className="hero-visual relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
      {/* soft contained glow behind the card */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-40 blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary) 0%, transparent 75%)",
        }}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.06] p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-9">
        {/* top hairline sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {status === "sent" ? (
          <div ref={successRef} className="flex flex-col items-center py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-2xl text-white">
              ✓
            </span>
            <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              Request received.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Thanks for reaching out — we&apos;ll reply within one business
              day with next steps.
            </p>
          </div>
        ) : (
          <>
            <span className="font-[family-name:var(--font-alt)] text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-sky)]">
              Get a proposal
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
              Start your project
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Tell us a little about what you need — we&apos;ll reply within
              one business day.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-white/60">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[color:var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[color:var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/60">
                  Project type
                </label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {projectTypes.map((type, i) => (
                    <label
                      key={type}
                      className="cursor-pointer rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65 transition-colors has-[:checked]:border-[color:var(--color-primary)] has-[:checked]:bg-[color:var(--color-primary)] has-[:checked]:text-white"
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={type}
                        defaultChecked={i === 0}
                        className="sr-only"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/60">
                  A few words about your project
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="What are you looking to build?"
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[color:var(--color-primary)]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-[color:var(--color-ink)] transition-all hover:bg-[color:var(--color-sky)] disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Request a proposal"}
                {status !== "loading" && <span aria-hidden>→</span>}
              </button>
            </form>

            <p className="mt-5 border-t border-white/10 pt-4 text-center font-[family-name:var(--font-alt)] text-xs text-white/40">
              120+ projects delivered &middot; 98% client retention
            </p>
          </>
        )}
      </div>
    </div>
  );
}
