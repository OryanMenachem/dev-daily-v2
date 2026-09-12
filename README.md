# SQL Daily 🧠

A tiny daily-habit app for practicing SQL Server. Show a question → reveal the
answer → rate yourself. A simple spaced-repetition engine brings hard questions
back sooner and easy ones later. All data stays on your device.

## Run it

This is a PWA, so it needs to be served over http(s) (a service worker and
`localStorage` do not work reliably from a `file://` page).

Quick local run:

```bash
cd sql-daily
python3 -m http.server 8080
# open http://localhost:8080 in your browser
```

## Install on your Android phone

1. Host the folder somewhere with https — the easiest free option is
   **GitHub Pages** (push the folder to a repo, enable Pages).
2. Open the URL in **Chrome on Android**.
3. Menu (⋮) → **Add to Home screen** / **Install app**.
4. Open it from the home screen — it runs full-screen like a real app and works
   offline.

### Daily reminder
Go to **Settings → Daily reminder**, allow notifications, and pick a time.
The reminder is a local notification (no server). It is scheduled while the app
/ its service worker is alive, which works well for an installed PWA on Android.
If Android ever aggressively kills the background process, just open the app once
and the next reminder re-schedules itself.

## How it's built (very simple)

```
index.html   → UI (the white SSMS-style screens) + view rendering
app.js       → the core engine: session building, spaced repetition,
               progress, settings, notifications. Knows NOTHING about SQL.
content/
  index.js       → the list of available courses (the registry)
  sqlserver.js   → the SQL Server content pack (110 questions)
sw.js        → offline cache
manifest.webmanifest, icons/ → makes it installable
```

The core and the content are fully separated. That is the whole design.

## Add a new subject later (Redis, Docker, NestJS…)

1. Copy `content/sqlserver.js` to e.g. `content/redis.js`, keep the same shape,
   change the `id`, `name`, `schema`, and `questions`.
2. Add its `<script src="content/redis.js"></script>` line in `index.html`
   (next to the sqlserver one).
3. Add its id to the `COURSES` list in `content/index.js`.

That's it — no core changes. The new course appears in **Settings → Course**, and
the same UI, progress, levels, review and notifications keep working.

### Question shape
```js
{
  id:         "q001",
  topic:      "WHERE",
  difficulty: "beginner" | "intermediate" | "advanced",
  question:   "Get all users older than 30.",
  answer:     "SELECT * FROM Users\nWHERE Age > 30;",
  explanation:"WHERE keeps only rows that match. > means greater than."
}
```

## The spaced-repetition rule (Leitner, no AI)

- **Easy** → comes back much later (interval grows).
- **Medium** → comes back a bit later.
- **Hard** → comes back tomorrow.
- **Review Later** → comes back in the same/next session.

Each morning the daily set = questions that are due to review + new questions
from your current level, up to your "questions per day" setting.
