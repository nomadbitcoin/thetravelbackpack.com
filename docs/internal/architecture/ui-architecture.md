# TheTravelBackpack.com Frontend Architecture Document

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-13 | 1.0 | Initial architecture document | Velocity (BMad Rapid) |

## Template and Framework Selection

### Framework Choice: Astro 4.x

The project uses **Astro 4.x** as the static site generator. This is a greenfield project with no existing codebase or starter template.

**Key Framework Characteristics:**
- **Type:** Static Site Generator (SSG) with optional Server-Side Rendering (SSR)
- **Philosophy:** Ship zero JavaScript by default, islands architecture for interactivity
- **Content-First:** Built-in content collections with TypeScript schemas
- **Integration:** Supports React islands for interactive components (tools/calculators)

**Starter Template Decision:**

No pre-made starter template is used. The project will be scaffolded using `npm create astro@latest` with the following integrations:
- Tailwind CSS for styling
- `@astrojs/react` for interactive tool islands only
- `@astrojs/sitemap` for XML sitemap generation
- `@astrojs/rss` for RSS feed
- `@astrojs/mdx` for blog posts with components

**Rationale:**
- Astro's island architecture perfectly matches PRD requirement: "static HTML with interactive islands"
- Content collections provide type-safe schemas for JSON content
- Zero JavaScript by default ensures Lighthouse 95+ performance target
- Built-in image optimization supports WebP/AVIF requirements
- GitHub Pages deployment is straightforward with static output

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| Framework | Astro | 4.x (latest) | Static site generation with islands | Zero-JS default, content collections, excellent performance |
| UI Library | React | 18.x | Interactive tool islands only | Mature ecosystem for calculators/filters, Astro has first-class support |
| State Management | Nanostores | 0.10.x | Lightweight state for islands | Astro-recommended, framework-agnostic, <1KB |
| Routing | Astro File-Based | Built-in | Page routing | No additional dependency needed, follows filesystem |
| Build Tool | Vite | 5.x | Dev server & bundling | Built into Astro, extremely fast HMR |
| Styling | Tailwind CSS | 3.x | Utility-first CSS | Rapid development, small production bundle with purging |
| Testing | Vitest | 1.x | Unit testing | Vite-native, fast, Jest-compatible API |
| Component Library | None (custom) | N/A | Custom components | Avoid bloat, build minimal components needed |
| Form Handling | Native HTML5 | N/A | Contact forms | Static site uses Formspree/Netlify Forms for backend |
| Animation | CSS Animations | Native | Minimal animations | No JS library needed, performance-first |
| Dev Tools | TypeScript, ESLint, Prettier | Latest | Type safety & code quality | Catch errors at build time, consistent formatting |

### Additional Build Tools

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| Package Manager | npm | 10.x | Dependency management | Standard, reliable, wide adoption |
| Image Optimization | Astro Assets | Built-in | WebP/AVIF conversion | No external service needed, build-time optimization |
| Analytics | Google Tag Manager | N/A | Event tracking | Centralized tag management per PRD |
| SEO Tools | astro-seo | 0.8.x | Meta tags & OG | Simplifies SEO head management |
| Content Validation | Zod | 3.x | Schema validation | Type-safe content collections, runtime validation |

**Technology Selection Rationale:**

- **Astro-first approach:** Leverage built-in capabilities before adding dependencies
- **Minimal JavaScript:** Only React for interactive tools (P1 priority), everything else static
- **Performance-oriented:** Every choice optimizes for Lighthouse 95+ target
- **Type safety:** TypeScript + Zod ensures content schema compliance at build time
- **Developer experience:** Fast HMR with Vite, familiar React for islands, Tailwind for rapid styling

## Project Structure

```
thetravelbackpack.com/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions CI/CD
├── src/
│   ├── content/
│   │   ├── config.ts                  # All content collection schemas (Zod)
│   │   ├── posts/                     # Blog posts (Markdown/MDX, type: 'content')
│   │   │   └── example-post.md
│   │   └── resources/                 # Structured pages (JSON, type: 'data')
│   │       ├── buying-guides/         # "Best X for Y" format
│   │       │   └── best-backpacks.json
│   │       ├── comparisons/           # Side-by-side comparisons
│   │       │   └── osprey-vs-gregory.json
│   │       ├── checklists/            # Interactive packing lists
│   │       │   └── packing-list.json
│   │       ├── guides/                # How-to guides
│   │       │   └── how-to-pack.json
│   │       ├── glossaries/            # Travel term definitions
│   │       │   └── travel-terms.json
│   │       └── statistics/            # Data & stats pages
│   │           └── travel-stats.json
│   ├── layouts/
│   │   ├── BaseLayout.astro           # Root layout with GTM, SEO head
│   │   ├── BlogPost.astro             # Markdown post wrapper
│   │   └── ResourcePage.astro         # Shared layout for all resource types
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── GTM.astro              # Google Tag Manager integration
│   │   │   └── DataLayer.astro        # dataLayer helper
│   │   ├── seo/
│   │   │   ├── SEOHead.astro          # Meta tags, OG, Twitter cards
│   │   │   ├── StructuredData.astro   # JSON-LD schemas
│   │   │   └── Breadcrumbs.astro      # Breadcrumb navigation
│   │   ├── renderers/                 # One renderer per content type
│   │   │   ├── BuyingGuideRenderer.astro
│   │   │   ├── ComparisonRenderer.astro
│   │   │   ├── ChecklistRenderer.astro
│   │   │   ├── GuideRenderer.astro
│   │   │   ├── GlossaryRenderer.astro
│   │   │   └── StatisticsRenderer.astro
│   │   ├── tools/                     # Interactive islands (React)
│   │   │   ├── Calculator.tsx         # Client-side calculators
│   │   │   └── FilterTable.tsx        # Filterable tables
│   │   ├── affiliate/
│   │   │   ├── AffiliateLink.astro    # Enforces rel="nofollow sponsored"
│   │   │   ├── ProductCard.astro      # Product display with affiliate link
│   │   │   └── Disclosure.astro       # FTC disclosure component
│   │   ├── Header.astro               # Global header/nav
│   │   ├── Footer.astro               # Global footer with disclosure
│   │   └── FAQ.astro                  # FAQ schema.org component
│   ├── pages/
│   │   ├── index.astro                # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro            # Blog listing
│   │   │   └── [slug].astro           # Dynamic blog routes
│   │   ├── resources/
│   │   │   └── [slug].astro           # Dynamic resource routes
│   │   ├── tools/
│   │   │   └── [slug].astro           # Tool pages (P1 priority)
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── disclosure.astro
│   │   ├── rss.xml.ts                 # RSS feed generator
│   │   └── sitemap.xml.ts             # Sitemap (via @astrojs/sitemap)
│   ├── utils/
│   │   ├── seo.ts                     # SEO helper functions
│   │   ├── gtm.ts                     # GTM event helpers
│   │   └── affiliates.ts              # Affiliate config & URL builders
│   └── styles/
│       └── global.css                 # Tailwind directives + custom CSS
├── public/
│   ├── images/                        # Static images (logos, favicons)
│   ├── favicon.svg
│   └── robots.txt                     # Crawler directives
├── docs/
│   └── internal/
│       ├── prd.md
│       ├── architecture/
│       │   └── ui-architecture.md     # This document
│       ├── content-guidelines.md
│       └── llms.txt
├── tests/
│   ├── unit/                          # Vitest unit tests
│   └── e2e/                           # Playwright E2E (P2 priority)
├── astro.config.mjs                   # Astro configuration
├── tailwind.config.mjs                # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json
├── .env.example                       # Environment variable template
└── README.md
```

**Key Organizational Principles:**

1. **Content Separation:** Blog posts (narrative) vs resources (structured JSON) are separate collections
2. **Renderer Pattern:** Each content type has dedicated renderer component - design/content fully decoupled
3. **Layouts:** Shared layouts enforce consistency across page types
4. **Islands Directory:** Interactive React components isolated in `components/tools/`
5. **Utility Functions:** Centralized helpers for SEO, GTM, and affiliate logic
6. **Type Safety:** All content schemas defined in `src/content/config.ts`

**Rationale:**

- Follows Astro's recommended file structure
- Clear separation of concerns (content, components, layouts, pages)
- Renderer components enable redesigning pages without touching content files
- Static assets in `public/` served as-is (no processing)
- Internal docs co-located with codebase for AI agent access

