# Multi-URL Content Strategy for SEO Testing

## Concept
Test different URL structures for the same content to determine optimal SEO performance.

## Example Scenarios

### Scenario 1: Category-First vs Topic-First
Same content, two URLs:
- `/china/travel-guides/beijing-backpacking/` (location-first)
- `/travel-guides/china/beijing-backpacking/` (topic-first)

### Scenario 2: Depth Testing
- `/backpacks/hiking/` (shallow)
- `/gear/outdoor/backpacks/hiking/` (deep)

## Implementation Pattern

### 1. Content Structure
Content stays in one place with metadata:
```yaml
---
title: "Beijing Backpacking Guide"
slug: "beijing-backpacking"
canonical_url: "/china/travel-guides/beijing-backpacking/"  # Primary version
alternate_urls:
  - path: "/travel-guides/china/beijing-backpacking/"
    breadcrumb: ["Home", "Travel Guides", "China", "Beijing"]
    test_variant: "topic-first"
---
```

### 2. Create Alternative Route Pages

**Primary Route:** `src/pages/china/travel-guides/[slug].astro`
```astro
---
// This is the canonical version
const posts = await getCollection('posts', (post) =>
  post.data.category === 'china-guides'
);
---
<link rel="canonical" href={post.data.canonical_url} />
```

**Test Route:** `src/pages/travel-guides/china/[slug].astro`
```astro
---
// This is the test variant
const posts = await getCollection('posts', (post) =>
  post.data.category === 'china-guides'
);
---
<link rel="canonical" href={post.data.canonical_url} />
<!-- Points to primary version -->
```

### 3. Breadcrumb Flexibility

Different breadcrumbs for different paths:
- `/china/guides/` → Home > China > Guides
- `/guides/china/` → Home > Guides > China

### 4. Schema.org Considerations

**BreadcrumbList** must match actual URL structure:
```json
// For /china/travel-guides/beijing/
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"position": 1, "name": "Home", "item": "/"},
    {"position": 2, "name": "China", "item": "/china/"},
    {"position": 3, "name": "Travel Guides", "item": "/china/travel-guides/"},
    {"position": 4, "name": "Beijing", "item": "/china/travel-guides/beijing/"}
  ]
}

// For /travel-guides/china/beijing/
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"position": 1, "name": "Home", "item": "/"},
    {"position": 2, "name": "Travel Guides", "item": "/travel-guides/"},
    {"position": 3, "name": "China", "item": "/travel-guides/china/"},
    {"position": 4, "name": "Beijing", "item": "/travel-guides/china/beijing/"}
  ]
}
```

## SEO Best Practices

### ✅ DO:
1. **Always set canonical** - Primary version gets canonical to itself, variants point to primary
2. **Match breadcrumbs to URL structure** - Don't mislead users or search engines
3. **Use noindex on test variants initially** - Prevent duplicate content issues
4. **Track separately in Analytics** - Use UTM parameters or separate properties
5. **Test one variable at a time** - Don't change multiple factors

### ❌ DON'T:
1. **Don't index both versions** - Without canonical, you'll compete with yourself
2. **Don't use same schema for different structures** - Breadcrumbs must match URLs
3. **Don't forget internal linking** - Pick primary URL for internal links
4. **Don't run tests indefinitely** - Choose winner and 301 redirect loser

## Testing Approach

### Phase 1: Controlled Launch (Weeks 1-2)
```yaml
Primary: /china/travel-guides/[slug]/
- Indexed: Yes
- Canonical: Self
- Internal links: All point here

Variant: /travel-guides/china/[slug]/
- Indexed: No (noindex)
- Canonical: Points to primary
- Purpose: Technical validation
```

### Phase 2: A/B Test (Weeks 3-8)
```yaml
Primary: /china/travel-guides/[slug]/
- Indexed: Yes
- 50% of internal links

Variant: /travel-guides/china/[slug]/
- Indexed: Yes
- Canonical: Self (make it compete!)
- 50% of internal links
```

### Phase 3: Winner Takes All (Week 9+)
```yaml
Winner: Keep and strengthen
Loser: 301 redirect to winner
```

## Metrics to Track

1. **Organic Traffic** - Which URL gets more clicks?
2. **Rankings** - Which appears higher for target keywords?
3. **CTR** - Which breadcrumb structure gets more clicks?
4. **User Behavior** - Bounce rate, time on page
5. **Featured Snippets** - Which structure gets rich results?

## Implementation Complexity

### Easy (Current Setup):
- Multiple routes pointing to same content ✅
- Different breadcrumbs per route ✅
- Canonical tag management ✅

### Moderate:
- Analytics segmentation by URL pattern
- Internal link distribution strategy
- 301 redirects for loser variant

### Advanced:
- Dynamic canonical based on performance
- Machine learning for URL structure optimization
- Automatic winner selection
