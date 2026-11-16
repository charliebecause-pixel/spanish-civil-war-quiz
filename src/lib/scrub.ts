// Removes anything that could identify a person from an error report before it
// leaves the browser. Kept free of Sentry imports so it can be unit tested.

const REDACTED = '[removed]';

const PATTERNS: readonly RegExp[] = [
  /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, // email addresses
  /\bBearer\s+[\w.~+/=-]+/gi, // bearer tokens
  /\b(?:password|passwd|pwd|token|secret|api[_-]?key)=[^\s&]+/gi, // credentials in text
  /\b\d(?:[ -]?\d){12,18}\b/g, // card-length digit runs
];

/** Replaces emails, tokens, passwords and card-like numbers in free text. */
export function redactText(text: string): string {
  return PATTERNS.reduce((result, pattern) => result.replace(pattern, REDACTED), text);
}

/** Drops the query string and fragment, which can carry personal data. */
export function stripUrl(url: string): string {
  const cut = url.search(/[?#]/);
  return cut === -1 ? url : url.slice(0, cut);
}

export interface ScrubbableEvent {
  user?: unknown;
  message?: string | undefined;
  breadcrumbs?: unknown;
  request?:
    | {
        url?: string | undefined;
        cookies?: unknown;
        headers?: Record<string, string> | undefined;
        data?: unknown;
        query_string?: unknown;
      }
    | undefined;
  exception?: { values?: Array<{ value?: string | undefined }> | undefined } | undefined;
}

/** Applied to every error report in `beforeSend`. Mutates and returns the event. */
export function scrubEvent<T extends ScrubbableEvent>(event: T): T {
  delete event.user;
  delete event.breadcrumbs;

  if (event.message !== undefined) event.message = redactText(event.message);

  if (event.request) {
    const { request } = event;
    if (request.url !== undefined) request.url = stripUrl(request.url);
    delete request.cookies;
    delete request.data;
    delete request.query_string;
    // The browser type is useful for fixing bugs. No other header is kept.
    const userAgent = request.headers?.['User-Agent'];
    if (userAgent === undefined) delete request.headers;
    else request.headers = { 'User-Agent': userAgent };
  }

  for (const entry of event.exception?.values ?? []) {
    if (entry.value !== undefined) entry.value = redactText(entry.value);
  }
  return event;
}
