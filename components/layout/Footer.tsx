import Link from "next/link";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "Discord", href: "https://discord.gg/7QctqCABR" },
  { label: "Linktree", href: "https://linktr.ee/westwoodhsaiclub" },
  { label: "Email", href: "mailto:wwhs.aiexploration@gmail.com" },
];

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/projects", label: "Projects" },
  { href: "/prompt", label: "Prompt" },
  { href: "/competitions", label: "Compete" },
  { href: "/meetings", label: "Meetings" },
  { href: "/news", label: "News" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1e1e2e] bg-[#0a0a0f] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-sans text-sm text-[#e8e8f0] mb-3">
              Westwood AI Club
            </p>
            <p className="font-mono text-xs text-[#8888aa] leading-relaxed max-w-xs">
              Westwood High School · Austin, TX
              <br />
              Room E1307 · Mr. Kluge
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Pages
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-xs text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1e2e]">
          <p className="font-mono text-[10px] text-[#55556a]">
            © 2026 Westwood AI Club · Austin Independent School District
          </p>
        </div>
      </div>
    </footer>
  );
}
