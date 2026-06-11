# Tom's Dive & Swim — tomsscuba.com

Custom multi-page static website for Tom's Dive & Swim (Austin, TX — family-owned since 1982).
Plain HTML + shared CSS design system + vanilla JS. No build step required.

## Structure

```
index.html          Home — "Three Doors" persona router, heritage, depth-map journey
swim.html           Swim school — programs, pricing, FAQ
dive.html           Scuba — certification path, specialties, pro, calendar
travel.html         Group dive trips
club.html           Austin Aquanauts dive club
shop.html           Retail / rentals / repair / fills (links to online store)
about.html          Story, team, values
contact.html        Form, hours, address
events.html         Combined event calendar
gift-cards.html     Gift cards
assets/css/styles.css   Shared design system
assets/js/main.js       Nav, mobile menu, bubbles, forms, FAQ accordion
docs/REBUILD_PLAN.md       SEO / AEO / IA rebuild plan
docs/DS360_INTEGRATION.md  DiveShop360 storefront (shop.tomsscuba.com) setup
```

## Commerce

Transactions happen on the DiveShop360 storefront at `https://shop.tomsscuba.com/`
(see `docs/DS360_INTEGRATION.md`). All commerce CTAs currently point at the
storefront root as placeholders — replace with deep links once products are live:

```
grep -rn "shop.tomsscuba.com" *.html
```

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Any static host (Cloudflare Pages recommended in the rebuild plan). Point the
apex domain + www at the host; `shop` subdomain CNAMEs to DiveShop360.

## Notes

- Sample data: dive calendar, events, and trip availability are illustrative —
  confirm against the POS before launch.
- Pricing on swim/club pages is marked "verified at enrollment/signup."
- Fonts load from Google Fonts (Fraunces + Manrope).
