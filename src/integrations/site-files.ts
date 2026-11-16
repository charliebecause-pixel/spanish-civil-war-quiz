import { mkdir, writeFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import type { LoadedConfig } from '../config/load';
import { LOCALES } from '../i18n';
import { buildHeadersFile } from '../lib/security-headers';
import { buildSecurityTxt } from '../lib/security-txt';

/**
 * Writes the files Astro's router cannot produce because of their names:
 * `_headers` (security headers for Cloudflare Pages) and
 * `.well-known/security.txt`.
 */
export function siteFiles({ siteEnv, siteConfig, sentryDsn }: LoadedConfig): AstroIntegration {
  return {
    name: 'site-files',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        await writeFile(
          new URL('_headers', dir),
          buildHeadersFile({
            siteEnv,
            liveAds: siteConfig.ads.enabled && siteConfig.ads.mode === 'live',
            cloudflareWebAnalytics: siteConfig.analytics.cloudflareWebAnalytics,
            sentryDsn,
          }),
        );

        await mkdir(new URL('.well-known/', dir), { recursive: true });
        await writeFile(
          new URL('.well-known/security.txt', dir),
          buildSecurityTxt({
            contactEmail: siteConfig.securityContact,
            siteUrl: siteConfig.siteUrl,
            languages: LOCALES,
            now: new Date(),
          }),
        );

        logger.info(`wrote _headers and .well-known/security.txt for the ${siteEnv} environment`);
      },
    },
  };
}
