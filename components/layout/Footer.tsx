import Link from "next/link";
import ExternalLink from "@/components/ui/ExternalLink";
import { LINKS } from "@/lib/site";

const socials = [
  { label: "Fill out the interest form", href: LINKS.interestForm },
  { label: "Join our Discord server", href: LINKS.discord },
  { label: "Westwood AI Club on Instagram", href: LINKS.instagram },
  { label: "Club code on GitHub", href: LINKS.github },
  { label: "All club links on Linktree", href: LINKS.linktree },
  { label: `Email ${LINKS.email}`, href: `mailto:${LINKS.email}`, external: false },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/join", label: "Join the club" },
  { href: "/meetings", label: "Meeting slides" },
  { href: "/meetings/archive", label: "Slides & code archive" },
  { href: "/events", label: "Speakers & events" },
  { href: "/officers", label: "Officers & sponsor" },
  { href: "/attendance", label: "Member attendance" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-sm text-ink mb-3">Westwood AI Club</h2>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Westwood High School &middot; Austin, TX
              <br />
              Room E1307 &middot; Mr. Kluge
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-muted mb-4">Pages</h2>
            <nav aria-label="Footer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm text-ink-muted hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink py-2">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-muted mb-4">Connect</h2>
            <div className="flex flex-col">
              {socials.map(({ label, href, external }) => {
                const cls =
                  "text-sm text-ink-muted hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink py-2";
                return external === false ? (
                  <a key={label} href={href} className={cls}>
                    {label}
                  </a>
                ) : (
                  <ExternalLink key={label} href={href} className={cls}>
                    {label}
                  </ExternalLink>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rule">
          <p className="text-xs text-ink-muted">
            {`© ${new Date().getFullYear()} Westwood AI Club · Westwood High School · Round Rock ISD`}
          </p>
        </div>
      </div>
    </footer>
  );
}
