import Link from "next/link";

const card = "group relative flex min-h-64 flex-col overflow-hidden rounded-[2rem] border border-ink/5 p-7 shadow-[0_14px_34px_rgba(17,26,51,.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(17,26,51,.12)]";

export default function StartHere() {
  return (
    <section className="px-4 sm:px-6 py-20" aria-labelledby="start-here-title">
      <div className="max-w-7xl mx-auto">
        <div className="mb-9 grid gap-4 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-accent">What happens here</p>
            <h2 id="start-here-title" className="max-w-2xl text-4xl font-black leading-[.98] tracking-[-.055em] text-ink sm:text-6xl">
              Your place to <span className="font-serif font-normal italic text-accent-warm">experiment.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">Come as you are. We learn the ideas behind AI, test them together, and hear how people use them in the real world.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/lessons" className={`${card} bg-blue-soft`}>
            <span aria-hidden="true" className="absolute -right-12 -top-14 size-44 rounded-full border-[20px] border-accent/10" />
            <span className="relative mb-10 inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-sm font-black text-white rotate-[-8deg]">01</span>
            <h3 className="relative text-2xl font-black tracking-tight text-ink">Learn something new.</h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-muted">Start with the basics or follow a deeper idea through the club&apos;s past lessons and code notebooks.</p>
            <span className="relative mt-7 text-sm font-bold text-accent group-hover:underline">Explore the lessons →</span>
          </Link>
          <a href="https://discord.gg/7QctqCABR" target="_blank" rel="noopener noreferrer" className={`${card} bg-peach-soft`}>
            <span aria-hidden="true" className="absolute -right-10 bottom-1 size-40 rotate-12 rounded-[2rem] border-[18px] border-accent-warm/10" />
            <span className="relative mb-10 inline-flex size-11 items-center justify-center rounded-2xl bg-accent-warm text-sm font-black text-white rotate-[7deg]">02</span>
            <h3 className="relative text-2xl font-black tracking-tight text-ink">Try it together.</h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-muted">Ask questions, test ideas, and find other curious people in the club community.</p>
            <span className="relative mt-7 text-sm font-bold text-accent-warm group-hover:underline">Join the conversation ↗</span>
          </a>
          <Link href="/events" className={`${card} bg-lilac-soft`}>
            <span aria-hidden="true" className="absolute -right-8 -top-12 size-40 rounded-full border-[18px] border-[#60479a]/10" />
            <span className="relative mb-10 inline-flex size-11 items-center justify-center rounded-2xl bg-[#60479a] text-sm font-black text-white rotate-[-6deg]">03</span>
            <h3 className="relative text-2xl font-black tracking-tight text-ink">Meet the makers.</h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-muted">Hear from engineers, founders, and researchers who bring AI ideas into the world.</p>
            <span className="relative mt-7 text-sm font-bold text-[#60479a] group-hover:underline">See guest speakers →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
