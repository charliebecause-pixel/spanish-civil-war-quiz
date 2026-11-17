import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };
import { QUIZ_IMAGES, imagesIn } from '../../src/lib/quiz-images';
import { watchForProblems } from './helpers';

// The images behind the question and the results (docs/specs/background-images.md).

type Text = typeof en;

const LANGUAGES = [
  { name: 'English', path: '/', text: en },
  { name: 'Spanish', path: '/es/', text: es },
] as const;

const IMAGE_FILES = readdirSync(join(import.meta.dirname, '../../public/images/quiz'));

/** The quiz images the browser has fetched so far, by id. */
const fetchedImages = (page: Page) =>
  page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((entry) => new URL(entry.name).pathname)
      .filter((path) => path.startsWith('/images/quiz/'))
      .map((path) => path.replace('/images/quiz/', '').replace('.jpg', ''))
      .sort(),
  );

/** The backdrop images that are on screen and fully loaded, by id. */
const shownImages = (page: Page) =>
  page.locator('.backdrop img').evaluateAll((images: HTMLImageElement[]) =>
    images
      .filter(
        (image) =>
          image.checkVisibility({ visibilityProperty: true }) &&
          image.complete &&
          image.naturalWidth > 0,
      )
      .map((image) => new URL(image.src).pathname.replace('/images/quiz/', '').replace('.jpg', ''))
      .sort(),
  );

const ids = (...sets: Parameters<typeof imagesIn>[0][]) =>
  sets.flatMap((set) => imagesIn(set).map((image) => image.id)).sort();

async function start(page: Page, path: string, text: Text) {
  await page.goto(path);
  await page.getByRole('button', { name: text['quiz.start'], exact: true }).click();
  await expect(page.getByRole('heading', { name: text['quiz.question.number'] })).toBeVisible();
}

async function answer(
  page: Page,
  path: string,
  text: Text,
  choice: 'republicans' | 'nationalists',
) {
  await start(page, path, text);
  const button = page.getByRole('button', { name: text[`quiz.answer.${choice}`], exact: true });
  await expect(button).not.toHaveAttribute('aria-disabled', 'true');
  await button.click();
}

for (const { name, path, text } of LANGUAGES) {
  test.describe(`images in ${name}`, () => {
    test('the home page fetches none of them', async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      expect(await fetchedImages(page)).toEqual([]);
    });

    test('the question shows the Republican posters on one side and the Nationalist one on the other', async ({
      page,
      baseURL,
    }) => {
      const problems = watchForProblems(page, baseURL!);
      await start(page, path, text);
      await expect.poll(() => shownImages(page)).toEqual(ids('question-a', 'question-b'));
      expect(problems).toEqual([]);

      // Each side sits under its own button: left and right side by side,
      // or top and bottom where the buttons are stacked.
      const box = (part: string) =>
        page.locator(`[data-backdrop-part="${part}"]`).boundingBox() as Promise<{
          x: number;
          y: number;
        }>;
      const button = (choice: 'republicans' | 'nationalists') =>
        page.locator(`[data-quiz-answer="${choice}"]`).boundingBox() as Promise<{
          x: number;
          y: number;
        }>;
      const [republican, nationalist] = [await box('question-a'), await box('question-b')];
      const [republicans, nationalists] = [
        await button('republicans'),
        await button('nationalists'),
      ];
      if (Math.abs(republicans.y - nationalists.y) < 10) {
        expect(republican.x).toBeLessThan(nationalist.x);
      } else {
        expect(republican.y).toBeLessThan(nationalist.y);
      }
    });

    for (const { choice, verdict } of [
      { choice: 'republicans', verdict: 'communist' },
      { choice: 'nationalists', verdict: 'fascist' },
    ] as const) {
      test(`the ${verdict} result shows its own photos and nothing else`, async ({
        page,
        baseURL,
      }) => {
        const problems = watchForProblems(page, baseURL!);
        await answer(page, path, text, choice);
        await expect.poll(() => shownImages(page)).toEqual(ids(verdict));
        expect(problems).toEqual([]);
      });
    }

    test('which images are fetched gives nothing away about the answer', async ({ browser }) => {
      const fetchedFor = async (choice: 'republicans' | 'nationalists') => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await start(page, path, text);
        // Everything is fetched while the question is on screen, before any answer.
        await expect
          .poll(() => fetchedImages(page))
          .toEqual(ids('question-a', 'question-b', 'communist', 'fascist'));
        const before = await fetchedImages(page);
        const button = page.getByRole('button', {
          name: text[`quiz.answer.${choice}`],
          exact: true,
        });
        await expect(button).not.toHaveAttribute('aria-disabled', 'true');
        await button.click();
        await page.waitForLoadState('networkidle');
        const after = await fetchedImages(page);
        await context.close();
        return { before, after };
      };
      const republicans = await fetchedFor('republicans');
      const nationalists = await fetchedFor('nationalists');
      expect(republicans.after).toEqual(republicans.before);
      expect(nationalists.after).toEqual(nationalists.before);
      expect(republicans.after).toEqual(nationalists.after);
    });
  });
}

test.describe('images only darken the page', () => {
  test('each is multiplied onto the page colour', async ({ page }) => {
    await answer(page, '/', en, 'republicans');
    const styles = await page.locator('.backdrop__tile').evaluateAll((tiles) =>
      tiles
        .filter((tile) => tile.checkVisibility({ visibilityProperty: true }))
        .map((tile) => ({
          tile: getComputedStyle(tile).backgroundColor,
          blend: getComputedStyle(tile.querySelector('img')!).mixBlendMode,
          page: getComputedStyle(document.documentElement).backgroundColor,
        })),
    );
    expect(styles.length).toBe(imagesIn('communist').length);
    for (const style of styles) {
      expect(style.blend).toBe('multiply');
      expect(style.tile).toBe(style.page);
    }
  });

  test('screen readers skip them', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.backdrop')).toHaveAttribute('aria-hidden', 'true');
    for (const alt of await page
      .locator('.backdrop img')
      .evaluateAll((images) => images.map((image) => image.getAttribute('alt')))) {
      expect(alt).toBe('');
    }
  });
});

for (const { name, path, text } of LANGUAGES) {
  test(`the credits page in ${name} credits every image, with its licence`, async ({ page }) => {
    await page.goto(path);
    await page.getByRole('contentinfo').getByRole('link', { name: text['footer.credits'] }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(text['credits.title']);

    const credited = await page
      .locator('[data-credit]')
      .evaluateAll((items) => items.map((item) => `${item.getAttribute('data-credit')}.jpg`));
    expect(credited.sort()).toEqual([...IMAGE_FILES].sort());

    for (const image of QUIZ_IMAGES) {
      const item = page.locator(`[data-credit="${image.id}"]`);
      await expect(item).toContainText(text[`credits.image.${image.id}`]);
      await expect(item).toContainText(text[`credits.licence.${image.licence}`]);
      if (image.author) await expect(item).toContainText(image.author);
      await expect(item.getByRole('link', { name: text['credits.source'] })).toHaveAttribute(
        'href',
        image.source,
      );
    }
  });
}
