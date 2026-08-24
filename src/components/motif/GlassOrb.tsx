import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type GlassOrbProps = {
  /** what sits *inside* the glass — usually the magnified lens copy */
  children?: React.ReactNode;
  /** 0 = clear bubble, 1 = milky cast-glass ball */
  frost?: number;
  /** let the ball be grabbed and thrown around */
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Pick<React.HTMLAttributes<HTMLDivElement>, "onPointerDown">;

/**
 * A blown-glass sphere.
 *
 * Real glass reads from four things stacked in this order: what you can see
 * through it (blurred by the body), a milky cast, the light caught on the
 * near surface, and the dark ring where the far wall turns away from you.
 * Getting the order right is what separates this from a blurred circle.
 *
 * The three custom properties below are what a caller animates to spin it:
 * `--orb-hl-x` / `--orb-hl-y` slide the specular highlight against the tilt
 * (light stays put while the ball turns under it), and `--orb-spin` rolls the
 * veining so the body reads as a solid volume rotating rather than a decal.
 */
const GlassOrb = forwardRef<HTMLDivElement, GlassOrbProps>(function GlassOrb(
  { children, frost = 1, interactive = false, className = "", style, onPointerDown },
  ref
) {
  const milk = 0.06 + frost * 0.16;

  return (
    <div
      aria-hidden
      ref={ref}
      onPointerDown={onPointerDown}
      className={cn(
        "glass-orb absolute isolate rounded-full",
        interactive
          ? "pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing"
          : "pointer-events-none",
        className
      )}
      style={{
        // the ball's own weight on whatever it is resting over
        filter: "drop-shadow(0 18px 30px var(--glow))",
        willChange: interactive ? "transform" : undefined,
        ...style,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full">
        {/* 1 — the body: everything behind goes soft and picks up saturation */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backdropFilter: `blur(${6 + frost * 8}px) saturate(1.35) brightness(1.06)`,
            WebkitBackdropFilter: `blur(${6 + frost * 8}px) saturate(1.35) brightness(1.06)`,
          }}
        />

        {/* 2 — the milky cast the glass itself adds */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(120% 120% at calc(30% + var(--orb-hl-x, 0%)) calc(24% + var(--orb-hl-y, 0%)), color-mix(in srgb, var(--signal) ${
              (milk + 0.16) * 100
            }%, transparent) 0%, color-mix(in srgb, var(--circuit) ${
              milk * 100
            }%, transparent) 52%, color-mix(in srgb, var(--circuit) ${
              (milk + 0.1) * 100
            }%, transparent) 100%)`,
          }}
        />

        {/* 3 — what the lens carries */}
        {children}

        {/* 4 — the veining, rolling with the body so the ball has volume */}
        <div
          className="absolute inset-[-25%]"
          style={{
            opacity: 0.5 * frost,
            transform: "rotate(var(--orb-spin, 0deg))",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='v'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='4' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23v)'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            mixBlendMode: "overlay",
          }}
        />

        {/* 5 — the light caught on the near surface */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(38% 30% at calc(27% + var(--orb-hl-x, 0%)) calc(21% + var(--orb-hl-y, 0%)), rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)," +
              "radial-gradient(20% 14% at calc(68% + var(--orb-hl-x, 0%) * 0.6) calc(84% + var(--orb-hl-y, 0%) * 0.6), color-mix(in srgb, var(--signal) 45%, transparent) 0%, transparent 72%)",
          }}
        />

        {/* 6 — the far wall turning away, and the wet rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px var(--border-strong)," +
              "inset 10px 12px 26px color-mix(in srgb, var(--signal) 12%, transparent)," +
              "inset -14px -18px 34px color-mix(in srgb, var(--circuit) 22%, transparent)," +
              "inset -2px -3px 3px color-mix(in srgb, var(--signal) 20%, transparent)",
          }}
        />
      </div>
    </div>
  );
});

export default GlassOrb;
