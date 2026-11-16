import en from './en.json';
import es from './es.json';

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export type MessageKey = keyof typeof en;

// Typing `es` against the English keys makes a missing translation a type error.
export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, es };

/** Looks up a message and fills in `{name}` placeholders. */
export function t(locale: Locale, key: MessageKey, vars: Record<string, string> = {}): string {
  return fill(MESSAGES[locale][key], vars);
}

/** Replaces `{name}` placeholders. Unknown placeholders are left as they are. */
export function fill(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => vars[name] ?? match);
}

/**
 * Turns a site path such as `/privacy/` into the address for a language.
 * English lives at the root, other languages under their code: `/es/privacy/`.
 */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith('/') || !path.endsWith('/')) {
    throw new Error(`Site paths start and end with "/". Got "${path}".`);
  }
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

/** Formats a `YYYY-MM-DD` date for readers in the given language. */
export function formatDate(locale: Locale, isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`Not a date: "${isoDate}".`);
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

/** `getStaticPaths` for pages that exist once per language. */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));
}
