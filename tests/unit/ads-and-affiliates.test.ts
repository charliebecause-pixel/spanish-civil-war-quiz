import { afterEach, describe, expect, it, vi } from 'vitest';
import fakeJson from '../../config/site.fake.json';
import productionJson from '../../config/site.production.json';
import { onRequestGet } from '../../functions/go/[slug]';
import { parseSiteConfig } from '../../src/config/schema';
import { buildAdsTxt } from '../../src/lib/ads-txt';
import {
  affiliatePath,
  parseAffiliateTargets,
  resolveAffiliateUrl,
  type AffiliateTarget,
} from '../../src/lib/affiliate';

const fake = parseSiteConfig(fakeJson, 'fake');
const production = parseSiteConfig(productionJson, 'production');

describe('buildAdsTxt', () => {
  it('lists each ad network on its own line', () => {
    expect(buildAdsTxt(fake.ads)).toContain(
      '\nads.example, pub-0000000000000000, DIRECT, fake0000000000000\n',
    );
  });

  it('leaves out the certification ID when a network has none', () => {
    const ads = structuredClone(fake.ads);
    delete ads.networks[0]!.certificationAuthorityId;
    expect(buildAdsTxt(ads)).toContain('\nads.example, pub-0000000000000000, DIRECT\n');
  });

  it('declares that nobody may sell ad space while ads are off', () => {
    const text = buildAdsTxt(production.ads);
    expect(text).toContain('placeholder.example.com, placeholder, DIRECT, placeholder');
    expect(text).not.toContain('pub-');
  });

  it('declares nobody even if networks are configured but ads are off', () => {
    expect(buildAdsTxt({ ...fake.ads, enabled: false })).not.toContain('pub-');
  });
});

const targets: AffiliateTarget[] = [
  {
    slug: 'book',
    url: 'https://shop.example/books/1?colour=red',
    params: { ref: 'quiz', utm_source: 'quiz' },
  },
  { slug: 'plain', url: 'https://shop.example/plain', params: {} },
];

describe('affiliate links', () => {
  it('always points on-site links at /go/<slug>', () => {
    expect(affiliatePath('example-book')).toBe('/go/example-book');
    expect(() => affiliatePath('../admin')).toThrow();
  });

  it('adds tracking parameters and keeps existing ones', () => {
    expect(resolveAffiliateUrl(targets, 'book')).toBe(
      'https://shop.example/books/1?colour=red&ref=quiz&utm_source=quiz',
    );
    expect(resolveAffiliateUrl(targets, 'plain')).toBe('https://shop.example/plain');
  });

  it('returns null for a slug it does not know', () => {
    expect(resolveAffiliateUrl(targets, 'nope')).toBeNull();
  });

  it('accepts a well-formed links file', () => {
    expect(parseAffiliateTargets(structuredClone(targets))).toEqual(targets);
  });

  it.each([
    ['not a list', { slug: 'x' }],
    ['a non-object entry', ['x']],
    ['a bad slug', [{ slug: 'Bad Slug', url: 'https://a.example', params: {} }]],
    ['a plain http address', [{ slug: 'x', url: 'http://a.example', params: {} }]],
    ['a script address', [{ slug: 'x', url: 'javascript:alert(1)', params: {} }]],
    ['non-text parameters', [{ slug: 'x', url: 'https://a.example', params: { a: 1 } }]],
    ['missing parameters', [{ slug: 'x', url: 'https://a.example' }]],
  ])('rejects a links file with %s', (_name, data) => {
    expect(() => parseAffiliateTargets(data)).toThrow();
  });
});

describe('/go/<slug> redirect function', () => {
  const call = (slug: string, linksResponse: Response) =>
    onRequestGet({
      request: new Request(`https://quiz.example/go/${slug}`, {
        headers: { 'User-Agent': 'TestBrowser/1.0', 'CF-Connecting-IP': '203.0.113.9' },
      }),
      params: { slug },
      env: { ASSETS: { fetch: () => Promise.resolve(linksResponse) } },
    });

  afterEach(() => vi.restoreAllMocks());

  it('redirects a known slug to the partner and logs the click without personal data', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const response = await call('book', Response.json(targets));

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe(
      'https://shop.example/books/1?colour=red&ref=quiz&utm_source=quiz',
    );
    expect(response.headers.get('Cache-Control')).toBe('no-store');

    expect(log).toHaveBeenCalledOnce();
    const line = String(log.mock.calls[0]?.[0]);
    const entry = JSON.parse(line) as Record<string, unknown>;
    expect(entry).toMatchObject({ event: 'affiliate_click', slug: 'book' });
    expect(Object.keys(entry).sort()).toEqual(['at', 'event', 'requestId', 'slug']);
    expect(line).not.toContain('203.0.113.9');
    expect(line).not.toContain('TestBrowser');
  });

  it('answers 404 with advice for an unknown slug', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const response = await call('nope', Response.json(targets));
    expect(response.status).toBe(404);
    expect(await response.text()).toMatch(/go back/);
  });

  it('answers 503, not a redirect, when the links file is broken', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const broken = await call(
      'book',
      Response.json([{ slug: 'book', url: 'javascript:alert(1)', params: {} }]),
    );
    expect(broken.status).toBe(503);
    expect(broken.headers.get('Location')).toBeNull();

    const missing = await call('book', new Response('gone', { status: 404 }));
    expect(missing.status).toBe(503);
  });
});
