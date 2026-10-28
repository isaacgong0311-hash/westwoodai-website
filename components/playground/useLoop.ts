"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `tick` on every animation frame (or every `intervalMs`) while
 * `running` is true. The latest `tick` is always used, so callers can close
 * over fresh state without restarting the loop. `tick` receives the
 * milliseconds since the previous call, so work can scale with real time
 * when the browser throttles frames (background tabs, low-power mode).
 */
export function useLoop(running: boolean, tick: (elapsedMs: number) => void, intervalMs?: number) {
  const tickRef = useRef(tick);
  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const fire = () => {
      const now = performance.now();
      tickRef.current(now - last);
      last = now;
    };
    if (intervalMs) {
      const id = window.setInterval(fire, intervalMs);
      return () => window.clearInterval(id);
    }
    let frame = 0;
    const loop = () => {
      fire();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running, intervalMs]);
}

/** Maps a pointer event on a square SVG to [0, 1] × [0, 1] with y pointing up. */
export function pointerToUnit(event: React.PointerEvent<SVGSVGElement>): { x: number; y: number } {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height)),
  };
}

/**
 * Rounds a plotted coordinate. Math.sin/cos can differ in the last digit
 * between Node and the browser, which would make hydration see different
 * SVG attributes; two decimals is far finer than a pixel.
 */
export const px = (v: number) => Math.round(v * 100) / 100;
