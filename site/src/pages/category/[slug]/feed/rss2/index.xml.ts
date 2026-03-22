import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const CATEGORIES: Record<string, string> = {
  'travel-backpacks': 'Travel Backpacks',
  'hiking-backpacks': 'Hiking Backpacks',
  'budget-backpacks': 'Budget Backpacks',
  'uncategorized': 'Uncategorized',
};

export function getStaticPaths() {
  return Object.keys(CATEGORIES).map((slug) => ({ params: { slug } }));
}

export async function GET(context: APIContext) {
  const slug = context.params.slug as string;
  const label = CATEGORIES[slug] ?? slug;

  const posts = await getCollection('posts', ({ data }) => !data.draft);

  let filtered;
  if (slug === 'uncategorized') {
    filtered = posts.filter(
      (p) =>
        !p.data.originalUrl ||
        (!p.data.originalUrl.includes('/travel-backpacks/') &&
          !p.data.originalUrl.includes('/hiking-backpacks/') &&
          !p.data.originalUrl.includes('/budget-backpacks/'))
    );
  } else {
    filtered = posts.filter(
      (p) => p.data.originalUrl && p.data.originalUrl.includes(`/${slug}/`)
    );
  }

  const sorted = filtered.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${label} | The Travel Backpack`,
    description: `Latest posts in ${label} from The Travel Backpack.`,
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: post.data.originalUrl
        ? new URL(post.data.originalUrl).pathname
        : `/blog/${post.slug}/`,
    })),
  });
}
