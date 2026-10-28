import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  raised?: boolean;
}

/** The bordered box used for callouts (next meeting, notices). */
export default function Panel({ children, className = "", raised = false }: PanelProps) {
  return (
    <div className={`rounded-lg border border-rule ${raised ? "bg-paper-raised" : "bg-paper"} ${className}`}>
      {children}
    </div>
  );
}
