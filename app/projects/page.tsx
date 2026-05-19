import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";

const projects = projectsData as Project[];

export const metadata = {
  title: "Projects — Westwood AI Club",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Member Work
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Projects
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Things members are building — apps, models, experiments. Want yours
            here? Share it in #show-and-tell on Discord.
          </p>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Member projects will show up here as people submit them. If you're working on something — finished or not — post it in #show-and-tell on Discord and an officer will add it."
            cta={{
              label: "Open Discord",
              href: "https://discord.gg/7QctqCABR",
              external: true,
            }}
          />
        ) : (
          <div>{/* project grid would render here */}</div>
        )}
      </div>
    </div>
  );
}
