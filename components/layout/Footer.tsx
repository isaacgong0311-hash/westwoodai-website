import Link from "next/link";
import { siteLinks, sponsor } from "@/lib/content";

const contact = [
  { label: "Interest form", href: "https://forms.gle/m1a5LrzEBHhacpbg6" },
  { label: "Discord", href: "https://discord.gg/7QctqCABR" },
  { label: "Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "GitHub", href: "https://github.com/westwoodai" },
  { label: "wwhs.aiexploration@gmail.com", href: "mailto:wwhs.aiexploration@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-ink">Westwood AI Club</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            A student-run club at Westwood High School in Austin, Texas. We meet after school in Room E1307.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs text-ink-muted">Pages</p>
          <ul className="space-y-2 text-sm">
            {siteLinks().map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-ink hover:text-accent">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs text-ink-muted">Contact</p>
          <ul className="space-y-2 text-sm">
            {contact.map(({ label, href }) => (
              <li key={label}>
                <a href={href} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })} className="break-all text-ink hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-rule px-4 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Westwood AI Club, Round Rock ISD</p>
        <p>Club sponsor: {sponsor}</p>
      </div>
    </footer>
  );
}
