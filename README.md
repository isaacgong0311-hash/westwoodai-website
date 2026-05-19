# Westwood AI Club Website

Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.  
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

### Stats — `data/config.json`

```json
"stats": {
  "members": 84,
  "projects": 23,
  "competitions": 11,
  "yearsRunning": 4
}
```

Update these at the start of each semester.

---

### Meetings archive — `data/meetings.json`

```json
{
  "id": "meet-19",
  "date": "2026-09-08",        ← null for TBD
  "topic": "Intro to Neural Networks",
  "presenter": "Shruti Sivaraman",
  "type": "lesson",            ← lesson | speaker | workshop | competition | social
  "slidesUrl": "https://...",  ← null if no slides
  "notes": "Brief recap.",
  "isUpcoming": true           ← true = shown as "Next Up". Only one should be true.
}
```

**To add a new meeting:**
1. Find the current upcoming entry, change `"isUpcoming": false`
2. Add a new object at the top of the array with `"isUpcoming": true`

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
| Instagram | https://www.instagram.com/warriorai/ |
| Discord | https://discord.gg/7QctqCABR |
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
| Framer Motion | Animations |
| Vercel | Hosting |

**Upgrading to a real database later:** all TypeScript interfaces are in `/lib/types.ts`. When you switch to Supabase, replace the JSON imports in each `app/*/page.tsx` with async fetch calls — the component code stays the same.
