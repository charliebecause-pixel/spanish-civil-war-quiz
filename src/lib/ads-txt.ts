import type { SiteConfig } from '../config/schema';

// The IAB ads.txt specification's way of saying "nobody is authorised to sell
// ad space on this site".
const NO_SELLERS = 'placeholder.example.com, placeholder, DIRECT, placeholder';

/** Builds /ads.txt: one line per ad network allowed to sell this site's ad space. */
export function buildAdsTxt(ads: SiteConfig['ads']): string {
  const lines = ads.enabled
    ? ads.networks.map((network) =>
        [
          network.adsTxtDomain,
          network.publisherId,
          network.relationship,
          network.certificationAuthorityId,
        ]
          .filter((field) => field !== undefined)
          .join(', '),
      )
    : [];

  return [
    '# Generated from the site config. Do not edit by hand.',
    ...(lines.length > 0 ? lines : [NO_SELLERS]),
    '',
  ].join('\n');
}
