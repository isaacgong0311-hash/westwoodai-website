# Westwood AI maker-club redesign — design

Approved by Isaac on 2026-10-08 with “yes build it.” This supersedes the visual direction in the September editorial redesign spec. It retains the existing data sources and factual-content policy from the whole-site refinement.

## Purpose

Make the site feel like an active, welcoming high-school AI club rather than a quiet editorial publication. The visitor should quickly see what the club does, how to join, and where to find meetings, learning material, speakers, and student leadership.

## Visual system

Use a deep ink/navy base, warm cream canvas, electric Westwood blue, and rust/orange accents drawn from the existing logo. Typography is bold sans for the main invitation and expressive serif for occasional emphasis. Use oversized headings, layered paper/sticker shapes, small handwritten-feeling labels, and subtle original CSS/SVG line art inspired by AI circuits and the logo's orbit. Do not copy another club's artwork or use photos of people who are not Westwood members.

The page should feel energetic while staying readable: high-contrast text, restrained color areas, generous space, clear grouping, and visible focus. Buttons and cards use rounded corners and tactile hover states. Motion is optional CSS enhancement; no content starts hidden behind JavaScript or an intersection observer. Respect reduced-motion preferences.

## Site structure

The homepage opens with a poster-like hero: student-club identity, a strong invitation, membership facts, join and calendar actions, and a decorative AI/club composition. Follow it with a concise activity strip (learn, build, compete, connect), meeting information, a clear next-meeting state, verified learning archive, speakers, current officers, and history. The content order prioritizes joining and participating over archival facts.

The header has clear navigation and a prominent join link. The mobile menu continues to work natively without JavaScript. The footer becomes a dark invitation and useful directory.

Calendar, leaderboard, and optional-content pages inherit the same color, type, card, badge, and section system. Shared primitives (`PageHeader`, `SectionHeader`, `Button`, `Panel`, `EmptyState`, `Tag`) establish consistency; page-specific layouts remain purposeful. Empty states are engaging but honest. No unverified projects, competitions, officer news, or meeting dates are added.

## Content and data boundaries

Google Calendar remains the event source, Google Sheets the leaderboard source, and JSON the manually curated source for other pages. Missing credentials or empty data keep their truthful fallback states. The club's public slides and code archive remains the verified learning destination. The current officer list and speaker list remain unchanged unless backed by verified information.

## Accessibility and verification

Check desktop and narrow mobile layouts on all public routes, including horizontal overflow. Test keyboard navigation, native mobile menu, readable focus, semantic headings, link labels, and reduced-motion behavior. Confirm server-rendered content and native navigation are present without relying on hydration. Run lint, TypeScript/production build, and diff checks.

## Inspiration, not source assets

- Hack Club (https://hackclub.com/): energetic invitation, tactile community feel, layered compositions.
- Epoch (https://www.epochclub.org/): bold join-first hero and direct participation path.
- Marist AI Club (https://maristai.club/): clear club identity and activity framing.
