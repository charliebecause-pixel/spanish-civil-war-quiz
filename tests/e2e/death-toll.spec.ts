import { expect, test, type Page } from '@playwright/test';
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };
import { DEATH_TOLL } from '../../src/lib/death-tolls';

type Text = typeof en;

const LANGUAGES = [
  { name: 'English', path: '/', text: en, locale: 'en' },
  { name: 'Spanish', path: '/es/', text: es, locale: 'es' },
] as const;

const RESULTS = [
  { verdict: 'communist', answer: 'republicans' },
  { verdict: 'fascist', answer: 'nationalists' },
] as const;

const counter = (page: Page) => page.locator('[data-quiz-screen]:not([hidden]) [data-quiz-count]');

/** Starts the quiz and picks an answer, without waiting for anything to finish. */
async function answerWith(page: Page, path: string, text: Text, answer: string) {
  await page.goto(path);
  await page.getByRole('button', { name: text['quiz.start'], exact: true }).click();
  const button = page.locator(`[data-quiz-answer="${answer}"]`);
  await expect(button).not.toHaveAttribute('aria-disabled', 'true');
  // Click and read the counter in the same instant.
  return button.evaluate((element) => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    return document.querySelector('[data-quiz-screen]:not([hidden]) [data-quiz-count]')
      ?.textContent;
  });
}

for (const { name, path, text, locale } of LANGUAGES) {
  for (const { verdict, answer } of RESULTS) {
    test.describe(`the ${verdict} death toll in ${name}`, () => {
      const final = new Intl.NumberFormat(locale).format(DEATH_TOLL[verdict]);

      test('rolls up from zero to its figure, written for the language', async ({ page }) => {
        const first = await answerWith(page, path, text, answer);
        expect(first).toBe(new Intl.NumberFormat(locale).format(0));
        await expect(counter(page)).toHaveText(final, { timeout: 5000 });
      });

      test('is read out as a sentence, with its label and sources', async ({ page }) => {
        await answerWith(page, path, text, answer);
        const screen = page.locator('[data-quiz-screen]:not([hidden])');
        // Screen readers skip the rolling digits and read this instead.
        await expect(screen.locator('.quiz__toll-number')).toHaveAttribute('aria-hidden', 'true');
        await expect(screen.locator('.quiz__toll-label')).toHaveText(
          `${text['quiz.toll.over'].replace('{number}', final)} ${text[`quiz.toll.${verdict}.label`]}`,
        );
        await expect(screen.getByText(text[`quiz.toll.${verdict}.note`])).toBeVisible();
      });
    });
  }
}

test.describe('the death toll with "reduce motion" switched on', () => {
  test('shows its figure at once, without rolling', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const first = await answerWith(page, '/', en, 'republicans');
    expect(first).toBe(new Intl.NumberFormat('en').format(DEATH_TOLL.communist));
  });
});

test.describe('the death toll without the script', () => {
  test('the final figures are in the page itself', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: baseURL! });
    const page = await context.newPage();
    await page.goto('/');
    const figures = await page
      .locator('[data-quiz-count]')
      .evaluateAll((elements) => elements.map((element) => element.textContent?.trim()));
    expect(figures).toEqual([
      new Intl.NumberFormat('en').format(DEATH_TOLL.communist),
      new Intl.NumberFormat('en').format(DEATH_TOLL.fascist),
    ]);
    await context.close();
  });
});

test.describe('going back to a result', () => {
  test('rolls to the same figure again', async ({ page }) => {
    await answerWith(page, '/', en, 'nationalists');
    await expect(counter(page)).toHaveText(new Intl.NumberFormat('en').format(DEATH_TOLL.fascist), {
      timeout: 5000,
    });
    await page.getByRole('button', { name: en['quiz.restart'], exact: true }).click();
    await page.goBack();
    // Back counts as arriving, so it rolls again, from zero, to the same figure.
    await expect(counter(page)).toHaveText(new Intl.NumberFormat('en').format(DEATH_TOLL.fascist), {
      timeout: 5000,
    });
  });
});
