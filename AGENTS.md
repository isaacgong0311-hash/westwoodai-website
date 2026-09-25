<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project notes

- Content sources: events come from Google Calendar via `lib/calendar.ts` (parsing conventions in README "Events & meetings"); everything else is `data/*.json`, read through `lib/content.ts` (which also decides which pages appear in nav/footer/sitemap). No database.
- All dates must be formatted in club time (`CLUB_TZ` in `lib/utils.ts`) — Vercel renders in UTC.
- Pages must render fully with JS disabled; animation is progressive enhancement only.
- Current roadmap: `docs/superpowers/plans/2026-09-25-calendar-and-full-site.md` (Phases 1–2 done: calendar and content pages; Phase 3 live leaderboard is next).
