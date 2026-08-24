import Reveal from "@/components/motion/Reveal";

type SectionHeadingProps = {
  /** the mono eyebrow above the headline */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** a trailing action that sits opposite the heading */
  action?: React.ReactNode;
  className?: string;
};

/**
 * Eyebrow in mono, headline in Geist, optional standfirst. The gradient is
 * applied by the caller to the emphasis phrase only — running a gradient
 * across a whole headline is what makes a page read as a template.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className = "",
}: SectionHeadingProps) {
  const centred = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centred
          ? "items-center text-center"
          : action
            ? "md:flex-row md:items-end md:justify-between"
            : ""
      } ${className}`}
    >
      <Reveal className={centred ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-4 text-[1.9rem] leading-[1.12] text-balance sm:text-[2.4rem] lg:text-[2.8rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-[14px] leading-relaxed lg:text-[15px]">
            {description}
          </p>
        )}
      </Reveal>

      {action && (
        <Reveal delay={0.08} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
