# Westwood AI Club site — work plan to "fully functional"

## Context

The site (`westwood-ai/`, Next.js 16.2 App Router, Tailwind v4, deployed to Vercel project `westwoodai-website2`) is a good-looking shell but mostly static:

- Meeting info is duplicated and hand-edited in two places: `data/config.json` → `nextMeeting` and `data/meetings.json` (`isUpcoming` flag). Both are currently empty/TBD.
- `/projects`, `/competitions`, `/news`, `/prompt`, `/meetings` exist but render placeholders (`{/* list renders here */}`) and aren't in the nav (`components/layout/Nav.tsx` only has Home / Speakers / Leaderboard).
- Leaderboard points in `data/members.json` are hand-typed; all zero.
- Every content change needs a git push, so only people with repo access can update anything.

Goal: a club site officers can run **without touching code**, with a real calendar of meetings/events that members can subscribe to on their phones. Decisions made with Isaac:
- **Google Calendar is the source of truth for events** (officers already know it; free; subscribable).
- Ship in phases: **Calendar first**, then **fill in the hidden pages**, then **live leaderboard**.
- Stay on free tiers (Google Cloud API key / service account, Vercel Hobby). Keep the existing editorial "warm paper" design (see `docs/superpowers/specs/2026-09-07-editorial-redesign-design.md`) — no restyle. Content must render with JS disabled.

Step 0 of execution: copy this plan into `docs/superpowers/plans/2026-09-25-calendar-and-full-site.md` so Codex/Claude sessions can pick it up from the repo.

---

## Phase 1 — Calendar (ship first)

### 1a. One-time setup (Isaac/officers, ~15 min, not code)
1. Create a Google Calendar "Westwood AI Club" from the club Gmail (`wwhs.aiexploration@gmail.com`); share with officers as "Make changes to events"; set **Make available to public**.
2. Google Cloud Console (free): new project → enable **Google Calendar API** → create an **API key** restricted to Calendar API.
3. Add Vercel env vars (Production + Preview + Development): `GOOGLE_CALENDAR_ID`, `GOOGLE_CALENDAR_API_KEY`. Pull locally with `vercel env pull .env.local`.
4. Event convention for officers (documented in README): title = topic; location = room; optional `key: value` lines at the top of the description:
   ```
   type: speaker        # meeting | speaker | workshop | competition | social | deadline
   presenter: Dr. Dean Teffer
   slides: https://...
   ```
   Anything below those lines is the public description. No tags → `type: meeting`.

### 1b. Data layer — new `lib/calendar.ts`
- `ClubEvent` type added to `lib/types.ts`: `id, title, type, start, end, allDay, location, presenter?, slidesUrl?, description?, htmlLink`.
- `fetchEvents({ timeMin, timeMax })` → Calendar API v3 `events.list` with `singleEvents=true&orderBy=startTime` (expands recurring "every other Monday" series for us), server-side only so the key never ships to the browser. Use `fetch(..., { next: { revalidate: 900, tags: ["calendar"] } })` (this project doesn't enable `cacheComponents`, so use the previous caching model — check `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components*` before writing).
- `parseDescription()` pulls the `key: value` header lines; strips HTML Google sometimes injects.
- Helpers: `getUpcomingEvents(limit)`, `getNextMeeting()`, `getEventsForMonth(yyyy, mm)`, `getPastMeetings()`, `getEvent(id)`.
- **Failure mode:** missing env vars or API error → log + return `[]`; pages fall back to `EmptyState`. The build must never fail because Google is down.
- **Timezone bug to fix while here:** Vercel runs in UTC. All formatting must pass `timeZone: "America/Chicago"`. Update `formatDate`/`formatShortDate`/`daysUntil` in `lib/utils.ts` to do this (today `new Date("2026-09-08")` is UTC midnight = the previous evening in Austin). Add `formatTime`, `formatRange`.

### 1c. UI
- **`app/calendar/page.tsx`** (server component)
  - Month grid (desktop) driven by `?month=2026-10` search param with prev/next `<Link>`s → works with zero client JS. Today highlighted with `accent`; each day cell lists event chips color-coded by `type` (reuse the existing `typeLabels` idea from `app/meetings/page.tsx`, move it to `lib/calendar.ts`).
  - Agenda list (default on mobile, below the grid on desktop): upcoming events grouped by week.
  - "Past meetings" section below: topic, presenter, slides link — replaces the `meetings.json` archive.
  - Subscribe bar: "Add to Google Calendar" (`https://calendar.google.com/calendar/render?cid=<id>`) and "Apple / Outlook" (`webcal://` version of Google's public `.ics` URL).
- **`app/calendar/[id]/page.tsx`**: event detail (date/time/room/presenter/description/slides), per-event "Add to Google Calendar" template link, `generateMetadata` for nice link previews when shared in Discord/Insta. `notFound()` if the id doesn't exist.
- New components under `components/calendar/`: `MonthGrid.tsx`, `AgendaList.tsx`, `EventChip.tsx`, `SubscribeLinks.tsx`. Use existing primitives `Panel`, `PageHeader`, `SectionHeader`, `EmptyState`, `Button`, `cn`.
- Motion (optional polish, progressive enhancement only): subtle hover lift on chips via CSS transitions. No Framer Motion needed (README mentions it but it isn't installed — fix README).

### 1d. Wire it into the rest of the site
- `components/home/NextMeetingCard.tsx`: take a `ClubEvent | null` from `getNextMeeting()`; fall back to `config.json` `nextMeeting` (room/teacher/note) when the calendar has nothing. Add "See full calendar →" link. Homepage already has `revalidate = 3600`; lower to 900 to match.
- Home page: add a compact "Coming up" list (next 3 events) under the officers block.
- `Nav.tsx`: add `Calendar` link (+ `isActive` for `/calendar`).
- `next.config.ts`: `redirects()` `/meetings` → `/calendar` (permanent). Delete `app/meetings/page.tsx` and `data/meetings.json`; remove `Meeting` type + `nextMeeting.date/topic` from `SiteConfig` (keep time/room/teacher/note as defaults).
- `app/sitemap.ts`: add `/calendar`.
- README: replace the "Next meeting"/"Meetings archive" sections with "How to add an event" (Google Calendar steps + description convention).

---

## Phase 2 — Fill in the hidden pages

Content stays in `data/*.json` (low edit frequency, fine for now). For each page, replace the placeholder `<div>{/* ... */}</div>` with a real list using the existing editorial patterns (divided rows like the meetings archive, `Panel` for featured items):

| Page | Render | Extra |
|---|---|---|
| `/projects` | card grid, filter chips by `category` (search-param based, no JS required) | link to GitHub |
| `/competitions` | open/forming first, sorted by `deadline`; status + difficulty pills; "N days left" via `daysUntil` | **deadlines also appear on the calendar** (merge in `lib/calendar.ts` as `type: "deadline"` events) |
| `/news` | reverse-chronological list; 🔥 hot badge; officer take in a quote style | — |
| `/prompt` | current challenge card (title, context, deadline, difficulty) | "Submit" button → club Discord channel (real submissions deferred) |

- **Nav:** keep it short. Primary: Home · Calendar · Projects · Competitions · Leaderboard. News + Prompt go in the `Footer`. Pass a "has content" flag from `app/layout.tsx` so a nav item is hidden while its JSON is empty (avoids linking to empty pages — same reasoning as the current `sitemap.ts` comment).
- `sitemap.ts`: include each route only when its data is non-empty.
- Fix type drift: `Project.category` includes `"Other"` but README doesn't; README `Member` has `avatar/grade/badges` that the type doesn't. Align README to `lib/types.ts`.

---

## Phase 3 — Live leaderboard (attendance check-in)

Free, officer-friendly, no database: **Google Form → Google Sheet → site**.

1. **Check-in form** (Google Form): name (dropdown from roster) + "today's code". Use Forms' built-in *response validation* ("text equals `<code>`"); an officer changes the code at each meeting and announces it verbally. If the school Google Workspace allows it, restrict the form to the school domain + collect verified email (prevents checking in friends).
2. **Sheet** (private, owned by club Gmail) with tabs: `Checkins` (form responses), `Roster` (id, display name, role), `Awards` (member id, category from `PointsBreakdown`, date, note — officers log projects/competitions/presentations here).
3. **Server read:** Google Cloud **service account** (free) given Viewer access to the sheet; JSON key → Vercel env `GOOGLE_SERVICE_ACCOUNT_KEY`, `LEADERBOARD_SHEET_ID`. New `lib/leaderboard.ts` uses `google-auth-library` + Sheets API `values.batchGet`, cached `revalidate: 900`. Sheet stays private (emails never exposed).
4. **Scoring** in `lib/leaderboard.ts`: move the point table out of `components/leaderboard/PointsBreakdown.tsx` into `lib/points.ts` (single source of truth, component imports it). A check-in counts only if its timestamp falls on the date of a `meeting`-type calendar event (ties Phase 1 in; blocks off-day check-ins). Dedupe one check-in per member per meeting.
5. `app/leaderboard/page.tsx` swaps `members.json` for `getLeaderboard()`; falls back to `members.json` if env vars are missing. `LeaderboardTable` needs no changes (same `Member` shape).
6. **Privacy (minors):** show first name + last initial for non-officers unless the roster row opts in to full name. Confirm with the club sponsor (Mr. Kluge) before launch.

---

## Critical files

- New: `lib/calendar.ts`, `lib/leaderboard.ts`, `lib/points.ts`, `app/calendar/page.tsx`, `app/calendar/[id]/page.tsx`, `components/calendar/*`
- Modified: `lib/types.ts`, `lib/utils.ts`, `components/home/NextMeetingCard.tsx`, `app/page.tsx`, `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `app/layout.tsx`, `next.config.ts`, `app/sitemap.ts`, `app/{projects,competitions,news,prompt,leaderboard}/page.tsx`, `components/leaderboard/PointsBreakdown.tsx`, `README.md`, `.env.example` (new, documents env vars)
- Removed: `app/meetings/page.tsx`, `data/meetings.json`

## Cost
All free: Google Calendar/Sheets APIs are well within free quotas at 15-min caching; Vercel Hobby covers ISR. Only possible paid item: a custom domain (~$12/yr), optional.

## Verification (each phase)
1. `npm run lint` and `npm run build` in `westwood-ai/` — build must pass **with and without** the Google env vars set (fallback path).
2. `preview_start {name: "westwood-ai"}` → check `/`, `/calendar`, `/calendar?month=<next month>`, an event detail page, `/meetings` (redirects). Seed the real calendar with a few test events incl. a recurring biweekly meeting, an all-day deadline, and one with `type: speaker` + `slides:` to confirm parsing, recurrence expansion, and Chicago-time display (an event at 4:30 PM CT must show 4:30 PM, not 9:30 PM).
3. `resize_window` mobile preset → agenda view, no horizontal scroll; disable JS in the check → grid + month nav still work.
4. Subscribe links: open Google link and the `webcal://` link, confirm events appear.
5. Phase 3: submit a test check-in with right/wrong code, on/off a meeting day; confirm leaderboard counts only the valid one after revalidation.
6. Deploy a Vercel preview (`/vercel:deploy`) and re-check before promoting to production.
