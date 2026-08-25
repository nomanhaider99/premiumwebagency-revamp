"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type BlobCursorProps = {
  /** diameter of the glass ball */
  size?: number;
  /** how many blobs make up the liquid trail behind it */
  trailCount?: number;
  trailSizes?: number[];
  /**
   * How hard each element resists the pointer, as the fraction of the gap it
   * keeps per second. Smaller catches up faster; the ball leads and the trail
   * lags progressively, which is what smears it into a tail.
   */
  followBases?: number[];
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  zIndex?: number;
};

/**
 * React Bits' Blob Cursor, restyled as the smoky glass ball from the
 * reference and given jelly physics.
 *
 * The mechanism is React Bits': a short trail of blobs chases the pointer at
 * staggered speeds through one SVG goo filter — a heavy blur followed by a
 * colour matrix that hard-thresholds alpha, fusing them into a metaball.
 * Departures from the original: it listens on the window and sits fixed over
 * the viewport (theirs is a demo box that only tracks inside its own bounds),
 * and the follow runs on one rAF loop instead of firing a fresh GSAP tween per
 * element per pointermove. That loop is also what makes the jelly possible —
 * a tween knows where it is going but not how fast it is travelling, and speed
 * is the whole input to the deformation.
 *
 * Jelly is two things working together:
 *
 *   Squash and stretch — the body lengthens along its direction of travel and
 *   narrows across it, in proportion to speed. It rotates into the heading,
 *   scales, then rotates back, so the stretch follows the movement rather than
 *   the element's own axes. That is what sells mass.
 *
 *   Wobble — the blown outline oscillates around its rest shape on a decaying
 *   sine, kicked by how hard the ball is moving, so it keeps jiggling for a
 *   moment after the pointer stops instead of snapping rigid.
 *
 * The deformation lives on its own wrapper, never on the node carrying the
 * position, so the two transforms cannot fight.
 */

const REST_RADIUS = "49% 51% 48% 52% / 52% 48% 52% 48%";

/**
 * What the ball must never sit on top of: anything you read or click.
 *
 * Interactive things are matched by selector, prose by asking whether the
 * hovered element holds text of its own — that catches headings, paragraphs,
 * list items and labels without naming every tag, and leaves the empty
 * canvas the effect actually lives on untouched.
 */
const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, summary, label, [contenteditable]";

function holdsText(el: Element): boolean {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === 3 && node.textContent && node.textContent.trim()) {
      return true;
    }
  }
  return false;
}

function shouldClear(el: Element | null): boolean {
  if (!el) return false;
  return Boolean(el.closest(INTERACTIVE)) || holdsText(el);
}

/** the marbling inside the body, and the cloudier band around the rim */
const MARBLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='5' seed='9'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E\")";

export default function BlobCursor({
  size = 250,
  trailCount = 3,
  trailSizes = [120, 92, 68],
  followBases = [0.0009, 0.02, 0.08, 0.2],
  filterId = "blob",
  filterStdDeviation = 26,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 32 -9",
  zIndex = 100,
}: BlobCursorProps) {
  const ballRef = useRef<HTMLDivElement | null>(null);
  const jellyRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<Array<HTMLDivElement | null>>([]);
  const trailWrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ball = ballRef.current;
    const jellyEl = jellyRef.current;
    const blob = blobRef.current;
    const trailWrap = trailWrapRef.current;
    if (!ball || !jellyEl || !blob || !trailWrap) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    /** index 0 is the ball; the rest are the trail, in order */
    const nodes = [ball, ...trailRef.current.filter(Boolean)] as HTMLDivElement[];
    const pos = nodes.map(() => ({ ...target }));

    let seen = false;
    let alpha = 0;
    // the jelly's own state
    let vx = 0;
    let vy = 0;
    let wob = 0;
    let phase = 0;
    let idle = false;
    // how far the glass has cleared out of the way of whatever is under it
    let clarity = 0;
    let clarityTarget = 0;
    let wrote = -1;

    const onMove = (e: PointerEvent) => {
      if (!seen) {
        // first sighting: drop it straight onto the pointer, don't fly in
        seen = true;
        pos.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      target.x = e.clientX;
      target.y = e.clientY;
      // the overlay is pointer-events-none, so this is the real element under
      // the cursor rather than the ball itself
      clarityTarget = shouldClear(e.target as Element | null) ? 1 : 0;
    };
    const onLeave = () => {
      seen = false;
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // clamped so a backgrounded tab doesn't snap it across the page
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      alpha += ((seen ? 1 : 0) - alpha) * (1 - Math.pow(0.001, dt));

      nodes.forEach((node, i) => {
        const p = pos[i];
        const base = followBases[Math.min(i, followBases.length - 1)];
        const k = 1 - Math.pow(base, dt);
        const dx = (target.x - p.x) * k;
        const dy = (target.y - p.y) * k;
        p.x += dx;
        p.y += dy;

        node.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(
          1
        )}px, 0)`;

        if (i === 0) {
          // px/sec, smoothed — raw per-frame deltas read as flicker. The
          // smoothing is time-based like everything else here, so the jelly
          // settles in the same wall-clock time on a 120Hz panel as on 60.
          const sx = dx / Math.max(dt, 0.001);
          const sy = dy / Math.max(dt, 0.001);
          const vk = 1 - Math.pow(1e-8, dt);
          vx += (sx - vx) * vk;
          vy += (sy - vy) * vk;
        }
      });

      ball.style.opacity = alpha.toFixed(3);

      /* Glass is lovely over an empty canvas and a liability over a sentence.
         Rather than thinning the effect everywhere, the ball clears where it
         would be read through: the blur and the contrast lift come off, the
         skin drops to a ghost, and the trail gets out of the way entirely.
         Eased over ~120ms so it reads as glass thinning, not as a flicker. */
      clarity += (clarityTarget - clarity) * (1 - Math.pow(0.0001, dt));
      // an ease only approaches its target; snapping the last hundredth is what
      // lets the filter actually reach `none` instead of parking at 0.03px
      if (Math.abs(clarityTarget - clarity) < 0.01) clarity = clarityTarget;

      // a backdrop-filter write costs a re-filter of everything behind it, so
      // it only happens when the value has actually moved
      if (Math.abs(clarity - wrote) > 0.01) {
        wrote = clarity;
        const solid = 1 - clarity;
        const filter =
          clarity > 0.99
            ? "none"
            : `blur(${(2.4 * solid).toFixed(2)}px) contrast(${(
                1 + 0.35 * solid
              ).toFixed(3)}) saturate(${(0.92 + 0.08 * clarity).toFixed(3)})`;

        blob.style.backdropFilter = filter;
        // Safari still needs the prefix, and it is not in the CSSOM types
        blob.style.setProperty("-webkit-backdrop-filter", filter);
        // the body, marbling, rim and inclusion all hang off this
        blob.style.setProperty("--blob-skin", (1 - 0.8 * clarity).toFixed(3));
        trailWrap.style.opacity = solid.toFixed(3);
      }

      const speed = Math.hypot(vx, vy);
      const stretch = 1 + Math.min(speed * 0.00013, 0.22);
      const squash = 1 - Math.min(speed * 0.0001, 0.16);
      const angle = speed > 24 ? (Math.atan2(vy, vx) * 180) / Math.PI : 0;

      jellyEl.style.transform =
        `rotate(${angle.toFixed(2)}deg) ` +
        `scale(${stretch.toFixed(3)}, ${squash.toFixed(3)}) ` +
        `rotate(${(-angle).toFixed(2)}deg)`;

      wob = Math.max(wob * Math.pow(0.06, dt), Math.min(speed * 0.007, 14));
      phase += dt * 21;

      // The blob carries the backdrop-filter, so every border-radius write
      // makes the browser re-filter what is behind it. Once the wobble has
      // died down, park it at rest and stop writing.
      if (wob < 0.15) {
        if (!idle) {
          blob.style.borderRadius = REST_RADIUS;
          idle = true;
        }
      } else {
        idle = false;
        const a = Math.sin(phase) * wob;
        const b = Math.cos(phase * 0.87) * wob;
        blob.style.borderRadius =
          `${(49 + a).toFixed(1)}% ${(51 - a).toFixed(1)}% ` +
          `${(48 + b).toFixed(1)}% ${(52 - b).toFixed(1)}% / ` +
          `${(52 + b).toFixed(1)}% ${(48 - b).toFixed(1)}% ` +
          `${(52 + a).toFixed(1)}% ${(48 - a).toFixed(1)}%`;
      }
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, followBases]);

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
          {/* The goo step multiplies alpha to fuse the blobs, which also drives
              anything translucent to fully opaque — so the transparency has to
              be put back after the threshold, not set on the blobs. */}
          <feColorMatrix
            in="goo"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
          />
        </filter>
      </svg>

      {/* the liquid trail: it only really shows while the pointer is moving,
          and collapses under the ball the moment it stops */}
      <div
        ref={trailWrapRef}
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
        className="absolute opacity-0 will-change-transform"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
      >
        {/* the jelly: squash-and-stretch lives here rather than on the node
            carrying the position, so the two transforms never fight */}
        <div
          ref={jellyRef}
          className="h-full w-full will-change-transform"
        >
          <div
            ref={blobRef}
            className="relative h-full w-full overflow-hidden"
            style={{
              // blown glass is never truly round; the wobble is what stops this
              // reading as a CSS circle laid over the page
              borderRadius: REST_RADIUS,
              // contrast is what builds the body: it deepens the dark ground
              // into the ball while leaving bright type punching through white
              backdropFilter: "blur(2.4px) contrast(1.35) saturate(0.92)",
              WebkitBackdropFilter: "blur(2.4px) contrast(1.35) saturate(0.92)",
            }}
          >
            {/* the body: barely lighter than the page at the centre, lifting to
                a cloudier halo at the rim, which is how the reference reads */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "inherit",
                // every skin layer rides `--blob-skin`, which the loop drops
                // to a ghost wherever the ball is covering something readable
                opacity: "var(--blob-skin, 1)",
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--text) 0.8%, transparent) 0%, color-mix(in srgb, var(--text) 1.2%, transparent) 55%, color-mix(in srgb, var(--text) 9%, transparent) 92%, color-mix(in srgb, var(--text) 5%, transparent) 100%)",
              }}
            />

            {/* the marbling rolling through the glass */}
            <div
              className="absolute inset-[-18%] mix-blend-overlay"
              style={{
                opacity: "calc(0.13 * var(--blob-skin, 1))",
                backgroundImage: MARBLE,
                backgroundSize: "cover",
              }}
            />

            {/* the far wall turning away, and the faint wet edge */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "inherit",
                opacity: "var(--blob-skin, 1)",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in srgb, var(--text) 10%, transparent)," +
                  "inset 10px 14px 34px color-mix(in srgb, var(--text) 7%, transparent)," +
                  "inset -14px -18px 40px color-mix(in srgb, var(--text) 5%, transparent)",
              }}
            />

            {/* the two-tone inclusion sitting at the centre of the reference */}
            <span
              className="absolute left-1/2 top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                opacity: "var(--blob-skin, 1)",
                background:
                  "linear-gradient(180deg, #6d1f22 0%, #6d1f22 48%, #4fb3ad 52%, #4fb3ad 100%)",
                boxShadow: "0 0 6px rgba(0,0,0,0.55)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
