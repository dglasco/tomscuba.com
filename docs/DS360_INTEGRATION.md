# DiveShop360 Storefront Integration — shop.tomsscuba.com

How the custom site (tomsscuba.com) and the DiveShop360 storefront work together.
Per DS360's own documentation, this hybrid setup is the intended architecture:
the main website lives on your domain, the storefront lives on a subdomain, and
the two link to each other.

## Architecture

| Surface | URL | Role |
|---|---|---|
| Main site | `https://tomsscuba.com` | All content, SEO/AEO, brand, schema, redirects |
| Storefront | `https://shop.tomsscuba.com` | Products, class registration, trip booking, cart, inventory (synced with POS) |

## 1. DNS — point the subdomain at DS360

In your domain registrar / DNS manager for `tomsscuba.com`:

1. Add a record of type **CNAME**
2. Host: `shop`
3. Answer/Value: *(the CNAME target provided by DiveShop360 — get this from DS360 support or your storefront control panel)*
4. TTL: 300 (default is fine)
5. Save. Propagation completes within ~24 hours.

Verify with: `dig shop.tomsscuba.com CNAME +short`

## 2. Storefront Control Panel setup

Log in to the DS360 Storefront Control Panel.

### Keep disabled (DS360's default, and our plan)
- **Pages** — content lives on the main site, not the storefront
- **Blogs** — same; avoids duplicate/competing content in search
- Theme extras you don't need (slideshow, page content blocks)

### Theme Editor checklist
- [ ] **Header → Navigation menu**: assign the menu built in step 3
- [ ] **Header → Logo**: upload the Tom's logo (light version, for contrast)
- [ ] **Header → Fav Icon**: same favicon as the main site
- [ ] **Header → Welcome line**: "Austin's water people since 1982"
- [ ] **Header → Contact number**: (512) 451-3425
- [ ] **Footer → Contact information**: 5909 Burnet Rd, Austin, TX 78757 · (512) 451-3425 · sales@tomsscuba.com
- [ ] **Footer → Primary menu**: same menu as header (links back to main site)
- [ ] **Background**: solid color — use `#faf6ef` (paper) or `#04101a` (abyss) to match the brand palette
- [ ] **Home Page sections**: set two to "Featured Groups" and "Featured Products", the other two to "None" (DS360's recommended default)

### Navigation menu (storefront → main site)
Create a menu in the storefront's **Navigation** section with external links
back to the main site, so customers flow between the two seamlessly:

| Menu label | Link |
|---|---|
| Home | `https://tomsscuba.com/` |
| Swim Lessons | `https://tomsscuba.com/swim.html` |
| Scuba Courses | `https://tomsscuba.com/dive.html` |
| Dive Travel | `https://tomsscuba.com/travel.html` |
| Aquanauts Club | `https://tomsscuba.com/club.html` |
| About | `https://tomsscuba.com/about.html` |
| Contact | `https://tomsscuba.com/contact.html` |

(If the site is deployed with clean URLs — e.g. `/swim/` instead of
`/swim.html` — update these links to match.)

### Preferences
- [ ] Set search engine title/description for the storefront
- [ ] Add the **same GA4 property** as the main site so you see one funnel
      (main-site page → storefront product → checkout)

## 3. Main site → storefront links (current state)

All commerce CTAs on the static site currently point at the storefront **root**
as a placeholder:

- `dive.html` — calendar "Reserve" links, Open Water / Refresher / specialty course cards
- `travel.html` — all six trip cards and the "Book a trip" CTA
- `shop.html` — "Shop online" / "Browse online store" CTAs
- `events.html` — class "Reserve" and trip "Book" links
- `gift-cards.html` — "Buy online" CTAs

**Once the storefront is live**, replace each root link with the deep link to
the actual product/class/trip page (e.g.
`https://shop.tomsscuba.com/products/open-water-diver`). Search the repo for
`shop.tomsscuba.com` to find every placeholder:

```
grep -rn "shop.tomsscuba.com" *.html
```

Inquiry-type CTAs intentionally stay on `contact.html` (not the storefront):
pro courses, private class requests, club membership, event RSVPs, swim
enrollment, rentals, and repair scheduling.

## 4. Go-live order

1. DNS CNAME created and propagated
2. Storefront theme + navigation configured (this doc, step 2)
3. Products/classes/trips published in DS360
4. Replace placeholder links with deep links (step 3)
5. Verify GA4 events fire on both domains
6. Spot-check the round trip: main site → storefront → nav back to main site
