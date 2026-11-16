## What this is

Step 2 of the kickoff: foundations, before any feature. The quiz itself is not in this pull request. The home page is a placeholder that says the test is being prepared.

Built to the approved plan in `docs/ARCHITECTURE.md`: a static Astro site with no accounts, no database and nothing stored about visitors.

## What is in it

- **Tooling:** Astro 7, TypeScript (strictest settings), ESLint, Prettier, Vitest, Playwright, pnpm.
- **Two languages:** English at `/`, Spanish at `/es/`. All visitor-facing text lives in `src/i18n/`. A test fails if a translation is missing.
- **Environments:** local, preview and staging builds use made-up settings (`config/site.fake.json`) and are blocked from search engines. Only the `main` branch on Cloudflare Pages reads the real settings, and a production build refuses to run until a real domain is set.
- **Security:** a strict Content-Security-Policy and the other security headers, generated into `_headers`; `/.well-known/security.txt`; `robots.txt`. Pages contain no inline scripts or styles.
- **Error tracking:** Sentry, loaded only when a DSN is configured, collecting the minimum and scrubbing reports before they leave the browser.
- **Ads and paid links, switched off:** the `AdSlot` component (reserves its size; shows a dashed placeholder outside production), `/ads.txt` from config, the `AffiliateLink` component (always `rel="sponsored noopener"` with the disclosure beside the link), and the `/go/<slug>` redirect function that logs clicks with no personal data.
- **Privacy policy and terms** in both languages. The policy's list of outside companies is generated from the config, and the build refuses an ad network or paid link whose company is not in that list.
- **CI:** lint, type check, unit tests, build, end-to-end tests, secret scan (gitleaks) and dependency scan (OSV-Scanner) on every pull request. Third-party actions are pinned to full commit hashes; workflow permissions are read-only by default.
- **Docs:** README, the Commands section of CLAUDE.md, five decision records, and `docs/OWNER_SETUP.md` with the account setup steps only the owner can do.

## What is not verified

- **CI has not run yet.** The workflow file is written but GitHub has never executed it. The secret scan and the OSV dependency scan exist only in CI and were not run locally. This pull request's first CI run is the test.
- **Nothing is deployed.** Cloudflare Pages, Sentry and Better Stack need the owner's accounts (`docs/OWNER_SETUP.md`). The Cloudflare build command in that document is untested.
- **The live ad path has never shown a real ad.** `src/scripts/ads.ts` and the AdSense host list in the Content-Security-Policy cannot be tested without an AdSense account. Ads are off, and `docs/decisions/0002` lists what must be checked before they are turned on.
- **Branch protection is not on yet.** It is Part 3 of `docs/OWNER_SETUP.md`.
- **The privacy policy and terms are drafts** written by a coding agent, not a lawyer.

## Changes from the approved architecture

- No CODEOWNERS file. GitHub does not let anyone approve their own pull request, so required approvals would block every merge for a team of one. See `docs/decisions/0004`.
- One dependency override: `minimatch` is forced to 11.x because ESLint 10.14 still asks for a version with a moderate advisory (GHSA-g3hv-75wg-m249). ESLint 10.15.0 fixes it but was less than 3 days old. The override says when to delete it.

## Dependencies added, and why

All were resolved by pnpm with a 3-day minimum release age, so none is a version published in the last 3 days.

| Package | Why it is here |
| --- | --- |
| `astro` | The site framework chosen in the architecture. |
| `zod` | Validates the site config at build time. |
| `@sentry/browser` | Error tracking, as chosen in the architecture. Loaded only when a DSN is set. |
| `typescript`, `@astrojs/check`, `@types/node` | Type checking. TypeScript is held at 6.0.x because `@astrojs/check` and `typescript-eslint` do not support 7 yet. |
| `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, `globals` | Linting. |
| `prettier`, `prettier-plugin-astro` | Formatting. |
| `vitest` | Unit tests. |
| `@playwright/test`, `@axe-core/playwright` | End-to-end and automated accessibility tests. |
| `wrangler` | Cloudflare's local server, so end-to-end tests see the real security headers and the `/go/` function. |

Install scripts from dependencies are blocked. Two packages asked to run one (esbuild, workerd) and both are denied.

## Launch-checklist items ticked in this pull request

- The repo has a short CLAUDE.md listing the commands.
- Coding agents have checks they can run themselves.
- CI workflows pin third-party actions to full commit hashes.
- Development and tests use generated data.

## How to review

1. Read `docs/decisions/` (five short files).
2. Open the Cloudflare preview link and visit `/`, `/es/`, `/privacy/`, `/terms/` and `/dev/components/`.
3. Skim `.github/workflows/ci.yml` and `pnpm-workspace.yaml`.

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 16, 2026.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 69 unit tests passed; 77 end-to-end tests passed, 1 skipped on purpose (the keyboard test does not apply to the phone profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
00:29:07 [types] Generated 81ms
00:29:07 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (45 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  4 passed (4)
      Tests  69 passed (69)
   Start at  00:29:15
   Duration  953ms (import 63%, tests 19%, transform 13%, worker 5%, environment 1%)

00:29:19 [types] Generated 68ms
00:29:19 [build] output: "static"
00:29:19 [build] mode: "static"
00:29:19 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
00:29:19 [build] Collecting build info...
00:29:19 [build] ✓ Completed in 115ms.
00:29:19 [build] Building static entrypoints...
00:29:20 [vite] ✓ built in 402ms
00:29:20 [vite] ✓ built in 238ms
00:29:20 [build] Rearranging server assets...

 generating static routes 
00:29:20   ├─ /404.html (+28ms) 
00:29:20   ├─ /ads.txt (+7ms) 
00:29:20   ├─ /dev/components/index.html (+6ms) 
00:29:20   ├─ /go-links.json (+5ms) 
00:29:20   ├─ /robots.txt (+6ms) 
00:29:20   ├─ /privacy/index.html (+6ms) 
00:29:20   ├─ /es/privacy/index.html (+5ms) 
00:29:20   ├─ /terms/index.html (+4ms) 
00:29:20   ├─ /es/terms/index.html (+4ms) 
00:29:20   ├─ /index.html (+4ms) 
00:29:20   ├─ /es/index.html (+3ms) 
00:29:20 ✓ Completed in 125ms.

00:29:20 [build] ✓ Completed in 870ms.
00:29:20 [site-files] wrote _headers and .well-known/security.txt for the local environment
00:29:20 [build] 8 page(s) built in 1.00s
00:29:20 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-10.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-10", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-10
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 78 tests using 4 workers

  ok  3 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.5s)
  ok  1 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (2.7s)
  ok  2 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (3.1s)
  ok  4 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (3.1s)
  ok  8 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (114ms)
  ok  9 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.1s)
  ok  5 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.5s)
  ok  6 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.4s)
  ok 10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (610ms)
  ok  7 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.2s)
  ok 14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (114ms)
  ok 15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (79ms)
  ok 12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (651ms)
  ok 11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.1s)
  ok 13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.0s)
  ok 16 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (584ms)
  ok 17 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.0s)
  ok 19 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (796ms)
  ok 20 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (841ms)
  ok 18 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.0s)
  ok 21 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (937ms)
  ok 22 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (847ms)
  ok 23 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (772ms)
  ok 24 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (945ms)
  ok 26 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (742ms)
  ok 25 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (966ms)
  ok 27 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok 28 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok 29 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.0s)
  ok 30 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.0s)
  ok 34 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (50ms)
  ok 35 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (33ms)
  ok 31 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (970ms)
  ok 36 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (41ms)
  ok 37 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (31ms)
  ok 39 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (29ms)
  ok 32 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (858ms)
  ok 33 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (843ms)
  ok 38 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.1s)
  ok 40 [phone] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (3.0s)
  ok 41 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.9s)
  ok 42 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.7s)
  ok 43 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (2.4s)
  ok 47 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (73ms)
  ok 44 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (1.9s)
  ok 45 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.0s)
  ok 48 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (657ms)
  ok 49 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (680ms)
  ok 46 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (1.9s)
  ok 53 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (78ms)
  ok 54 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (70ms)
  ok 50 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.1s)
  ok 51 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.1s)
  ok 52 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (637ms)
  -  58 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 55 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (659ms)
  ok 57 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (994ms)
  ok 56 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.1s)
  ok 59 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (776ms)
  ok 60 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (747ms)
  ok 61 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (683ms)
  ok 62 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (674ms)
  ok 64 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (836ms)
  ok 63 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (900ms)
  ok 65 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (668ms)
  ok 66 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok 67 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.0s)
  ok 68 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok 69 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (908ms)
  ok 73 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (46ms)
  ok 74 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (69ms)
  ok 75 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (27ms)
  ok 70 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (794ms)
  ok 77 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (37ms)
  ok 78 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (30ms)
  ok 71 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (916ms)
  ok 72 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (908ms)
  ok 76 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (715ms)

  1 skipped
  77 passed (30.0s)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### A production build with the placeholder domain is refused: exit code 1, as intended

```
$ SITE_ENV=production corepack pnpm build
config/site.production.json still has the placeholder address https://domain-not-chosen.example. Set "siteUrl" to the real domain before building for production.
```

### Secret scan and OSV dependency scan

Not run locally. They run in CI on this pull request; see the checks below.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
