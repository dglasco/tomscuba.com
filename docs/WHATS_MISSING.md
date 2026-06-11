# WHAT'S MISSING — Pre-Launch Gap List

Honest inventory of everything in this repository that is placeholder,
sample, stale, or absent. Nothing here blocks previewing; several items
**do** block production cutover.

## 🔴 Blocking — must fix before DNS cutover

1. **Contact form has no backend.** The form on `contact.html` (and the
   `data-form` handler in `main.js`) only simulates a send — submissions go
   nowhere. Fix: wire to Formspree/Basin/Web3Forms, or replace with the
   JotForm embeds the business already uses. Until then the form silently
   loses customer inquiries, which is worse than no form.

2. **Stale trip data.** `travel.html` and `events.html` show sample trips
   with 2025 dates that are now in the past (Cozumel Sep 2025, Bonaire Oct
   2025, Roatán Nov 2025). The live DS360 site currently lists *Bonaire
   July 11–18, 2026*. Replace all six trip cards with the real 2026–27 trip
   calendar from the POS, with real prices and real availability states.

3. **Sample class calendar.** The dive calendar on `dive.html` and the
   events on `events.html`/`club.html` are illustrative (June–Sep dates,
   invented instructor names "Andrew P." / "Sarah L."). Replace with real
   sessions and real names — or remove names — before launch.

4. **Placeholder prices.** Swim pricing ($22/$55/$35), club tiers
   ($100/$160 — verify still current), and the fill-price table on
   `shop.html` (literally "$ / $$ / $$$") need real numbers.

5. **Legal/policy pages.** The current DS360 site has Privacy Policy,
   Customer Service, and Returns & Exchanges pages. The new site has none.
   At minimum, a privacy policy is needed (the site sets GTM/analytics
   cookies). Port the existing pages or link to the storefront's versions.

6. **Storefront deep links.** ✅ DONE — commerce CTAs now use real deep
   links pulled from the live site (`/courses/...`, `/product-groups/...`,
   `/trips`, `/calendar/register/<id>`). After the subdomain goes live,
   click-test each one; class-registration IDs can change if classes are
   recreated in the POS.

## 🟡 High value — fix in the first weeks

7. **Real photos.** The site uses zero photographs. Google local results
   and conversion both favor real imagery: pool mid-lesson, storefront,
   gear wall, trip shots. Needed: 5–15 photos + alt text; also replace the
   generated og-image with a real photo version.

8. **Swim booking flow decision.** The business currently books swim
   lessons via austinswim.com (iClassPro). The new swim page routes to the
   contact form. Decide: (a) link CTAs to the iClassPro portal/app, or
   (b) consolidate austinswim.com into /swim per the rebuild plan with
   301s. Don't leave a worse funnel than the current one.

9. **Blog migration.** The current site has a blog ("The Surface
   Interval"). Its posts are existing indexed content with backlink equity.
   Migrate the best posts into the new site (or a /blog/ section) before
   killing the old URLs; until then the cutover plan 302s `/blog/*` to home,
   which leaks value.

10. **Local-diving guides.** `/local-diving/` (Lake Travis, Blue Lagoon,
    Spring Lake, Windy Point) is the plan's main AEO content play — not yet
    written. Needs owner braindump: sites used, seasons, vis/temps, fees,
    parking, first-timer mistakes.

11. **Newsletter signup.** The current site promotes "Tom's Dive Team"
    newsletter signup; the new site mentions it but has no signup mechanism.
    Add the email-capture form (whatever provider the shop uses today).

12. **Aquanauts site relationship.** The club has its own domain,
    austinaquanauts.org, which the current site links to. Decide whether
    club.html is the canonical home (and austinaquanauts.org redirects or
    links here) or vice versa — duplicate club content on two domains splits
    authority.

## 🟢 Nice to have — post-launch

13. **Event schema.** Deliberately omitted while events are sample data.
    Once real events/trips are in, add `Event` JSON-LD for rich results.
14. **Image sitemap + real og:image per page** (course photos on dive,
    trip photos on travel).
15. **Accessibility pass.** Add `aria-expanded` to the FAQ accordion,
    a skip-to-content link, visible focus styles, and contrast-check the
    sun-on-tide text combinations.
16. **Web app manifest** (`site.webmanifest`) — icons 192/512 already exist
    in `assets/img/`.
17. **Testimonial verification.** The quotes on index/swim/travel are
    illustrative composites. Replace with real, attributable reviews
    (Yelp/Google, with permission) — also unlocks honest review snippets.
18. **Stats verification.** "96% recommend," "4.7★ 81 reviews," "70+
    instructors," "4,500 sq ft," "hundreds certified yearly" — confirm each
    against current reality; update heritage-strip and stats sections.
19. **Performance niceties.** Self-host the two fonts (removes Google
    Fonts round-trip), add `loading="lazy"` once images exist, minify CSS.
20. **Search Console + Bing Webmaster** setup and sitemap submission at
    cutover (also listed in the runbook checklist).

## Data sources for the fixes

Most missing data already exists in three places: the DS360 POS (trips,
classes, prices, calendar), austinswim.com/iClassPro (swim programs and
booking), and the owner's head (local-diving knowledge, team, real stats).
