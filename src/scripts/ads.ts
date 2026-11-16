// Loads Google AdSense for live ad slots. Placeholder slots have no <ins>
// element, so on local, preview and staging builds this file does nothing and
// no request leaves the page.
//
// NOT YET VERIFIED against a real AdSense account. Before switching live ads
// on, follow docs/decisions/0002-ads-off-and-non-personalized.md.

type AdQueue = unknown[] & { requestNonPersonalizedAds?: number };

const slots = [...document.querySelectorAll<HTMLElement>('ins.adsbygoogle[data-ad-client]')];
const client = slots[0]?.dataset['adClient'];

if (client) {
  const host = window as Window & { adsbygoogle?: AdQueue };
  const queue: AdQueue = (host.adsbygoogle ??= []);

  // Non-personalized ads for every visitor, always. This must be set before
  // Google's script loads. It also satisfies Global Privacy Control, because
  // nobody is ever opted in to personalized ads in the first place.
  queue.requestNonPersonalizedAds = 1;

  // Google's consent messages (Privacy & messaging) are delivered by this same
  // script, so the consent tool is always loaded before any ad is requested.
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.append(script);

  // Ask for each ad only when its slot is about to scroll into view.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        queue.push({});
      }
    },
    { rootMargin: '200px' },
  );
  for (const slot of slots) observer.observe(slot);
}
