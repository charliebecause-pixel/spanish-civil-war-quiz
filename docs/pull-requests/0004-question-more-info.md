## What this is

A small addition the owner asked for: under the question, a link that says "Need to know more about this question?" and opens the Wikipedia article on the Spanish Civil War.

## What a visitor gets

- The link sits well below the two answer buttons, so a tap aimed at an answer cannot hit it.
- It opens the article in the visitor's language: English Wikipedia on `/`, Spanish Wikipedia on `/es/`.
- It opens in a new tab, so the quiz is still there when the visitor comes back. The link text says so: "(Wikipedia, opens in a new tab)".

## Decisions worth a look

- **Nothing is sent to Wikipedia or loaded from it unless the visitor clicks.** The link carries `rel="noopener noreferrer"`, so Wikipedia is not told which page the visitor came from. The Content-Security-Policy is unchanged, because a plain link needs no permission.
- **No privacy policy change.** Wikipedia is not a partner and receives nothing from the site. A visitor who clicks is simply visiting Wikipedia.
- **The visual design spec** (`docs/specs/visual-design.md`) now describes the link on the question screen.

## What is not verified

- **Not tested with a real screen reader.** The link's full text, including "opens in a new tab", is its accessible name, and the automated accessibility checks pass.
- **Not tested on a real phone or in Safari or Firefox.** The browser tests run in Chromium with a desktop and a phone-sized profile.
- **The Spanish wording** was written by a coding agent and should be read by a Spanish speaker.

## Launch-checklist items ticked in this pull request

None.

## No new dependencies

## How to review

1. Take the quiz in English and at `/es/`, and click the link on the question screen. The right article should open in a new tab.
2. Skim the new test in `tests/e2e/quiz.spec.ts` ("the question offers a Wikipedia link in the same language, in a new tab").

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 17, 2026, after the visual design was merged into `main`.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 109 unit tests passed; of 186 end-to-end tests, 182 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
22:46:08 [types] Generated 137ms
22:46:08 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (53 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  5 passed (5)
      Tests  109 passed (109)
   Start at  22:46:22
   Duration  2.34s (import 64%, transform 16%, tests 14%, worker 5%)

22:46:30 [types] Generated 72ms
22:46:30 [build] output: "static"
22:46:30 [build] mode: "static"
22:46:30 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
22:46:30 [build] Collecting build info...
22:46:30 [build] ✓ Completed in 130ms.
22:46:30 [build] Building static entrypoints...
22:46:31 [vite] ✓ built in 590ms
22:46:31 [vite] ✓ built in 659ms
22:46:31 [build] Rearranging server assets...

 generating static routes 
22:46:32   ├─ /404.html (+50ms) 
22:46:32   ├─ /ads.txt (+9ms) 
22:46:32   ├─ /dev/components/index.html (+6ms) 
22:46:32   ├─ /go-links.json (+11ms) 
22:46:32   ├─ /robots.txt (+32ms) 
22:46:32   ├─ /privacy/index.html (+13ms) 
22:46:32   ├─ /es/privacy/index.html (+6ms) 
22:46:32   ├─ /terms/index.html (+10ms) 
22:46:32   ├─ /es/terms/index.html (+23ms) 
22:46:32   ├─ /index.html (+19ms) 
22:46:32   ├─ /es/index.html (+9ms) 
22:46:32 ✓ Completed in 276ms.

22:46:32 [build] ✓ Completed in 1.68s.
22:46:32 [site-files] wrote _headers and .well-known/security.txt for the local environment
22:46:32 [build] 8 page(s) built in 1.84s
22:46:32 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-13.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-13", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-13
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 186 tests using 4 workers

  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (3.7s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (3.8s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (3.8s)
  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (3.9s)
  ok   8 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (106ms)
  ok   9 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.2s)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (936ms)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.7s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.6s)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.7s)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (188ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (105ms)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (1.0s)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.6s)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.6s)
  ok  16 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (3.1s)
  ok  17 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.1s)
  ok  18 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.1s)
  ok  19 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.3s)
  ok  20 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (2.9s)
  ok  21 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (2.9s)
  ok  22 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.3s)
  ok  23 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.0s)
  ok  24 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (2.8s)
  ok  25 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.4s)
  ok  26 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.9s)
  ok  27 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.1s)
  ok  30 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.3s)
  ok  29 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.8s)
  ok  28 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.4s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (1.6s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.7s)
  ok  31 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.1s)
  -   36 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  34 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.8s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.0s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.2s)
  ok  39 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (900ms)
  ok  38 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.3s)
  ok  40 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.2s)
  ok  42 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (953ms)
  ok  41 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.2s)
  ok  43 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (929ms)
  ok  44 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (887ms)
  ok  45 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (786ms)
  ok  46 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (820ms)
  ok  47 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.0s)
  ok  48 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (945ms)
  ok  49 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (788ms)
  ok  50 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.2s)
  ok  52 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.0s)
  ok  51 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.1s)
  ok  53 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (993ms)
  ok  54 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (888ms)
  ok  57 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (634ms)
  ok  55 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (951ms)
  ok  56 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (947ms)
  ok  58 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.2s)
  ok  59 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok  60 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.9s)
  ok  63 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.5s)
  ok  65 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (820ms)
  ok  61 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (3.8s)
  ok  66 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok  67 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.4s)
  ok  68 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok  64 [desktop] › tests\e2e\quiz.spec.ts:241:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.7s)
  ok  71 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (1.3s)
  ok  69 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.7s)
  ok  62 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (8.3s)
  ok  73 [desktop] › tests\e2e\quiz.spec.ts:265:3 › the Back and Forward buttons › step through the screens in order (1.3s)
  ok  74 [desktop] › tests\e2e\quiz.spec.ts:288:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.7s)
  ok  72 [desktop] › tests\e2e\quiz.spec.ts:241:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.1s)
  ok  76 [desktop] › tests\e2e\quiz.spec.ts:324:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.6s)
  ok  75 [desktop] › tests\e2e\quiz.spec.ts:301:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.3s)
  ok  78 [desktop] › tests\e2e\quiz.spec.ts:370:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.2s)
  ok  70 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (7.8s)
  ok  80 [desktop] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.0s)
  ok  79 [desktop] › tests\e2e\quiz.spec.ts:396:3 › the answer stays private › reloading on a result goes back to the start (1.4s)
  ok  81 [desktop] › tests\e2e\quiz.spec.ts:426:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.6s)
  ok  77 [desktop] › tests\e2e\quiz.spec.ts:348:3 › the answer stays private › choosing an answer sends nothing to anyone (3.8s)
  ok  82 [desktop] › tests\e2e\quiz.spec.ts:440:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.4s)
  ok  83 [desktop] › tests\e2e\quiz.spec.ts:463:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.3s)
  ok  84 [desktop] › tests\e2e\quiz.spec.ts:498:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.4s)
  ok  88 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (71ms)
  ok  89 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (52ms)
  ok  86 [desktop] › tests\e2e\quiz.spec.ts:556:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (944ms)
  ok  90 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (51ms)
  ok  92 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (50ms)
  ok  93 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (34ms)
  ok  85 [desktop] › tests\e2e\quiz.spec.ts:524:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (1.8s)
  ok  91 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (996ms)
  ok  87 [desktop] › tests\e2e\quiz.spec.ts:571:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.9s)
  ok  94 [phone] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (2.2s)
  ok  95 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.2s)
  ok  96 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.4s)
  ok  97 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.0s)
  ok  98 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.0s)
  ok 101 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (144ms)
  ok 103 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (886ms)
  ok 102 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.1s)
  ok  99 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.1s)
  ok 106 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (901ms)
  ok 107 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (89ms)
  ok 104 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.2s)
  ok 108 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (50ms)
  ok 105 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.3s)
  ok 100 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (3.3s)
  ok 109 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok 110 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (2.8s)
  ok 111 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (2.7s)
  ok 112 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok 113 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (2.6s)
  ok 114 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (2.7s)
  ok 115 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.7s)
  ok 116 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (2.6s)
  ok 117 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (2.5s)
  ok 118 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.6s)
  ok 119 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.5s)
  ok 123 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (752ms)
  ok 120 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (2.5s)
  -  125 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 122 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (2.5s)
  ok 126 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.4s)
  ok 121 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.1s)
  ok 128 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (835ms)
  ok 124 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (2.7s)
  ok 127 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.3s)
  ok 129 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (1.1s)
  ok 132 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (668ms)
  ok 130 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.2s)
  ok 131 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.1s)
  ok 133 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (957ms)
  -  135 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 134 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.1s)
  ok 136 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (883ms)
  ok 137 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (818ms)
  ok 138 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (811ms)
  ok 139 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (786ms)
  ok 142 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (774ms)
  ok 141 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (897ms)
  ok 140 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (971ms)
  ok 143 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok 145 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.0s)
  ok 144 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok 146 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.2s)
  ok 147 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (877ms)
  ok 150 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (580ms)
  ok 148 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (907ms)
  ok 149 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok 151 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok 152 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.3s)
  ok 153 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok 156 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.3s)
  ok 158 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.1s)
  ok 154 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (4.0s)
  ok 159 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok 157 [phone] › tests\e2e\quiz.spec.ts:241:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.3s)
  ok 160 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.7s)
  ok 161 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok 164 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (1.3s)
  ok 155 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (7.9s)
  ok 162 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.9s)
  ok 166 [phone] › tests\e2e\quiz.spec.ts:265:3 › the Back and Forward buttons › step through the screens in order (1.3s)
  ok 167 [phone] › tests\e2e\quiz.spec.ts:288:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.6s)
  ok 165 [phone] › tests\e2e\quiz.spec.ts:241:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.2s)
  ok 169 [phone] › tests\e2e\quiz.spec.ts:324:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.6s)
  ok 168 [phone] › tests\e2e\quiz.spec.ts:301:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.1s)
  ok 163 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (7.8s)
  ok 171 [phone] › tests\e2e\quiz.spec.ts:370:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.3s)
  ok 170 [phone] › tests\e2e\quiz.spec.ts:348:3 › the answer stays private › choosing an answer sends nothing to anyone (2.9s)
  ok 172 [phone] › tests\e2e\quiz.spec.ts:396:3 › the answer stays private › reloading on a result goes back to the start (1.6s)
  ok 173 [phone] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.3s)
  ok 174 [phone] › tests\e2e\quiz.spec.ts:426:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.6s)
  -  178 [phone] › tests\e2e\quiz.spec.ts:524:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 175 [phone] › tests\e2e\quiz.spec.ts:440:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.6s)
  ok 176 [phone] › tests\e2e\quiz.spec.ts:463:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.6s)
  ok 181 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (62ms)
  ok 177 [phone] › tests\e2e\quiz.spec.ts:498:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.5s)
  ok 182 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (49ms)
  ok 183 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (148ms)
  ok 185 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (65ms)
  ok 179 [phone] › tests\e2e\quiz.spec.ts:556:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (841ms)
  ok 186 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (43ms)
  ok 184 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (985ms)
  ok 180 [phone] › tests\e2e\quiz.spec.ts:571:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.8s)

  4 skipped
  182 passed (1.7m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Secret scan and OSV dependency scan

Not run locally. They run in CI.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
