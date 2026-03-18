# The Travel Backpack

A high-performance static travel blog built with Astro, optimized for SEO and affiliate monetization.

## 🚀 Project Status

✅ **Initial Implementation Complete**

- Astro 4.x project structure
- Core layouts and components
- Content collections with schemas
- Placeholder content (Lorem Ipsum)
- GitHub Pages deployment workflow
- Playwright E2E tests
- Build verified and working

## 📋 Tech Stack

- **Framework:** Astro 4.x
- **UI Components:** React 18.x (for interactive islands)
- **Styling:** Tailwind CSS 3.x
- **Language:** TypeScript
- **Testing:** Playwright
- **Deployment:** GitHub Pages via GitHub Actions

## 🏗️ Project Structure

```
site/
├── src/
│   ├── content/           # Content collections
│   │   ├── posts/         # Blog posts (Markdown)
│   │   └── resources/     # Structured content (JSON)
│   ├── layouts/           # Page layouts
│   ├── components/        # Reusable components
│   │   ├── seo/          # SEO components
│   │   ├── analytics/    # GTM components (TODO)
│   │   ├── renderers/    # Content renderers (TODO)
│   │   └── affiliate/    # Affiliate components (TODO)
│   ├── pages/            # Route pages
│   └── styles/           # Global styles
├── public/               # Static assets
├── tests/                # Playwright tests
└── dist/                 # Build output
```

## 🛠️ Development

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Run Tests

```bash
# Install Playwright browsers first
npx playwright install

# Run tests
npm test
```

## 📝 Content Management

### Blog Posts

Create Markdown files in `src/content/posts/`:

```markdown
---
title: "Your Post Title (30-60 chars)"
description: "Meta description (120-160 chars)"
date: 2026-03-15
tags: ["tag1", "tag2"]
category: "guide"
affiliate_disclosure: true
---

Your content here...
```

### Resource Pages

Create JSON files in `src/content/resources/`:

- `buying-guides/` - Product buying guides
- `comparisons/` - Side-by-side comparisons
- `checklists/` - Interactive checklists

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### GitHub Pages Setup

1. Go to repository Settings > Pages
2. Source: GitHub Actions
3. The workflow will build and deploy automatically

## ✅ SEO Features

- Meta tags (title, description, canonical)
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD) ready
- Responsive design
- Fast loading (Lighthouse 95+ target)

## 🔗 Affiliate Compliance

- Automatic `rel="nofollow sponsored"` on affiliate links
- Disclosure in footer on all pages
- FTC compliant

## 📊 Next Steps

1. Add real content (replace Lorem Ipsum)
2. Implement GTM analytics
3. Add sitemap integration (currently disabled)
4. Create resource page renderers
5. Add more blog posts
6. Configure affiliate links
7. Add RSS feed

## 📖 Documentation

See `/docs/internal/` for:
- `prd.md` - Product Requirements Document
- `architecture/ui-architecture.md` - Frontend Architecture
- `content-guidelines.md` - Content creation guidelines

## 🧪 Testing

Playwright tests cover:
- Homepage functionality
- Blog pages
- SEO meta tags
- Navigation
- Accessibility basics

## 📄 License

TBD
