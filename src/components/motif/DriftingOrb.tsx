"use client";

import { useCallback } from "react";
import GlassOrb from "@/components/motif/GlassOrb";
import { useDraggableOrb } from "@/lib/use-draggable-orb";

type DriftingOrbProps = {
  /** 0 = clear bubble, 1 = milky cast-glass ball */
  frost?: number;
  /** where it hangs, and how big — the orb keeps its own transform */
  className?: string;
  /** seconds for one lap of the idle drift */
  period?: number;
  /** offset into that drift so a skyful of them never swings in unison */
  phase?: number;
  /** how far it wanders on its own, in px */
  drift?: number;
  /** how far it can be carried from where it hangs, in px */
  reachX?: number;
  reachY?: number;
  /** a mark suspended in the glass — sits under the cast and the highlight */
  children?: React.ReactNode;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * One of the loose bubbles in the sky. Same glass as the lens on the wordmark,
 * and it answers to the pointer the same way — the drift is only what it does
 * while nobody is holding it.
 */
export default function DriftingOrb({
  frost,
  className,
  period = 11,
  phase = 0,
  drift = 10,
  reachX = 360,
  reachY = 260,
  children,
}: DriftingOrbProps) {
  const bounds = useCallback(
    (x: number, y: number) => ({
      x: clamp(x, -reachX, reachX),
      y: clamp(y, -reachY, reachY),
    }),
    [reachX, reachY]
  );

  const { orbRef, onPointerDown } = useDraggableOrb({
    bounds,
    drift,
    period,
    phase,
    // the bubble cursor already trails the pointer; five things converging on
    // it at once reads as noise rather than as one deliberate effect
    follow: false,
  });

  return (
    <GlassOrb
      ref={orbRef}
      interactive
      frost={frost}
      className={className}
      onPointerDown={onPointerDown}
    >
      {children ? (
        <div className="absolute inset-0 grid place-items-center [&>svg]:h-[38%] [&>svg]:w-[38%]">
          {children}
        </div>
      ) : null}
    </GlassOrb>
  );
}
