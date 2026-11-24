# Whole-Site Refinement Implementation Plan

> **For agentic workers:** Implement this plan task by task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make the existing Westwood AI Club site clearer, accurate, useful in empty states, and accessible across devices.

**Architecture:** Keep the current Next.js pages and data sources. Update shared navigation and copy, add one homepage resource section, and adjust the leaderboard state. Do not create fictional JSON entries or new integrations.

**Tech Stack:** Next.js 16.2.6 App Router, React 19, Tailwind CSS 4, TypeScript.

---

## File map

- `components/layout/Nav.tsx`: replace the JavaScript-only mobile menu with native `<details>`/`<summary>` so links work without hydration.
- `components/layout/Footer.tsx`: correct the school district and add a verified archive link.
- `components/home/Hero.tsx`, `components/home/MeetingInfo.tsx`, `components/home/NextMeetingCard.tsx`, `components/home/StartHere.tsx`, `app/page.tsx`: clearer join path, accurate meeting fallback, and access to the club archive.
- `data/config.json`, `app/calendar/page.tsx`: timeless schedule fallback copy.
- `app/leaderboard/page.tsx`: label fallback standings clearly.
- `app/projects/page.tsx`, `app/competitions/page.tsx`, `app/news/page.tsx`, `app/prompt/page.tsx`: accurate empty-state copy and useful actions.
- `app/globals.css`: small visual refinements and native menu styling if needed.
- `README.md`: record verified content sources and setup limitations.

## Task 1: Correct factual and time-sensitive content

- [x] Read the installed Next.js docs relevant to client components, links, and CSS before code edits.
- [x] Change `data/config.json` fallback `note` to `Meeting dates aren't listed here yet. Join the mailing list or Discord for the latest updates.`
- [x] Change `components/home/MeetingInfo.tsx` to say `After school` and `See calendar` rather than asserting a recurring frequency without a configured calendar. Keep `4:30 PM` and `E1307` as verified facts.
- [x] Remove `Every other week` from the calendar eyebrow; use the verified time and room.
- [x] Correct `components/layout/Footer.tsx` to `Round Rock ISD` (official school source).
- [x] Run `npm run lint` and `npm run build`; expect zero errors.
- [x] Review this focused copy correction before the final commit.

## Task 2: Improve the first-visit journey

- [x] In `components/home/Hero.tsx`, state that beginners are welcome and joining is free; keep the existing interest form as the primary action.
- [x] In `app/page.tsx`, add a concise `Start here` section after the meeting facts with three clearly named destinations: join via interest form, learn via the verified club presentation/code archive, and explore guest speakers. Use visible links with meaningful labels and the existing serif/line treatment.
- [x] In `components/layout/Footer.tsx`, add the archive under a `Learn` link group or connect group.
- [x] Keep all content visible with JavaScript disabled, and use CSS hover/focus only as enhancement.
- [x] Inspect desktop and narrow viewport screenshots; ensure no overflow or cramped cards.
- [x] Review the first-visit improvements before the final commit.

## Task 3: Make navigation and empty states useful

- [x] Replace the `useState` mobile nav in `components/layout/Nav.tsx` with a native `<details>` element and an accessible `<summary>` label `Menu`; render the current `links` within it. Keep the desktop links and active-route styling. Use CSS for the hamburger decoration if retained.
- [x] Update the four optional-content pages' empty messages: describe the current empty state without promising a past month, and link to the club channel or email where visitors can contribute.
- [x] Make the calendar's empty state direct visitors to the interest form or Discord, using the shared config note.
- [x] When `getLeaderboard()` returns `null`, show a visible notice that live scoring is not connected and the roster is illustrative rather than current standings. Keep the points explainer.
- [x] Verify tab navigation and the mobile menu with JavaScript disabled; ensure every visible link works.
- [x] Review the navigation and state changes before the final commit.

## Task 4: Finish sitewide polish and verify

- [x] Review all public routes in the local browser: `/`, `/calendar`, `/leaderboard`, `/projects`, `/competitions`, `/news`, and `/prompt`.
- [x] Check mobile width and desktop width for the homepage, calendar, and leaderboard; resolve any layout or text problems found.
- [x] Check browser console errors and link destinations. Do not submit the interest form or make external account changes.
- [x] Update `README.md` with the official archive and factual-content policy, plus the note that Calendar/Sheet credentials must be configured by the club.
- [x] Run `npm run lint`, `npm run build`, and `git diff --check`; expect zero errors.
- [x] Commit the final polish and document any unresolved external setup need in the final report.

## Verified external sources

- Club home and interest path: https://sites.google.com/view/westwoodaiclub/home
- Club presentation/code archive: https://sites.google.com/view/westwoodaiclub/more/previous-slides
- Club FAQ: https://sites.google.com/view/westwoodaiclub/more/faq
- School district: https://www.roundrockisd.org/o/westwood
