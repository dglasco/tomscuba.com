# HOW-TO: Replace the Current DiveShop360 Website with the New Site

**Goal.** Today, `tomsscuba.com` is hosted entirely by DiveShop360 — the
storefront *is* the website (courses, products, cart, and content all live on
DS360 URLs). After this migration, the new custom site in this repository
serves `tomsscuba.com`, and the DS360 storefront moves to
`shop.tomsscuba.com`, handling only commerce. This is DS360's documented
hybrid architecture (see `DS360_INTEGRATION.md`).

**Read this whole document once before starting.** The order matters, and
step 0 prevents an outage.

---

## Step 0 — Coordinate with DiveShop360 support (do this first)

Because DS360 currently serves your apex domain, you cannot simply repoint
DNS — the storefront must be reachable at its new home before the old one
goes away.

Contact DS360 support and tell them:

1. You are moving to their **hybrid setup**: custom main website + storefront
   on a subdomain.
2. The storefront's new domain will be **shop.tomsscuba.com**.
3. Ask them for the **CNAME target** for the subdomain.
4. Ask whether they can serve the storefront on **both** the old and new
   hostnames during a transition window (most platforms can), and confirm
   nothing about your POS, inventory, or customer accounts changes.
5. Ask them to confirm the storefront's SSL certificate will be issued for
   `shop.tomsscuba.com` once the CNAME is live.

Do not proceed past Step 2 until the storefront answers at
`https://shop.tomsscuba.com/` with a valid certificate.

## Step 1 — Stand up hosting for the new site

Recommended: **Cloudflare Pages** (free), because Cloudflare also provides
the DNS + redirect layer needed in Step 4. GitHub Pages works for preview but
cannot serve real 301 redirects, which this migration needs.

1. Create a free Cloudflare account; add the `tomsscuba.com` zone.
2. Cloudflare dashboard → Workers & Pages → Create → Pages →
   **Connect to Git** → select `dglasco/tomscuba.com` → branch `main`,
   no build command, output directory `/`.
3. Confirm the preview deployment renders correctly at the
   `*.pages.dev` URL (every page, both menus, mobile widths).
4. In the Pages project → Custom domains → add `tomsscuba.com` and
   `www.tomsscuba.com`. (Don't flip DNS yet — that's Step 3.)

From now on, every `git push` to `main` auto-deploys.

## Step 2 — Create the storefront subdomain

At your DNS manager (which becomes Cloudflare once the zone is active):

| Type  | Host | Value                          | TTL |
|-------|------|--------------------------------|-----|
| CNAME | shop | *(target from DS360, Step 0)*  | 300 |

If using Cloudflare, set this record to **DNS only** (grey cloud), not
proxied — DS360 manages its own SSL.

Wait for propagation (up to 24 h), then verify:

```
dig shop.tomsscuba.com CNAME +short
curl -sI https://shop.tomsscuba.com/ | head -3
```

## Step 3 — Configure the storefront for hybrid mode

In the DS360 Storefront Control Panel, work through the checklist in
`DS360_INTEGRATION.md` § 2:

- Theme Editor: fish logo, favicon, contact number, footer info,
  background color from the brand palette
- Navigation: menu of external links back to `tomsscuba.com` pages
- Keep Pages and Blogs disabled
- Preferences: confirm GTM/GA tracking matches the main site
  (container `GTM-N28V49VS`)

## Step 4 — Verify storefront deep links

**Status: already wired.** The repo's commerce CTAs use the real paths pulled
from the current DS360 site. After the subdomain is live, click-test each
link below — especially the `/calendar/register/<id>` links, whose IDs can
change if classes are recreated in the POS.

Every commerce CTA in the repo currently points at the storefront root.
The current DS360 site already exposes the real paths — they will carry over
to the subdomain. Map them:

| Page / CTA | Replace `https://shop.tomsscuba.com/` with |
|---|---|
| dive.html — Open Water card | `https://shop.tomsscuba.com/courses/ssi-open-water-diver-course` |
| dive.html — Nitrox | `https://shop.tomsscuba.com/courses/enriched-air-nitrox` |
| dive.html — Stress & Rescue | `https://shop.tomsscuba.com/courses/diver-stress-rescue` |
| dive.html — Perfect Buoyancy | `https://shop.tomsscuba.com/courses/perfect-buoyancy` |
| dive.html — UW Photography | `https://shop.tomsscuba.com/courses/digital-underwater-photography` |
| dive.html — calendar entries | the matching `/calendar/register/...` URL per class |
| travel.html — trip cards | the matching `/trips/...` URL per trip |
| shop.html / gift-cards.html | `/product-groups` and `/product-groups/gift-cards` |

Find every placeholder with:

```
grep -rn "shop.tomsscuba.com" *.html
```

Commit and push; Pages redeploys automatically.

## Step 5 — Cut over the apex domain

The moment of truth. In Cloudflare DNS:

1. Remove/replace the existing apex records that point at DS360.
2. Apex `tomsscuba.com` and `www` → Cloudflare Pages (the dashboard
   configures these automatically when you added the custom domains).
3. Verify `https://tomsscuba.com/` now serves the new site and
   `https://shop.tomsscuba.com/` still serves the storefront.

Old DS360 URLs on the apex stop resolving at this moment — which is why
Step 6 must follow immediately.

## Step 6 — 301 redirects (protects 40 years of SEO equity)

In Cloudflare → Rules → Redirect Rules (or Bulk Redirects), create:

| Old URL (apex) | Redirect to | Type |
|---|---|---|
| `/courses/*` | `https://shop.tomsscuba.com/courses/${1}` | 301 |
| `/product-groups/*` | `https://shop.tomsscuba.com/product-groups/${1}` | 301 |
| `/trips/*` | `https://shop.tomsscuba.com/trips/${1}` | 301 |
| `/calendar/*` | `https://shop.tomsscuba.com/calendar/${1}` | 301 |
| `/cart`, `/signin`, `/createAccount` | same path on shop subdomain | 301 |
| `/contact-us` | `/contact.html` | 301 |
| `/repair-services` | `/shop.html` | 301 |
| `/blog/*` | `/` (until blog content is migrated) | 302 |
| `/book-swim-lessons` | `/swim.html` | 301 |

Also (separate zone): point **austinswim.com** at Cloudflare and bulk-301
all of it to `tomsscuba.com/swim.html` per the rebuild plan — one domain,
consolidated authority.

## Step 7 — Verify

- [ ] Every nav link and footer link on the live site works
- [ ] One full round trip: home → dive.html → course CTA → storefront →
      storefront nav back to main site
- [ ] A test checkout on the storefront (then refund it)
- [ ] Contact form behavior (see WHATS_MISSING.md — the form needs a backend
      before launch)
- [ ] GTM firing on both domains (Tag Assistant or GA4 Realtime)
- [ ] `https://tomsscuba.com/sitemap.xml`, `robots.txt`, `llms.txt` resolve
- [ ] Google Search Console: add/verify property, submit sitemap.xml
- [ ] Update the website URL on Google Business Profile, Facebook,
      Instagram, Yelp if any of them deep-link old pages

## Step 8 — Rollback plan

DNS is the only switch. If anything is wrong post-cutover, restore the
previous apex DNS records pointing at DS360 and the old site is back within
minutes (TTL 300). Nothing in DS360 is deleted by this migration; the
storefront keeps operating throughout.

---

**Sequence summary:** DS360 support → hosting live on pages.dev →
shop CNAME live → storefront themed → deep links swapped → apex DNS flip →
redirects → verify. Total elapsed time is dominated by DS360 support
response and DNS propagation; hands-on work is a few hours.
