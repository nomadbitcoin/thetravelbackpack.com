import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

export async function GET(context: APIContext) {
  const post = context.props.post;

  return rss({
    title: `${post.data.title} | The Travel Backpack`,
    description: post.data.description,
    site: context.site!,
    items: [
      {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: post.data.originalUrl
          ? new URL(post.data.originalUrl).pathname
          : `/blog/${post.slug}/`,
      },
    ],
  });
}
