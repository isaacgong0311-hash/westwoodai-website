const items = [
  { label: "When", value: "Every other week" },
  { label: "Days", value: "Mon / Wed", sub: "alternating" },
  { label: "Time", value: "4:30 PM" },
  { label: "Where", value: "E1307", sub: "Mr. Kluge's room" },
];

export default function MeetingInfo() {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-rule divide-x divide-y sm:divide-y-0 divide-rule">
      {items.map(({ label, value, sub }) => (
        <div key={label} className="px-5 py-5 sm:first:pl-0 sm:last:pr-0">
          <dt className="text-xs uppercase tracking-wider text-ink-muted mb-1.5">
            {label}
          </dt>
          <dd className="text-sm text-ink leading-snug">
            {value}
            {sub && <span className="block text-xs text-ink-muted mt-0.5">{sub}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
