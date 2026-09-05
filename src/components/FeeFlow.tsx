/**
 * Where a trade's money actually goes, drawn.
 *
 * Each pipe is painted twice on the same path: a dim solid stroke that says the
 * route exists, and a dashed accent stroke whose offset is animated so the
 * dashes travel along it. One keyframe covers every pipe regardless of its
 * shape, because the offset moves along the path rather than across the screen.
 *
 * Strokes are flat colours, not gradients: an SVG gradient in the default
 * objectBoundingBox units refuses to render on a perfectly straight horizontal
 * or vertical line, because such a path has a zero-height bounding box — the
 * pipes here would simply vanish, and it would look like a design choice.
 *
 * Elbows are Béziers rather than right angles. A routing diagram made of square
 * corners reads as a circuit board; curves read as flow.
 */
export function FeeFlow() {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <svg
        viewBox="0 0 960 268"
        className="w-full min-w-[720px]"
        role="img"
        aria-label="A trade pays fees. One percent goes to pons; the rest reaches your vault, which pays holders and burns supply."
      >
        <defs>
          <marker
            id="flow-head"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="rgba(255,255,255,0.28)" />
          </marker>
        </defs>

        {/* Pipes, drawn before the boxes so the boxes cover their rounded ends. */}
        {PIPES.map((d, i) => (
          <g key={d}>
            <path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#flow-head)"
            />
            <path
              d={d}
              fill="none"
              stroke="#ccff00"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
              className="flow"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          </g>
        ))}

        <Node x={8} y={98} label="Every trade" sub="buy or sell" />
        <Node x={262} y={98} label="Creator fees" sub="in your pairing asset" />
        <Node x={516} y={98} label="Your vault" sub="one job, fixed" />
        <Node x={782} y={30} label="Holders" sub="staked, or held" w={170} />
        <Node x={782} y={166} label="Burned" sub="supply, retired" w={170} />
        <Node
          x={262}
          y={200}
          label="pons · 1.00%"
          sub="protocol fee"
          h={56}
          muted
        />
      </svg>
    </div>
  );
}

/* The routes, in the order the money takes them. */
const PIPES = [
  // trade → creator fees
  "M182 130 L252 130",
  // creator fees → vault
  "M436 130 L506 130",
  // the protocol's cut, leaving the first pipe
  "M217 130 C217 168 217 186 217 218 L252 218",
  // vault → holders, and vault → burn
  "M690 130 C736 130 740 62 772 62",
  "M690 130 C736 130 740 198 772 198",
];

function Node({
  x,
  y,
  label,
  sub,
  w = 174,
  h = 64,
  muted,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  w?: number;
  h?: number;
  muted?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        fill={muted ? "rgba(255,255,255,0.03)" : "rgba(27,23,16,0.96)"}
        stroke={
          muted ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.14)"
        }
      />
      <text
        x={x + 18}
        y={y + h / 2 - 2}
        fill={muted ? "#8f897c" : "#ffffff"}
        fontSize="15"
        fontWeight="500"
      >
        {label}
      </text>
      {/*
        The face is set with a class, not a fontFamily attribute: a
        presentation attribute holding `var(--font-mono)` does not resolve, and
        the label silently falls back to the sans stack — wider, and wide enough
        to run past the node it sits in.
      */}
      <text x={x + 18} y={y + h / 2 + 16} fill="#8f897c" fontSize="11" className="font-mono">
        {sub}
      </text>
    </g>
  );
}
