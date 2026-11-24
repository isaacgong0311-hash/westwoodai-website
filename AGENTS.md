<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project notes

- Content sources: events come from Google Calendar via `lib/calendar.ts` (parsing conventions in README "Events & meetings"); leaderboard standings come from a private Google Sheet via `lib/leaderboard.ts` (service-account auth in `lib/google-auth.ts`, falls back to `data/members.json`); everything else is `data/*.json`, read through `lib/content.ts` (which also decides which pages appear in nav/footer/sitemap). No database.
- All dates must be formatted in club time (`CLUB_TZ` in `lib/utils.ts`) — Vercel renders in UTC.
- Pages must render fully with JS disabled; animation is progressive enhancement only.
- Current roadmap: `docs/superpowers/plans/2026-09-25-calendar-and-full-site.md` (all three phases built; going live needs the Google setup steps in README).
- Design rules (November 2026 warm-up): the site should feel like a student club, not a company. Headings use the display font (Bricolage Grotesque, `--font-display`, applied to h1-h3 in `app/globals.css`) at `font-bold tracking-tight`; body stays Geist. Lead with real club photos (`data/photos.json`, always with alt text), and use the soft tone fills (`bg-peach-soft`, `bg-blue-soft`, `bg-lilac-soft`) for friendly cards and bands. Write copy in the club's own voice, like its emails ("Hey!", "See you there!"), in plain sentences. Still no rotated stickers, floating animation, blur glows, gradient blobs, italic serif accent words, 3D button shadows, or `rounded-2xl`+ cards; use `rounded-md`/`rounded-lg`, hairline `border-rule` dividers, `font-mono text-xs text-ink-muted` for small labels, and reuse `components/ui/*` (PageHeader, SectionHeader, Button, FileLink) instead of restyling per page.
- Copy rules: plain sentences, no slogans, no em dashes in prose. Page titles are just the page name; `app/layout.tsx` adds " | Westwood AI Club".
- Lessons, events, officers, and FAQ live in `data/lessons.json`, `data/special-events.json`, `data/officers.json`, and `data/faq.json` (see README "How to edit content"). The Playground math is `lib/ml.ts`; keep any data rendered on the server seeded so hydration matches.
