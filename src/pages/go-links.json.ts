import type { APIRoute } from 'astro';
import { siteConfig } from '../config';
import type { AffiliateTarget } from '../lib/affiliate';

// The list the /go/<slug> redirect function reads (see functions/go/[slug].ts).
// It is public on purpose: it holds nothing but the partner addresses that
// visitors are sent to anyway.
const targets: AffiliateTarget[] = siteConfig.affiliates.map(({ slug, url, params }) => ({
  slug,
  url,
  params,
}));

export const GET: APIRoute = () =>
  new Response(JSON.stringify(targets), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
