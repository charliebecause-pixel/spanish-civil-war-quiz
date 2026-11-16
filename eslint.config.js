import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', '.wrangler/', 'playwright-report/', 'test-results/']),
  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,
  {
    // Build-time and tooling code runs in Node.
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // In tests, `value!` on fixture data is clearer than a guard that cannot fail.
    files: ['tests/**/*.ts'],
    rules: { '@typescript-eslint/no-non-null-assertion': 'off' },
  },
  {
    // These files run in the visitor's browser.
    files: ['src/scripts/**/*.ts'],
    languageOptions: { globals: { ...globals.browser } },
  },
]);
