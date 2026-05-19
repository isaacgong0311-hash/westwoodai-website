"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";

const projects = projectsData as Project[];
const categories = ["All", "LLMs", "CV", "ML", "RL"] as const;

export default function ProjectsPage() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Member Work
          </p>
          <h1
            className="font-serif italic text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Projects
          </h1>
          <p className="font-sans text-[#8888aa] mt-2 text-sm max-w-xl">
            Real things built by real members — no toy demos, no tutorial
            clones.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all ${
                active === cat
                  ? "bg-[#b69bff]/15 border-[#b69bff]/40 text-[#b69bff]"
                  : "border-[#1e1e2e] text-[#8888aa] hover:text-[#e8e8f0] hover:border-[#2e2e45]"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-[#55556a]">
                  {projects.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-[#55556a] text-sm">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
