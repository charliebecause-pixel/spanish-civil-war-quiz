# 0008: The death-toll figures on the results

Date: 2026-11-17.

## Context

The owner asked for a counter on each result that rolls up from zero to the number of people communist and fascist regimes have killed. The owner set three rules for it: the numbers are worldwide; they stay general, in the form "over XX million killed worldwide"; and the figure is one that published estimates broadly accept. Nothing on the page should be rude or offensive. It is a visual aid to the joke, not a provocation.

The joke is the false dilemma. The quiz does not mean "communist" or "fascist" in the 1936 Spanish sense. It wrongly assumes that anyone who sides with the Republicans is a global communist, and anyone who sides with the Nationalists is a fascist, the way opponents label each other to the extreme today.

Published estimates vary a lot, especially for communist regimes, so any single number invites argument.

## Decision

- **Each figure sits inside the range of published estimates,** and the page says "over" (on screen, a "+" after the figure). The small print gives the whole range, so a visitor who knows a different estimate can see where it fits.
- **Communist regimes: over 60,000,000.** The owner chose this figure from within the published range. Benjamin Valentino, *Final Solutions* (Cornell University Press, 2005), gives 21 to 70 million for the Soviet Union, China and Cambodia alone. Stéphane Courtois and others, *The Black Book of Communism* (1997), gives about 100 million. The first draft used 20 million, which was below the low end of the range it cited.
- **Fascist and Nazi regimes: over 11,000,000.** United States Holocaust Memorial Museum, "Documenting Numbers of Victims of the Holocaust and Nazi Persecution": 6 million Jews and about 5.9 million others in the groups it lists. This counts murders only. It leaves out the Second World War itself, which killed 70 to 85 million people. The small print under the figure says so.
- **The small print** under each result gives the range and names the sources, in both languages.
- **Both labels say "worldwide"**, as the owner asked, and use the same plain wording: "people killed worldwide by communist regimes" and "people killed worldwide by fascist and Nazi regimes".
- **Figures live in one place,** `src/lib/death-tolls.ts`, with the sources in a comment.

## Reason

A figure inside the published range, stated as "over" and with the range and sources on the page, can be checked by anyone. Sixty million sits well inside the range for communist regimes, rather than at either edge. Counting only murders on the fascist side keeps the two numbers about the same kind of thing (people a regime killed) rather than blaming every war death on one side.

## Consequences

- The fascist figure is much lower than the communist one. That partly reflects what each figure covers: the fascist one counts murders by Nazi Germany and its allies, not the war's dead. The small print says what each figure covers.
- "Over 60 million" is not true by the lowest estimate cited (21 million). It is true by the middle and upper estimates, and the small print shows the full range.
- To change a figure: cite a source, change `src/lib/death-tolls.ts`, and update the small print in `src/i18n/en.json` and `src/i18n/es.json` at the same time. The browser tests check the figure on screen against that file.
- The Spanish wording was written by a coding agent and should be read by a Spanish speaker.
