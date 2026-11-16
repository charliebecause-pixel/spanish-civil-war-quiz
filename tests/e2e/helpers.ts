import type { Page } from '@playwright/test';

/**
 * Waits until every animation on the page has finished. Screens fade, slam
 * and pop into place, so anything that measures or inspects them waits first.
 */
export function settle(page: Page): Promise<void> {
  return page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((animation) => animation.finished.catch(() => undefined)),
    ).then(() => undefined),
  );
}

/**
 * Records anything that should never happen on a page: script errors, console
 * errors (a blocked Content-Security-Policy request shows up as one), and
 * requests to any other site.
 */
export function watchForProblems(page: Page, baseURL: string) {
  const problems: string[] = [];
  const origin = new URL(baseURL).origin;

  page.on('pageerror', (error) => problems.push(`script error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console error: ${message.text()}`);
  });
  page.on('request', (request) => {
    const url = request.url();
    if (!url.startsWith(origin) && !url.startsWith('data:'))
      problems.push(`outside request: ${url}`);
  });
  return problems;
}
