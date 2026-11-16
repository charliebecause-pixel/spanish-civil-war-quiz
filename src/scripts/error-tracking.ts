import { scrubEvent } from '../lib/scrub';

// The layout prints these on <html>. With no Sentry address, nothing is loaded
// and nothing is sent.
const dsn = document.documentElement.dataset['sentryDsn'];
const environment = document.documentElement.dataset['siteEnv'] ?? 'local';

if (dsn) {
  import('@sentry/browser')
    .then((Sentry) => {
      Sentry.init({
        dsn,
        environment,
        // Collect the minimum: no user details, cookies, request bodies, query
        // strings or variable values. Only the browser type is kept.
        dataCollection: {
          userInfo: false,
          cookies: false,
          httpHeaders: { allow: ['User-Agent'] },
          httpBodies: [],
          urlQueryParams: false,
          stackFrameVariables: false,
        },
        // A second line of defence in case a default ever changes.
        beforeSend: (event) => scrubEvent(event),
        // Breadcrumbs record clicks and page addresses. We do not need them.
        beforeBreadcrumb: () => null,
      });
    })
    .catch(() => {
      // Error tracking is optional. If it cannot load, the page carries on.
    });
}
