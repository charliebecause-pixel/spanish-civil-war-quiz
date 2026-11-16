## What this is

The first feature after foundations: the quiz itself, working end to end. Intro, the one question, the two results, and "Take quiz again".

This pull request is about behaviour. The hammer and sickle and fasces images, the animation and the pop-academic styling are the next pull request.

## What a visitor gets

1. The page reads "60 second political ideology test" with a **Start** button.
2. Start shows **Question #1** in big bold letters, the question, and two buttons below it: **Republicans** and **Nationalists**.
3. Republicans turns the whole page red with big yellow lettering: "YOU'RE A COMMUNIST!!!". Nationalists turns it brown: "YOU'RE A FASCIST!!!".
4. A **Take quiz again** button resets the page.

All of it works in English (`/`) and Spanish (`/es/`), by mouse, touch and keyboard.

## Decisions worth a look

- **The answer is never sent or stored.** No screen has its own address, and the browser history holds a random key instead of the answer. Reloading a result goes back to the start. See `docs/decisions/0006`.
- **Back and Forward step through the screens**, so a visitor can go back and try the other answer.
- **Double-clicks are safe.** The second click of a double-click is ignored, and a test checks that no button appears where the last one was.
- **If the script does not load**, Start stays disabled and the page says what to do after four seconds (at once if JavaScript is off).
- **Wording:** the question is the brief's text with "etc." given its full stops and a question mark added at the end.
- **Spanish** is included here rather than as its own later feature, because the foundations already require every text in both languages. The Spanish wording was written by a coding agent and should be read by a Spanish speaker before launch.
- **Colours:** red `#be0000`, brown `#5b3a1e`, yellow `#ffdd00`. Chosen so every piece of text on the result screens, including the footer links, keeps at least 4.5:1 contrast.

## What is not verified

- **Not tested with a real screen reader.** Focus moves to each new screen's heading and the automated accessibility checks pass, but nobody has listened to it in NVDA or VoiceOver.
- **Not tested on a real phone or in Safari or Firefox.** The browser tests run in Chromium only, with a desktop and a phone-sized profile. The double-click guard relies on the browser's click count, which I could not confirm for double taps in Safari on iPhone; the "no button where the last one was" layout test is the backstop.
- **Analytics counting.** Cloudflare Web Analytics may count each screen change as a page view. `docs/decisions/0006` says how to check once it is switched on.
- **CI has not run on this branch.** It is stacked on `foundations`, whose first CI run is still pending.

## Launch-checklist items ticked in this pull request

- Core business logic has unit tests written against the requirements.
- The browser back button behaves as expected in every flow.
- Every screen has empty, loading and error states.

## No new dependencies

## How to review

1. Open the preview link and take the quiz both ways, in English and at `/es/`. Try Back after a result, and try reloading on a result.
2. Read `docs/decisions/0006` (one page).
3. Skim `src/lib/quiz.ts` (the rules) and `tests/unit/quiz.test.ts` (the rules, restated as tests).

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 16, 2026.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 109 unit tests passed; of 136 end-to-end tests, 134 passed and 2 were skipped on purpose (the two keyboard tests do not apply to the phone profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
00:57:34 [types] Generated 51ms
00:57:34 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (50 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  5 passed (5)
      Tests  109 passed (109)
   Start at  00:57:41
   Duration  1.16s (import 65%, tests 19%, transform 14%, worker 3%)

00:57:45 [types] Generated 37ms
00:57:45 [build] output: "static"
00:57:45 [build] mode: "static"
00:57:45 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
00:57:45 [build] Collecting build info...
00:57:45 [build] ✓ Completed in 67ms.
00:57:45 [build] Building static entrypoints...
00:57:45 [vite] ✓ built in 364ms
00:57:46 [vite] ✓ built in 250ms
00:57:46 [build] Rearranging server assets...

 generating static routes 
00:57:46   ├─ /404.html (+20ms) 
00:57:46   ├─ /ads.txt (+4ms) 
00:57:46   ├─ /dev/components/index.html (+5ms) 
00:57:46   ├─ /go-links.json (+4ms) 
00:57:46   ├─ /robots.txt (+4ms) 
00:57:46   ├─ /privacy/index.html (+5ms) 
00:57:46   ├─ /es/privacy/index.html (+5ms) 
00:57:46   ├─ /terms/index.html (+3ms) 
00:57:46   ├─ /es/terms/index.html (+3ms) 
00:57:46   ├─ /index.html (+2ms) 
00:57:46   ├─ /es/index.html (+2ms) 
00:57:46 ✓ Completed in 156ms.

00:57:46 [build] ✓ Completed in 873ms.
00:57:46 [site-files] wrote _headers and .well-known/security.txt for the local environment
00:57:46 [build] 8 page(s) built in 957ms
00:57:46 [build] Complete!

Running 136 tests using 4 workers

  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (2.4s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (2.5s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.8s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (2.9s)
  ok   8 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (73ms)
  ok   9 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (734ms)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (2.2s)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (672ms)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.2s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.3s)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (210ms)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (62ms)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (889ms)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.3s)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.2s)
  ok  16 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (903ms)
  ok  19 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (980ms)
  ok  18 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.2s)
  ok  17 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.5s)
  ok  20 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (904ms)
  ok  21 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (918ms)
  ok  22 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (790ms)
  ok  23 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (754ms)
  ok  24 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.0s)
  ok  26 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (729ms)
  ok  25 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (878ms)
  ok  27 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok  28 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.0s)
  ok  29 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.0s)
  ok  30 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.1s)
  ok  31 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (842ms)
  ok  34 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (667ms)
  ok  33 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (982ms)
  ok  32 [desktop] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.0s)
  ok  35 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (907ms)
  ok  36 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.0s)
  ok  37 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.2s)
  ok  38 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (1.4s)
  ok  40 [desktop] › tests\e2e\quiz.spec.ts:212:5 › the quiz in English › no button appears where the button just pressed was (1.2s)
  ok  41 [desktop] › tests\e2e\quiz.spec.ts:234:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (1.1s)
  ok  42 [desktop] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (849ms)
  ok  43 [desktop] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (983ms)
  ok  44 [desktop] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (971ms)
  ok  45 [desktop] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.0s)
  ok  46 [desktop] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (1.1s)
  ok  48 [desktop] › tests\e2e\quiz.spec.ts:212:5 › the quiz in Spanish › no button appears where the button just pressed was (1.2s)
  ok  49 [desktop] › tests\e2e\quiz.spec.ts:234:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (925ms)
  ok  39 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (5.3s)
  ok  50 [desktop] › tests\e2e\quiz.spec.ts:258:3 › the Back and Forward buttons › step through the screens in order (1.1s)
  ok  51 [desktop] › tests\e2e\quiz.spec.ts:281:3 › the Back and Forward buttons › let the visitor go back and choose the other side (1.0s)
  ok  52 [desktop] › tests\e2e\quiz.spec.ts:294:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (1.6s)
  ok  53 [desktop] › tests\e2e\quiz.spec.ts:317:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.6s)
  ok  54 [desktop] › tests\e2e\quiz.spec.ts:341:3 › the answer stays private › choosing an answer sends nothing to anyone (1.8s)
  ok  55 [desktop] › tests\e2e\quiz.spec.ts:363:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.1s)
  ok  47 [desktop] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (5.2s)
  ok  56 [desktop] › tests\e2e\quiz.spec.ts:389:3 › the answer stays private › reloading on a result goes back to the start (1.3s)
  ok  57 [desktop] › tests\e2e\quiz.spec.ts:406:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (875ms)
  ok  58 [desktop] › tests\e2e\quiz.spec.ts:419:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.1s)
  ok  59 [desktop] › tests\e2e\quiz.spec.ts:433:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.0s)
  ok  63 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (128ms)
  ok  61 [desktop] › tests\e2e\quiz.spec.ts:485:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (843ms)
  ok  64 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (61ms)
  ok  60 [desktop] › tests\e2e\quiz.spec.ts:456:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (1.2s)
  ok  66 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (50ms)
  ok  67 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (53ms)
  ok  68 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (74ms)
  ok  65 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (889ms)
  ok  69 [phone] › tests\e2e\accessibility.spec.ts:17:3 › / passes automated accessibility checks (1.9s)
  ok  70 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/ passes automated accessibility checks (1.9s)
  ok  62 [desktop] › tests\e2e\quiz.spec.ts:500:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.7s)
  ok  71 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /privacy/ passes automated accessibility checks (2.2s)
  ok  73 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /terms/ passes automated accessibility checks (1.9s)
  ok  72 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /es/privacy/ passes automated accessibility checks (2.1s)
  ok  75 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (79ms)
  ok  77 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (796ms)
  ok  76 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (879ms)
  ok  74 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.0s)
  ok  81 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (919ms)
  ok  79 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.3s)
  ok  82 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (128ms)
  ok  83 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (56ms)
  ok  80 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.3s)
  ok  84 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (749ms)
  -   87 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok  78 [phone] › tests\e2e\accessibility.spec.ts:17:3 › /dev/components/ passes automated accessibility checks (2.7s)
  ok  86 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.2s)
  ok  85 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.2s)
  ok  88 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (796ms)
  ok  91 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (750ms)
  ok  90 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (821ms)
  ok  89 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (901ms)
  ok  92 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (949ms)
  ok  94 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (755ms)
  ok  93 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (881ms)
  ok  95 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok  96 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.0s)
  ok  97 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok  98 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.1s)
  ok  99 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /terms/ has no errors and contacts no other site (845ms)
  ok 102 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (681ms)
  ok 100 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.0s)
  ok 101 [phone] › tests\e2e\pages.spec.ts:122:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok 103 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (941ms)
  ok 104 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.1s)
  ok 105 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.0s)
  ok 106 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in English › "Take quiz again" resets the page to the start (1.4s)
  ok 109 [phone] › tests\e2e\quiz.spec.ts:234:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (929ms)
  ok 108 [phone] › tests\e2e\quiz.spec.ts:212:5 › the quiz in English › no button appears where the button just pressed was (1.1s)
  ok 110 [phone] › tests\e2e\quiz.spec.ts:88:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (775ms)
  ok 111 [phone] › tests\e2e\quiz.spec.ts:104:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.0s)
  ok 112 [phone] › tests\e2e\quiz.spec.ts:128:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.2s)
  ok 113 [phone] › tests\e2e\quiz.spec.ts:149:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.3s)
  ok 114 [phone] › tests\e2e\quiz.spec.ts:170:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (1.4s)
  ok 116 [phone] › tests\e2e\quiz.spec.ts:212:5 › the quiz in Spanish › no button appears where the button just pressed was (1.2s)
  ok 107 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in English › the question and both results pass automated accessibility checks (5.1s)
  ok 117 [phone] › tests\e2e\quiz.spec.ts:234:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (985ms)
  ok 118 [phone] › tests\e2e\quiz.spec.ts:258:3 › the Back and Forward buttons › step through the screens in order (1.1s)
  ok 119 [phone] › tests\e2e\quiz.spec.ts:281:3 › the Back and Forward buttons › let the visitor go back and choose the other side (951ms)
  ok 120 [phone] › tests\e2e\quiz.spec.ts:294:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (1.2s)
  ok 121 [phone] › tests\e2e\quiz.spec.ts:317:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (1.3s)
  ok 123 [phone] › tests\e2e\quiz.spec.ts:363:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (748ms)
  ok 122 [phone] › tests\e2e\quiz.spec.ts:341:3 › the answer stays private › choosing an answer sends nothing to anyone (1.5s)
  ok 115 [phone] › tests\e2e\quiz.spec.ts:190:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (5.0s)
  ok 124 [phone] › tests\e2e\quiz.spec.ts:389:3 › the answer stays private › reloading on a result goes back to the start (1.0s)
  ok 125 [phone] › tests\e2e\quiz.spec.ts:406:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (826ms)
  -  128 [phone] › tests\e2e\quiz.spec.ts:456:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 126 [phone] › tests\e2e\quiz.spec.ts:419:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.0s)
  ok 131 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (109ms)
  ok 129 [phone] › tests\e2e\quiz.spec.ts:485:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (732ms)
  ok 132 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (58ms)
  ok 127 [phone] › tests\e2e\quiz.spec.ts:433:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (943ms)
  ok 133 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (65ms)
  ok 135 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (28ms)
  ok 136 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (51ms)
  ok 134 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (742ms)
  ok 130 [phone] › tests\e2e\quiz.spec.ts:500:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.7s)

  2 skipped
  134 passed (49.6s)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Do the tests catch real breakage?

Every test passed the first time it ran, so I broke the code on purpose six ways and re-ran the tests each time. Each breakage was caught, and the code was restored afterwards.

| Deliberate breakage | Caught by |
| --- | --- |
| The two verdicts swapped | 2 failing unit tests |
| The answer written into the browser history | 2 failing unit tests |
| A result can be changed without going back to the question | 2 failing unit tests |
| A result survives a reload | 4 failing unit tests |
| Double-click guard removed | 1 failing browser test |
| Communist result is brown instead of red | 2 failing browser tests |

### Checked in a real browser

Taken by hand in the app's browser pane against the built site: Start, Republicans, Back, Nationalists. Both result screens showed correctly, the console had no errors, and no network request was made after the page loaded. Screenshots of every screen (desktop in English, phone in Spanish) were sent to the owner.

### Secret scan and OSV dependency scan

Not run locally. They run in CI.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
