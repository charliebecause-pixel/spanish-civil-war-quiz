import type { APIRoute } from 'astro';
import { siteConfig } from '../config';
import { buildAdsTxt } from '../lib/ads-txt';

export const GET: APIRoute = () =>
  new Response(buildAdsTxt(siteConfig.ads), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
