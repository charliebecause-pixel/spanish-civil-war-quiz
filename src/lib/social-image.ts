// The picture link previews show when someone shares the site
// (docs/decisions/0010-social-preview-image.md). There is one per language,
// drawn from src/pages/dev/social/[locale].astro by scripts/social-images.mjs.

import type { Locale } from '../i18n';

/** The size every major platform shows in full: 1.91 to 1. */
export const SOCIAL_IMAGE = { width: 1200, height: 630, type: 'image/jpeg' } as const;

export const socialImagePath = (locale: Locale): string => `/social/${locale}.jpg`;

/** Open Graph wants a language and a region, such as en_US. */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_ES' };
