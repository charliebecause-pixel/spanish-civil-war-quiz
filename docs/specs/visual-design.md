# Spec: visual design

Status: written November 16, 2026, before the work; built the same day. Feature 2 of step 3 in the kickoff. What was verified, and what was not, is in `docs/pull-requests/0003-visual-design.md`.

## What the brief asks for

- "The website will look real and 'pop' academic like. It will advertise itself like a real website."
- Republicans: "the screen goes red and in big yellow lettering it says 'YOU'RE A COMMUNIST!!!' with a huge image of the soviet hammer and sickle."
- Nationalists: "the screen goes brown and in big yellow lettering it says 'YOU'RE A FASCIST!!!' with a picture of fascist imagery (no nazi things)."
- "a button pops up that says 'take quiz again'".
- Must-have for the first release: "A graphically pleasing webpage with animations and color."

## The idea

Two looks, and the joke is the jump between them.

1. **The straight face.** The intro and the question look like a careful, slightly self-important online assessment: paper-white page, navy ink, serif type, a small chart-like logo, faint graph-paper lines, a few confident facts above the Start button.
2. **The punchline.** The result throws all of that away at once: the whole page turns red or brown, the verdict slams in as huge yellow poster lettering, a huge emblem follows it, a worldwide death toll rolls up from zero beneath it, and a moment later the "Take quiz again" button pops up.

The joke is the false dilemma: picking a side in the Spanish Civil War gets you labelled, at once and to the extreme, as a global communist or fascist, the way political opponents label each other today. The death toll is the label's full weight, stated plainly and from sources (`docs/decisions/0008`).

## Rules this design keeps

- **Nothing loaded from outside.** No web fonts, no image files from other sites, no libraries. Type uses fonts already on the visitor's device; all artwork is SVG drawn for this project. The Content-Security-Policy stays as strict as it is.
- **Original artwork, no Nazi symbols.** The hammer and sickle and the fasces are drawn from scratch in this repository. The fasces is the image the owner approved for the Nationalist result.
- **Not a copy of any real site.** The logo, layout and colours are our own. Nothing imitates a specific quiz site or a real institution.
- **Every claim in the copy is literally true.** The page may sound grand ("a definitive result with a single question"), but it invents no user counts, testimonials, endorsements or studies.
- **Readable by everyone.** Text keeps at least 4.5:1 contrast on every screen, including the result screens. Each emblem has a text label for screen readers.
- **Safe motion.** The colour change is one cut, never a flicker. No animation runs longer than about a second, and nothing loops. The one exception is the death-toll counter, which counts up for two seconds and then stops. With "reduce motion" switched on in the visitor's device, there is no animation at all and the result simply appears.
- **The button is never out of reach.** On a phone and on a laptop, the verdict, the emblem, the death toll and "Take quiz again" fit on one screen without scrolling. Only the small-print sources below the button may need a scroll.
- **All text stays in `src/i18n`,** in English and Spanish.

## Screens

**Header and footer (every page).** A thin navy bar, the logo (two axes in a circle with a dot off-centre) and the site name. Legal pages get the same type and colours.

**Intro.** A small label ("Political self-assessment"), the title, one sentence of confident copy, three facts (1 question, 60 seconds, 0 sign-ups), the Start button, and a small-print line saying the answer never leaves the browser.

**Question.** A small "Step 1 of 1" label with a full progress bar, "Question #1" in big bold letters, the question, and the two answers as large buttons. Well below the answers, a small "Need to know more about this question?" link opens the Spanish Civil War article on Wikipedia in the visitor's language, in a new tab so the quiz is not lost. It sends Wikipedia no referrer, and nothing is loaded from Wikipedia unless the visitor clicks.

**Result.** Verdict lettering, then the emblem, then the death toll ("60,000,000+" or "11,000,000+" in poster figures, with a one-line label such as "people killed worldwide by communist regimes"), then the button, then a small-print note giving the range of estimates and naming the sources. Faint rays behind them, like a poster. Screen readers hear the toll as one sentence ("Over 60,000,000 people killed worldwide by communist regimes") instead of the rolling digits.

**Images behind the question and the results.** Faint posters behind the question and grey, tinted photos behind each result. See `docs/specs/background-images.md`.

## Motion

| What | How | When |
| --- | --- | --- |
| Intro and question appear | Fade in and rise slightly | 0.2 s |
| Page turns red or brown | Instant cut | 0 s |
| Verdict | Slams in from oversized, with one short shake of the screen | 0.4 s |
| Emblem | Spins and grows into place | 0.6 s, starting just after the verdict |
| Death toll | Counts up from zero to its figure, then stops. With "reduce motion" on, or without the script, the figure is simply there | 2 s, starting half a second after the emblem |
| "Take quiz again" | Pops up | about a second after the verdict |
| Buttons | Lift slightly on hover, press down on click | 0.1 s |

## Not in this feature

- A social-media preview image and share tags. Added later; see `docs/decisions/0010-social-preview-image.md`.
- The about/parody page. Added later at `/about/`; see `docs/pull-requests/0008-about-page.md`.
- The sidebar ad layout. Ads are off for the first release.

## How we will know it works, end to end

1. Every existing check still passes: the quiz's behaviour does not change.
2. Browser tests, on a desktop and a phone-sized screen, in both languages, confirm:
   - each result shows its emblem, with a screen-reader label, at a size that fills a large share of the screen;
   - the verdict, the emblem and "Take quiz again" are all on screen without scrolling;
   - animations run normally, and none run when "reduce motion" is on;
   - nothing is requested from another site, and the page weighs under a small fixed budget;
   - every screen passes the automated accessibility checks and fits a 320 pixel wide screen.
3. Screenshots of every screen, desktop and phone, are looked at by a person (the owner) before merge.
