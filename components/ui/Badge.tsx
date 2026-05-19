import { cn } from "@/lib/cn";

type BadgeVariant =
  | "open"
  | "forming"
  | "closed"
  | "upcoming"
  | "hot"
  | "lesson"
  | "speaker"
  | "workshop"
  | "competition"
  | "social"
  | "active"
  | "completed"
  | "demo"
  | "default";

const variants: Record<BadgeVariant, string> = {
  open: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10",
  forming: "text-[#6ee7ff] border-[#6ee7ff]/30 bg-[#6ee7ff]/10",
  closed: "text-[#55556a] border-[#55556a]/30 bg-[#55556a]/10",
  upcoming: "text-[#b69bff] border-[#b69bff]/30 bg-[#b69bff]/10",
  hot: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  lesson: "text-[#b69bff] border-[#b69bff]/30 bg-[#b69bff]/10",
  speaker: "text-[#6ee7ff] border-[#6ee7ff]/30 bg-[#6ee7ff]/10",
  workshop: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10",
  competition: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  social: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  active: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10",
  completed: "text-[#55556a] border-[#55556a]/30 bg-[#55556a]/10",
  demo: "text-[#6ee7ff] border-[#6ee7ff]/30 bg-[#6ee7ff]/10",
  default: "text-[#8888aa] border-[#2e2e45] bg-[#16161f]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
