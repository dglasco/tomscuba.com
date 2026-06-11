# tomsscuba.com — Restructure & Rebuild Plan
**Usability · SEO · AEO (Answer Engine Optimization)**
Version 1.0 · June 2026 · Tom's Dive & Swim, Austin TX

---

## 1. Executive Summary

The current tomsscuba.com works as a catalog but fails as a funnel. It presents fourteen-plus navigation items to three very different customers (parents seeking swim lessons, adults curious about scuba, certified divers wanting gear/trips/community) and lets none of them self-select quickly. It also splits authority across two domains (tomsscuba.com and austinswim.com), which dilutes local search equity for the highest-value query family in the business: "swim lessons Austin."

The rebuild has three objectives, in priority order:

1. **Conversion usability.** Every visitor should reach a relevant booking or contact action within two clicks and under 30 seconds.
2. **Local SEO dominance.** Own the Austin map pack and organic results for both "scuba" and "swim lessons" query families.
3. **AEO readiness.** Be the source that ChatGPT, Claude, Perplexity, and Google AI Overviews cite when someone asks "where should I get scuba certified in Austin?" — this is where discovery is moving, and almost no dive shop is optimizing for it yet.

---

## 2. Current-State Diagnosis

**Usability problems**
- Flat 14-item navigation (Dive Calendar, Beginner Classes, Refresher, Nitrox, Stress & Rescue, Perfect Buoyancy, Photography, Wreck, Equipment Techniques, Search & Recovery, First Aid, Oxygen, Virtual, Pro Ed, Private Request...) exposes internal taxonomy instead of customer intent. Visitors must already know SSI course names to navigate.
- No persona routing on the homepage. The parent, the curious adult, and the certified diver all see the same wall.
- Booking actions are inconsistent: some courses link to a cart, swim lessons live on a separate domain/app, travel requires phone contact. Each handoff loses people.
- Mobile experience: legacy template, slow paint, small tap targets, "Continue as a guest" modal friction.

**SEO problems**
- Split domains: austinswim.com carries the swim content, fragmenting backlinks, reviews, and topical authority that should compound on one domain.
- Thin pages: course pages are 1–2 paragraphs with truncated descriptions — insufficient to rank against PADI/SSI corporate pages and aggregators.
- No structured data observed (LocalBusiness, Course, Event, FAQ, Product).
- URL structure is flat and inconsistent (`/courses/learn-to-scuba`, `/contact-us`, `/home` as a separate page from `/` — a classic duplicate-content issue).
- No content engine: the blog exists but is not built around query targets like "scuba diving Lake Travis" or "when can my baby start swim lessons."

**AEO problems**
- Answer engines synthesize from structured, quotable, entity-rich pages. The current site offers little machine-readable fact density: no schema, no FAQ blocks, no consistent NAP (name/address/phone) markup, no concise answer-shaped content.

---

## 3. Information Architecture Restructure

### 3.1 Principle
Navigate by **customer intent**, not by course catalog. The catalog lives one level down, organized as a progression.

### 3.2 New site map

```
/                          Home — persona router ("Three Doors")
/swim/                     Swim school hub (parents)
  /swim/parent-and-child/    Ages 6mo–2yr
  /swim/preschool/           Ages 2–4
  /swim/learn-to-swim/       Ages 4–12 (beginner→stroke dev)
  /swim/private-lessons/     All ages, incl. adults
  /swim/summer-camps/        Seasonal, high-intent
/dive/                     Dive hub (the diver's path)
  /dive/open-water/          THE money page — beginner certification
  /dive/refresher/
  /dive/specialties/         Index of all specialty courses
    /dive/specialties/nitrox/
    /dive/specialties/perfect-buoyancy/
    /dive/specialties/stress-and-rescue/
    /dive/specialties/underwater-photography/
    /dive/specialties/wreck-diving/
    /dive/specialties/equipment-techniques/
    /dive/specialties/search-and-recovery/
    /dive/specialties/first-aid-cpr-aed/
    /dive/specialties/oxygen-provider/
  /dive/professional/        Divemaster → Instructor
  /dive/private-classes/
  /dive/calendar/            Live class schedule
/travel/                   Trip hub
  /travel/cozumel/  /travel/bonaire/  /travel/roatan/ ... (one page per active trip)
/club/                     Austin Aquanauts
/shop/                     Retail, rentals, repair, air & nitrox fills
  /shop/service-and-repair/
  /shop/air-fills/
/local-diving/             Austin-area dive site guides (SEO/AEO content engine)
  /local-diving/lake-travis/
  /local-diving/blue-lagoon/
  /local-diving/spring-lake/
/about/                    Story, team, facility
/contact/                  Contact + hours + map
/gift-cards/
/blog/                     Editorial engine
```

Rules: every URL lowercase, hyphenated, trailing slash, max 3 levels deep. One page per primary keyword intent. Kill `/home` — the root is the homepage, full stop.

### 3.3 Domain consolidation
Migrate austinswim.com content into tomsscuba.com/swim/ with page-level 301s. Keep austinswim.com registered and 301 the whole domain. One domain accumulating all reviews, links, and citations beats two diluted ones. (If the swim brand has independent marketing value, a longer-term option is rebranding the domain itself, e.g. tomsdiveandswim.com with both legacy domains 301'd in — decide before launch, never after.)

### 3.4 Redirect map (critical — do this or lose existing rankings)
Build a complete 301 map before cutover. Highlights:

| Old | New |
|---|---|
| /home | / |
| /courses/learn-to-scuba | /dive/open-water/ |
| /courses (index) | /dive/ |
| /contact-us | /contact/ |
| each specialty course URL | matching /dive/specialties/* |
| austinswim.com/* | tomsscuba.com/swim/* equivalents |

Validate with a full crawl (Screaming Frog) of the old site; zero 404s on launch day for any URL with impressions in Search Console.

---

## 4. Usability & Conversion Plan

### 4.1 The two-click rule
From any landing point, the visitor's next conversion step is visible without scrolling on mobile:
- Parent → "Book swim lessons" (sticky CTA on all /swim/ pages)
- Curious adult → "Start Open Water" (sticky CTA on /dive/ pages)
- Certified diver → "Calendar / Trips / Club" (secondary nav prominence)

### 4.2 Persona routing on home
Keep the "Three Doors" pattern from the rebuild: families / first-time divers / certified divers, each card colored and routed distinctly. This is the single highest-leverage usability change.

### 4.3 Booking flow consolidation
- One booking experience per line of business, linked consistently: swim app deep links for lessons, course-reservation form (or cart) for dive classes, deposit flow for travel.
- Every "Reserve" or "Enroll" button states what happens next ("we confirm within 24 hours") — uncertainty is the silent killer of small-business form fills.
- Phone number tap-to-call in the header on mobile; the demographic booking kids' lessons converts heavily by phone.

### 4.4 Trust at the point of decision
Each money page (open-water, swim programs, trips) carries: review snippet with star rating, "since 1982" heritage marker, instructor count, and one concrete differentiator (91° pool, 4-student class cap, presale trips). Trust elements adjacent to CTAs, not in a separate testimonials page.

### 4.5 Performance & accessibility budget
- Static HTML/CSS/JS (current rebuild approach is right). Targets: LCP < 1.8s on 4G, CLS < 0.05, total page weight < 600KB excluding hero imagery, images in AVIF/WebP with explicit dimensions, fonts subset and preloaded.
- WCAG 2.1 AA: color contrast on the coral/sun accents over dark backgrounds needs verification; focus states on all interactive elements; FAQ accordions keyboard-operable; alt text on every image (also an AEO input).

---

## 5. SEO Plan

### 5.1 Keyword-to-page mapping (primary targets)

| Page | Primary query | Secondary |
|---|---|---|
| /dive/open-water/ | scuba certification austin | scuba lessons austin, learn to scuba dive austin, padi vs ssi austin |
| /swim/ | swim lessons austin | swim school austin, infant swim lessons austin |
| /swim/summer-camps/ | swim camp austin | spring break swim camp austin |
| /dive/refresher/ | scuba refresher austin | refresher course before trip |
| /local-diving/lake-travis/ | scuba diving lake travis | lake travis dive sites, windy point diving |
| /travel/cozumel/ | cozumel dive trip from austin | group dive trips texas |
| /shop/air-fills/ | scuba tank fill austin | nitrox fills austin |
| /club/ | dive club austin | scuba club austin |

Each money page gets 600–1,200 words of genuinely useful content (what's included, schedule, prerequisites, pricing context, FAQ), not keyword stuffing. The current 2-paragraph pages cannot beat aggregators; substantive pages can, especially with the local signals below.

### 5.2 On-page standards (apply to every page)
- One H1 matching primary intent; descriptive title tag ≤ 60 chars with "Austin" where natural; meta description ≤ 155 chars written as an answer with a hook.
- Internal linking discipline: hub pages link down to all children; every child links back to hub and laterally to the next step in the customer journey (open-water → refresher → specialties → travel). This journey-shaped internal linking mirrors how answer engines trace entity relationships.
- Image alt text describing real content ("instructor teaching child backstroke in Tom's 91-degree indoor pool").

### 5.3 Technical SEO
- XML sitemap, robots.txt, canonical tags on every page (kills the /home duplicate problem permanently).
- Single H1 per page, semantic HTML5 landmarks (already in the rebuild).
- HTTPS, HSTS, no mixed content.
- Search Console + Bing Webmaster Tools verified pre-launch; submit sitemap day one; monitor the redirect map's crawl behavior for the first 30 days.

### 5.4 Local SEO (the highest-ROI workstream)
- **Google Business Profile**: two categories matter — "Scuba instructor / SCUBA diving center" AND "Swimming school." Verify both are set, hours exact, photos refreshed quarterly, Q&A seeded with the real questions (parents-in-water, pool temperature, cert timeline).
- **NAP consistency**: exactly one canonical rendering — `Tom's Dive & Swim, 5909 Burnet Rd, Austin, TX 78757, (512) 451-3425` — across site footer, GBP, Yelp, Facebook, SSI dealer locator, and every citation directory. Audit and fix variants.
- **Review velocity**: post-class email/SMS ask with direct GBP review link. Target 4–6 new Google reviews/month. Respond to every review; responses are crawled and quoted by answer engines.
- **SSI dealer locator + local directories**: ensure the SSI training-center listing points to the new URLs; Austin-specific citations (Kids Out and About, Austin Moms, Do512 Family) already link — keep them alive through the redirect map and pitch refreshed listings.

---

## 6. AEO Plan (Answer Engine Optimization)

Answer engines (Google AI Overviews, ChatGPT, Perplexity, Claude) reward pages that are *structured, factual, attributable, and answer-shaped*. The goal: when someone asks an AI "best place to get scuba certified in Austin" or "when can my baby start swim lessons," Tom's is in the synthesized answer with a citation.

### 6.1 Structured data (JSON-LD on every relevant page)
- **LocalBusiness** (subtype `SportsActivityLocation`) sitewide: name, address, geo, phone, hours, priceRange, foundingDate 1982, sameAs links to GBP/Yelp/Facebook/SSI listing, aggregateRating fed from real review counts.
- **Course** schema on every course page: name, description, provider, courseMode, prerequisites, offers (price), hasCourseInstance with upcoming dates. Course schema is rare among dive shops — first-mover advantage in rich results.
- **Event** schema on calendar entries and Aquanauts events (start date, location, availability).
- **FAQPage** schema wrapping each page's FAQ accordion — the single highest-yield AEO element, because FAQ content is exactly the shape answer engines extract.
- **Product** schema later if/when retail e-commerce relaunches.
- **BreadcrumbList** sitewide.

### 6.2 Answer-shaped content patterns
- Open every money page with a 40–60 word direct answer paragraph (the "snippet block"): *"Tom's Dive & Swim offers SSI Open Water certification in Austin in about four weeks: online learning, four sessions in our 91° indoor pool at 5909 Burnet Rd, and four open-water dives at local lakes or on a trip. Minimum age 10."* Engines lift these nearly verbatim.
- FAQ sections answer the *actual* questions people ask AI assistants: "How long does scuba certification take?", "Is SSI as good as PADI?", "What age can kids start swim lessons?", "How much does scuba certification cost in Austin?" Include the honest numeric/factual answers — vagueness gets skipped, specificity gets cited.
- Stable facts in consistent phrasing across pages (founded 1982, 91° pool, 5909 Burnet Rd, 70+ instructors, SSI training center). Repetition of consistent entity facts increases extraction confidence.

### 6.3 The `/local-diving/` content moat
Authoritative guides to Lake Travis (Windy Point), Blue Lagoon, Spring Lake, and Texas dive conditions are content almost nobody has written well, they answer real questions ("can you scuba dive in Lake Travis?", "lake travis visibility"), and they establish Tom's as *the* Austin diving entity that engines associate with the topic. Each guide: conditions, access, depth, what you'll see, when to go, and a natural tie-in to courses/club dives.

### 6.4 Machine-access hygiene
- Allow AI crawlers in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — for a local business, AI citation is free distribution, not content theft.
- Add an `llms.txt` at the root: a concise plain-text summary of the business, offerings, address, and key facts. Emerging convention, trivial to add, zero downside.
- Server-rendered static HTML (no client-side rendering dependency) — already true in the rebuild; this matters because several AI crawlers don't execute JavaScript.

### 6.5 Off-site AEO
Answer engines weight third-party corroboration: Yelp, GBP reviews, Reddit (r/Austin, r/scuba threads mentioning Tom's), local press. Tactics: respond on Reddit threads where organically relevant (as the owner, transparently), pitch one local story per year (40+ year anniversary angle is sitting right there), and keep reviews flowing — review text is heavily quoted in AI answers.

---

## 7. Content Engine (ongoing)

Two posts/month, alternating audiences, each targeting one question-shaped query:
- Parent track: "When can my baby start swim lessons?", "How many lessons until my child can swim?", "Pool vs lake safety for Texas kids"
- Diver track: "Scuba diving Lake Travis: complete guide", "SSI vs PADI: what Austin divers should know", "What to expect on your first open water dive", trip recaps with photos (link magnet + community proof)

Every post ends with one contextual CTA into the relevant journey. No generic "contact us" footers.

---

## 8. Technical Implementation & Migration

**Stack**: keep the static HTML + shared CSS design system + vanilla JS from the current rebuild. Add a lightweight static-site generator (Eleventy is the natural fit) once page count exceeds ~15, so headers/footers/schema render from one template instead of being duplicated per file — this is the maintainability inflection point and you're at it now.

**Hosting**: GitHub Pages, Netlify, or Cloudflare Pages from the repo. Cloudflare Pages recommended: free, fast TTFB, easy 301 rules via `_redirects` file, analytics included.

**Phased rollout**

| Phase | Scope | Timeline |
|---|---|---|
| 1 | New IA, all money pages, redirect map, schema, GBP cleanup, Search Console | Weeks 1–3 |
| 2 | austinswim.com migration + 301s, FAQ schema everywhere, llms.txt | Weeks 4–5 |
| 3 | /local-diving/ guides (3 pages), review-velocity system live | Weeks 6–8 |
| 4 | Content engine cadence, booking-flow integration polish | Ongoing |

**Pre-launch checklist**: full crawl of old site → redirect map complete → schema validates (Rich Results Test) → Core Web Vitals pass on mobile → analytics (GA4 + Search Console + call tracking number on site) → backup of old site.

---

## 9. Measurement

| KPI | Baseline | 6-month target |
|---|---|---|
| GBP actions (calls, directions, clicks) | establish | +40% |
| Organic sessions (combined domains) | establish | +50% |
| "scuba certification austin" rank | track | top 3 |
| "swim lessons austin" rank | track | page 1 |
| Booking/contact conversions | establish | +30% |
| Google reviews | current count | +30 new |
| AI-answer presence (manual monthly checks of 10 target questions across ChatGPT/Perplexity/AI Overviews) | likely absent | cited in ≥5 of 10 |

That last row is the AEO scoreboard — ask the ten questions monthly, record whether Tom's appears and what gets quoted, and feed misquotes/gaps back into page content.

---

## 10. Risks & Mitigations

- **Ranking dip at migration**: unavoidable for 2–6 weeks; mitigated by complete 301 map, unchanged content on money pages at cutover, and Search Console monitoring. Do not change URLs and content simultaneously on top performers — migrate first, rewrite second.
- **Two-domain consolidation backlash**: austinswim.com may carry parent-facing bookmarks and app links; keep redirects permanent and update the swim app's web links on day one.
- **Pricing on-site**: publishing prices aids SEO/AEO and conversion but requires keeping them current; stale prices destroy trust. Decision: publish with "verified at enrollment" language and a quarterly review reminder — already the pattern in the rebuild.

---

*Plan prepared for the Tom's Dive & Swim site rebuild. Companion to the multi-page static site in this repository.*
