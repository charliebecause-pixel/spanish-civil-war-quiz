# Spanish Civil War Political Ideology Quiz: architecture

Status: **approved as written by Solrac on November 16, 2026.**
Written November 15, 2026. Target launch December 1, 2026.

Two details changed while building the foundations. Each has a decision record:

- Review is enforced by the branch rule and by Solrac being the only person who can merge, not by a CODEOWNERS file, because GitHub does not let anyone approve their own pull request ([decision 0004](decisions/0004-single-owner-review.md)).
- The project lives at `C:\dev\spanish-civil-war-quiz`, outside OneDrive (decision 8 in section 11).

## 1. What we are actually building

The brief's form answers describe a multi-user business app (accounts, enterprise buyers, a database, support sign-in). The brief's own description of the product says the opposite: one page, one question, two joke results, a reset button, and "there won't be any need for people to put in data."

This plan follows the description. The first release is a **static website with no accounts, no database, no email and no stored visitor data.** Everything the form answers imply beyond that is listed in section 9 as a contradiction, with a recommendation.

Screens, in order:

1. **Intro**: "60 second political ideology test", pop-academic styling, a **Start** button.
2. **Question**: "Question #1" in large bold type, the Republicans / Nationalists question, two clickable answer boxes below it.
3. **Result**: full-screen colour change and large yellow lettering.
   - Republicans: red screen, "YOU'RE A COMMUNIST!!!", large hammer and sickle.
   - Nationalists: brown screen, "YOU'RE A FASCIST!!!", fascist imagery (no Nazi symbols).
4. A **Take quiz again** button appears and resets to the intro.

Supporting pages: privacy policy, terms, and an about/disclosure page.

## 2. Stack

| Layer | Choice | Reason |
|---|---|---|
| Site framework | Astro, static output, TypeScript in strict mode | Several static pages in more than one language, a component model for the ad slot and disclosures, and almost no JavaScript shipped to the visitor. |
| Quiz logic | A small pure TypeScript state machine (`intro → question → result → intro`), no UI framework | Three states and two transitions do not need React. A pure function is trivial to unit test. |
| Styling and animation | Plain CSS with custom properties and CSS animations | No dependency needed. Honors `prefers-reduced-motion`; the colour change is a single transition, never a repeated flash (WCAG 2.3.1). |
| Images | Original SVGs drawn for this project, stored in the repo | No licence questions, sharp at any size, tiny files. |
| Text | Message files per language (`src/i18n/en.json`, `es.json`), no hard-coded user-facing text | Required by CLAUDE.md and by "more than one language". |
| Package manager | pnpm, lockfile committed, `minimumReleaseAge` set to 3 days | Enforces the brief's 3-day wait on new package versions in config rather than by memory. |
| Hosting | Cloudflare Pages, free plan | Global CDN, automatic TLS, a preview deploy per pull request, instant rollback, custom security headers, and small server functions for `/go/<slug>` later. Free plan allows commercial use, which Vercel's free plan does not. |
| Tests | Vitest (unit), Playwright (end to end), axe checks inside Playwright (accessibility) | Matches the checks the brief requires. |
| Lint and types | ESLint, Prettier, `astro check` | Standard for this stack. |
| Secret scan | gitleaks in CI, plus GitHub push protection | Named in the launch checklist. |
| Dependency scan | OSV-Scanner in CI, plus Dependabot with a 3-day cooldown | Named in the launch checklist. |
| CI | GitHub Actions, third-party actions pinned to full commit hashes, read-only permissions by default | Required by CLAUDE.md. |
| Error tracking | Sentry, free developer plan, IP addresses and personal data scrubbing on | Required by the kickoff. Free tier is far above this site's volume. |
| Uptime check and status page | Better Stack, free plan | One external monitor, phone alerts and a public status page in one free tool. |
| Traffic count | Cloudflare Web Analytics | Free, sets no cookies, stores no personal data. Enough to measure "100 hits a week by week 4". |

Every tool above has a free tier that covers this site. The only expected cost is the domain name, roughly $10 to $15 a year. No paid service will be added without asking.

## 3. Data model

**There are no tables in the first release.** No visitor data is stored on a server, so there are no keys, no row ownership and no row-level security to configure.

What exists instead:

| Data | Where it lives | Belongs to |
|---|---|---|
| Quiz state (which screen, which answer) | Browser memory only; gone on reload | Nobody; never leaves the browser |
| Language choice | The URL path (`/` for English, `/es/` for Spanish) | Nobody; nothing is stored |
| Site config (ad networks, affiliate links, feature flags) | Files in the repo | The owner |
| Traffic counts | Cloudflare Web Analytics, aggregate only | The owner's Cloudflare account |
| Error reports | Sentry, scrubbed | The owner's Sentry account |

The answer a visitor clicks is deliberately **not** recorded. A person's political opinion is a special category of data under GDPR, and the brief says under-16s will visit. Not collecting it is the cheapest way to stay clear of both.

If the owner later wants "collection of survey data", the recommended shape is one anonymous counter per answer and nothing else:

```
answer_tally
  answer      text primary key   -- 'republicans' | 'nationalists'
  count       integer not null
  updated_at  timestamptz not null (UTC)
```

No visitor ID, no IP address, no timestamp per click. It would be written by a server function, never by the browser directly. This is not in the first release.

## 4. Sign-in and permissions

**Visitors do not sign in.** There are no visitor accounts, roles, sessions, password resets or invites.

The only "role" is the Owner, and the Owner's powers are exercised through outside accounts, not through the site:

| Account | What it controls | Protection |
|---|---|---|
| GitHub | Code, CI, what gets merged | Passkey or hardware key; branch protection on `main` |
| Cloudflare | Hosting, DNS, production deploys | Passkey or hardware key |
| Domain registrar | The domain | Passkey or hardware key; auto-renew on |
| Sentry, Better Stack | Error reports, alerts | Multi-factor authentication |
| Google AdSense (later) | Ad revenue | Multi-factor authentication |

Coding agents get no production credentials. Production deploys happen only through Cloudflare's own connection to GitHub when Solrac merges to `main`.

Branch protection on `main`: pull request required, all CI checks must pass, Solrac's review required on changes to `.github/`, hosting config, security headers and anything under ads or redirects (enforced with a CODEOWNERS file).

## 5. Environments

| Environment | What it is | Data | Who can change it |
|---|---|---|---|
| Local | `pnpm dev` on the developer's machine | No data needed; fake ad and affiliate config from an example file | Developer and coding agent |
| Preview | One Cloudflare Pages deploy per pull request, at a throwaway URL, not indexed by search engines | Same fake config | Automatic, from the pull request |
| Staging | The `staging` branch, deployed to a fixed staging address, not indexed | Same fake config; ads always off | Automatic, on merge to `staging` |
| Production | The `main` branch, on the real domain | Real config | Solrac only, by merging |

"Seeded fake data" for this project means a fake ads and affiliate config (placeholder publisher ID, example partner links), since there are no user records to seed.

## 6. How money, email and background work flow

**Money.** None in the first release; the brief lists AdSense setup under "Not in the first release". The plumbing is built in step 2 but switched off:

- One `AdSlot` component that reserves its space and renders nothing while the `ADS_ENABLED` flag is off.
- `/ads.txt` generated from the config file.
- One affiliate helper at `/go/<slug>` (a small Cloudflare Pages function) that looks the slug up in config, logs the click as a structured log line with no personal data, and redirects. Links render with `rel="sponsored noopener"` and a "Paid link" disclosure beside them.
- The consent tool loads before any ad script. A Global Privacy Control signal counts as an opt-out.
- The privacy policy lists every partner. At launch that is Cloudflare, Sentry and Better Stack.

When ads are switched on, money flows visitor → Google AdSense → the owner's AdSense account. The site never handles a payment.

**Email.** None. The site sends no email. The security contact address is published in `/.well-known/security.txt` for inbound reports only.

**Background work.** None. There is nothing to queue, schedule or purge, because nothing is stored.

**Outside calls.** The page works with every third party blocked. Analytics, error tracking and (later) ads load after the quiz is usable and cannot break it.

## 7. Security baseline

- Security headers from a `_headers` file: HSTS, a strict Content-Security-Policy, `X-Content-Type-Options`, frame protection, a tight Referrer-Policy.
- No forms, no user input, no cookies set by the site itself.
- `/.well-known/security.txt` with the security contact.
- Lockfile-only installs in CI, 3-day package cooldown, pinned actions, secret and dependency scans on every pull request.

## 8. Recommendations for the open questions

| Open question | Recommendation | Reason |
|---|---|---|
| Authentication provider | **None for the first release.** | Nobody signs in. Adding sign-in to a one-question joke page creates personal data, COPPA exposure and work with no benefit. If accounts are ever needed, use a hosted provider with email links (Supabase Auth) rather than building one. |
| Multi-factor authentication | **Not applicable to visitors. Required on the owner's GitHub, Cloudflare, registrar and AdSense accounts**, using a passkey or hardware key where offered. | Those accounts are the only way to change or take over the site. |
| SCIM (automatic user removal) | **No.** | There are no enterprise customers and no user accounts to remove. |
| Database | **None for the first release.** | Nothing needs storing. If anonymous answer counts are wanted later, use Cloudflare D1 with a US location, written by a server function. |
| How much recent data could you afford to lose | **Nothing is at risk.** The whole site lives in git. Recovery point is the last push; recovery time is a redeploy, a few minutes. | No database means no backups to run or restore. |

## 9. Contradictions and risks in the brief

### Contradictions

1. **The form answers do not match the product.** Sections 2 and 3 describe accounts, email sign-in, support signing in as users, a browser-to-database connection, a trash, and enterprise buyers needing SOC 2 and penetration tests. The description says one page and no user data. Recommendation: treat the description as the truth and the rest as not applicable.

2. **"All 89 items must be ticked" cannot be met honestly as written.** Around 40 of the 89 "Before launch" and "Required for your data" items concern things this site does not have (database backups, password resets, two-account tests, migrations, sign-up bot protection, pagination). Recommendation: allow an item to be closed as "Not applicable", with the reason written beside it as its evidence. I will not build a database only to tick database items.

3. **Ads are both in and out.** "Not in the first release" lists AdSense setup. The Money section says ads pay for the site, and the kickoff's step 2 asks for the consent tool, ad slot, ads.txt and affiliate helper before features. Recommendation: build the plumbing in step 2 as asked, switched off, and launch with no ads.

4. **Four platforms are listed** (web app, phone browsers, desktop app, browser extension). Recommendation: one responsive website that works on phones and desktops. No desktop app or browser extension.

5. **"Larger companies with security or procurement teams" pay you**, but the money section says ads and affiliates. Recommendation: ignore the enterprise items (the 14 "Enterprise deal" checklist items are already outside the launch gate).

6. **"Support needs to sign in as a user", "Deleted items go to a trash", "Users in several time zones"**: no users, nothing to delete, nothing scheduled. Not applicable.

7. **A team of one cannot satisfy the "two admins" and "backup person" items.** The checklist asks for two admins on every account and a backup for alerts. Recommendation: either name a second trusted person, or record these as an accepted risk for a best-effort joke site.

### Risks

8. **The imagery is restricted by law in some countries the site will reach.** The brief names Europe as an audience. Public display of the hammer and sickle is banned or restricted in several countries (for example Lithuania, Latvia, Ukraine and Indonesia). Fascist symbols are restricted in Germany and Italy, and Spain's 2022 Democratic Memory Law targets the glorification of Francoism. Satire is usually treated differently from glorification, but that is a legal judgement, not a technical one, and I am not a lawyer. The same imagery can also get links suppressed on social platforms. **Decision needed:** which image for the Nationalist result. My recommendation is a fasces: it is recognisably fascist, not Nazi, and less legally loaded in Spain than the Falange yoke and arrows.

9. **AdSense is unlikely to approve this site as described.** Google commonly rejects sites with a single page and little original content, and limits ads beside shocking or politically inflammatory content. A sidebar ad next to two large answer buttons also risks the "accidental clicks" policy. At the stated 1,000 pageviews a month, realistic ad income is a few dollars a month at best. Recommendation: do not count on ad revenue; revisit after launch with real traffic.

10. **Under-16s plus personalized ads is the highest-risk combination in the brief.** The amended COPPA Rule requires separate parental consent before a child's data reaches ad partners, and the site has no way to know a visitor's age without collecting data. Recommendation: when ads are turned on, serve non-personalized ads only, to everyone, permanently. That removes most of the COPPA and state-privacy exposure in one decision.

11. **"Looks real" and "unsuspecting people".** A parody is fine. Risk appears if the site imitates a specific real quiz site or a real institution, or if it collects anything under a false pretence. Recommendation: invent the branding from scratch, collect nothing, and say plainly on the about page and in the privacy policy that it is a parody. The joke still lands; the footer does not spoil it.

12. **Calling a visitor a fascist or communist in giant letters** will be shared out of context, including by and to minors. That is the joke and it is the owner's call; I am noting it so it is a decision rather than a surprise.

13. **Languages.** The brief says "more than one" but not which. Recommendation: English and Spanish. **Decision needed.**

14. **No domain is named.** Needed before production, the status page, security.txt and ads.txt can be finalised. **Decision needed.**

15. **The security contact address will be public** in security.txt. Confirm that address is the one to publish.

16. **GitHub branch protection is free only on public repositories** for a personal account. Recommendation: make the repository public. Nothing in it is secret. The alternative is a paid GitHub plan, which would need approval.

17. **The project folder is inside OneDrive, inside an unrelated "soccer docs" folder.** OneDrive syncing fights with the tens of thousands of small files a JavaScript project installs and can corrupt a git repository. Recommendation: move the project to a folder outside OneDrive (for example `C:\dev\spanish-civil-war-quiz`) before step 2.

18. **Load testing and "know the breaking point" items** are aimed at apps with servers. A static site on a CDN has no server of ours to break. Recommendation: one short probe against staging during a deploy, recorded as the evidence, and no more.

19. **Timeline.** Sixteen days to December 1 is comfortable for the scope in section 1 and not achievable for the scope the form answers imply.

## 10. Proposed build order after approval

Step 2, one pull request: repo, tooling, CI, environments, headers, security.txt, error tracking, uptime check, dormant ads and affiliate plumbing, privacy policy and terms, Commands section of CLAUDE.md.

Step 3, one pull request each:

1. Quiz flow: intro, question, result, reset, with unit and end-to-end tests.
2. Visual design: pop-academic styling, result screens, imagery, animation, reduced-motion support.
3. Second language.
4. About/parody page and final legal text.

## 11. Decisions needed from the owner

1. Approve the static, no-accounts, no-database scope (section 1).
2. Approve the stack and the free services (section 2).
3. Allow "Not applicable, with reason" as valid evidence on the launch checklist.
4. Choose the Nationalist-side image (recommended: fasces).
5. Confirm the second language (recommended: Spanish).
6. Name the domain.
7. Public GitHub repository: yes or no.
8. Move the project out of OneDrive: yes or no, and where.
9. Ads at launch: off (recommended), with non-personalized ads only if they are ever turned on.
10. Second admin and alert backup: name someone, or accept the risk.
