# Where It Breaks — Personal Portfolio hardening pass

Site: https://shoaibnagy.github.io/Personal-Portfolio/
Repo: https://github.com/ShoaibNagy/Personal-Portfolio

Method: cloned the repo, read the actual source (`index.html`, `scripts/main.js`,
`styles/*.scss`), fetched the live page, checked every external link's real HTTP
status, rendered the compiled site at desktop/tablet/mobile widths, and searched
Google for the site itself. Everything below is evidence-based, not guessed.

## Fixed now

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 1 | **Content permanently invisible if JS fails.** `.reveal`/`.stagger` elements start at `opacity:0` in CSS and are only ever revealed by JavaScript. If `main.js` fails to load (ad blocker, corporate proxy, flaky connection) or JS is disabled, every section below the hero stays blank forever — confirmed by rendering the page with JS removed. | `styles/_animations.scss` unconditional `opacity: 0`; no `<noscript>` or fallback existed | Scoped the hiding to `html.js` (added only by a blocking inline script that runs first). If JS never runs for any reason, content is visible by default instead of stuck hidden. Re-rendered with JS removed to confirm the fix works. |
| 2 | **Broken repo link.** The "Night Code" project card links to `github.com/ShoaibNagy/Night-Code`, which returns a real 404. | `curl` status check: 404. Found via GitHub API that the actual repo is named `nightcode` (no hyphen/caps) — confirmed 200. | Updated the href to the correct repo. |
| 3 | **No social preview.** No Open Graph or Twitter Card tags — sharing the link anywhere (LinkedIn, Slack, Twitter) shows no title/description/image. | `grep` for `og:`/`twitter:` in source: zero matches | Added `og:title`, `og:description`, `og:url`, `og:image`, and Twitter Card tags. |
| 4 | **No favicon.** Unbranded browser tab. | No `<link rel="icon">` in source | Added `favicon.svg`, a simple "SN" monogram in the site's own colors (`#0c1014` / `#c6a15b`), matching the existing nav brand mark. |
| 5 | **No canonical URL.** | Missing from `<head>` | Added `<link rel="canonical">`. |
| 6 | **`backdrop-filter` missing the `-webkit-` prefix.** Blur effect on the mobile topbar silently no-ops on older Safari (falls back to a flat scrim color — not broken, just loses the polish). | `grep` in `_layout.scss`: only unprefixed version present | Added `-webkit-backdrop-filter` alongside it. |

All six are in the diff — `index.html`, `dist/styles.css`, `styles/_animations.scss`,
`styles/_layout.scss`, plus the new `favicon.svg`.

## Known limitations (named, not hidden)

| # | Finding | Why it's not a fix-now |
|---|---|---|
| 1 | **There's no contact form to break.** "Get in Touch" is a `mailto:` link, not a `<form>`. The brief's "submit empty/garbage" test doesn't literally apply — but `mailto:` links fail silently on machines with no configured native mail client (common on Chromebooks, work computers, some mobile setups), which is its own real gap. | Adding a real form means adding a third-party form backend (Formspree, etc.) or a server — a scope decision beyond a hardening pass, not mine to make unilaterally. |
| 2 | **Site isn't findable yet.** Searching "Shoaib Nagy portfolio software engineer" doesn't surface the site at all on page one — it's crowded out by many unrelated people named Shoaib with their own dev portfolios. A `site:shoaibnagy.github.io` search returns nothing either. | The site is new; Google hasn't indexed it yet, and there's no backlink profile. Meta tags help future indexing but don't create it retroactively — this needs time, plus optionally submitting the URL in Google Search Console to speed it up. |
| 3 | **Two hotlinked third-party images** (GitHub contribution graph via `ghchart.rshah.org`, and a GitHub achievement badge). Both are single points of failure — if either free service ever goes down or rate-limits, that image breaks. | Couldn't verify their live reliability directly (my own tooling's network restrictions blocked both during testing, separate from the site's real behavior) — flagging as an architectural risk to be aware of, not a confirmed live failure. |
| 4 | **No authoritative speed score.** Static analysis is genuinely good: total page weight is ~64 KB (28 KB HTML + 28 KB CSS + 8 KB JS), no local images, fonts use `preconnect` + `display=swap` correctly. But that's not the same as a real Lighthouse/PageSpeed number. | I don't have a live-browser speed tool in this environment. **Run this yourself:** [PageSpeed Insights](https://pagespeed.web.dev/), paste the live URL — takes about 30 seconds. |
| 5 | **Real cross-browser/cross-device testing.** I rendered the compiled site at 390px/768px/1440px widths and traced the JS logic by reading the code, but that's not the same as opening it on an actual phone or in actual Safari/Firefox. | Requires a real device/browser, which is exactly the "browser you haven't tested" the brief means — this one's on you. |
| 6 | **LinkedIn link unverified.** LinkedIn blocks automated fetching (robots.txt), so I couldn't confirm the profile URL resolves. | Click it yourself — one click, ten seconds. |
