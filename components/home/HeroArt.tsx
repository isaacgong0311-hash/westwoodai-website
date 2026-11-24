import Link from "next/link";
import { classificationPoints, createNetwork, evaluate, predict, seededRandom, trainStep } from "@/lib/ml";

// The homepage artwork is a real result: a small neural network trained on
// the server (same code as the Playground) to separate two half-moons. It's
// computed once per server process, so it costs a few milliseconds.
const GRID = 40;
const BINS = 7;
const points = classificationPoints("moons", 21, 90);
const net = (() => {
  let n = createNetwork(6, seededRandom(8));
  for (let i = 0; i < 1800; i++) n = trainStep(n, points, 1.2);
  return n;
})();
const accuracy = evaluate(net, points).accuracy;

// Run-length encode each row by confidence bin so the SVG stays small. The
// cells run a few past each edge so the blur below doesn't fade the border.
const BLEED = 3;
const cells: { x: number; y: number; w: number; bin: number }[] = [];
for (let row = -BLEED; row < GRID + BLEED; row++) {
  let start = -BLEED;
  let current = -1;
  for (let col = -BLEED; col <= GRID + BLEED; col++) {
    const bin =
      col === GRID + BLEED
        ? -2
        : Math.min(BINS - 1, Math.floor(predict(net, ((col + 0.5) / GRID) * 2 - 1, 1 - ((row + 0.5) / GRID) * 2) * BINS));
    if (bin !== current) {
      if (current >= 0) cells.push({ x: start, y: row, w: col - start, bin: current });
      start = col;
      current = bin;
    }
  }
}

// Bin 0 = sure it's class 0 (rust), last bin = sure it's class 1 (blue).
const FILLS = ["#ecd3c5", "#f1dfd4", "#f6ebe4", "#f8f6ef", "#e6ecf7", "#d8e2f4", "#c9d7f1"];
const px = (v: number) => Math.round(v * 100) / 100;

// The 50% line, traced with marching squares over the grid corners and
// linear interpolation along each edge, so it's smooth where the cells are not.
const corner = Array.from({ length: GRID + 1 }, (_, row) =>
  Array.from({ length: GRID + 1 }, (_, col) => predict(net, (col / GRID) * 2 - 1, 1 - (row / GRID) * 2) - 0.5),
);
const boundary: string[] = [];
for (let row = 0; row < GRID; row++) {
  for (let col = 0; col < GRID; col++) {
    const v = [corner[row][col], corner[row][col + 1], corner[row + 1][col + 1], corner[row + 1][col]];
    const at = [
      [col, row],
      [col + 1, row],
      [col + 1, row + 1],
      [col, row + 1],
    ];
    const crossings: [number, number][] = [];
    for (let e = 0; e < 4; e++) {
      const a = v[e];
      const b = v[(e + 1) % 4];
      if (a > 0 !== b > 0) {
        const t = a / (a - b);
        const [x1, y1] = at[e];
        const [x2, y2] = at[(e + 1) % 4];
        crossings.push([px(x1 + (x2 - x1) * t), px(y1 + (y2 - y1) * t)]);
      }
    }
    for (let k = 0; k + 1 < crossings.length; k += 2) {
      boundary.push(`M${crossings[k][0]} ${crossings[k][1]}L${crossings[k + 1][0]} ${crossings[k + 1][1]}`);
    }
  }
}

/**
 * `compact` drops the caption (and its link) and hides the picture from screen
 * readers, for when the whole thing sits inside another link that already
 * describes it.
 */
export default function HeroArt({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-rule bg-white">
        <svg viewBox={`0 0 ${GRID} ${GRID}`} className="block aspect-square w-full" {...(compact ? { "aria-hidden": true } : { role: "img" })} aria-label={compact ? undefined : "Two interlocking half-moon shaped groups of points, blue circles and rust squares, with a curved shaded boundary between them drawn by a trained neural network."}>
          <defs>
            <filter id="hero-soften" filterUnits="userSpaceOnUse" x={-BLEED} y={-BLEED} width={GRID + 2 * BLEED} height={GRID + 2 * BLEED}>
              <feGaussianBlur stdDeviation="0.9" />
            </filter>
          </defs>
          <g filter="url(#hero-soften)">
            {cells.map((c) => (
              <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={1.02} fill={FILLS[c.bin]} />
            ))}
          </g>
          <path d={boundary.join("")} fill="none" stroke="#111a33" strokeOpacity=".55" strokeWidth=".18" strokeDasharray=".6 .4" strokeLinecap="round" />
          {points.map((p, i) => {
            const cx = px((p.x + 1) * (GRID / 2));
            const cy = px((1 - p.y) * (GRID / 2));
            return p.label === 1 ? (
              <circle key={i} cx={cx} cy={cy} r=".55" fill="#2458b8" />
            ) : (
              <rect key={i} x={px(cx - 0.5)} y={px(cy - 0.5)} width="1" height="1" fill="#a84d25" />
            );
          })}
        </svg>
      </div>
      {!compact && (
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-xs text-ink-muted">
        <span>
          A 6-neuron network, trained when this page was built. {Math.round(accuracy * 100)}% correct.
        </span>
        <Link href="/playground#train-a-network" className="link">
          Train your own
        </Link>
      </figcaption>
      )}
    </figure>
  );
}
