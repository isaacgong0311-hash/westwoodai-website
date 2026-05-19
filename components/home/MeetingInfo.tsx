const items = [
  { label: "Cadence", value: "Every other week" },
  { label: "Days", value: "Mon / Wed alternating" },
  { label: "Time", value: "4:30 PM" },
  { label: "Room", value: "E1307 (Kluge)" },
];

export default function MeetingInfo() {
  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#1e1e2e]">
        {items.map(({ label, value }) => (
          <div key={label} className="px-5 py-4">
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-1.5">
              {label}
            </p>
            <p className="font-sans text-sm text-[#e8e8f0]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
