# TheTravelBackpack.com - Astro Site

A modern travel backpack review and guide website built with Astro 4.x, featuring SEO-optimized content, Schema.org structured data, and flexible content management.

---

## Table of Contents

- [Overview](#overview)
- [Content Types](#content-types)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Development](#development)
- [Deployment](#deployment)

---

## Overview

**Live Site:** https://thetravelbackpack.com
**Technology Stack:**
- Astro 4.x (Static Site Generator)
- TypeScript
- Tailwind CSS
- Schema.org JSON-LD structured data
- GitHub Actions for CI/CD

**Key Features:**
- ✅ Type-safe content collections with Zod validation
- ✅ Flexible URL routing (preserves original URLs for SEO)
- ✅ Schema.org JSON-LD for rich search results
- ✅ Automatic sitemap generation
- ✅ SEO-optimized meta tags
- ✅ Multiple content formats (Markdown, JSON)
- ✅ Affiliate link support with disclosure

---

## Content Types

TheTravelBackpack.com supports four content types:

| Type | Format | Use Case | Example |
|------|--------|----------|---------|
| **Posts** | Markdown | Blog articles, guides, tips | `best-hiking-backpack.md` |
| **Buying Guides** | JSON | Product roundups with pros/cons | `best-travel-backpacks-2026.json` |
| **Comparisons** | JSON | Side-by-side product comparisons | `osprey-vs-deuter.json` |
| **Checklists** | JSON | Packing lists, trip planning checklists | `hiking-checklist.json` |

---

## Quick Start

### Development Setup

```bash
cd site
npm install
npm run dev
```

Visit: http://localhost:4321

### Creating Content

#### 1. Blog Posts (Markdown)

**Create:** `site/src/content/posts/your-article-slug.md`

```markdown
---
title: "Your Article Title"
description: "SEO description (120-160 chars)"
date: 2026-03-17
tags: ["tag1", "tag2", "tag3"]
category: "guide"
---

Your content here in Markdown format.
```

**Categories:** `guide` | `tips` | `gear` | `destination`

### 2. Buying Guides (JSON)

**Create:** `site/src/content/buying-guides/your-guide-slug.json`

```json
{
  "meta": {
    "content_type": "buying-guide",
    "category": "travel-gear"
  },
  "seo": {
    "title": "Your Guide Title (30-60 chars)",
    "description": "Your description (120-160 chars)",
    "keywords": ["keyword1", "keyword2"]
  },
  "content": {
    "intro": "<p>Introduction paragraph</p>",
    "items": [
      {
        "name": "Product Name",
        "image": "/images/product.jpg",
        "pros": ["Pro 1", "Pro 2"],
        "cons": ["Con 1", "Con 2"],
        "best_for": "Target audience",
        "verdict": "Your expert verdict"
      }
    ]
  }
}
```

### 3. Comparisons (JSON)

**Create:** `site/src/content/comparisons/product-a-vs-product-b.json`

```json
{
  "meta": {
    "content_type": "comparison",
    "category": "backpack-comparisons"
  },
  "seo": {
    "title": "Product A vs Product B (30-60 chars)",
    "description": "Comparison description (120-160 chars)",
    "keywords": ["product a vs product b"]
  },
  "content": {
    "intro": "<p>What you're comparing</p>",
    "items": [
      {
        "name": "Product A",
        "specs": {
          "Spec 1": "Value",
          "Spec 2": "Value"
        },
        "image": "/images/product-a.jpg"
      }
    ],
    "conclusion": "<p>Final verdict</p>"
  }
}
```

### 4. Checklists (JSON)

**Create:** `site/src/content/checklists/your-checklist.json`

```json
{
  "meta": {
    "content_type": "checklist",
    "category": "packing-lists"
  },
  "seo": {
    "title": "Your Checklist Title (30-60 chars)",
    "description": "Checklist description (120-160 chars)",
    "keywords": ["checklist", "packing"]
  },
  "content": {
    "intro": "<p>How to use this checklist</p>",
    "sections": [
      {
        "title": "Section Name",
        "items": ["Item 1", "Item 2", "Item 3"]
      }
    ]
  }
}
```

---

## Documentation

All documentation is now organized in the `docs/` folder:

### Content Guidelines
- **[docs/content-guidelines/CONTENT_TAXONOMY.md](docs/content-guidelines/CONTENT_TAXONOMY.md)** - Complete taxonomy & metadata strategy
- **[docs/content-guidelines/CONTENT_TEMPLATES.md](docs/content-guidelines/CONTENT_TEMPLATES.md)** - Templates for all content types
- **[docs/content-guidelines/content-guidelines.md](docs/content-guidelines/content-guidelines.md)** - AI agent content creation standards

### Technical Documentation
- **[docs/technical/BREADCRUMB_STRATEGY.md](docs/technical/BREADCRUMB_STRATEGY.md)** - Breadcrumb implementation
- **[docs/technical/MULTI_URL_STRATEGY.md](docs/technical/MULTI_URL_STRATEGY.md)** - Multi-URL SEO testing
- **[docs/technical/MULTI_URL_CHANGES.md](docs/technical/MULTI_URL_CHANGES.md)** - Implementation checklist
- **[docs/technical/SITE_SETUP.md](docs/technical/SITE_SETUP.md)** - Site setup guide

### Internal Documentation
- **[docs/internal/prd.md](docs/internal/prd.md)** - Product requirements document
- **[docs/internal/architecture/ui-architecture.md](docs/internal/architecture/ui-architecture.md)** - UI architecture
- **[docs/internal/IMPLEMENTATION_SUMMARY.md](docs/internal/IMPLEMENTATION_SUMMARY.md)** - Initial implementation summary

---

## Development

```bash
cd site
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## Deployment

Automatic deployment to GitHub Pages on push to `main`:

```bash
git push origin main
# GitHub Actions will build and deploy automatically
```

**Workflow:** `.github/workflows/deploy.yml`

---

## Support

For questions or issues:
- Open an issue in the GitHub repository
- Review existing documentation files
- Check `CONTENT_TEMPLATES.md` for content creation help

---

**Generated with [Claude Code](https://claude.ai/code) via [Happy](https://happy.engineering)**
