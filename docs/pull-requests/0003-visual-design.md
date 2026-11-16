## What this is

The second feature: how the quiz looks and moves. This is the brief's one must-have, "a graphically pleasing webpage with animations and color", plus the two result images.

The quiz's rules do not change. The spec is `docs/specs/visual-design.md`.

## What a visitor sees

- **A straight face.** The intro and the question look like a careful, slightly self-important online assessment: paper-white page with faint graph-paper lines, navy ink, serif type, a small chart-like logo, and three confident facts (1 question, 60 seconds, 0 sign-ups) above the Start button.
- **The punchline.** Choosing an answer cuts the whole page to red or brown. The verdict slams in as huge yellow poster lettering with one short shake, a huge emblem spins into place under it, and about a second later "Take quiz again" pops up.
- **The emblems.** A hammer and sickle for the communist result and a fasces for the fascist result, both drawn from scratch as SVG in this repository. No Nazi symbols.
- **Everything fits one screen.** On a phone and on a laptop the verdict, the emblem and the button are all visible without scrolling.
- The privacy policy, terms and 404 page take the same type and colours.

## Decisions worth a look

- **Nothing is loaded from outside the site**: no web fonts, images or libraries (`docs/decisions/0007`). The verdict uses Impact where the device has it (Windows, macOS) and another heavy condensed font elsewhere, so it looks a little different on phones.
- **The copy sounds grand but every claim is literally true.** No invented user counts, testimonials or endorsements. The Spanish was written by a coding agent and should be read by a Spanish speaker.
- **Motion is safe.** The colour change is one cut, never a flicker. Nothing loops and everything is over in a second and a half. With "reduce motion" switched on, nothing animates at all.
- **Nothing animates when the page first loads**, only when a visitor moves to a screen. The tests caught a real glitch here: on a first visit, about one time in ten, Chrome animated the Start button from the browser's default grey into our navy. Button transitions are now switched on only after the page has been drawn once, and 80 repeated runs were clean.
- **Hover effects only where there is a real pointer.** On a touch screen, hover would stick to the last place tapped and make an answer look already chosen.
- **A keyboard user who tabs to "Take quiz again" early sees it at once**, instead of focusing a button that has not popped up yet.

## What is not verified

- **Whether it looks good is a judgement, and it is the owner's.** Screenshots of every screen were sent; please look at them, and at the animation on a preview link once Cloudflare is connected.
- **Not seen on a real iPhone or Android phone, or in Safari or Firefox.** The browser tests run in Chromium with a desktop and a phone-sized profile. The lettering font and some newer layout features differ by browser. Older browsers get a plainer fallback that has not been looked at.
- **The animation was checked by tests, not watched by a person.** Tests confirm which animations run, that none loops, and that none run with "reduce motion" on. Nobody has yet judged the timing by eye.
- **Not tested with a real screen reader.** Each emblem has a text label and the automated checks pass.
- **The legal position of the imagery is unchanged** from risk 8 in `docs/ARCHITECTURE.md`: these symbols are restricted in some countries the site will reach.
- **CI has not run on this branch.** It is stacked on the quiz-flow branch.

## Launch-checklist items ticked in this pull request

None. "Pages load acceptably on a slow connection" is deliberately left open until it can be measured on the staging site; the home page weighs under 60 kB, which a test now enforces.

## No new dependencies

## How to review

1. Look at the screenshots, then take the quiz on the preview link on your phone and on a computer.
2. Turn on "reduce motion" in your device's accessibility settings and take it again: the result should simply appear.
3. Read `docs/specs/visual-design.md` (one page) and `docs/decisions/0007`.

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 16, 2026.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 109 unit tests passed; of 182 end-to-end tests, 178 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
10:49:14 [types] Generated 57ms
10:49:14 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (53 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  5 passed (5)
      Tests  109 passed (109)
   Start at  10:49:20
   Duration  813ms (import 67%, tests 17%, transform 11%, worker 5%)

10:49:24 [types] Generated 38ms
10:49:24 [build] output: "static"
10:49:24 [build] mode: "static"
10:49:24 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
10:49:24 [build] Collecting build info...
10:49:24 [build] ✓ Completed in 60ms.
10:49:24 [build] Building static entrypoints...
10:49:24 [vite] ✓ built in 339ms
10:49:24 [vite] ✓ built in 264ms
10:49:24 [build] Rearranging server assets...

 generating static routes 
10:49:24   ├─ /404.html (+20ms) 
10:49:24   ├─ /ads.txt (+4ms) 
10:49:24   ├─ /dev/components/index.html (+4ms) 
10:49:24   ├─ /go-links.json (+4ms) 
10:49:24   ├─ /robots.txt (+4ms) 
10:49:24   ├─ /privacy/index.html (+4ms) 
10:49:24   ├─ /es/privacy/index.html (+3ms) 
10:49:24   ├─ /terms/index.html (+3ms) 
10:49:24   ├─ /es/terms/index.html (+3ms) 
10:49:24   ├─ /index.html (+6ms) 
10:49:24   ├─ /es/index.html (+2ms) 
10:49:24 ✓ Completed in 135ms.

10:49:25 [build] ✓ Completed in 849ms.
10:49:25 [site-files] wrote _headers and .well-known/security.txt for the local environment
10:49:25 [build] 8 page(s) built in 927ms
10:49:25 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-10.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-10", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-10
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 182 tests using 4 workers

  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.5s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (2.4s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (2.7s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.7s)
  ok   8 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (134ms)
  ok   9 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (679ms)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (553ms)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.1s)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.0s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.0s)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (137ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (53ms)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (679ms)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.1s)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.2s)
  ok  16 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok  17 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (2.7s)
  ok  18 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (2.7s)
  ok  19 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok  20 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (2.5s)
  ok  21 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (2.6s)
  ok  22 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok  23 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (2.6s)
  ok  24 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (2.5s)
  ok  25 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok  26 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.7s)
  ok  27 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (2.7s)
  ok  30 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (733ms)
  ok  29 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.5s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (1.4s)
  ok  28 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.3s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (809ms)
  ok  31 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (2.8s)
  -   36 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  34 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.4s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.4s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.0s)
  ok  39 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (651ms)
  ok  38 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.1s)
  ok  40 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (968ms)
  ok  42 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (788ms)
  ok  43 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (856ms)
  ok  41 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.1s)
  ok  44 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (784ms)
  ok  45 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (750ms)
  ok  46 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (728ms)
  ok  48 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (880ms)
  ok  47 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (971ms)
  ok  49 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (702ms)
  ok  50 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.2s)
  ok  51 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.0s)
  ok  52 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.2s)
  ok  53 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.1s)
  ok  54 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (880ms)
  ok  57 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (541ms)
  ok  55 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (964ms)
  ok  56 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (908ms)
  ok  58 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok  59 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok  60 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok  64 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (831ms)
  ok  65 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.0s)
  ok  61 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (3.9s)
  ok  66 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok  67 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.3s)
  ok  63 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.3s)
  ok  68 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.0s)
  ok  62 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (7.6s)
  ok  71 [desktop] › tests\e2e\quiz.spec.ts:238:3 › the Back and Forward buttons › step through the screens in order (1.4s)
  ok  70 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.2s)
  ok  72 [desktop] › tests\e2e\quiz.spec.ts:261:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.7s)
  ok  74 [desktop] › tests\e2e\quiz.spec.ts:297:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.6s)
  ok  76 [desktop] › tests\e2e\quiz.spec.ts:343:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.2s)
  ok  69 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (7.6s)
  ok  73 [desktop] › tests\e2e\quiz.spec.ts:274:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.9s)
  ok  75 [desktop] › tests\e2e\quiz.spec.ts:321:3 › the answer stays private › choosing an answer sends nothing to anyone (2.8s)
  ok  79 [desktop] › tests\e2e\quiz.spec.ts:386:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.2s)
  ok  77 [desktop] › tests\e2e\quiz.spec.ts:369:3 › the answer stays private › reloading on a result goes back to the start (1.5s)
  ok  78 [desktop] › tests\e2e\quiz.spec.ts:399:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.3s)
  ok  80 [desktop] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.4s)
  ok  82 [desktop] › tests\e2e\quiz.spec.ts:471:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.3s)
  ok  84 [desktop] › tests\e2e\quiz.spec.ts:529:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (956ms)
  ok  81 [desktop] › tests\e2e\quiz.spec.ts:436:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.4s)
  ok  86 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (48ms)
  ok  87 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (78ms)
  ok  88 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (42ms)
  ok  90 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (32ms)
  ok  91 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (50ms)
  ok  83 [desktop] › tests\e2e\quiz.spec.ts:497:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (1.9s)
  ok  89 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.0s)
  ok  92 [phone] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (1.9s)
  ok  93 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (1.8s)
  ok  85 [desktop] › tests\e2e\quiz.spec.ts:544:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.7s)
  ok  94 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.0s)
  ok  96 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (1.8s)
  ok  98 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (91ms)
  ok  95 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (2.1s)
  ok  97 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (1.8s)
  ok  99 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (754ms)
  ok 101 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (742ms)
  ok 104 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (738ms)
  ok 105 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (71ms)
  ok 106 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (30ms)
  ok 102 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.0s)
  ok 103 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.0s)
  ok 100 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.4s)
  ok 107 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok 109 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (2.5s)
  ok 108 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (2.6s)
  ok 110 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok 111 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (2.5s)
  ok 113 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok 112 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (2.6s)
  ok 114 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (2.5s)
  ok 115 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (2.6s)
  ok 116 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok 117 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.5s)
  ok 121 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (672ms)
  ok 118 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (2.5s)
  -  123 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 120 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.4s)
  ok 124 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.3s)
  ok 119 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.1s)
  ok 126 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (651ms)
  ok 122 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (2.5s)
  ok 125 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.2s)
  ok 127 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (1.0s)
  ok 130 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (501ms)
  ok 128 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.1s)
  ok 129 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.1s)
  -  133 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 134 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (839ms)
  ok 131 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.1s)
  ok 132 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.0s)
  ok 135 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (782ms)
  ok 136 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (712ms)
  ok 137 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (710ms)
  ok 138 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (845ms)
  ok 139 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (838ms)
  ok 140 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (659ms)
  ok 141 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (968ms)
  ok 142 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.1s)
  ok 143 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok 144 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (839ms)
  ok 145 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (752ms)
  ok 148 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (595ms)
  ok 146 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (924ms)
  ok 147 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (938ms)
  ok 149 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (974ms)
  ok 150 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok 151 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok 155 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (706ms)
  ok 152 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (3.1s)
  ok 156 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok 157 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok 158 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.3s)
  ok 154 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.2s)
  ok 159 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.0s)
  ok 153 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (7.4s)
  ok 162 [phone] › tests\e2e\quiz.spec.ts:238:3 › the Back and Forward buttons › step through the screens in order (1.2s)
  ok 163 [phone] › tests\e2e\quiz.spec.ts:261:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.5s)
  ok 161 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.1s)
  ok 165 [phone] › tests\e2e\quiz.spec.ts:297:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.6s)
  ok 164 [phone] › tests\e2e\quiz.spec.ts:274:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.1s)
  ok 160 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (7.3s)
  ok 167 [phone] › tests\e2e\quiz.spec.ts:343:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.3s)
  ok 169 [phone] › tests\e2e\quiz.spec.ts:386:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (761ms)
  ok 168 [phone] › tests\e2e\quiz.spec.ts:369:3 › the answer stays private › reloading on a result goes back to the start (1.4s)
  ok 166 [phone] › tests\e2e\quiz.spec.ts:321:3 › the answer stays private › choosing an answer sends nothing to anyone (3.8s)
  ok 170 [phone] › tests\e2e\quiz.spec.ts:399:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.3s)
  -  174 [phone] › tests\e2e\quiz.spec.ts:497:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 171 [phone] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.7s)
  ok 172 [phone] › tests\e2e\quiz.spec.ts:436:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.1s)
  ok 173 [phone] › tests\e2e\quiz.spec.ts:471:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.1s)
  ok 178 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (51ms)
  ok 175 [phone] › tests\e2e\quiz.spec.ts:529:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (652ms)
  ok 177 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (100ms)
  ok 179 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (58ms)
  ok 181 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (28ms)
  ok 182 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (41ms)
  ok 180 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (872ms)
  ok 176 [phone] › tests\e2e\quiz.spec.ts:544:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.7s)

  4 skipped
  178 passed (1.4m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Do the design tests catch real breakage?

I broke the design on purpose five ways and re-ran the tests. The first attempt caught four of the five: the touch-screen hover test passed when it should have failed, so I rewrote that test and confirmed it now fails when the rule is broken. The code was restored afterwards.

| Deliberate breakage | Caught by |
| --- | --- |
| The "reduce motion" guard removed | 6 failing browser tests |
| The screen shake made to repeat | 2 failing browser tests |
| The emblem shrunk to a fraction of its size | 8 failing browser tests |
| The emblems' screen-reader labels removed | 4 failing browser tests |
| Hover styles allowed on touch screens | 1 failing browser test (after the test was rewritten) |

### Page weight

The English home page is 6.8 kB of HTML plus 16.1 kB of styles and scripts, uncompressed, with no images or fonts to fetch. Error tracking (89 kB) is a separate file that loads only when a Sentry address is configured, after the page is usable.

### Looked at by a person

Screenshots of every screen, on a laptop-sized and a phone-sized screen, in English and Spanish, were taken from the built site and sent to the owner. The animation itself has not been watched by a person yet.

### Secret scan and OSV dependency scan

Not run locally. They run in CI.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
