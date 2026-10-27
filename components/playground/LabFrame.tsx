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
  /** Shown as a small readout and announced politely to screen readers as it changes. */
  stats: { label: string; value: string; tone?: "warn" }[];
  lesson: { label: string; href: string };
}

/**
 * Shared shell for a playground lab: copy on top, plot and controls side by
 * side. Everything here is static markup, so with JavaScript off a visitor
 * still gets the explanation and the starting picture.
 */
export default function LabFrame({ id, index, kicker, title, description, plot, controls, stats, lesson }: LabFrameProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t-2 border-ink pt-6">
      <p className="font-mono text-xs text-ink-muted">
        {index} · {kicker}
      </p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      <div className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">{description}</div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="min-w-0">{plot}</div>
        <div className="flex min-w-0 flex-col gap-6">
          <dl aria-live="polite" className="grid grid-cols-2 border-l border-t border-rule">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-r border-rule bg-white px-3 py-2.5">
                <dt className="text-xs text-ink-muted">{s.label}</dt>
                <dd className={cn("mt-0.5 font-mono text-[15px] tabular-nums", s.tone === "warn" ? "text-accent-warm" : "text-ink")}>{s.value}</dd>
              </div>
            ))}
          </dl>
          {controls}
          <Link href={lesson.href} className="text-sm text-accent hover:underline">
            {lesson.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-2 text-xs text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
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
        "h-9 rounded-md px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary"
          ? "bg-ink font-medium text-white hover:bg-accent"
          : pressed
            ? "border border-ink bg-ink text-white"
            : "border border-rule bg-white text-ink hover:border-ink",
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
    <figure>
      <figcaption className="mb-1 text-xs text-ink-muted">{label}</figcaption>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-12 w-full border-b border-l border-rule" aria-hidden="true">
        {finite.length > 1 && <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />}
      </svg>
    </figure>
  );
}
