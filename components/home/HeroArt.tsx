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

// Run-length encode each row by confidence bin so the SVG stays small.
const cells: { x: number; y: number; w: number; bin: number }[] = [];
for (let row = 0; row < GRID; row++) {
  let start = 0;
  let current = -1;
  for (let col = 0; col <= GRID; col++) {
    const bin =
      col === GRID
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

export default function HeroArt() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-rule bg-white">
        <svg viewBox={`0 0 ${GRID} ${GRID}`} className="block aspect-square w-full" role="img" aria-label="Two interlocking half-moon shaped groups of points, blue circles and rust squares, with a curved shaded boundary between them drawn by a trained neural network.">
          {cells.map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={1.02} fill={FILLS[c.bin]} />
          ))}
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
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-xs text-ink-muted">
        <span>
          A 6-neuron network, trained when this page was built. {Math.round(accuracy * 100)}% correct.
        </span>
        <Link href="/playground#train-a-network" className="text-accent hover:underline">
          Train your own
        </Link>
      </figcaption>
    </figure>
  );
}
