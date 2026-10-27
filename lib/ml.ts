// The math behind the /playground labs. Plain functions with no React or DOM,
// so the labs stay small and every step is something a member could follow
// along with in the matching lesson.

export interface Point {
  x: number;
  y: number;
}

export interface LabeledPoint extends Point {
  /** 0 or 1 */
  label: number;
}

/**
 * Small seeded PRNG (mulberry32). The labs' starting data must be identical
 * on the server and in the browser, or hydration would see different points.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Approximately normal noise from the sum of uniforms — plenty for toy data. */
function noise(rand: () => number, scale: number): number {
  return ((rand() + rand() + rand() - 1.5) / 1.5) * scale;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// ---------------------------------------------------------------------------
// Linear regression with gradient descent. Points live in [0, 1] × [0, 1].

export interface Line {
  m: number;
  b: number;
}

export function linePoints(seed: number, count = 14): Point[] {
  const rand = seededRandom(seed);
  const m = 0.45 + rand() * 0.4;
  const b = 0.08 + rand() * 0.2;
  return Array.from({ length: count }, (_, i) => {
    const x = 0.06 + (0.88 * (i + rand() * 0.8)) / count;
    return { x, y: clamp(m * x + b + noise(rand, 0.09), 0.03, 0.97) };
  });
}

export function mse(points: Point[], { m, b }: Line): number {
  if (points.length === 0) return 0;
  return points.reduce((sum, p) => sum + (m * p.x + b - p.y) ** 2, 0) / points.length;
}

/** One step of gradient descent on mean squared error. */
export function gradientStep(points: Point[], { m, b }: Line, learningRate: number): Line {
  if (points.length === 0) return { m, b };
  let dm = 0;
  let db = 0;
  for (const p of points) {
    const error = m * p.x + b - p.y;
    dm += error * p.x;
    db += error;
  }
  const n = points.length;
  return { m: m - learningRate * (2 / n) * dm, b: b - learningRate * (2 / n) * db };
}

// ---------------------------------------------------------------------------
// k-means clustering. Points live in [0, 1] × [0, 1].

export function blobPoints(seed: number, blobs = 3, perBlob = 18): Point[] {
  const rand = seededRandom(seed);
  const points: Point[] = [];
  for (let c = 0; c < blobs; c++) {
    const cx = 0.18 + rand() * 0.64;
    const cy = 0.18 + rand() * 0.64;
    for (let i = 0; i < perBlob; i++) {
      points.push({ x: clamp(cx + noise(rand, 0.11), 0.02, 0.98), y: clamp(cy + noise(rand, 0.11), 0.02, 0.98) });
    }
  }
  return points;
}

/** Picks k distinct data points as starting centers ("Forgy" initialization). */
export function pickCenters(points: Point[], k: number, rand: () => number = Math.random): Point[] {
  const pool = [...points];
  const centers: Point[] = [];
  while (centers.length < k && pool.length > 0) {
    const [p] = pool.splice(Math.floor(rand() * pool.length), 1);
    centers.push({ ...p });
  }
  return centers;
}

const dist2 = (a: Point, b: Point) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

/** Assignment step: each point joins its nearest center. */
export function assign(points: Point[], centers: Point[]): number[] {
  return points.map((p) => {
    let best = 0;
    for (let c = 1; c < centers.length; c++) {
      if (dist2(p, centers[c]) < dist2(p, centers[best])) best = c;
    }
    return best;
  });
}

/** Update step: each center moves to the mean of its points (empty clusters stay put). */
export function moveCenters(points: Point[], assignment: number[], centers: Point[]): Point[] {
  return centers.map((center, c) => {
    const members = points.filter((_, i) => assignment[i] === c);
    if (members.length === 0) return center;
    return {
      x: members.reduce((s, p) => s + p.x, 0) / members.length,
      y: members.reduce((s, p) => s + p.y, 0) / members.length,
    };
  });
}

/** Sum of squared distances to assigned centers — what k-means is minimizing. */
export function inertia(points: Point[], assignment: number[], centers: Point[]): number {
  return points.reduce((s, p, i) => s + (centers[assignment[i]] ? dist2(p, centers[assignment[i]]) : 0), 0);
}

// ---------------------------------------------------------------------------
// A two-layer neural network for 2D classification. Points live in [-1, 1]².

export type DatasetName = "circle" | "xor" | "moons" | "blobs";

export function classificationPoints(name: DatasetName, seed: number, count = 120): LabeledPoint[] {
  const rand = seededRandom(seed);
  const points: LabeledPoint[] = [];
  for (let i = 0; i < count; i++) {
    const label = i % 2;
    if (name === "circle") {
      const angle = rand() * Math.PI * 2;
      const r = label === 1 ? rand() * 0.42 : 0.62 + rand() * 0.3;
      points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, label });
    } else if (name === "xor") {
      const x = (0.12 + rand() * 0.8) * (rand() < 0.5 ? -1 : 1);
      const y = (0.12 + rand() * 0.8) * (rand() < 0.5 ? -1 : 1);
      points.push({ x, y, label: x * y > 0 ? 1 : 0 });
    } else if (name === "moons") {
      const t = rand() * Math.PI;
      const x = label === 1 ? Math.cos(t) * 0.6 - 0.3 : 0.3 - Math.cos(t) * 0.6;
      const y = label === 1 ? Math.sin(t) * 0.6 - 0.15 : 0.15 - Math.sin(t) * 0.6;
      points.push({ x: clamp(x + noise(rand, 0.08), -0.98, 0.98), y: clamp(y + noise(rand, 0.08), -0.98, 0.98), label });
    } else {
      const c = label === 1 ? 0.45 : -0.45;
      points.push({ x: clamp(c + noise(rand, 0.28), -0.98, 0.98), y: clamp(c + noise(rand, 0.28), -0.98, 0.98), label });
    }
  }
  return points;
}

export interface Network {
  /** hidden × 2 */
  w1: number[][];
  b1: number[];
  w2: number[];
  b2: number;
}

export function createNetwork(hidden: number, rand: () => number = Math.random): Network {
  // Xavier-ish scale for tanh units.
  const s1 = Math.sqrt(1 / 2);
  const s2 = Math.sqrt(1 / hidden);
  return {
    w1: Array.from({ length: hidden }, () => [(rand() * 2 - 1) * s1 * 2, (rand() * 2 - 1) * s1 * 2]),
    b1: Array.from({ length: hidden }, () => (rand() * 2 - 1) * 0.5),
    w2: Array.from({ length: hidden }, () => (rand() * 2 - 1) * s2 * 2),
    b2: 0,
  };
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

/** Probability that (x, y) is class 1. */
export function predict(net: Network, x: number, y: number): number {
  let z = net.b2;
  for (let j = 0; j < net.w1.length; j++) {
    z += net.w2[j] * Math.tanh(net.w1[j][0] * x + net.w1[j][1] * y + net.b1[j]);
  }
  return sigmoid(z);
}

/** One full-batch gradient descent step on binary cross-entropy (backpropagation by hand). */
export function trainStep(net: Network, points: LabeledPoint[], learningRate: number): Network {
  const H = net.w1.length;
  const gw1 = net.w1.map(() => [0, 0]);
  const gb1 = new Array(H).fill(0);
  const gw2 = new Array(H).fill(0);
  let gb2 = 0;

  for (const p of points) {
    const h = net.w1.map((w, j) => Math.tanh(w[0] * p.x + w[1] * p.y + net.b1[j]));
    const out = sigmoid(h.reduce((s, hj, j) => s + net.w2[j] * hj, net.b2));
    const dz2 = out - p.label;
    gb2 += dz2;
    for (let j = 0; j < H; j++) {
      gw2[j] += dz2 * h[j];
      const dz1 = dz2 * net.w2[j] * (1 - h[j] * h[j]);
      gw1[j][0] += dz1 * p.x;
      gw1[j][1] += dz1 * p.y;
      gb1[j] += dz1;
    }
  }

  const n = Math.max(points.length, 1);
  const step = learningRate / n;
  return {
    w1: net.w1.map((w, j) => [w[0] - step * gw1[j][0], w[1] - step * gw1[j][1]]),
    b1: net.b1.map((b, j) => b - step * gb1[j]),
    w2: net.w2.map((w, j) => w - step * gw2[j]),
    b2: net.b2 - step * gb2,
  };
}

export function evaluate(net: Network, points: LabeledPoint[]): { loss: number; accuracy: number } {
  if (points.length === 0) return { loss: 0, accuracy: 0 };
  let loss = 0;
  let correct = 0;
  for (const p of points) {
    const q = clamp(predict(net, p.x, p.y), 1e-7, 1 - 1e-7);
    loss -= p.label * Math.log(q) + (1 - p.label) * Math.log(1 - q);
    if ((q >= 0.5 ? 1 : 0) === p.label) correct++;
  }
  return { loss: loss / points.length, accuracy: correct / points.length };
}
