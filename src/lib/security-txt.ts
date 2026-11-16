export interface SecurityTxtOptions {
  contactEmail: string;
  siteUrl: string;
  languages: readonly string[];
  /** Build time. The file is valid for just under a year from this moment. */
  now: Date;
}

const VALID_FOR_DAYS = 364;

/** Builds /.well-known/security.txt (RFC 9116). */
export function buildSecurityTxt(options: SecurityTxtOptions): string {
  const expires = new Date(options.now.getTime() + VALID_FOR_DAYS * 24 * 60 * 60 * 1000);
  return [
    `Contact: mailto:${options.contactEmail}`,
    `Expires: ${expires.toISOString()}`,
    `Preferred-Languages: ${options.languages.join(', ')}`,
    `Canonical: ${new URL('/.well-known/security.txt', options.siteUrl).href}`,
    '',
  ].join('\n');
}
