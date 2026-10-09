import Link from "next/link";

const items = [
  { label: "When", value: "After school" },
  { label: "Dates", value: "See calendar", sub: "for confirmed events" },
  { label: "Time", value: "4:30 PM" },
  { label: "Where", value: "E1307", sub: "Mr. Kluge's room" },
];

export default function MeetingInfo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-3xl border border-rule bg-white shadow-[0_22px_50px_rgba(17,26,51,.12)]">
      {items.map(({ label, value, sub }) => (
        <div key={label} className="border-b border-r border-rule p-5 sm:p-6 [@media(min-width:640px)]:border-b-0 last:border-r-0">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-accent mb-2">
            {label}
          </p>
          {label === "Dates" ? (
            <Link href="/calendar" className="text-base font-bold text-ink leading-snug underline decoration-rule underline-offset-4 hover:text-accent hover:decoration-accent">{value}</Link>
          ) : (
            <p className="text-base font-bold text-ink leading-snug">{value}</p>
          )}
          {sub && <p className="text-xs text-ink-muted mt-1">{sub}</p>}
        </div>
      ))}
    </div>
  );
}
