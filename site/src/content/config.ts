import { defineCollection, z } from 'astro:content';

// Blog posts collection (Markdown/MDX)
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('The Travel Backpack'),
    tags: z.array(z.string()).min(0).max(10),
    category: z.enum(['guide', 'tips', 'gear', 'destination']),
    featured_image: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }).optional(),
    affiliate_disclosure: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Fields for recovered content
    originalUrl: z.string().url().optional(),
    recoveredFrom: z.string().optional(),
    targetKeyword: z.string().optional(),
  }),
});

// Buying guides collection (JSON)
const buyingGuidesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      content_type: z.literal('buying-guide'),
      category: z.string(),
    }),
    seo: z.object({
      title: z.string().min(30).max(60),
      description: z.string().min(120).max(160),
      keywords: z.array(z.string()),
    }),
    content: z.object({
      intro: z.string(),
      items: z.array(z.object({
        name: z.string(),
        affiliate_url: z.string().url().optional(),
        affiliate_platform: z.string().optional(),
        image: z.string(),
        pros: z.array(z.string()),
        cons: z.array(z.string()),
        best_for: z.string(),
        verdict: z.string(),
      })),
      faq: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).optional(),
    }),
  }),
});

// Comparisons collection (JSON)
const comparisonsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      content_type: z.literal('comparison'),
      category: z.string(),
    }),
    seo: z.object({
      title: z.string().min(30).max(60),
      description: z.string().min(120).max(160),
      keywords: z.array(z.string()),
    }),
    content: z.object({
      intro: z.string(),
      items: z.array(z.object({
        name: z.string(),
        specs: z.record(z.string()),
        affiliate_url: z.string().url().optional(),
        affiliate_platform: z.string().optional(),
        image: z.string(),
      })),
      winner: z.string().optional(),
      conclusion: z.string(),
    }),
  }),
});

// Checklists collection (JSON)
const checklistsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      content_type: z.literal('checklist'),
      category: z.string(),
    }),
    seo: z.object({
      title: z.string().min(30).max(60),
      description: z.string().min(120).max(160),
      keywords: z.array(z.string()),
    }),
    content: z.object({
      intro: z.string(),
      sections: z.array(z.object({
        title: z.string(),
        items: z.array(z.string()),
      })),
    }),
  }),
});

export const collections = {
  'posts': postsCollection,
  'buying-guides': buyingGuidesCollection,
  'comparisons': comparisonsCollection,
  'checklists': checklistsCollection,
};
