# 0009: All the quiz images load together, when the question appears

Date: 2026-11-17.

## Context

The site promises that a visitor's answer never leaves their browser (`docs/decisions/0006`, and the line under the Start button). The new images behind the results are different for each answer. If each result's photos were fetched only when that result appeared, the site's server, and anyone who can read its logs, would learn which answer was chosen just from which files were requested.

## Decision

When the question appears, the browser fetches every quiz image at once: the question's posters and both results' photos. Choosing an answer then fetches nothing. The home page still fetches no images.

It is done in CSS, in `src/components/QuizBackdrop.astro`. From the question on, every set of images is laid out, and the sets not on show are invisible. The images are lazy, so the browser fetches them as soon as they are laid out.

## Reason

It keeps the promise without any script, and without loading anything on the first page.

## Consequences

- Starting the quiz fetches about 400 kB of images, about 290 kB more than the question needs on its own. On a slow phone connection the photos may still be arriving when the result appears; the result's text and button do not wait for them.
- Two browser tests guard this: one checks that both answers lead to exactly the same files being fetched, and the quiz's privacy test checks that choosing an answer fetches nothing.
