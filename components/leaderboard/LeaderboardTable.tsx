"use client";

import { useState } from "react";
import type { Member } from "@/lib/types";

type SortKey = "points" | "attendance" | "projects" | "competitions";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface LeaderboardTableProps {
  members: Member[];
}

export default function LeaderboardTable({ members }: LeaderboardTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>("points");

  const sorted = [...members].sort((a, b) => {
    const diff = b[sortBy] - a[sortBy];
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  const cols: { key: SortKey; label: string }[] = [
    { key: "points", label: "Points" },
    { key: "attendance", label: "Attendance" },
    { key: "projects", label: "Projects" },
    { key: "competitions", label: "Competitions" },
  ];

  const seasonStarted = members.some((m) => m.points > 0);

  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      {!seasonStarted && (
        <div className="px-5 py-3 border-b border-[#1e1e2e] bg-[#0e0e16]">
          <p className="font-mono text-[11px] text-[#8888aa]">
            2026–27 season hasn&apos;t started yet. First points awarded at the
            kickoff meeting in August.
          </p>
        </div>
      )}

      <div className="px-5 py-3 border-b border-[#1e1e2e] flex items-center gap-1.5 overflow-x-auto">
        <span className="font-mono text-[10px] text-[#55556a] mr-2 shrink-0 uppercase tracking-wider">
          Sort
        </span>
        {cols.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors shrink-0 ${
              sortBy === key
                ? "bg-[#1e1e2e] text-[#e8e8f0]"
                : "text-[#8888aa] hover:text-[#e8e8f0]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e1e2e]">
              <th className="px-5 py-3 text-left font-mono text-[10px] text-[#55556a] uppercase tracking-wider w-12">
                #
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
              <th className="px-5 py-3 text-right font-mono text-[10px] text-[#55556a] uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((member, i) => (
              <tr
                key={member.id}
                className="border-b border-[#1e1e2e] last:border-b-0 hover:bg-[#0e0e16] transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="font-mono text-xs text-[#55556a]">
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border border-[#2e2e45] flex items-center justify-center shrink-0">
                      <span className="font-mono text-[10px] text-[#8888aa]">
                        {initials(member.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm text-[#e8e8f0]">
                        {member.name}
                      </p>
                      <p className="font-mono text-[10px] text-[#55556a]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.attendance}
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.projects}
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.competitions}
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-sm text-[#e8e8f0]">
                  {member.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-[#1e1e2e]">
        {sorted.map((member, i) => (
          <div
            key={member.id}
            className="px-4 py-3 flex items-center gap-3"
          >
            <span className="font-mono text-xs text-[#55556a] w-6">
              {i + 1}
            </span>
            <div className="w-7 h-7 rounded-full border border-[#2e2e45] flex items-center justify-center shrink-0">
              <span className="font-mono text-[10px] text-[#8888aa]">
                {initials(member.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-[#e8e8f0]">{member.name}</p>
              <p className="font-mono text-[10px] text-[#55556a]">
                {member.role}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-[#e8e8f0]">{member.points}</p>
              <p className="font-mono text-[10px] text-[#55556a]">pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
