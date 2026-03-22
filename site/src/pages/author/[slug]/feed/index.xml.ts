import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export function getStaticPaths() {
  return [{ params: { slug: 'sujithchikku2000gmail-com' } }];
}

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'The Travel Backpack - Author Feed',
    description: 'All posts by The Travel Backpack team.',
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
