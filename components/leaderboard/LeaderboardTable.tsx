"use client";

import { useState } from "react";
import type { Member } from "@/lib/types";
import { cn } from "@/lib/cn";

type SortKey = "points" | "attendance" | "projects" | "competitions";

interface LeaderboardTableProps {
  members: Member[];
  /** True when showing the officer roster because live scoring isn't connected; the page explains that itself. */
  preview?: boolean;
}

const COLS: { key: SortKey; label: string }[] = [
  { key: "points", label: "Points" },
  { key: "attendance", label: "Attendance" },
  { key: "projects", label: "Projects" },
  { key: "competitions", label: "Competitions" },
];

export default function LeaderboardTable({ members, preview = false }: LeaderboardTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>("points");

  const sorted = [...members].sort((a, b) => {
    const diff = b[sortBy] - a[sortBy];
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  const seasonStarted = members.some((m) => m.points > 0);
  const th = "px-3 py-2.5 font-mono text-xs font-normal text-ink-muted";

  return (
    <div>
      {!seasonStarted && !preview && (
        <p className="mb-6 border-l-2 border-accent-warm pl-4 text-sm text-ink-muted">
          No points have been recorded for the 2026&ndash;27 season yet.
        </p>
      )}

      <div role="group" aria-label="Sort by" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm">
        <span className="mr-2 text-xs text-ink-muted">Sort by</span>
        {COLS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSortBy(key)}
            aria-pressed={sortBy === key}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              sortBy === key ? "border-ink bg-ink text-white" : "border-rule bg-white text-ink-muted hover:border-ink hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse border-t-2 border-ink">
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className={`${th} w-10 text-left`}>#</th>
              <th scope="col" className={`${th} text-left`}>Member</th>
              {(["attendance", "projects", "competitions", "points"] as const).map((key) => (
                <th key={key} scope="col" aria-sort={sortBy === key ? "descending" : "none"} className={`${th} text-right`}>
                  {COLS.find((c) => c.key === key)?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((member, i) => (
              <tr key={member.id} className="border-b border-rule">
                <td className="px-3 py-3.5 font-mono text-sm text-ink-muted tabular-nums">{i + 1}</td>
                <td className="px-3 py-3.5">
                  <p className="text-sm font-medium text-ink">{member.name}</p>
                  <p className="text-xs text-ink-muted">{member.role}</p>
                </td>
                <td className="px-3 py-3.5 text-right text-sm text-ink tabular-nums">{member.attendance}</td>
                <td className="px-3 py-3.5 text-right text-sm text-ink tabular-nums">{member.projects}</td>
                <td className="px-3 py-3.5 text-right text-sm text-ink tabular-nums">{member.competitions}</td>
                <td className="px-3 py-3.5 text-right text-sm font-semibold text-ink tabular-nums">{member.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ol className="border-t-2 border-ink md:hidden">
        {sorted.map((member, i) => (
          <li key={member.id} className="flex items-center gap-4 border-b border-rule py-3.5">
            <span className="w-6 shrink-0 font-mono text-sm text-ink-muted tabular-nums">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{member.name}</p>
              <p className="text-xs text-ink-muted">{member.role}</p>
            </div>
            <p className="text-right text-sm font-semibold text-ink tabular-nums">
              {member[sortBy]} <span className="font-normal text-ink-muted">{sortBy === "points" ? "pts" : COLS.find((c) => c.key === sortBy)?.label.toLowerCase()}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
