"use client";

import { useCallback, useEffect, useRef } from "react";

export type OrbFrame = {
  /** offset from the resting spot, in px */
  x: number;
  y: number;
  /** the tilt being applied this frame, in degrees */
  rx: number;
  ry: number;
  dragging: boolean;
};

type Options = {
  /** off below the breakpoint where the ball has nowhere to sit */
  enabled?: boolean;
  /** keep it inside a region — takes and returns an offset from the resting spot */
  bounds?: (x: number, y: number) => { x: number; y: number };
  /** how far it drifts on its own, in px */
  drift?: number;
  /** seconds for one lap of that drift */
  period?: number;
  /** offset into the drift so a row of them never swings in unison */
  phase?: number;
  /** let it come to the pointer on its own, with no button held */
  follow?: boolean;
  /** how far out it notices the pointer, as a multiple of its own radius */
  magnet?: number;
  /** runs after the orb is written each frame, for anything that must track it */
  onFrame?: (f: OrbFrame) => void;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * Makes a glass orb something you can pick up — or just walk a cursor near.
 *
 * There are three states and each gets its own feel. Bring the pointer inside
 * the ball's reach and it *follows*, on a loose spring, with nothing held down;
 * take the pointer away and it eases back to where it hangs. Press, and it
 * pins *directly* to the pointer — no spring in between — so it sits under the
 * cursor exactly, at any speed. The spring only takes over again once you let
 * go, easing it from wherever you flung it to a resting spot chosen from the
 * throw. Everything three-dimensional is read back out of
 * the frame-to-frame velocity: the ball banks into its travel, the veining
 * rolls, the highlight lags the tilt, and the shadow slides the other way.
 *
 * Pointer positions are handled in client coordinates against the offset the
 * ball was grabbed at, so nothing here needs to know where its container is —
 * scrolling, resizing, or a re-laid-out parent mid-drag can't desync it.
 *
 * Writes go straight to the node. A drag never re-renders React.
 */
export function useDraggableOrb({
  enabled = true,
  bounds,
  drift = 7,
  period = 9,
  phase = 0,
  follow = true,
  magnet = 2.4,
  onFrame,
}: Options = {}) {
  const orbRef = useRef<HTMLDivElement | null>(null);

  // the loop reads these fresh every frame, so it never has to restart to pick
  // up new props — synced after commit rather than during render
  const live = useRef({ bounds, drift, period, phase, follow, magnet, onFrame });
  useEffect(() => {
    live.current = { bounds, drift, period, phase, follow, magnet, onFrame };
  });

  const m = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0, // smoothed velocity, only used to drive the tilt
    hx: 0,
    hy: 0, // where it wants to hang — moves to wherever you drop it
    tx: 0,
    ty: 0, // the pointer, while it is down
    grabX: 0,
    grabY: 0,
    spin: 0,
    t: 0,
    dragging: false,
    near: false, // the pointer is within reach, so it is trailing after it
    pointer: -1,
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const s = m.current;
      s.dragging = true;
      s.pointer = e.pointerId;
      // hold it wherever it was actually taken hold of, not by its centre
      s.grabX = e.clientX - s.x;
      s.grabY = e.clientY - s.y;
      s.tx = s.x;
      s.ty = s.y;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // capture is a nicety; the window listeners below carry the drag anyway
      }
      e.preventDefault();
    },
    [enabled]
  );

  // the drag itself lives on the window: a fast throw outruns the element, and
  // releasing the button off-target still has to end the drag
  useEffect(() => {
    if (!enabled) return;
    const s = m.current;

    const move = (e: PointerEvent) => {
      if (s.dragging) {
        if (e.pointerId !== s.pointer) return;
        s.tx = e.clientX - s.grabX;
        s.ty = e.clientY - s.grabY;
        return;
      }

      // a finger has no hover, so following would mean teleporting on touch
      if (!live.current.follow || e.pointerType === "touch") return;
      const orb = orbRef.current;
      if (!orb) return;

      // measured from where the ball actually is this frame, not from where it
      // hangs — so it can be led away and keeps answering once it has moved
      const r = orb.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = (r.width / 2) * live.current.magnet;

      s.near = Math.hypot(dx, dy) <= reach;
      if (s.near) {
        s.tx = s.x + dx;
        s.ty = s.y + dy;
      }
    };

    const up = (e: PointerEvent) => {
      if (!s.dragging || e.pointerId !== s.pointer) return;
      s.dragging = false;
      s.pointer = -1;
      // let the throw carry a little, then hang wherever it comes to rest
      const b = live.current.bounds;
      const rest = { x: s.x + s.vx * 7, y: s.y + s.vy * 7 };
      const at = b ? b(rest.x, rest.y) : rest;
      s.hx = at.x;
      s.hy = at.y;
    };

    // the pointer leaving the page never fires a move, so it has to be told
    const release = () => {
      s.near = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const orb = orbRef.current;
    if (!orb) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = m.current;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // normalised against 60fps, so the feel holds on a 120Hz panel
      const step = clamp((now - last) / 16.667, 0.2, 3);
      last = now;
      s.t += step / 60;

      const { bounds: bound, drift: amp, period: per, phase: off, onFrame: after } =
        live.current;
      const place = (x: number, y: number) => (bound ? bound(x, y) : { x, y });

      if (s.dragging) {
        // pinned to the pointer: whatever it did this frame, the ball did too
        const at = place(s.tx, s.ty);
        const dx = (at.x - s.x) / step;
        const dy = (at.y - s.y) / step;
        s.x = at.x;
        s.y = at.y;
        // smoothed, so the tilt reads as momentum instead of jitter
        s.vx += (dx - s.vx) * 0.25 * step;
        s.vy += (dy - s.vy) * 0.25 * step;
      } else if (s.near) {
        // trailing the pointer: stiff enough to keep up, loose enough that the
        // lag is legible as weight rather than reading as a stuck cursor
        const at = place(s.tx, s.ty);
        s.vx = (s.vx + (at.x - s.x) * 0.17 * step) * Math.pow(0.76, step);
        s.vy = (s.vy + (at.y - s.y) * 0.17 * step) * Math.pow(0.76, step);
        s.x += s.vx * step;
        s.y += s.vy * step;
      } else {
        const w = (Math.PI * 2) / Math.max(per, 0.001);
        const bobX = calm ? 0 : Math.sin((s.t + off) * w * 0.7) * amp * 0.5;
        const bobY = calm ? 0 : Math.sin((s.t + off) * w) * amp;
        const at = place(s.hx + bobX, s.hy + bobY);
        // a soft spring home, so a throw glides to a stop rather than snapping
        s.vx = (s.vx + (at.x - s.x) * 0.06 * step) * Math.pow(0.9, step);
        s.vy = (s.vy + (at.y - s.y) * 0.06 * step) * Math.pow(0.9, step);
        s.x += s.vx * step;
        s.y += s.vy * step;
      }

      const swayX = calm ? 0 : Math.sin((s.t + off) * 0.47) * 4.5;
      const swayY = calm ? 0 : Math.cos((s.t + off) * 0.39) * 5;
      const ry = clamp(s.vx * 1.1, -18, 18) + swayY;
      const rx = clamp(-s.vy * 1.1, -18, 18) + swayX;
      const pop = s.dragging
        ? 1.06
        : (s.near ? 1.02 : 1) + Math.min(Math.hypot(s.vx, s.vy) * 0.004, 0.03);
      s.spin += s.vx * 0.5 * step + (calm ? 0 : 0.06 * step);

      orb.style.transform =
        `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) ` +
        `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${pop.toFixed(3)})`;
      // the light stays put while the glass turns underneath it
      orb.style.setProperty("--orb-hl-x", `${(-ry * 0.5).toFixed(2)}%`);
      orb.style.setProperty("--orb-hl-y", `${(rx * 0.5).toFixed(2)}%`);
      orb.style.setProperty("--orb-spin", `${s.spin.toFixed(2)}deg`);
      orb.style.filter =
        `drop-shadow(${(-ry * 0.55).toFixed(1)}px ` +
        `${(26 + clamp(-s.y * 0.25, -14, 18)).toFixed(1)}px ` +
        `${(28 + Math.abs(s.y) * 0.06).toFixed(1)}px rgba(15,30,60,0.16))`;

      after?.({ x: s.x, y: s.y, rx, ry, dragging: s.dragging });
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  return { orbRef, onPointerDown };
}
