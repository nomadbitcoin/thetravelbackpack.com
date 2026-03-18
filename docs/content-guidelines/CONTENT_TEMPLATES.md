# Content Creation Templates

This document provides templates for all content types in TheTravelBackpack.com. Use these templates when creating content programmatically or with AI agents.

---

## Table of Contents

1. [Blog Posts (Markdown)](#1-blog-posts-markdown)
2. [Buying Guides (JSON)](#2-buying-guides-json)
3. [Comparisons (JSON)](#3-comparisons-json)
4. [Checklists (JSON)](#4-checklists-json)

---

## 1. Blog Posts (Markdown)

**Location:** `site/src/content/posts/`
**File Format:** `.md` or `.mdx`
**Type:** Markdown with YAML frontmatter

### Schema Validation Rules

```typescript
{
  title: string,                    // REQUIRED
  description: string,              // REQUIRED
  date: Date,                       // REQUIRED (YYYY-MM-DD format)
  updated?: Date,                   // OPTIONAL (YYYY-MM-DD format)
  author: string,                   // OPTIONAL (default: "The Travel Backpack")
  tags: string[],                   // REQUIRED (min: 0, max: 10)
  category: enum,                   // REQUIRED (guide|tips|gear|destination)
  featured_image?: {                // OPTIONAL
    src: string,
    alt: string,
    width: number,
    height: number
  },
  affiliate_disclosure: boolean,    // OPTIONAL (default: false)
  draft: boolean,                   // OPTIONAL (default: false)
  originalUrl?: string,             // OPTIONAL (valid URL)
  recoveredFrom?: string,           // OPTIONAL
  targetKeyword?: string            // OPTIONAL
}
```

### Template Example

**Filename:** `best-hiking-backpack-2026.md`

```markdown
---
title: "Best Hiking Backpack for 2026: Complete Guide"
description: "Discover the top hiking backpacks of 2026. Expert reviews, comparisons, and buying advice to help you choose the perfect pack for your adventures."
date: 2026-03-17
updated: 2026-03-17
author: "The Travel Backpack"
tags: ["hiking", "backpacks", "gear", "outdoor", "review"]
category: "gear"
featured_image:
  src: "/images/hiking-backpack-2026.jpg"
  alt: "Hiker wearing premium hiking backpack in mountain scenery"
  width: 1200
  height: 630
affiliate_disclosure: true
draft: false
targetKeyword: "best hiking backpack"
---

## Introduction

Your introduction paragraph here. Explain why this topic matters and what the reader will learn.

## Main Content Section 1

Write your content using Markdown formatting:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

### Subsection

More detailed content...

## Main Content Section 2

Continue with your article structure...

## Conclusion

Wrap up your article with key takeaways and a call to action.
```

### Minimal Required Template

```markdown
---
title: "Your Article Title Here"
description: "A compelling 120-160 character description for SEO"
date: 2026-03-17
tags: ["tag1", "tag2", "tag3"]
category: "guide"
---

Your article content here in Markdown format.
```

---

## 2. Buying Guides (JSON)

**Location:** `site/src/content/buying-guides/`
**File Format:** `.json`
**Type:** JSON data file

### Schema Validation Rules

```typescript
{
  meta: {
    content_type: "buying-guide",   // REQUIRED (literal)
    category: string                 // REQUIRED
  },
  seo: {
    title: string,                   // REQUIRED (min: 30, max: 60 chars)
    description: string,             // REQUIRED (min: 120, max: 160 chars)
    keywords: string[]               // REQUIRED
  },
  content: {
    intro: string,                   // REQUIRED (HTML allowed)
    items: [                         // REQUIRED (array of products)
      {
        name: string,                // REQUIRED
        affiliate_url?: string,      // OPTIONAL (valid URL)
        affiliate_platform?: string, // OPTIONAL
        image: string,               // REQUIRED (image path/URL)
        pros: string[],              // REQUIRED
        cons: string[],              // REQUIRED
        best_for: string,            // REQUIRED
        verdict: string              // REQUIRED
      }
    ],
    faq?: [                          // OPTIONAL
      {
        question: string,
        answer: string
      }
    ]
  }
}
```

### Template Example

**Filename:** `best-travel-backpacks-2026.json`

```json
{
  "meta": {
    "content_type": "buying-guide",
    "category": "travel-gear"
  },
  "seo": {
    "title": "Best Travel Backpacks 2026: Top 5 Expert Picks",
    "description": "Find the perfect travel backpack with our expert buying guide. Compare features, prices, and real user reviews of the top 5 backpacks for 2026.",
    "keywords": [
      "best travel backpack",
      "travel backpack review",
      "carry-on backpack",
      "backpacking gear"
    ]
  },
  "content": {
    "intro": "<p>Choosing the right travel backpack can make or break your trip. After testing over 50 backpacks, we've narrowed down the best options for different travel styles and budgets.</p><p>Whether you're backpacking Southeast Asia or taking a weekend city break, this guide will help you find the perfect pack.</p>",
    "items": [
      {
        "name": "Osprey Farpoint 40",
        "affiliate_url": "https://amazon.com/example-affiliate-link",
        "affiliate_platform": "Amazon Associates",
        "image": "/images/osprey-farpoint-40.jpg",
        "pros": [
          "Carry-on compliant at 40L capacity",
          "Extremely comfortable harness system",
          "Durable and weatherproof construction",
          "Lifetime warranty from Osprey"
        ],
        "cons": [
          "Higher price point ($180-200)",
          "Limited external pockets",
          "Not ideal for heavy tech gear"
        ],
        "best_for": "Minimalist travelers who want quality and durability",
        "verdict": "The Osprey Farpoint 40 is the gold standard for carry-on travel backpacks. While it's pricier than competitors, the comfort, build quality, and lifetime warranty make it worth the investment for frequent travelers."
      },
      {
        "name": "Cabin Max Metz",
        "affiliate_url": "https://amazon.com/example-affiliate-link-2",
        "affiliate_platform": "Amazon Associates",
        "image": "/images/cabin-max-metz.jpg",
        "pros": [
          "Budget-friendly at $40-50",
          "Airline-approved carry-on size",
          "Lightweight (only 0.8kg)",
          "Multiple color options"
        ],
        "cons": [
          "Less durable than premium options",
          "Minimal padding and support",
          "Basic organization system"
        ],
        "best_for": "Budget travelers and occasional users",
        "verdict": "Perfect for travelers who want a functional carry-on without breaking the bank. Don't expect premium materials, but it gets the job done for short trips and occasional use."
      }
    ],
    "faq": [
      {
        "question": "What size backpack do I need for a week-long trip?",
        "answer": "For most week-long trips, a 40-45L backpack is ideal. This size is typically carry-on compliant and large enough for 5-7 days of clothing, toiletries, and essentials. If you plan to bring bulky items like winter gear, consider 50-60L."
      },
      {
        "question": "Are expensive backpacks worth it?",
        "answer": "It depends on your travel frequency. If you travel multiple times per year, investing in a quality backpack ($150-250) will last 5-10 years. For occasional travelers (1-2 trips/year), a budget option ($50-80) may suffice."
      }
    ]
  }
}
```

### Minimal Required Template

```json
{
  "meta": {
    "content_type": "buying-guide",
    "category": "your-category"
  },
  "seo": {
    "title": "Your SEO Title (30-60 characters)",
    "description": "Your meta description that should be between 120 and 160 characters to display properly in search results.",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "content": {
    "intro": "<p>Your introduction paragraph explaining what this buying guide covers.</p>",
    "items": [
      {
        "name": "Product Name",
        "image": "/images/product.jpg",
        "pros": ["Pro 1", "Pro 2", "Pro 3"],
        "cons": ["Con 1", "Con 2"],
        "best_for": "Who should buy this product",
        "verdict": "Your expert verdict on this product"
      }
    ]
  }
}
```

---

## 3. Comparisons (JSON)

**Location:** `site/src/content/comparisons/`
**File Format:** `.json`
**Type:** JSON data file

### Schema Validation Rules

```typescript
{
  meta: {
    content_type: "comparison",      // REQUIRED (literal)
    category: string                  // REQUIRED
  },
  seo: {
    title: string,                    // REQUIRED (min: 30, max: 60 chars)
    description: string,              // REQUIRED (min: 120, max: 160 chars)
    keywords: string[]                // REQUIRED
  },
  content: {
    intro: string,                    // REQUIRED (HTML allowed)
    items: [                          // REQUIRED (array of products)
      {
        name: string,                 // REQUIRED
        specs: Record<string, string>, // REQUIRED (key-value pairs)
        affiliate_url?: string,       // OPTIONAL (valid URL)
        affiliate_platform?: string,  // OPTIONAL
        image: string                 // REQUIRED (image path/URL)
      }
    ],
    winner?: string,                  // OPTIONAL
    conclusion: string                // REQUIRED (HTML allowed)
  }
}
```

### Template Example

**Filename:** `osprey-vs-deuter-backpacks.json`

```json
{
  "meta": {
    "content_type": "comparison",
    "category": "backpack-comparisons"
  },
  "seo": {
    "title": "Osprey vs Deuter Backpacks: Which Brand is Better?",
    "description": "Head-to-head comparison of Osprey and Deuter backpacks. Compare specs, prices, durability, and warranty to find the best hiking backpack brand.",
    "keywords": [
      "osprey vs deuter",
      "backpack comparison",
      "best backpack brand",
      "hiking backpack review"
    ]
  },
  "content": {
    "intro": "<p>Osprey and Deuter are two of the most respected names in hiking backpacks, but which one is right for you?</p><p>We've tested flagship models from both brands to help you make an informed decision.</p>",
    "items": [
      {
        "name": "Osprey Atmos AG 65",
        "specs": {
          "Capacity": "65L",
          "Weight": "2.31 kg (5.11 lbs)",
          "Price": "$270-300",
          "Frame": "Anti-Gravity suspension",
          "Warranty": "Lifetime (All Mighty Guarantee)",
          "Ventilation": "Mesh back panel",
          "Load Range": "30-50 lbs",
          "Sizes": "S, M, L",
          "Hipbelt Pockets": "Yes (zippered)",
          "Raincover": "Included"
        },
        "affiliate_url": "https://amazon.com/osprey-atmos-ag-65",
        "affiliate_platform": "Amazon Associates",
        "image": "/images/osprey-atmos-ag-65.jpg"
      },
      {
        "name": "Deuter Aircontact Core 65+10",
        "specs": {
          "Capacity": "65L + 10L extension",
          "Weight": "2.65 kg (5.84 lbs)",
          "Price": "$240-270",
          "Frame": "X-frame with steel",
          "Warranty": "Lifetime",
          "Ventilation": "Aircontact back system",
          "Load Range": "35-60 lbs",
          "Sizes": "S, M, L, XL",
          "Hipbelt Pockets": "Yes (zippered)",
          "Raincover": "Included"
        },
        "affiliate_url": "https://amazon.com/deuter-aircontact-core-65",
        "affiliate_platform": "Amazon Associates",
        "image": "/images/deuter-aircontact-core-65.jpg"
      }
    ],
    "winner": "Osprey Atmos AG 65",
    "conclusion": "<p><strong>Winner: Osprey Atmos AG 65</strong> - For most hikers, the Osprey's superior comfort and ventilation system make it worth the extra $30-40.</p><p>However, if you regularly carry heavy loads (50+ lbs) or need the extra 10L capacity, the Deuter Aircontact Core is the better choice. Its steel frame handles heavy loads better than Osprey's lighter system.</p><p>Both brands offer lifetime warranties and excellent build quality, so you can't go wrong with either choice.</p>"
  }
}
```

### Minimal Required Template

```json
{
  "meta": {
    "content_type": "comparison",
    "category": "your-category"
  },
  "seo": {
    "title": "Product A vs Product B: Complete Comparison",
    "description": "Compare Product A and Product B side-by-side. See specs, prices, and expert analysis to choose the right option for you.",
    "keywords": ["product a vs product b", "comparison"]
  },
  "content": {
    "intro": "<p>Introduction to what you're comparing and why.</p>",
    "items": [
      {
        "name": "Product A",
        "specs": {
          "Spec 1": "Value",
          "Spec 2": "Value",
          "Spec 3": "Value"
        },
        "image": "/images/product-a.jpg"
      },
      {
        "name": "Product B",
        "specs": {
          "Spec 1": "Value",
          "Spec 2": "Value",
          "Spec 3": "Value"
        },
        "image": "/images/product-b.jpg"
      }
    ],
    "conclusion": "<p>Your final verdict and recommendation.</p>"
  }
}
```

---

## 4. Checklists (JSON)

**Location:** `site/src/content/checklists/`
**File Format:** `.json`
**Type:** JSON data file

### Schema Validation Rules

```typescript
{
  meta: {
    content_type: "checklist",       // REQUIRED (literal)
    category: string                  // REQUIRED
  },
  seo: {
    title: string,                    // REQUIRED (min: 30, max: 60 chars)
    description: string,              // REQUIRED (min: 120, max: 160 chars)
    keywords: string[]                // REQUIRED
  },
  content: {
    intro: string,                    // REQUIRED (HTML allowed)
    sections: [                       // REQUIRED
      {
        title: string,                // REQUIRED
        items: string[]               // REQUIRED (array of checklist items)
      }
    ]
  }
}
```

### Template Example

**Filename:** `hiking-packing-checklist.json`

```json
{
  "meta": {
    "content_type": "checklist",
    "category": "hiking-gear"
  },
  "seo": {
    "title": "Ultimate Hiking Packing Checklist: Don't Forget Anything",
    "description": "Complete hiking packing checklist covering clothing, gear, food, safety items, and more. Print-friendly format ensures you never forget essentials.",
    "keywords": [
      "hiking packing list",
      "hiking checklist",
      "what to pack for hiking",
      "hiking essentials"
    ]
  },
  "content": {
    "intro": "<p>Don't let a forgotten item ruin your hiking trip! This comprehensive checklist covers everything you need for a safe and enjoyable hike.</p><p>Adjust based on your trip length, weather conditions, and personal needs.</p>",
    "sections": [
      {
        "title": "The Ten Essentials",
        "items": [
          "Navigation (map, compass, GPS device)",
          "Sun protection (sunscreen, sunglasses, hat)",
          "Insulation (extra clothing layers)",
          "Illumination (headlamp or flashlight with extra batteries)",
          "First-aid supplies",
          "Fire starter (waterproof matches, lighter)",
          "Repair kit and tools (multi-tool, duct tape)",
          "Nutrition (extra food beyond planned meals)",
          "Hydration (extra water and water treatment)",
          "Emergency shelter (tent, bivy, emergency blanket)"
        ]
      },
      {
        "title": "Clothing",
        "items": [
          "Moisture-wicking base layers (top and bottom)",
          "Insulating mid-layer (fleece or down jacket)",
          "Waterproof rain jacket",
          "Hiking pants or shorts",
          "Hiking boots or trail runners (already broken in)",
          "Wool or synthetic hiking socks (2-3 pairs)",
          "Hat for sun protection",
          "Warm hat for cold weather",
          "Gloves (if needed for weather)",
          "Gaiters (optional, for snow or muddy trails)"
        ]
      },
      {
        "title": "Backpack Essentials",
        "items": [
          "Backpack (appropriate size for trip length)",
          "Rain cover for backpack",
          "Dry bags or stuff sacks for organization",
          "Trekking poles (optional but recommended)",
          "Water bottles or hydration bladder (3L total capacity)",
          "Water filter or purification tablets",
          "Whistle (for emergency signaling)",
          "Insect repellent",
          "Personal locator beacon or satellite messenger (optional)"
        ]
      },
      {
        "title": "Food & Kitchen",
        "items": [
          "Meals for each day (plus one extra day)",
          "High-energy snacks (nuts, energy bars, dried fruit)",
          "Electrolyte powder or tablets",
          "Camp stove and fuel (for overnight trips)",
          "Cooking pot and utensils",
          "Biodegradable soap",
          "Bear canister or bear bag (if required in area)",
          "Trash bags (pack out all waste)"
        ]
      },
      {
        "title": "Shelter & Sleep System (Overnight Trips)",
        "items": [
          "Tent with stakes and guylines",
          "Sleeping bag (rated for expected temperatures)",
          "Sleeping pad (insulated for warmth)",
          "Pillow or stuff sack filled with clothes",
          "Camp shoes or sandals (for comfort at camp)"
        ]
      },
      {
        "title": "Personal Items",
        "items": [
          "Toilet paper and trowel (for digging cat holes)",
          "Hand sanitizer",
          "Toothbrush and toothpaste",
          "Medications (personal prescriptions)",
          "Sunscreen (SPF 30+)",
          "Lip balm with SPF",
          "Personal hygiene items",
          "Permits and identification"
        ]
      },
      {
        "title": "Optional Items",
        "items": [
          "Camera or smartphone",
          "Portable power bank",
          "Journal and pen",
          "Field guides (plants, birds, etc.)",
          "Binoculars",
          "Fishing gear (if permitted)",
          "Book or e-reader",
          "Playing cards",
          "Hiking app subscription (AllTrails, Gaia GPS)"
        ]
      }
    ]
  }
}
```

### Minimal Required Template

```json
{
  "meta": {
    "content_type": "checklist",
    "category": "your-category"
  },
  "seo": {
    "title": "Your Checklist Title (30-60 characters)",
    "description": "Your meta description explaining what this checklist covers and who it's for. Should be 120-160 characters long.",
    "keywords": ["checklist", "packing list", "essentials"]
  },
  "content": {
    "intro": "<p>Brief introduction to this checklist and how to use it.</p>",
    "sections": [
      {
        "title": "Section 1 Title",
        "items": [
          "Checklist item 1",
          "Checklist item 2",
          "Checklist item 3"
        ]
      },
      {
        "title": "Section 2 Title",
        "items": [
          "Checklist item 1",
          "Checklist item 2"
        ]
      }
    ]
  }
}
```

---

## Field Definitions and Best Practices

### Common SEO Fields

**`seo.title`** (30-60 characters)
- Include primary keyword near the beginning
- Use compelling language to increase click-through rate
- Format: "Primary Keyword: Secondary Benefit | Brand"
- Example: "Best Hiking Backpacks 2026: Expert Reviews | The Travel Backpack"

**`seo.description`** (120-160 characters)
- Expand on title with specific value proposition
- Include secondary keywords naturally
- Add a call-to-action when possible
- Must be within character limits for proper display

**`keywords`** (3-10 keywords)
- Primary keyword (exact match to target search)
- Secondary keywords (related searches)
- Long-tail variations (more specific queries)
- Avoid keyword stuffing - use naturally

### Category Guidelines

**Posts:**
- `guide` - How-to articles, comprehensive guides
- `tips` - Quick tips, listicles, advice articles
- `gear` - Product reviews, gear comparisons
- `destination` - Travel destination guides, itineraries

**Other Collections:**
- Use lowercase, hyphen-separated category names
- Keep categories consistent for better organization
- Examples: `travel-gear`, `hiking-gear`, `packing-lists`, `backpack-comparisons`

### Image Guidelines

**Paths:**
- Use relative paths: `/images/filename.jpg`
- Or full URLs: `https://thetravelbackpack.com/images/filename.jpg`

**Naming Convention:**
- Use descriptive, SEO-friendly names: `osprey-atmos-ag-65.jpg`
- Avoid: `IMG_1234.jpg`, `photo.jpg`

**Sizes:**
- Featured images: 1200x630px (ideal for social sharing)
- Product images: 800x800px minimum
- Optimize for web (<200KB per image)

### Affiliate Disclosure

**When to use `affiliate_disclosure: true`:**
- Content contains affiliate links
- Product recommendations with commissions
- Sponsored content or partnerships

This triggers a disclosure notice on the page for legal compliance.

---

## Validation and Testing

### Before Publishing

1. **Validate JSON**: Use a JSON validator (jsonlint.com)
2. **Check character counts**:
   - SEO title: 30-60 chars
   - SEO description: 120-160 chars
3. **Verify URLs**: All affiliate_urls must be valid
4. **Test images**: Ensure all image paths are accessible
5. **Review tags**: Max 10 tags for posts

### Common Errors

**Posts:**
```
❌ category: "Gear" → ✅ category: "gear" (must be lowercase)
❌ tags: "hiking" → ✅ tags: ["hiking"] (must be array)
❌ date: "March 17, 2026" → ✅ date: 2026-03-17 (YYYY-MM-DD)
```

**All Collections:**
```
❌ seo.title: "Best Backpacks" (too short, only 14 chars)
❌ seo.description: "Great backpacks!" (too short, only 17 chars)
❌ content_type: "buying guide" → ✅ content_type: "buying-guide"
```

---

## Quick Reference: File Locations

```
site/src/content/
├── posts/                  # Blog posts (.md, .mdx)
│   ├── best-hiking-backpack.md
│   └── packing-tips.md
├── buying-guides/          # Buying guides (.json)
│   └── best-travel-backpacks-2026.json
├── comparisons/            # Product comparisons (.json)
│   └── osprey-vs-deuter.json
└── checklists/             # Packing checklists (.json)
    └── hiking-checklist.json
```

---

## Agent Instructions

When creating content programmatically:

1. **Choose the correct content type** based on the content format
2. **Use the appropriate template** from this document
3. **Validate all required fields** are present
4. **Check character limits** for SEO fields
5. **Use consistent naming conventions** for files and categories
6. **Optimize images** before adding paths
7. **Test JSON validity** before committing

For AI agents: Copy the relevant minimal or full template, fill in the values, and validate before saving.
