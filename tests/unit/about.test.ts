import { describe, expect, it } from 'vitest';
import { LOCALES } from '../../src/i18n';
import { LEGAL } from '../../src/i18n/legal';
import { DEATH_TOLL } from '../../src/lib/death-tolls';

// The about page explains the death tolls in words, so it has to change when
// src/lib/death-tolls.ts does.
const WORDING = { en: 'over {n} million', es: 'más de {n} millones' } as const;

describe('the about page', () => {
  it.each(LOCALES)('%s states the same death tolls as the results', (locale) => {
    const text = JSON.stringify(LEGAL[locale].about);
    for (const toll of Object.values(DEATH_TOLL)) {
      expect(text).toContain(WORDING[locale].replace('{n}', String(toll / 1_000_000)));
    }
  });

  it('has the same sections in both languages', () => {
    const shape = (locale: (typeof LOCALES)[number]) =>
      LEGAL[locale].about.sections.map((section) => [
        section.paragraphs.length,
        section.items?.length ?? 0,
      ]);
    for (const locale of LOCALES) expect(shape(locale)).toEqual(shape('en'));
  });
});
