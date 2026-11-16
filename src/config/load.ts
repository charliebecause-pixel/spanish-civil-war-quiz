import fakeJson from '../../config/site.fake.json';
import productionJson from '../../config/site.production.json';
import { resolveSiteEnv, type EnvVars, type SiteEnv } from './env';
import { assertReadyForProduction, parseSiteConfig, type SiteConfig } from './schema';

export interface LoadedConfig {
  siteEnv: SiteEnv;
  siteConfig: SiteConfig;
  /** Public Sentry address for browser error reports. Unset means error tracking is off. */
  sentryDsn: string | undefined;
}

/**
 * Production builds read the real config. Local, preview and staging builds
 * read the fake config, so no real ad or partner IDs exist outside production.
 */
export function loadSiteConfig(env: EnvVars): LoadedConfig {
  const siteEnv = resolveSiteEnv(env);
  const sentryDsn = env['PUBLIC_SENTRY_DSN'] || undefined;

  if (siteEnv === 'production') {
    const siteConfig = parseSiteConfig(productionJson, 'config/site.production.json');
    assertReadyForProduction(siteConfig);
    return { siteEnv, siteConfig, sentryDsn };
  }
  return { siteEnv, siteConfig: parseSiteConfig(fakeJson, 'config/site.fake.json'), sentryDsn };
}
