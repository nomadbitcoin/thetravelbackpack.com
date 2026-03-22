const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvContent = fs.readFileSync(
  path.join(__dirname, 'pending-pages-with-urls-indexed.csv'),
  'utf-8'
);

// Parse CSV
const lines = csvContent.split('\n').filter(line => line.trim());
const urls = lines.slice(1).map(line => {
  const [url, lastCrawled] = line.split(',');
  return { url: url.trim(), lastCrawled: lastCrawled?.trim() };
});

// Categorize URLs
const categories = {
  homepage: [],
  aboutUs: [],
  contact: [],
  staticPages: [],
  categoryPages: [],
  tagPages: [],
  paginationPages: [],
  budgetBackpacks: [],
  travelBackpacks: [],
  hikingBackpacks: [],
  searchPages: [],
  feedPages: [],
  archivePages: [],
  authorPages: [],
  resourcesPages: [],
  other: []
};

urls.forEach(({ url, lastCrawled }) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.search;

  // Categorize based on URL pattern - order matters, check most specific first
  if (pathname.includes('/feed') || pathname.includes('/rss')) {
    categories.feedPages.push({ url, lastCrawled, pathname });
  } else if (searchParams.includes('search_term_string') || pathname.includes('/search/')) {
    categories.searchPages.push({ url, lastCrawled, pathname });
  } else if (pathname.match(/\/\d{4}\/\d{2}/)) {
    categories.archivePages.push({ url, lastCrawled, pathname });
  } else if (pathname.includes('/author/')) {
    categories.authorPages.push({ url, lastCrawled, pathname });
  } else if (pathname.startsWith('/category/')) {
    categories.categoryPages.push({ url, lastCrawled, pathname });
  } else if (pathname.startsWith('/tags/')) {
    categories.tagPages.push({ url, lastCrawled, pathname });
  } else if (pathname.startsWith('/page/')) {
    categories.paginationPages.push({ url, lastCrawled, pathname });
  } else if (pathname.includes('/about-us')) {
    categories.aboutUs.push({ url, lastCrawled, pathname });
  } else if (pathname.includes('/contact')) {
    categories.contact.push({ url, lastCrawled, pathname });
  } else if (pathname.includes('/privacy') || pathname === '/resources' || pathname === '/home/') {
    categories.staticPages.push({ url, lastCrawled, pathname });
  } else if (pathname.startsWith('/budget-backpacks/') && pathname !== '/budget-backpacks/') {
    const slug = pathname.replace('/budget-backpacks/', '').replace('/', '');
    categories.budgetBackpacks.push({ url, lastCrawled, pathname, slug });
  } else if (pathname.startsWith('/travel-backpacks/') && pathname !== '/travel-backpacks/') {
    const slug = pathname.replace('/travel-backpacks/', '').replace('/', '');
    categories.travelBackpacks.push({ url, lastCrawled, pathname, slug });
  } else if (pathname.startsWith('/hiking-backpacks/') && pathname !== '/hiking-backpacks/') {
    const slug = pathname.replace('/hiking-backpacks/', '').replace('/', '');
    categories.hikingBackpacks.push({ url, lastCrawled, pathname, slug });
  } else if (pathname === '/' || pathname === '/travel-backpacks/' || pathname === '/hiking-backpacks/') {
    categories.homepage.push({ url, lastCrawled, pathname });
  } else {
    categories.other.push({ url, lastCrawled, pathname });
  }
});

// Generate report
let report = '# Indexed URLs Analysis Report\n\n';
report += `**Total URLs:** ${urls.length}\n`;
report += `**Analysis Date:** ${new Date().toISOString().split('T')[0]}\n\n`;

report += '## Summary by Category\n\n';
Object.entries(categories).forEach(([category, items]) => {
  if (items.length > 0) {
    report += `- **${category}:** ${items.length} URLs\n`;
  }
});

report += '\n---\n\n';

// Detailed breakdown
report += '## Content Pages Requiring Creation\n\n';
report += '### Budget Backpacks (' + categories.budgetBackpacks.length + ' pages)\n\n';
categories.budgetBackpacks.forEach(({ url, slug, lastCrawled }) => {
  report += `- **Slug:** \`${slug}\`\n`;
  report += `  - URL: ${url}\n`;
  report += `  - Last Crawled: ${lastCrawled}\n\n`;
});

report += '### Travel Backpacks (' + categories.travelBackpacks.length + ' pages)\n\n';
categories.travelBackpacks.forEach(({ url, slug, lastCrawled }) => {
  report += `- **Slug:** \`${slug}\`\n`;
  report += `  - URL: ${url}\n`;
  report += `  - Last Crawled: ${lastCrawled}\n\n`;
});

report += '### Hiking Backpacks (' + categories.hikingBackpacks.length + ' pages)\n\n';
categories.hikingBackpacks.forEach(({ url, slug, lastCrawled }) => {
  report += `- **Slug:** \`${slug}\`\n`;
  report += `  - URL: ${url}\n`;
  report += `  - Last Crawled: ${lastCrawled}\n\n`;
});

report += '\n---\n\n';
report += '## System/Navigation Pages\n\n';

['homepage', 'aboutUs', 'contact', 'staticPages', 'categoryPages', 'paginationPages',
 'searchPages', 'feedPages', 'archivePages', 'authorPages'].forEach(category => {
  if (categories[category].length > 0) {
    report += `### ${category} (${categories[category].length})\n\n`;
    categories[category].forEach(({ url, pathname, lastCrawled }) => {
      report += `- ${pathname}\n`;
      report += `  - URL: ${url}\n`;
      report += `  - Last Crawled: ${lastCrawled}\n\n`;
    });
  }
});

// Save report
fs.writeFileSync(path.join(__dirname, 'indexed-urls-analysis.md'), report);
console.log('Analysis complete! Report saved to indexed-urls-analysis.md');

// Also output JSON for programmatic use
fs.writeFileSync(
  path.join(__dirname, 'indexed-urls-categorized.json'),
  JSON.stringify(categories, null, 2)
);
console.log('JSON categorization saved to indexed-urls-categorized.json');
