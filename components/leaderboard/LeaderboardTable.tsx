"use client";

import { useState } from "react";
import type { Member } from "@/lib/types";
import Panel from "@/components/ui/Panel";

type SortKey = "points" | "attendance" | "projects" | "competitions";

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
    <div className="rounded-lg border border-rule bg-white p-5 sm:p-7">
      {!seasonStarted && (
        <Panel raised className="px-5 py-4 mb-6 !bg-peach-soft">
          <p className="text-sm text-ink-muted">
            No points have been recorded for the 2026&ndash;27 season yet.
          </p>
        </Panel>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-5 text-sm">
        <span className="font-mono mr-1 text-xs font-semibold text-ink-muted">Sort by</span>
        {cols.map(({ key, label }) => (
          <span key={key} className="flex items-center">
            <button
              onClick={() => setSortBy(key)}
              aria-pressed={sortBy === key}
              className={
                sortBy === key
                  ? "rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white"
                  : "rounded-full border border-rule bg-paper px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
              }
            >
              {label}
            </button>
          </span>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-soft">
              <th scope="col" className="font-mono text-left text-xs text-accent font-bold px-3 py-3 w-8">
                #
              </th>
              <th scope="col" className="font-mono text-left text-xs text-accent font-bold px-3 py-3">
                Member
              </th>
              <th scope="col" aria-sort={sortBy === "attendance" ? "descending" : "none"} className="font-mono text-right text-xs text-accent font-bold px-3 py-3">
                Attendance
              </th>
              <th scope="col" aria-sort={sortBy === "projects" ? "descending" : "none"} className="font-mono text-right text-xs text-accent font-bold px-3 py-3">
                Projects
              </th>
              <th scope="col" aria-sort={sortBy === "competitions" ? "descending" : "none"} className="font-mono text-right text-xs text-accent font-bold px-3 py-3">
                Competitions
              </th>
              <th scope="col" aria-sort={sortBy === "points" ? "descending" : "none"} className="font-mono text-right text-xs text-accent font-bold px-3 py-3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((member, i) => (
              <tr key={member.id} className="border-b border-rule last:border-b-0 hover:bg-paper">
                <td className="px-3 py-4 text-sm font-bold text-accent tabular-nums">{i + 1}</td>
                <td className="px-3 py-4">
                  <p className="text-sm font-bold text-ink">{member.name}</p>
                  <p className="text-xs text-ink-muted">{member.role}</p>
                </td>
                <td className="px-3 py-4 text-right text-sm text-ink tabular-nums">{member.attendance}</td>
                <td className="px-3 py-4 text-right text-sm text-ink tabular-nums">{member.projects}</td>
                <td className="px-3 py-4 text-right text-sm text-ink tabular-nums">{member.competitions}</td>
                <td className="px-3 py-4 text-right text-sm font-semibold text-accent tabular-nums">{member.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-rule">
        {sorted.map((member, i) => (
          <div key={member.id} className="py-4 flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-soft text-xs font-semibold text-accent tabular-nums">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink">{member.name}</p>
              <p className="text-xs text-ink-muted">{member.role}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-accent tabular-nums">{member.points}</p>
              <p className="text-xs text-ink-muted">pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
