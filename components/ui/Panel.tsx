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
      className={`border border-rule ${raised ? "bg-paper-raised" : "bg-paper"} ${className}`}
    >
      {children}
    </div>
  );
}
