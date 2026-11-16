import { describe, expect, it } from 'vitest';
import fakeJson from '../../config/site.fake.json';
import productionJson from '../../config/site.production.json';
import { resolveSiteEnv } from '../../src/config/env';
import { loadSiteConfig } from '../../src/config/load';
import { assertReadyForProduction, parseSiteConfig } from '../../src/config/schema';

const clone = <T>(value: T): T => structuredClone(value);

describe('resolveSiteEnv', () => {
  it('is local when nothing is set', () => {
    expect(resolveSiteEnv({})).toBe('local');
  });

  it('treats the main branch on Cloudflare Pages as production', () => {
    expect(resolveSiteEnv({ CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe('production');
  });

  it('treats every other Cloudflare Pages branch as staging', () => {
    expect(resolveSiteEnv({ CF_PAGES: '1', CF_PAGES_BRANCH: 'staging' })).toBe('staging');
    expect(resolveSiteEnv({ CF_PAGES: '1', CF_PAGES_BRANCH: 'feature/quiz' })).toBe('staging');
  });

  it('lets an explicit SITE_ENV win', () => {
    expect(resolveSiteEnv({ SITE_ENV: 'staging', CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe(
      'staging',
    );
  });

  it('rejects a misspelt SITE_ENV instead of guessing', () => {
    expect(() => resolveSiteEnv({ SITE_ENV: 'prod' })).toThrow(/SITE_ENV must be one of/);
  });
});

describe('committed config files', () => {
  it('both pass the schema', () => {
    expect(() => parseSiteConfig(fakeJson, 'fake')).not.toThrow();
    expect(() => parseSiteConfig(productionJson, 'production')).not.toThrow();
  });

  it('the fake config contains only made-up addresses and IDs', () => {
    const fake = parseSiteConfig(fakeJson, 'fake');
    expect(new URL(fake.siteUrl).hostname).toMatch(/\.example$/);
    expect(fake.securityContact).toMatch(/\.example$/);
    expect(fake.ads.mode).toBe('placeholder');
    for (const network of fake.ads.networks)
      expect(network.publisherId).toBe('pub-0000000000000000');
    for (const link of fake.affiliates) expect(new URL(link.url).hostname).toMatch(/\.example$/);
  });

  // The owner decided the first release launches without ads. Changing this
  // test is a deliberate act that needs the owner's review.
  it('production launches with ads switched off and no paid links', () => {
    const production = parseSiteConfig(productionJson, 'production');
    expect(production.ads.enabled).toBe(false);
    expect(production.affiliates).toEqual([]);
  });
});

describe('loadSiteConfig', () => {
  it('uses the fake config for local and staging builds', () => {
    expect(loadSiteConfig({}).siteConfig.siteUrl).toBe(fakeJson.siteUrl);
    expect(loadSiteConfig({ SITE_ENV: 'staging' }).siteConfig.siteUrl).toBe(fakeJson.siteUrl);
  });

  it('passes the Sentry address through and treats empty as off', () => {
    expect(loadSiteConfig({ PUBLIC_SENTRY_DSN: '' }).sentryDsn).toBeUndefined();
    expect(
      loadSiteConfig({ PUBLIC_SENTRY_DSN: 'https://key@o1.ingest.us.sentry.io/2' }).sentryDsn,
    ).toBe('https://key@o1.ingest.us.sentry.io/2');
  });
});

describe('assertReadyForProduction', () => {
  it('refuses a placeholder domain', () => {
    const config = parseSiteConfig(fakeJson, 'fake');
    expect(() => assertReadyForProduction(config)).toThrow(/placeholder address/);
  });

  it('accepts a real domain', () => {
    const config = parseSiteConfig({ ...clone(fakeJson), siteUrl: 'https://quiz.test' }, 'fake');
    expect(() => assertReadyForProduction(config)).not.toThrow();
  });
});

describe('schema rules', () => {
  it('rejects an ad network the privacy policy would not name', () => {
    const raw = clone(fakeJson);
    raw.partners = raw.partners.filter((partner) => partner.id !== 'example-ads');
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/privacy policy would not name it/);
  });

  it('rejects a paid link whose partner is missing from the partner list', () => {
    const raw = clone(fakeJson);
    raw.partners = raw.partners.filter((partner) => partner.id !== 'example-affiliate');
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/has no entry in partners/);
  });

  it('rejects live ads with no ad network', () => {
    const raw = clone(fakeJson);
    raw.ads.mode = 'live';
    raw.ads.networks = [];
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/Live ads need at least one ad network/);
  });

  it('rejects duplicate affiliate slugs', () => {
    const raw = clone(fakeJson);
    raw.affiliates.push(clone(raw.affiliates[0]!));
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/used twice/);
  });

  it('rejects plain http addresses', () => {
    const raw = { ...clone(fakeJson), siteUrl: 'http://quiz.example' };
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/https:\/\//);
  });

  it('rejects settings it does not know, so typos are caught', () => {
    const raw = { ...clone(fakeJson), adz: {} };
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/not valid/);
  });

  it('requires every partner description in every language', () => {
    const raw = clone(fakeJson);
    raw.partners[0]!.purpose.es = '';
    expect(() => parseSiteConfig(raw, 'test')).toThrow(/partners\.0\.purpose\.es/);
  });
});
