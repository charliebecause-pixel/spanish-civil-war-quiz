# 0002: Ads are off at launch, and non-personalized if ever turned on

Date: 2026-11-16. Approved by Solrac.

## Context

The brief lists AdSense setup as "not in the first release", but also says ads pay for the site and that under-16s will visit. Personalized ads shown to children need separate parental consent under the amended COPPA Rule, and the site has no way to know a visitor's age.

## Decision

1. The first release has no ads and no paid links. `config/site.production.json` has `ads.enabled: false`, and a unit test fails if that changes.
2. The plumbing exists now and is switched off: the `AdSlot` component, `/ads.txt`, the `AffiliateLink` component, the `/go/<slug>` redirect, and the generated partner list in the privacy policy.
3. If ads are ever turned on, they are non-personalized for every visitor, always. `src/scripts/ads.ts` sets this before Google's script loads.
4. Google's own consent messages (Privacy & messaging) are the consent tool. They are delivered by the AdSense script itself, so there is nothing to install until an AdSense account exists.

## Reason

Non-personalized ads for everyone removes the need to guess ages or to build an opt-out for targeted advertising, at the cost of somewhat lower ad income on a site that expects very little.

## What is not verified yet

The live ad path cannot be tested without an AdSense account, so this code has never shown a real ad:

- `src/scripts/ads.ts` (loading the AdSense script, lazy-loading slots)
- the AdSense host list in `src/lib/security-headers.ts`

Outside production, ad slots render a dashed placeholder box of the right size and make no network requests. That path is fully tested.

## Before real ads are switched on

Do these on staging first. All of it needs the owner's approval.

1. Get the AdSense account approved for the real domain.
2. In AdSense, under Privacy & messaging, publish the European consent message and the US states message.
3. In AdSense, decide the child-directed setting for the site and record the choice here.
4. Add Google AdSense to `partners` in the config, with the cookies it sets, so the privacy policy names it.
5. Add the network to `ads.networks` using the exact line AdSense gives for ads.txt, and set `ads.mode` to `live`.
6. Load a page with an ad and open the browser console. Fix any Content-Security-Policy errors by adjusting the host list, and note here what changed.
7. With a European VPN in a fresh browser, decline consent and confirm no advertising cookies are set.
8. Confirm the layout does not shift when the ad loads (PageSpeed Insights, layout shift at or under 0.1).
9. Update the unit test that pins `ads.enabled` to `false`.
