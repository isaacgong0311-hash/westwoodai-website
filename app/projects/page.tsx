import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

const projects = projectsData as Project[];

export const metadata = {
  title: "Projects — Westwood AI Club",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <Reveal>
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Stuff people made
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Projects
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Apps, models, half-finished experiments — whatever members are
            cooking. Want yours up here? Drop it in #show-and-tell.
          </p>
        </div>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal delay={0.1}>
          <EmptyState
            title="Nothing here yet"
            description="Projects show up as people submit them. Got something going? Post it in #show-and-tell — doesn't have to be done — and an officer will add it."
            cta={{
              label: "Open Discord",
              href: "https://discord.gg/7QctqCABR",
              external: true,
            }}
          />
          </Reveal>
        ) : (
          <div>{/* project grid would render here */}</div>
        )}
      </div>
    </div>
  );
}
