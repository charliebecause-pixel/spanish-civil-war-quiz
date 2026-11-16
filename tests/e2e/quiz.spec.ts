import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };
import { settle, watchForProblems } from './helpers';

// Written from the project brief:
//   - the page reads "60 second political ideology test" with a "Start" button
//   - "Question #1" in big bold letters, with the two answers clickable below it
//   - Republicans: the screen goes red, big yellow "YOU'RE A COMMUNIST!!!"
//   - Nationalists: the screen goes brown, big yellow "YOU'RE A FASCIST!!!"
//   - then a "Take quiz again" button resets the page
// and from docs/ARCHITECTURE.md: the answer is never sent and never stored.

type Text = typeof en;

const LANGUAGES: readonly { name: string; path: string; text: Text }[] = [
  { name: 'English', path: '/', text: en },
  { name: 'Spanish', path: '/es/', text: es },
];

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** The quiz's headings and buttons, found the way a visitor finds them: by their words. */
function quizIn(page: Page, text: Text) {
  const heading = (name: string) => page.getByRole('heading', { level: 1, name, exact: true });
  const button = (name: string) => page.getByRole('button', { name, exact: true });
  return {
    intro: heading(text['home.heading']),
    start: button(text['quiz.start']),
    loadError: page.getByText(text['quiz.loadError'], { exact: true }),
    question: heading(text['quiz.question.number']),
    questionText: page.getByText(text['quiz.question.text'], { exact: true }),
    republicans: button(text['quiz.answer.republicans']),
    nationalists: button(text['quiz.answer.nationalists']),
    communist: heading(text['quiz.verdict.communist']),
    fascist: heading(text['quiz.verdict.fascist']),
    restart: button(text['quiz.restart']),
  };
}

type Rgb = [number, number, number];

/** The page's background colour and the colour of the visible heading. */
async function colours(page: Page): Promise<{ background: Rgb; lettering: Rgb }> {
  return page.evaluate(() => {
    const parse = (value: string) =>
      (value.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number) as [number, number, number];
    const heading = document.querySelector('[data-quiz-screen]:not([hidden]) h1');
    if (!heading) throw new Error('No quiz screen is visible.');
    return {
      background: parse(getComputedStyle(document.documentElement).backgroundColor),
      lettering: parse(getComputedStyle(heading).color),
    };
  });
}

const isRed = ([r, g, b]: Rgb) => r > 150 && g < 70 && b < 70;
const isBrown = ([r, g, b]: Rgb) => r > g && g > b && r >= 60 && r <= 170 && b < 80 && r - b >= 30;
const isYellow = ([r, g, b]: Rgb) => r > 220 && g > 190 && b < 110;
const isLight = ([r, g, b]: Rgb) => r > 200 && g > 200 && b > 200;

async function fontOf(locator: Locator): Promise<{ size: number; weight: number }> {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { size: parseFloat(style.fontSize), weight: Number(style.fontWeight) };
  });
}

async function boxOf(locator: Locator) {
  await settle(locator.page());
  const box = await locator.boundingBox();
  if (!box) throw new Error('Element has no box; is it visible?');
  return box;
}

async function sidewaysOverflow(page: Page): Promise<number> {
  await settle(page);
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

const historyLength = (page: Page) => page.evaluate(() => history.length);

for (const { name, path, text } of LANGUAGES) {
  test.describe(`the quiz in ${name}`, () => {
    test('opens on the title and a Start button, with nothing else from the quiz showing', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);

      await expect(quiz.intro).toBeVisible();
      await expect(quiz.start).toBeEnabled();
      await expect(quiz.loadError).toBeHidden();
      for (const hidden of [quiz.question, quiz.republicans, quiz.communist, quiz.fascist]) {
        await expect(hidden).toBeHidden();
      }
      await expect(quiz.restart).toHaveCount(0);
      expect(isLight((await colours(page)).background)).toBe(true);
    });

    test('Start shows "Question #1" in big bold letters, with both answers below the question', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);
      await quiz.start.click();

      await expect(quiz.question).toBeVisible();
      await expect(quiz.question).toBeFocused();
      const font = await fontOf(quiz.question);
      expect(font.size).toBeGreaterThanOrEqual(32);
      expect(font.weight).toBeGreaterThanOrEqual(700);

      await expect(quiz.questionText).toBeVisible();
      await expect(quiz.intro).toBeHidden();
      await expect(quiz.start).toBeHidden();

      const questionBox = await boxOf(quiz.questionText);
      for (const answer of [quiz.republicans, quiz.nationalists]) {
        await expect(answer).toBeEnabled();
        expect((await boxOf(answer)).y).toBeGreaterThanOrEqual(questionBox.y + questionBox.height);
      }
    });

    test('Republicans ends the quiz: the screen goes red and says in big yellow letters that you are a communist', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);
      await quiz.start.click();
      await quiz.republicans.click();

      await expect(quiz.communist).toBeVisible();
      await expect(quiz.communist).toBeFocused();
      await expect(quiz.fascist).toBeHidden();
      await expect(quiz.question).toBeHidden();
      await expect(quiz.republicans).toBeHidden();
      await expect(quiz.restart).toBeVisible();

      const seen = await colours(page);
      expect(isRed(seen.background), `background ${seen.background.join(',')}`).toBe(true);
      expect(isYellow(seen.lettering), `lettering ${seen.lettering.join(',')}`).toBe(true);
      expect((await fontOf(quiz.communist)).size).toBeGreaterThanOrEqual(28);
    });

    test('Nationalists ends the quiz: the screen goes brown and says in big yellow letters that you are a fascist', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);
      await quiz.start.click();
      await quiz.nationalists.click();

      await expect(quiz.fascist).toBeVisible();
      await expect(quiz.fascist).toBeFocused();
      await expect(quiz.communist).toBeHidden();
      await expect(quiz.question).toBeHidden();
      await expect(quiz.nationalists).toBeHidden();
      await expect(quiz.restart).toBeVisible();

      const seen = await colours(page);
      expect(isBrown(seen.background), `background ${seen.background.join(',')}`).toBe(true);
      expect(isYellow(seen.lettering), `lettering ${seen.lettering.join(',')}`).toBe(true);
      expect((await fontOf(quiz.fascist)).size).toBeGreaterThanOrEqual(28);
    });

    test('"Take quiz again" resets the page to the start', async ({ page }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);
      await quiz.start.click();
      await quiz.republicans.click();
      await quiz.restart.click();

      await expect(quiz.intro).toBeVisible();
      await expect(quiz.intro).toBeFocused();
      await expect(quiz.start).toBeEnabled();
      await expect(quiz.communist).toBeHidden();
      await expect(page.locator('html')).not.toHaveAttribute('data-quiz-verdict');
      expect(isLight((await colours(page)).background)).toBe(true);

      // And it can be taken again, with the other answer this time.
      await quiz.start.click();
      await quiz.nationalists.click();
      await expect(quiz.fascist).toBeVisible();
    });

    test('the question and both results pass automated accessibility checks', async ({ page }) => {
      const quiz = quizIn(page, text);
      const violations = async () => {
        await settle(page);
        return (await new AxeBuilder({ page }).withTags(WCAG).analyze()).violations.map(
          (violation) => `${violation.id}: ${violation.help}`,
        );
      };

      await page.goto(path);
      await quiz.start.click();
      await expect(quiz.question).toBeVisible();
      expect(await violations(), 'question').toEqual([]);

      await quiz.republicans.click();
      await expect(quiz.communist).toBeVisible();
      expect(await violations(), 'communist result').toEqual([]);

      await page.goBack();
      await quiz.nationalists.click();
      await expect(quiz.fascist).toBeVisible();
      expect(await violations(), 'fascist result').toEqual([]);
    });

    test('the question offers a Wikipedia link in the same language, in a new tab', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.goto(path);
      await quiz.start.click();

      const link = page.getByRole('link', {
        name: `${text['quiz.moreInfo.link']} ${text['quiz.moreInfo.where']}`,
        exact: true,
      });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', text['quiz.moreInfo.url']);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(new URL(text['quiz.moreInfo.url']).hostname).toBe(
        `${name === 'English' ? 'en' : 'es'}.wikipedia.org`,
      );

      // It sits below the answers, not between them.
      const linkBox = await boxOf(link);
      for (const answer of [quiz.republicans, quiz.nationalists]) {
        const box = await boxOf(answer);
        expect(linkBox.y).toBeGreaterThan(box.y + box.height);
      }
    });

    test('every screen fits a 320 pixel wide screen without scrolling sideways', async ({
      page,
    }) => {
      const quiz = quizIn(page, text);
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(path);
      expect(await sidewaysOverflow(page), 'intro').toBeLessThanOrEqual(0);

      await quiz.start.click();
      expect(await sidewaysOverflow(page), 'question').toBeLessThanOrEqual(0);

      await quiz.republicans.click();
      await expect(quiz.communist).toBeVisible();
      expect(await sidewaysOverflow(page), 'communist result').toBeLessThanOrEqual(0);

      await page.goBack();
      await quiz.nationalists.click();
      await expect(quiz.fascist).toBeVisible();
      expect(await sidewaysOverflow(page), 'fascist result').toBeLessThanOrEqual(0);
    });
  });
}

test.describe('the Back and Forward buttons', () => {
  test('step through the screens in order', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await quiz.republicans.click();
    await expect(quiz.communist).toBeVisible();

    await page.goBack();
    await expect(quiz.question).toBeVisible();
    await expect(quiz.communist).toBeHidden();
    expect(isLight((await colours(page)).background)).toBe(true);

    await page.goBack();
    await expect(quiz.intro).toBeVisible();

    await page.goForward();
    await expect(quiz.question).toBeVisible();

    await page.goForward();
    await expect(quiz.communist).toBeVisible();
    expect(isRed((await colours(page)).background)).toBe(true);
  });

  test('let the visitor go back and choose the other side', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await quiz.republicans.click();
    await page.goBack();
    await quiz.nationalists.click();

    await expect(quiz.fascist).toBeVisible();
    await expect(quiz.communist).toBeHidden();
    expect(isBrown((await colours(page)).background)).toBe(true);
  });

  test('show each earlier result as it was, when the quiz is taken twice', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await quiz.republicans.click();
    await quiz.restart.click();
    await quiz.start.click();
    await quiz.nationalists.click();
    await expect(quiz.fascist).toBeVisible();

    await page.goBack(); // question
    await page.goBack(); // intro
    await page.goBack(); // the first result
    await expect(quiz.communist).toBeVisible();
    expect(isRed((await colours(page)).background)).toBe(true);

    await page.goForward();
    await page.goForward();
    await page.goForward();
    await expect(quiz.fascist).toBeVisible();
    expect(isBrown((await colours(page)).background)).toBe(true);
  });

  test('coming back from another page leaves the quiz in a usable state', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await quiz.republicans.click();
    await page.getByRole('link', { name: en['footer.privacy'] }).click();
    await expect(page).toHaveURL(/\/privacy\/$/);
    await page.goBack();
    await expect(page).not.toHaveURL(/privacy/);

    // A browser may bring the page back exactly as it was, or load it afresh.
    // Either is fine; a half-shown mixture of the two is not.
    if ((await page.locator('html').getAttribute('data-quiz-verdict')) === 'communist') {
      await expect(quiz.communist).toBeVisible();
      await quiz.restart.click();
    }
    await expect(quiz.intro).toBeVisible();
    await expect(page.locator('html')).not.toHaveAttribute('data-quiz-verdict');
    await quiz.start.click();
    await expect(quiz.question).toBeVisible();
  });
});

test.describe('the answer stays private', () => {
  test('choosing an answer sends nothing to anyone', async ({ page, baseURL }) => {
    const quiz = quizIn(page, en);
    const problems = watchForProblems(page, baseURL!);
    await page.goto('/', { waitUntil: 'networkidle' });

    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));

    await quiz.start.click();
    await quiz.republicans.click();
    await expect(quiz.communist).toBeVisible();
    await page.goBack();
    await quiz.nationalists.click();
    await expect(quiz.fascist).toBeVisible();
    await quiz.restart.click();
    await expect(quiz.intro).toBeVisible();
    await page.waitForLoadState('networkidle');

    expect(requests).toEqual([]);
    expect(problems).toEqual([]);
  });

  test('nothing about the answer is kept in the address, cookies, storage or history', async ({
    page,
    context,
  }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    const address = page.url();
    await quiz.start.click();
    await quiz.republicans.click();
    await expect(quiz.communist).toBeVisible();

    expect(page.url()).toBe(address);
    expect(await context.cookies()).toEqual([]);
    const kept = await page.evaluate(() => ({
      local: JSON.stringify(localStorage),
      session: JSON.stringify(sessionStorage),
      history: JSON.stringify(history.state),
    }));
    expect(kept.local).toBe('{}');
    expect(kept.session).toBe('{}');
    expect(kept.history).toContain('"quiz":"result"');
    for (const word of ['republican', 'nationalist', 'communist', 'fascist']) {
      expect(kept.history.toLowerCase()).not.toContain(word);
    }
  });

  test('reloading on a result goes back to the start', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await quiz.nationalists.click();
    await expect(quiz.fascist).toBeVisible();

    await page.reload();
    await expect(quiz.intro).toBeVisible();
    await expect(quiz.start).toBeEnabled();
    await expect(quiz.fascist).toBeHidden();
    await expect(page.locator('html')).not.toHaveAttribute('data-quiz-verdict');
    expect(await page.evaluate(() => history.state)).toEqual({ quiz: 'intro' });
  });
});

test.describe('awkward clicking', () => {
  test('a double-click on Start shows the question and chooses nothing', async ({ page }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await expect(quiz.start).toBeEnabled();
    const before = await historyLength(page);

    await quiz.start.dblclick();
    await expect(quiz.question).toBeVisible();
    await expect(quiz.communist).toBeHidden();
    await expect(quiz.fascist).toBeHidden();
    expect(await historyLength(page)).toBe(before + 1);
  });

  test('a double-click on an answer shows the result and does not restart the quiz', async ({
    page,
  }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    const before = await historyLength(page);

    await quiz.nationalists.dblclick();
    await expect(quiz.fascist).toBeVisible();
    await expect(quiz.intro).toBeHidden();
    expect(await historyLength(page)).toBe(before + 1);
  });

  test('the second click of a double-click is ignored even when it lands on a button', async ({
    page,
  }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    // Wait out the hold on new buttons, so this tests the click count alone.
    await expect(quiz.republicans).not.toHaveAttribute('aria-disabled', 'true');
    const click = (count: number) =>
      quiz.republicans.evaluate(
        (button, detail) =>
          button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail })),
        count,
      );

    await click(2);
    await expect(quiz.question).toBeVisible();
    await expect(quiz.communist).toBeHidden();

    await click(1);
    await expect(quiz.communist).toBeVisible();
  });

  test('a press that arrives the instant a new screen appears is ignored', async ({ page }) => {
    // The second tap of a double tap lands on whatever the first tap put there.
    const quiz = quizIn(page, en);
    await page.goto('/');
    await expect(quiz.start).toBeEnabled();

    // Both presses happen in the same instant, which no person or test tool
    // could time by hand.
    const held = await page.evaluate(() => {
      const press = (selector: string) => {
        const button = document.querySelector<HTMLButtonElement>(selector);
        if (!button) throw new Error(`No button matches ${selector}`);
        button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
        return button;
      };
      press('[data-quiz-action="start"]');
      const answer = press('[data-quiz-answer="republicans"]');
      answer.focus();
      return {
        marked: answer.getAttribute('aria-disabled'),
        stillFocusable: document.activeElement === answer,
      };
    });

    await expect(quiz.question).toBeVisible();
    await expect(quiz.communist).toBeHidden();
    // Held, but still reachable by keyboard.
    expect(held).toEqual({ marked: 'true', stillFocusable: true });

    // A moment later the same button works.
    await expect(quiz.republicans).not.toHaveAttribute('aria-disabled', 'true');
    await quiz.republicans.click();
    await expect(quiz.communist).toBeVisible();
  });

  test('the same hold protects the result from an instant press on "Take quiz again"', async ({
    page,
  }) => {
    const quiz = quizIn(page, en);
    await page.goto('/');
    await quiz.start.click();
    await expect(quiz.nationalists).not.toHaveAttribute('aria-disabled', 'true');

    await page.evaluate(() => {
      for (const selector of [
        '[data-quiz-answer="nationalists"]',
        '[data-quiz-action="restart"]',
      ]) {
        // The restart buttons are still hidden when this runs; press them all.
        for (const button of document.querySelectorAll(selector)) {
          button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
        }
      }
    });

    await expect(quiz.fascist).toBeVisible();
    await expect(quiz.intro).toBeHidden();
  });
});

test.describe('keyboard only', () => {
  test('the whole quiz can be taken with Tab, Enter and Space', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'phone', 'Keyboard use is a desktop check.');
    const quiz = quizIn(page, en);
    await page.goto('/');
    await expect(quiz.start).toBeEnabled();

    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // site name
    await page.keyboard.press('Tab');
    await expect(quiz.start).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(quiz.question).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(quiz.republicans).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(quiz.nationalists).toBeFocused();
    // New buttons ignore presses for a moment; nobody reads a question that fast.
    await expect(quiz.nationalists).not.toHaveAttribute('aria-disabled', 'true');
    await page.keyboard.press('Space');

    await expect(quiz.fascist).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(quiz.restart).toBeFocused();
    await expect(quiz.restart).not.toHaveAttribute('aria-disabled', 'true');
    await page.keyboard.press('Enter');

    await expect(quiz.intro).toBeFocused();
  });
});

test.describe('when the quiz cannot start', () => {
  test('with JavaScript switched off, Start is disabled and the page says what to do', async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: baseURL! });
    const page = await context.newPage();
    const quiz = quizIn(page, en);
    await page.goto('/');

    await expect(quiz.intro).toBeVisible();
    await expect(quiz.start).toBeDisabled();
    await expect(quiz.loadError).toBeVisible({ timeout: 10_000 });
    await context.close();
  });

  test('if the script fails to load, Start stays disabled and the page says what to do', async ({
    page,
  }) => {
    const quiz = quizIn(page, en);
    await page.route('**/_astro/*.js', (route) => route.abort());
    await page.goto('/');

    await expect(quiz.start).toBeDisabled();
    // Not at once: a script that is merely slow should not flash an error.
    await expect(quiz.loadError).toBeHidden();
    await expect(quiz.loadError).toBeVisible({ timeout: 10_000 });
    await expect(quiz.start).toBeDisabled();
  });
});
