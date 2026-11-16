import type { Page } from '@playwright/test';

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
