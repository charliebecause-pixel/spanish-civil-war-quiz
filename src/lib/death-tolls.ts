import type { Verdict } from './quiz';

/**
 * The figure each result's counter rolls up to. Each is the low end of the
 * published estimates, so "over" is true by every source listed. The caption
 * under each counter (src/i18n) gives the full range and names the sources.
 *
 * - Communist regimes: Benjamin Valentino, "Final Solutions" (Cornell
 *   University Press, 2005), 21 to 70 million for the USSR, China and
 *   Cambodia alone. Higher estimates run to about 100 million (Courtois et
 *   al., "The Black Book of Communism", 1997) and beyond.
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
  communist: 20_000_000,
  fascist: 11_000_000,
};
