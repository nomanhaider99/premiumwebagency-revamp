/**
 * The nav's live indicator. It does the job the reference's "Staking Live Now"
 * pill does, but says something the site can actually stand behind — the copy
 * is passed in from the response-time promise already on the contact page,
 * never invented here.
 */
export default function StatusPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`glass-quiet inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${className}`}
    >
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span
          className="status-dot absolute inset-0 rounded-full"
          style={{ background: "var(--signal)" }}
        />
        <span
          className="absolute inset-[-3px] rounded-full opacity-40 blur-[3px]"
          style={{ background: "var(--signal)" }}
        />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
