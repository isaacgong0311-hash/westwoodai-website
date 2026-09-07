import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 sm:px-6 py-24">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
          404
        </p>
        <h1
          className="font-serif text-4xl sm:text-5xl text-[#e8e8f0] mb-4"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Nothing at this <span className="italic text-[#7ea3d8]">URL</span>
        </h1>
        <p className="font-sans text-sm text-[#8888aa] leading-relaxed mb-8">
          Whatever you were looking for isn&apos;t here. Might&apos;ve moved,
          might&apos;ve never existed — either way, here&apos;s where to go
          instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all font-medium"
          >
            Back home
          </Link>
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:border-[#7ea3d8]/40 hover:text-[#c8c8e0] transition-all"
          >
            Discord ↗
          </a>
        </div>
      </div>
    </div>
  );
}
