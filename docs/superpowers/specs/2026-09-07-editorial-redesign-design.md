# Editorial redesign — design

Companion to the implementation plan already approved for this session
(covers foundations, IA, copy, and a11y verification in full). This doc
records the concrete visual decisions that plan left open, made with the
user via a short Q&A, so Phase 2 has something unambiguous to build against.

## Tokens (already implemented, Phase 0 — `app/globals.css`)

| Token | Value | Role | Contrast on paper |
|---|---|---|---|
| `--color-paper` | `#faf8f5` | page ground | — |
| `--color-paper-raised` | `#f3efe8` | card/table-row fill | — |
| `--color-ink` | `#1a1a18` | headlines, primary text | 16.4:1 |
| `--color-ink-muted` | `#6b6862` | secondary text, interactive borders | 5.2:1 |
| `--color-rule` | `#e3ddd2` | decorative hairlines only (never text/borders) | 1.3:1 — exempt, decorative |
| `--color-accent` | `#a85826` | links, active state, CTA — from the logo's rust | 4.8:1 |

Type: `--font-serif` (Instrument Serif) for display/h2/h3, `--font-sans` (Geist) for everything else. No mono webfont — it was never actually rendering (see Phase 0 commit).

## Hero — masthead

Small logo mark + "WESTWOOD AI CLUB" wordmark, one hairline rule beneath, a one-line location/room fact, then a 2-sentence deck ("A student-run club for anyone curious about how AI actually works. No experience required."), then the CTA row: primary button (interest form) + a plain-text Discord link. No typewriter, no glow, no live-dot. One entrance fade on first paint, nothing on scroll.

## Speakers — editorial list

Section head: "Guest Speakers · 7 since 2023" (computed, not hardcoded — keep the existing logic from `GuestSpeakers.tsx`). Below it, a vertical list — one row per speaker, hairline divider between rows: year (small, `ink-muted`) left-aligned against name (serif, `ink`), title/org on the next line (`ink-muted`), talk title in italic on the line after. No avatar circles, no initials, no card borders, no horizontal scroll gimmick.

## Leaderboard — quiet data table

Sort control becomes small text links ("Sort by: **Points** · Attendance · Projects · Comps") above the table, not pill buttons — same underlying sort logic in `LeaderboardTable.tsx`, restyled only. Table: hairline row dividers, right-aligned tabular numbers (`font-variant-numeric: tabular-nums` on the sans face, no mono needed), member name + role stacked in the first column. The "season hasn't started" banner stays — it's real, useful copy.

Accessibility fix bundled here (from the audit): the page currently says "Click any column to sort" but only a separate button row is clickable. Either wire the `<th>` cells to sort too, or fix the copy to describe the actual control. Decision: fix the copy — the button row is the right interaction pattern for touch, duplicating it onto `<th>` adds complexity for no real gain.

## Navigation

Home / Speakers / Leaderboard only (Phase 3 of the approved plan). No pill/spring animation on the active state — a simple underline or weight change.

## Motion budget

Reduced from ~30 scroll-triggered fades to: one fade on the hero at first paint, and at most one `whileInView` fade per page section (not per row/card within a section — e.g. the speaker list fades in as one block, not 7 times). Everything respects `prefers-reduced-motion` (already wired in Phase 0).

## Explicitly not doing

No cards with hover-glow, no gradient text, no count-up numbers, no marquee, no emoji-as-content, no unicode glyph icons. If an icon is needed (meeting info row), use a real SVG icon or drop the icon and lean on the label.
