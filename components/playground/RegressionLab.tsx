"use client";

import { useState } from "react";
import LabFrame, { ControlGroup, LabButton, Sparkline } from "@/components/playground/LabFrame";
import { pointerToUnit, px, useLoop } from "@/components/playground/useLoop";
import { gradientStep, linePoints, mse, type Line, type Point } from "@/lib/ml";

// A deliberately bad first guess, so there's something to watch.
const START: Line = { m: -0.35, b: 0.82 };
const RATES = [
  { label: "Tiny", value: 0.03 },
  { label: "Small", value: 0.15 },
  { label: "Good", value: 0.5 },
  { label: "Too big", value: 0.95 },
];
const HISTORY = 150;

export default function RegressionLab() {
  const [points, setPoints] = useState<Point[]>(() => linePoints(4));
  const [line, setLine] = useState<Line>(START);
  const [rate, setRate] = useState(0.5);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<number[]>(() => [mse(linePoints(4), START)]);

  const loss = mse(points, line);
  const diverged = !Number.isFinite(loss) || loss > 50;

  function advance(steps = 1) {
    let next = line;
    const losses: number[] = [];
    for (let i = 0; i < steps; i++) {
      next = gradientStep(points, next, rate);
      losses.push(mse(points, next));
    }
    const nextLoss = losses[losses.length - 1];
    const prevLoss = losses.length > 1 ? losses[losses.length - 2] : loss;
    setLine(next);
    setStep((s) => s + steps);
    setHistory((h) => [...h, ...losses].slice(-HISTORY));
    // Stop on our own once it has settled, or once it has clearly blown up.
    if (!Number.isFinite(nextLoss) || nextLoss > 50 || Math.abs(prevLoss - nextLoss) < 1e-9) setRunning(false);
  }

  // One step per 50ms, catching up if the browser throttled us.
  useLoop(running, (elapsedMs) => advance(Math.min(20, Math.max(1, Math.round(elapsedMs / 50)))), 50);

  function restart(nextPoints = points) {
    setRunning(false);
    setLine(START);
    setStep(0);
    setHistory([mse(nextPoints, START)]);
  }

  function addPoint(p: Point) {
    const next = [...points, p];
    setPoints(next);
    setHistory((h) => [...h, mse(next, line)].slice(-HISTORY));
  }

  // The line can run off the plot when it diverges; clamp what we draw.
  const y0 = line.b;
  const y1 = line.m + line.b;
  const drawable = Number.isFinite(y0) && Number.isFinite(y1) && Math.abs(y0) < 1e4 && Math.abs(y1) < 1e4;

  return (
    <LabFrame
      id="fit-a-line"
      index="01"
      kicker="Supervised learning · regression"
      title="Fit a line with gradient descent"
      description={
        <p>
          The model guesses <span className="font-mono text-ink">y = m·x + b</span>. Each step measures how wrong it is (the dashed
          lines), then nudges <span className="font-mono text-ink">m</span> and <span className="font-mono text-ink">b</span> downhill.
          Tap the plot to add your own points, and try a learning rate that&apos;s too big.
        </p>
      }
      plot={
        <div className="graph-paper relative aspect-square w-full max-w-[34rem] overflow-hidden rounded-md border border-rule bg-white">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full cursor-crosshair touch-none"
            role="img"
            aria-label={`Scatter plot of ${points.length} points with the current fitted line.`}
            onPointerDown={(e) => addPoint(pointerToUnit(e))}
          >
            {drawable &&
              points.map((p, i) => (
                <line key={`r${i}`} x1={px(p.x * 100)} y1={px((1 - p.y) * 100)} x2={px(p.x * 100)} y2={px((1 - (line.m * p.x + line.b)) * 100)} stroke="var(--color-accent-warm)" strokeOpacity=".55" strokeWidth=".5" strokeDasharray="1.4 1" />
              ))}
            {drawable && <line x1={0} y1={px((1 - y0) * 100)} x2={100} y2={px((1 - y1) * 100)} stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />}
            {points.map((p, i) => (
              <circle key={i} cx={px(p.x * 100)} cy={px((1 - p.y) * 100)} r="1.7" fill="var(--color-night)" stroke="white" strokeWidth=".5" />
            ))}
          </svg>
        </div>
      }
      stats={[
        { label: "Step", value: String(step) },
        { label: "Error (MSE)", value: diverged ? "diverged" : loss.toFixed(4), tone: diverged ? "warn" : undefined },
        { label: "Slope m", value: drawable ? line.m.toFixed(2) : "n/a" },
        { label: "Intercept b", value: drawable ? line.b.toFixed(2) : "n/a" },
      ]}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            <LabButton variant="primary" onClick={() => (diverged ? restart() : setRunning((r) => !r))}>
              {diverged ? "Reset the line" : running ? "Pause" : step === 0 ? "Train" : "Keep training"}
            </LabButton>
            <LabButton onClick={() => advance()} disabled={running || diverged}>One step</LabButton>
            <LabButton onClick={() => restart()}>Reset</LabButton>
          </div>
          <ControlGroup label="Learning rate">
            {RATES.map((r) => (
              <LabButton key={r.label} pressed={rate === r.value} onClick={() => setRate(r.value)}>
                {r.label}
              </LabButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Data">
            <LabButton onClick={() => addPoint({ x: Math.random(), y: Math.random() })}>Add a random point</LabButton>
            <LabButton
              onClick={() => {
                const next = linePoints(Math.floor(Math.random() * 1e6));
                setPoints(next);
                restart(next);
              }}
            >
              New data
            </LabButton>
          </ControlGroup>
          {diverged && <p className="text-sm text-accent-warm">Each step was so big that the line overshot by more every time. That&apos;s called divergence. Try a smaller rate.</p>}
          <Sparkline values={history} label="Error over time" />
        </>
      }
      lesson={{ label: "Lesson: linear regression and loss", href: "/lessons#year-2025-26" }}
    />
  );
}
