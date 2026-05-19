import type { Project } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import { categoryColor } from "@/lib/utils";
import { formatShortDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 flex flex-col gap-4 card-glow h-full">
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl">{project.emoji}</span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Badge
            variant={project.status as "active" | "completed" | "demo"}
          >
            {project.status}
          </Badge>
          <span
            className={`inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${categoryColor(project.category)}`}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <h3
          className="font-serif italic text-lg text-[#e8e8f0] mb-1"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          {project.title}
        </h3>
        <p className="font-sans text-sm text-[#8888aa] leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0a0a0f] border border-[#1e1e2e] text-[#55556a]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#1e1e2e]">
        <div>
          <p className="font-mono text-xs text-[#e8e8f0]">{project.author}</p>
          <p className="font-mono text-[10px] text-[#55556a]">
            {formatShortDate(project.date)}
          </p>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6ee7ff] hover:text-[#9cf0ff] transition-colors"
          >
            View ↗
          </a>
        )}
      </div>
    </div>
  );
}
