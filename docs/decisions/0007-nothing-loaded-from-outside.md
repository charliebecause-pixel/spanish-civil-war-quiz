# 0007: The design loads nothing from outside the site

Date: 2026-11-16.

## Context

The usual way to make a site look distinctive is to load web fonts, icon sets or images from other companies' servers. Each of those is a request to a third party on every visit, something more to name in the privacy policy, and another host to allow in the Content-Security-Policy.

## Decision

- **Fonts:** only fonts already on the visitor's device. Three stacks are defined in `src/styles/global.css`: a serif for the "straight face", a sans for labels and buttons, and a poster stack for the verdict that starts with Impact.
- **Artwork:** the two result emblems, the logo and the favicon are SVG drawn for this project (`src/components/Emblem.astro`, `Logo.astro`, `public/favicon.svg`).
- **No libraries** for styling or animation. Motion is plain CSS.

A browser test fails if the home page requests anything from another host or grows past 60 kB uncompressed.

## Reason

It keeps the promise in the privacy policy simple, keeps the Content-Security-Policy as strict as it can be, and keeps the page tiny, which matters most on a phone on a slow connection.

## Consequences

- The verdict lettering looks a little different on each kind of device, because Impact ships with Windows and macOS but not with iPhones or Android phones. They fall back to another heavy condensed font. The size is chosen so the longest word fits whichever font is used.
- If the owner later wants identical lettering everywhere, the way to do it is to add one font file to this repository and serve it from the site itself, not to link to a font service.
