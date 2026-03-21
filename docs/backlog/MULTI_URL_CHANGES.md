# Changes Required for Multi-URL Support

## Summary
✅ **No changes needed** for canonical tags (already working)
✅ **No changes needed** for breadcrumbs (already independent)
⚠️ **Minor changes needed** for Schema.org and sitemap

---

## Change 1: Schema.org URL Field (MINOR)

### Current Behavior
Each route passes its own URL to StructuredData:

```astro
<!-- hiking-backpacks/[slug].astro -->
const currentUrl = `https://thetravelbackpack.com/hiking-backpacks/${post.slug}/`;

<StructuredData
  data={{
    url: currentUrl  // ❌ Problem: Non-canonical routes claim to be main page
  }}
/>
```

### Problem
If you have the same content at:
- `/hiking-backpacks/small-hiking/` (canonical)
- `/backpacks/hiking/small-hiking/` (test variant)

Both would claim to be the authoritative URL in their schema.

### Solution
Schema.org URL should always point to canonical:

```astro
<!-- hiking-backpacks/[slug].astro -->
const currentUrl = `https://thetravelbackpack.com/hiking-backpacks/${post.slug}/`;
const canonicalUrl = post.data.canonical_url || currentUrl; // Use canonical if defined

<StructuredData
  data={{
    url: canonicalUrl  // ✅ Always points to canonical version
  }}
/>
```

### Implementation Example

**Content frontmatter:**
```yaml
---
title: "Best Small Hiking Backpack"
canonical_url: "/hiking-backpacks/small-hiking/"  # Optional: primary version
---
```

**Route file changes:**

```diff
<!-- hiking-backpacks/[slug].astro -->
const currentUrl = `https://thetravelbackpack.com/hiking-backpacks/${post.slug}/`;
+ const canonicalUrl = post.data.canonical_url
+   ? `https://thetravelbackpack.com${post.data.canonical_url}`
+   : currentUrl;

<StructuredData
  type="article"
  data={{
    title: post.data.title,
    // ... other fields
-   url: currentUrl
+   url: canonicalUrl
  }}
  slot="head"
/>
```

**Impact:** 3 route files need this change
- `hiking-backpacks/[slug].astro`
- `budget-backpacks/[slug].astro`
- `travel-backpacks/[slug].astro`
- `blog/[slug].astro`

---

## Change 2: Sitemap Generation (MODERATE)

### Current Behavior
Sitemap includes ALL pages generated:

```typescript
// sitemap.xml.ts
const posts = await getCollection('posts');
// Generates URLs for every route that renders each post
```

### Problem
If same content is at multiple URLs, sitemap would list duplicates:
```xml
<url>
  <loc>https://thetravelbackpack.com/hiking-backpacks/small-hiking/</loc>
</url>
<url>
  <loc>https://thetravelbackpack.com/backpacks/hiking/small-hiking/</loc>
</url>
```

### Solution
Only include canonical URLs in sitemap:

```typescript
// sitemap.xml.ts
export async function GET() {
  const posts = await getCollection('posts');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- ... static pages ... -->
${posts.map((post) => {
  // Determine canonical URL
  let canonicalPath;

  if (post.data.canonical_url) {
    // Explicit canonical defined
    canonicalPath = post.data.canonical_url;
  } else if (post.data.originalUrl) {
    // Use original recovered URL
    const urlObj = new URL(post.data.originalUrl);
    canonicalPath = urlObj.pathname;
  } else {
    // Default to /blog/ path
    canonicalPath = `/blog/${post.slug}/`;
  }

  const url = `https://thetravelbackpack.com${canonicalPath}`;
  const lastmod = post.data.updated || post.data.date;

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

**Impact:** 1 file needs updating (`src/pages/sitemap.xml.ts`)

---

## Change 3: Canonical Tag Override (OPTIONAL)

### Current Behavior
Routes don't pass canonical to BaseLayout:

```astro
<BaseLayout
  title={post.data.title}
  description={post.data.description}
  <!-- No canonical prop -->
>
```

This is fine because SEOHead.astro defaults to current URL.

### For Multi-URL Testing

**Primary route (canonical):** No change needed
```astro
<!-- hiking-backpacks/[slug].astro -->
<BaseLayout
  title={post.data.title}
  <!-- No canonical prop = defaults to self ✅ -->
>
```

**Test variant route:** Must override canonical
```astro
<!-- backpacks/hiking/[slug].astro -->
const currentUrl = `https://thetravelbackpack.com/backpacks/hiking/${post.slug}/`;
const canonicalUrl = post.data.canonical_url
  ? `https://thetravelbackpack.com${post.data.canonical_url}`
  : `https://thetravelbackpack.com/hiking-backpacks/${post.slug}/`; // Fallback

<BaseLayout
  title={post.data.title}
  canonical={canonicalUrl}  <!-- ✅ Explicitly point to primary -->
>
```

**Impact:** Only new alternative route files need this

---

## Change 4: Content Schema Extension (OPTIONAL)

### Current Schema
```typescript
// src/content/config.ts
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // ... existing fields
    originalUrl: z.string().url().optional(),
  }),
});
```

### Extended for Multi-URL
```typescript
const postsCollection = defineCollection({
  schema: z.object({
    // ... existing fields
    originalUrl: z.string().url().optional(),

    // New fields for multi-URL support
    canonical_url: z.string().optional(),  // Path to canonical version
    alternate_urls: z.array(z.object({
      path: z.string(),                    // Alternative URL path
      index_status: z.enum(['index', 'noindex']).default('noindex'),
    })).optional(),
  }),
});
```

**Impact:** 1 file (`src/content/config.ts`)

---

## Summary of Required Changes

### Must Change (For Multi-URL Support)
1. **Schema.org URL** - 4 route files (5 minutes)
2. **Sitemap logic** - 1 file (10 minutes)

### Should Change (For Proper Setup)
3. **Canonical override** - New route files only (as needed)
4. **Content schema** - 1 file (5 minutes)

### No Changes Needed ✅
- ✅ Canonical tag default behavior (already works)
- ✅ Breadcrumb independence (already works)
- ✅ BaseLayout flexibility (already works)

---

## Code Change Checklist

### Phase 1: Extend Content Schema
- [ ] Add `canonical_url` field to `src/content/config.ts`
- [ ] Add `alternate_urls` field (optional)

### Phase 2: Update Existing Routes
- [ ] Update `hiking-backpacks/[slug].astro` - use canonical URL in schema
- [ ] Update `budget-backpacks/[slug].astro` - use canonical URL in schema
- [ ] Update `travel-backpacks/[slug].astro` - use canonical URL in schema
- [ ] Update `blog/[slug].astro` - use canonical URL in schema

### Phase 3: Fix Sitemap
- [ ] Update `sitemap.xml.ts` - only include canonical URLs

### Phase 4: Create Test Routes (When Ready)
- [ ] Create alternative route structure
- [ ] Set canonical to point to primary
- [ ] Configure noindex initially
- [ ] Track with analytics

---

## Testing Verification

After changes, verify:

1. **Primary route canonical:**
   ```bash
   curl -s https://yoursite.com/hiking-backpacks/small/ | grep canonical
   # Should show: <link rel="canonical" href="https://yoursite.com/hiking-backpacks/small/">
   ```

2. **Test route canonical:**
   ```bash
   curl -s https://yoursite.com/backpacks/hiking/small/ | grep canonical
   # Should show: <link rel="canonical" href="https://yoursite.com/hiking-backpacks/small/">
   ```

3. **Schema URL:**
   ```bash
   curl -s https://yoursite.com/backpacks/hiking/small/ | grep -A 20 'ld+json'
   # mainEntityOfPage.@id should be: https://yoursite.com/hiking-backpacks/small/
   ```

4. **Sitemap:**
   ```bash
   curl -s https://yoursite.com/sitemap.xml | grep hiking-backpacks
   # Should only appear once (canonical version)
   ```

---

## Estimated Effort

- **Setup time:** 30 minutes
- **Testing time:** 15 minutes
- **Total:** 45 minutes

## Risk Level: LOW ⚠️

- Changes are isolated and incremental
- No breaking changes to existing functionality
- Easy to rollback if needed
