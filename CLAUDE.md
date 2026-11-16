# CLAUDE.md: Spanish Civil War Political Ideology Quiz

A quick political compass questionnaire to match personal ideological leanings

Read docs/PROJECT_BRIEF.md for what we're building and docs/LAUNCH_CHECKLIST.md for what “ready to launch” means. Keep this file short; put detail in docs/.

The approved design is docs/ARCHITECTURE.md: a static site with no accounts and no database. The database and sign-in rules below apply only if that ever changes (docs/decisions/0001).

## Commands

Keep these current. Use `corepack pnpm`, which needs no setup; plain `pnpm` works too if it is installed.

- Install: `corepack pnpm install`
- Run locally: `corepack pnpm dev`, then open http://localhost:4321
- Seed fake data: nothing to run. Local, preview and staging builds read `config/site.fake.json` automatically (docs/decisions/0005).
- Test: `corepack pnpm test` (unit). For end-to-end: `corepack pnpm build`, then `corepack pnpm test:e2e`.
- Lint and type check: `corepack pnpm lint` and `corepack pnpm typecheck`
- Build: `corepack pnpm build`
- Everything above in one go: `corepack pnpm check`
- Dependency audit: `corepack pnpm audit --audit-level=moderate`
- Preview the built site with security headers and `/go/` redirects: `corepack pnpm preview`, then open http://127.0.0.1:8788

The secret scan (gitleaks) and the dependency scan (OSV-Scanner) run in CI on every pull request; see .github/workflows/ci.yml.

## Before you call a task done

- Run the checks (unit tests, type check, lint, build, end-to-end tests (playwright), secret scan, dependency scan) and paste their output in the pull request. A summary is not evidence.
- For UI changes, run the end-to-end tests for the affected journeys or check the flow in a browser and attach a screenshot.
- If the change completes a launch-checklist item, tick it in docs/LAUNCH_CHECKLIST.md with the evidence.

## Hard rules

- Never connect to, migrate or change production. Work against local or staging only. Production credentials must never be in your environment.
- Never put secrets in code, commits, logs, test fixtures or chat. Use environment variables and keep .env files out of git.
- Before adding a dependency, confirm it exists on the registry, is widely used and maintained, and say why in the pull request. Commit the lockfile. Don't adopt a package version published less than 3 days ago.
- Pin third-party GitHub Actions to a full commit hash and give workflows the minimum permissions.
- Changes touching sign-in and permissions, payments, data access and queries, infrastructure and ci, database migrations need a human review from Solrac before merge.
- Ask before adding any paid service or changing infrastructure.

## How we work

- One feature per branch and pull request, in small commits with clear messages.
- Anything over about a day of work starts with a spec in docs/specs/<feature>.md that ends with how we'll verify it end to end.
- Write tests for core logic with each feature.
- Record architecture decisions in docs/decisions/, one short file each: context, decision, reason.
- Keep the README good enough that a new engineer runs the app locally in under an hour.
- Delete dead code and abandoned attempts; don't leave old versions beside new ones.

## Data and code conventions

- Validate every input on the server with a schema (Zod or Pydantic). Never trust the client.
- Use parameterized queries or the ORM; never build SQL from strings. Templates escape output.
- Scope every query to the signed-in user, and add a two-account test for each endpoint that reads or writes user data.
- Row-level security is on for every table, with policies tested using only the public (anon) key and a second user's session.
- Store timestamps in UTC. Store each user's IANA time zone for anything scheduled in local time.
- Migrations are versioned and reviewed, with a way back. Avoid locking large tables (create indexes concurrently).
- Deletes go to a trash first, with a scheduled purge.
- Logs are structured JSON with a request ID. Never log passwords, tokens or card numbers.
- Every screen has empty, loading and error states; error messages tell the user what to do; forms keep what was typed after a validation error.
- Use semantic HTML and keep every flow usable by keyboard and screen reader (WCAG 2.2 AA).
- No hard-coded user-facing text; format dates, numbers and money with Intl.

## Ads and affiliate links

- Render every ad through one component (for example src/components/AdSlot) that reserves the slot's size so ads never shift the layout, and lazy-loads slots below the fold.
- Load the consent tool before any ad or analytics script. Until a visitor consents, or when they opt out or send a Global Privacy Control signal, request non-personalized ads only and set no advertising cookies.
- Never show ads on sign-in, account, checkout, settings, admin, error or thank-you pages, or in emails. Keep ads away from buttons, menus and download links, and never add text or design that invites clicks on ads.
- Serve /ads.txt at the site root from config, with a line for every network that sells the site's ad space.
- Ad scripts are third-party code: keep them off pages that handle personal or payment data, and allow only the ad networks' domains in the Content-Security-Policy.
- Send every affiliate and partner link through one helper (for example /go/<slug>) that adds tracking parameters, logs the click and renders rel="sponsored noopener".
- Put a short disclosure such as “Paid link” or “We earn a commission if you buy through this link” next to every affiliate link and sponsored item, not only on a separate page.
- Pages children may use get contextual ads only and are marked child-directed in every ad network.
- Track revenue per thousand pageviews, affiliate clicks and conversions per page, and keep pages with ads within Google's “good” Core Web Vitals.
- The privacy policy names every ad, affiliate and analytics partner and the cookies they set; update it whenever one is added.

## Built to scale

- Slow work (email, exports, AI calls) runs in background jobs, not inside the request.
- Every outside call has a timeout; a failing dependency degrades one feature, not the whole app.
- New features ship behind a flag with a kill switch, rolled out to a small group first.
- Load test the key journeys at two to three times expected peak before launch.
