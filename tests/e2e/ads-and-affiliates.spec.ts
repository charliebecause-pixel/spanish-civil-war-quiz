import { expect, test } from '@playwright/test';
import fakeConfig from '../../config/site.fake.json' with { type: 'json' };

const network = fakeConfig.ads.networks[0]!;
const link = fakeConfig.affiliates[0]!;

test.describe('/ads.txt', () => {
  test('lists every ad network in the config as plain text', async ({ request }) => {
    const response = await request.get('/ads.txt');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');
    expect(await response.text()).toContain(
      `${network.adsTxtDomain}, ${network.publisherId}, ${network.relationship}, ${network.certificationAuthorityId}`,
    );
  });
});

test.describe('ad slot', () => {
  test('reserves its full size, is labelled, and loads nothing from an ad network', async ({
    page,
  }) => {
    await page.goto('/dev/components/');
    const slot = page.locator('.ad-slot[data-ad-slot-name="sidebar"]');
    await expect(slot.getByText('Advertisement', { exact: true })).toBeVisible();

    const frame = slot.getByTestId('ad-placeholder');
    await expect(frame).toBeVisible();
    const box = await frame.boundingBox();
    expect(box?.width).toBe(300);
    expect(box?.height).toBe(250);

    // Placeholder mode must never render the element real ads load into.
    await expect(page.locator('ins.adsbygoogle')).toHaveCount(0);
  });

  test('nothing in or around the slot invites a click', async ({ page }) => {
    await page.goto('/dev/components/');
    const slot = page.locator('.ad-slot');
    await expect(slot.locator('a, button')).toHaveCount(0);
    await expect(slot).not.toContainText(/click|tap|support us/i);
  });

  test('the content after the slot does not move once the page has settled', async ({ page }) => {
    await page.goto('/dev/components/');
    const after = page.locator('#after-ad');
    const before = await after.boundingBox();
    await page.waitForLoadState('networkidle');
    expect(await after.boundingBox()).toEqual(before);
  });

  test('no ad slot appears on the legal or error pages', async ({ page }) => {
    for (const path of ['/privacy/', '/terms/', '/es/privacy/', '/this-page-does-not-exist/']) {
      await page.goto(path);
      await expect(page.locator('.ad-slot'), path).toHaveCount(0);
    }
  });
});

test.describe('paid links', () => {
  test('go through /go/, are marked sponsored, and are disclosed right beside the link', async ({
    page,
  }) => {
    await page.goto('/dev/components/');
    const anchor = page.locator(`a[data-affiliate="${link.slug}"]`);
    await expect(anchor).toHaveAttribute('href', `/go/${link.slug}`);
    await expect(anchor).toHaveAttribute('rel', 'sponsored noopener');

    const disclosure = anchor.locator('xpath=following-sibling::*[1]');
    await expect(disclosure).toBeVisible();
    await expect(disclosure).toContainText('Paid link');
  });

  test('/go/<slug> redirects to the partner with tracking parameters', async ({ request }) => {
    const response = await request.get(`/go/${link.slug}`, { maxRedirects: 0 });
    expect(response.status()).toBe(302);

    const destination = new URL(response.headers()['location']!);
    const expected = new URL(link.url);
    expect(destination.origin + destination.pathname).toBe(expected.origin + expected.pathname);
    for (const [name, value] of Object.entries(link.params)) {
      expect(destination.searchParams.get(name), name).toBe(value);
    }
    expect(response.headers()['cache-control']).toBe('no-store');
  });

  test('/go/<unknown> is a 404, never a redirect', async ({ request }) => {
    const response = await request.get('/go/not-a-real-link', { maxRedirects: 0 });
    expect(response.status()).toBe(404);
    expect(response.headers()['location']).toBeUndefined();
  });
});
