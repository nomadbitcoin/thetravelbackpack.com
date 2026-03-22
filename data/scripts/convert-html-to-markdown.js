const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const cheerio = require('cheerio');

// Initialize Turndown with custom rules
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
});

// Custom rule to handle WordPress-specific elements
turndownService.addRule('removeWaybackElements', {
  filter: function (node) {
    return (
      node.classList &&
      (node.classList.contains('wb-autocomplete-suggestions') ||
       node.id === 'wm-ipp-base' ||
       node.id === 'donato')
    );
  },
  replacement: function () {
    return '';
  }
});

// Read recovery metadata
const recoveryMetadata = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'wayback_recovered/recovery-metadata.json'), 'utf-8')
);

const results = {
  successful: [],
  failed: [],
  total: recoveryMetadata.successful.length
};

// Category mapping based on URL path
function getCategoryFromPath(pathname) {
  if (pathname.includes('/budget-backpacks/')) return 'gear';
  if (pathname.includes('/travel-backpacks/')) return 'gear';
  if (pathname.includes('/hiking-backpacks/')) return 'gear';
  return 'guide';
}

// Extract tags from article class
function extractTags($) {
  const tags = [];
  const articleEl = $('article').first();

  if (articleEl.length) {
    const classes = articleEl.attr('class') || '';
    const tagMatches = classes.match(/tag-([a-z0-9-]+)/g);

    if (tagMatches) {
      tagMatches.forEach(match => {
        const tag = match.replace('tag-', '').replace(/-/g, ' ');
        // Capitalize first letter of each word
        const capitalizedTag = tag.split(' ').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        tags.push(capitalizedTag);
      });
    }
  }

  return tags.length > 0 ? tags : ['Backpacks', 'Gear Review', 'Travel Gear'];
}

// Clean and extract main content
function extractMainContent($) {
  // Remove Wayback Machine toolbar
  $('#wm-ipp-base').remove();
  $('.wb-autocomplete-suggestions').remove();
  $('#donato').remove();

  // Find the main article content
  let content = '';

  // Try different selectors for the main content
  const selectors = [
    'article .entry-content',
    '.post-content',
    'article.post',
    '.single-post-content',
    'main article'
  ];

  for (const selector of selectors) {
    const contentEl = $(selector).first();
    if (contentEl.length && contentEl.text().trim().length > 100) {
      content = contentEl.html();
      break;
    }
  }

  if (!content) {
    // Fallback to article tag
    content = $('article').first().html() || '';
  }

  return content;
}

// Convert HTML file to Markdown
function convertHtmlToMarkdown(htmlFile, metadata) {
  try {
    const htmlPath = path.join(__dirname, 'wayback_recovered', htmlFile.filename);
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Load HTML with cheerio
    const $ = cheerio.load(html);

    // Extract metadata
    const title = $('title').text().trim() ||
                  $('meta[property="og:title"]').attr('content') ||
                  $('h1').first().text().trim() ||
                  htmlFile.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let description = $('meta[name="description"]').attr('content') ||
                      $('meta[property="og:description"]').attr('content') ||
                      '';

    // Truncate description to 160 chars if needed
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    const tags = extractTags($);
    const category = getCategoryFromPath(htmlFile.pathname);

    // Extract and convert main content
    const mainContentHtml = extractMainContent($);
    let markdownContent = turndownService.turndown(mainContentHtml);

    // Clean up markdown
    markdownContent = markdownContent
      // Remove multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      // Remove Wayback Machine URLs
      .replace(/http:\/\/web\.archive\.org\/web\/\d+\//g, '')
      // Clean up weird spacing
      .trim();

    // Create frontmatter
    const date = htmlFile.timestamp.substring(0, 4) + '-' +
                 htmlFile.timestamp.substring(4, 6) + '-' +
                 htmlFile.timestamp.substring(6, 8);

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: ${date}
author: "The Travel Backpack"
tags: ${JSON.stringify(tags)}
category: "${category}"
featured_image:
  src: "/images/placeholder-backpack.jpg"
  alt: "${title.replace(/"/g, '\\"')}"
  width: 1200
  height: 630
affiliate_disclosure: true
draft: false
originalUrl: "${htmlFile.url}"
recoveredFrom: "wayback-machine"
---

`;

    const fullMarkdown = frontmatter + markdownContent;

    // Determine output path based on category
    const outputDir = path.join(__dirname, '../site/src/content/posts');
    const outputFilename = `${htmlFile.slug}.md`;
    const outputPath = path.join(outputDir, outputFilename);

    // Save markdown file
    fs.writeFileSync(outputPath, fullMarkdown);

    console.log(`✓ Converted: ${htmlFile.slug}`);
    console.log(`  Title: ${title}`);
    console.log(`  Output: ${outputFilename}`);
    console.log(`  Size: ${(fullMarkdown.length / 1024).toFixed(1)} KB\n`);

    results.successful.push({
      slug: htmlFile.slug,
      title,
      outputPath: outputFilename,
      size: fullMarkdown.length
    });

  } catch (error) {
    console.error(`✗ Failed to convert: ${htmlFile.slug}`);
    console.error(`  Error: ${error.message}\n`);

    results.failed.push({
      slug: htmlFile.slug,
      error: error.message
    });
  }
}

// Main conversion process
console.log('═══════════════════════════════════════');
console.log('HTML TO MARKDOWN CONVERSION');
console.log('═══════════════════════════════════════\n');

console.log(`Converting ${recoveryMetadata.successful.length} HTML files...\n`);

recoveryMetadata.successful.forEach((file, index) => {
  console.log(`[${index + 1}/${recoveryMetadata.successful.length}] Processing: ${file.slug}`);
  convertHtmlToMarkdown(file, recoveryMetadata);
});

console.log('═══════════════════════════════════════');
console.log('CONVERSION COMPLETE');
console.log('═══════════════════════════════════════');
console.log(`Total files: ${results.total}`);
console.log(`Successfully converted: ${results.successful.length}`);
console.log(`Failed: ${results.failed.length}`);
console.log(`Success rate: ${((results.successful.length / results.total) * 100).toFixed(1)}%\n`);

if (results.failed.length > 0) {
  console.log('Failed conversions:');
  results.failed.forEach(fail => {
    console.log(`  - ${fail.slug}: ${fail.error}`);
  });
  console.log('');
}

// Save conversion report
const report = {
  date: new Date().toISOString(),
  ...results
};

fs.writeFileSync(
  path.join(__dirname, 'conversion-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Conversion report saved to: conversion-report.json\n');
console.log('✓ All markdown files saved to: ../site/src/content/posts/\n');
