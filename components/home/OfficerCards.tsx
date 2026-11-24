import type { Member } from "@/lib/types";

// Solid brand colors so white initials stay above 4.5:1 contrast.
const AVATAR_TONES = ["bg-accent", "bg-accent-warm", "bg-event-competition", "bg-event-speaker"];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** The current officer team as friendly name cards instead of a table. */
export default function OfficerCards({ officers }: { officers: Member[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {officers.map((m, i) => (
        <li key={m.id} className="flex items-center gap-3 rounded-lg border border-rule bg-white p-4">
          <span
            aria-hidden="true"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-base font-bold text-white ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
          >
            {initials(m.name)}
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-tight text-ink">{m.name}</p>
            <p className="mt-0.5 text-sm leading-snug text-ink-muted">{m.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
