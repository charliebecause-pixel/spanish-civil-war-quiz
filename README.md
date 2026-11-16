# Spanish Civil War Political Ideology Quiz

A parody of online political quizzes: one question, two joke results. A static website with no accounts, no database and nothing stored about visitors.

- What we are building: [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md)
- How it is built and why: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/decisions/](docs/decisions/)
- What "ready to launch" means: [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md)
- Accounts the owner has to set up by hand: [docs/OWNER_SETUP.md](docs/OWNER_SETUP.md)
- Rules for coding agents: [CLAUDE.md](CLAUDE.md)

## Run it on your machine

You need [Node.js](https://nodejs.org) 24 and [Git](https://git-scm.com). Nothing else.

1. Open a terminal in this folder.
2. Install the dependencies:

   ```bash
   corepack pnpm install
   ```

   The first time, Corepack asks whether it may download pnpm. Press Enter to say yes.

3. Start the site:

   ```bash
   corepack pnpm dev
   ```

4. Open http://localhost:4321 in a browser. The page reloads when you save a file.
5. Press Ctrl+C in the terminal to stop.

There is no data to seed and no `.env` file to create. Everything outside production uses the made-up settings in `config/site.fake.json`.

## Check your work

| What                                            | Command                                                  |
| ----------------------------------------------- | -------------------------------------------------------- |
| Everything below, in order                      | `corepack pnpm check`                                    |
| Lint and formatting                             | `corepack pnpm lint`                                     |
| Fix formatting                                  | `corepack pnpm format`                                   |
| Type check                                      | `corepack pnpm typecheck`                                |
| Unit tests                                      | `corepack pnpm test`                                     |
| Build into `dist/`                              | `corepack pnpm build`                                    |
| End-to-end tests (build first)                  | `corepack pnpm test:e2e`                                 |
| Dependency audit                                | `corepack pnpm audit --audit-level=moderate`             |
| Serve the built site as Cloudflare would        | `corepack pnpm preview`, then open http://127.0.0.1:8788 |
| Install the test browser (first time only)      | `corepack pnpm exec playwright install chromium`         |

CI runs the same checks on every pull request, plus a secret scan and a dependency scan. A pull request cannot merge until they pass.

## Where things are

```
config/            Site settings. site.production.json is the real site;
                   site.fake.json is made-up data for everything else.
functions/go/      The /go/<slug> redirect that every paid link goes through.
src/components/    Quiz: the three screens. AdSlot and AffiliateLink: the only way to
                   place an ad or a paid link.
src/config/        Reads and validates the settings; decides which environment a build is for.
src/i18n/          All text shown to visitors, in English and Spanish.
src/lib/           Small tested functions: the quiz's rules, ads.txt, security headers,
                   redirects, error-report scrubbing.
src/scripts/       The little code that runs in the visitor's browser.
src/pages/         One file per page. [...locale] pages are built once per language.
tests/unit/        Fast tests for the functions above.
tests/e2e/         Browser tests against the built site.
```

## Environments

| Environment | How a build knows                             | Settings used                 | Search engines |
| ----------- | --------------------------------------------- | ----------------------------- | -------------- |
| Local       | The default                                   | `config/site.fake.json`       | Blocked        |
| Preview     | Cloudflare Pages, any pull request branch     | `config/site.fake.json`       | Blocked        |
| Staging     | Cloudflare Pages, the `staging` branch        | `config/site.fake.json`       | Blocked        |
| Production  | Cloudflare Pages, the `main` branch           | `config/site.production.json` | Allowed        |

A production build refuses to run until `siteUrl` in `config/site.production.json` is a real domain.

## Common changes

- **Change any text:** edit `src/i18n/en.json` and `src/i18n/es.json` together. A test fails if the two files do not have the same keys.
- **Change the privacy policy or terms:** edit `src/i18n/legal/en.ts` and `es.ts`, and update the `updated` date in both.
- **Add an outside company (analytics, ads, anything):** add it to `partners` in the config. The privacy policy lists it automatically, and the build refuses an ad network or paid link whose company is not listed.
- **Add a paid link:** add it to `affiliates` in the config, then use `<AffiliateLink slug="..." />`. Never write a partner address directly in a page.
- **Turn on real ads:** read [docs/decisions/0002-ads-off-and-non-personalized.md](docs/decisions/0002-ads-off-and-non-personalized.md) first. It needs the owner's approval.

## Things to remember

- `/.well-known/security.txt` is valid for just under a year from the last build. Rebuild and deploy at least once a year.
- Never commit a `.env` file, and never put production credentials on a development machine.
