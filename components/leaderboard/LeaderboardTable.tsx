"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Member } from "@/lib/types";
import Badge from "@/components/ui/Badge";

type SortKey = "points" | "attendance" | "projects" | "competitions";

const medalColors = ["text-yellow-400", "text-zinc-400", "text-amber-700"];

interface LeaderboardTableProps {
  members: Member[];
}

export default function LeaderboardTable({ members }: LeaderboardTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>("points");
  const sorted = [...members].sort((a, b) => b[sortBy] - a[sortBy]);

  const cols: { key: SortKey; label: string }[] = [
    { key: "points", label: "Points" },
    { key: "attendance", label: "Attendance" },
    { key: "projects", label: "Projects" },
    { key: "competitions", label: "Comps" },
  ];

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden">
      {/* Sort tabs */}
      <div className="px-5 py-3 border-b border-[#1e1e2e] flex items-center gap-1 overflow-x-auto">
        <span className="font-mono text-[10px] text-[#55556a] mr-3 shrink-0">
          Sort by:
        </span>
        {cols.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`font-mono text-xs px-3 py-1 rounded-md border transition-all shrink-0 ${
              sortBy === key
                ? "bg-[#b69bff]/10 border-[#b69bff]/30 text-[#b69bff]"
                : "border-[#1e1e2e] text-[#8888aa] hover:text-[#e8e8f0]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e1e2e]">
              <th className="px-5 py-3 text-left font-mono text-[10px] text-[#55556a] uppercase tracking-wider w-12">
                Rank
              </th>
              <th className="px-5 py-3 text-left font-mono text-[10px] text-[#55556a] uppercase tracking-wider">
                Member
              </th>
              <th className="px-5 py-3 text-right font-mono text-[10px] text-[#55556a] uppercase tracking-wider">
                Attendance
              </th>
              <th className="px-5 py-3 text-right font-mono text-[10px] text-[#55556a] uppercase tracking-wider">
                Projects
              </th>
              <th className="px-5 py-3 text-right font-mono text-[10px] text-[#55556a] uppercase tracking-wider">
                Comps
              </th>
              <th className="px-5 py-3 text-right font-mono text-[10px] text-[#b69bff] uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((member, i) => (
              <motion.tr
                key={member.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-[#1e1e2e] hover:bg-[#16161f] transition-colors"
              >
                <td className="px-5 py-4">
                  <span
                    className={`font-mono text-sm font-bold ${medalColors[i] ?? "text-[#55556a]"}`}
                  >
                    {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <p className="font-sans text-sm text-[#e8e8f0] font-medium">
                        {member.name}
                      </p>
                      <p className="font-mono text-[10px] text-[#55556a]">
                        {member.role} · Grade {member.grade}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.attendance}
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.projects}
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.competitions}
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="font-mono text-sm text-[#b69bff] font-semibold">
                    {member.points.toLocaleString()}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-[#1e1e2e]">
        {sorted.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="px-4 py-4 flex items-center gap-3"
          >
            <span className="font-mono text-lg w-8 text-center">
              {i < 3 ? ["🥇", "🥈", "🥉"][i] : <span className="text-[#55556a] text-sm">#{i + 1}</span>}
            </span>
            <span className="text-2xl">{member.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-[#e8e8f0]">{member.name}</p>
              <p className="font-mono text-[10px] text-[#55556a]">
                {member.role}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-[#b69bff] font-semibold">
                {member.points.toLocaleString()}
              </p>
              <p className="font-mono text-[10px] text-[#55556a]">pts</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
