# Spec: background images

Status: written November 17, 2026, before the work. Feature 5 of step 3 in the kickoff. What was verified, and what was not, is in `docs/pull-requests/0006-background-images.md`.

## What the owner asked for

- **The question:** "propaganda images of the Republican and Nationalist causes in the background and diffused and on each side and under the selection button".
- **The results:** "images of both those movements in their worst state. Gulags, propaganda posters of soviet and maoist leaders. Concentration camps and pictures of the germans."
- The images must not be rude, offensive, sexist, nude or sexual. They should reflect the general view of these movements and be fact-based. **No imagery of actual Nazi emblems.**

## The images

Twelve images from Wikimedia Commons, approved one by one by the owner on November 17, 2026. Each is public domain or free to use with credit. None shows a Nazi emblem, and none shows victims' bodies: the camps are shown by their gates, rails and fences.

| Screen | Images |
| --- | --- |
| Question, Republican side | Three Republican posters: the International Brigades, "Avant!" (PSU-UGT), and the Republic's anthem poster |
| Question, Nationalist side | One Nationalist poster: "Barrer España" (a worker sweeping away the Republic's "enemies") |
| Communist result | Prisoners building the White Sea Canal (1932); the fence and guard tower at the Perm-36 labour camp; Deni's poster "Stalin's Pipe" (1930); a Cultural Revolution poster of Mao; the Mao portrait on Tiananmen Gate |
| Fascist result | The gate and rails at Auschwitz II-Birkenau; the "Arbeit macht frei" gate at Auschwitz I; the Nazi leaders in the dock at Nuremberg (1945) |

Nationalist posters with the Falange yoke and arrows were left out: the symbol is restricted in Spain under the 2022 Democratic Memory Law (risk 8 in `docs/ARCHITECTURE.md`). Posters showing swastikas were left out too.

## How they look

- **Question:** the Republican posters fill the left half of the screen and the Nationalist poster the right half, under the Republicans and Nationalists buttons. On a phone, where the buttons are stacked, the Republican posters fill the top half and the Nationalist poster the bottom half. They are blurred and very faint, like a watermark on the paper.
- **Results:** the photos and posters fill the screen behind the verdict in a grid, in grey, tinted and darkened by the page's red or brown, so they read as part of the poster.
- **Images only ever darken the page,** never lighten it. Every piece of text keeps the contrast it had (at least 4.5:1).
- **They are decoration.** Screen readers skip them; the credits page describes each one.

## Rules this keeps

- **Nothing loaded from outside.** The images are shrunk once, saved in this repository (`public/images/quiz/`), and served by the site. The Content-Security-Policy does not change.
- **The first page stays light.** The home page fetches no images and still weighs under 60 kB.
- **The answer still never leaves the browser.** When the question appears, the browser fetches every image at once: the question's posters and both results' photos, about 400 kB in all (question 110 kB, communist result 180 kB, fascist result 115 kB). Choosing an answer then fetches nothing. Fetching each result's photos only when it appears would have told the site's server, and anyone reading its logs, which answer was chosen.
- **Every image is credited** on a new image credits page in both languages, linked from the footer of every page. The page gives the author, the source, the licence and what was changed.
- **The images were shrunk with Windows' own image tools** (System.Drawing), not a new dependency.

## How we will know it works, end to end

1. Every existing check still passes, including the one-screen fit and the contrast checks.
2. Browser tests, on a desktop and a phone-sized screen, confirm:
   - the home page requests no images, and its weight stays under 60 kB;
   - every image is fetched when the question appears, and choosing either answer fetches nothing more;
   - the question shows the Republican posters on one side and the Nationalist poster on the other, and the results show their own images, all served from the site itself;
   - no screen with images requests anything from another site;
   - the credits page lists every image file in `public/images/quiz/`, with its licence, in both languages, and the footer links to it.
3. Screenshots of the question and both results, on a phone and a laptop, are looked at by the owner before merge.
