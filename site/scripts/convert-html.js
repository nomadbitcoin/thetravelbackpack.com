import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DATA_DIR = '../../data/recovered_content';
const OUTPUT_DIR = '../src/content/posts';

// Load metadata
const metadata = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'metadata.json'), 'utf8'));

// Parse HTML and extract content
function parseHTML(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  // Extract title
  const title = doc.querySelector('h1.entry-title')?.textContent.trim() ||
                doc.querySelector('title')?.textContent.trim() ||
                'Untitled';

  // Extract meta description
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

  // Extract date
  const dateEl = doc.querySelector('.posted-on .published');
  const date = dateEl?.textContent.trim() || new Date().toISOString().split('T')[0];

  // Extract tags from article:tag meta tags
  const tagElements = doc.querySelectorAll('meta[property="article:tag"]');
  const tags = Array.from(tagElements).map(el => el.getAttribute('content')).filter(Boolean);

  // Extract main content
  const contentEl = doc.querySelector('.entry-content');
  let content = '';

  if (contentEl) {
    // Remove unwanted elements
    contentEl.querySelectorAll('.ez-toc-container, script, style').forEach(el => el.remove());

    // Get HTML content
    content = contentEl.innerHTML;

    // Basic HTML to Markdown conversion
    content = content
      // Remove archive.org URLs
      .replace(/http:\/\/web\.archive\.org\/web\/\d+\//g, '')
      // Clean up links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      // Headers
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
      // Paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
      // Lists
      .replace(/<ul[^>]*>/gi, '\n')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      // Bold/Italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      // Blockquotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n')
      // Remove remaining HTML tags
      .replace(/<[^>]+>/g, '')
      // Clean up entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8211;/g, '-')
      // Clean up extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  return { title, description, date, tags, content };
}

// Convert each recovered HTML file
metadata.recovered_content.forEach((item, index) => {
  if (item.source === 'Bonus (Homepage)') {
    console.log(`Skipping homepage...`);
    return;
  }

  console.log(`\nProcessing: ${item.title}`);
  console.log(`URL: ${item.url}`);

  const htmlPath = path.join(DATA_DIR, item.filename);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const parsed = parseHTML(htmlContent);

  // Extract slug from URL
  const urlParts = new URL(item.url).pathname.split('/').filter(Boolean);
  const category = urlParts[0] || 'general';
  const slug = urlParts[1] || `post-${index}`;

  // Create frontmatter
  const frontmatter = `---
title: "${parsed.title.replace(/"/g, '\\"')}"
description: "${parsed.description.slice(0, 160).replace(/"/g, '\\"')}"
date: ${new Date(parsed.date).toISOString().split('T')[0]}
author: "The Travel Backpack"
tags: ${JSON.stringify(parsed.tags.slice(0, 5))}
category: "guide"
featured_image:
  src: "/images/placeholder-backpack.jpg"
  alt: "${parsed.title.replace(/"/g, '\\"')}"
  width: 1200
  height: 630
affiliate_disclosure: true
draft: false
originalUrl: "${item.url}"
recoveredFrom: "wayback-machine"
---

${parsed.content}
`;

  // Save to file
  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);
  fs.writeFileSync(outputPath, frontmatter, 'utf8');

  console.log(`✓ Saved to: ${outputPath}`);
  console.log(`  Category: ${category}`);
  console.log(`  Slug: ${slug}`);
});

console.log('\n✅ Conversion complete!');
