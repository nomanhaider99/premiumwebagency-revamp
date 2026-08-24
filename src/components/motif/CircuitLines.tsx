/**
 * The circuit traces that sit behind the hero and the footer.
 *
 * Two layers: a static lattice at trace weight, and a handful of the same
 * paths redrawn with a short dash on a long gap. The dash offset drifts, so
 * what you see is a pulse travelling the line — data moving through a board
 * rather than a wallpaper of wires. Everything is deterministic; nothing here
 * needs to be measured or randomised at runtime.
 */

const PATHS = [
  "M0 88 H180 a12 12 0 0 0 12-12 V34 a12 12 0 0 1 12-12 H420",
  "M0 176 H96 a12 12 0 0 1 12 12 V246 a12 12 0 0 0 12 12 H360 a12 12 0 0 0 12-12 V150",
  "M1440 66 H1240 a12 12 0 0 1-12 12 V140 a12 12 0 0 1-12 12 H1010",
  "M1440 214 H1320 a12 12 0 0 0-12-12 V120 a12 12 0 0 0-12-12 H1120",
  "M300 400 H520 a12 12 0 0 0 12-12 V300 a12 12 0 0 1 12-12 H760",
  "M1140 392 H940 a12 12 0 0 1-12-12 V286 a12 12 0 0 0-12-12 H700",
  "M0 330 H60 a12 12 0 0 1 12 12 V420",
  "M1440 340 H1380 a12 12 0 0 0-12 12 V430",
];

/** where the traces terminate — a small pad, like a via on a board */
const PADS = [
  [420, 22],
  [360, 150],
  [1010, 152],
  [1120, 108],
  [760, 288],
  [700, 274],
  [72, 420],
  [1368, 430],
] as const;

export default function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 440"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      role="presentation"
    >
      <defs>
        <linearGradient id="circuit-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--circuit)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g>
        {PATHS.map((d, i) => (
          <path key={i} d={d} className="circuit-trace" />
        ))}
      </g>

      <g>
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            className="circuit-flow"
            style={{ animationDelay: `${i * 1.7}s` }}
          />
        ))}
      </g>

      <g fill="var(--trace)">
        {PADS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>
    </svg>
  );
}
