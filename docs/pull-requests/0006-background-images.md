## What this is

The owner's design request for images: faded propaganda posters behind the question, and photos of each movement "in its worst state" behind each result. Twelve images, each approved by the owner by file name, source, licence and size before it was downloaded. The spec is `docs/specs/background-images.md`.

## What a visitor sees

- **The question:** three Republican posters, faint and blurred, behind the Republicans side, and one Nationalist poster behind the Nationalists side. On a laptop the sides are left and right; on a phone, where the buttons are stacked, they are top and bottom.
- **The communist result:** in grey, tinted red: prisoners building the White Sea Canal (1932), the fence and guard tower of the Perm-36 labour camp, Deni's poster "Stalin's Pipe" (1930), a Cultural Revolution poster of Mao, and the Mao portrait on Tiananmen Gate.
- **The fascist result:** in grey, tinted brown: the rails and gate at Auschwitz II-Birkenau, the "Arbeit macht frei" gate at Auschwitz I, and the Nazi leaders in the dock at Nuremberg (1945).
- **An image credits page** (`/credits/`, `/es/credits/`), linked from every page's footer, with each image's description, author, licence, changes and a link to the original.

## Decisions worth a look

- **No Nazi emblems and no victims' bodies.** The camps are shown by their gates, rails and fences. Posters with swastikas were left out. So were Nationalist posters with the Falange yoke and arrows, because of Spain's 2022 Democratic Memory Law, which leaves one Nationalist poster.
- **The answer still never leaves the browser.** Every image is fetched when the question appears, so the files requested are the same whichever answer is chosen (`docs/decisions/0009`). The privacy test caught this: the first version fetched each result's photos only when it appeared, which would have told the server the answer.
- **Images only darken the page.** Each is multiplied onto the page colour, so every piece of text keeps the contrast it had (at least 4.5:1). A test checks how each image is drawn.
- **Nothing is loaded from outside the site,** and the Content-Security-Policy is unchanged. The images were downloaded once from Wikimedia Commons (at its standard 960-pixel size, as Wikimedia asks of automated downloads), shrunk with Windows' own System.Drawing, and saved in `public/images/quiz/`. No new dependency.
- **Weights:** the home page still fetches no images and stays under 60 kB. Starting the quiz fetches about 400 kB of images in all. Every image is under 70 kB, and a unit test checks that and each screen's total.
- **Credits:** three images are under Creative Commons Attribution-ShareAlike licences (Perm-36 by Gerald Praschl, the Auschwitz I gate by Yair Haklai, and the Tiananmen photo). The credits page names their authors and licences and says our changed copies are shared under the same licence.

## What is not verified

- **Whether the images are right for the site is the owner's call.** They follow the owner's brief and the list the owner approved, but the effect is a judgement. Screenshots of every screen were sent.
- **Licences are as Wikimedia Commons states them.** Commons is reliable but not infallible, and "public domain" there is judged mostly under US law. The Spanish Civil War posters used are by unknown artists and over 80 years old, which also puts them in the public domain in Spain.
- **Not tested on a real phone or in Safari or Firefox,** or with a real screen reader. The images are hidden from screen readers.
- **The Spanish wording** of the credits page was written by a coding agent and should be read by a Spanish speaker.

## Launch-checklist items ticked in this pull request

None. "Pages load acceptably on a slow connection" stays open until it can be measured on the staging site; this pull request adds about 400 kB once the quiz starts.

## No new dependencies

## How to review

1. Look at the screenshots of the question and both results, on a phone and a laptop.
2. Open `/credits/` and check each image's description reads fairly.
3. Read `docs/specs/background-images.md` and `docs/decisions/0009` (one page each).

## Check output

Run on Windows 11, Node 24.18.0, pnpm 12.20.0, on November 17, 2026, on top of the death toll branch.

### `corepack pnpm check` (lint, formatting, type check, unit tests, build, end-to-end tests): exit code 0

<details>
<summary>Full output: 126 unit tests passed; of 244 end-to-end tests, 240 passed and 4 were skipped on purpose (three keyboard tests do not apply to the phone profile, and the touch-screen test does not apply to the desktop profile)</summary>

```
$ eslint . && prettier --check . && ASTRO_TELEMETRY_DISABLED=1 astro check && vitest run && ASTRO_TELEMETRY_DISABLED=1 astro build && playwright test
Checking formatting...
All matched files use Prettier code style!
11:45:07 [types] Generated 76ms
11:45:07 [check] Getting diagnostics for Astro files in C:\dev\spanish-civil-war-quiz...
Result (60 files): 
- 0 errors
- 0 warnings
- 0 hints


 RUN  v5.1.0 C:/dev/spanish-civil-war-quiz


 Test Files  6 passed (6)
      Tests  126 passed (126)
   Start at  11:45:16
   Duration  955ms (import 66%, tests 17%, transform 11%, worker 5%)

11:45:20 [types] Generated 55ms
11:45:20 [build] output: "static"
11:45:20 [build] mode: "static"
11:45:20 [build] directory: C:\dev\spanish-civil-war-quiz\dist\
11:45:20 [build] Collecting build info...
11:45:20 [build] ✓ Completed in 87ms.
11:45:20 [build] Building static entrypoints...
11:45:21 [vite] ✓ built in 384ms
11:45:21 [vite] ✓ built in 324ms
11:45:21 [build] Rearranging server assets...

 generating static routes 
11:45:21   ├─ /404.html (+28ms) 
11:45:21   ├─ /ads.txt (+7ms) 
11:45:21   ├─ /dev/components/index.html (+7ms) 
11:45:21   ├─ /go-links.json (+6ms) 
11:45:21   ├─ /robots.txt (+6ms) 
11:45:21   ├─ /credits/index.html (+6ms) 
11:45:21   ├─ /es/credits/index.html (+6ms) 
11:45:21   ├─ /privacy/index.html (+6ms) 
11:45:21   ├─ /es/privacy/index.html (+7ms) 
11:45:21   ├─ /terms/index.html (+5ms) 
11:45:21   ├─ /es/terms/index.html (+5ms) 
11:45:21   ├─ /index.html (+13ms) 
11:45:21   ├─ /es/index.html (+5ms) 
11:45:21 ✓ Completed in 175ms.

11:45:21 [build] ✓ Completed in 1.04s.
11:45:21 [site-files] wrote _headers and .well-known/security.txt for the local environment
11:45:21 [build] 10 page(s) built in 1.15s
11:45:21 [build] Complete!

Running 244 tests using 4 workers

  ok   1 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › / passes automated accessibility checks (2.8s)
  ok   3 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/ passes automated accessibility checks (2.8s)
  ok   4 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /privacy/ passes automated accessibility checks (3.0s)
  ok   2 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/privacy/ passes automated accessibility checks (3.2s)
  ok   5 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /terms/ passes automated accessibility checks (2.0s)
  ok   8 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /dev/components/ passes automated accessibility checks (2.1s)
  ok  10 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (67ms)
  ok   6 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /credits/ passes automated accessibility checks (2.7s)
  ok   7 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /es/credits/ passes automated accessibility checks (2.7s)
  ok  11 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (794ms)
  ok  12 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (748ms)
  ok   9 [desktop] › tests\e2e\accessibility.spec.ts:19:3 › /this-page-does-not-exist/ passes automated accessibility checks (1.9s)
  ok  16 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (105ms)
  ok  17 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (48ms)
  ok  13 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.1s)
  ok  15 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (660ms)
  ok  14 [desktop] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (1.1s)
  ok  18 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (1.6s)
  ok  21 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (3.2s)
  ok  20 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (3.9s)
  ok  19 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.3s)
  ok  23 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (1.6s)
  ok  22 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.2s)
  ok  25 [desktop] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (2.1s)
  ok  26 [desktop] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (1.9s)
  ok  27 [desktop] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (1.4s)
  ok  24 [desktop] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (4.3s)
  ok  29 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (3.4s)
  ok  30 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.3s)
  ok  31 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.9s)
  ok  28 [desktop] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (6.7s)
  ok  32 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.2s)
  ok  33 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.2s)
  ok  34 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.2s)
  ok  35 [desktop] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.4s)
  ok  36 [desktop] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.1s)
  ok  37 [desktop] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.3s)
  ok  38 [desktop] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.5s)
  ok  39 [desktop] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.2s)
  ok  40 [desktop] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.9s)
  ok  41 [desktop] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.8s)
  ok  43 [desktop] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.5s)
  ok  42 [desktop] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.3s)
  ok  45 [desktop] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once (1.9s)
  ok  46 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (2.0s)
  -   49 [desktop] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there
  ok  44 [desktop] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.0s)
  ok  48 [desktop] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.3s)
  ok  47 [desktop] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.8s)
  ok  50 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.4s)
  ok  51 [desktop] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.4s)
  ok  53 [desktop] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (998ms)
  ok  52 [desktop] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.1s)
  ok  54 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (1.6s)
  ok  57 [desktop] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (1.3s)
  ok  55 [desktop] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (1.7s)
  ok  58 [desktop] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (1.6s)
  ok  59 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (1.6s)
  ok  60 [desktop] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (2.3s)
  ok  62 [desktop] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (1.7s)
  ok  63 [desktop] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (1.3s)
  ok  64 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (2.0s)
  ok  66 [desktop] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (963ms)
  ok  65 [desktop] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (2.5s)
  ok  61 [desktop] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (4.9s)
  ok  56 [desktop] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (7.9s)
  ok  69 [desktop] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link (1.0s)
  ok  67 [desktop] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.2s)
  ok  70 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (1.0s)
  ok  68 [desktop] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.2s)
  ok  73 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (813ms)
  ok  72 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (845ms)
  ok  71 [desktop] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (930ms)
  ok  74 [desktop] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (1.0s)
  ok  76 [desktop] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (836ms)
  ok  75 [desktop] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (1.0s)
  ok  77 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › / has no errors and contacts no other site (1.1s)
  ok  78 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.3s)
  ok  79 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok  80 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.2s)
  ok  81 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /terms/ has no errors and contacts no other site (1.1s)
  ok  82 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (1.1s)
  ok  83 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.2s)
  ok  85 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok  86 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (716ms)
  ok  84 [desktop] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.3s)
  ok  87 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.3s)
  ok  88 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.5s)
  ok  89 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.6s)
  ok  92 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.7s)
  ok  94 [desktop] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.1s)
  ok  90 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (5.0s)
  ok  95 [desktop] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.5s)
  ok  93 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.1s)
  ok  96 [desktop] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.9s)
  ok  97 [desktop] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.2s)
  ok  98 [desktop] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.5s)
  ok 100 [desktop] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (2.3s)
  ok  91 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (10.0s)
  ok 102 [desktop] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (1.7s)
  ok 103 [desktop] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.7s)
  ok 101 [desktop] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (5.1s)
  ok 105 [desktop] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.1s)
  ok 104 [desktop] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (4.5s)
  ok 107 [desktop] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.8s)
  ok  99 [desktop] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (10.8s)
  ok 106 [desktop] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (3.5s)
  ok 108 [desktop] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (2.3s)
  ok 109 [desktop] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.3s)
  ok 110 [desktop] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (1.9s)
  ok 111 [desktop] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.7s)
  ok 113 [desktop] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.6s)
  ok 112 [desktop] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (2.0s)
  ok 117 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (83ms)
  ok 118 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (46ms)
  ok 119 [desktop] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (146ms)
  ok 115 [desktop] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (1.3s)
  ok 121 [desktop] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (80ms)
  ok 122 [desktop] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (43ms)
  ok 114 [desktop] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space (2.5s)
  ok 120 [desktop] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.5s)
  ok 116 [desktop] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (5.0s)
  ok 123 [phone] › tests\e2e\accessibility.spec.ts:19:3 › / passes automated accessibility checks (2.1s)
  ok 124 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/ passes automated accessibility checks (2.3s)
  ok 125 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /privacy/ passes automated accessibility checks (2.5s)
  ok 126 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /terms/ passes automated accessibility checks (2.2s)
  ok 127 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /credits/ passes automated accessibility checks (2.8s)
  ok 128 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/credits/ passes automated accessibility checks (2.7s)
  ok 132 [phone] › tests\e2e\ads-and-affiliates.spec.ts:8:3 › /ads.txt › lists every ad network in the config as plain text (68ms)
  ok 130 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /dev/components/ passes automated accessibility checks (1.9s)
  ok 129 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /es/privacy/ passes automated accessibility checks (2.4s)
  ok 134 [phone] › tests\e2e\ads-and-affiliates.spec.ts:36:3 › ad slot › nothing in or around the slot invites a click (674ms)
  ok 133 [phone] › tests\e2e\ads-and-affiliates.spec.ts:19:3 › ad slot › reserves its full size, is labelled, and loads nothing from an ad network (739ms)
  ok 131 [phone] › tests\e2e\accessibility.spec.ts:19:3 › /this-page-does-not-exist/ passes automated accessibility checks (2.0s)
  ok 137 [phone] › tests\e2e\ads-and-affiliates.spec.ts:60:3 › paid links › go through /go/, are marked sponsored, and are disclosed right beside the link (667ms)
  ok 139 [phone] › tests\e2e\ads-and-affiliates.spec.ts:86:3 › paid links › /go/<unknown> is a 404, never a redirect (45ms)
  ok 138 [phone] › tests\e2e\ads-and-affiliates.spec.ts:73:3 › paid links › /go/<slug> redirects to the partner with tracking parameters (118ms)
  ok 135 [phone] › tests\e2e\ads-and-affiliates.spec.ts:43:3 › ad slot › the content after the slot does not move once the page has settled (1.2s)
  ok 136 [phone] › tests\e2e\ads-and-affiliates.spec.ts:51:3 › ad slot › no ad slot appears on the legal or error pages (975ms)
  ok 142 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in English › is read out as a sentence, with its label and sources (1.9s)
  ok 143 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in English › is read out as a sentence, with its label and sources (1.9s)
  ok 141 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in English › rolls up from zero to its figure, written for the language (3.8s)
  ok 145 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the communist death toll in Spanish › is read out as a sentence, with its label and sources (1.8s)
  ok 140 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in English › rolls up from zero to its figure, written for the language (4.3s)
  ok 147 [phone] › tests\e2e\death-toll.spec.ts:45:7 › the fascist death toll in Spanish › is read out as a sentence, with its label and sources (1.9s)
  ok 144 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the communist death toll in Spanish › rolls up from zero to its figure, written for the language (4.0s)
  ok 148 [phone] › tests\e2e\death-toll.spec.ts:60:3 › the death toll with "reduce motion" switched on › shows its figure at once, without rolling (2.0s)
  ok 149 [phone] › tests\e2e\death-toll.spec.ts:68:3 › the death toll without the script › the final figures are in the page itself (959ms)
  ok 146 [phone] › tests\e2e\death-toll.spec.ts:39:7 › the fascist death toll in Spanish › rolls up from zero to its figure, written for the language (3.8s)
  ok 151 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in English › shows a huge, labelled emblem in the lettering colour (3.2s)
  ok 152 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in English › fits the verdict, the emblem and the button on one screen (3.3s)
  ok 153 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in English › uses poster lettering that stays inside the page (3.3s)
  ok 154 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in English › shows a huge, labelled emblem in the lettering colour (3.1s)
  ok 150 [phone] › tests\e2e\death-toll.spec.ts:84:3 › going back to a result › rolls to the same figure again (7.0s)
  ok 155 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in English › fits the verdict, the emblem and the button on one screen (3.0s)
  ok 156 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in English › uses poster lettering that stays inside the page (3.5s)
  ok 157 [phone] › tests\e2e\design.spec.ts:64:7 › the communist result in Spanish › shows a huge, labelled emblem in the lettering colour (2.8s)
  ok 158 [phone] › tests\e2e\design.spec.ts:92:7 › the communist result in Spanish › fits the verdict, the emblem and the button on one screen (3.2s)
  ok 159 [phone] › tests\e2e\design.spec.ts:102:7 › the communist result in Spanish › uses poster lettering that stays inside the page (3.0s)
  ok 160 [phone] › tests\e2e\design.spec.ts:64:7 › the fascist result in Spanish › shows a huge, labelled emblem in the lettering colour (3.3s)
  ok 161 [phone] › tests\e2e\design.spec.ts:92:7 › the fascist result in Spanish › fits the verdict, the emblem and the button on one screen (3.4s)
  ok 162 [phone] › tests\e2e\design.spec.ts:102:7 › the fascist result in Spanish › uses poster lettering that stays inside the page (3.2s)
  ok 163 [phone] › tests\e2e\design.spec.ts:118:3 › motion › a result arrives with a slam, a shake, a spinning emblem and a button that pops up (3.8s)
  ok 165 [phone] › tests\e2e\design.spec.ts:144:3 › motion › the first screen does not animate when the page loads (1.4s)
  -  167 [phone] › tests\e2e\design.spec.ts:158:3 › motion › a keyboard user who tabs to the button early sees it at once
  ok 164 [phone] › tests\e2e\design.spec.ts:131:3 › motion › nothing loops, and everything is over in a second and a half (3.7s)
  ok 168 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the communist result simply appears, with no animation at all (1.6s)
  ok 169 [phone] › tests\e2e\design.spec.ts:180:5 › with "reduce motion" switched on › the fascist result simply appears, with no animation at all (1.9s)
  ok 170 [phone] › tests\e2e\design.spec.ts:197:3 › with "reduce motion" switched on › the intro and the question do not animate either (1.2s)
  ok 166 [phone] › tests\e2e\design.spec.ts:150:3 › motion › going back animates the screen being returned to (3.5s)
  ok 171 [phone] › tests\e2e\design.spec.ts:207:3 › touch screens › an answer never looks chosen just because the last tap was there (1.6s)
  ok 172 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the English home page stays under 60 kB and loads nothing from elsewhere (1.6s)
  ok 173 [phone] › tests\e2e\design.spec.ts:235:5 › weight › the Spanish home page stays under 60 kB and loads nothing from elsewhere (1.3s)
  ok 174 [phone] › tests\e2e\images.spec.ts:68:5 › images in English › the home page fetches none of them (1.4s)
  ok 175 [phone] › tests\e2e\images.spec.ts:73:5 › images in English › the question shows the Republican posters on one side and the Nationalist one on the other (1.2s)
  ok 176 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the communist result shows its own photos and nothing else (1.5s)
  ok 179 [phone] › tests\e2e\images.spec.ts:68:5 › images in Spanish › the home page fetches none of them (1.4s)
  ok 177 [phone] › tests\e2e\images.spec.ts:110:7 › images in English › the fascist result shows its own photos and nothing else (1.9s)
  ok 180 [phone] › tests\e2e\images.spec.ts:73:5 › images in Spanish › the question shows the Republican posters on one side and the Nationalist one on the other (1.4s)
  ok 181 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the communist result shows its own photos and nothing else (1.6s)
  ok 182 [phone] › tests\e2e\images.spec.ts:110:7 › images in Spanish › the fascist result shows its own photos and nothing else (1.7s)
  ok 185 [phone] › tests\e2e\images.spec.ts:170:3 › images only darken the page › screen readers skip them (1.3s)
  ok 184 [phone] › tests\e2e\images.spec.ts:152:3 › images only darken the page › each is multiplied onto the page colour (1.6s)
  ok 186 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in English credits every image, with its licence (1.8s)
  ok 187 [phone] › tests\e2e\images.spec.ts:182:3 › the credits page in Spanish credits every image, with its licence (1.9s)
  ok 178 [phone] › tests\e2e\images.spec.ts:121:5 › images in English › which images are fetched gives nothing away about the answer (6.9s)
  ok 188 [phone] › tests\e2e\pages.spec.ts:6:3 › home page › shows the English page at the root (757ms)
  -  191 [phone] › tests\e2e\pages.spec.ts:39:3 › home page › the first Tab stop is a working skip link
  ok 183 [phone] › tests\e2e\images.spec.ts:121:5 › images in Spanish › which images are fetched gives nothing away about the answer (5.3s)
  ok 190 [phone] › tests\e2e\pages.spec.ts:29:3 › home page › the back button returns to the previous page (1.1s)
  ok 189 [phone] › tests\e2e\pages.spec.ts:15:3 › home page › switches to Spanish and back from the footer (1.1s)
  ok 192 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /privacy/ renders in en (821ms)
  ok 193 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/privacy/ renders in es (843ms)
  ok 195 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /es/terms/ renders in es (755ms)
  ok 194 [phone] › tests\e2e\pages.spec.ts:59:5 › legal pages › /terms/ renders in en (788ms)
  ok 196 [phone] › tests\e2e\pages.spec.ts:69:3 › legal pages › the privacy policy names every partner in the config, with its cookies (932ms)
  ok 197 [phone] › tests\e2e\pages.spec.ts:84:3 › legal pages › the date is written for the reader’s language (819ms)
  ok 198 [phone] › tests\e2e\pages.spec.ts:95:3 › error state › an unknown address gets a 404 page that says what to do, in both languages (743ms)
  ok 199 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › / has no errors and contacts no other site (1.2s)
  ok 200 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/ has no errors and contacts no other site (1.0s)
  ok 201 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /privacy/ has no errors and contacts no other site (1.1s)
  ok 202 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/privacy/ has no errors and contacts no other site (1.1s)
  ok 203 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /terms/ has no errors and contacts no other site (844ms)
  ok 204 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/terms/ has no errors and contacts no other site (868ms)
  ok 205 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /credits/ has no errors and contacts no other site (1.2s)
  ok 206 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /es/credits/ has no errors and contacts no other site (1.2s)
  ok 208 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in English › opens on the title and a Start button, with nothing else from the quiz showing (561ms)
  ok 207 [phone] › tests\e2e\pages.spec.ts:124:5 › every page is self-contained › /dev/components/ has no errors and contacts no other site (1.1s)
  ok 209 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in English › Start shows "Question #1" in big bold letters, with both answers below the question (1.5s)
  ok 211 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in English › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (1.4s)
  ok 210 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in English › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.7s)
  ok 214 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in English › the question offers a Wikipedia link in the same language, in a new tab (1.8s)
  ok 212 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in English › "Take quiz again" resets the page to the start (3.8s)
  ok 216 [phone] › tests\e2e\quiz.spec.ts:89:5 › the quiz in Spanish › opens on the title and a Start button, with nothing else from the quiz showing (1.0s)
  ok 217 [phone] › tests\e2e\quiz.spec.ts:105:5 › the quiz in Spanish › Start shows "Question #1" in big bold letters, with both answers below the question (1.4s)
  ok 218 [phone] › tests\e2e\quiz.spec.ts:129:5 › the quiz in Spanish › Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist (1.7s)
  ok 215 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in English › every screen fits a 320 pixel wide screen without scrolling sideways (5.0s)
  ok 219 [phone] › tests\e2e\quiz.spec.ts:150:5 › the quiz in Spanish › Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist (2.1s)
  ok 222 [phone] › tests\e2e\quiz.spec.ts:215:5 › the quiz in Spanish › the question offers a Wikipedia link in the same language, in a new tab (1.9s)
  ok 220 [phone] › tests\e2e\quiz.spec.ts:171:5 › the quiz in Spanish › "Take quiz again" resets the page to the start (3.7s)
  ok 213 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in English › the question and both results pass automated accessibility checks (8.9s)
  ok 224 [phone] › tests\e2e\quiz.spec.ts:266:3 › the Back and Forward buttons › step through the screens in order (2.0s)
  ok 225 [phone] › tests\e2e\quiz.spec.ts:289:3 › the Back and Forward buttons › let the visitor go back and choose the other side (2.5s)
  ok 223 [phone] › tests\e2e\quiz.spec.ts:242:5 › the quiz in Spanish › every screen fits a 320 pixel wide screen without scrolling sideways (5.0s)
  ok 227 [phone] › tests\e2e\quiz.spec.ts:325:3 › the Back and Forward buttons › coming back from another page leaves the quiz in a usable state (2.2s)
  ok 226 [phone] › tests\e2e\quiz.spec.ts:302:3 › the Back and Forward buttons › show each earlier result as it was, when the quiz is taken twice (3.9s)
  ok 221 [phone] › tests\e2e\quiz.spec.ts:191:5 › the quiz in Spanish › the question and both results pass automated accessibility checks (9.8s)
  ok 229 [phone] › tests\e2e\quiz.spec.ts:382:3 › the answer stays private › nothing about the answer is kept in the address, cookies, storage or history (1.9s)
  ok 231 [phone] › tests\e2e\quiz.spec.ts:425:3 › awkward clicking › a double-click on Start shows the question and chooses nothing (1.5s)
  ok 228 [phone] › tests\e2e\quiz.spec.ts:349:3 › the answer stays private › choosing an answer sends nothing to anyone (3.7s)
  ok 230 [phone] › tests\e2e\quiz.spec.ts:408:3 › the answer stays private › reloading on a result goes back to the start (2.4s)
  ok 232 [phone] › tests\e2e\quiz.spec.ts:438:3 › awkward clicking › a double-click on an answer shows the result and does not restart the quiz (2.2s)
  ok 234 [phone] › tests\e2e\quiz.spec.ts:475:3 › awkward clicking › a press that arrives the instant a new screen appears is ignored (1.7s)
  ok 235 [phone] › tests\e2e\quiz.spec.ts:510:3 › awkward clicking › the same hold protects the result from an instant press on "Take quiz again" (1.5s)
  ok 233 [phone] › tests\e2e\quiz.spec.ts:452:3 › awkward clicking › the second click of a double-click is ignored even when it lands on a button (1.8s)
  -  236 [phone] › tests\e2e\quiz.spec.ts:536:3 › keyboard only › the whole quiz can be taken with Tab, Enter and Space
  ok 239 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › / is served with the full set (282ms)
  ok 240 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /es/privacy/ is served with the full set (182ms)
  ok 241 [phone] › tests\e2e\security.spec.ts:6:5 › security headers › /dev/components/ is served with the full set (46ms)
  ok 243 [phone] › tests\e2e\security.spec.ts:37:3 › well-known files › security.txt gives a contact and has not expired (35ms)
  ok 244 [phone] › tests\e2e\security.spec.ts:48:3 › well-known files › robots.txt keeps a non-production build out of search engines (105ms)
  ok 237 [phone] › tests\e2e\quiz.spec.ts:568:3 › when the quiz cannot start › with JavaScript switched off, Start is disabled and the page says what to do (1.1s)
  ok 242 [phone] › tests\e2e\security.spec.ts:26:3 › security headers › pages contain no inline scripts or styles for the policy to block (1.3s)
  ok 238 [phone] › tests\e2e\quiz.spec.ts:583:3 › when the quiz cannot start › if the script fails to load, Start stays disabled and the page says what to do (4.9s)

  4 skipped
  240 passed (2.4m)
```

</details>

### `corepack pnpm audit --audit-level=moderate`: exit code 0

```
No known vulnerabilities found
```

### Do the tests catch real breakage?

The privacy fix was undone on purpose (each result's photos fetched only when it appears). Three tests failed: "which images are fetched gives nothing away about the answer" in English and Spanish, and "choosing an answer sends nothing to anyone". The code was then restored.

### Checked in a real browser

The question and both results were opened in Chromium against the built site, at phone (Pixel 7) and laptop (1366 by 768) sizes. The home page fetched no images; starting the quiz fetched all 12; nothing was requested from another site.

### Secret scan and OSV dependency scan

Not run locally. They run in CI.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
