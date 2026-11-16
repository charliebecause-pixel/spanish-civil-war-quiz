# 0005: Environments, and fake settings instead of seeded data

Date: 2026-11-16.

## Context

The brief asks for local, preview, staging and production environments, with seeded fake data outside production. This site has no user records to seed. The only data that differs between environments is the settings: the domain, ad network IDs, paid links and the list of partner companies.

## Decision

- Two settings files are committed: `config/site.production.json` (real) and `config/site.fake.json` (made up: `.example` addresses, an all-zero publisher ID, a pretend bookshop).
- A build decides which to use in `src/config/env.ts`: on Cloudflare Pages the `main` branch is production and every other branch is staging; anything else is local. `SITE_ENV` overrides this.
- Only production reads the real file. If the environment cannot be determined, the build falls back to fake settings and blocks search engines.
- A production build refuses to run while `siteUrl` is still a placeholder.
- Outside production, the site also builds `/dev/components/`, a page that exercises the ad slot and paid-link components with the fake settings.

## Reason

No real ad or partner ID exists anywhere except the production build, so a preview link cannot earn, leak or mis-attribute anything. Falling back to fake settings means a misconfigured build shows obviously fake content instead of quietly going live.

## Consequences

- There is no "seed" command. The fake settings are always present.
- Staging never shows a real ad. The first real ad can only be seen in production, which is why decision 0002 lists careful steps for that day.
