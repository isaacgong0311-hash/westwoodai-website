import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const projects = projectsData as Project[];

export const metadata = {
  title: "Projects — Westwood AI Club",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="What members are building"
          title="Projects"
          description="Apps, models, and experiments members are building. Add yours once it's ready to share."
        />

        {projects.length === 0 ? (
          <EmptyState
            title="Nothing posted yet"
            description="Projects go up here as members share them. If you're working on something, post it in #show-and-tell and an officer will add it."
            cta={{
              label: "Open Discord",
              href: "https://discord.gg/7QctqCABR",
              external: true,
            }}
          />
        ) : (
          <div>{/* project grid renders here once projects.json has entries */}</div>
        )}
      </div>
    </div>
  );
}
