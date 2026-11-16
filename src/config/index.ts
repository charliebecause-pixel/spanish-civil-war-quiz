import { loadSiteConfig } from './load';

// Read once, at build time. Nothing here reaches the browser unless a page prints it.
export const { siteEnv, siteConfig, sentryDsn } = loadSiteConfig(process.env);
