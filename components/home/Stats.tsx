"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 84, label: "Members", suffix: "+", color: "#b69bff" },
  { value: 23, label: "Projects Built", suffix: "", color: "#6ee7ff" },
  { value: 11, label: "Competitions", suffix: "", color: "#00ff88" },
  { value: 4, label: "Years Running", suffix: "", color: "#c47855" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatCard({
  value, label, suffix, color, delay,
}: (typeof STATS)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1.6, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center justify-center py-8 px-4 border border-[#1e1e2e] rounded-xl bg-[#0a0a0f] hover:bg-[#0d0d14] transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${color}10 0%, transparent 70%)`,
        }}
      />
      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
      />

      <span
        className="font-serif text-5xl mb-2 tabular-nums transition-colors duration-300"
        style={{ fontFamily: "var(--font-instrument-serif)", color }}
      >
        {count}
        {suffix}
      </span>
      <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="px-4 sm:px-6 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
