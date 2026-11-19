import { expect, test, type Page } from '@playwright/test';
import fakeConfig from '../../config/site.fake.json' with { type: 'json' };
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };

// What a link preview shows when someone shares a page
// (docs/decisions/0010-social-preview-image.md).

const meta = (page: Page, attribute: 'property' | 'name', value: string) =>
  page.locator(`head meta[${attribute}="${value}"]`);

for (const { path, locale, ogLocale, alternate, title, text } of [
  {
    path: '/',
    locale: 'en',
    ogLocale: 'en_US',
    alternate: 'es_ES',
    title: en['site.name'],
    text: en,
  },
  {
    path: '/es/',
    locale: 'es',
    ogLocale: 'es_ES',
    alternate: 'en_US',
    title: es['site.name'],
    text: es,
  },
  {
    path: '/privacy/',
    locale: 'en',
    ogLocale: 'en_US',
    alternate: 'es_ES',
    title: en['footer.privacy'],
    text: en,
  },
  {
    path: '/es/credits/',
    locale: 'es',
    ogLocale: 'es_ES',
    alternate: 'en_US',
    title: es['credits.title'],
    text: es,
  },
] as const) {
  test(`${path} tells link previews what to show`, async ({ page, request }) => {
    await page.goto(path);
    const image = `${fakeConfig.siteUrl}/social/${locale}.jpg`;

    await expect(meta(page, 'property', 'og:type')).toHaveAttribute('content', 'website');
    await expect(meta(page, 'property', 'og:title')).toHaveAttribute('content', title);
    await expect(meta(page, 'property', 'og:description')).toHaveAttribute(
      'content',
      (await page.locator('head meta[name="description"]').getAttribute('content'))!,
    );
    await expect(meta(page, 'property', 'og:url')).toHaveAttribute(
      'content',
      (await page.locator('head link[rel="canonical"]').getAttribute('href'))!,
    );
    await expect(meta(page, 'property', 'og:locale')).toHaveAttribute('content', ogLocale);
    await expect(meta(page, 'property', 'og:locale:alternate')).toHaveAttribute(
      'content',
      alternate,
    );
    await expect(meta(page, 'property', 'og:image')).toHaveAttribute('content', image);
    await expect(meta(page, 'property', 'og:image:width')).toHaveAttribute('content', '1200');
    await expect(meta(page, 'property', 'og:image:height')).toHaveAttribute('content', '630');
    await expect(meta(page, 'property', 'og:image:type')).toHaveAttribute('content', 'image/jpeg');
    await expect(meta(page, 'property', 'og:image:alt')).toHaveAttribute(
      'content',
      text['social.imageAlt'],
    );
    await expect(meta(page, 'name', 'twitter:card')).toHaveAttribute(
      'content',
      'summary_large_image',
    );

    // The picture itself is served from this site.
    const response = await request.get(new URL(image).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('image/jpeg');
  });
}

test('the page the pictures are drawn from is not indexed', async ({ page }) => {
  await page.goto('/dev/social/en/');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
});
