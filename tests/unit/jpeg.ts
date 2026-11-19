import { expect } from 'vitest';

/** Reads a JPEG's width and height from its start-of-frame marker. */
export function jpegSize(bytes: Buffer): { width: number; height: number } {
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
