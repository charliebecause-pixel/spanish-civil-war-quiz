import type { SiteEnv } from '../config/env';

export interface HeaderOptions {
  siteEnv: SiteEnv;
  /** True only when real ads are switched on. Placeholder ads need no outside hosts. */
  liveAds: boolean;
  cloudflareWebAnalytics: boolean;
  sentryDsn: string | undefined;
}

// Hosts Google AdSense loads from. NOT YET VERIFIED against a live ad: check
// the browser console for Content-Security-Policy errors on staging before
// real ads are switched on in production (see docs/decisions/0002).
const ADSENSE = {
  script: [
    'https://pagead2.googlesyndication.com',
    'https://*.googlesyndication.com',
    'https://*.doubleclick.net',
    'https://*.google.com',
    'https://*.adtrafficquality.google',
  ],
  frame: [
    'https://googleads.g.doubleclick.net',
    'https://*.googlesyndication.com',
    'https://*.google.com',
    'https://*.adtrafficquality.google',
  ],
  connect: [
    'https://*.googlesyndication.com',
    'https://*.doubleclick.net',
    'https://*.google.com',
    'https://*.adtrafficquality.google',
  ],
};

/** Builds the Content-Security-Policy: nothing loads unless it is listed here. */
export function buildCsp(options: HeaderOptions): string {
  const directives: Record<string, string[]> = {
    'default-src': ["'none'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'frame-src': [],
    'manifest-src': ["'self'"],
    'base-uri': ["'none'"],
    'form-action': ["'none'"],
    'frame-ancestors': ["'none'"],
  };
  const add = (name: string, ...sources: string[]) => directives[name]?.push(...sources);

  if (options.cloudflareWebAnalytics) {
    add('script-src', 'https://static.cloudflareinsights.com');
    add('connect-src', 'https://cloudflareinsights.com');
  }
  if (options.sentryDsn) {
    add('connect-src', new URL(options.sentryDsn).origin);
  }
  if (options.liveAds) {
    add('script-src', ...ADSENSE.script);
    add('frame-src', ...ADSENSE.frame);
    add('connect-src', ...ADSENSE.connect);
    add('img-src', 'https:');
    // Ad code sizes its own containers with inline style attributes.
    directives['style-src-attr'] = ["'unsafe-inline'"];
  }

  const parts = Object.entries(directives).map(
    ([name, sources]) => `${name} ${sources.length > 0 ? sources.join(' ') : "'none'"}`,
  );
  // Plain http is only ever used on a developer's own machine.
  if (options.siteEnv !== 'local') parts.push('upgrade-insecure-requests');
  return parts.join('; ');
}

/** Builds the `_headers` file that Cloudflare Pages applies to every static response. */
export function buildHeadersFile(options: HeaderOptions): string {
  const everyPage = [
    `Content-Security-Policy: ${buildCsp(options)}`,
    'Strict-Transport-Security: max-age=31536000; includeSubDomains',
    'X-Content-Type-Options: nosniff',
    'X-Frame-Options: DENY',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy: same-origin',
    'Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  ];
  // Only the real site may appear in search engines.
  if (options.siteEnv !== 'production') everyPage.push('X-Robots-Tag: noindex, nofollow');

  const block = (path: string, headers: string[]) =>
    [path, ...headers.map((header) => `  ${header}`)].join('\n');

  return [
    block('/*', everyPage),
    // File names under /_astro/ contain a hash of their content, so they never change.
    block('/_astro/*', ['Cache-Control: public, max-age=31536000, immutable']),
    '',
  ].join('\n\n');
}
