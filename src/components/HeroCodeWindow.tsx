"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Token = { text: string; cls?: string };

const kw = "text-[color:var(--color-primary)]";
const tag = "text-[color:var(--color-sky)]";
const str = "text-[color:var(--color-sky)]";
const dim = "text-white/35";
const comment = "text-white/30 italic";

const CODE_LINES: Token[][] = [
  [{ text: "// crafted for brands that lead", cls: comment }],
  [
    { text: "export", cls: kw },
    { text: " default ", cls: kw },
    { text: "function", cls: kw },
    { text: " Studio() {", cls: dim },
  ],
  [
    { text: "  const", cls: kw },
    { text: " [live, ship] ", cls: undefined },
    { text: "=", cls: dim },
    { text: " useState(", cls: undefined },
    { text: "true", cls: kw },
    { text: ");", cls: dim },
  ],
  [],
  [{ text: "  return (", cls: dim }],
  [
    { text: "    <", cls: dim },
    { text: "Website", cls: tag },
  ],
  [
    { text: "      design=", cls: undefined },
    { text: '"premium"', cls: str },
  ],
  [
    { text: "      performance=", cls: undefined },
    { text: "{99}", cls: str },
  ],
  [{ text: "      seo", cls: undefined }],
  [{ text: "    />", cls: dim }],
  [{ text: "  );", cls: dim }],
  [{ text: "}", cls: dim }],
];

const CURSOR_LINE = 8;

export default function HeroCodeWindow({ className = "" }: { className?: string }) {
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.9, rotateX: 10, rotateY: -16 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 6,
        rotateY: -10,
        duration: 1.4,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));

      gsap.to(el, {
        rotateY: 6 - nx * 16,
        rotateX: -6 + ny * 12,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div className={`${className} [perspective:1400px]`} aria-hidden="true">
      <div className="relative animate-[var(--animate-float)]">
        <div
          className="pointer-events-none absolute -inset-10 rounded-[2.5rem] opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />

        <div
          ref={windowRef}
          className="relative w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl [transform-style:preserve-3d] lg:w-[460px]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-primary)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-sky)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 font-mono text-xs text-white/40">studio.tsx</span>
          </div>

          <div className="flex gap-4 px-5 py-5 font-mono text-[13px] leading-[1.7]">
            <div className="select-none text-right text-white/20">
              {CODE_LINES.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="flex-1">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {line.length === 0 ? (
                    " "
                  ) : (
                    <>
                      {line.map((token, j) => (
                        <span key={j} className={token.cls}>
                          {token.text}
                        </span>
                      ))}
                      {i === CURSOR_LINE && (
                        <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-[color:var(--color-primary)]" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
