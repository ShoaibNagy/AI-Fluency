# Adding the next case study

## Where it goes
`index.html` → `<section class="chapter reveal" id="projects">` (currently `06 / 08`,
"Selected repositories"). Same section as Jira Clone and nightcode — don't add a new
top-level section for this, the nav rail and mobile nav both enumerate the 8 existing
sections and a 9th would need updating in three places for no real benefit.

## Steps
1. Open `index.html`, find the `projects-grid` div in the Projects section.
2. Copy one whole `<article class="project-card">…</article>` block (Jira Clone or
   nightcode) as the template — don't write new markup from scratch.
3. Update inside the copy:
   - `project-card__num` → `03`
   - `project-card__title` → the real project name
   - `project-card__desc` → written in the three-beat shape from Week 2 (still flowing
     prose, no visible headers, matching the existing two cards' style):
     - first sentence(s): **the problem** — what was actually broken or missing
     - middle: **what I did and decided** — include at least one real trade-off
     - last: **what came of it** — the concrete outcome, no "results-driven" filler
   - `tag-group` spans → the real stack
   - `icon-link` href → the real repo/demo URL
4. Run `sass styles/main.scss dist/styles.css --style=expanded --no-source-map`
   (only needed if new styling was added — reusing `.project-card` shouldn't require it).
5. Commit, push. GitHub Pages redeploys automatically — no other step.
6. Sanity-check against `where-it-breaks.md`: does the new card's repo link actually
   resolve? Any new external image or font added? Re-run the same checks.

## Next piece named
**Video Editing Platform** — once it ships (MVP working, not just the design diagrams
currently in the repo). Diagrams alone aren't a case study yet; there's no "what came
of it" beat until something real runs.

## Reminder
Ship date isn't fixed yet, so a one-time reminder would just get snoozed. Set a
**recurring monthly check-in** instead — first of the month:

> "Is Video Editing Platform ready to add as a portfolio case study yet? If yes: index.html
> → Projects section → copy a project-card block → three-beat description → push."

Set that in whatever you already check monthly (phone reminders, calendar, Notion) —
screenshot it once it's in as the deliverable evidence. I can't set it for you.

## Claude Project
Keep it. It already has the proof statement and voice card — the next case is a short
conversation against context that already exists, not a rebuild.
