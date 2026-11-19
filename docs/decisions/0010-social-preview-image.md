# 0010: Link previews show the quiz's straight face, drawn once and kept in the repository

Date: 2026-11-19.

## Context

Visitors are expected to come from social media (`docs/PROJECT_BRIEF.md`). When someone shares a link, Facebook, X, WhatsApp, Slack and others show a preview card built from the page's Open Graph tags. Without a picture the card is a bare grey link. Sites usually draw a 1200 by 630 pixel picture for it.

The site keeps the visitor's answer in their browser, so there is no address for a result: every share is a share of the home page or another fixed page.

## Decision

- **What it shows:** the intro's straight face. The logo, "Political self-assessment", the title, the three facts (1 question, 60 seconds, 0 sign-ups), and the two answers as buttons, with the question screen's two posters faint at the edges. One picture per language.
- **What it leaves out:** the verdict, the emblems and the death toll. Some platforms suppress or blur links whose preview shows a hammer and sickle or fascist symbols, and the imagery is restricted in some countries (`docs/ARCHITECTURE.md`, open question 8). A share should not be the place the joke is spoiled, either. The Nationalist poster at the right edge has a small hammer and sickle in it, as on the question screen; at 10% strength it is texture, not a symbol.
- **How it is made:** the card is a page, `src/pages/dev/social/[locale].astro`, built from the site's own styles, built for local, preview and staging only. `scripts/social-images.mjs` photographs it with the Playwright browser the tests already use, into `public/social/en.jpg` and `public/social/es.jpg`. The script also records the text that went into each picture in `src/lib/social-image-text.json`.
- **Every page** carries the Open Graph and X tags, pointing at its language's picture on the site's own address.

## Reason

Drawing the picture from a page reuses the site's type, colours and logo, needs no new dependency, and keeps the picture's text in `src/i18n` like the rest of the site. Keeping the result in the repository means the build and the hosting do nothing new.

## Consequences

- When the title, the overline, the fact labels or the answer labels change, the pictures go out of date. A unit test compares the recorded text with `src/i18n` and fails until someone runs `corepack pnpm build` and then `corepack pnpm social`.
- The pictures are drawn with the fonts on the machine that runs the script (Palatino Linotype and Segoe UI on Windows). Redrawing on another system may change the type slightly.
- Platforms cache previews. After a picture changes, the old one can show for days; Facebook's Sharing Debugger and similar tools can refresh it.
- Until the domain is chosen, the production build points the picture at the placeholder address in `config/site.production.json`, like the canonical links.
