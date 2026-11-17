## What this is

The last of the owner's three design requests built so far: a worldwide death toll on each result that rolls up from zero.

The joke is the false dilemma. Pick a side in the Spanish Civil War and the quiz labels you, at once and to the extreme, a global communist or a fascist, the way opponents label each other today. The death toll is the full weight of that label, stated plainly and from sources.

## What a visitor sees

- **Communist result:** "20,000,000+", then "people killed worldwide by communist regimes".
- **Fascist result:** "11,000,000+", then "people killed worldwide by fascist and Nazi regimes".
- The figure rolls up from zero for two seconds, starting just after the emblem lands, then stops.
- Below "Take quiz again", small print gives the range of estimates and names the sources.
- Everything down to the button still fits one screen on a phone and a laptop. Only the small print may need a scroll.

## Decisions worth a look

- **The figures are the low end of the published estimates, with "over" (a "+" on screen),** so the claim is true by every source cited. The sources, and why each figure covers what it does, are in `docs/decisions/0008`. The figures live in `src/lib/death-tolls.ts`.
- **The fascist figure counts murders, not war deaths.** It is the US Holocaust Memorial Museum's figure for the Holocaust and Nazi persecution. The Second World War's 70 to 85 million deaths are mentioned in the small print but not added to the figure.
- **Both labels say "worldwide",** as the owner asked. The fascist label previously said "murdered by fascist and Nazi regimes"; it now matches the communist one.
- **Screen readers hear one sentence** ("Over 20,000,000 people killed worldwide by communist regimes") instead of rolling digits.
- **With "reduce motion" on, or without the script,** the figure is simply there. The final figure is in the page itself.
- **The emblem is a little smaller** than in the visual design pull request, to make room for the toll without pushing the button off a phone screen.
- **The visual design spec** (`docs/specs/visual-design.md`) now describes the toll, its motion and the joke it serves.

## What is not verified

- **Whether the figures and wording are right for this site is the owner's call.** They follow the owner's instructions and cite their sources, but they are a judgement.
- **Not tested with a real screen reader,** on a real phone, or in Safari or Firefox. The browser tests run in Chromium with a desktop and a phone-sized profile.
- **The Spanish wording** was written by a coding agent and should be read by a Spanish speaker.

## Launch-checklist items ticked in this pull request

None.

## No new dependencies

## How to review

1. Look at the screenshots of both results (phone and desktop), sent to the owner on November 17, 2026.
2. Read `docs/decisions/0008` (one page) and check you are happy with the figures and the wording.
3. Take the quiz both ways and watch the counter.

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 17, 2026, on top of the Wikipedia link branch.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 109 unit tests passed; of 208 end-to-end tests, 204 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
00:02:42 [types] Generated 113ms
00:02:42 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (55 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  5 passed (5)
      Tests  109 passed (109)
   Start at  00:02:55
   Duration  1.24s (import 68%, tests 17%, transform 11%, worker 4%)

00:03:00 [types] Generated 79ms
00:03:00 [build] output: "static"
00:03:00 [build] mode: "static"
00:03:00 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
00:03:00 [build] Collecting build info...
00:03:00 [build] ✓ Completed in 114ms.
00:03:00 [build] Building static entrypoints...
00:03:01 [vite] ✓ built in 472ms
00:03:01 [vite] ✓ built in 413ms
00:03:01 [build] Rearranging server assets...

 generating static routes 
00:03:01   ├─ /404.html (+46ms) 
00:03:01   ├─ /ads.txt (+7ms) 
00:03:01   ├─ /dev/components/index.html (+5ms) 
00:03:01   ├─ /go-links.json (+7ms) 
00:03:01   ├─ /robots.txt (+17ms) 
00:03:01   ├─ /privacy/index.html (+17ms) 
00:03:01   ├─ /es/privacy/index.html (+7ms) 
00:03:01   ├─ /terms/index.html (+6ms) 
00:03:01   ├─ /es/terms/index.html (+5ms) 
00:03:01   ├─ /index.html (+9ms) 
00:03:01   ├─ /es/index.html (+3ms) 
00:03:01 ✓ Completed in 210ms.

00:03:01 [build] ✓ Completed in 1.24s.
00:03:01 [site-files] wrote _headers and .well-known/security.txt for the local environment
00:03:01 [build] 8 page(s) built in 1.40s
00:03:01 [build] Complete!
[WebServer] ▲ [WARNING] No compatibility_date was specified. Using the default compatibility date: 2026-11-13.
[WebServer] 
[WebServer]   ❯❯ Add one to your Wrangler configuration file: compatibility_date = "2026-11-13", or
[WebServer]   ❯❯ Pass it in your terminal: wrangler pages dev [<DIRECTORY>] --compatibility-date=2026-11-13
[WebServer]   
[WebServer]   See https://developers.cloudflare.com/workers/platform/compatibility-dates/ for more information.
[WebServer] 
[WebServer] 

Running 208 tests using 4 workers

  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (3.3s)
  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (3.4s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (3.5s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (3.8s)
  ok   8 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (128ms)
  ok   9 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.1s)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.8s)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.7s)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (968ms)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.7s)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (342ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (82ms)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (1.1s)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.4s)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.6s)
  ok  17 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (2.3s)
  ok  19 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (2.3s)
  ok  16 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.2s)
  ok  18 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.4s)
  ok  21 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (2.0s)
  ok  23 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.0s)
  ok  24 [desktop] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (1.9s)
  ok  20 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.8s)
  ok  22 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (4.1s)
  ok  25 [desktop] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (1.3s)
  ok  28 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.2s)
  ok  29 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.3s)
  ok  27 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (4.2s)
  ok  26 [desktop] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.5s)
  ok  30 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.3s)
  ok  31 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.3s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.5s)
  ok  34 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.7s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.7s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (4.0s)
  ok  36 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.4s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.4s)
  ok  38 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.7s)
  ok  39 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.7s)
  ok  40 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.8s)
  ok  41 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.1s)
  ok  43 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (1.7s)
  ok  44 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (2.0s)
  -   47 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  45 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (2.0s)
  ok  42 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.1s)
  ok  46 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.3s)
  ok  49 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.3s)
  ok  50 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (1.1s)
  ok  48 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.7s)
  ok  51 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.4s)
  ok  52 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (1.1s)
  ok  54 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (1.2s)
  ok  53 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.3s)
  ok  55 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (1.1s)
  ok  56 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (883ms)
  ok  57 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (875ms)
  ok  58 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (928ms)
  ok  59 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (926ms)
  ok  60 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (692ms)
  ok  61 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok  62 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok  63 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.2s)
  ok  64 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (979ms)
  ok  65 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (885ms)
  ok  66 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (983ms)
  ok  68 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (791ms)
  ok  67 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (997ms)
  ok  69 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.2s)
  ok  70 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.8s)
  ok  71 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.1s)
  ok  72 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (3.1s)
  ok  74 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.7s)
  ok  76 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (891ms)
  ok  77 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.4s)
  ok  78 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.9s)
  ok  79 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.0s)
  ok  75 [desktop] › tests\e2e\quiz.spec.ts:241:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.9s)
  ok  82 [desktop] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (2.0s)
  ok  80 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.5s)
  ok  73 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (10.2s)
  ok  84 [desktop] › tests\e2e\quiz.spec.ts:265:3 › the Back and Forward buttons › step through the screens in order (2.6s)
  ok  85 [desktop] › tests\e2e\quiz.spec.ts:288:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.5s)
  ok  83 [desktop] › tests\e2e\quiz.spec.ts:241:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.8s)
  ok  87 [desktop] › tests\e2e\quiz.spec.ts:324:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.3s)
  ok  86 [desktop] › tests\e2e\quiz.spec.ts:301:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.9s)
  ok  88 [desktop] › tests\e2e\quiz.spec.ts:348:3 › the answer stays private › choosing an answer sends nothing to anyone (3.4s)
  ok  81 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (10.5s)
  ok  89 [desktop] › tests\e2e\quiz.spec.ts:370:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.7s)
  ok  90 [desktop] › tests\e2e\quiz.spec.ts:396:3 › the answer stays private › reloading on a result goes back to the start (1.7s)
  ok  91 [desktop] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.1s)
  ok  92 [desktop] › tests\e2e\quiz.spec.ts:426:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.5s)
  ok  93 [desktop] › tests\e2e\quiz.spec.ts:440:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.5s)
  ok  94 [desktop] › tests\e2e\quiz.spec.ts:463:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.4s)
  ok  95 [desktop] › tests\e2e\quiz.spec.ts:498:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.5s)
  ok  99 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (104ms)
  ok  97 [desktop] › tests\e2e\quiz.spec.ts:556:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (969ms)
  ok 100 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (79ms)
  ok 102 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (152ms)
  ok 103 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (51ms)
  ok 104 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (35ms)
  ok  96 [desktop] › tests\e2e\quiz.spec.ts:524:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (1.8s)
  ok 101 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.1s)
  ok  98 [desktop] › tests\e2e\quiz.spec.ts:571:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.8s)
  ok 105 [phone] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (2.3s)
  ok 106 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.3s)
  ok 107 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.9s)
  ok 108 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.5s)
  ok 112 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (421ms)
  ok 109 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.9s)
  ok 110 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (3.0s)
  ok 114 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (1.1s)
  ok 113 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (1.5s)
  ok 117 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (1.5s)
  ok 115 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.8s)
  ok 118 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (125ms)
  ok 111 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (3.7s)
  ok 116 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (2.0s)
  ok 119 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (148ms)
  ok 123 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (2.3s)
  ok 121 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (2.5s)
  ok 125 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (1.5s)
  ok 120 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.3s)
  ok 122 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (4.4s)
  ok 127 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (1.4s)
  ok 128 [phone] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (1.4s)
  ok 124 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (3.9s)
  ok 129 [phone] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (1.0s)
  ok 126 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (3.7s)
  ok 131 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (2.9s)
  ok 132 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.5s)
  ok 133 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.4s)
  ok 134 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.5s)
  ok 130 [phone] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.2s)
  ok 135 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.1s)
  ok 136 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (2.8s)
  ok 137 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.8s)
  ok 138 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (2.8s)
  ok 139 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (2.7s)
  ok 140 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.9s)
  ok 141 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (2.9s)
  ok 142 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (2.9s)
  ok 143 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (2.9s)
  -  147 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 145 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.1s)
  ok 144 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.0s)
  ok 150 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (854ms)
  ok 148 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.5s)
  ok 149 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.4s)
  ok 151 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (1.1s)
  ok 146 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.1s)
  ok 152 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.3s)
  ok 153 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.3s)
  ok 154 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (644ms)
  -  157 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 155 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.1s)
  ok 158 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (941ms)
  ok 156 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.3s)
  ok 159 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (880ms)
  ok 160 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (762ms)
  ok 161 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (755ms)
  ok 163 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (953ms)
  ok 164 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (785ms)
  ok 162 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.0s)
  ok 165 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.2s)
  ok 166 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.2s)
  ok 167 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.2s)
  ok 168 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.2s)
  ok 169 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (920ms)
  ok 172 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (682ms)
  ok 170 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.0s)
  ok 171 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.0s)
  ok 173 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.1s)
  ok 174 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.7s)
  ok 175 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.9s)
  ok 178 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.3s)
  ok 176 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (2.9s)
  ok 180 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (851ms)
  ok 181 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.3s)
  ok 182 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.6s)
  ok 183 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.6s)
  ok 179 [phone] › tests\e2e\quiz.spec.ts:241:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (4.7s)
  ok 186 [phone] › tests\e2e\quiz.spec.ts:214:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (1.2s)
  ok 184 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (4.0s)
  ok 177 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (8.8s)
  ok 188 [phone] › tests\e2e\quiz.spec.ts:265:3 › the Back and Forward buttons › step through the screens in order (1.8s)
  ok 189 [phone] › tests\e2e\quiz.spec.ts:288:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.9s)
  ok 187 [phone] › tests\e2e\quiz.spec.ts:241:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (4.3s)
  ok 191 [phone] › tests\e2e\quiz.spec.ts:324:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.7s)
  ok 185 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (8.8s)
  ok 190 [phone] › tests\e2e\quiz.spec.ts:301:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.6s)
  ok 193 [phone] › tests\e2e\quiz.spec.ts:370:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.5s)
  ok 192 [phone] › tests\e2e\quiz.spec.ts:348:3 › the answer stays private › choosing an answer sends nothing to anyone (2.9s)
  ok 195 [phone] › tests\e2e\quiz.spec.ts:413:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.2s)
  ok 196 [phone] › tests\e2e\quiz.spec.ts:426:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.6s)
  ok 194 [phone] › tests\e2e\quiz.spec.ts:396:3 › the answer stays private › reloading on a result goes back to the start (1.7s)
  ok 197 [phone] › tests\e2e\quiz.spec.ts:440:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.6s)
  -  200 [phone] › tests\e2e\quiz.spec.ts:524:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 198 [phone] › tests\e2e\quiz.spec.ts:463:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.4s)
  ok 203 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (53ms)
  ok 201 [phone] › tests\e2e\quiz.spec.ts:556:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (849ms)
  ok 199 [phone] › tests\e2e\quiz.spec.ts:498:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.2s)
  ok 204 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (54ms)
  ok 206 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (46ms)
  ok 205 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (76ms)
  ok 208 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (44ms)
  ok 207 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.1s)
  ok 202 [phone] › tests\e2e\quiz.spec.ts:571:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.7s)

  4 skipped
  204 passed (2.1m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Checked in a real browser

Both results were opened in Chromium against the built site, at phone (Pixel 7) and desktop (1366 by 768) sizes. Each counter finished on its figure (20,000,000 and 11,000,000), and the verdict, emblem, toll and button were all on screen.

### Secret scan and OSV dependency scan

Not run locally. They run in CI.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
