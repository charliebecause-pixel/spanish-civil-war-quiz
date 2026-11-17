import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import en from '../../src/i18n/en.json' with { type: 'json' };
import es from '../../src/i18n/es.json' with { type: 'json' };
import { LICENCE_URL, QUIZ_IMAGES, imagePath, imagesIn } from '../../src/lib/quiz-images';

const FOLDER = join(import.meta.dirname, '../../public/images/quiz');

/** Reads a JPEG's width and height from its start-of-frame marker. */
function jpegSize(bytes: Buffer): { width: number; height: number } {
  expect(bytes.readUInt16BE(0)).toBe(0xffd8);
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes.readUInt16BE(offset);
    const length = bytes.readUInt16BE(offset + 2);
    // SOF0 to SOF15, except DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xffc0 && marker <= 0xffcf && ![0xffc4, 0xffc8, 0xffcc].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error('no start-of-frame marker');
}

describe('the quiz images', () => {
  it('lists every file in public/images/quiz, and nothing that is not there', () => {
    const files = readdirSync(FOLDER).sort();
    const listed = QUIZ_IMAGES.map((image) => imagePath(image).split('/').pop()).sort();
    expect(listed).toEqual(files);
  });

  it.each(QUIZ_IMAGES.map((image) => [image.id, image] as const))(
    '%s has the width and height the page gives it, and stays small',
    (_id, image) => {
      const bytes = readFileSync(join(FOLDER, `${image.id}.jpg`));
      expect(jpegSize(bytes)).toEqual({ width: image.width, height: image.height });
      expect(bytes.length).toBeLessThan(70_000);
    },
  );

  it('keeps each screen light', () => {
    const weight = (ids: string[]) =>
      ids.reduce((sum, id) => sum + readFileSync(join(FOLDER, `${id}.jpg`)).length, 0);
    const ids = (sets: Parameters<typeof imagesIn>[0][]) =>
      sets.flatMap((set) => imagesIn(set).map((image) => image.id));
    expect(weight(ids(['question-a', 'question-b']))).toBeLessThan(150_000);
    expect(weight(ids(['communist']))).toBeLessThan(220_000);
    expect(weight(ids(['fascist']))).toBeLessThan(220_000);
  });

  it('puts Republican posters on one side of the question and Nationalist ones on the other', () => {
    expect(imagesIn('question-a').every((image) => image.id.startsWith('rep-'))).toBe(true);
    expect(imagesIn('question-b').every((image) => image.id.startsWith('nat-'))).toBe(true);
    expect(imagesIn('question-a').length).toBeGreaterThan(0);
    expect(imagesIn('question-b').length).toBeGreaterThan(0);
  });

  it('gives every image a source on Wikimedia Commons and a known licence', () => {
    for (const image of QUIZ_IMAGES) {
      expect(image.source).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(image.licence in LICENCE_URL).toBe(true);
      // A licence that requires credit names who to credit.
      if (image.licence !== 'public-domain') expect(image.author).toBeTruthy();
    }
  });

  it('describes every image in both languages', () => {
    for (const image of QUIZ_IMAGES) {
      const key = `credits.image.${image.id}` as const;
      expect(en[key]).toBeTruthy();
      expect(es[key]).toBeTruthy();
    }
  });
});
