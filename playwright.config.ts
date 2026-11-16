import { defineConfig, devices } from '@playwright/test';

const PORT = 8788;
const baseURL = `http://127.0.0.1:${PORT}`;
const isCI = Boolean(process.env['CI']);

// The tests run against the built site (`pnpm build` first), served by
// Cloudflare's local Pages server so security headers and the /go/ redirect
// function behave as they do when deployed.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `wrangler pages dev dist --ip 127.0.0.1 --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
