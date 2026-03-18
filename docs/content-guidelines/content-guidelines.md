# Content Creation Guidelines for AI Agents

**Version:** 2.0
**Last Updated:** 2026-03-11
**Applies To:** All AI-generated content, human-edited content, and automated content workflows

---

## Purpose

This document provides comprehensive guidelines for AI agents creating content for the travel blog platform. It ensures all content meets SEO standards, quality benchmarks, compliance requirements, and user experience standards.

---

## Content Standards Overview

### Universal Requirements

**ALL content MUST:**
- ✅ Meet word count targets (TBD per content type)
- ✅ Include properly formatted frontmatter with all required fields
- ✅ Use semantic HTML structure (H1 → H2 → H3 hierarchy)
- ✅ Include descriptive alt text for all images
- ✅ Follow link attribution rules (see Link Attribution section)
- ✅ Include proper affiliate disclosures when applicable
- ✅ Provide genuine value and accurate information
- ✅ Be grammatically correct and well-written
- ✅ Include internal links to related content when applicable
- ✅ Optimize for target keyword without keyword stuffing
- ✅ Use standardized components for affiliate links

---

## Content Types & Specifications

### 1. Standard Article (Long-Form Guide)

**Purpose:** Comprehensive destination guides, travel tips, in-depth tutorials

**Frontmatter Schema:**
```yaml
---
title: "Ultimate Bali Travel Guide: Everything You Need to Know in 2026"
description: "Complete guide to visiting Bali including best areas to stay, things to do, budget tips, and insider recommendations from a local expert."
slug: "bali-travel-guide-2026"

# Metadata
date: 2026-03-07
updated: 2026-03-07  # Optional, use when updating existing content
author: "NomadBitcoin"

# SEO
focus_keyword: "bali travel guide"
related_keywords: ["bali travel tips", "things to do in bali", "bali itinerary", "bali budget"]
tags: ["bali", "indonesia", "destination-guide", "southeast-asia"]
category: "guide"
content_type: "article"

# Media
featured_image:
  src: "/images/bali/bali-rice-terraces-hero.jpg"
  alt: "Lush green rice terraces in Ubud, Bali with palm trees and traditional Balinese temple in background"
  width: 1200
  height: 630

# Affiliate
affiliate_disclosure: true

# Quality Control
word_count_target: TBD
draft: false
---
```

**Content Structure:**

```markdown
# Ultimate Bali Travel Guide: Everything You Need to Know in 2026

[Opening paragraph - 150-200 words introducing Bali, why readers should visit, and what they'll learn from this guide]

## Quick Facts About Bali

- **Location:** Indonesia, Southeast Asia
- **Language:** Bahasa Indonesian, Balinese
- **Currency:** Indonesian Rupiah (IDR)
- **Best Time to Visit:** April-October (dry season)
- **Visa:** Visa on arrival for most nationalities

## Best Areas to Stay in Bali

### 1. Ubud - Cultural Heart [H3]

[200-300 words about Ubud, what makes it special, who it's best for]

**Best For:** Culture enthusiasts, yoga retreats, digital nomads
**Pros:** Rice terraces, temples, art galleries, affordable
**Cons:** No beach, can be crowded

**Where to Stay:**
<HotelCard ... />

[Continue with 4-6 more areas]

## Top Things to Do in Bali

### Water Activities [H3]

[150-200 words intro to water activities]

1. **Surfing in Canggu** - [100 words]
2. **Diving in Amed** - [100 words]
3. **Snorkeling at Nusa Penida** - [100 words]

[Include affiliate links to tour operators where appropriate]

## Practical Information

### Getting Around Bali [H3]

[200 words on transportation options]

### Budget Guide [H3]

[300 words on daily costs, money-saving tips]

## Sample Itineraries

### 7-Day Bali Itinerary [H3]

**Day 1:** Seminyak - [50 words]
**Day 2:** Uluwatu - [50 words]
[etc.]

## FAQs

<FAQ items={[
  {
    question: "Is Bali safe for solo travelers?",
    answer: "Yes, Bali is generally very safe..."
  }
]} />

## Conclusion

[150 words summarizing key points, call-to-action]
```

**SEO Requirements:**
- Title: 50-60 characters
- Meta description: 150-160 characters
- Focus keyword in: Title, first paragraph, 2-3 H2 headings, conclusion
- Related keywords naturally distributed
- 3-5 internal links to related content
- 2-4 external links to authoritative sources
- Images every 300-500 words

**Quality Checklist:**
- [ ] Provides unique insights (not just rehashed content)
- [ ] Includes personal experiences or expert quotes
- [ ] Answers user search intent completely
- [ ] Includes actionable advice
- [ ] Uses conversational, engaging tone
- [ ] Free of grammatical errors
- [ ] Mobile-friendly formatting (short paragraphs, bullet points)

---

### 2. FAQ Page/Section

**Purpose:** Answer common questions, rank for "how to" and question-based queries

**Frontmatter Schema:**
```yaml
---
title: "Bali Travel FAQs: 25 Most Common Questions Answered"
description: "Get answers to the most frequently asked questions about traveling to Bali, from visa requirements to safety tips and budgeting advice."
slug: "bali-travel-faqs"

date: 2026-03-07
author: "NomadBitcoin"

focus_keyword: "bali travel questions"
tags: ["bali", "faq", "travel-tips"]
category: "tips"
content_type: "faq"  # IMPORTANT for schema.org FAQPage

featured_image:
  src: "/images/bali/bali-faq-header.jpg"
  alt: "Tourist looking at map in Bali with traditional Balinese architecture in background"
  width: 1200
  height: 630

affiliate_disclosure: false
word_count_target: TBD
draft: false
---
```

**Content Structure:**

```markdown
# Bali Travel FAQs: 25 Most Common Questions Answered

[100-word intro explaining what questions are covered]

## Visa & Entry Requirements

<FAQ items={[
  {
    question: "Do I need a visa to visit Bali?",
    answer: "Most nationalities can get a visa on arrival (VOA) valid for 30 days, extendable once for another 30 days. The cost is 500,000 IDR (~$35 USD). Citizens from ASEAN countries, Australia, and several others get visa-free entry. Always check current requirements before traveling."
  },
  {
    question: "How long can I stay in Bali?",
    answer: "Visa on arrival allows 30 days with one extension. Visa-free entry is 30 days non-extendable. For longer stays, apply for a social or business visa before arrival."
  }
]} />

## Money & Budgeting

<FAQ items={[
  {
    question: "How much money do I need per day in Bali?",
    answer: "Budget travelers: $25-40/day. Mid-range: $50-100/day. Luxury: $150+/day. This includes accommodation, food, transport, and activities. Bali is very affordable compared to Western countries."
  }
]} />

## Safety & Health

[Continue with 15-20 more questions organized by topic]

## Related Resources

- [Link to main Bali guide]
- [Link to budget breakdown]
- [Link to itinerary suggestions]
```

**FAQ Component Requirements:**

Each FAQ item MUST:
- Have clear, concise question (5-15 words)
- Provide complete answer (50-150 words)
- Include facts, not opinions
- Link to detailed content when applicable
- Be genuinely helpful (not keyword stuffing)

**Schema.org Implementation:**
The platform automatically generates FAQPage structured data from FAQ components, making questions eligible for Google's featured snippets.

---

### 3. How-To Guide

**Purpose:** Step-by-step instructional content, ranks for "how to" queries

**Frontmatter Schema:**
```yaml
---
title: "How to Get From Bali Airport to Ubud: 5 Easy Options"
description: "Step-by-step guide to getting from Ngurah Rai Airport to Ubud including costs, travel times, and booking tips for each transport option."
slug: "bali-airport-to-ubud-transport"

date: 2026-03-07
author: "NomadBitcoin"

focus_keyword: "bali airport to ubud"
related_keywords: ["ngurah rai to ubud", "bali airport transfer", "ubud transport"]
tags: ["bali", "ubud", "transportation", "how-to"]
category: "tips"
content_type: "howto"  # For HowTo schema.org

featured_image:
  src: "/images/bali/bali-airport-transport.jpg"
  alt: "Modern taxi waiting outside Bali Ngurah Rai International Airport terminal"
  width: 1200
  height: 630

affiliate_disclosure: true
word_count_target: TBD
draft: false
---
```

**Content Structure:**

```markdown
# How to Get From Bali Airport to Ubud: 5 Easy Options

[150-word intro: distance (35km), typical travel time (1-2 hours), overview of options]

## Option 1: Private Airport Transfer (Recommended)

**Cost:** 350,000-450,000 IDR ($23-30)
**Duration:** 1-1.5 hours
**Comfort:** ⭐⭐⭐⭐⭐

### How to Book:

**Step 1:** Book online before arrival
- <AffiliateLink href="..." text="GetYourGuide Airport Transfer" />
- Klook
- Direct with hotel

**Step 2:** Provide flight details when booking

**Step 3:** Driver meets you at arrivals with name sign

**Step 4:** Pay driver or pre-paid online

**Pros:**
- Door-to-door service
- Fixed price
- Air-conditioned
- No haggling

**Cons:**
- More expensive than shared options

**Best For:** First-time visitors, families, late arrivals

## Option 2: Grab/Gojek (Ride-Hailing Apps)

[Same detailed structure]

## Option 3: DAMRI Airport Bus

## Option 4: Private Taxi

## Option 5: Shared Shuttle

## Comparison Table

| Option | Cost | Duration | Comfort | Best For |
|--------|------|----------|---------|----------|
| Private Transfer | $25-30 | 1-1.5h | ⭐⭐⭐⭐⭐ | First-timers |
| [etc] |

## Important Tips

- Book in advance during peak season
- Have small bills for cash payments
- Confirm price before entering vehicle
- Use metered taxis only (Blue Bird)

## FAQs

<FAQ items={[...]} />
```

**HowTo Schema Requirements:**
- Clear step-by-step instructions
- Estimated time for each step
- Tools/requirements listed
- Images showing key steps (optional but recommended)

---

### 4. Product Review / Gear Guide

**Purpose:** Review travel gear, hotels, services with affiliate monetization

**Frontmatter Schema:**
```yaml
---
title: "Osprey Farpoint 40 Review: 2 Years of Daily Use"
description: "Honest review of the Osprey Farpoint 40 backpack after 2 years and 30+ flights. Pros, cons, and who should buy it for travel."
slug: "osprey-farpoint-40-review"

date: 2026-03-07
author: "NomadBitcoin"

focus_keyword: "osprey farpoint 40 review"
related_keywords: ["farpoint 40", "best travel backpack", "carry-on backpack review"]
tags: ["gear-review", "backpacks", "travel-gear"]
category: "gear"
content_type: "review"  # For Review schema.org

featured_image:
  src: "/images/gear/osprey-farpoint-40-review.jpg"
  alt: "Black Osprey Farpoint 40 backpack on airport luggage rack with boarding pass"
  width: 1200
  height: 630

affiliate_disclosure: true  # REQUIRED for reviews
word_count_target: TBD
draft: false

# Review-specific fields
review:
  product_name: "Osprey Farpoint 40"
  rating: 4.5
  price: "$140"
  pros: ["Perfect carry-on size", "Extremely durable", "Great hip belt"]
  cons: ["Expensive", "Limited organization pockets"]
---
```

**Content Structure:**

```markdown
# Osprey Farpoint 40 Review: 2 Years of Daily Use

[150-word intro: Personal experience, summary verdict, who it's for]

⭐⭐⭐⭐☆ **4.5/5** - Highly Recommended for Carry-On Travel

## Quick Verdict

After 2 years and 30+ flights, the Osprey Farpoint 40 remains my go-to travel backpack. It's the perfect size for carry-on travel, incredibly durable, and distributes weight well. Worth the premium price if you travel frequently.

**Best For:** Digital nomads, frequent travelers, minimalist packers
**Not For:** Budget travelers, those needing lots of organization

<ProductBox
  title="Osprey Farpoint 40"
  image="/images/gear/osprey-farpoint-40.jpg"
  amazonUrl="https://amazon.com/..."
  price="$140"
  rating={4.5}
  pros={[
    "Meets airline carry-on requirements",
    "Survived 30+ flights without damage",
    "Hip belt distributes weight well",
    "Lockable zippers for security"
  ]}
  cons={[
    "Expensive compared to alternatives",
    "Limited internal organization",
    "Hip belt doesn't detach"
  ]}
/>

## Full Specifications

- **Capacity:** 40 liters
- **Dimensions:** 55 x 35 x 23 cm
- **Weight:** 1.4 kg (3.08 lbs)
- **Material:** 210D nylon ripstop
- **Warranty:** Osprey All Mighty Guarantee (lifetime)

## Detailed Review

### Design & Build Quality [H3]

[300 words on construction, materials, durability with specific examples]

### Capacity & Organization [H3]

[300 words on storage space, pockets, packing cubes compatibility]

### Comfort & Carry [H3]

[300 words on straps, hip belt, back panel, comfort during use]

### Airport & Travel Experience [H3]

[300 words on TSA, overhead bins, airline compatibility]

## Real-World Testing

**30+ Flights:** [Details on airline experiences]
**Daily Use:** [How it handles as day bag]
**Weather Resistance:** [Rain test results]

## Comparison with Alternatives

### Osprey Farpoint 40 vs Tortuga Setout [H3]

| Feature | Farpoint 40 | Tortuga Setout |
|---------|-------------|----------------|
| Price | $140 | $199 |
| [etc] | | |

### Osprey Farpoint 40 vs Nomatic Travel Pack [H3]

## Who Should Buy This?

**Buy if you:**
- Travel frequently (10+ trips/year)
- Prefer carry-on only travel
- Need something durable
- Value comfort over organization

**Don't buy if you:**
- On tight budget (<$100)
- Need lots of pockets
- Want detachable hip belt
- Prefer rolling luggage

## Where to Buy

<AffiliateLink href="amazon-url" text="Buy on Amazon" /> - $140 with free Prime shipping
<AffiliateLink href="rei-url" text="REI Co-op" /> - Earn rewards, expert advice
[Osprey.com](official-site) - Direct from manufacturer

## Final Thoughts

[200-word conclusion with verdict and recommendation]

## FAQs

<FAQ items={[
  {
    question: "Does the Osprey Farpoint 40 fit as carry-on?",
    answer: "Yes, it meets most airlines' carry-on size limits..."
  }
]} />
```

**Review Schema Requirements:**
- Aggregate rating displayed prominently
- Specific pros and cons
- Price information
- Clear recommendation
- Comparison with alternatives
- Where to buy with affiliate disclosure

---

### 5. List Article (Listicle)

**Purpose:** "Top 10" or "Best of" content, high engagement, social sharing

**Frontmatter Schema:**
```yaml
---
title: "10 Best Beaches in Bali: From Hidden Gems to Famous Spots"
description: "Discover Bali's best beaches from the famous Seminyak to hidden coves in Amed. Includes maps, tips, and what makes each beach special."
slug: "best-beaches-in-bali"

date: 2026-03-07
author: "NomadBitcoin"

focus_keyword: "best beaches in bali"
tags: ["bali", "beaches", "destination-guide"]
category: "destination"
content_type: "article"

featured_image:
  src: "/images/bali/bali-beaches-collage.jpg"
  alt: "Collage of five different beaches in Bali showing white sand, black sand, and rocky coastlines"
  width: 1200
  height: 630

affiliate_disclosure: true
word_count_target: TBD
draft: false
---
```

**Content Structure:**

```markdown
# 10 Best Beaches in Bali: From Hidden Gems to Famous Spots

[150-word intro: Bali's diversity of beaches, what to expect from this list]

## Quick Comparison Table

| Beach | Best For | Crowd Level | Vibe |
|-------|----------|-------------|------|
| Seminyak | Surfing, Sunset Bars | High | Trendy |
| [etc] | | | |

## 1. Nusa Dua Beach - Best for Luxury & Calm Waters

![Nusa Dua Beach with calm turquoise water and luxury resorts](/images/bali/nusa-dua-beach.jpg)
*Caption: Pristine waters at Nusa Dua Beach with luxury resorts in background*

**Why It's Great:**
- Crystal clear, calm water perfect for swimming
- Luxury resort area with high-end amenities
- Well-maintained, clean beaches
- Safe for families with children

**What to Know:**
- **Location:** Southeast Bali, 20 minutes from airport
- **Best Time:** Year-round (protected bay)
- **Activities:** Swimming, paddleboarding, snorkeling
- **Vibe:** Upscale, relaxed, resort-focused

**Where to Stay:**

<HotelCard
  name="St. Regis Bali Resort"
  location="Nusa Dua"
  price="$350"
  rating="4.9"
  bookingUrl="..."
  image="..."
/>

**Getting There:** [50 words on access]

**Insider Tip:** [Personal recommendation or lesser-known fact]

---

## 2. Uluwatu Beach - Best for Surfing

[Same detailed structure for each beach]

[Continue through all 10 beaches]

## How to Choose the Right Beach

**For Surfing:** Uluwatu, Padang Padang
**For Families:** Nusa Dua, Sanur
**For Partying:** Seminyak, Canggu
**For Seclusion:** Amed, Green Bowl

## Beach Safety Tips

1. **Currents:** Be aware of rip currents
2. **Flags:** Respect beach flags
3. **Sun:** Use reef-safe sunscreen
4. **Valuables:** Don't leave unattended

## Map of All Beaches

[Embed Google Map with markers]

## FAQs

<FAQ items={[...]} />
```

**Listicle Requirements:**
- Each item: 200-300 words minimum
- High-quality image for each item
- Consistent structure across all items
- Clear why each made the list
- Personal insights, not generic descriptions
- Comparison table at top
- Map showing locations

---

## Link Attribution & Disclosure Rules

### Affiliate Links

**MANDATORY:** All affiliate links MUST include `rel="nofollow sponsored"`

**Applies to:**
- Booking.com links
- Airbnb links
- Amazon Associate links
- GetYourGuide links
- Any link that earns commission

**Implementation:**

```html
<!-- CORRECT -->
<a href="https://booking.com/?aid=12345"
   rel="nofollow sponsored"
   target="_blank">Book Hotel</a>

<!-- INCORRECT -->
<a href="https://booking.com/?aid=12345">Book Hotel</a>
```

**Using Components (Preferred):**

```mdx
<AffiliateLink
  href="https://booking.com/?aid=12345"
  text="Book Hotel"
/>
```

**Rationale:**
- Google requirement to avoid SEO penalties
- `nofollow` = don't pass PageRank
- `sponsored` = official Google tag for paid/affiliate links (2019+)
- `target="_blank"` = opens in new tab (UX best practice)

---

### Editorial Links (External Resources)

**Default:** No rel attribute (dofollow) for trusted external resources

**Applies to:**
- Government tourism websites
- Official destination guides
- News articles
- Educational resources
- Trusted travel resources

**Implementation:**

```html
<!-- CORRECT -->
<a href="https://indonesia.travel/official-guide"
   target="_blank"
   rel="noopener">Official Tourism Site</a>

<!-- Use rel="noopener" for security, not SEO -->
```

**Rationale:**
- Dofollow links to quality sources improves your SEO credibility
- `rel="noopener"` for security (prevents window.opener hijacking)

---

### Internal Links

**Default:** No rel attribute

**Applies to:**
- Links to other blog posts
- Navigation links
- Category/tag pages

**Implementation:**

```html
<!-- CORRECT -->
<a href="/blog/tokyo-travel-guide">Read Tokyo Guide</a>

<!-- Internal links don't need target="_blank" -->
```

**Rationale:**
- Internal links pass PageRank within your site
- Keeps users on your site (no new tab needed)

---

### User-Generated Content (Future)

**If implementing comments/forums:** Use `rel="nofollow ugc"`

**Implementation:**

```html
<a href="https://spammy-site.com"
   rel="nofollow ugc">User Posted Link</a>
```

**Rationale:**
- `ugc` = User Generated Content (Google tag)
- Protects from spam links

---

### Affiliate Disclosure Requirements

**MANDATORY:** Every page with affiliate links MUST include disclosure

**Implementation Levels:**

#### A. Global Footer Disclosure (All Pages)

```html
<!-- Footer -->
<p class="disclosure">
  ⚠️ Disclosure: This site contains affiliate links.
  When you book through these links, I earn a small commission
  at no extra cost to you. I only recommend services I've personally used.
</p>
```

#### B. Per-Post Disclosure (Posts with Affiliates)

**Frontmatter flag:**
```yaml
---
title: "Best Hotels in Bali"
affiliate_disclosure: true
---
```

**Auto-renders disclosure at top of post:**
```html
<div class="affiliate-notice">
  ⚠️ This post contains affiliate links.
  If you book through my recommendations, I earn a commission
  that helps support this blog. Thank you!
</div>
```

#### C. Inline Disclosure (Near First Affiliate Link)

```markdown
Below are my hotel recommendations.
*(Affiliate links - I earn from qualifying bookings)*

- [The Legian Bali](https://booking.com?aid=123) - Luxury beachfront
```

**FTC Compliance:** Disclosure must be:
- ✅ Clear and conspicuous
- ✅ Near the affiliate link (not just in footer)
- ✅ In plain language
- ✅ Before the click (not on destination page)

---

## Component Usage Rules

### Use Standardized Components

**MANDATORY:** Use predefined components for affiliate links

**Available Components:**

#### AffiliateLink
```astro
<AffiliateLink
  href="https://booking.com/?aid=12345"
  text="Book on Booking.com"
  platform="booking"
/>
```
**Auto-includes:** `rel="nofollow sponsored"`, tracking, disclosure

#### HotelCard
```astro
<HotelCard
  name="The Legian Bali"
  location="Seminyak"
  price="250"
  rating="4.8"
  bookingUrl="https://booking.com/hotel?aid=123"
  image="/images/legian.jpg"
/>
```
**Auto-includes:** Proper rel attributes, tracking events, disclosure

#### ProductBox (Amazon/Gear)
```astro
<ProductBox
  title="Osprey Farpoint 40 Backpack"
  amazonUrl="https://amazon.com/dp/B00XYZ?tag=yourtag"
  price="$140"
  pros={["Perfect carry-on size", "Durable"]}
  cons={["Expensive"]}
/>
```

**Rationale:**
- Enforces correct rel attributes automatically
- Consistent design
- Centralized tracking
- Easy to update (change component = all instances update)

---

### Component Override Restrictions

**PROHIBITED:** Manually writing affiliate links in markdown when component exists

```markdown
<!-- ❌ WRONG -->
Check out [this hotel](https://booking.com?aid=123)

<!-- ✅ CORRECT -->
<AffiliateLink href="https://booking.com?aid=123" text="this hotel" />
```

**Exception:** Simple inline mentions where component would break flow

```markdown
I booked through
<a href="https://booking.com?aid=123" rel="nofollow sponsored">Booking.com</a>
and saved 20%.
```

---

### Affiliate Domain Registry

**All affiliate domains MUST be registered in config:**

```typescript
// src/config/affiliates.ts
export const AFFILIATE_DOMAINS = [
  'booking.com',
  'airbnb.com',
  'amazon.com',
  'amazon.co.uk',
  'getyourguide.com',
  'kiwi.com',
  'skyscanner.com',
  'viator.com',
];
```

**Purpose:**
- Build-time validation
- Auto-apply rel attributes
- Tracking configuration
- Centralized management

---

## SEO Writing Standards

### Keyword Usage

**Do:**
- ✅ Use focus keyword in title
- ✅ Include in first paragraph (within first 100 words)
- ✅ Use in 1-2 H2 headings naturally
- ✅ Include in conclusion
- ✅ Use related keywords throughout
- ✅ Include in meta description
- ✅ Use in image alt text (1-2 images)

**Don't:**
- ❌ Keyword stuff (overuse focus keyword)
- ❌ Use exact match repeatedly (use variations)
- ❌ Force keywords awkwardly
- ❌ Sacrifice readability for SEO

**Keyword Density:** 0.5-1.5% (natural usage)

### Heading Structure

**Required:**
```markdown
# H1 - Page Title (ONLY ONE per page)

## H2 - Main Section (3-6 per article)

### H3 - Sub-section (2-4 per H2 section)

#### H4 - Minor points (use sparingly)
```

**Best Practices:**
- H1 = Title tag (should match or be very similar)
- Each H2 should cover distinct topic
- Include keywords in 30-50% of headings
- Use descriptive, specific headings (not "Introduction")
- Maintain logical hierarchy (no H4 without H3)

### Internal Linking

**Requirements:**
- Minimum 3 internal links per article
- Maximum 10 internal links (avoid over-linking)
- Link to related content naturally
- Use descriptive anchor text (not "click here")
- Link to pillar content when relevant

**Example:**
```markdown
<!-- GOOD -->
Learn more about [budgeting for Bali travel](/bali-budget-guide/) in our comprehensive guide.

<!-- BAD -->
To learn about budgeting, [click here](/bali-budget-guide/).
```

### External Linking

**Requirements:**
- 2-4 authoritative external links per article
- Link to government sites, tourism boards, research
- All external links: `target="_blank" rel="noopener"`
- Affiliate links: `rel="nofollow sponsored"`

**Quality Sources:**
- Official tourism websites
- Government sites
- Reputable news sources
- Academic research
- Industry authorities

---

## Content Quality Standards

### E-E-A-T Compliance

**Experience:**
- Include personal anecdotes
- Share first-hand experiences
- Provide specific details (dates, prices, names)
- Use "I" perspective when appropriate

**Expertise:**
- Cite credentials when relevant
- Reference authoritative sources
- Demonstrate deep knowledge
- Provide unique insights

**Authoritativeness:**
- Link to authoritative sources
- Be cited by others (earn backlinks)
- Maintain accuracy
- Update content regularly

**Trustworthiness:**
- Disclose affiliations
- Correct errors promptly
- Transparent about limitations
- Cite sources

### Readability

**Target:** 8th-grade reading level (Flesch-Kincaid)

**Techniques:**
- Short paragraphs (2-4 sentences)
- Short sentences (15-20 words average)
- Active voice (80%+ of sentences)
- Bullet points for lists
- Subheadings every 300 words
- Conversational tone
- Avoid jargon (or explain it)

### User Intent

**Match search intent:**

| Query Type | Intent | Content Approach |
|------------|--------|------------------|
| "bali travel guide" | Informational | Comprehensive overview |
| "best hotels in bali" | Commercial Investigation | Comparisons, reviews, recommendations |
| "book bali hotel" | Transactional | Direct booking options, deals |
| "how to get to bali" | Informational | Step-by-step instructions |
| "is bali safe" | Informational | Answer question directly |

**Answer in first 100 words:**
- State main answer upfront
- Expand with details below
- Don't bury the lede

### Link Context

**REQUIRED:** All affiliate links must have context/value

```markdown
<!-- ❌ BAD -->
Book here: [Booking.com](https://booking.com?aid=123)

<!-- ✅ GOOD -->
I stayed at The Legian and loved it. You can check availability
and current prices on [Booking.com](https://booking.com?aid=123).
```

**Rationale:**
- Better user experience
- Higher conversion rates
- FTC requires honest recommendations

### Multiple Options

**RECOMMENDED:** Provide 2-3 options when possible

```markdown
**Where to Book:**
- [Booking.com](link) - Best for free cancellation
- [Agoda](link) - Often cheaper in Asia
- [Hotel Direct](link) - May offer loyalty points
```

**Rationale:**
- Builds trust
- Not all users have same preferences
- Better SEO (more helpful content)

---

## Image Guidelines

### Image Requirements

**Every article needs:**
- 1 featured image (1200x630px)
- 3-8 supporting images
- All images optimized (< 200KB after compression)
- Descriptive file names (`bali-rice-terraces-ubud.jpg` not `IMG_1234.jpg`)

### Alt Text Standards

**Format:**
```markdown
![Descriptive alt text](/path/to/image.jpg)
*Optional caption for readers*
```

**Alt Text Rules:**
- 10-125 characters
- Describe what's in image
- Include keywords naturally (not forced)
- Don't start with "Image of" or "Picture of"
- Be specific and descriptive

**Examples:**

```markdown
<!-- GOOD -->
![Lush green rice terraces in Ubud with palm trees and blue sky](/images/bali/tegallalang-rice-terraces.jpg)

<!-- BAD -->
![Rice terraces](/images/bali/img1.jpg)

<!-- BAD (keyword stuffing) -->
![Bali rice terraces Ubud best rice terraces in Bali](/images/bali/rice.jpg)
```

### Image Sourcing

**Allowed:**
- Own photographs
- Licensed stock photos (Unsplash, Pexels with attribution)
- Commissioned photography
- User-submitted (with permission)

**Not Allowed:**
- Google Images without license
- Copyrighted images
- Screenshots without permission
- AI-generated without disclosure

---

## Content Freshness & Updates

### Update Triggers

**Update content when:**
- Information becomes outdated (prices, schedules)
- New destinations/options available
- Significant changes (COVID restrictions, visa rules)
- Traffic declining (may need refresh)
- Competitors publishing better content

### Update Frontmatter

```yaml
---
title: "..."
date: 2026-01-15  # Original publish date (DON'T CHANGE)
updated: 2026-03-11  # Last update date (CHANGE THIS)
---
```

**In content:**
```markdown
*Last Updated: March 2026*

## Updates

**March 2026:** Added new hotel recommendations, updated prices for 2026 season.
```

---

## Build-Time Validation Rules

### Automated Link Checking

**Remark Plugin:** Auto-detect and flag violations

**Checks:**
1. Affiliate domains without `rel="nofollow sponsored"`
2. External links missing `rel="noopener"`
3. Affiliate links without nearby disclosure

**Build Warnings:**

```bash
⚠️  Warning: /blog/bali-guide.md
    Line 45: Affiliate link missing rel="nofollow sponsored"
    Found: <a href="https://booking.com?aid=123">
    Fix: Add rel="nofollow sponsored" or use <AffiliateLink> component
```

### Build-Time Checks

**Automated validation runs on:**
- Local development (`npm run dev`)
- Git commit (pre-commit hook)
- GitHub Actions (CI pipeline)

**Build fails if:**
- Affiliate domain used without proper rel attribute
- Missing disclosure on page with affiliate links

### Manual Review (Optional)

**Quarterly audit:**
- Review top 10 performing posts
- Check for broken affiliate links
- Verify commissions tracking correctly
- Update pricing/availability mentions

---

## AI Agent Specific Instructions

### When Creating Content

**Step 1: Research**
- Understand search intent for target keyword
- Analyze top 10 ranking pages
- Identify content gaps
- Gather unique insights

**Step 2: Outline**
- Create H2/H3 structure
- Ensure keyword placement
- Plan internal link opportunities
- Identify affiliate opportunities

**Step 3: Write**
- Follow structure templates above
- Meet word count targets
- Maintain readability
- Include all required elements

**Step 4: Optimize**
- Add images with alt text
- Insert internal/external links
- Add structured data components
- Include CTAs and affiliate links

**Step 5: Validate**
- Check frontmatter schema
- Verify all required fields
- Test markdown rendering
- Confirm link attribution

### Common Mistakes to Avoid

❌ **Don't:**
- Generate generic, obvious content
- Copy from ranking pages
- Forget affiliate disclosures
- Use "As an AI" phrases
- Include current events without dates
- Make unverifiable claims
- Use outdated prices/info
- Skip image alt text
- Ignore content type schema
- Manually write affiliate links (use components)

✅ **Do:**
- Provide unique value
- Use specific examples
- Update prices with year
- Cite sources
- Include personal perspective (as the blog author)
- Follow schema exactly
- Test components render correctly
- Use standardized components
- Include proper rel attributes
- Add affiliate disclosures

---

## Content Variations

### FAQ Component Usage

```mdx
import FAQ from '@components/FAQ.astro';

<FAQ items={[
  {
    question: "Is Bali expensive?",
    answer: "Bali can be very affordable. Budget travelers can easily spend $25-40/day, while mid-range travelers spend $50-100/day. Luxury options are available starting around $150/day."
  },
  {
    question: "When is the best time to visit Bali?",
    answer: "The best time to visit Bali is during the dry season from April to October. The peak tourist season is July-August and December-January. For fewer crowds and good weather, visit in May, June, or September."
  }
]} />
```

**FAQ Best Practices:**
- Group related questions together
- Each FAQ: 1 question, 1 complete answer
- Answer length: 40-150 words
- Use simple language
- Provide actionable information
- Include numbers/specifics

### Table Usage

**When to use tables:**
- Comparisons (hotels, destinations, gear)
- Specifications
- Pricing breakdowns
- Itinerary schedules
- Quick reference data

**Example:**
```markdown
| Destination | Best Season | Budget/Day | Activities |
|-------------|-------------|------------|------------|
| Bali | Apr-Oct | $30-80 | Beach, Culture, Surfing |
| Tokyo | Mar-May, Sep-Nov | $80-150 | Urban, Food, Culture |
```

### Call-to-Action (CTA) Placement

**CTAs per article:**
- 1-2 primary CTAs (affiliate links, booking widgets)
- 2-3 secondary CTAs (newsletter, related content)

**Placement:**
- After intro (soft CTA)
- Mid-content (primary CTA)
- Before conclusion (primary CTA)
- End of article (related content CTA)

---

## Compliance & Legal

### Required Disclosures

**Affiliate Content:**
```markdown
*Disclosure: This post contains affiliate links. If you book through these links, I earn a small commission at no extra cost to you. I only recommend services I've personally used and trust.*
```

**Sponsored Content:**
```markdown
*Disclosure: This post is sponsored by [Brand]. All opinions are my own and based on genuine experience with the product/service.*
```

**Review Products:**
```markdown
*Disclosure: [Brand] provided this product for review. This doesn't influence my honest assessment, and I only recommend products I would use myself.*
```

### Accuracy Requirements

- **Verify facts** before publishing
- **Cite sources** for statistics/claims
- **Update regularly** (prices, schedules, rules)
- **Correct errors** promptly
- **Date-stamp** time-sensitive info

---

## Quality Assurance Checklist

Before publishing, verify:

### Content
- [ ] Meets word count target (TBD per content type)
- [ ] Follows proper heading hierarchy
- [ ] Includes focus keyword naturally
- [ ] Provides unique value
- [ ] Grammatically correct
- [ ] Readable (8th-grade level)
- [ ] Matches search intent

### SEO
- [ ] Title 50-60 characters
- [ ] Meta description 150-160 characters
- [ ] URL slug keyword-optimized
- [ ] 3+ internal links
- [ ] 2+ authoritative external links
- [ ] Images have descriptive alt text
- [ ] Focus keyword in first paragraph

### Technical & Compliance
- [ ] Frontmatter schema complete
- [ ] All required fields present
- [ ] Content type correct
- [ ] Affiliate disclosure if needed
- [ ] All affiliate links use `rel="nofollow sponsored"`
- [ ] Using standardized components for affiliate links
- [ ] External links use `rel="noopener"`
- [ ] Components render correctly
- [ ] Images optimized

### UX
- [ ] Mobile-friendly formatting
- [ ] Images break up text
- [ ] Bullet points for lists
- [ ] Clear CTAs
- [ ] Easy to scan
- [ ] Value in first 100 words
- [ ] Links provide context/value
- [ ] Multiple booking options offered (when applicable)

---

## Content Templates Quick Reference

| Content Type | Min Words (TBD) | Content Type Schema | Priority Elements |
|--------------|-----------|---------------------|-------------------|
| **Long-Form Guide** | TBD | `article` | Comprehensive coverage, internal links |
| **FAQ Page** | TBD | `faq` | FAQ component, clear Q&A pairs |
| **How-To** | TBD | `howto` | Step-by-step, numbered lists |
| **Review** | TBD | `review` | Pros/cons, rating, affiliate links |
| **Listicle** | TBD | `article` | Comparison table, images for each item |
| **Destination Page** | TBD | `article` | Maps, itineraries, practical info |

---

## Practical Examples

### Example 1: Hotel Recommendation Post

```mdx
---
title: "Top 5 Hotels in Bali"
description: "My personal picks for the best hotels in Bali"
date: 2026-03-07
tags: ["bali", "hotels"]
affiliate_disclosure: true
---

import HotelCard from '@components/HotelCard.astro';
import AffiliateLink from '@components/AffiliateLink.astro';

# Top 5 Hotels in Bali

After spending 3 months in Bali, here are my favorite places to stay.

*Disclosure: The booking links below are affiliate links. I earn a small
commission if you book through them, at no extra cost to you.*

## 1. The Legian Bali

<HotelCard
  name="The Legian Bali"
  location="Seminyak Beach"
  price="250"
  rating="4.8"
  bookingUrl="https://booking.com/hotel/legian?aid=12345"
  image="/images/legian.jpg"
/>

This luxury beachfront resort was my favorite splurge...

**Book Here:**
- <AffiliateLink href="https://booking.com?aid=123" text="Booking.com" />
- <AffiliateLink href="https://agoda.com?cid=456" text="Agoda" />
- [Official Site](https://legian.com) (non-affiliate)
```

### Example 2: Travel Gear Review

```mdx
---
title: "Best Travel Backpack: Osprey Farpoint 40 Review"
affiliate_disclosure: true
---

import ProductBox from '@components/ProductBox.astro';
import AffiliateLink from '@components/AffiliateLink.astro';

# Osprey Farpoint 40 Review

After 2 years of daily use, here's my honest review.

<ProductBox
  title="Osprey Farpoint 40"
  amazonUrl="https://amazon.com/dp/B00XYZ?tag=yourtag"
  price="$140"
  image="/images/osprey.jpg"
  pros={[
    "Perfect carry-on size (meets airline requirements)",
    "Extremely durable - survived 30+ flights",
    "Hip belt distributes weight well"
  ]}
  cons={[
    "Expensive compared to alternatives",
    "Limited organization pockets"
  ]}
/>

You can find it on <AffiliateLink href="amazon-url" text="Amazon" />
or at your local outdoor retailer.
```

### Example 3: Destination Guide (Mixed Links)

```mdx
---
title: "Complete Bali Travel Guide"
affiliate_disclosure: true
---

import AffiliateLink from '@components/AffiliateLink.astro';

# Bali Travel Guide

## Official Resources

- [Indonesia Tourism Board](https://indonesia.travel) - Official guide
- [Bali Government Portal](https://baliprov.go.id) - Local information

*(Above are editorial links - not affiliate)*

## Where to Stay

For hotels, I recommend checking:
- <AffiliateLink href="booking-url" text="Booking.com" /> - Best cancellation policy
- <AffiliateLink href="airbnb-url" text="Airbnb" /> - Unique local stays

## Getting Around

Book your airport transfer through
<AffiliateLink href="getyourguide-url" text="GetYourGuide" /> for reliable service.
```

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial content guidelines for AI agents |
| 2.0 | 2026-03-11 | Merged with content-rules.md, added compliance section |

---

## Related Documents

- [PRD](./prd.md) - Product requirements
- [Architecture](./architecture.md) - Technical implementation
