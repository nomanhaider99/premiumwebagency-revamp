type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-[var(--animate-marquee)]">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-3 whitespace-nowrap font-[family-name:var(--font-display)] text-3xl font-semibold text-white/15 lg:text-5xl"
          >
            {item}
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-primary)]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
