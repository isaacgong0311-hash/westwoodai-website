import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteLinks } from "@/lib/content";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "Discord", href: "https://discord.gg/7QctqCABR" },
  { label: "Lesson archive", href: "https://sites.google.com/view/westwoodaiclub/more/previous-slides" },
  { label: "Email", href: "mailto:wwhs.aiexploration@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="poster-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-8 border-b border-white/20 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#a9c5ff]">Your next idea starts here</p>
            <h2 className="max-w-2xl text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl">Come curious.<br /><span className="font-serif font-normal italic text-[#f0ad82]">Leave inspired.</span></h2>
          </div>
          <Button href="https://forms.gle/m1a5LrzEBHhacpbg6" external variant="primary" className="self-start !bg-[#f0ad82] !text-night !shadow-[0_7px_0_#a84d25] hover:!bg-white">Join Westwood AI ↗</Button>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={44} height={44} className="rounded-full bg-white/10 p-0.5" />
              <p className="text-lg font-black tracking-tight">Westwood AI Club</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#bdccea]">A student-run AI community at Westwood High School. Room E1307 · Austin, Texas.</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#a9c5ff]">Explore</p>
            <div className="flex flex-col gap-3">
              {siteLinks().map(({ href, label }) => (
                <Link key={href} href={href} className="w-fit text-sm font-medium text-white/85 hover:text-[#f0ad82]">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#a9c5ff]">Connect</p>
            <div className="flex flex-col gap-3">
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-fit text-sm font-medium text-white/85 hover:text-[#f0ad82]">{label} ↗</a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/20 pt-6 text-xs text-[#bdccea] sm:flex-row sm:justify-between">
          <p>© 2026 Westwood AI Club · Round Rock ISD</p>
          <p>Made for the curious.</p>
        </div>
      </div>
    </footer>
  );
}
