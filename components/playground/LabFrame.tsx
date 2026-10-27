import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LabFrameProps {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: ReactNode;
  plot: ReactNode;
  controls: ReactNode;
  /** Shown as chips and announced politely to screen readers as it changes. */
  stats: { label: string; value: string; tone?: "warn" }[];
  lesson: { label: string; href: string };
}

/**
 * Shared shell for a playground lab: copy on top, plot + controls side by
 * side. Everything here is static markup, so with JavaScript off a visitor
 * still gets the explanation and the starting picture.
 */
export default function LabFrame({ id, index, kicker, title, description, plot, controls, stats, lesson }: LabFrameProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-rule bg-white shadow-[0_24px_60px_rgba(17,26,51,.07)]">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex size-10 rotate-[-6deg] items-center justify-center rounded-2xl bg-accent text-sm font-black text-white">{index}</span>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">{kicker}</p>
          </div>
          <h2 id={`${id}-title`} className="mb-3 text-3xl font-black tracking-[-.045em] text-ink sm:text-4xl">{title}</h2>
          <div className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</div>
          {plot}
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:pt-16">
          <dl aria-live="polite" className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className={cn("rounded-2xl px-4 py-3", s.tone === "warn" ? "bg-peach-soft" : "bg-paper")}>
                <dt className="text-[11px] font-bold uppercase tracking-[.16em] text-ink-muted">{s.label}</dt>
                <dd className={cn("mt-1 font-mono text-lg font-bold tabular-nums", s.tone === "warn" ? "text-accent-warm" : "text-ink")}>{s.value}</dd>
              </div>
            ))}
          </dl>
          {controls}
          <Link href={lesson.href} className="mt-auto rounded-2xl border border-dashed border-accent/40 bg-blue-soft/50 px-4 py-3 text-sm font-semibold text-accent hover:border-accent hover:bg-blue-soft">
            {lesson.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface LabButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "plain";
  pressed?: boolean;
  disabled?: boolean;
}

export function LabButton({ onClick, children, variant = "plain", pressed, disabled }: LabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      disabled={disabled}
      className={cn(
        "min-h-10 rounded-full px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary"
          ? "bg-accent text-white shadow-[0_4px_0_#173d83] hover:bg-night"
          : pressed
            ? "bg-night text-white"
            : "border border-rule bg-white text-ink hover:border-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

/** Tiny loss-over-time chart. Values are drawn relative to the largest one seen. */
export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const finite = values.filter(Number.isFinite);
  const max = Math.max(...finite, 1e-9);
  const d = finite
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i / Math.max(finite.length - 1, 1)) * 100},${30 - (v / max) * 28}`)
    .join(" ");
  return (
    <figure className="rounded-2xl bg-paper px-4 py-3">
      <figcaption className="mb-1 text-[11px] font-bold uppercase tracking-[.16em] text-ink-muted">{label}</figcaption>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
        {finite.length > 1 && <path d={d} fill="none" stroke="var(--color-accent-warm)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />}
      </svg>
    </figure>
  );
}
