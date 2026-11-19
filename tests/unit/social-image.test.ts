import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LOCALES, MESSAGES, type MessageKey } from '../../src/i18n';
import drawnText from '../../src/lib/social-image-text.json' with { type: 'json' };
import { SOCIAL_IMAGE, socialImagePath } from '../../src/lib/social-image';
import { jpegSize } from './jpeg';

// The link-preview pictures (docs/decisions/0010-social-preview-image.md).

const PUBLIC = join(import.meta.dirname, '../../public');
const drawn: Record<string, Record<string, string>> = drawnText;

describe('the social preview images', () => {
  it.each(LOCALES)('%s is the size the share tags give, and small', (locale) => {
    const bytes = readFileSync(join(PUBLIC, socialImagePath(locale)));
    expect(jpegSize(bytes)).toEqual({ width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height });
    // WhatsApp, among others, skips preview images much over 300 kB.
    expect(bytes.length).toBeLessThan(300_000);
  });

  it('were drawn for every language', () => {
    expect(Object.keys(drawn).sort()).toEqual([...LOCALES].sort());
  });

  // Fails when the site's text changes but the pictures were not redrawn.
  // Fix: `corepack pnpm build`, then `corepack pnpm social`.
  it.each(LOCALES)('%s shows the text the site uses today', (locale) => {
    const text = drawn[locale] ?? {};
    expect(Object.keys(text).length).toBeGreaterThan(0);
    for (const [key, value] of Object.entries(text)) {
      expect(value, key).toBe(MESSAGES[locale][key as MessageKey]);
    }
  });
});
