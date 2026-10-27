"use client";

import { useEffect, useRef, useState } from "react";
import LabFrame, { ControlGroup, LabButton, Sparkline } from "@/components/playground/LabFrame";
import { pointerToUnit, px, useLoop } from "@/components/playground/useLoop";
import {
  classificationPoints,
  createNetwork,
  evaluate,
  predict,
  seededRandom,
  trainStep,
  type DatasetName,
  type LabeledPoint,
  type Network,
} from "@/lib/ml";

const DATASETS: { name: DatasetName; label: string }[] = [
  { name: "blobs", label: "Two groups" },
  { name: "circle", label: "Circle" },
  { name: "xor", label: "XOR" },
  { name: "moons", label: "Moons" },
];
const RATES = [0.1, 0.5, 1.5];
const GRID = 48;
// About 6 training steps per 60fps frame, scaled by real elapsed time.
const STEPS_PER_MS = 6 / 16;
const MAX_STEPS_PER_TICK = 240;

// Class 1 is blue circles, class 0 is rust squares — shape as well as color.
const BLUE = [36, 88, 184];
const RUST = [168, 77, 37];

function drawBoundary(canvas: HTMLCanvasElement, net: Network) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const image = ctx.createImageData(GRID, GRID);
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const x = (col + 0.5) / GRID * 2 - 1;
      const y = 1 - (row + 0.5) / GRID * 2;
      const p = predict(net, x, y);
      const tint = p >= 0.5 ? BLUE : RUST;
      const strength = Math.abs(p - 0.5) * 2; // 0 at the boundary, 1 when sure
      const alpha = 0.12 + strength * 0.38;
      const i = (row * GRID + col) * 4;
      // Blend the tint over the paper color (#f8f6ef).
      image.data[i] = Math.round(248 + (tint[0] - 248) * alpha);
      image.data[i + 1] = Math.round(246 + (tint[1] - 246) * alpha);
      image.data[i + 2] = Math.round(239 + (tint[2] - 239) * alpha);
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

/** The network itself: line thickness is weight size, color is its sign. */
function NetworkDiagram({ net }: { net: Network }) {
  const H = net.w1.length;
  const hy = (j: number) => 10 + (j + 0.5) * (80 / H);
  const width = (w: number) => Math.min(3.2, 0.3 + Math.abs(w) * 0.7);
  const color = (w: number) => (w >= 0 ? "var(--color-accent)" : "var(--color-accent-warm)");
  return (
    <figure className="rounded-2xl bg-paper px-4 py-3">
      <figcaption className="mb-1 text-[11px] font-bold uppercase tracking-[.16em] text-ink-muted">
        The network · 2 inputs → {H} hidden → 1 output
      </figcaption>
      <svg viewBox="0 0 100 100" className="h-36 w-full" aria-hidden="true">
        {net.w1.map((w, j) =>
          [35, 65].map((iy, k) => <line key={`a${j}${k}`} x1="12" y1={iy} x2="50" y2={hy(j)} stroke={color(w[k])} strokeWidth={width(w[k])} strokeOpacity=".75" />),
        )}
        {net.w2.map((w, j) => <line key={`b${j}`} x1="50" y1={hy(j)} x2="88" y2="50" stroke={color(w)} strokeWidth={width(w)} strokeOpacity=".75" />)}
        {[35, 65].map((iy, k) => (
          <g key={k}>
            <circle cx="12" cy={iy} r="5" fill="white" stroke="var(--color-night)" strokeWidth="1" />
            <text x="12" y={iy + 1.6} textAnchor="middle" fontSize="5" fontWeight="700" fill="var(--color-night)">{k === 0 ? "x" : "y"}</text>
          </g>
        ))}
        {net.w1.map((_, j) => <circle key={j} cx="50" cy={hy(j)} r="3.6" fill="var(--color-night)" />)}
        <circle cx="88" cy="50" r="5" fill="white" stroke="var(--color-night)" strokeWidth="1" />
      </svg>
    </figure>
  );
}

export default function NeuralLab() {
  const [dataset, setDataset] = useState<DatasetName>("circle");
  const [points, setPoints] = useState<LabeledPoint[]>(() => classificationPoints("circle", 5));
  const [hidden, setHidden] = useState(4);
  const [rate, setRate] = useState(0.5);
  const [net, setNet] = useState<Network>(() => createNetwork(4, seededRandom(3)));
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(false);
  const [brush, setBrush] = useState(1);
  const [history, setHistory] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { loss, accuracy } = evaluate(net, points);

  useEffect(() => {
    if (canvasRef.current) drawBoundary(canvasRef.current, net);
  }, [net]);

  useLoop(running, (elapsedMs) => {
    const steps = Math.min(MAX_STEPS_PER_TICK, Math.max(1, Math.round(elapsedMs * STEPS_PER_MS)));
    let next = net;
    for (let i = 0; i < steps; i++) next = trainStep(next, points, rate);
    setNet(next);
    setEpoch((e) => e + steps);
    setHistory((h) => [...h, evaluate(next, points).loss].slice(-200));
  });

  function reset(nextHidden = hidden) {
    setRunning(false);
    setNet(createNetwork(nextHidden));
    setEpoch(0);
    setHistory([]);
  }

  return (
    <LabFrame
      id="train-a-network"
      index="03"
      kicker="Neural networks · classification"
      title="Train a tiny neural network"
      description={
        <p>
          A real neural network, trained by backpropagation right here in your browser. The background shows what it currently believes:
          blue where it predicts circles, rust where it predicts squares, pale where it isn&apos;t sure. A straight line can&apos;t separate
          the circle or XOR data — watch the hidden neurons bend the boundary. Tap the plot to add a point.
        </p>
      }
      plot={
        <div className="relative aspect-square w-full max-w-[34rem] overflow-hidden rounded-3xl border border-rule bg-paper">
          <canvas ref={canvasRef} width={GRID} height={GRID} className="absolute inset-0 size-full [image-rendering:auto]" aria-hidden="true" />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full cursor-crosshair touch-none"
            role="img"
            aria-label={`${points.length} labeled points and the network's decision regions.`}
            onPointerDown={(e) => {
              const u = pointerToUnit(e);
              setPoints([...points, { x: u.x * 2 - 1, y: u.y * 2 - 1, label: brush }]);
            }}
          >
            {points.map((p, i) => {
              const cx = px((p.x + 1) * 50);
              const cy = px((1 - p.y) * 50);
              return p.label === 1 ? (
                <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgb(36,88,184)" stroke="white" strokeWidth=".5" />
              ) : (
                <rect key={i} x={px(cx - 1.3)} y={px(cy - 1.3)} width="2.6" height="2.6" fill="rgb(168,77,37)" stroke="white" strokeWidth=".5" />
              );
            })}
          </svg>
        </div>
      }
      stats={[
        { label: "Epoch", value: String(epoch) },
        { label: "Accuracy", value: `${Math.round(accuracy * 100)}%` },
        { label: "Loss", value: loss.toFixed(3) },
        { label: "Hidden neurons", value: String(hidden) },
      ]}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            <LabButton variant="primary" onClick={() => setRunning((r) => !r)}>
              {running ? "Pause" : epoch === 0 ? "Train" : "Keep training"}
            </LabButton>
            <LabButton onClick={() => reset()}>New random weights</LabButton>
          </div>
          <ControlGroup label="Dataset">
            {DATASETS.map((d) => (
              <LabButton
                key={d.name}
                pressed={dataset === d.name}
                onClick={() => {
                  setDataset(d.name);
                  setPoints(classificationPoints(d.name, Math.floor(Math.random() * 1e6)));
                  reset();
                }}
              >
                {d.label}
              </LabButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Hidden neurons">
            {[1, 2, 4, 8].map((n) => (
              <LabButton
                key={n}
                pressed={hidden === n}
                onClick={() => {
                  setHidden(n);
                  reset(n);
                }}
              >
                {n}
              </LabButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Learning rate">
            {RATES.map((r) => (
              <LabButton key={r} pressed={rate === r} onClick={() => setRate(r)}>{r}</LabButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Tapping adds">
            <LabButton pressed={brush === 1} onClick={() => setBrush(1)}>● Circles</LabButton>
            <LabButton pressed={brush === 0} onClick={() => setBrush(0)}>■ Squares</LabButton>
          </ControlGroup>
          <NetworkDiagram net={net} />
          <Sparkline values={history} label="Loss over time" />
        </>
      }
      lesson={{ label: "Lesson: neural networks and perceptrons", href: "/lessons#year-2024-25" }}
    />
  );
}
