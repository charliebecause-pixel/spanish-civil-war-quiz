## What this is

A picture and share tags for link previews, so a shared link to the quiz shows a proper card on Facebook, X, WhatsApp, Slack and others instead of a bare link. Listed as "not in this feature" in `docs/specs/visual-design.md`. The decision is `docs/decisions/0010-social-preview-image.md`.

## What a visitor sees

Nothing changes on the site itself. When someone shares a page, the preview shows a 1200 by 630 picture of the quiz's straight face: the logo, "Political self-assessment", the title, the three facts (1 question, 60 seconds, 0 sign-ups) and the two answers, Republicans and Nationalists, with the question's two posters faint at the edges. There is one picture in English and one in Spanish (`public/social/en.jpg`, `public/social/es.jpg`, about 85 kB each).

## Decisions worth a look

- **No verdict, emblems or death toll in the preview.** Some platforms suppress links whose preview shows a hammer and sickle or fascist symbols, the imagery is restricted in some countries, and a share should not spoil the joke. The Nationalist poster at the right edge has a small hammer and sickle in it, as it does on the question screen, at 10% strength.
- **Drawn from a page, kept in the repository.** The card is a page built from the site's own styles (`src/pages/dev/social/[locale].astro`, built for local, preview and staging only, marked noindex). `corepack pnpm social` photographs it with the Playwright browser the tests already use. The build and hosting do nothing new.
- **A test notices when the picture is out of date.** The script records the text it drew in `src/lib/social-image-text.json`. A unit test fails if that text no longer matches `src/i18n`, and says to run `corepack pnpm build` and then `corepack pnpm social`.
- **Every page carries the tags:** `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url` (the canonical address), `og:locale` and its alternate, `og:image` with its type, size and a description in the page's language, and `twitter:card` set to `summary_large_image`.

## What is not verified

- **How each platform actually shows it.** That needs the site on a public address; Facebook's Sharing Debugger and similar tools can check it once staging is up. Until the domain is chosen, production points the picture at the placeholder address, like the canonical links.
- **Whether the picture is right for the site is the owner's call.** Both pictures were sent for review.
- **The Spanish description** of the picture (`social.imageAlt`) was written by a coding agent and should be read by a Spanish speaker.

## Launch-checklist items ticked in this pull request

None; the checklist has no item for link previews.

## No new dependencies

The script uses Node's built-in modules and Playwright, which the tests already use.

## How to review

1. Look at `public/social/en.jpg` and `public/social/es.jpg`.
2. Read `docs/decisions/0010-social-preview-image.md` (one page).

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 19, 2026.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 131 unit tests passed; of 254 end-to-end tests, 250 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
00:14:16 [types] Generated 56ms
00:14:16 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (66 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  7 passed (7)
      Tests  131 passed (131)
   Start at  00:14:25
   Duration  1.17s (import 63%, tests 20%, transform 11%, worker 6%)

00:14:29 [types] Generated 75ms
00:14:29 [build] output: "static"
00:14:29 [build] mode: "static"
00:14:29 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
00:14:29 [build] Collecting build info...
00:14:29 [build] ✓ Completed in 105ms.
00:14:29 [build] Building static entrypoints...
00:14:29 [vite] ✓ built in 432ms
00:14:30 [vite] ✓ built in 319ms
00:14:30 [build] Rearranging server assets...

 generating static routes 
00:14:30   ├─ /404.html (+17ms) 
00:14:30   ├─ /ads.txt (+4ms) 
00:14:30   ├─ /dev/social/en/index.html (+9ms) 
00:14:30   ├─ /dev/social/es/index.html (+2ms) 
00:14:30   ├─ /dev/components/index.html (+3ms) 
00:14:30   ├─ /go-links.json (+3ms) 
00:14:30   ├─ /robots.txt (+4ms) 
00:14:30   ├─ /credits/index.html (+4ms) 
00:14:30   ├─ /es/credits/index.html (+18ms) 
00:14:30   ├─ /privacy/index.html (+8ms) 
00:14:30   ├─ /es/privacy/index.html (+6ms) 
00:14:30   ├─ /terms/index.html (+4ms) 
00:14:30   ├─ /es/terms/index.html (+4ms) 
00:14:30   ├─ /index.html (+4ms) 
00:14:30   ├─ /es/index.html (+3ms) 
00:14:30 ✓ Completed in 159ms.

00:14:30 [build] ✓ Completed in 1.09s.
00:14:30 [site-files] wrote _headers and .well-known/security.txt for the local environment
00:14:30 [build] 12 page(s) built in 1.21s
00:14:30 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-13.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-13", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-13
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 254 tests using 4 workers

  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › / passes automated accessibility checks (2.9s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/ passes automated accessibility checks (2.8s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/privacy/ passes automated accessibility checks (3.0s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /privacy/ passes automated accessibility checks (3.2s)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /terms/ passes automated accessibility checks (2.4s)
  ok   8 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /dev/components/ passes automated accessibility checks (2.5s)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (89ms)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /credits/ passes automated accessibility checks (3.2s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/credits/ passes automated accessibility checks (3.2s)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (792ms)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (930ms)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.2s)
  ok   9 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.2s)
  ok  16 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (149ms)
  ok  17 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (159ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (739ms)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.1s)
  ok  18 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (2.4s)
  ok  21 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (2.1s)
  ok  19 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.5s)
  ok  20 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.5s)
  ok  23 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (2.2s)
  ok  26 [desktop] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (1.8s)
  ok  25 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.0s)
  ok  22 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.9s)
  ok  27 [desktop] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (1.6s)
  ok  24 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (4.1s)
  ok  29 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (3.8s)
  ok  30 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.8s)
  ok  31 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (4.6s)
  ok  28 [desktop] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.1s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.8s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.4s)
  ok  34 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.5s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.5s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.8s)
  ok  36 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (4.1s)
  ok  38 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.8s)
  ok  39 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.6s)
  ok  43 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.3s)
  ok  40 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.4s)
  ok  41 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.7s)
  ok  42 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.3s)
  ok  45 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (2.1s)
  ok  46 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (2.2s)
  -   49 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  44 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.4s)
  ok  48 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.3s)
  ok  47 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (2.1s)
  ok  50 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.6s)
  ok  51 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.6s)
  ok  52 [desktop] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.4s)
  ok  53 [desktop] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (1.3s)
  ok  57 [desktop] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (1.6s)
  ok  54 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (2.2s)
  ok  55 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (2.2s)
  ok  58 [desktop] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (1.4s)
  ok  59 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (1.7s)
  ok  60 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (1.8s)
  ok  63 [desktop] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (1.6s)
  ok  62 [desktop] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (1.9s)
  ok  56 [desktop] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (6.5s)
  ok  65 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (2.2s)
  ok  64 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (2.3s)
  ok  66 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (1.6s)
  ok  61 [desktop] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (5.8s)
  ok  67 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.3s)
  ok  68 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.4s)
  ok  69 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (1.1s)
  ok  72 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (806ms)
  ok  71 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (903ms)
  ok  70 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (1.2s)
  ok  73 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (811ms)
  ok  76 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (874ms)
  ok  74 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (983ms)
  ok  75 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (984ms)
  ok  77 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok  79 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok  78 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok  80 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.2s)
  ok  81 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /terms/ has no errors and contacts no other site (1.2s)
  ok  82 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.1s)
  ok  85 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok  83 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.4s)
  ok  84 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.4s)
  ok  86 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (643ms)
  ok  87 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (2.2s)
  ok  89 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.2s)
  ok  88 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.3s)
  ok  90 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (3.8s)
  ok  92 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.8s)
  ok  94 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.5s)
  ok  95 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (2.0s)
  ok  96 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.0s)
  ok  93 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.6s)
  ok  97 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.3s)
  ok 100 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (2.0s)
  ok  98 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.5s)
  ok 102 [desktop] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (2.2s)
  ok  91 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (11.6s)
  ok 101 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.8s)
  ok 103 [desktop] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.4s)
  ok 104 [desktop] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.7s)
  ok 105 [desktop] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.9s)
  ok  99 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (11.0s)
  ok 106 [desktop] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (3.6s)
  ok 107 [desktop] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (2.0s)
  ok 108 [desktop] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (2.1s)
  ok 109 [desktop] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.7s)
  ok 110 [desktop] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (2.0s)
  ok 111 [desktop] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.9s)
  ok 113 [desktop] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (2.0s)
  ok 112 [desktop] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (2.2s)
  ok 117 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (446ms)
  ok 118 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (273ms)
  ok 119 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (55ms)
  ok 114 [desktop] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (2.1s)
  ok 121 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (57ms)
  ok 115 [desktop] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (2.2s)
  ok 122 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (49ms)
  ok 120 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.3s)
  ok 123 [desktop] › tests\e2e\social.spec.ts:46:3 › /es/ tells link previews what to show (1.0s)
  ok 124 [desktop] › tests\e2e\social.spec.ts:46:3 › / tells link previews what to show (1.1s)
  ok 127 [desktop] › tests\e2e\social.spec.ts:85:1 › the page the pictures are drawn from is not indexed (770ms)
  ok 126 [desktop] › tests\e2e\social.spec.ts:46:3 › /privacy/ tells link previews what to show (1.0s)
  ok 125 [desktop] › tests\e2e\social.spec.ts:46:3 › /es/credits/ tells link previews what to show (1.1s)
  ok 116 [desktop] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (5.1s)
  ok 128 [phone] › tests\e2e\accessibility.spec.ts:19:3 › / passes automated accessibility checks (2.8s)
  ok 129 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/ passes automated accessibility checks (2.8s)
  ok 130 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /privacy/ passes automated accessibility checks (3.0s)
  ok 132 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /terms/ passes automated accessibility checks (2.9s)
  ok 131 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/privacy/ passes automated accessibility checks (3.1s)
  ok 133 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /credits/ passes automated accessibility checks (3.6s)
  ok 134 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/credits/ passes automated accessibility checks (3.3s)
  ok 137 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (83ms)
  ok 139 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (777ms)
  ok 138 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (927ms)
  ok 136 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.3s)
  ok 135 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /dev/components/ passes automated accessibility checks (2.5s)
  ok 143 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (122ms)
  ok 144 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (71ms)
  ok 142 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (1.1s)
  ok 141 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.3s)
  ok 140 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.5s)
  ok 148 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (1.9s)
  ok 146 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (2.2s)
  ok 150 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (1.7s)
  ok 145 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.6s)
  ok 147 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.0s)
  ok 153 [phone] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (1.7s)
  ok 152 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.0s)
  ok 149 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.1s)
  ok 154 [phone] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (975ms)
  ok 151 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (3.9s)
  ok 156 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (3.4s)
  ok 157 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.4s)
  ok 158 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.2s)
  ok 155 [phone] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (6.5s)
  ok 159 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (2.9s)
  ok 160 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (2.9s)
  ok 161 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.2s)
  ok 162 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.8s)
  ok 163 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (2.8s)
  ok 164 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.7s)
  ok 165 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.1s)
  ok 166 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.9s)
  ok 167 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.0s)
  ok 170 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.1s)
  -  172 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 169 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.8s)
  ok 168 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.5s)
  ok 171 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.1s)
  ok 175 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.1s)
  ok 173 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.8s)
  ok 174 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.6s)
  ok 177 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.2s)
  ok 178 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.2s)
  ok 176 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (1.3s)
  ok 179 [phone] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.2s)
  ok 180 [phone] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (1.3s)
  ok 182 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (1.4s)
  ok 181 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (1.5s)
  ok 184 [phone] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (1.6s)
  ok 185 [phone] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (1.5s)
  ok 186 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (1.5s)
  ok 187 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (1.5s)
  ok 189 [phone] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (1.4s)
  ok 190 [phone] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (851ms)
  ok 183 [phone] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (6.0s)
  ok 191 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (1.9s)
  ok 192 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (1.7s)
  ok 193 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (829ms)
  -  196 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 194 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.3s)
  ok 188 [phone] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (5.0s)
  ok 195 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.0s)
  ok 197 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (695ms)
  ok 198 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (738ms)
  ok 199 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (695ms)
  ok 200 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (670ms)
  ok 201 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (831ms)
  ok 202 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (870ms)
  ok 203 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (620ms)
  ok 204 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok 205 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.1s)
  ok 206 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.0s)
  ok 207 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (999ms)
  ok 208 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /terms/ has no errors and contacts no other site (858ms)
  ok 209 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.0s)
  ok 210 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.3s)
  ok 211 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.3s)
  ok 213 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (505ms)
  ok 212 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok 215 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok 216 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.4s)
  ok 214 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.5s)
  ok 219 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.6s)
  ok 221 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (840ms)
  ok 217 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (4.3s)
  ok 222 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.3s)
  ok 220 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.1s)
  ok 223 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.0s)
  ok 224 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.6s)
  ok 227 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (1.7s)
  ok 225 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.7s)
  ok 218 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (9.5s)
  ok 229 [phone] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (1.6s)
  ok 230 [phone] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.2s)
  ok 228 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.7s)
  ok 232 [phone] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.3s)
  ok 231 [phone] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.7s)
  ok 226 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (9.6s)
  ok 234 [phone] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.4s)
  ok 235 [phone] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (1.7s)
  ok 233 [phone] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (4.0s)
  ok 236 [phone] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.5s)
  ok 237 [phone] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.7s)
  ok 238 [phone] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.5s)
  ok 239 [phone] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.5s)
  -  241 [phone] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 244 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (78ms)
  ok 245 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (67ms)
  ok 246 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (44ms)
  ok 240 [phone] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.9s)
  ok 248 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (61ms)
  ok 249 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (41ms)
  ok 242 [phone] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (1.1s)
  ok 247 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.3s)
  ok 250 [phone] › tests\e2e\social.spec.ts:46:3 › / tells link previews what to show (788ms)
  ok 251 [phone] › tests\e2e\social.spec.ts:46:3 › /es/ tells link previews what to show (814ms)
  ok 252 [phone] › tests\e2e\social.spec.ts:46:3 › /privacy/ tells link previews what to show (820ms)
  ok 254 [phone] › tests\e2e\social.spec.ts:85:1 › the page the pictures are drawn from is not indexed (572ms)
  ok 253 [phone] › tests\e2e\social.spec.ts:46:3 › /es/credits/ tells link previews what to show (854ms)
  ok 243 [phone] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.8s)

  4 skipped
  250 passed (2.5m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Do the tests catch real breakage?

The overline in `src/i18n/en.json` was changed on purpose without redrawing the picture. The test "en shows the text the site uses today" failed (expected "Political self-check", received "Political self-assessment"). The text was then restored.

### Checked in a real browser

Both cards were opened at 1200 by 630 in the browser, and the saved pictures were looked at.

### Secret scan and OSV dependency scan

Not run locally. They run in CI. The lockfile is unchanged.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
