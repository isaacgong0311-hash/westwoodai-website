import Image from "next/image";
import Button from "@/components/ui/Button";

function ClubArtwork() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[330px] w-full max-w-[460px] sm:h-[440px]">
      <div className="poster-grid absolute inset-6 sm:inset-7 rotate-[5deg] overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-[#365fae] via-[#263d78] to-[#17264c] shadow-[0_30px_90px_rgba(0,0,0,.3)]" />
      <div className="club-orbit absolute left-1/2 top-1/2 size-[240px] sm:size-[340px] -translate-x-1/2 -translate-y-1/2" />
      <div className="club-orbit absolute left-1/2 top-1/2 size-[170px] sm:size-[260px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-1/2 top-1/2 flex size-36 sm:size-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-night/90 shadow-2xl">
        <Image src="/logo.png" alt="" width={154} height={154} priority className="size-28 sm:size-40 object-contain" />
      </div>
      <div className="float-slow absolute left-0 top-7 -rotate-[8deg] rounded-2xl bg-[#f8f6ef] px-5 py-4 text-night shadow-xl">
        <span className="block text-[10px] font-bold tracking-[.2em] text-accent">01 / CLUB MODE</span>
        <span className="block font-serif text-2xl italic leading-none">learn it.</span>
      </div>
      <div className="float-slow-delayed absolute right-0 top-12 rotate-[9deg] rounded-2xl bg-[#ffe9d9] px-5 py-4 text-night shadow-xl">
        <span className="block text-[10px] font-bold tracking-[.2em] text-accent-warm">02 / TRY IT</span>
        <span className="block font-serif text-2xl italic leading-none">build it.</span>
      </div>
      <div className="float-slow absolute bottom-7 left-5 rotate-[7deg] rounded-2xl bg-[#eeeaff] px-5 py-4 text-night shadow-xl">
        <span className="block text-[10px] font-bold tracking-[.2em] text-[#60479a]">03 / TOGETHER</span>
        <span className="block font-serif text-2xl italic leading-none">share it.</span>
      </div>
      <div className="absolute bottom-9 right-3 flex size-20 sm:size-24 rotate-[-12deg] items-center justify-center rounded-full border-2 border-white bg-accent-warm text-center text-xs font-black uppercase leading-tight tracking-wider text-white shadow-xl">
        Westwood<br />AI Club
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div className="poster-grid absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-36 top-6 size-80 rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 size-72 rounded-full bg-accent-warm/20 blur-[90px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9e6ff]">
            <span className="size-2 rounded-full bg-[#ef9863]" /> Westwood High School · Austin, TX
          </p>
          <h1 className="max-w-2xl text-[clamp(3.8rem,8.2vw,7.8rem)] font-black leading-[.88] tracking-[-.075em]">
            Westwood<br />AI <span className="font-serif font-normal italic tracking-[-.04em] text-[#f0ad82]">Club.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-medium leading-snug text-white sm:text-2xl">
            Learn AI. Build ideas. Find your people.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d5e1f7]">
            A student-run space to experiment with AI, meet people who work in the field, and make things together. No experience or membership fee required.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="https://forms.gle/m1a5LrzEBHhacpbg6" external variant="primary" className="!bg-[#f0ad82] !text-night !shadow-[0_7px_0_#a84d25] hover:!bg-white">
              Join the club ↗
            </Button>
            <Button href="/calendar" variant="secondary" className="!border-white/35 !bg-white/10 !text-white hover:!bg-white/20 hover:!text-white">
              Find a meeting →
            </Button>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[.17em] text-[#a9c5ff]">Curiosity is the only prerequisite.</p>
        </div>
        <ClubArtwork />
      </div>
    </section>
  );
}
