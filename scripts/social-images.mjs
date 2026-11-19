// Draws the link-preview pictures into public/social/<locale>.jpg and records
// the text that went into them in src/lib/social-image-text.json, so a unit
// test can tell when a picture is out of date (docs/decisions/0010).
//
// Run after a local build, which includes the /dev/ pages:
//   corepack pnpm build
//   corepack pnpm social

// The functions passed to page.evaluate() run in the browser.
/* global document */

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';
import { OG_LOCALE, SOCIAL_IMAGE, socialImagePath } from '../src/lib/social-image.ts';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const TEXT_FILE = join(ROOT, 'src/lib/social-image-text.json');
const QUALITY = 88;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

if (!existsSync(join(DIST, 'dev/social'))) {
  console.error('No dist/dev/social/. Run `corepack pnpm build` (not a production build) first.');
  process.exit(1);
}

// A tiny server for dist/, so the page's absolute paths (/_astro/, /images/) resolve.
const server = createServer(async (request, response) => {
  const path = decodeURIComponent(new URL(request.url ?? '/', 'http://x').pathname);
  const file = resolve(DIST, `.${path.endsWith('/') ? `${path}index.html` : path}`);
  if (!file.startsWith(DIST + sep)) return response.writeHead(403).end();
  try {
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const text = {};
try {
  const page = await browser.newPage({
    viewport: { width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height },
    deviceScaleFactor: 1,
  });
  for (const locale of Object.keys(OG_LOCALE)) {
    const response = await page.goto(`${origin}/dev/social/${locale}/`);
    if (!response?.ok()) throw new Error(`/dev/social/${locale}/ answered ${response?.status()}`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode()));
    });

    const card = page.locator('[data-social-card]');
    const box = await card.boundingBox();
    if (box?.width !== SOCIAL_IMAGE.width || box.height !== SOCIAL_IMAGE.height) {
      throw new Error(`The card is ${box?.width}x${box?.height}, not the size in social-image.ts.`);
    }

    const out = join(ROOT, 'public', socialImagePath(locale));
    await mkdir(join(out, '..'), { recursive: true });
    await card.screenshot({ path: out, type: 'jpeg', quality: QUALITY });

    text[locale] = Object.fromEntries(
      await page
        .locator('[data-social-key]')
        .evaluateAll((items) =>
          items.map((item) => [item.getAttribute('data-social-key'), item.textContent.trim()]),
        ),
    );
    console.log(`Wrote public${socialImagePath(locale)}`);
  }
} finally {
  await browser.close();
  server.close();
}

await writeFile(TEXT_FILE, `${JSON.stringify(text, null, 2)}\n`);
console.log('Wrote src/lib/social-image-text.json');
