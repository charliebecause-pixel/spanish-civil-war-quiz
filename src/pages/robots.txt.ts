import type { APIRoute } from 'astro';
import { siteEnv } from '../config';

// Only the real site may be crawled. /go/ holds redirects to partners, which
// search engines should not follow.
const body =
  siteEnv === 'production'
    ? ['User-agent: *', 'Disallow: /go/', ''].join('\n')
    : ['User-agent: *', 'Disallow: /', ''].join('\n');

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
