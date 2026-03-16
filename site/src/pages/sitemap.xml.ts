import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thetravelbackpack.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thetravelbackpack.com/blog/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thetravelbackpack.com/about/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
${posts.map((post) => {
  // Determine the URL based on originalUrl or default blog path
  let url;
  if (post.data.originalUrl) {
    // Extract the path from originalUrl
    const urlObj = new URL(post.data.originalUrl);
    url = `https://thetravelbackpack.com${urlObj.pathname}`;
  } else {
    url = `https://thetravelbackpack.com/blog/${post.slug}/`;
  }

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
