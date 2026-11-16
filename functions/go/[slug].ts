// Cloudflare Pages function for /go/<slug>: the one door every paid or partner
// link leaves through. It looks the slug up, logs the click with no personal
// data, and redirects to the partner with tracking parameters added.

import {
  AFFILIATE_LINKS_PATH,
  parseAffiliateTargets,
  resolveAffiliateUrl,
} from '../../src/lib/affiliate';

interface Context {
  request: Request;
  params: Record<string, string | string[]>;
  env: { ASSETS: { fetch(input: Request | URL | string): Promise<Response> } };
}

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };

function text(status: number, body: string): Response {
  return new Response(body, {
    status,
    headers: { ...NO_STORE, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function log(entry: Record<string, unknown>): void {
  console.log(JSON.stringify({ at: new Date().toISOString(), ...entry }));
}

export async function onRequestGet({ request, params, env }: Context): Promise<Response> {
  const requestId = crypto.randomUUID();
  const slug = typeof params['slug'] === 'string' ? params['slug'] : '';

  let destination: string | null;
  try {
    const response = await env.ASSETS.fetch(new URL(AFFILIATE_LINKS_PATH, request.url));
    if (!response.ok) throw new Error(`links file returned ${response.status}`);
    destination = resolveAffiliateUrl(parseAffiliateTargets(await response.json()), slug);
  } catch (error) {
    log({ event: 'affiliate_error', requestId, slug, error: String(error) });
    return text(503, 'This link is not working right now. Please go back and try again later.');
  }

  if (destination === null) {
    log({ event: 'affiliate_unknown_slug', requestId, slug });
    return text(404, 'This link does not exist. Please go back to the previous page.');
  }

  // Deliberately no IP address, user agent or referrer.
  log({ event: 'affiliate_click', requestId, slug });
  return new Response(null, { status: 302, headers: { ...NO_STORE, Location: destination } });
}
