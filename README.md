# Westwood AI Club Website

Built with Next.js 16, TypeScript, and Tailwind CSS. It replaces the old Google Site
(sites.google.com/view/westwoodaiclub); everything from that site now lives here.  
Deployed on Vercel. All content is in `/data/*.json` — no database needed.

---

## Running locally

```bash
cd westwood-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to edit content

**You never need to touch component code.** Just edit the JSON files in `/data/` and redeploy (or push to GitHub if auto-deploy is set up).

---

### Next meeting — `data/config.json`

This is the most common update you'll make.

```json
"nextMeeting": {
  "date": "2026-09-08",   ← YYYY-MM-DD format, or null if TBD
  "time": "4:30 PM",
  "room": "E1307",
  "teacher": "Mr. Kluge",
  "topic": "Fall Kickoff", ← null if not decided yet
  "note": null             ← Only shown when date is null
}
```

- Set `"date": null` before you know the schedule — the card shows "TBD" with the note.
- Set `"date"` to the real date once you know it.

---

### Meeting slides — `data/slides.json`

After each meeting, add the deck to the **end** of `current.meetings`. Make sure the
deck is shared as "Anyone with the link can view" first.

```json
{
  "number": 6,
  "title": "Reinforcement learning",
  "url": "https://docs.google.com/presentation/d/DECK_ID/edit",
  "date": "2026-12-07"
}
```

- `date` is optional; leave it out rather than guess.
- The last entry is shown as "Latest meeting" with an embedded viewer, and on the homepage.
- **New school year:** move the whole `current` object to the top of `archive`, then
  start a fresh `current` with the new `year` and an empty `meetings` list.
- Colab notebooks and datasets for a year go in that year's `code` list.

---

### Speakers & events — `data/events.json`

Newest first. `kind` is `"speaker"` (shown on the homepage and under Guest speakers)
or `"outreach"`. `photos` is a key into `data/photos.json` → `events`.

### Photos — `public/photos/` + `data/photos.json`

Add the image to `public/photos/`, then add an entry with its `width`, `height`, and
**alt text describing what's in the photo** (required for accessibility). Strip location
data from phone photos before committing.

### Officers — `data/officers.json`

At officer elections, move `current` to the top of `past` and fill in the new team.

### FAQ — `data/faq.json`

Each item is a question `q`, answer `a`, and an optional `link`.

### Links (interest form, Discord, etc.) — `lib/site.ts`

Every outside link is defined once in `LINKS`. The Discord link is the
`tinyurl.com/aicord` short link so officers can change the invite without editing code.

---

### Leaderboard — `data/members.json`

```json
{
  "id": "first-last",
  "name": "First Last",
  "role": "Member",
  "avatar": "🤖",
  "grade": 10,
  "attendance": 5,
  "projects": 1,
  "competitions": 0,
  "points": 200,
  "badges": []
}
```

The table sorts automatically. Just update `"points"` (and the sub-counts) after each meeting.

---

### Projects — `data/projects.json`

```json
{
  "id": "my-project",
  "title": "Project Name",
  "emoji": "🚀",
  "author": "First Last",
  "authorId": "first-last",
  "description": "What it does in 1-2 sentences.",
  "category": "LLMs",   ← LLMs | CV | ML | RL
  "tags": ["Python", "PyTorch"],
  "status": "active",   ← active | completed | demo
  "link": "https://github.com/westwoodai/...",  ← optional
  "date": "2026-09-15"
}
```

---

### Competitions — `data/competitions.json`

```json
{
  "id": "comp-name-year",
  "name": "Competition Name",
  "organizer": "Organizer",
  "type": "external",          ← internal | external
  "deadline": "2026-10-01",
  "difficulty": "intermediate", ← beginner | intermediate | advanced
  "prize": "$500",
  "status": "open",            ← open | forming | upcoming | closed
  "description": "What the competition is about.",
  "link": "https://...",       ← optional
  "participants": ["member-id"]
}
```

---

### News digest — `data/news.json`

```json
{
  "id": "unique-slug",
  "title": "Article headline",
  "source": "The Verge",
  "sourceUrl": "https://theverge.com/...",
  "date": "2026-09-01",
  "summary": "One paragraph summary of the article.",
  "officerTake": "Your take on why this matters to us.",
  "officer": "Your Name",
  "hot": true,          ← true = 🔥 HOT badge
  "category": "LLMs"
}
```

---

### Prompt of the Week — `data/prompt.json`

Replace the `"current"` object each week. Start with an empty `"entries": []` — entries submitted through the site are client-side only for now.

---

## Deploying to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Set **Root Directory** to `westwood-ai` if prompted
4. Deploy

Every push to `main` auto-deploys. Takes about 30 seconds.

---

## Adding a custom domain

Vercel dashboard → your project → Settings → Domains.

---

## Club links

| | |
|---|---|
| Interest form | https://forms.gle/m1a5LrzEBHhacpbg6 |
| Instagram | https://www.instagram.com/warriorai/ |
| Discord | https://tinyurl.com/aicord |
| GitHub | https://github.com/westwoodai |
| Email | wwhs.aiexploration@gmail.com |
| Linktree | https://linktr.ee/westwoodhsaiclub |

---

## Tech stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Vercel | Hosting |

**Upgrading to a real database later:** all TypeScript interfaces are in `/lib/types.ts`. When you switch to Supabase, replace the JSON imports in each `app/*/page.tsx` with async fetch calls — the component code stays the same.
