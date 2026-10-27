import Link from "next/link";
import ExternalLink from "@/components/ui/ExternalLink";

const socials = [
  { label: "Westwood AI Club on Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "Join our Discord server", href: "https://discord.gg/7QctqCABR" },
  { label: "All club links on Linktree", href: "https://linktr.ee/westwoodhsaiclub" },
  { label: "Email wwhs.aiexploration@gmail.com", href: "mailto:wwhs.aiexploration@gmail.com", external: false },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/leaderboard", label: "Leaderboard" },
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
            <nav aria-label="Footer" className="flex flex-col">
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
            &copy; 2026 Westwood AI Club &middot; Austin Independent School District
          </p>
        </div>
      </div>
    </footer>
  );
}
