# Westwood AI Club Website

Built with Next.js 16, TypeScript, and Tailwind CSS. Deployed on Vercel.  
Events come from the club's **Google Calendar**; everything else is in `/data/*.json` — no database needed.

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

### Events & meetings — Google Calendar

The Calendar page, the homepage "Up next" card, and the past-meetings archive
all read from the club's public Google Calendar. **Officers never need to touch
code or redeploy** — add or edit an event in Google Calendar and the site
updates within ~15 minutes.

**Adding an event:**

- **Title** → the topic ("Intro to Neural Networks")
- **Location** → the room ("E1307"). Leave blank to use the default room from `data/config.json`.
- **Recurring meetings** → use Google's "Repeat" (e.g. every 2 weeks). Edit or cancel one date without affecting the rest.
- **Description** → optional `key: value` lines at the very top, then anything you want people to read:

```
type: speaker
presenter: Dr. Dean Teffer, Arctic Wolf
slides: https://docs.google.com/presentation/d/...

Bring questions! We'll have pizza.
```

| Key | Values | Default |
|---|---|---|
| `type` | `meeting` · `speaker` · `workshop` · `competition` · `social` · `deadline` | `meeting` |
| `presenter` | any text | — |
| `slides` | a link — shows a "Slides" button (add it after the meeting too) | — |

Events marked **Private** in Google Calendar are hidden from the site.

**One-time setup** (already done if the calendar shows events):

1. From the club Gmail, create a calendar named "Westwood AI Club". In its settings, tick **Make available to public**, and share it with officers ("Make changes to events").
2. In [Google Cloud Console](https://console.cloud.google.com/) (free): create a project → enable the **Google Calendar API** → Credentials → **Create API key** → restrict it to the Calendar API.
3. In Vercel → Project → Settings → Environment Variables, add `GOOGLE_CALENDAR_ID` (calendar settings → "Integrate calendar" → Calendar ID) and `GOOGLE_CALENDAR_API_KEY`. Redeploy once. For local dev: `vercel env pull .env.local` (see `.env.example`).

If those variables are missing or Google is unreachable, the site still builds and shows "Schedule coming soon".

### Meeting defaults — `data/config.json`

Fallbacks for when nothing is on the calendar: default `time`, `room`, `teacher`, and a `note` shown while the schedule is TBD.

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
| Google Calendar API | Events |
| Vercel | Hosting |

**Upgrading to a real database later:** all TypeScript interfaces are in `/lib/types.ts`. When you switch to Supabase, replace the JSON imports in each `app/*/page.tsx` with async fetch calls — the component code stays the same.
