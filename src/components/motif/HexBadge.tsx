import { cn } from "@/lib/utils";

type HexBadgeProps = {
  label: string;
  icon?: React.ReactNode;
  /** the hex alone, no label — used as the frame in the capability hub */
  compact?: boolean;
  className?: string;
};

/**
 * Glass hexagon + icon + label. Every tech-stack and service chip on the site
 * is cut from this rather than a plain pill — the hex is what keeps a row of
 * labels reading as a board of components instead of tags.
 *
 * The gradient sits on a slightly larger hexagon behind the glass one, so the
 * edge reads as a lit rim rather than a border; `clip-path` gives no border of
 * its own to colour.
 */
export default function HexBadge({
  label,
  icon,
  compact = false,
  className,
}: HexBadgeProps) {
  const hex = (
    <span className="relative inline-flex h-9 w-8 shrink-0 items-center justify-center">
      <span
        aria-hidden
        className="hex-clip absolute inset-0 opacity-70"
        style={{
          background: "linear-gradient(140deg, var(--signal), var(--circuit))",
        }}
      />
      <span
        aria-hidden
        className="hex-clip absolute inset-[1.5px]"
        style={{ background: "var(--surface-solid)" }}
      />
      <span className="relative text-[color:var(--text)] [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
    </span>
  );

  if (compact) return <span className={className}>{hex}</span>;

  return (
    <span
      className={cn(
        "glass-quiet inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4",
        className
      )}
    >
      {hex}
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
        {label}
      </span>
    </span>
  );
}
