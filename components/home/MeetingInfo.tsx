import Link from "next/link";

const items = [
  { label: "When", value: "After school" },
  { label: "Dates", value: "See calendar", sub: "for confirmed events" },
  { label: "Time", value: "4:30 PM" },
  { label: "Where", value: "E1307", sub: "Mr. Kluge's room" },
];

export default function MeetingInfo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-rule divide-x divide-y sm:divide-y-0 divide-rule">
      {items.map(({ label, value, sub }) => (
        <div key={label} className="px-5 py-5 sm:first:pl-0 sm:last:pr-0">
          <p className="text-xs uppercase tracking-wider text-ink-muted mb-1.5">
            {label}
          </p>
          {label === "Dates" ? (
            <Link href="/calendar" className="text-sm text-accent leading-snug underline decoration-rule underline-offset-4 hover:decoration-accent">{value}</Link>
          ) : (
            <p className="text-sm text-ink leading-snug">{value}</p>
          )}
          {sub && <p className="text-xs text-ink-muted mt-0.5">{sub}</p>}
        </div>
      ))}
    </div>
  );
}
