# 0008: The death-toll figures on the results

Date: 2026-11-17.

## Context

The owner asked for a counter on each result that rolls up from zero to the number of people communist and fascist regimes have killed. The owner set three rules for it: the numbers are worldwide; they stay general, in the form "over XX million killed worldwide"; and the figure is one that published estimates broadly accept. Nothing on the page should be rude or offensive. It is a visual aid to the joke, not a provocation.

The joke is the false dilemma. The quiz does not mean "communist" or "fascist" in the 1936 Spanish sense. It wrongly assumes that anyone who sides with the Republicans is a global communist, and anyone who sides with the Nationalists is a fascist, the way opponents label each other to the extreme today.

Published estimates vary a lot, especially for communist regimes, so any single number invites argument.

## Decision

- **Use the low end of the published range,** and say "over" (on screen, a "+" after the figure). That way the claim is true by every source we cite, and a visitor who knows a higher estimate is not misled.
- **Communist regimes: over 20,000,000.** Benjamin Valentino, *Final Solutions* (Cornell University Press, 2005), gives 21 to 70 million for the Soviet Union, China and Cambodia alone. Higher estimates run to about 100 million (Stéphane Courtois and others, *The Black Book of Communism*, 1997).
- **Fascist and Nazi regimes: over 11,000,000.** United States Holocaust Memorial Museum, "Documenting Numbers of Victims of the Holocaust and Nazi Persecution": 6 million Jews and about 5.9 million others in the groups it lists. This counts murders only. It leaves out the Second World War itself, which killed 70 to 85 million people. The small print under the figure says so.
- **The small print** under each result gives the range and names the sources, in both languages.
- **Both labels say "worldwide"**, as the owner asked, and use the same plain wording: "people killed worldwide by communist regimes" and "people killed worldwide by fascist and Nazi regimes".
- **Figures live in one place,** `src/lib/death-tolls.ts`, with the sources in a comment.

## Reason

A conservative figure, stated as "over" and sourced on the page, is the hardest to dispute and the easiest to defend. Counting only murders on the fascist side keeps the two numbers about the same kind of thing (people a regime killed) rather than blaming every war death on one side.

## Consequences

- The fascist figure is lower than the communist one. That reflects how the sources count, not a judgement, and the small print explains what each figure covers.
- To change a figure: cite a source, change `src/lib/death-tolls.ts`, and update the small print in `src/i18n/en.json` and `src/i18n/es.json` at the same time. The browser tests check the figure on screen against that file.
- The Spanish wording was written by a coding agent and should be read by a Spanish speaker.
