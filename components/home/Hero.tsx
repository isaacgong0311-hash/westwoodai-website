import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(182,155,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/logo.png"
            alt="Westwood AI Club logo"
            width={72}
            height={72}
            priority
            className="rounded-full"
          />
          <p className="font-mono text-[11px] text-[#55556a] uppercase tracking-widest">
            Westwood High · Austin, TX
          </p>
        </div>

        <h1
          className="font-serif text-5xl sm:text-6xl leading-[1.1] tracking-tight text-[#e8e8f0] mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Westwood AI Club
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#8888aa] max-w-2xl leading-relaxed mb-8">
          We&apos;re a bunch of students who like messing around with AI. We meet
          every other week in Mr. Kluge&apos;s room, build stuff, enter comps,
          and trade what we&apos;ve been learning. Show up — that&apos;s it.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white transition-colors font-medium"
          >
            Hop in the Discord
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
