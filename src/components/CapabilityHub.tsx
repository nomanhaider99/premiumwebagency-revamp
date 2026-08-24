import Link from "next/link";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";

/**
 * The capability hub — the signature element.
 *
 * Centre node is the agency mark; every radiating node is a real service off
 * `data/services`, so the labels are the site's own words rather than a stack
 * invented to fill the diagram. Connectors draw themselves once on load and
 * then stop; the nodes keep a small mirrored y-offset going, and that float is
 * the only continuously-looping motion anywhere on the page.
 *
 * Geometry is resolved at module scope against a 100×100 square, which is why
 * this can stay a server component — nothing here needs to measure the DOM.
 */

/** the six the hub radiates to, in the site's own service order */
const HUB_IDS = ["design", "development", "ecommerce", "seo", "ai", "support"];

const RADIUS = 37;
const ANGLES = [-90, -30, 30, 90, 150, 210];

const NODES = HUB_IDS.map((id, i) => {
  const service = services.find((s) => s.id === id);
  const rad = (ANGLES[i] * Math.PI) / 180;
  return {
    id,
    title: service?.title ?? id,
    tagline: service?.tagline ?? "",
    x: 50 + RADIUS * Math.cos(rad),
    y: 50 + RADIUS * Math.sin(rad),
    // staggered so the ring never breathes in unison
    float: 4 + (i % 3) * 2,
    dur: 3.6 + i * 0.45,
    delay: i * 0.35,
  };
});

export default function CapabilityHub({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[34rem] ${className}`}>
      <div aria-hidden className="aurora absolute inset-[12%] rounded-full" />

      {/* the connectors, plus the ring they all touch */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        role="presentation"
      >
        <defs>
          <linearGradient id="hub-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--signal)" />
            <stop offset="100%" stopColor="var(--circuit)" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--trace)"
          strokeWidth="0.4"
        />

        {NODES.map((n, i) => (
          <line
            key={n.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#hub-link)"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.65"
            style={{
              strokeDasharray: 40,
              strokeDashoffset: 40,
              animation: `hub-draw 900ms cubic-bezier(0.22,1,0.36,1) ${
                200 + i * 110
              }ms forwards`,
            }}
          />
        ))}
      </svg>

      {/* the mark at the centre */}
      <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-60 blur-xl"
          style={{
            background: "linear-gradient(140deg, var(--signal), var(--circuit))",
          }}
        />
        <span className="glass-card relative flex h-full w-full items-center justify-center rounded-full text-center">
          <span className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.16em] text-[color:var(--text)] sm:text-[11px]">
            Premium
            <br />
            Web
            <br />
            Agency
          </span>
        </span>
      </div>

      {/* the radiating services */}
      {NODES.map((n) => (
        <Link
          key={n.id}
          href={`/services/${n.id}`}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="hub-node flex flex-col items-center gap-2"
            style={
              {
                "--float": `${n.float}px`,
                "--float-dur": `${n.dur}s`,
                "--float-delay": `${n.delay}s`,
              } as React.CSSProperties
            }
          >
            <span className="relative inline-flex h-12 w-11 items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span
                aria-hidden
                className="hex-clip absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, var(--signal), var(--circuit))",
                }}
              />
              <span
                aria-hidden
                className="hex-clip absolute inset-[2px]"
                style={{ background: "var(--surface-solid)" }}
              />
              <ServiceIcon
                id={n.id}
                className="relative h-4 w-4 text-[color:var(--text)]"
                strokeWidth={1.6}
              />
            </span>
            <span className="glass-scrim rounded-full px-2 py-0.5 text-center font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-[color:var(--text)] sm:text-[10px]">
              {n.title}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
