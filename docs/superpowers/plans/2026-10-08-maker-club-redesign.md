# Maker-Club Redesign Implementation Plan

> **For agentic workers:** Implement this plan task by task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Turn the current editorial Westwood AI Club site into an energetic, coherent student-club experience while preserving verified content and server-rendered access.

**Architecture:** Keep the existing Next.js routes and content sources. Establish a new set of Tailwind theme tokens and shared component styles, then compose a stronger homepage and apply the same system to inner pages. Use CSS/SVG decoration instead of copied external artwork or fictional club photos.

**Tech Stack:** Next.js 16.2.6 App Router, React 19, Tailwind CSS 4, TypeScript.

---

## File map

- `app/globals.css`: color tokens, background details, hover/motion utilities.
- `components/ui/{Button,Panel,PageHeader,SectionHeader,EmptyState,Tag}.tsx`: shared visual system.
- `components/layout/{Nav,Footer}.tsx`: branded navigation, join action, dark footer.
- `components/home/{Hero,MeetingInfo,NextMeetingCard,StartHere,GuestSpeakers}.tsx` and `app/page.tsx`: poster-like homepage and reordered activity sections.
- `app/{calendar,leaderboard,projects,competitions,news,prompt}/page.tsx`: sitewide layout and empty-state treatment.
- `components/calendar/{AgendaList,MonthGrid,EventChip,SubscribeLinks}.tsx`, `components/leaderboard/{LeaderboardTable,PointsBreakdown}.tsx`: detailed data views that match the new system.
- `README.md`: point future editors to the new design spec and no-fabrication rule.

## Task 1: Establish the new theme

- [x] Read installed Next.js docs for Tailwind/CSS and Server/Client Component boundaries.
- [x] Replace the warm-paper-only theme tokens with navy, cream, blue, rust, lilac, and high-contrast muted text. Preserve event colors and focus visibility.
- [x] Add only CSS effects needed for the design: subtle grid/noise-like paper background, orbit-line decoration, hover lift, and a restrained entrance animation. Keep all content visible without JavaScript and disable motion for reduced-motion users.
- [x] Restyle Button, Panel, PageHeader, SectionHeader, EmptyState, and Tag to use rounded, tactile geometry and clear hierarchy.
- [x] Run `npm run lint` and `npm run build`; expect zero errors.

## Task 2: Rebuild the homepage and site chrome

- [x] Make the header clearer and add a prominent join link while keeping the native `<details>` mobile menu.
- [x] Rebuild Hero as a large poster-like invitation with a CSS/SVG club composition, concise verified copy, and join/calendar actions.
- [x] Present the verified learn/build/compete/connect activities without implying current published projects or events. Rework StartHere as a learning/join invitation, MeetingInfo and NextMeetingCard as useful meeting states.
- [x] Give GuestSpeakers an expressive archive layout and keep names/topics intact. Keep officers and history factual, but improve scanability and order.
- [x] Rebuild Footer as a dark, clear closing invitation with navigation and social links.
- [x] Review desktop and mobile screenshots; ensure there is no horizontal overflow.

## Task 3: Carry the system through every route

- [x] Restyle page headers and route containers consistently across Calendar, Leaderboard, Projects, Competitions, News, and Prompt.
- [x] Update the calendar grid/list/subscribe controls and leaderboard table/points explainer so dense information remains readable at both breakpoints.
- [x] Give empty routes purposeful, honest callouts with relevant next actions. Do not insert fabricated JSON entries.
- [x] Verify each route's h1, labels, keyboard focus, and link destinations.

## Task 4: Final verification and documentation

- [x] Inspect all routes at desktop and 390px mobile width, including their empty and fallback states. Check browser console for errors.
- [x] Verify native mobile menu by keyboard and confirm server HTML contains key content and links before hydration.
- [x] Confirm reduced-motion CSS applies and no content is hidden by animation.
- [x] Run `npm run lint`, `npm run build`, and `git diff --check`; expect zero errors.
- [x] Update README with the design decision, record any external Google setup still needed, and commit the implementation.
