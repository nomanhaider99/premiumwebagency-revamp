"use client";

import { useCallback, useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type BlobCursorProps = {
  /** diameter of the glass ball */
  size?: number;
  /** how many blobs make up the liquid trail behind it */
  trailCount?: number;
  trailSizes?: number[];
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  fastDuration?: number;
  slowDuration?: number;
  zIndex?: number;
};

/**
 * React Bits' Blob Cursor, restyled as the smoky glass ball from the
 * reference.
 *
 * The mechanism is React Bits': a short trail of blobs chases the pointer at
 * staggered speeds through one SVG goo filter — a heavy blur followed by a
 * colour matrix that hard-thresholds alpha, fusing them into a metaball. Two
 * departures from the original: it listens on the window and sits fixed over
 * the viewport (theirs is a demo box that only tracks inside its own bounds),
 * and the tweens run on framer-motion's imperative `animate` rather than GSAP,
 * which this project no longer depends on.
 *
 * The look comes from the reference image, which is a near-black ball only a
 * shade lighter than the page, with a brighter marbled halo at the rim and an
 * organic, slightly wobbly edge — glass, not a tinted disc.
 *
 * The one thing CSS cannot reproduce is the magnification. The reference is a
 * rendered 3D ball refracting a texture, so the letters behind it are visibly
 * enlarged; there is no way to scale an arbitrary backdrop under a free-moving
 * cursor. What stands in for it is a contrast lift — which deepens the dark
 * ground into the body of the ball while leaving bright type punching through
 * white, exactly as it does in the reference — plus a slight blur for the soft,
 * liquid edge the letters take on inside.
 */

/** GSAP's `power3.out` and `power1.out`, as cubic-beziers */
const FAST_EASE = [0.215, 0.61, 0.355, 1] as const;
const SLOW_EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** the marbling inside the body, and the cloudier band around the rim */
const MARBLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='5' seed='9'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E\")";

export default function BlobCursor({
  size = 250,
  trailCount = 3,
  trailSizes = [120, 92, 68],
  filterId = "blob",
  filterStdDeviation = 26,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 32 -9",
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 100,
}: BlobCursorProps) {
  const ballRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = usePrefersReducedMotion();

  const handleMove = useCallback(
    (x: number, y: number) => {
      const drive = (el: HTMLDivElement | null, i: number) => {
        if (!el) return;
        const isLead = i === 0;
        animate(
          el,
          { x, y },
          {
            duration: isLead ? fastDuration : slowDuration,
            ease: isLead ? [...FAST_EASE] : [...SLOW_EASE],
          }
        );
      };
      drive(ballRef.current, 0);
      trailRef.current.forEach((el, i) => drive(el, i + 1));
    },
    [fastDuration, slowDuration]
  );

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onPointer = (e: PointerEvent) => handleMove(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, [handleMove, reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 hidden select-none [@media(pointer:fine)]:block"
      style={{ zIndex }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id={filterId}>
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation={filterStdDeviation}
          />
          <feColorMatrix in="blur" values={filterColorMatrixValues} result="goo" />
          {/* the trail is only a faint smear of the same glass, so its alpha
              comes back down after the threshold that fused it */}
          <feColorMatrix
            in="goo"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
          />
        </filter>
      </svg>

      {/* the liquid trail: it only really shows while the pointer is moving,
          and collapses under the ball the moment it stops */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ filter: `url(#${filterId})` }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              trailRef.current[i] = el;
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              width: trailSizes[i],
              height: trailSizes[i],
              marginLeft: -trailSizes[i] / 2,
              marginTop: -trailSizes[i] / 2,
              background: "color-mix(in srgb, var(--text) 5%, transparent)",
            }}
          />
        ))}
      </div>

      {/* the ball itself, outside the goo — a `filter` on an ancestor makes it
          the backdrop root, and a `backdrop-filter` beneath one samples an
          empty backdrop and shows nothing */}
      <div
        ref={ballRef}
        className="absolute will-change-transform"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            // blown glass is never truly round; the wobble is what stops this
            // reading as a CSS circle laid over the page
            borderRadius: "49% 51% 48% 52% / 52% 48% 52% 48%",
            // contrast is what builds the body: it deepens the dark ground into
            // the ball while leaving bright type punching through white
            backdropFilter: "blur(2.4px) contrast(1.35) saturate(0.92)",
            WebkitBackdropFilter: "blur(2.4px) contrast(1.35) saturate(0.92)",
          }}
        >
          {/* the body: barely lighter than the page at the centre, lifting to a
              cloudier halo at the rim, which is how the reference reads */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "inherit",
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--text) 0.8%, transparent) 0%, color-mix(in srgb, var(--text) 1.2%, transparent) 55%, color-mix(in srgb, var(--text) 9%, transparent) 92%, color-mix(in srgb, var(--text) 5%, transparent) 100%)",
            }}
          />

          {/* the marbling rolling through the glass */}
          <div
            className="absolute inset-[-18%] mix-blend-overlay"
            style={{
              opacity: 0.13,
              backgroundImage: MARBLE,
              backgroundSize: "cover",
            }}
          />

          {/* the far wall turning away, and the faint wet edge */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "inherit",
              boxShadow:
                "inset 0 0 0 1px color-mix(in srgb, var(--text) 10%, transparent)," +
                "inset 10px 14px 34px color-mix(in srgb, var(--text) 7%, transparent)," +
                "inset -14px -18px 40px color-mix(in srgb, var(--text) 5%, transparent)",
            }}
          />

          {/* the two-tone inclusion sitting at the centre of the reference ball */}
          <span
            className="absolute left-1/2 top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #6d1f22 0%, #6d1f22 48%, #4fb3ad 52%, #4fb3ad 100%)",
              boxShadow: "0 0 6px rgba(0,0,0,0.55)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
