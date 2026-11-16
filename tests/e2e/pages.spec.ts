import { expect, test } from '@playwright/test';
import fakeConfig from '../../config/site.fake.json' with { type: 'json' };
import { watchForProblems } from './helpers';

test.describe('home page', () => {
  test('shows the English page at the root', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '60 second political ideology test',
    );
    await expect(page).toHaveTitle('60 Second Political Ideology Test');
  });

  test('switches to Spanish and back from the footer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Test de ideología política en 60 segundos',
    );

    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/127\.0\.0\.1:\d+\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('the back button returns to the previous page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Privacy policy' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy policy');
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '60 second political ideology test',
    );
  });

  test('the first Tab stop is a working skip link', async ({ page, browserName }, testInfo) => {
    test.skip(testInfo.project.name === 'phone', 'Keyboard navigation is a desktop check.');
    test.skip(browserName !== 'chromium');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });
});

test.describe('legal pages', () => {
  for (const [path, heading, lang] of [
    ['/privacy/', 'Privacy policy', 'en'],
    ['/es/privacy/', 'Política de privacidad', 'es'],
    ['/terms/', 'Terms of use', 'en'],
    ['/es/terms/', 'Condiciones de uso', 'es'],
  ] as const) {
    test(`${path} renders in ${lang}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      // The contact placeholder must have been filled in.
      await expect(page.locator('main')).not.toContainText('{contact}');
      await expect(page.locator('main')).toContainText(fakeConfig.securityContact);
    });
  }

  test('the privacy policy names every partner in the config, with its cookies', async ({
    page,
  }) => {
    await page.goto('/privacy/');
    const rows = page.locator('tr[data-partner]');
    await expect(rows).toHaveCount(fakeConfig.partners.length);
    for (const partner of fakeConfig.partners) {
      const row = page.locator(`tr[data-partner="${partner.id}"]`);
      await expect(row).toContainText(partner.name);
      await expect(row).toContainText(partner.purpose.en);
      for (const cookie of partner.cookies) await expect(row).toContainText(cookie);
      await expect(row.getByRole('link')).toHaveAttribute('href', partner.policyUrl);
    }
  });

  test('the date is written for the reader’s language', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('main')).toContainText(/Last updated: [A-Z][a-z]+ \d{1,2}, \d{4}/);
    await page.goto('/es/privacy/');
    await expect(page.locator('main')).toContainText(
      /Última actualización: \d{1,2} de [a-z]+ de \d{4}/,
    );
  });
});

test.describe('error state', () => {
  test('an unknown address gets a 404 page that says what to do, in both languages', async ({
    page,
  }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
    await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(page.getByRole('link', { name: 'Ir a la página de inicio' })).toHaveAttribute(
      'href',
      '/es/',
    );
  });
});

test.describe('every page is self-contained', () => {
  for (const path of [
    '/',
    '/es/',
    '/privacy/',
    '/es/privacy/',
    '/terms/',
    '/es/terms/',
    '/dev/components/',
  ]) {
    test(`${path} has no errors and contacts no other site`, async ({ page, baseURL }) => {
      const problems = watchForProblems(page, baseURL!);
      await page.goto(path, { waitUntil: 'networkidle' });
      expect(problems).toEqual([]);
    });
  }
});
