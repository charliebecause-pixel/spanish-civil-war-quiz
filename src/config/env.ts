export const SITE_ENVS = ['production', 'staging', 'local'] as const;
export type SiteEnv = (typeof SITE_ENVS)[number];

export type EnvVars = Readonly<Record<string, string | undefined>>;

function isSiteEnv(value: string): value is SiteEnv {
  return (SITE_ENVS as readonly string[]).includes(value);
}

/**
 * Decides which environment a build is for.
 *
 * An explicit SITE_ENV always wins. On Cloudflare Pages the `main` branch is
 * production and every other branch is staging. Everything else is local.
 * Anything that is not production uses the fake config and is never indexed.
 */
export function resolveSiteEnv(env: EnvVars): SiteEnv {
  const explicit = env['SITE_ENV'];
  if (explicit !== undefined && explicit !== '') {
    if (isSiteEnv(explicit)) return explicit;
    throw new Error(`SITE_ENV must be one of ${SITE_ENVS.join(', ')}. Got "${explicit}".`);
  }
  if (env['CF_PAGES'] === '1') {
    return env['CF_PAGES_BRANCH'] === 'main' ? 'production' : 'staging';
  }
  return 'local';
}
