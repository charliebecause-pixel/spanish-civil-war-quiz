import { describe, expect, it } from 'vitest';
import { PARTNER_ROLES } from '../../src/config/schema';
import {
  fill,
  formatDate,
  LOCALES,
  localePath,
  localeStaticPaths,
  MESSAGES,
  t,
} from '../../src/i18n';
import { LEGAL } from '../../src/i18n/legal';

const placeholders = (text: string) =>
  [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe('messages', () => {
  it('every language has exactly the same keys', () => {
    const english = Object.keys(MESSAGES.en).sort();
    for (const locale of LOCALES) expect(Object.keys(MESSAGES[locale]).sort()).toEqual(english);
  });

  it('no message is empty', () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(MESSAGES[locale])) {
        expect(value.trim(), `${locale}: ${key}`).not.toBe('');
      }
    }
  });

  it('translations keep the same placeholders as English', () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(MESSAGES[locale])) {
        const english = MESSAGES.en[key as keyof typeof MESSAGES.en];
        expect(placeholders(value), `${locale}: ${key}`).toEqual(placeholders(english));
      }
    }
  });

  it('every partner role has a label', () => {
    for (const role of PARTNER_ROLES) {
      expect(MESSAGES.en).toHaveProperty([`partners.role.${role}`]);
    }
  });
});

describe('t and fill', () => {
  it('fills in placeholders', () => {
    expect(t('en', 'legal.updated', { date: 'today' })).toBe('Last updated: today');
    expect(t('es', 'legal.updated', { date: 'hoy' })).toBe('Última actualización: hoy');
  });

  it('leaves unknown placeholders alone', () => {
    expect(fill('Hello {name}', {})).toBe('Hello {name}');
  });
});

describe('localePath', () => {
  it('keeps English at the root and prefixes other languages', () => {
    expect(localePath('en', '/')).toBe('/');
    expect(localePath('en', '/privacy/')).toBe('/privacy/');
    expect(localePath('es', '/')).toBe('/es/');
    expect(localePath('es', '/privacy/')).toBe('/es/privacy/');
  });

  it('refuses paths without both slashes', () => {
    expect(() => localePath('en', 'privacy/')).toThrow();
    expect(() => localePath('en', '/privacy')).toThrow();
  });
});

describe('localeStaticPaths', () => {
  it('builds one page per language', () => {
    expect(localeStaticPaths()).toEqual([
      { params: { locale: undefined }, props: { locale: 'en' } },
      { params: { locale: 'es' }, props: { locale: 'es' } },
    ]);
  });
});

describe('formatDate', () => {
  it('formats for each language without shifting the day across time zones', () => {
    expect(formatDate('en', '2026-11-16')).toBe('November 16, 2026');
    expect(formatDate('es', '2026-11-16')).toBe('16 de noviembre de 2026');
  });

  it('refuses nonsense', () => {
    expect(() => formatDate('en', 'soon')).toThrow(/Not a date/);
  });
});

describe('legal documents', () => {
  it('have the same structure in every language', () => {
    for (const locale of LOCALES) {
      for (const name of ['privacy', 'terms'] as const) {
        const english = LEGAL.en[name];
        const translated = LEGAL[locale][name];
        expect(translated.updated, `${locale} ${name}`).toBe(english.updated);
        expect(translated.intro.length, `${locale} ${name}`).toBe(english.intro.length);
        expect(
          translated.sections.map((section) => [
            section.id,
            section.paragraphs.length,
            section.items?.length,
          ]),
          `${locale} ${name}`,
        ).toEqual(
          english.sections.map((section) => [
            section.id,
            section.paragraphs.length,
            section.items?.length,
          ]),
        );
      }
    }
  });

  it('the privacy policy has a place for the generated partner list', () => {
    for (const locale of LOCALES) {
      expect(
        LEGAL[locale].privacy.sections.filter((section) => section.id === 'partners'),
      ).toHaveLength(1);
    }
  });
});
