# Whole-site refinement — design

Approved by Isaac on 2026-10-08. Scope: make the current Westwood AI Club site more useful, visually cohesive, and reliable across its existing routes without replacing its editorial visual identity.

## Outcomes

- A visitor can understand the club, find a clear way to join, and reach current meeting information from the homepage.
- The site uses only verified club facts from the repository or the club's public Google Site. No fabricated member projects, competitions, officer opinions, or dates.
- Every visible route has a useful state when its content feed is empty or unconfigured.
- The site works on mobile, with keyboard navigation, and with JavaScript disabled. Motion is progressive enhancement.

## Visual direction

Retain the warm paper, serif display type, rust accent, and divided editorial layout established in the September redesign. Increase the sense of finish through spacing, typography, layout rhythm, and clearer calls to action. Avoid a new brand system, stock art, decorative glass effects, and animation that hides content before hydration. Preserve existing contrast and focus treatment.

## Information architecture and content

Keep the existing routes and content model. The header shows Home, Calendar, Speakers, and Leaderboard, plus content routes when they have verified entries. The footer includes the same destinations and club contact links. The homepage explains what the club does, how to join, when and where meetings occur, and where to find archived learning material. Link to the verified presentation and notebook archive on the club's public Google Site rather than inventing a new catalog of unverified items.

Projects, Competitions, News, and Prompt remain reachable by direct link. When their JSON data is empty, each page gives a concise explanation and a relevant next step. Do not create entries for them from unrelated school activities or general AI news. Officer-authored news and student project attribution require actual club submissions.

The official club site confirms the interest form, no membership fee or prior coding requirement, meeting room, and archived slides/notebooks. Its meeting frequency may be older than the current repo copy, so the site must not claim a precise recurring schedule when the calendar is unconfigured.

## Calendar and leaderboard states

The Google Calendar and Google Sheet integrations remain server-side, as implemented. Their local credentials are absent. The calendar and homepage fallback use timeless copy pointing visitors to club updates; they never promise a month already past. The leaderboard accurately distinguishes an unconfigured or empty season from live standings. Setup instructions remain in the README; this pass does not create credentials or publish a live calendar/sheet.

## Implementation boundaries

Use existing Next.js App Router pages, components, JSON data, and design tokens. Make focused changes to shared navigation, homepage sections, empty states, and relevant copy. Add only a small reusable component or data structure if it simplifies multiple pages. Preserve content-source boundaries: Google Calendar for events, Google Sheet for points, JSON for manually curated entries.

## Verification

Run lint and production build. Visit every route in a local browser, including narrow viewport checks for the homepage, navigation, calendar, and leaderboard. Check keyboard focus and basic operation without JavaScript. Verify external links and factual copy against the repo and the club's public Google Site. Record any remaining setup dependency clearly.

## Sources

- Club home: https://sites.google.com/view/westwoodaiclub/home
- Club presentation and code archive: https://sites.google.com/view/westwoodaiclub/more/previous-slides
- Club FAQ: https://sites.google.com/view/westwoodaiclub/more/faq
