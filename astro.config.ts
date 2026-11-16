import { defineConfig } from 'astro/config';
import { loadSiteConfig } from './src/config/load';
import { siteFiles } from './src/integrations/site-files';

const loaded = loadSiteConfig(process.env);

export default defineConfig({
  site: loaded.siteConfig.siteUrl,
  output: 'static',
  trailingSlash: 'always',
  build: {
    // Styles and scripts are always separate files, never inline, so the
    // Content-Security-Policy can refuse inline code outright.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  integrations: [siteFiles(loaded)],
});
