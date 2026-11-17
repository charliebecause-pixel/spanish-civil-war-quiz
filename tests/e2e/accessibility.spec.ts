import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Automated checks against WCAG 2.2 AA. They catch a good share of problems
// but not all of them; keyboard and screen reader checks are still needed.
const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const path of [
  '/',
  '/es/',
  '/privacy/',
  '/es/privacy/',
  '/terms/',
  '/credits/',
  '/es/credits/',
  '/dev/components/',
  '/this-page-does-not-exist/',
]) {
  test(`${path} passes automated accessibility checks`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
    expect(results.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
  });
}
