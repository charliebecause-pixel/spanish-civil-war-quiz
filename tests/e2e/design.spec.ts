import { expect, test, type Page } from '@playwright/test';
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };
import { settle } from './helpers';

// Written from docs/specs/visual-design.md, section "How we will know it works".

type Text = typeof en;

const LANGUAGES: readonly { name: string; path: string; text: Text }[] = [
  { name: 'English', path: '/', text: en },
  { name: 'Spanish', path: '/es/', text: es },
];

const RESULTS = [
  { verdict: 'communist', answer: 'republicans' },
  { verdict: 'fascist', answer: 'nationalists' },
] as const;

const button = (page: Page, name: string) => page.getByRole('button', { name, exact: true });

async function reachResult(
  page: Page,
  path: string,
  text: Text,
  answer: 'republicans' | 'nationalists',
) {
  await page.goto(path);
  await button(page, text['quiz.start']).click();
  await button(page, text[`quiz.answer.${answer}`]).click();
}

/** The names and timings of everything animating right now. */
const animationsNow = (page: Page) =>
  page.evaluate(() =>
    document.getAnimations().map((animation) => {
      const timing = animation.effect?.getComputedTiming();
      return {
        name: animation instanceof CSSAnimation ? animation.animationName : 'transition',
        iterations: timing?.iterations,
        endsAfterMs: Number(timing?.endTime),
      };
    }),
  );

/**
 * Starts noting the name of every animation that begins from now on, and
 * returns a way to read the list. Unlike looking at what is animating at one
 * instant, this cannot miss a short animation on a slow machine.
 */
async function recordAnimations(page: Page): Promise<() => Promise<string[]>> {
  await page.evaluate(() => {
    const started: string[] = [];
    document.addEventListener('animationstart', (event) => started.push(event.animationName));
    Object.assign(window, { startedAnimations: started });
  });
  return () =>
    page.evaluate(() => (window as unknown as { startedAnimations: string[] }).startedAnimations);
}

for (const { name, path, text } of LANGUAGES) {
  for (const { verdict, answer } of RESULTS) {
    test.describe(`the ${verdict} result in ${name}`, () => {
      test('shows a huge, labelled emblem in the lettering colour', async ({ page }) => {
        await reachResult(page, path, text, answer);
        await settle(page);

        // Found by its screen-reader label, so the label is tested too.
        const emblem = page.getByRole('img', { name: text[`quiz.emblem.${verdict}`], exact: true });
        await expect(emblem).toBeVisible();

        const box = await emblem.boundingBox();
        const viewport = page.viewportSize();
        if (!box || !viewport) throw new Error('No emblem box or viewport.');
        // "Huge": over half the width of a phone, or about a third of the
        // height of a wide screen, whichever the screen allows.
        expect(box.width).toBeGreaterThanOrEqual(
          Math.min(viewport.width * 0.55, viewport.height * 0.3),
        );
        expect(Math.abs(box.width - box.height)).toBeLessThan(2);

        const [emblemColour, letteringColour] = await page.evaluate(() => {
          const screen = document.querySelector('[data-quiz-screen]:not([hidden])');
          const picture = screen?.querySelector('svg');
          const heading = screen?.querySelector('h1');
          if (!picture || !heading) throw new Error('No result on screen.');
          return [getComputedStyle(picture).color, getComputedStyle(heading).color];
        });
        expect(emblemColour).toBe(letteringColour);
      });

      test('fits the verdict, the emblem and the button on one screen', async ({ page }) => {
        await reachResult(page, path, text, answer);
        await settle(page);

        const screen = page.locator('[data-quiz-screen]:not([hidden])');
        await expect(screen.getByRole('heading', { level: 1 })).toBeInViewport({ ratio: 1 });
        await expect(screen.getByRole('img')).toBeInViewport({ ratio: 1 });
        await expect(button(page, text['quiz.restart'])).toBeInViewport({ ratio: 1 });
      });

      test('uses poster lettering that stays inside the page', async ({ page }) => {
        await reachResult(page, path, text, answer);
        await settle(page);

        const heading = page.locator('[data-quiz-screen]:not([hidden]) h1');
        const box = await heading.boundingBox();
        const viewport = page.viewportSize();
        if (!box || !viewport) throw new Error('No heading box or viewport.');
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      });
    });
  }
}

test.describe('motion', () => {
  test('a result arrives with a slam, a shake, a spinning emblem and a button that pops up', async ({
    page,
  }) => {
    await page.goto('/');
    const started = await recordAnimations(page);
    await button(page, en['quiz.start']).click();
    await button(page, en['quiz.answer.republicans']).click();

    await expect
      .poll(started)
      .toEqual(expect.arrayContaining(['quiz-shake', 'quiz-slam', 'quiz-emblem', 'quiz-pop']));
  });

  test('nothing loops, and everything is over in a second and a half', async ({ page }) => {
    await reachResult(page, '/', en, 'nationalists');
    const animations = await animationsNow(page);
    expect(animations.length).toBeGreaterThan(0);
    for (const animation of animations) {
      expect(animation.iterations, animation.name).toBe(1);
      expect(animation.endsAfterMs, animation.name).toBeLessThanOrEqual(1500);
    }

    await settle(page);
    expect(await animationsNow(page)).toEqual([]);
  });

  test('the first screen does not animate when the page loads', async ({ page }) => {
    await page.goto('/');
    await expect(button(page, en['quiz.start'])).toBeEnabled();
    expect(await animationsNow(page)).toEqual([]);
  });

  test('going back animates the screen being returned to', async ({ page }) => {
    await reachResult(page, '/', en, 'republicans');
    await settle(page);
    const started = await recordAnimations(page);
    await page.goBack();
    await expect.poll(started).toContain('quiz-arrive');
  });

  test('a keyboard user who tabs to the button early sees it at once', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === 'phone', 'Keyboard use is a desktop check.');
    await reachResult(page, '/', en, 'republicans');
    await page.keyboard.press('Tab');
    const restart = button(page, en['quiz.restart']);
    await expect(restart).toBeFocused();
    // Not still waiting, invisible, for its turn to pop up.
    const opacity = await restart.evaluate(
      (element) => getComputedStyle(element.parentElement ?? element).opacity,
    );
    expect(opacity).toBe('1');
  });
});

test.describe('with "reduce motion" switched on', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  for (const { verdict, answer } of RESULTS) {
    test(`the ${verdict} result simply appears, with no animation at all`, async ({ page }) => {
      await reachResult(page, '/', en, answer);
      expect(await animationsNow(page)).toEqual([]);

      const screen = page.locator('[data-quiz-screen]:not([hidden])');
      await expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(screen.getByRole('img')).toBeVisible();
      const restart = button(page, en['quiz.restart']);
      await expect(restart).toBeVisible();
      expect(
        await restart.evaluate(
          (element) => getComputedStyle(element.parentElement ?? element).opacity,
        ),
      ).toBe('1');
    });
  }

  test('the intro and the question do not animate either', async ({ page }) => {
    await page.goto('/');
    await button(page, en['quiz.start']).click();
    expect(await animationsNow(page)).toEqual([]);
    await page.goBack();
    expect(await animationsNow(page)).toEqual([]);
  });
});

test.describe('touch screens', () => {
  test('an answer never looks chosen just because the last tap was there', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'phone', 'Sticky hover only happens on touch screens.');
    await page.goto('/');
    await button(page, en['quiz.start']).click();
    await settle(page);
    // On a touch screen the browser leaves "hover" on whatever was last
    // touched. Putting the pointer on one answer stands in for that here.
    await button(page, en['quiz.answer.nationalists']).hover();
    expect(await page.evaluate(() => matchMedia('(hover: hover)').matches)).toBe(false);

    const backgrounds = await page.evaluate(() =>
      [...document.querySelectorAll('[data-quiz-answer]')].map(
        (answer) => getComputedStyle(answer).backgroundColor,
      ),
    );
    expect(backgrounds).toHaveLength(2);
    expect(backgrounds[0]).toBe(backgrounds[1]);
  });
});

test.describe('weight', () => {
  // The whole home page, uncompressed. Error tracking is not counted: it is
  // off in this build and loads only after the page is usable.
  const BUDGET_BYTES = 60_000;

  for (const { name, path } of LANGUAGES) {
    test(`the ${name} home page stays under ${BUDGET_BYTES / 1000} kB and loads nothing from elsewhere`, async ({
      page,
      baseURL,
    }) => {
      const bodies: Promise<number>[] = [];
      const outside: string[] = [];
      page.on('response', (response) => {
        if (!response.url().startsWith(baseURL!)) outside.push(response.url());
        else if (response.status() === 200) {
          bodies.push(response.body().then((body) => body.length));
        }
      });

      await page.goto(path, { waitUntil: 'networkidle' });
      const total = (await Promise.all(bodies)).reduce((sum, size) => sum + size, 0);

      expect(outside).toEqual([]);
      expect(total).toBeGreaterThan(0);
      expect(total).toBeLessThan(BUDGET_BYTES);
    });
  }
});
