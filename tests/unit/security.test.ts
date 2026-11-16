import { describe, expect, it } from 'vitest';
import { redactText, scrubEvent, stripUrl } from '../../src/lib/scrub';
import { buildCsp, buildHeadersFile, type HeaderOptions } from '../../src/lib/security-headers';
import { buildSecurityTxt } from '../../src/lib/security-txt';

const base: HeaderOptions = {
  siteEnv: 'production',
  liveAds: false,
  cloudflareWebAnalytics: false,
  sentryDsn: undefined,
};

describe('buildCsp', () => {
  it('allows nothing from outside the site by default', () => {
    const csp = buildCsp(base);
    expect(csp).toContain("default-src 'none'");
    expect(csp).toContain("script-src 'self';");
    expect(csp).toContain("style-src 'self';");
    expect(csp).toContain("frame-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).not.toMatch(/https:\/\//);
  });

  it('allows Cloudflare Web Analytics only when it is switched on', () => {
    const csp = buildCsp({ ...base, cloudflareWebAnalytics: true });
    expect(csp).toContain("script-src 'self' https://static.cloudflareinsights.com;");
    expect(csp).toContain("connect-src 'self' https://cloudflareinsights.com;");
  });

  it('allows error reports to go to the configured Sentry host and nowhere else', () => {
    const csp = buildCsp({ ...base, sentryDsn: 'https://abc123@o42.ingest.us.sentry.io/7' });
    expect(csp).toContain("connect-src 'self' https://o42.ingest.us.sentry.io;");
    expect(csp).not.toContain('abc123');
  });

  it('adds ad hosts only for live ads', () => {
    expect(buildCsp(base)).not.toContain('googlesyndication');
    const csp = buildCsp({ ...base, liveAds: true });
    expect(csp).toContain('https://pagead2.googlesyndication.com');
    expect(csp).toContain('frame-src https://googleads.g.doubleclick.net');
    // Scripts still may not be inline, even with ads.
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/);
  });

  it('upgrades insecure requests everywhere except a developer machine', () => {
    expect(buildCsp(base)).toContain('upgrade-insecure-requests');
    expect(buildCsp({ ...base, siteEnv: 'staging' })).toContain('upgrade-insecure-requests');
    expect(buildCsp({ ...base, siteEnv: 'local' })).not.toContain('upgrade-insecure-requests');
  });
});

describe('buildHeadersFile', () => {
  it('sets every required security header on every page', () => {
    const file = buildHeadersFile(base);
    expect(file.startsWith('/*\n  Content-Security-Policy: ')).toBe(true);
    for (const header of [
      'Strict-Transport-Security: max-age=31536000; includeSubDomains',
      'X-Content-Type-Options: nosniff',
      'X-Frame-Options: DENY',
      'Referrer-Policy: strict-origin-when-cross-origin',
    ]) {
      expect(file).toContain(`\n  ${header}\n`);
    }
  });

  it('hides everything except production from search engines', () => {
    expect(buildHeadersFile(base)).not.toContain('X-Robots-Tag');
    expect(buildHeadersFile({ ...base, siteEnv: 'staging' })).toContain(
      'X-Robots-Tag: noindex, nofollow',
    );
    expect(buildHeadersFile({ ...base, siteEnv: 'local' })).toContain(
      'X-Robots-Tag: noindex, nofollow',
    );
  });
});

describe('buildSecurityTxt', () => {
  const text = buildSecurityTxt({
    contactEmail: 'security@quiz.example',
    siteUrl: 'https://quiz.example',
    languages: ['en', 'es'],
    now: new Date('2026-11-16T12:00:00Z'),
  });

  it('has the fields RFC 9116 requires', () => {
    expect(text).toContain('Contact: mailto:security@quiz.example\n');
    expect(text).toContain('Expires: 2027-11-15T12:00:00.000Z\n');
  });

  it('names the languages and its own address', () => {
    expect(text).toContain('Preferred-Languages: en, es\n');
    expect(text).toContain('Canonical: https://quiz.example/.well-known/security.txt\n');
  });
});

describe('redactText', () => {
  it.each([
    ['an email address', 'failed for jane.doe+test@mail.example today', 'jane.doe'],
    ['a bearer token', 'header was Bearer abc.DEF-123_xyz', 'abc.DEF'],
    ['a password in a query', 'GET /login?user=a&password=hunter2', 'hunter2'],
    ['an API key', 'api_key=sk_test_12345 rejected', 'sk_test_12345'],
    ['a card number', 'card 4242 4242 4242 4242 declined', '4242 4242'],
    ['a card number without spaces', 'card 4242424242424242 declined', '4242424242424242'],
  ])('removes %s', (_name, input, secret) => {
    const output = redactText(input);
    expect(output).not.toContain(secret);
    expect(output).toContain('[removed]');
  });

  it('leaves ordinary error text alone', () => {
    const message = "TypeError: Cannot read properties of undefined (reading 'x') at line 1234";
    expect(redactText(message)).toBe(message);
  });
});

describe('stripUrl', () => {
  it('drops the query string and fragment', () => {
    expect(stripUrl('https://quiz.example/es/?email=a@b.example#top')).toBe(
      'https://quiz.example/es/',
    );
    expect(stripUrl('https://quiz.example/privacy/')).toBe('https://quiz.example/privacy/');
  });
});

describe('scrubEvent', () => {
  it('removes everything that could identify a visitor', () => {
    const event = scrubEvent({
      user: { ip_address: '203.0.113.9', email: 'jane@mail.example' },
      message: 'Could not load for jane@mail.example',
      breadcrumbs: [{ category: 'ui.click', message: 'button#start' }],
      request: {
        url: 'https://quiz.example/?token=abc123',
        cookies: { session: 'secret' },
        headers: {
          'User-Agent': 'TestBrowser/1.0',
          Referer: 'https://mail.example/inbox',
          Cookie: 'a=b',
        },
        data: 'password=hunter2',
        query_string: 'token=abc123',
      },
      exception: { values: [{ value: 'Bearer abc.def.ghi was rejected' }] },
    });

    const sent = JSON.stringify(event);
    for (const secret of [
      '203.0.113.9',
      'jane@mail.example',
      'abc123',
      'hunter2',
      'abc.def.ghi',
      'inbox',
      'session',
    ]) {
      expect(sent).not.toContain(secret);
    }
    expect(event).not.toHaveProperty('user');
    expect(event).not.toHaveProperty('breadcrumbs');
    expect(event.request).toEqual({
      url: 'https://quiz.example/',
      headers: { 'User-Agent': 'TestBrowser/1.0' },
    });
  });

  it('copes with a report that has almost nothing in it', () => {
    expect(scrubEvent({})).toEqual({});
    expect(scrubEvent({ request: { headers: { Cookie: 'a=b' } } })).toEqual({ request: {} });
  });
});
