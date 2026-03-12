# Product Requirements Document: Travel Blog with Affiliate Monetization

**Version:** 1.0
**Date:** 2026-03-07
**Status:** Draft
**Owner:** NomadBitcoin

---

## Executive Summary

A high-performance static travel blog built with Astro, optimized for SEO and affiliate monetization. The platform enables content creation through both technical (markdown) and non-technical (CMS) workflows, with built-in affiliate link management and analytics tracking.

### Success Metrics

**Primary Goal:** Quality traffic with volume

**Performance Metrics:**
- **Lighthouse Score:** 95+ on all metrics (Performance, SEO, Accessibility, Best Practices)
- **Core Web Vitals:** Pass all metrics (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Page Speed:** First Contentful Paint < 1.5s

**Traffic Metrics:**
- **Organic Traffic:** Primary growth indicator
- **Bounce Rate:** < 60% (indicates quality content)
- **Average Session Duration:** > 2 minutes
- **Pages Per Session:** > 1.5

**SEO Metrics:**
- **Indexed Pages:** 90%+ of published content
- **Keyword Rankings:** Track position for target keywords
- **Backlinks:** Quality over quantity, track referring domains
- **Domain Authority:** Monitor month-over-month growth

**Engagement Metrics:**
- **Affiliate Click-Through Rate:** > 3% of page views
- **Scroll Depth:** > 50% on average
- **Return Visitor Rate:** > 20%

**Content Metrics:**
- **Content Velocity:** Sustainable publishing cadence (quality > quantity)
- **Content Depth:** Average post word count 1,500-2,500 words
- **Content Freshness:** Regular updates to evergreen content

---

## Product Vision

### Problem Statement
WordPress and traditional CMS platforms introduce unnecessary overhead, security vulnerabilities, and performance penalties for content creators who want:
- Fast loading times (better SEO and user experience)
- Simple affiliate link integration
- Low/zero hosting costs
- Modern development workflow

### Solution
Static site generator (Astro) with headless CMS providing:
- WordPress-like editing experience
- Zero-JavaScript static performance
- Free hosting on GitHub Pages
- Built-in SEO and analytics
- Reusable affiliate link components

---

## Target Users

### Primary Persona: Content Creator (You)
- **Role:** Travel blogger, affiliate marketer
- **Technical Level:** Developer-comfortable, prefers code flexibility
- **Goals:**
  - Write engaging travel content
  - Monetize through affiliate partnerships
  - Minimize platform maintenance
  - Track performance metrics

### Secondary Persona: Future Contributors (Optional)
- **Role:** Guest writers, collaborators
- **Technical Level:** Non-technical
- **Goals:**
  - Easy content submission via CMS
  - No code/Git knowledge required

---

## Core Features

### 1. Content Management

#### 1.1 Markdown-Based Content
**Priority:** P0 (Must-have)

- Blog posts written in markdown with frontmatter
- Content stored in Git repository
- Version control for all content changes
- Support for MDX (Markdown + JSX components)

**Acceptance Criteria:**
```markdown
---
title: "Ultimate Bali Travel Guide"
description: "Complete guide to visiting Bali"
date: 2026-03-07
tags: ["bali", "indonesia", "southeast-asia"]
featured_image: "./images/bali-hero.jpg"
affiliate_disclosure: true
draft: false
---

Content here...
```

#### 1.2 Headless CMS (Decap CMS)
**Priority:** P1 (Should-have)

- Web-based content editor at `/admin`
- Rich text editing with preview
- Media library for image uploads
- Draft/publish workflow
- GitHub authentication

**User Story:**
> As a content creator, I can write and publish blog posts through a visual interface without touching code.

#### 1.3 Content Collections
**Priority:** P0

- Type-safe content schema
- Automatic validation
- Collections: Posts, Pages, Authors (future)

**Schema Example:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    featured_image: z.string().optional(),
    affiliate_disclosure: z.boolean().default(false),
  }),
});
```

---

### 2. Affiliate Link Management

#### 2.1 Link Attribution Strategy
**Priority:** P0

**Implementation:**
- Affiliate links: `rel="nofollow sponsored"` (Google compliance)
- Editorial links: No rel (dofollow)
- External links: `target="_blank" rel="noopener"`

**Code Standard:**
```html
<!-- Affiliate -->
<a href="https://booking.com/?aid=12345"
   rel="nofollow sponsored"
   target="_blank">Book Hotel</a>

<!-- Editorial -->
<a href="https://officialtourism.com"
   rel="noopener"
   target="_blank">Tourism Board</a>
```

#### 2.2 Affiliate Disclosure
**Priority:** P0 (Legal requirement)

- Global disclosure in footer
- Per-post disclosure (when `affiliate_disclosure: true`)
- Inline disclosure in affiliate components

**Example:**
```
⚠️ Disclosure: This post contains affiliate links.
If you book through these links, I earn a small commission
at no extra cost to you. I only recommend services I've used.
```

#### 2.3 Reusable Affiliate Components
**Priority:** P1

**Components:**
- `<AffiliateLink>` - Simple text link with disclosure
- `<HotelCard>` - Hotel booking widget
- `<ProductBox>` - Travel gear recommendations
- `<ComparisonTable>` - Service comparisons
- `<BookingWidget>` - Embedded booking forms

**Example Usage:**
```astro
<HotelCard
  name="The Legian Bali"
  location="Seminyak Beach"
  price="250"
  rating="4.8"
  bookingUrl="https://booking.com/hotel?aid=123"
  image="/images/legian.jpg"
/>
```

#### 2.4 Affiliate Partner Integration
**Priority:** TBD

**Potential Partners:**
- Booking.com (hotels)
- Airbnb (accommodations)
- Amazon Associates (travel gear)
- GetYourGuide (tours/activities)
- Skyscanner/Kiwi.com (flights)

**Configuration:**
```typescript
// src/config/affiliates.ts
export const AFFILIATES = {
  booking: { aid: 'YOUR_ID', baseUrl: 'https://booking.com' },
  amazon: { tag: 'YOUR_TAG', baseUrl: 'https://amazon.com' },
  // ...
};
```

**Note:** Specific partners to be determined based on content niche and approval status.

---

### 3. SEO & Performance

#### 3.1 Core SEO Features
**Priority:** P0

- **Meta tags:** Title, description, canonical URL
- **Open Graph:** Social sharing optimization
- **Twitter Cards:** Twitter-specific metadata
- **Structured data:** JSON-LD for articles
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Crawler directives
- **RSS feed:** Full-content RSS
- **LLMs.txt:** AI-optimized site index with all posts and links

**Implementation:**
```astro
---
// src/layouts/BlogPost.astro
import { SEO } from 'astro-seo';
---

<SEO
  title={post.data.title}
  description={post.data.description}
  openGraph={{
    basic: {
      title: post.data.title,
      type: "article",
      image: post.data.featured_image,
    },
    article: {
      publishedTime: post.data.date.toISOString(),
      authors: ["NomadBitcoin"],
      tags: post.data.tags,
    }
  }}
  twitter={{
    card: "summary_large_image",
  }}
/>
```

#### 3.2 Performance Optimization
**Priority:** P0

**Targets:**
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Font optimization (system fonts)
- CDN delivery (GitHub Pages CDN)

#### 3.3 Image Optimization
**Priority:** P0

**Requirements:**
- Automatic format conversion (WebP/AVIF)
- Responsive image generation
- Lazy loading by default
- Width/height attributes (prevent CLS)

**Implementation:**
```astro
import { Image } from 'astro:assets';

<Image
  src={featuredImage}
  alt={title}
  width={1200}
  height={630}
  format="webp"
  loading="lazy"
/>
```

---

### 4. Analytics & Tracking

#### 4.1 Core Analytics
**Priority:** P1

**Google Tag Manager:**
- Centralized tag management
- Custom event tracking without code changes
- Multiple analytics platforms support
- A/B testing integration ready

**Tracked Metrics:**
- Page views and session data
- Traffic sources and referrers
- Geographic distribution
- Device/browser breakdowns

**Custom Events (via GTM):**
- Affiliate link clicks (platform, destination)
- Booking widget interactions
- Scroll depth tracking
- External link clicks
- Newsletter signups (future)
- Social shares

**Implementation:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- Track affiliate clicks via dataLayer -->
<script>
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'affiliate_click',
  'platform': 'booking',
  'destination': 'bali'
});
</script>
```

#### 4.2 Privacy-Friendly Alternative
**Priority:** P2 (Nice-to-have)

**Plausible Analytics:**
- GDPR-compliant
- No cookie banner required
- Lightweight script (<1KB)
- Real-time dashboard

---

### 5. Content Types & Structure

#### 5.1 Content Architecture: JSON-First

**Core Principle:** Content and design are fully separated.
- **Content** = JSON files with structured data (AI-generated or human-authored)
- **Design** = Astro components that consume JSON and render HTML
- Redesigning a page never requires touching content files
- Each content type has its own JSON schema and dedicated renderer component

**Two content formats:**

| Format | Used For | Astro Collection Type |
|--------|----------|-----------------------|
| JSON | All structured/programmatic pages | `type: 'data'` |
| Markdown | Narrative blog posts only | `type: 'content'` |

**Content creation flow:**
```
AI pipeline → JSON file (validated schema) → Astro build → Static HTML page
```

---

#### 5.2 Resource Pages (Bulk of site)
**Priority:** P0

Resource pages are the primary page type. They are fully static HTML, SEO-optimized, and generated from structured JSON. Each content type has its own schema and renderer.

**Content type groups:**

**Idea Lists**
- Business idea lists by niche, budget, skill level
- Side hustle ideas
- URL: `/resources/[niche]/business-ideas/`

**Checklists**
- Step-by-step process checklists
- Requirements checklists (legal, technical, launch)
- Interactive checkboxes rendered client-side (JS island)
- URL: `/resources/[niche]/checklist/`

**Guides**
- How-to guides with numbered steps
- Beginner → advanced breakdowns
- URL: `/resources/[niche]/guide/`

**Templates**
- Document templates with copyable sections
- URL: `/resources/[niche]/templates/`

**Calendars**
- Deadline calendars, seasonal planning
- URL: `/resources/[niche]/calendar/`

**Glossaries**
- Term definitions with anchor links
- Highly linkable, long-tail keyword value
- URL: `/resources/[niche]/glossary/`

**Statistics Pages**
- Curated data and stats with citations
- URL: `/resources/[niche]/statistics/`

**Comparison Pages**
- Side-by-side feature/service comparisons
- Rendered as structured HTML tables
- URL: `/resources/[niche]/compare/`

**Example JSON schema (idea list):**
```typescript
interface ResourceArticle {
  meta: {
    content_type: string;
    niche: string;
  };
  seo: {
    title: string;       // templated, not AI-generated
    description: string;
    keywords: string[];
  };
  content: {
    intro: string;
    sections: {
      heading: string;
      items: {           // 15-20 per section
        title: string;
        description: string;
        difficulty?: 'beginner' | 'intermediate' | 'advanced';
        potential?: 'high' | 'medium' | 'standard';
      }[];
    }[];
    pro_tips: string[];  // exactly 5
  };
}
```

---

#### 5.3 Tool Pages
**Priority:** P1

Tool pages are static HTML wrappers with one interactive component (Astro Island). Search engines index all surrounding content; the tool itself runs client-side only.

**Architecture:**
```astro
---
// Static wrapper — fully rendered HTML
import Calculator from '../components/tools/Calculator.tsx';
---

<h1>Freelance Rate Calculator</h1>        <!-- indexed by search engines -->
<p>Use this calculator to...</p>           <!-- indexed -->
<Calculator client:idle />                 <!-- hydrates when browser is idle -->
<section>How to use this tool...</section> <!-- indexed -->
```

**Hydration strategy:**
- `client:load` — tool is above the fold, needed immediately
- `client:idle` — tool is below the fold, loads when browser is idle
- `client:visible` — tool loads only when scrolled into view

**Tool types in scope:**
- **Calculators** — rate, budget, ROI, cost estimators
- **Filter Tables** — filterable/sortable data tables
- **Unit Converters** — currency, measurements, time zones
- **Quizzes / Assessments** — decision support flows
- **Word/Character Counters** — writing utilities

**URL structure:** `/tools/[tool-name]/`

---

#### 5.4 Blog Posts
**Priority:** P1

Narrative content written in Markdown. Separate from resource pages.

**Content Structure:**
- Hero image
- Title + subtitle
- Reading time estimate
- Publication date
- Tag navigation
- Table of contents (for long posts)
- Related posts (bottom)
- Social share buttons

**URL Structure:**
```
/blog/ultimate-bali-travel-guide/
/blog/best-hotels-in-tokyo/
/blog/travel-gear-essentials/
```

#### 5.5 Static Pages
**Priority:** P1

- **About:** Author bio, travel philosophy
- **Destinations:** Destination index
- **Gear:** Recommended travel gear
- **Contact:** Contact form or email
- **Privacy Policy:** Legal requirement
- **Affiliate Disclosure:** FTC compliance

#### 5.6 Taxonomy & Navigation
**Priority:** P1

**Tag System:**
- Destination tags: `bali`, `tokyo`, `lisbon`
- Activity tags: `beaches`, `hiking`, `food`
- Trip type tags: `budget-travel`, `luxury`, `digital-nomad`

**Tag Pages:**
```
/tags/bali/
/tags/budget-travel/
```

---

### 5.7 Expansion Path

The architecture is designed for incremental complexity:

| Phase | Content Types | Tools |
|-------|--------------|-------|
| v1 | Checklists, idea lists, basic guides | None |
| v2 | Comparisons, glossaries, statistics, templates | Simple calculators, filter tables |
| v3 | Calendars, quizzes, decision trees | Multi-step tools, assessments |

Adding a new content type requires:
1. Define JSON schema
2. Add Astro `type: 'data'` collection
3. Build one renderer component
4. No changes to existing pages or content

---

### 6. Deployment & Infrastructure

#### 6.1 Hosting
**Priority:** P0

**GitHub Pages:**
- Free hosting
- Custom domain support
- Free SSL certificate
- CDN distribution
- Unlimited bandwidth

**Domain:**
- Custom domain (e.g., `nomadbitcoin.travel`)
- DNS configuration via Cloudflare (optional)

#### 6.2 CI/CD Pipeline
**Priority:** P0

**GitHub Actions Workflow:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Build Trigger:** Git push to `main` branch

**Deployment Time:** < 3 minutes

#### 6.3 Development Workflow
**Priority:** P1

**Branches:**
- `main` - Production (auto-deploys)
- `staging` - Preview environment (optional)
- Feature branches - Development work

**Review Process:**
1. Write post (markdown or CMS)
2. Preview locally (`npm run dev`)
3. Commit to Git
4. Push to `main`
5. Auto-deploy to production

---

### 7. Design & UX

#### 7.1 Responsive Design
**Priority:** P0

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Mobile-First:** All components designed for mobile first

#### 7.2 Design System
**Priority:** P1

**Typography:**
- Headings: System font stack (SF Pro, Segoe UI, Roboto)
- Body: System font stack
- Code: Monospace (Consolas, Monaco)

**Colors:**
- Primary: Travel-themed (blues/greens)
- Accent: Call-to-action buttons (orange/red)
- Neutral: Text and backgrounds

**Components:**
- Buttons (primary, secondary, affiliate)
- Cards (blog cards, hotel cards)
- Navigation (header, footer, breadcrumbs)
- Forms (search, newsletter)

#### 7.3 Accessibility
**Priority:** P1

**Requirements:**
- WCAG 2.1 AA compliance
- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation
- Skip-to-content link
- Alt text for all images

---

## Technical Architecture

### Tech Stack

**Core:**
- **Framework:** Astro 4.x
- **Language:** TypeScript
- **CSS:** Tailwind CSS (or vanilla CSS)
- **Markdown:** MDX support
- **Interactive Islands:** React (via `@astrojs/react`) — only for tool components

**Content:**
- **Structured pages:** JSON files (`type: 'data'` Astro collections)
- **Blog posts:** Markdown/MDX (`type: 'content'` Astro collections)
- **CMS:** Decap CMS (formerly Netlify CMS) — P1, blog posts only
- **Images:** Astro's built-in image optimization
- **Forms:** Formspree or Netlify Forms

**Integrations:**
- `@astrojs/sitemap`
- `@astrojs/rss`
- `@astrojs/mdx`
- `@astrojs/react` (for interactive tool islands)
- `@astrojs/tailwind` (optional)

**Analytics & Tracking:**
- **Google Tag Manager:** Centralized tag and event management
- **dataLayer:** Custom event tracking implementation
- **No direct GA4 integration:** All analytics routed through GTM

**Deployment:**
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Domain:** Custom domain + Cloudflare DNS

### Project Structure

```
tbd-project/
├── src/
│   ├── content/
│   │   ├── config.ts                    # All collection schemas
│   │   ├── posts/                       # Blog posts (markdown, type: 'content')
│   │   │   ├── bali-guide.md
│   │   │   └── tokyo-hotels.mdx
│   │   └── resources/                   # Structured pages (JSON, type: 'data')
│   │       ├── idea-lists/              # Business/side hustle idea lists
│   │       │   └── freelance-ideas.json
│   │       ├── checklists/              # Process & requirements checklists
│   │       │   └── launch-checklist.json
│   │       ├── guides/                  # How-to guides
│   │       ├── templates/               # Document templates
│   │       ├── calendars/               # Deadline & planning calendars
│   │       ├── glossaries/              # Term definitions
│   │       ├── statistics/              # Data & stats pages
│   │       └── comparisons/             # Side-by-side comparisons
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Global layout with GTM
│   │   ├── BlogPost.astro               # Markdown post layout
│   │   └── ResourcePage.astro           # Shared layout for all resource types
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── GTM.astro
│   │   │   └── DataLayer.astro
│   │   ├── seo/
│   │   │   ├── SEOHead.astro
│   │   │   ├── StructuredData.astro
│   │   │   └── Breadcrumbs.astro
│   │   ├── renderers/                   # One renderer per content type
│   │   │   ├── IdeaListRenderer.astro
│   │   │   ├── ChecklistRenderer.astro
│   │   │   ├── GuideRenderer.astro
│   │   │   ├── TemplateRenderer.astro
│   │   │   ├── CalendarRenderer.astro
│   │   │   ├── GlossaryRenderer.astro
│   │   │   ├── StatisticsRenderer.astro
│   │   │   └── ComparisonRenderer.astro
│   │   ├── tools/                       # Interactive islands (React)
│   │   │   ├── Calculator.tsx
│   │   │   ├── FilterTable.tsx
│   │   │   └── UnitConverter.tsx
│   │   ├── affiliate/
│   │   │   ├── AffiliateLink.astro
│   │   │   ├── HotelCard.astro
│   │   │   └── ComparisonTable.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── FAQ.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   └── [...slug].astro          # Dynamic blog routes
│   │   ├── resources/
│   │   │   └── [...slug].astro          # Dynamic resource routes
│   │   ├── tools/
│   │   │   └── [...slug].astro          # Dynamic tool routes
│   │   ├── about.astro
│   │   ├── rss.xml.ts
│   │   └── sitemap.xml.ts
│   ├── utils/
│   │   ├── seo.ts
│   │   └── gtm.ts
│   └── styles/
│       └── global.css
├── public/
│   ├── admin/                           # Decap CMS (P1)
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/
│   └── favicon.svg
├── docs/
│   └── internal/
│       ├── prd.md
│       ├── content-rules.md
│       ├── content-guidelines.md
│       └── llms.txt
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## SEO & Content Standards Enforcement

### Architecture for SEO Compliance

**Content Schema Validation:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    // Required SEO fields
    title: z.string().min(30).max(60),  // SEO title length
    description: z.string().min(120).max(160),  // Meta description
    slug: z.string().regex(/^[a-z0-9-]+$/),  // URL-friendly

    // Content metadata
    date: z.date(),
    updated: z.date().optional(),
    author: z.string().default('NomadBitcoin'),

    // SEO taxonomies
    tags: z.array(z.string()).min(3).max(10),
    category: z.enum(['guide', 'tips', 'gear', 'destination']),

    // Content type for schema.org
    content_type: z.enum(['article', 'faq', 'howto', 'review']).default('article'),

    // Media
    featured_image: z.object({
      src: z.string(),
      alt: z.string().min(10),  // Enforces descriptive alt text
      width: z.number(),
      height: z.number(),
    }),

    // Affiliate & legal
    affiliate_disclosure: z.boolean().default(false),

    // SEO optimization
    focus_keyword: z.string().optional(),
    related_keywords: z.array(z.string()).optional(),

    // Quality control
    word_count_target: z.number().min(1500),
    draft: z.boolean().default(false),
  }),
});
```

**GTM Integration Architecture:**

```typescript
// src/utils/gtm.ts
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export function pushToDataLayer(eventData: GTMEvent) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
}

export const GTMEvents = {
  affiliateClick: (platform: string, destination: string) => ({
    event: 'affiliate_click',
    platform,
    destination,
    timestamp: new Date().toISOString(),
  }),

  scrollDepth: (percentage: number) => ({
    event: 'scroll_depth',
    depth: percentage,
  }),

  contentEngagement: (action: string, label: string) => ({
    event: 'content_engagement',
    action,
    label,
  }),
};
```

**SEO Component Standards:**

```astro
---
// src/components/seo/SEOHead.astro
interface Props {
  title: string;
  description: string;
  canonical: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  type?: 'article' | 'website';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const {
  title,
  description,
  canonical,
  image,
  type = 'article',
  publishedTime,
  modifiedTime,
  tags = [],
} = Astro.props;

const siteUrl = Astro.site?.toString() || 'https://example.com';
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonical} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:site_name" content="Site Name" />
{image && (
  <>
    <meta property="og:image" content={new URL(image.src, siteUrl).toString()} />
    <meta property="og:image:width" content={image.width.toString()} />
    <meta property="og:image:height" content={image.height.toString()} />
    <meta property="og:image:alt" content={image.alt} />
  </>
)}
{type === 'article' && publishedTime && (
  <meta property="article:published_time" content={publishedTime} />
)}
{type === 'article' && modifiedTime && (
  <meta property="article:modified_time" content={modifiedTime} />
)}
{type === 'article' && tags.map(tag => (
  <meta property="article:tag" content={tag} />
))}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonical} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{image && (
  <meta name="twitter:image" content={new URL(image.src, siteUrl).toString()} />
)}

<!-- Mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#ffffff" />
```

**Structured Data Architecture:**

```astro
---
// src/components/seo/StructuredData.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'posts'>;
  url: string;
}

const { post, url } = Astro.props;
const { title, description, date, author, featured_image, content_type } = post.data;

// Base Article schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  image: featured_image.src,
  datePublished: date.toISOString(),
  dateModified: post.data.updated?.toISOString() || date.toISOString(),
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Site Name',
    logo: {
      '@type': 'ImageObject',
      url: '/logo.png',
    },
  },
};

// FAQ schema (if applicable)
const faqSchema = content_type === 'faq' ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [], // Populated from content
} : null;
---

<script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
{faqSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
)}
```

**LLMs.txt Generation:**

Located at `docs/internal/llms.txt` and auto-generated during build to reflect current PRD state.

```typescript
// Build script snippet (GitHub Actions integration)
// Generates docs/internal/llms.txt from current PRD and content

const llmsTxt = `# Travel Blog Platform PRD

> AI-optimized project index for LLM context

## Project Overview

- **Status:** In Planning
- **Framework:** Astro 4.x + TypeScript
- **Hosting:** GitHub Pages
- **Primary Goal:** Quality organic traffic with SEO optimization

## Documentation

- [PRD](./prd.md) - Product requirements and technical architecture
- [Content Rules](./content-rules.md) - Link attribution and affiliate guidelines
- [Content Guidelines](./content-guidelines.md) - AI agent content creation standards

## Technical Stack

- **Frontend:** Astro 4.x (static site generator)
- **Language:** TypeScript
- **Analytics:** Google Tag Manager (GTM)
- **CMS:** Decap CMS (optional, P1)
- **SEO:** Sitemap, RSS, Structured Data (Article/FAQ/HowTo/Review)
- **Deployment:** GitHub Actions → GitHub Pages

## Key Features

1. Content Collections with Schema Validation
2. SEO-optimized components (meta tags, Open Graph, Twitter Cards)
3. Structured data (JSON-LD) for all content types
4. GTM integration with custom event tracking
5. Affiliate link management with disclosure compliance
6. Image optimization (WebP/AVIF)
7. Build-time SEO validation

## Content Types Supported

- Long-form guides (Article schema)
- FAQ pages (FAQPage schema)
- How-to guides (HowTo schema)
- Product reviews (Review schema)
- Listicles
- Destination pages

## SEO Standards Enforced

- Title: 30-60 characters
- Meta description: 120-160 characters
- Alt text: 10+ characters (descriptive)
- Heading hierarchy: H1 → H2 → H3
- Internal links: 3+ per article
- Keyword optimization without stuffing

## Affiliate Compliance

- All affiliate links: rel="nofollow sponsored"
- Disclosure required on all pages with affiliate content
- FTC compliance enforced

---
Last updated: ${new Date().toISOString()}
Project: /Users/nomadbitcoin/Projects/coding-sessions/seo/blogging/tbd-project
`;
```

**This llms.txt file is generated and placed in `docs/internal/llms.txt` to provide AI assistants with quick context about the PRD and project structure.**

**Build-Time SEO Validation:**

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... other config

  // Build hooks for SEO validation
  integrations: [
    {
      name: 'seo-validator',
      hooks: {
        'astro:build:done': async ({ pages }) => {
          // Validate all pages meet SEO standards
          for (const page of pages) {
            // Check title length
            // Check meta description
            // Validate image alt text
            // Check heading structure (H1, H2 hierarchy)
            // Validate internal links
          }
        },
      },
    },
  ],
});
```

---

## Monetization Strategy

### Affiliate Partners

**Status:** TBD - To be determined based on content niche selection and program approval

**Potential Partners (Examples):**

1. **Booking.com** (Hotels)
   - Typical Commission: 25-40%
   - Cookie Duration: 30 days
   - Integration: Direct links + widgets

2. **Airbnb** (Accommodations)
   - Typical Commission: Variable per booking
   - Cookie Duration: 30 days
   - Integration: Referral links

3. **Amazon Associates** (Gear)
   - Typical Commission: 1-10%
   - Cookie Duration: 24 hours
   - Integration: Product boxes

4. **GetYourGuide** (Tours)
   - Typical Commission: 8-12%
   - Cookie Duration: 90 days
   - Integration: Activity widgets

**Note:** Actual partnerships, commissions, and integration methods will be finalized after content niche is defined and affiliate applications are approved.

### Content Strategy

**Content Pillars:** TBD based on niche selection

**Affiliate Integration Principles:**
- Natural placement in content
- Always provide value first
- Transparent disclosure
- Multiple options (not just highest commission)
- Quality recommendations over quantity

---

## Success Criteria

**Timeline:** TBD based on implementation schedule and content strategy

**Launch Checklist:**
- ✅ Site deployed with production-ready performance (Lighthouse 95+)
- ✅ Core technical infrastructure operational
- ✅ Sitemap submitted to Google Search Console
- ✅ Google Tag Manager configured and tracking
- ✅ Initial content published (quantity TBD)
- ✅ Affiliate disclosure compliance implemented

**Growth Indicators (tracked ongoing):**
- 📈 Organic traffic growth month-over-month
- 📈 Keyword ranking improvements
- 📈 Page indexation rate
- 📈 Affiliate click-through rate
- 📈 Average session duration trending up
- 📈 Bounce rate trending down
- 📈 Return visitor percentage

**Quality Benchmarks:**
- All published content meets 1,500+ word minimum
- Core Web Vitals pass on all pages
- Mobile usability score 100%
- SEO score 95+ on all pages
- Accessibility compliance (WCAG 2.1 AA)

---

## Out of Scope (v1)

**Deferred to Future Versions:**
- ❌ Email newsletter system
- ❌ User comments
- ❌ Multi-author support
- ❌ E-commerce (selling own products)
- ❌ Membership/paywall
- ❌ Mobile app
- ❌ Video content hosting
- ❌ Multilingual support (i18n)

---

## Dependencies & Risks

### Dependencies
- GitHub Pages availability
- Affiliate program acceptance
- Domain registration
- Google Search Console access

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Affiliate program rejection | High | Apply with existing content portfolio |
| Google algorithm changes | Medium | Focus on quality content, diversify traffic |
| GitHub Pages downtime | Low | 99.9% uptime SLA, can migrate to Netlify |
| Build failures | Medium | Automated testing, staging environment |

---

## Implementation Phases

**Timeline:** TBD

### Phase 1: Foundation
- Set up Astro project structure
- Configure GitHub Pages deployment
- Implement base layout and design system
- Create core components (Header, Footer, SEO)
- Initial content (quantity TBD)
- Deploy to production

### Phase 2: Core Features
- Decap CMS integration (optional, P1)
- Affiliate link components
- SEO optimization (meta tags, sitemap, RSS)
- Google Tag Manager setup
- Analytics event tracking

### Phase 3: Content & Growth
- Content creation workflow
- Performance monitoring and optimization
- Search engine submission
- Affiliate program applications (TBD)
- Keyword tracking setup

### Phase 4: Optimization (Ongoing)
- Content publication cadence
- SEO monitoring and adjustments
- Performance tuning
- A/B testing affiliate placements
- Traffic analysis and strategy refinement

---

## Appendix

### SEO Keyword Research
**Status:** TBD - To be completed after niche selection

### Competitive Analysis
**Status:** TBD - Competitive landscape to be analyzed based on chosen niche

### Legal Requirements
- FTC affiliate disclosure compliance
- GDPR privacy policy (if EU traffic)
- Cookie consent (if using tracking cookies)
- Terms of Service

---

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | BMad Master | Initial PRD creation |
| 1.1 | 2026-03-07 | BMad Master | Updated metrics focus (quality traffic > revenue), changed analytics to GTM, set timeline/affiliates to TBD |


**Related Documentation**

- [Content Rules](./content-rules.md) - Link attribution and affiliate disclosure rules
- [Content Guidelines](./content-guidelines.md) - AI agent content creation standards with templates for all content types

---
| 1.2 | 2026-03-07 | SEO Specialist | Added SEO & Content Standards Enforcement section, GTM architecture, structured data, content schema validation, updated project structure |
| 1.3 | 2026-03-13 | BMad Master | Defined JSON-first content architecture, Astro Islands for interactive tools, full resource content type taxonomy, renderer component pattern, expansion path v1→v3 |
