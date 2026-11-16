# 0006: Where the quiz keeps its state, and how the Back button works

Date: 2026-11-16.

## Context

Two requirements pull against each other:

- The answer a visitor clicks must never be sent or stored (docs/ARCHITECTURE.md, section 3). It is a political opinion, which is sensitive data under GDPR, and the brief says under-16s will visit.
- The Back button must behave as people expect (launch checklist). After a result, most people expect Back to show the question again, so they can try the other answer.

The usual ways to make Back work put the state somewhere visible: a separate address per screen, or the answer in the address. Either would tell the hosting provider, and any analytics, which result a visitor got.

## Decision

- All three screens are in the page's HTML from the start. A script shows one at a time. No screen has its own address, so the server never sees which result was reached.
- Each screen change adds an entry to the browser's history without changing the address. Back and Forward step through the screens.
- A result's history entry holds a random key, never the answer. The answer for each key lives in the page's memory only (`QuizSession` in `src/lib/quiz.ts`).
- Reloading or closing the page empties that memory. A result entry whose answer is gone is turned back into the intro. Reloading on the question stays on the question, because that screen needs nothing remembered.
- The quiz writes nothing to cookies, local storage or session storage.

Two smaller rules live in the same code:

- The second click of a double-click is ignored, so double-clicking Start cannot also pick an answer the visitor never saw. A browser test also checks that no button appears where the previous screen's button was, for double taps on phones.
- The Start button is disabled until the script is running. If the script has not started after four seconds, or JavaScript is switched off, the page says so and says what to do.

## Reason

The privacy policy can truthfully say the answer never leaves the browser and is gone on reload, while Back still does what people expect.

## Consequences

- A result cannot be linked to or shared as a link. Sharing means a screenshot.
- The rules are plain functions with no browser code in them, so they are unit tested directly, including Back, Forward and reload.

## To check when analytics is switched on

Cloudflare Web Analytics can treat new history entries as page views. After it is enabled on staging, take the quiz once and confirm the dashboard counts one page view, not three. If it counts three, add the analytics snippet by hand with its single-page-app tracking turned off, so the "100 hits a week" goal is not inflated.
