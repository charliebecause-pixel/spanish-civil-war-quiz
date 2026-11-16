# Spanish Civil War Political Ideology Quiz: launch checklist

Generated from the project brief on November 15, 2026. 129 items apply to this app. Tick an item only with evidence: a link, test output or a screenshot. Items marked “new” come from published guidance by Anthropic, OpenAI, Meta, OWASP, Stripe, Google and the FTC; the rest adapt @mardehaym's production checklist. Track it interactively in the readiness form: https://claude.ai/artifact/Ry1i5YfRefPuKXYdaioRzZ

## Before launch (86)

### How the AI builds your app

- [x] The repo has a short CLAUDE.md or AGENTS.md (about 100 lines) listing the commands to build, test and run the app, the conventions agents must follow, and links to deeper docs.
  - Evidence (2026-11-16): CLAUDE.md is under 100 lines, its Commands section is filled in, and it links to docs/ARCHITECTURE.md and docs/decisions/. Every command in it was run in docs/pull-requests/0001-foundations.md.
  - How to check: OpenAI's Codex team kept AGENTS.md to about 100 lines that work as a table of contents. Claude Code's docs say to cut any line whose removal wouldn't cause mistakes, because long files get ignored.
- [x] Coding agents have checks they can run themselves (tests, type check, lint, build, a browser run-through), and work isn't accepted until the agent shows their output.
  - Evidence (2026-11-16): `corepack pnpm check` runs lint, formatting, type check, 69 unit tests, the build and 77 browser tests in one command. Its full output is in docs/pull-requests/0001-foundations.md, and CLAUDE.md requires the same in every pull request.
  - How to check: Claude Code's docs list this first: without a check the agent can run, you become the verification loop. Look for test output or screenshots in each pull request, not the agent's summary.
- [ ] Coding agents work against a development database and environment, never production, and hold no production write credentials.
  - How to check: In July 2025 Replit's agent deleted a live production database during a code freeze; Replit then separated development and production databases automatically. List every credential your agents can reach.
- [ ] Rules that must always hold are enforced by code (CI checks, pre-commit or agent hooks, CODEOWNERS, branch protection), not only written in a prompt or CLAUDE.md.
  - How to check: Claude Code's docs: CLAUDE.md is advisory, hooks are deterministic. Try to merge a change that breaks a rule and confirm it's blocked.
- [ ] Bigger changes start from a written spec or plan, saved in the repo, that ends with an end-to-end check proving the feature works.
  - How to check: Use plan mode, or have the agent interview you and write SPEC.md, then implement in a fresh session.
- [ ] Agents work one feature per branch or pull request, in small commits with clear messages, so any bad change can be reverted on its own.
  - How to check: Check recent pull request sizes. Anthropic's harness has the agent pick one feature per session and commit before stopping.
- [ ] Every diff gets a review in a fresh context (a second agent session or a person) against the plan, and changes to auth, payments, data access or infrastructure always get a human.
  - How to check: Claude Code supports a writer/reviewer split and a /code-review skill. OpenAI's team moved most review to agents, but only at very high throughput; keep people on the paths where one mistake is a breach.
- [ ] Coding agents run with permission allowlists or a sandbox that limits both file and network access, not with approvals switched off on a machine holding real credentials.
  - How to check: Anthropic found sandboxing needs both filesystem and network isolation; it cut permission prompts by 84% internally.
### Data model, identity and access

- [ ] Someone has reviewed the database schema as a whole: keys, foreign keys, constraints, NOT NULL rules and naming.
  - How to check: Dump it with pg_dump --schema-only or view the ER diagram in DBeaver. Look for duplicated fields and missing constraints.
- [ ] Sign-up, login, password reset and invites all work with an email like name+test@domain.com and with mixed case.
  - How to check: Run each flow with a plus-sign address. Watch for + turning into a space in emailed links.
- [ ] Password reset links expire quickly and work only once.
  - How to check: Use a reset link twice, after the expiry window, and after requesting a newer one. All three should fail.
- [ ] Admin and staff accounts require multi-factor authentication.
  - How to check: Try signing in to an admin account with only a password.
- [ ] Sessions expire, and you can sign a user out of every device, which also happens on password change.
  - How to check: Sign in on two browsers, change the password in one, and confirm the other is signed out. Check cookies are HttpOnly, Secure and SameSite.
- [ ] Tested with two accounts: account A can't read or change account B's data by editing an ID in a URL or request.
  - How to check: Replay B's requests using A's session in Burp Suite (Autorize extension) or OWASP ZAP.
- [ ] If the browser talks to your database directly (Supabase or Firebase), row-level security is on for every table and has been tested with only the public key.
  - How to check: In 2025 a scan found 303 exposed endpoints across 170 Lovable-built apps because row-level security was missing or wrong. Query each table with only the anon key, then with a second user's session.
- [ ] Login is rate-limited, and repeated failures slow attackers down without permanently locking out the real user.
  - How to check: Script 50 rapid failed logins and confirm delays or 429 responses, then confirm the real user can still recover the account.
### Database operations

- [ ] Schema changes go through versioned migrations, with a tested way back (a rollback step or a restore point).
  - How to check: Run a migration and its rollback on a staging copy, then compare the schemas.
- [ ] Migrations are checked for table locks before they run against large tables. _(raised because you expect fast growth)_
  - How to check: Lint with Squawk (Postgres) or strong_migrations (Rails). For MySQL, use gh-ost.
- [ ] The busiest queries have indexes, checked against realistic data volumes. _(raised because you expect fast growth)_
  - How to check: Seed production-like volumes and run EXPLAIN ANALYZE. Watch pg_stat_statements for slow queries.
- [ ] Database connections are pooled, or the host provides a pooler. _(raised because you expect fast growth)_
  - How to check: Load test and watch the connection count against max_connections.
- [ ] Automatic daily backups are on, with a copy outside the main account or region.
  - How to check: Check schedule, retention and location in the provider console.
- [ ] A backup has been restored to a fresh database and checked, and you know how long it took.
  - How to check: Restore last night's backup, compare row counts, run a smoke test and record the time.
- [ ] Point-in-time recovery is on and has been tried once.
  - How to check: Delete a test row and restore to one minute before the delete.
### Data correctness

- [ ] Every API endpoint validates input on the server, not only in the browser.
  - How to check: Send malformed and oversized payloads straight to the API with curl or Postman.
- [ ] Times are stored in UTC, scheduled local-time events keep the user's time zone, and daylight-saving changes are tested.
  - How to check: Freeze the clock across a daylight-saving change (freezegun, Sinon) and check reminders fire at the right local time.
- [ ] Apostrophes, emoji, accents and right-to-left text save and display correctly.
  - How to check: Enter O'Brien, emoji and Arabic text in every field. Confirm the database uses a full Unicode character set (utf8mb4 on MySQL).
- [ ] Repeated clicks on submit can't create duplicate records, and the server enforces it.
  - How to check: Fire the same request four times in parallel and count the rows.
- [ ] Long lists use cursor pagination or have been tested deep into the results. _(raised because you expect fast growth)_
  - How to check: Seed a million rows and compare the speed of page 1 and page 400.
### Security and supply chain

- [ ] No secrets in the code, the git history or AI chat transcripts.
  - How to check: Scan the full history with gitleaks or TruffleHog, turn on GitHub push protection, and search exported chats for key prefixes such as sk_live and AKIA.
- [ ] Every key that was ever pasted into a file, repo or chat has been rotated and the old one revoked.
  - How to check: Confirm each old key now fails in the provider's dashboard.
- [ ] Every package the AI installed has been checked: it exists, it's the one intended, and it's established.
  - How to check: Check each dependency's registry page for age, downloads and repository. Use Socket.dev and commit lockfiles.
- [ ] Dependency vulnerability scanning runs automatically.
  - How to check: Turn on Dependabot or Renovate, and run npm audit, OSV-Scanner or Snyk in CI.
- [x] CI workflows pin third-party actions to full commit hashes, and secrets are available only to the jobs that need them.
  - Evidence (2026-11-16): all seven `uses:` lines in .github/workflows/ci.yml end in a 40-character commit hash. The workflow's default permission is `contents: read`. The only secret used is the built-in `GITHUB_TOKEN`, passed to the secret-scan job alone.
  - How to check: In March 2025 the tj-actions/changed-files action was compromised and exposed CI secrets in build logs. Search your workflows for “uses:” lines that end in a version tag instead of a commit hash.
- [ ] Dependency installs are hardened: lockfiles are committed and CI installs from them, new package versions wait a few days before you adopt them, and registry and GitHub accounts use phishing-resistant MFA.
  - How to check: The Shai-Hulud npm worm (from September 2025) spread through install scripts that stole developer tokens. Set pnpm minimumReleaseAge, npm min-release-age, or a Renovate or Dependabot cooldown.
- [ ] Database queries are parameterized, templates escape output, and a security scan has been run.
  - How to check: Run an OWASP ZAP baseline scan and Semgrep. Review any raw SQL or unescaped HTML.
- [ ] CORS only allows your own origins wherever cookies or credentials are involved.
  - How to check: Send a request with Origin: https://evil.example and inspect the response headers.
- [ ] Security headers are set: HSTS, Content-Security-Policy, X-Content-Type-Options and frame protection.
  - How to check: Scan with Mozilla HTTP Observatory or securityheaders.com.
- [ ] Data is encrypted at rest and in transit, including database connections.
  - How to check: Check encryption settings in the cloud console, run SSL Labs, and require TLS for the database.
- [ ] People, services and AI agents have only the access they need, and coding agents don't hold production write credentials.
  - How to check: Review cloud IAM, database roles and the tokens your agents use.
- [ ] Logs and error reports never contain passwords, tokens or card numbers.
  - How to check: Search logs for password=, Bearer and 16-digit numbers. Add redaction and a test that proves it.
### Abuse and fraud

- [ ] Sign-up has bot protection (a challenge such as Cloudflare Turnstile and disposable-email blocking), and limits apply per account and device, not only per IP address.
  - How to check: Script 20 sign-ups from one machine and count how many succeed.
### Assurance and compliance

- [ ] There's a monitored security contact and a /.well-known/security.txt file.
  - How to check: Fetch the file and send a test message to the listed address.
### Environments and deploys

- [ ] Every change runs automated tests before deploy, and a failing test blocks the merge.
  - How to check: Open a pull request with a failing test and confirm it can't merge.
- [ ] A deploy can be rolled back in minutes, and you know how rollback interacts with migrations.
  - How to check: Roll back a harmless deploy and time it.
- [ ] Deploys don't drop requests. _(raised because you expect fast growth)_
  - How to check: Run a request loop or k6 probe during a deploy and count failures.
- [ ] Risky features can ship behind a feature flag. _(raised because you expect fast growth)_
  - How to check: Ship a flagged change to one test user.
- [ ] You know the app's breaking point, and scaling is automatic or planned. _(raised because you expect fast growth)_
  - How to check: Load test with k6 until something fails.
- [ ] Static files are served from a CDN.
  - How to check: Test load times from distant regions with WebPageTest.
- [ ] The domain and TLS certificates renew automatically, with expiry monitoring.
  - How to check: Check auto-renew at the registrar and for certificates. Maximum certificate life falls to 47 days by 2029.
### Background work, email and cost

- [ ] Cloud budgets alert you, and AI providers have hard monthly spend limits.
  - How to check: Set budgets and provider limits. Budget alerts can lag charges by hours, so limits matter more than alerts.
### Monitoring and incidents

- [ ] Logs are structured, carry request IDs, and can be searched. _(raised because you expect fast growth)_
  - How to check: Trace one request end to end in your log tool.
- [ ] Errors are tracked and grouped, with personal data scrubbed.
  - How to check: Throw a test error several times in Sentry or similar and check grouping and scrubbing.
- [ ] An external uptime check alerts you when the app is down.
  - How to check: Take staging down and confirm the alert (UptimeRobot, Better Stack, Checkly).
- [ ] A named person gets alerts on their phone, with a backup person, and alerts are tuned so they aren't ignored.
  - How to check: Send a test alert and confirm someone acknowledges it.
- [ ] A dashboard shows latency, error rate and traffic, with tracing if you run several services. _(raised because you expect fast growth)_
  - How to check: Confirm the dashboard shows a spike during a load test.
### Scaling and reliability

- [ ] Key flows (sign-in, checkout, the core feature) have written reliability and speed targets, and you track how much of that error budget you've used.
  - How to check: Google's SRE practice: set a target such as 99.9% of checkouts succeeding within 2 seconds, and slow down releases when the budget runs out.
- [ ] Every outside limit is listed with headroom for a launch-day spike: database connections and plan size, email sending quota, AI rate limits and spend cap, payment API limits and hosting concurrency.
  - How to check: Make a table of each provider's limit, your current peak and your expected peak.
- [ ] Under overload the app degrades gracefully: queues absorb bursts, timeouts and circuit breakers stop one slow service from taking down the rest, and non-essential features can be switched off.
  - How to check: During a load test, slow down one dependency (Toxiproxy) and confirm the rest of the app keeps working.
- [ ] Releases roll out gradually (internal users or a small percentage first) with a kill switch per feature, and a rollback has been rehearsed this month.
  - How to check: Flip a feature's kill switch in production and time how long it takes to take effect.
- [ ] Product and business numbers (sign-ups, activation, retention, revenue, AI cost) are tracked from launch day.
  - How to check: PostHog, Amplitude or Mixpanel. Confirm one event per key step arrives in the dashboard.
### Testing and accessibility

- [x] Core business logic has unit tests written against the requirements, not just the current behavior.
  - Evidence (2026-11-16): tests/unit/quiz.test.ts has 40 tests that restate the brief (which answer gives which verdict, an answer ends the quiz, "take quiz again" resets, the answer is never stored). Six deliberate breakages of the code were each caught by a failing test; the list is in docs/pull-requests/0002-quiz-flow.md. That was a hand-run spot check, not a mutation-testing tool.
  - How to check: Review tests against the spec and run mutation testing (Stryker, mutmut).
- [ ] End-to-end tests cover signup, checkout and other money flows, and run in CI.
  - How to check: Write Playwright or Cypress tests and run them against staging.
- [ ] The app has been load-tested at two to three times expected peak before a big launch. _(raised because you expect fast growth)_
  - How to check: k6, Artillery or Locust. Include AI calls and background jobs in the test.
- [x] Development and tests use generated data, never raw production copies.
  - Evidence (2026-11-16): everything outside production reads config/site.fake.json. The unit test "the fake config contains only made-up addresses and IDs" (tests/unit/config.test.ts) fails if a real domain or publisher ID is put in it. The site stores no visitor data, so there is no production data to copy.
  - How to check: Seed with Faker, and anonymize any copy you can't avoid.
### Integrations and API

- [ ] Responses from outside APIs are validated, so format changes fail loudly with an alert.
  - How to check: Feed a malformed recorded response through your validation (Zod, Pydantic).
### Product experience

- [ ] Pages load acceptably on a slow connection.
  - How to check: Chrome DevTools network throttling (Slow 4G) and Lighthouse.
- [x] Every screen has empty, loading and error states, with error messages a user can act on.
  - Evidence (2026-11-16): no screen loads data, so there is nothing that can come back empty. While the quiz script is loading, Start is disabled; if it never starts, or JavaScript is off, the page says what to do (tests under "when the quiz cannot start" in tests/e2e/quiz.spec.ts). An unknown address gets a 404 page with a way home in both languages (tests/e2e/pages.spec.ts). Any new screen must keep this true.
  - How to check: Visit each screen with no data, a slow network and a forced API error.
- [ ] Forms keep what was typed when one field fails validation.
  - How to check: Break one field in a long form and submit it.
- [ ] Destructive actions have undo, a confirmation step or a trash.
  - How to check: List the destructive actions and check each one.
- [x] The browser back button behaves as expected in every flow.
  - Evidence (2026-11-16): tests under "the Back and Forward buttons" in tests/e2e/quiz.spec.ts press Back and Forward at every step of the quiz, including after a restart and after leaving for another page. "the back button returns to the previous page" in tests/e2e/pages.spec.ts covers the legal pages. How it works is in docs/decisions/0006.
  - How to check: Press back at each step of the key flows.
### Code health and ownership

- [ ] An experienced engineer has reviewed the authentication, data access and payment code.
  - How to check: This is the post's strongest point. Even a few paid hours of review count.
- [ ] The terms and privacy policy accurately describe what you collect and which third parties, including AI providers, receive it.
  - How to check: Compare the policy with your data map and every SDK in the app.
- [ ] The domain, cloud, GitHub, payment, email and app store accounts belong to the company, each with at least two admins.
  - How to check: Inventory every account and its owner.
### People

- [ ] Name the owner: Who reviews AI-written code before it ships?
  - How to check: Name the person and how much time they have for it.
- [ ] Name the owner: Who owns the data model and runs migrations on the live database?
  - How to check: Often the same person as above in a small team.
- [ ] Name the owner: Who answers the alert when payments stop at 3am?
  - How to check: Name a backup too.
- [ ] Name the owner: Who patches the framework when a vulnerability goes public?
  - How to check: Subscribe them to your framework's security advisories.
- [ ] Name the owner: Who checks what the AI says it tested against the actual CI results?
  - How to check: An agent's summary of passing tests is a claim, not evidence.
### Ads and affiliates

- [ ] A Google-certified consent tool using the IAB framework is live, and visitors from the EEA, UK and Switzerland get no personalized ads or advertising cookies before they agree.
  - How to check: Open the site through a European VPN in a fresh browser, decline, and check in DevTools that no advertising cookies are set and ad requests are non-personalized.
- [ ] US visitors can opt out of personalized ads: a “Do Not Sell or Share My Personal Information” link works, and a Global Privacy Control signal counts as an opt-out.
  - How to check: Turn on Global Privacy Control in your browser and confirm ad requests switch to non-personalized.
- [ ] /ads.txt is live at the site root with a line for every ad network that sells your ad space.
  - How to check: Open yoursite.com/ads.txt and compare it with the line each network's dashboard gives you. AdSense shows an alert when it's missing or wrong.
- [ ] Every ad slot reserves its space so ads don't push content around, and pages with ads still pass Core Web Vitals.
  - How to check: Run PageSpeed Insights on your busiest page types; layout shift should stay at or under 0.1.
- [ ] Ads never appear on sign-in, account, checkout, admin, error or thank-you pages, or next to buttons, menus and download links, and nothing on the site invites clicks on ads.
  - How to check: Walk every page type. AdSense bans encouraging clicks and placements that cause accidental clicks.
- [ ] Every affiliate link and sponsored item has a clear disclosure where readers see it, and affiliate links are marked rel="sponsored".
  - How to check: Check each page type. “Paid link” beside the link can work; “affiliate link” alone, or a separate disclosure page alone, usually doesn't.
- [ ] Affiliate and partner links go through one redirect helper that logs clicks, and you've read each program's rules on where links may appear.
  - How to check: Click one link from each program and confirm the click is logged on your side and credited in the partner's dashboard.
- [ ] The privacy policy names every ad, affiliate and analytics partner and the cookies they set.
  - How to check: Compare the policy with the scripts and cookies your pages load (DevTools, Application tab).

## Required for your data (3)

### Data correctness

- [ ] Each type of data has a retention period, and a scheduled job deletes what has expired.
  - How to check: Map data types to retention periods and check the purge job's logs.
### People

- [ ] Name the owner: Who walks an auditor or a customer's security team through how sensitive data moves?
  - How to check: Usually needs a data-flow diagram they can present.
### Ads and affiliates

- [ ] If children under 13 may use the site, ads are contextual only, child-directed pages are flagged in every ad network, and no child data reaches ad partners without separate parental consent.
  - How to check: Check each network's child-directed setting. The amended COPPA Rule applies from 22 April 2026.

## Enterprise deal (14)

### Data model, identity and access

- [ ] Customers can turn on MFA, with a lost-phone recovery path that support can't bypass without verifying identity.
  - How to check: Enroll an authenticator app, then recover with backup codes as if the phone were lost.
- [ ] Enterprise customers can sign in through SSO (SAML and OIDC), tested with Okta and Microsoft Entra ID.
  - How to check: Create free developer tenants and complete a login with each. Inspect assertions with a SAML tracer browser extension.
- [ ] SCIM deprovisioning removes users, and removal also ends their open sessions.
  - How to check: Deactivate a test user in the identity provider, log when your SCIM endpoint is called, and confirm their session ends. Entra pushes changes on a cycle of about 40 minutes.
### Assurance and compliance

- [ ] A third-party penetration test was done in the last 12 months and its findings were fixed.
  - How to check: Keep the report and the retest letter ready to share.
- [ ] You can answer a standard security questionnaire with evidence for each answer.
  - How to check: Fill in a CAIQ-Lite template and mark any answer you can't back up.
- [ ] You know whether your customers need SOC 2, and if so a readiness assessment has started.
  - How to check: Ask prospects early. Vanta, Drata and Secureframe run readiness checks.
- [ ] Access to production systems is reviewed and signed off on a schedule.
  - How to check: Export user lists from cloud, database, GitHub and SaaS tools, remove stale access, and record the sign-off.
### Background work, email and cost

- [ ] A written disaster recovery plan with recovery targets is tested once a year.
  - How to check: Write recovery-time and data-loss targets, then run a drill against them.
- [ ] Uptime promises in contracts match what one region can deliver, or you run a second region.
  - How to check: Compare your promised uptime with the provider's single-region commitment.
### Monitoring and incidents

- [ ] Customers can check a status page.
  - How to check: Better Stack, Instatus or Atlassian Statuspage.
### Testing and accessibility

- [ ] The app works acceptably on older hardware and the browsers your customers actually use.
  - How to check: Run Lighthouse with CPU throttling and test older browsers on BrowserStack.
- [ ] Key flows work by keyboard and screen reader and pass automated accessibility checks.
  - How to check: axe DevTools, WAVE and Lighthouse, then VoiceOver or NVDA. Required by many enterprise contracts, and by the European Accessibility Act for EU consumer e-commerce and banking.
### Billing

- [ ] Invoices can carry PO numbers and custom annual terms.
  - How to check: Add a PO custom field to a test invoice.
### Code health and ownership

- [ ] Customers can read a changelog.
  - How to check: A simple page updated with each release.

## As you grow (26)

### How the AI builds your app

- [ ] Architecture boundaries (which modules may call which) are checked by lint rules or structural tests, with error messages that tell the agent how to fix a violation.
  - How to check: OpenAI's Codex team enforced a fixed layer order with custom linters. Tools: dependency-cruiser or eslint-plugin-boundaries (JavaScript/TypeScript), import-linter (Python).
- [ ] Decisions, plans and progress notes live in the repo, not only in chat threads, so the next agent session can read them.
  - How to check: OpenAI's team found knowledge outside the repo is invisible to agents. Anthropic's long-running harness keeps a progress file and descriptive commits for the next session.
- [ ] A recurring cleanup pass removes drift: duplicated helpers, dead code, stale docs and bad patterns agents copied.
  - How to check: OpenAI's team first spent about 20% of each week cleaning up by hand, then automated it with background agents opening small refactoring pull requests.
### Data model, identity and access

- [ ] Roles go beyond admin and everyone else, and each role's permissions are written down and tested.
  - How to check: Write a role-by-action table and add one automated test per cell.
- [ ] If support can sign in as a user, each use is recorded with who, which account and when.
  - How to check: Impersonate a test user and check the audit log entry.
### Database operations

- [ ] Accidental deletes are recoverable (a trash or soft delete), and soft-deleted data is purged on a schedule.
  - How to check: List the delete paths and confirm a purge job exists and runs.
### Data correctness

- [ ] The data model has no hard-coded first-customer assumptions.
  - How to check: Search for hard-coded customer names, plans and settings.
### Assurance and compliance

- [ ] Laptops with production access are encrypted, and a lost device's access can be revoked within minutes.
  - How to check: Run a tabletop exercise: list what one laptop can reach and time the revocation.
### Environments and deploys

- [ ] Staging runs the same runtime, database engine and configuration keys as production.
  - How to check: Compare runtime versions and environment variable names across environments.
- [ ] Infrastructure can be rebuilt from the repository.
  - How to check: Rebuild staging using only the repo (Terraform, OpenTofu, Pulumi or platform config files).
### Background work, email and cost

- [ ] Cached data is cleared when the underlying data changes, or nothing is cached yet.
  - How to check: Update a record and check every cached view.
- [ ] Storage buckets have lifecycle rules for temporary files.
  - How to check: Review bucket rules and storage spend.
### Monitoring and incidents

- [ ] Common alerts have runbooks, and incidents get postmortems whose action items are tracked.
  - How to check: Link a runbook to each alert and track postmortem actions in your issue tracker.
### Testing and accessibility

- [ ] Critical third-party integrations are tested against their sandboxes or recorded responses.
  - How to check: Use provider test modes, and Pact or WireMock for the rest.
- [ ] Every fixed bug gets a regression test.
  - How to check: Require a failing test before each fix.
### Product experience

- [ ] Text can be translated, and dates, numbers and currencies format per locale.
  - How to check: Run pseudo-localization and format with the browser's Intl API.
### Code health and ownership

- [ ] Dependencies are updated regularly, and the framework version still gets security patches.
  - How to check: Check your stack's support dates on endoflife.date. Automate updates with Renovate or Dependabot.
- [ ] Dead code from abandoned AI attempts is removed, and no file has grown unmanageable.
  - How to check: knip or ts-prune (JavaScript/TypeScript), vulture (Python), and cloc for file sizes.
- [ ] Key decisions, and the steps for deploy, restore and key rotation, are written down.
  - How to check: One-page decision records plus a runbooks folder.
- [ ] A new engineer can run the app locally from the README in under an hour.
  - How to check: Have someone new try it and time it.
- [ ] Support can answer common questions and make common fixes without raw database access.
  - How to check: List the five most frequent support fixes and how each is done.
- [ ] Someone other than you could deploy, restore a backup and rotate keys using only the docs.
  - How to check: Ask someone to try one of these from the docs alone.
### People

- [ ] Name the owner: Who owns deploys, infrastructure and the cloud bill?
  - How to check: A platform host covers much of this for small apps.
- [ ] Name the owner: Who makes architecture calls and says no to features that would break others?
  - How to check: Usually the senior engineer or founder at small scale.
- [ ] Name the owner: Who can debug production without AI help, and remembers why it was built this way?
  - How to check: Written decision records reduce how much depends on memory.
### Ads and affiliates

- [ ] Revenue per thousand pageviews, affiliate clicks and conversions are tracked per page, with an alert on a sudden drop.
  - How to check: Combine ad network reports with analytics events and compare week over week.

## Sources

- [OpenAI, Harness engineering: leveraging Codex in an agent-first world (Feb 2026)](https://openai.com/index/harness-engineering/)
- [Claude Code docs, Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [Anthropic, Effective harnesses for long-running agents (Nov 2025)](https://anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [eWeek, Replit's AI agent wipes a production database (Jul 2025)](https://www.eweek.com/news/replit-ai-coding-assistant-failure/)
- [Anthropic, Making Claude Code more secure and autonomous with sandboxing (Oct 2025)](https://anthropic.com/engineering/claude-code-sandboxing)
- [Superblocks, How 170+ Lovable apps were exposed (CVE-2025-48757)](https://www.superblocks.com/blog/lovable-rls-breach)
- [The Hacker News, CISA warns of tj-actions/changed-files compromise (Mar 2025)](https://thehackernews.com/2025/03/cisa-warns-of-active-exploitation-in.html)
- [Cloud Security Alliance, Shai-Hulud npm worm research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-shai-hulud-npm-worm-ai-developer-supply-ch/)
- [Dependency cooldown settings by package manager (Oct 2026)](https://hidekazu-konishi.com/entry/dependency_cooldowns_by_package_manager.html)
- [Stripe, How to prevent free trial abuse in SaaS and AI products](https://stripe.com/resources/more/how-to-prevent-free-trial-abuse-in-saas-and-ai-products)
- [Google, The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/)
- [Claude API docs, Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- [Google AdSense Help, Consent management requirements for serving ads in the EEA, UK and Switzerland](https://support.google.com/adsense/answer/13554116?authuser=0)
- [Clym, Global Privacy Control: the opt-out signal 12 US states require you to honor (Jun 2026)](https://www.clym.io/blog/what-is-global-privacy-control-the-opt-out-signal-12-us-states-now-require-you-to-honor)
- [Google AdSense Help, Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)
- [Google AdSense Help, Ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en-GB)
- [Google, AdSense program policies](https://support.google.com/publisherpolicies/answer/48182?hl=en-GB)
- [Manatt, An in-depth look at the FTC's updated Endorsement Guides](https://manatt.com/insights/newsletters/advertising-law/an-in-depth-look-at-the-ftcs-updates-2)
- [Google Search Central, Qualify your outbound links to Google](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links?authuser=7)
- [Hunton, COPPA Rule amendment compliance deadline (22 April 2026)](https://www.hunton.com/privacy-and-cybersecurity-law-blog/coppa-rule-amendment-compliance-deadline-approaches)
