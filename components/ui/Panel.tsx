import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  raised?: boolean;
}

/**
 * The bordered box shell used for callouts (next-meeting, empty states,
 * banners). Replaces ~12 hand-rolled `border border-[#1e1e2e] rounded-xl`
 * blocks that used to be pasted separately in every component.
 */
export default function Panel({ children, className = "", raised = false }: PanelProps) {
  return (
    <div
      className={`rounded-3xl border border-rule shadow-[0_14px_36px_rgba(17,26,51,.05)] ${raised ? "bg-paper-raised" : "bg-paper"} ${className}`}
    >
      {children}
    </div>
  );
}
