// Shared by the site build and by the /go/<slug> redirect function, so it must
// not import anything that only exists at build time.

export interface AffiliateTarget {
  slug: string;
  url: string;
  params: Record<string, string>;
}

/** Where the redirect function reads its list of links from. */
export const AFFILIATE_LINKS_PATH = '/go-links.json';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isAffiliateSlug(value: string): boolean {
  return SLUG.test(value);
}

/** The on-site address every paid link uses. */
export function affiliatePath(slug: string): string {
  if (!isAffiliateSlug(slug)) throw new Error(`Not a valid affiliate slug: "${slug}".`);
  return `/go/${slug}`;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((entry) => typeof entry === 'string')
  );
}

/**
 * Checks the shape of the links file before it is trusted. Throws on anything
 * unexpected so a broken file fails loudly instead of redirecting somewhere odd.
 */
export function parseAffiliateTargets(data: unknown): AffiliateTarget[] {
  if (!Array.isArray(data)) throw new Error('Affiliate links must be a list.');
  return data.map((entry: unknown, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`Affiliate link ${index} is not an object.`);
    }
    const { slug, url, params } = entry as Record<string, unknown>;
    if (typeof slug !== 'string' || !isAffiliateSlug(slug)) {
      throw new Error(`Affiliate link ${index} has a bad slug.`);
    }
    if (typeof url !== 'string' || !url.startsWith('https://') || !URL.canParse(url)) {
      throw new Error(`Affiliate link "${slug}" needs a full https:// address.`);
    }
    if (!isStringRecord(params)) {
      throw new Error(`Affiliate link "${slug}" has bad tracking parameters.`);
    }
    return { slug, url, params };
  });
}

/** The partner address for a slug, with tracking parameters added, or null if unknown. */
export function resolveAffiliateUrl(
  targets: readonly AffiliateTarget[],
  slug: string,
): string | null {
  const target = targets.find((entry) => entry.slug === slug);
  if (!target) return null;
  const url = new URL(target.url);
  for (const [name, value] of Object.entries(target.params)) {
    url.searchParams.set(name, value);
  }
  return url.href;
}
