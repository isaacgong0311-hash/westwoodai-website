import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(182,155,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <p className="font-mono text-[11px] text-[#55556a] uppercase tracking-widest mb-5">
          Westwood High School · Austin, TX
        </p>

        <h1
          className="font-serif text-5xl sm:text-6xl leading-[1.1] tracking-tight text-[#e8e8f0] mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Westwood AI Club
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#8888aa] max-w-2xl leading-relaxed mb-8">
          A student-run club for learning, building, and competing in AI. We
          meet every other week in Room E1307. New members welcome — no
          prerequisites.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white transition-colors font-medium"
          >
            Join the Discord
          </a>
          <a
            href="https://www.instagram.com/warriorai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#e8e8f0] hover:border-[#b69bff]/40 transition-colors"
          >
            @warriorai
          </a>
        </div>
      </div>
    </section>
  );
}
