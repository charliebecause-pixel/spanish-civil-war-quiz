import type { Verdict } from './quiz';

/**
 * The figure each result's counter rolls up to, shown as "over" the figure.
 * Each sits inside the range of published estimates. The caption under each
 * counter (src/i18n) gives the range and names the sources. Why each figure
 * was chosen is in docs/decisions/0008.
 *
 * - Communist regimes: 60 million, chosen by the owner from within the range.
 *   Benjamin Valentino, "Final Solutions" (Cornell University Press, 2005),
 *   21 to 70 million for the USSR, China and Cambodia alone. Stéphane
 *   Courtois and others, "The Black Book of Communism" (1997), about 100
 *   million.
 * - Fascist and Nazi regimes: United States Holocaust Memorial Museum,
 *   "Documenting Numbers of Victims of the Holocaust and Nazi Persecution":
 *   6 million Jews, plus about 5.9 million others in the groups it lists
 *   (Soviet prisoners of war, Polish civilians, Roma, Serb civilians, people
 *   with disabilities). These are murders, not war deaths.
 *
 * Checked on 2026-11-16. Change a figure only with a source, and update the
 * captions in both languages at the same time.
 */
export const DEATH_TOLL: Readonly<Record<Verdict, number>> = {
  communist: 60_000_000,
  fascist: 11_000_000,
};
