"use client";

import { motion } from "framer-motion";

// Photo slots — user can swap in real Instagram image URLs
// To get real photos: go to instagram.com/warriorai, right-click any photo → "Copy image address"
const PLACEHOLDER_POSTS = [
  { label: "Meeting", emoji: "🤖" },
  { label: "Competition", emoji: "🏆" },
  { label: "Guest speaker", emoji: "🎤" },
  { label: "STEAM Day", emoji: "🎓" },
  { label: "Project demo", emoji: "💻" },
  { label: "Team photo", emoji: "📸" },
];

export default function InstagramSection() {
  return (
    <section className="px-4 sm:px-6 pb-14">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="border border-[#1e1e2e] rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e2e] bg-[#0a0a0f]">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#e8e8f0]">@warriorai</span>
              <span className="font-mono text-[10px] text-[#3a3a55] border border-[#2e2e45] px-1.5 py-0.5 rounded">
                Instagram
              </span>
            </div>
            <a
              href="https://www.instagram.com/warriorai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#7ea3d8] hover:text-[#c8c8e0] transition-colors"
            >
              Follow ↗
            </a>
          </div>

          {/* Photo grid placeholders */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-[#1e1e2e]">
            {PLACEHOLDER_POSTS.map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/warriorai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#0d0d14] flex flex-col items-center justify-center hover:bg-[#111118] transition-colors duration-200"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                  {post.emoji}
                </span>
                <span className="font-mono text-[9px] text-[#3a3a55] group-hover:text-[#55556a] transition-colors text-center px-1">
                  {post.label}
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-[#0a0a0f] flex items-center justify-between">
            <p className="font-mono text-[10px] text-[#3a3a55]">
              Photos from meetings, comps, and events
            </p>
            <a
              href="https://www.instagram.com/warriorai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[#55556a] hover:text-[#7ea3d8] transition-colors"
            >
              View all posts →
            </a>
          </div>
        </motion.div>

        <p className="mt-2 font-mono text-[9px] text-[#2e2e45] text-right">
          Swap placeholder images with real Instagram photos in InstagramSection.tsx
        </p>
      </div>
    </section>
  );
}
