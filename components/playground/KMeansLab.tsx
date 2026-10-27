"use client";

import { useState } from "react";
import LabFrame, { ControlGroup, LabButton } from "@/components/playground/LabFrame";
import { pointerToUnit, px, useLoop } from "@/components/playground/useLoop";
import { assign, blobPoints, inertia, moveCenters, pickCenters, seededRandom, type Point } from "@/lib/ml";

const COLORS = ["#2458b8", "#a84d25", "#306d53", "#7052a4", "#82600e", "#a33a2a"];
const START_K = 3;

type Phase = "assign" | "update" | "done";

export default function KMeansLab() {
  const [points, setPoints] = useState<Point[]>(() => blobPoints(7));
  const [k, setK] = useState(START_K);
  const [centers, setCenters] = useState<Point[]>(() => pickCenters(blobPoints(7), START_K, seededRandom(11)));
  const [assignment, setAssignment] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<Phase>("assign");
  const [round, setRound] = useState(0);
  const [running, setRunning] = useState(false);

  function advance() {
    if (phase === "assign") {
      setAssignment(assign(points, centers));
      setPhase("update");
    } else if (phase === "update" && assignment) {
      const moved = moveCenters(points, assignment, centers);
      const still = moved.every((c, i) => Math.abs(c.x - centers[i].x) + Math.abs(c.y - centers[i].y) < 1e-6);
      setCenters(moved);
      setRound((r) => r + 1);
      if (still) {
        setPhase("done");
        setRunning(false);
      } else {
        setPhase("assign");
      }
    }
  }

  useLoop(running, advance, 650);

  function restart(nextPoints = points, nextK = k) {
    setRunning(false);
    setCenters(pickCenters(nextPoints, nextK));
    setAssignment(null);
    setPhase("assign");
    setRound(0);
  }

  const spread = assignment ? inertia(points, assignment, centers) : null;
  const nextAction = phase === "assign" ? "Assign points" : phase === "update" ? "Move centers" : "Converged";

  return (
    <LabFrame
      id="find-clusters"
      index="02"
      kicker="Unsupervised learning · clustering"
      title="Let k-means find the groups"
      description={
        <p>
          Nobody tells k-means which group a point belongs to. It drops <span className="font-mono text-ink">k</span> centers, colors every
          point by its nearest center, moves each center to the middle of its color, and repeats until nothing moves. Pick the wrong{" "}
          <span className="font-mono text-ink">k</span> and see what happens.
        </p>
      }
      plot={
        <div className="graph-paper relative aspect-square w-full max-w-[34rem] overflow-hidden rounded-md border border-rule bg-white">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full cursor-crosshair touch-none"
            role="img"
            aria-label={`${points.length} points and ${centers.length} cluster centers.`}
            onPointerDown={(e) => {
              setPoints([...points, pointerToUnit(e)]);
              if (assignment) setPhase("assign");
            }}
          >
            {assignment &&
              points.map((p, i) =>
                centers[assignment[i]] ? (
                  <line key={`l${i}`} x1={px(p.x * 100)} y1={px((1 - p.y) * 100)} x2={px(centers[assignment[i]].x * 100)} y2={px((1 - centers[assignment[i]].y) * 100)} stroke={COLORS[assignment[i]]} strokeOpacity=".18" strokeWidth=".4" />
                ) : null,
              )}
            {points.map((p, i) => (
              <circle key={i} cx={px(p.x * 100)} cy={px((1 - p.y) * 100)} r="1.5" fill={assignment?.[i] !== undefined ? COLORS[assignment[i]] : "#8a94a8"} stroke="white" strokeWidth=".4" />
            ))}
            {centers.map((c, i) => (
              <g key={`c${i}`} transform={`translate(${px(c.x * 100)} ${px((1 - c.y) * 100)})`} style={{ transition: "transform 450ms cubic-bezier(.2,.8,.2,1)" }}>
                <rect x="-3" y="-3" width="6" height="6" rx="1" transform="rotate(45)" fill={COLORS[i]} stroke="white" strokeWidth="1" />
              </g>
            ))}
          </svg>
        </div>
      }
      stats={[
        { label: "Round", value: String(round) },
        { label: "Next step", value: nextAction },
        { label: "Clusters (k)", value: String(k) },
        { label: "Spread", value: spread === null ? "n/a" : spread.toFixed(3) },
      ]}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            <LabButton variant="primary" onClick={() => (phase === "done" ? restart() : setRunning((r) => !r))}>
              {phase === "done" ? "Try new centers" : running ? "Pause" : "Run"}
            </LabButton>
            <LabButton onClick={advance} disabled={running || phase === "done"}>{nextAction}</LabButton>
          </div>
          <ControlGroup label="Number of clusters">
            {[2, 3, 4, 5, 6].map((n) => (
              <LabButton
                key={n}
                pressed={k === n}
                onClick={() => {
                  setK(n);
                  restart(points, n);
                }}
              >
                {n}
              </LabButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Data">
            <LabButton
              onClick={() => {
                const next = blobPoints(Math.floor(Math.random() * 1e6), 2 + Math.floor(Math.random() * 3));
                setPoints(next);
                restart(next);
              }}
            >
              New data
            </LabButton>
            <LabButton onClick={() => restart()}>Restart from random centers</LabButton>
          </ControlGroup>
          <p className="text-sm leading-relaxed text-ink-muted">
            Diamonds are the centers. Run it twice on the same data and you may get different groups, because the starting centers are random.
          </p>
        </>
      }
      lesson={{ label: "Lesson: supervised vs. unsupervised learning", href: "/lessons#current-year" }}
    />
  );
}
