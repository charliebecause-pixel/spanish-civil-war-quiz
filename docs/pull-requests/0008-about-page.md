## What this is

An about page at `/about/` and `/es/about/`, linked first in every page's footer. It says plainly that the site is a parody, explains the joke, gives a short neutral background on the Spanish Civil War, explains where the death tolls and the pictures come from, and repeats that the answer never leaves the browser. `docs/ARCHITECTURE.md` (point 11) recommended it so the parody is stated somewhere without spoiling the joke on the quiz itself.

## What a visitor sees

A new **About** link (**Acerca de** in Spanish) at the start of the footer. The page looks like the privacy policy and terms, with a "Last updated" date and these sections:

- **What it makes fun of:** quizzes that place you precisely on a political map; this one does it from a single question.
- **The joke:** the question is a false choice, and the result says nothing about you. Not everyone on either side was a communist or a fascist.
- **The Spanish Civil War, briefly:** who was on each side, who backed them, that both sides killed civilians behind their lines, the commonly given figure of about 500,000 dead, and Franco's rule until 1975.
- **Where the death tolls come from:** the same sources and ranges as the small print on the results and `docs/decisions/0008`.
- **The pictures:** from Wikimedia Commons, credited on the credits page; the emblems were drawn for the site; no Nazi emblems and no victims' bodies.
- **Your answer** and **Contact** (the site's contact address from config).

## Decisions worth a look

- **The page reuses the legal pages' layout.** Its text lives in `src/i18n/legal/` beside the privacy policy and terms, in the same shape, so it needs no new component.
- **The history is kept short and even-handed.** Both coalitions are described, both sides' foreign backers are named, and both sides' killing of civilians is mentioned. The death figure is given as "about 500,000 is a figure often given", because estimates vary.
- **A unit test ties the page to the figures.** If `src/lib/death-tolls.ts` changes, the test fails until the about page's "over 60 million" and "over 11 million" are updated in both languages.

## What is not verified

- **The wording is the owner's call.** It speaks for the site in public, so please read it before merging. In particular: "It is how political opponents often label each other today" describes the joke as the visual design spec does; change it if it is not what you mean.
- **The history has not been checked by a historian.** It sticks to widely agreed facts, but it was written by a coding agent.
- **The Spanish text** was written by a coding agent and should be read by a Spanish speaker.
- **Not checked on a real phone or with a real screen reader.** Automated accessibility checks pass on both languages.

## Launch-checklist items ticked in this pull request

None; the checklist has no item for an about page.

## No new dependencies

## How to review

1. Read the English text in `src/i18n/legal/en.ts` (the `about` block at the top), or open `/about/` on the preview.
2. Check the footer link on any page.

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 19, 2026.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 134 unit tests passed; of 270 end-to-end tests, 266 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
12:06:48 [types] Generated 60ms
12:06:48 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (68 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  8 passed (8)
      Tests  134 passed (134)
   Start at  12:06:56
   Duration  1.32s (import 66%, tests 16%, transform 11%, worker 7%)

12:07:01 [types] Generated 42ms
12:07:01 [build] output: "static"
12:07:01 [build] mode: "static"
12:07:01 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
12:07:01 [build] Collecting build info...
12:07:01 [build] ✓ Completed in 66ms.
12:07:01 [build] Building static entrypoints...
12:07:01 [vite] ✓ built in 570ms
12:07:02 [vite] ✓ built in 393ms
12:07:02 [build] Rearranging server assets...

 generating static routes 
12:07:02   ├─ /404.html (+20ms) 
12:07:02   ├─ /ads.txt (+5ms) 
12:07:02   ├─ /dev/social/en/index.html (+8ms) 
12:07:02   ├─ /dev/social/es/index.html (+3ms) 
12:07:02   ├─ /dev/components/index.html (+3ms) 
12:07:02   ├─ /go-links.json (+4ms) 
12:07:02   ├─ /robots.txt (+12ms) 
12:07:02   ├─ /about/index.html (+21ms) 
12:07:02   ├─ /es/about/index.html (+17ms) 
12:07:02   ├─ /credits/index.html (+9ms) 
12:07:02   ├─ /es/credits/index.html (+5ms) 
12:07:02   ├─ /privacy/index.html (+5ms) 
12:07:02   ├─ /es/privacy/index.html (+5ms) 
12:07:02   ├─ /terms/index.html (+5ms) 
12:07:02   ├─ /es/terms/index.html (+4ms) 
12:07:02   ├─ /index.html (+6ms) 
12:07:02   ├─ /es/index.html (+3ms) 
12:07:02 ✓ Completed in 183ms.

12:07:02 [build] ✓ Completed in 1.27s.
12:07:02 [site-files] wrote _headers and .well-known/security.txt for the local environment
12:07:02 [build] 14 page(s) built in 1.37s
12:07:02 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-13.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-13", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-13
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 270 tests using 4 workers

  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /es/ passes automated accessibility checks (3.2s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /about/ passes automated accessibility checks (3.3s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /es/about/ passes automated accessibility checks (3.4s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › / passes automated accessibility checks (3.3s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /terms/ passes automated accessibility checks (2.5s)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /privacy/ passes automated accessibility checks (2.6s)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /es/privacy/ passes automated accessibility checks (2.7s)
  ok   8 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /credits/ passes automated accessibility checks (3.3s)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (106ms)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (832ms)
  ok  10 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /dev/components/ passes automated accessibility checks (2.4s)
  ok  11 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.4s)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (709ms)
  ok   9 [desktop] › tests\e2e\accessibility.spec.ts:21:3 › /es/credits/ passes automated accessibility checks (3.4s)
  ok  18 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (121ms)
  ok  17 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (828ms)
  ok  19 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (56ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.2s)
  ok  16 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.3s)
  ok  21 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (1.8s)
  ok  23 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (1.9s)
  ok  22 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.4s)
  ok  20 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.6s)
  ok  25 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (2.5s)
  ok  24 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.8s)
  ok  27 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.1s)
  ok  28 [desktop] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (2.1s)
  ok  29 [desktop] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (2.0s)
  ok  26 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (4.8s)
  ok  31 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (4.0s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.3s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.4s)
  ok  30 [desktop] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.3s)
  ok  34 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.3s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.6s)
  ok  36 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.8s)
  ok  38 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.8s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (4.0s)
  ok  39 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.7s)
  ok  40 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (4.0s)
  ok  42 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.4s)
  ok  41 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.7s)
  ok  45 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.3s)
  ok  43 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (4.5s)
  ok  44 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.6s)
  ok  47 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (2.2s)
  ok  46 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.8s)
  -   51 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  49 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (2.0s)
  ok  48 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (2.4s)
  ok  50 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.5s)
  ok  52 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.4s)
  ok  53 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.4s)
  ok  54 [desktop] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.4s)
  ok  55 [desktop] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (1.3s)
  ok  59 [desktop] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (1.5s)
  ok  57 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (2.0s)
  ok  56 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (2.4s)
  ok  60 [desktop] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (2.0s)
  ok  62 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (2.0s)
  ok  61 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (2.3s)
  ok  65 [desktop] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (1.3s)
  ok  64 [desktop] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (2.2s)
  ok  58 [desktop] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (6.5s)
  ok  66 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (2.4s)
  ok  68 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (1.2s)
  ok  67 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (2.8s)
  ok  63 [desktop] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (5.7s)
  ok  70 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.4s)
  ok  69 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.6s)
  ok  71 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (1.1s)
  ok  73 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /about/ renders in en (874ms)
  ok  74 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /privacy/ renders in en (921ms)
  ok  72 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/about/ renders in es (1.0s)
  ok  75 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/privacy/ renders in es (1.0s)
  ok  76 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /terms/ renders in en (1.0s)
  ok  77 [desktop] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/terms/ renders in es (955ms)
  ok  78 [desktop] › tests\e2e\pages.spec.ts:75:5 › legal pages › the about page is one click from / and says it is a parody (1.2s)
  ok  80 [desktop] › tests\e2e\pages.spec.ts:82:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.1s)
  ok  81 [desktop] › tests\e2e\pages.spec.ts:97:3 › legal pages › the date is written for the reader’s language (1.0s)
  ok  79 [desktop] › tests\e2e\pages.spec.ts:75:5 › legal pages › the about page is one click from /es/ and says it is a parody (1.2s)
  ok  82 [desktop] › tests\e2e\pages.spec.ts:108:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (965ms)
  ok  83 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › / has no errors and contacts no other site (1.2s)
  ok  84 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok  85 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /about/ has no errors and contacts no other site (1.4s)
  ok  86 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/about/ has no errors and contacts no other site (1.3s)
  ok  87 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.2s)
  ok  88 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.2s)
  ok  89 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /terms/ has no errors and contacts no other site (1.1s)
  ok  90 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.1s)
  ok  94 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (958ms)
  ok  93 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.3s)
  ok  91 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.5s)
  ok  92 [desktop] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.6s)
  ok  95 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.3s)
  ok  96 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.0s)
  ok  97 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.0s)
  ok  98 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (3.7s)
  ok 100 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (2.3s)
  ok 102 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.1s)
  ok 103 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.6s)
  ok 104 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.0s)
  ok 101 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.0s)
  ok 105 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.0s)
  ok 108 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (2.5s)
  ok 106 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.8s)
  ok 110 [desktop] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (2.3s)
  ok  99 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (13.1s)
  ok 111 [desktop] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.0s)
  ok 109 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (5.0s)
  ok 112 [desktop] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (4.0s)
  ok 113 [desktop] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.8s)
  ok 107 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (11.1s)
  ok 114 [desktop] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (4.0s)
  ok 117 [desktop] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.7s)
  ok 115 [desktop] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.9s)
  ok 116 [desktop] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (2.4s)
  ok 118 [desktop] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (2.0s)
  ok 119 [desktop] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.8s)
  ok 120 [desktop] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.9s)
  ok 121 [desktop] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (2.3s)
  ok 125 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (263ms)
  ok 126 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (79ms)
  ok 127 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (52ms)
  ok 123 [desktop] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (1.7s)
  ok 129 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (65ms)
  ok 122 [desktop] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (1.9s)
  ok 130 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (55ms)
  ok 128 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.3s)
  ok 131 [desktop] › tests\e2e\social.spec.ts:46:3 › / tells link previews what to show (1.1s)
  ok 132 [desktop] › tests\e2e\social.spec.ts:46:3 › /es/ tells link previews what to show (1.2s)
  ok 135 [desktop] › tests\e2e\social.spec.ts:85:1 › the page the pictures are drawn from is not indexed (833ms)
  ok 133 [desktop] › tests\e2e\social.spec.ts:46:3 › /privacy/ tells link previews what to show (1.3s)
  ok 134 [desktop] › tests\e2e\social.spec.ts:46:3 › /es/credits/ tells link previews what to show (1.2s)
  ok 124 [desktop] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (5.6s)
  ok 136 [phone] › tests\e2e\accessibility.spec.ts:21:3 › / passes automated accessibility checks (2.8s)
  ok 137 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /es/ passes automated accessibility checks (2.8s)
  ok 138 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /about/ passes automated accessibility checks (2.7s)
  ok 139 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /es/about/ passes automated accessibility checks (2.7s)
  ok 140 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /privacy/ passes automated accessibility checks (2.6s)
  ok 142 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /terms/ passes automated accessibility checks (2.3s)
  ok 141 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /es/privacy/ passes automated accessibility checks (2.7s)
  ok 143 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /credits/ passes automated accessibility checks (3.1s)
  ok 145 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /dev/components/ passes automated accessibility checks (2.3s)
  ok 147 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (92ms)
  ok 146 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.2s)
  ok 144 [phone] › tests\e2e\accessibility.spec.ts:21:3 › /es/credits/ passes automated accessibility checks (3.3s)
  ok 149 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (910ms)
  ok 148 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.0s)
  ok 153 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (92ms)
  ok 154 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (41ms)
  ok 150 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.3s)
  ok 152 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (755ms)
  ok 151 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.3s)
  ok 156 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (2.0s)
  ok 158 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (2.6s)
  ok 155 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.7s)
  ok 157 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.5s)
  ok 160 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (2.1s)
  ok 162 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.2s)
  ok 159 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (5.2s)
  ok 163 [phone] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (2.3s)
  ok 161 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (4.6s)
  ok 164 [phone] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (2.5s)
  ok 166 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (4.1s)
  ok 167 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.6s)
  ok 168 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.5s)
  ok 165 [phone] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.2s)
  ok 169 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (4.0s)
  ok 170 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.3s)
  ok 171 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (5.1s)
  ok 172 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (4.1s)
  ok 173 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.3s)
  ok 174 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.5s)
  ok 175 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.5s)
  ok 176 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.1s)
  ok 177 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.3s)
  ok 180 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.4s)
  -  182 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 179 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.9s)
  ok 178 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (5.3s)
  ok 183 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (2.2s)
  ok 181 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (4.3s)
  ok 185 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.7s)
  ok 184 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.9s)
  ok 188 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.2s)
  ok 186 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (2.0s)
  ok 187 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.5s)
  ok 189 [phone] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.4s)
  ok 190 [phone] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (1.7s)
  ok 191 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (2.9s)
  ok 192 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (2.8s)
  ok 194 [phone] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (2.0s)
  ok 195 [phone] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (1.2s)
  ok 196 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (1.3s)
  ok 197 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (2.0s)
  ok 199 [phone] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (2.2s)
  ok 200 [phone] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (1.5s)
  ok 193 [phone] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (7.8s)
  ok 201 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (2.1s)
  ok 203 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (1.1s)
  ok 202 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (2.2s)
  -  206 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 204 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.7s)
  ok 205 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.4s)
  ok 207 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /about/ renders in en (947ms)
  ok 198 [phone] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (6.7s)
  ok 208 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/about/ renders in es (1.1s)
  ok 209 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /privacy/ renders in en (1.0s)
  ok 210 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/privacy/ renders in es (1.1s)
  ok 211 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /terms/ renders in en (1.0s)
  ok 212 [phone] › tests\e2e\pages.spec.ts:61:5 › legal pages › /es/terms/ renders in es (1.1s)
  ok 213 [phone] › tests\e2e\pages.spec.ts:75:5 › legal pages › the about page is one click from / and says it is a parody (1.1s)
  ok 214 [phone] › tests\e2e\pages.spec.ts:75:5 › legal pages › the about page is one click from /es/ and says it is a parody (1.1s)
  ok 215 [phone] › tests\e2e\pages.spec.ts:82:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.4s)
  ok 217 [phone] › tests\e2e\pages.spec.ts:108:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (967ms)
  ok 216 [phone] › tests\e2e\pages.spec.ts:97:3 › legal pages › the date is written for the reader’s language (1.4s)
  ok 218 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › / has no errors and contacts no other site (1.5s)
  ok 219 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.4s)
  ok 220 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /about/ has no errors and contacts no other site (1.2s)
  ok 221 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/about/ has no errors and contacts no other site (1.3s)
  ok 222 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok 223 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.1s)
  ok 224 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /terms/ has no errors and contacts no other site (997ms)
  ok 225 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.1s)
  ok 226 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.2s)
  ok 228 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.2s)
  ok 229 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (962ms)
  ok 227 [phone] › tests\e2e\pages.spec.ts:139:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.4s)
  ok 230 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.4s)
  ok 231 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.8s)
  ok 232 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.3s)
  ok 235 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (2.1s)
  ok 233 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (4.6s)
  ok 237 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.2s)
  ok 238 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.5s)
  ok 236 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.1s)
  ok 239 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (2.2s)
  ok 240 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.8s)
  ok 243 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (2.2s)
  ok 241 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (4.6s)
  ok 234 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (11.6s)
  ok 246 [phone] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.5s)
  ok 245 [phone] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (3.1s)
  ok 244 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (5.6s)
  ok 248 [phone] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (3.8s)
  ok 247 [phone] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (4.0s)
  ok 242 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (11.9s)
  ok 252 [phone] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.8s)
  ok 250 [phone] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (2.2s)
  ok 249 [phone] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (4.9s)
  ok 251 [phone] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (2.9s)
  ok 253 [phone] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (2.2s)
  ok 255 [phone] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.7s)
  ok 254 [phone] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (2.3s)
  -  257 [phone] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 260 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (254ms)
  ok 261 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (141ms)
  ok 256 [phone] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (2.4s)
  ok 262 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (162ms)
  ok 264 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (62ms)
  ok 265 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (38ms)
  ok 258 [phone] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (1.2s)
  ok 266 [phone] › tests\e2e\social.spec.ts:46:3 › / tells link previews what to show (1.0s)
  ok 263 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.3s)
  ok 267 [phone] › tests\e2e\social.spec.ts:46:3 › /es/ tells link previews what to show (1.1s)
  ok 270 [phone] › tests\e2e\social.spec.ts:85:1 › the page the pictures are drawn from is not indexed (590ms)
  ok 268 [phone] › tests\e2e\social.spec.ts:46:3 › /privacy/ tells link previews what to show (1.0s)
  ok 269 [phone] › tests\e2e\social.spec.ts:46:3 › /es/credits/ tells link previews what to show (1.1s)
  ok 259 [phone] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (5.4s)

  4 skipped
  266 passed (2.9m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Do the tests catch real breakage?

The communist figure in `src/lib/death-tolls.ts` was changed on purpose from 60 to 70 million. "states the same death tolls as the results" failed in English and in Spanish. The figure was then restored.

### Checked in a real browser

`/about/` was opened in the browser; the text, headings and the filled-in contact address were read back from the page.

### Secret scan and OSV dependency scan

Not run locally. They run in CI. The lockfile is unchanged.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
