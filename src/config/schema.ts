import { z } from 'zod';

export const AD_SIZES = ['300x250', '300x600', '160x600'] as const;
export type AdSize = (typeof AD_SIZES)[number];

export const PARTNER_ROLES = [
  'hosting',
  'error-tracking',
  'uptime',
  'advertising',
  'affiliate',
] as const;
export type PartnerRole = (typeof PARTNER_ROLES)[number];

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'use lowercase letters, digits and dashes');

const httpsUrl = z.string().refine((value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}, 'must be a full https:// address');

const localizedText = z.strictObject({ en: z.string().min(1), es: z.string().min(1) });

const adNetwork = z.strictObject({
  partnerId: slug,
  adsTxtDomain: z.string().min(1),
  publisherId: z.string().regex(/^pub-\d{16}$/, 'looks like pub-0000000000000000'),
  relationship: z.enum(['DIRECT', 'RESELLER']),
  certificationAuthorityId: z.string().min(1).optional(),
});

const adSlot = z.strictObject({
  size: z.enum(AD_SIZES),
  slotId: z.string().regex(/^\d{6,}$/, 'the numeric ad unit ID'),
});

const affiliateLink = z.strictObject({
  slug,
  partnerId: slug,
  url: httpsUrl,
  params: z.record(z.string(), z.string()),
});

const partner = z.strictObject({
  id: slug,
  name: z.string().min(1),
  role: z.enum(PARTNER_ROLES),
  policyUrl: httpsUrl,
  cookies: z.array(z.string().min(1)),
  purpose: localizedText,
});

function duplicates(values: readonly string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export const siteConfigSchema = z
  .strictObject({
    siteUrl: httpsUrl,
    securityContact: z.email(),
    analytics: z.strictObject({ cloudflareWebAnalytics: z.boolean() }),
    ads: z.strictObject({
      enabled: z.boolean(),
      mode: z.enum(['placeholder', 'live']),
      networks: z.array(adNetwork),
      slots: z.record(slug, adSlot),
    }),
    affiliates: z.array(affiliateLink),
    partners: z.array(partner),
  })
  .superRefine((config, ctx) => {
    const partnerIds = config.partners.map((entry) => entry.id);

    for (const id of duplicates(partnerIds)) {
      ctx.addIssue({
        code: 'custom',
        path: ['partners'],
        message: `Partner "${id}" is listed twice.`,
      });
    }
    for (const id of duplicates(config.affiliates.map((entry) => entry.slug))) {
      ctx.addIssue({
        code: 'custom',
        path: ['affiliates'],
        message: `Affiliate slug "${id}" is used twice.`,
      });
    }

    // The privacy policy is generated from `partners`, so every ad network and
    // affiliate programme must have an entry there before it can be used.
    for (const network of config.ads.networks) {
      if (!partnerIds.includes(network.partnerId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['ads', 'networks'],
          message: `Ad network "${network.partnerId}" has no entry in partners, so the privacy policy would not name it.`,
        });
      }
    }
    for (const link of config.affiliates) {
      if (!partnerIds.includes(link.partnerId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['affiliates'],
          message: `Affiliate link "${link.slug}" points at partner "${link.partnerId}", which has no entry in partners.`,
        });
      }
    }

    if (config.ads.enabled && config.ads.mode === 'live' && config.ads.networks.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['ads', 'networks'],
        message: 'Live ads need at least one ad network.',
      });
    }
  });

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Partner = SiteConfig['partners'][number];
export type AffiliateLinkConfig = SiteConfig['affiliates'][number];

/** Validates a raw config object and explains every problem in one error. */
export function parseSiteConfig(raw: unknown, label: string): SiteConfig {
  const result = siteConfigSchema.safeParse(raw);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`${label} is not valid. Fix these and build again:\n${problems}`);
  }
  return result.data;
}

/** Extra rules that only apply to the real site. */
export function assertReadyForProduction(config: SiteConfig): void {
  const host = new URL(config.siteUrl).hostname;
  if (host === 'example' || host.endsWith('.example')) {
    throw new Error(
      `config/site.production.json still has the placeholder address ${config.siteUrl}. ` +
        'Set "siteUrl" to the real domain before building for production.',
    );
  }
}
