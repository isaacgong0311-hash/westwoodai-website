# Westwood AI Club Website

Built with Next.js 16, TypeScript, and Tailwind CSS. Deployed on Vercel.  
Events come from the club's **Google Calendar**; everything else is in `/data/*.json` — no database needed.

The current visual direction is the [maker-club redesign](docs/superpowers/specs/2026-10-08-maker-club-redesign-design.md): bold Westwood blue/rust identity, original CSS/SVG club artwork, and a join-first homepage. Keep its graphics and motion progressive so every page remains usable without JavaScript or animation.

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

**You never need to touch component code.** Events go in Google Calendar (below); everything else is a JSON file in `/data/` — edit it and push to GitHub (auto-deploys).

Pages with no content yet (empty `[]`, or `"current": null`) stay reachable but are left out of the nav, footer, and sitemap. They appear automatically once you add the first entry.

Only publish verified club information in these files. In particular, don't add a student project, competition entry, officer news note, or prompt result until the member or officer has supplied it.

The Lessons, Events, About, and FAQ pages were moved over from the club's [old Google Site](https://sites.google.com/view/westwoodaiclub/home) in October 2026. The Google Site's Member Attendance page was deliberately not copied (it lists students by name).

The calendar and leaderboard need the club's Google credentials described below. Without them, the calendar shows a schedule pending message and the leaderboard shows the officer roster as a zero-point preview; neither state represents live events or standings.

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

### Leaderboard — Google Form + Sheet

Points are tallied automatically from one **private** Google Sheet (owned by the club Gmail). The site reads it every ~15 minutes. Until it's set up, the page shows `data/members.json` instead.

**The sheet needs three tabs, named exactly:**

| Tab | Columns (row 1 headers) | Who fills it |
|---|---|---|
| `Roster` | `id` · `name` · `role` · `email` (optional) · `show full name` (optional, `TRUE`) | Officers, once per new member |
| `Checkins` | Created by the Google Form — `Timestamp`, `Name`, … | The form, automatically |
| `Awards` | `member id` · `category` · `date` · `note` | Officers, when someone earns points |

- **`role`**: `Member` or an officer title. For privacy (most members are minors), members show as "First L." unless `show full name` is `TRUE`; officers always show full names.
- **`category`** in Awards is one of: `project`, `projectDemo`, `competitionEntry`, `competitionPlacement`, `promptEntry`, `promptWinner`, `lesson` (or the label shown on the leaderboard, e.g. "Competition entry"). Point values are in `lib/points.ts`. Tip: add a dropdown (Data → Data validation) so nobody typos it.

**Check-in form:**

1. Create a Google Form with a **Name** question (dropdown of names from the Roster works best) and a **Code** short-answer question.
2. On the Code question: ⋮ → **Response validation** → Text → *is equal to* → today's code. **Change the code every meeting** and say it out loud in the room.
3. If the school's Google Workspace allows it, turn on **Collect email addresses** (verified) and fill the Roster's `email` column — check-ins then match by email, which stops people checking in friends.
4. Responses → **Link to Sheets** → pick the leaderboard sheet, then rename the new tab to `Checkins`.
5. Put the form's link in `data/config.json` as `"checkinUrl"` — a "Check in" button then appears on the homepage on meeting days.

A check-in counts once per person per day, and only on days that have a club event on the Google Calendar (so an old code can't be reused on a random Tuesday).

**One-time setup** (free):

1. Sheet: File → Settings → **Time zone: (GMT-06:00) Central Time**.
2. [Google Cloud Console](https://console.cloud.google.com/), same project as the calendar: enable the **Google Sheets API** → IAM & Admin → Service Accounts → **Create service account** (no roles needed) → Keys → Add key → **JSON**. A file downloads.
3. Share the sheet with the service account's email (`…@….iam.gserviceaccount.com`) as **Viewer**.
4. In Vercel env vars add `LEADERBOARD_SHEET_ID` (the long ID in the sheet's URL, between `/d/` and `/edit`) and `GOOGLE_SERVICE_ACCOUNT_KEY` (paste the entire JSON file's contents). Redeploy. Treat that JSON like a password — never commit it.

`data/members.json` is still used for the officer list on the homepage.

---

### Lessons — `data/lessons.json`

After each meeting, add its slides to the **first** year in `"years"` (the current school year). At the start of a new school year, add a new year object at the top — the Lessons page shows the first one as "This school year" and the rest as the archive.

```json
{
  "number": 3,                       ← optional; leave out for unnumbered talks
  "title": "Machine learning basics",
  "url": "https://docs.google.com/presentation/d/.../edit",
  "format": "slides",                ← slides | pptx | pdf | notebook | data
  "date": "2026-10-12"               ← optional
}
```

Colab notebooks and datasets go in that year's `"code"` list in the same shape. Make sure each file is shared as "Anyone with the link can view". `"resourcesDoc"` is the officers' AI tools & resources Google Doc.

### Special events — `data/special-events.json`

`"talks"` (newest first) feeds both the Events page and the homepage speaker cards: `id`, `date`, `speaker`, `role`, `org`, `topic` (short, for the homepage), `title` (the talk's full title), and optional `slides: { url, format }`. `"outreach"` lists booths and presentations for younger students: `id`, `date`, `title`, `description`, optional `files: [{ label, url, format }]`.

### About & FAQ — `data/officers.json`, `data/faq.json`

The current officer team is `data/members.json`. When a new team takes over, move the outgoing team into `officers.json` → `"pastTeams"` (newest first) as `{ "year": "2026–27", "officers": [{ "role", "name" }] }`; the homepage club history is built from it. FAQ entries are `{ "question", "answer", "link"?: { "label", "href" } }`.

### Projects — `data/projects.json`

```json
{
  "id": "my-project",
  "title": "Project Name",
  "author": "First Last",
  "authorId": "first-last",
  "description": "What it does in 1-2 sentences.",
  "category": "LLMs",   ← LLMs | CV | ML | RL | Other
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
  "participants": ["member-id"]  ← ids from members.json; shown as names
}
```

Each competition's `deadline` also shows up on the Calendar automatically — don't add it to Google Calendar too.

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

Set `"current"` to the week's challenge (or `null` for none):

```json
{
  "current": {
    "id": "2026-w40",
    "title": "Explain backprop to a 5th grader",
    "description": "What to do, in a sentence or two.",
    "context": "Rules or setup text (line breaks are kept).",
    "postedBy": "Your Name",
    "postedDate": "2026-09-28",
    "deadline": "2026-10-05",
    "difficulty": "medium",   ← easy | medium | hard
    "entries": []
  }
}
```

Members submit in the Discord channel. To feature the best ones on the site, add them to `"entries"` as `{ "id", "author", "authorId", "content", "votes", "submittedAt" }` — they're shown ranked by `votes`.

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
