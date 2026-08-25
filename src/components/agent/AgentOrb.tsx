"use client";

import { cn } from "@/lib/utils";

/**
 * The agent's face: a teal→violet core inside a glass shell, with a halo that
 * breathes and a ring that only spins while it is thinking.
 *
 * It is the one thing that appears in the hero trigger, the dialog header, and
 * beside every reply — so it carries the whole feature's identity, and it is
 * built from the same two accent tokens as everything else rather than a new
 * colour of its own.
 */
export default function AgentOrb({
  size = 40,
  thinking = false,
  className,
}: {
  size?: number;
  /** spins the outer ring and brightens the core */
  thinking?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* the halo it sheds onto whatever it sits on */}
      <span
        className="agent-orb-halo absolute inset-[-22%] rounded-full opacity-55 blur-[8px]"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, var(--signal), color-mix(in srgb, var(--circuit) 70%, transparent) 62%, transparent 74%)",
        }}
      />

      {/* the lit rim — a gradient disc showing through as a 1.5px edge */}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          thinking && "agent-orb-spin"
        )}
        style={{
          background:
            "conic-gradient(from 140deg, var(--signal), var(--circuit), var(--signal))",
        }}
      />
      <span
        className="absolute inset-[1.5px] rounded-full"
        style={{ background: "var(--surface-solid)" }}
      />

      {/* the core: a small nucleus that pulses like a carrier signal */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="agent-orb-core rounded-full"
          style={{
            width: size * 0.42,
            height: size * 0.42,
            background:
              "radial-gradient(circle at 32% 28%, color-mix(in srgb, #fff 70%, var(--signal)), var(--signal) 42%, var(--circuit) 100%)",
            boxShadow: "0 0 12px var(--glow)",
            animationDuration: thinking ? "900ms" : "2.6s",
          }}
        />
      </span>

      {/* the specular catch, so the shell reads as glass and not a flat disc */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(34% 26% at 30% 22%, rgba(255,255,255,0.5), transparent 70%)",
        }}
      />
    </span>
  );
}
