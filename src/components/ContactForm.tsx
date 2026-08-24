"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const budgets = ["$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+"];

const FIELD =
  "mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-deep)] px-4 py-3 text-[14px] text-[color:var(--text)] outline-none transition-colors placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--signal)]";
const LABEL =
  "font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const still = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={still ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="py-10 text-center"
      >
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[#04100c]"
          style={{
            background:
              "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
          }}
        >
          <Check className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <h3 className="mt-6 text-[1.25rem]">Message sent.</h3>
        <p className="mt-2 text-[13px]">
          Thanks for reaching out — we&apos;ll reply within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            placeholder="Jane Doe"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            name="email"
            placeholder="jane@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={LABEL}>
          Company
        </label>
        <input
          id="company"
          type="text"
          name="company"
          placeholder="Company name"
          className={FIELD}
        />
      </div>

      <fieldset>
        <legend className={LABEL}>Project budget</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label
              key={b}
              className="glass-quiet cursor-pointer rounded-full px-4 py-2 text-[12px] text-[color:var(--text-muted)] transition-colors has-[:checked]:text-[#04100c] has-[:checked]:[background:linear-gradient(100deg,var(--signal),color-mix(in_srgb,var(--circuit)_55%,var(--signal)))]"
            >
              <input type="radio" name="budget" value={b} className="sr-only" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={LABEL}>
          Tell us about your project
        </label>
        <textarea
          id="message"
          required
          name="message"
          rows={5}
          placeholder="What are you looking to build?"
          className={`${FIELD} resize-none`}
        />
      </div>

      <div className="pt-1">
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={still ? undefined : { scale: 1.03 }}
          whileTap={still ? undefined : { scale: 0.985 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="inline-flex h-11 items-center justify-center rounded-full px-6 text-[13px] font-medium text-[#04100c] shadow-[0_6px_24px_var(--glow)] transition-shadow duration-300 hover:shadow-[0_10px_34px_color-mix(in_srgb,var(--signal)_38%,transparent)] disabled:opacity-60"
          style={{
            background:
              "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
          }}
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </motion.button>
      </div>
    </form>
  );
}
