import Link from "next/link";

// Static previews of the three labs, drawn as tiny SVGs so the homepage
// doesn't pay for the interactive code.
function LinePreview() {
  const pts = [[10, 72], [22, 64], [30, 66], [42, 52], [50, 50], [62, 40], [70, 42], [82, 28], [90, 24]];
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      <line x1="4" y1="80" x2="96" y2="20" stroke="#f0ad82" strokeWidth="2" strokeLinecap="round" />
      {pts.map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.6" fill="white" />)}
    </svg>
  );
}

function ClusterPreview() {
  const groups = [
    { c: "#8fb1ff", pts: [[22, 30], [28, 24], [18, 22], [30, 34], [24, 38]] },
    { c: "#f0ad82", pts: [[70, 28], [76, 34], [66, 22], [80, 24], [72, 40]] },
    { c: "#b9a6ec", pts: [[46, 72], [54, 78], [40, 80], [52, 66], [60, 74]] },
  ];
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {groups.map((g) => g.pts.map(([x, y]) => <circle key={`${g.c}${x}${y}`} cx={x} cy={y} r="2.6" fill={g.c} />))}
    </svg>
  );
}

function NetworkPreview() {
  const hidden = [22, 41, 59, 78];
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {hidden.map((h) => [36, 64].map((i) => <line key={`${h}${i}`} x1="14" y1={i} x2="50" y2={h} stroke="white" strokeOpacity=".35" strokeWidth="1.2" />))}
      {hidden.map((h) => <line key={h} x1="50" y1={h} x2="86" y2="50" stroke="#f0ad82" strokeOpacity=".7" strokeWidth="1.4" />)}
      {[36, 64].map((i) => <circle key={i} cx="14" cy={i} r="5" fill="white" />)}
      {hidden.map((h) => <circle key={h} cx="50" cy={h} r="4.2" fill="#8fb1ff" />)}
      <circle cx="86" cy="50" r="5.5" fill="#f0ad82" />
    </svg>
  );
}

const LABS = [
  { href: "/playground#fit-a-line", title: "Fit a line", note: "Watch gradient descent find the best fit — or blow up.", art: <LinePreview /> },
  { href: "/playground#find-clusters", title: "Find clusters", note: "k-means groups points nobody labeled.", art: <ClusterPreview /> },
  { href: "/playground#train-a-network", title: "Train a network", note: "Backprop bends a boundary around your data.", art: <NetworkPreview /> },
];

export default function PlaygroundTeaser() {
  return (
    <section aria-labelledby="playground-teaser" className="relative isolate overflow-hidden bg-night px-4 py-20 text-white sm:px-6">
      <div aria-hidden="true" className="poster-grid absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-accent/25 blur-[90px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-4 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#a9c5ff]">New · Playground</p>
            <h2 id="playground-teaser" className="max-w-2xl text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl">
              Train a model <span className="font-serif font-normal italic text-[#f0ad82]">in your browser.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#d5e1f7]">
            Three hands-on labs built from our lessons. No account, no install — click, tweak, and watch the math learn.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {LABS.map((lab, i) => (
            <Link
              key={lab.href}
              href={lab.href}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white/[.06] p-6 backdrop-blur-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[.1]"
            >
              <div className="mb-6 aspect-[4/3] rounded-2xl border border-white/10 bg-night/60 p-4">{lab.art}</div>
              <span className="font-mono text-xs font-bold text-[#a9c5ff]">0{i + 1}</span>
              <h3 className="mt-1 text-2xl font-black tracking-tight">{lab.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#bdccea]">{lab.note}</p>
              <span className="mt-5 text-sm font-bold text-[#f0ad82] group-hover:underline">Open the lab →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
