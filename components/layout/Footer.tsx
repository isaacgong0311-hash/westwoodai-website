import Link from "next/link";
import { siteLinks } from "@/lib/content";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "Discord", href: "https://discord.gg/7QctqCABR" },
  { label: "Linktree", href: "https://linktr.ee/westwoodhsaiclub" },
  { label: "Email", href: "mailto:wwhs.aiexploration@gmail.com" },
];


export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-sm text-ink mb-3">Westwood AI Club</p>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Westwood High School &middot; Austin, TX
              <br />
              Room E1307 &middot; Mr. Kluge
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-4">Pages</p>
            <div className="flex flex-col gap-2">
              {siteLinks().map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm text-ink-muted hover:text-ink">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rule">
          <p className="text-xs text-ink-muted">
            &copy; 2026 Westwood AI Club &middot; Austin Independent School District
          </p>
        </div>
      </div>
    </footer>
  );
}
