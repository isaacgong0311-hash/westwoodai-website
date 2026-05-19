export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatShortDate(dateStr);
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / 86400000);
}

export function difficultyColor(
  level: "beginner" | "intermediate" | "advanced" | "easy" | "medium" | "hard"
) {
  const map: Record<string, string> = {
    beginner: "text-green-DEFAULT border-green-DEFAULT/30 bg-green-glow",
    easy: "text-green-DEFAULT border-green-DEFAULT/30 bg-green-glow",
    intermediate: "text-purple border-purple/30 bg-purple-glow",
    medium: "text-purple border-purple/30 bg-purple-glow",
    advanced: "text-red-400 border-red-400/30 bg-red-400/10",
    hard: "text-red-400 border-red-400/30 bg-red-400/10",
  };
  return map[level] ?? "";
}

export function categoryColor(cat: string) {
  const map: Record<string, string> = {
    LLMs: "text-purple border-purple/30 bg-purple-glow",
    CV: "text-cyan border-cyan/30 bg-cyan-glow",
    ML: "text-green-DEFAULT border-green-DEFAULT/30 bg-green-glow",
    RL: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  };
  return map[cat] ?? "text-text-secondary border-border bg-surface";
}
