import { expect, test } from '@playwright/test';
import fakeConfig from '../../config/site.fake.json' with { type: 'json' };

test.describe('security headers', () => {
  for (const path of ['/', '/es/privacy/', '/dev/components/']) {
    test(`${path} is served with the full set`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const headers = response.headers();

      const csp = headers['content-security-policy'] ?? '';
      expect(csp).toContain("default-src 'none'");
      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).not.toContain('unsafe-inline');

      expect(headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
      // This is not a production build, so it must stay out of search engines.
      expect(headers['x-robots-tag']).toBe('noindex, nofollow');
    });
  }

  test('pages contain no inline scripts or styles for the policy to block', async ({ page }) => {
    for (const path of ['/', '/privacy/', '/dev/components/']) {
      await page.goto(path);
      expect(await page.locator('script:not([src])').count(), `${path} inline scripts`).toBe(0);
      expect(await page.locator('style').count(), `${path} inline styles`).toBe(0);
      expect(await page.locator('[style]').count(), `${path} style attributes`).toBe(0);
    }
  });
});

test.describe('well-known files', () => {
  test('security.txt gives a contact and has not expired', async ({ request }) => {
    const response = await request.get('/.well-known/security.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain(`Contact: mailto:${fakeConfig.securityContact}`);
    const expires = /^Expires: (.+)$/m.exec(text)?.[1];
    expect(expires, 'Expires line').toBeDefined();
    expect(new Date(expires!).getTime()).toBeGreaterThan(Date.now());
  });

  test('robots.txt keeps a non-production build out of search engines', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('Disallow: /\n');
  });
});
