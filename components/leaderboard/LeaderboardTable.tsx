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
    <div>
      {!seasonStarted && (
        <Panel raised className="px-5 py-3 mb-6">
          <p className="text-sm text-ink-muted">
            The 2026&ndash;27 season hasn&rsquo;t started yet &mdash; first
            points go out at the kickoff meeting in August.
          </p>
        </Panel>
      )}

      <div role="group" aria-labelledby="sort-label" className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 text-sm">
        <span id="sort-label" className="text-ink-muted mr-1">Sort by:</span>
        {cols.map(({ key, label }, i) => (
          <span key={key} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-ink-muted">&middot;</span>}
            <button
              type="button"
              onClick={() => setSortBy(key)}
              aria-pressed={sortBy === key}
              className={
                sortBy === key
                  ? "min-h-11 px-2 text-accent font-medium underline underline-offset-4 decoration-2"
                  : "min-h-11 px-2 text-ink-muted hover:text-ink"
              }
            >
              {label}
            </button>
          </span>
        ))}
      </div>

      {/* Announces the new order to screen readers when a sort button is pressed. */}
      <p className="sr-only" role="status">
        Sorted by {cols.find((c) => c.key === sortBy)?.label.toLowerCase()}, highest first.
      </p>

      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            Member leaderboard for the 2026&ndash;27 season, sorted by {sortBy}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3 w-8">
                #
              </th>
              <th scope="col" className="text-left text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3">
                Member
              </th>
              <th scope="col" aria-sort={sortBy === "attendance" ? "descending" : undefined} className="text-right text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3">
                Attendance
              </th>
              <th scope="col" aria-sort={sortBy === "projects" ? "descending" : undefined} className="text-right text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3">
                Projects
              </th>
              <th scope="col" aria-sort={sortBy === "competitions" ? "descending" : undefined} className="text-right text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3">
                Competitions
              </th>
              <th scope="col" aria-sort={sortBy === "points" ? "descending" : undefined} className="text-right text-xs uppercase tracking-wider text-ink-muted font-medium border-b border-rule pb-3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((member, i) => (
              <tr key={member.id} className="border-b border-rule last:border-b-0">
                <td className="py-3.5 text-sm text-ink-muted tabular-nums">{i + 1}</td>
                <td className="py-3.5">
                  <p className="text-sm text-ink">{member.name}</p>
                  <p className="text-xs text-ink-muted">{member.role}</p>
                </td>
                <td className="py-3.5 text-right text-sm text-ink tabular-nums">{member.attendance}</td>
                <td className="py-3.5 text-right text-sm text-ink tabular-nums">{member.projects}</td>
                <td className="py-3.5 text-right text-sm text-ink tabular-nums">{member.competitions}</td>
                <td className="py-3.5 text-right text-sm text-ink tabular-nums">{member.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ol className="md:hidden divide-y divide-rule">
        {sorted.map((member, i) => (
          <li key={member.id} className="py-3 flex items-center gap-3">
            <span className="text-sm text-ink-muted tabular-nums w-5 flex-shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink">{member.name}</p>
              <p className="text-xs text-ink-muted">{member.role}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-ink tabular-nums">{member[sortBy]}</p>
              <p className="text-xs text-ink-muted">{sortBy === "points" ? "pts" : sortBy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
