#!/usr/bin/env python3
import json
import re
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser
from html import unescape

DATA_DIR = Path('../data/recovered_content')
OUTPUT_DIR = Path('src/content/posts')

class HTMLToMarkdown(HTMLParser):
    def __init__(self):
        super().__init__()
        self.markdown = []
        self.current_tag = None
        self.list_level = 0

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag == 'h2':
            self.markdown.append('\n## ')
        elif tag == 'h3':
            self.markdown.append('\n### ')
        elif tag == 'h4':
            self.markdown.append('\n#### ')
        elif tag == 'p':
            self.markdown.append('\n')
        elif tag == 'li':
            self.markdown.append('- ')
        elif tag == 'blockquote':
            self.markdown.append('\n> ')
        elif tag == 'a':
            href = dict(attrs).get('href', '')
            # Clean archive.org URLs
            href = re.sub(r'http://web\.archive\.org/web/\d+/', '', href)
            self.markdown.append('[')
            self.link_url = href

    def handle_endtag(self, tag):
        if tag in ['h2', 'h3', 'h4', 'p', 'blockquote']:
            self.markdown.append('\n')
        elif tag == 'li':
            self.markdown.append('\n')
        elif tag == 'a' and hasattr(self, 'link_url'):
            self.markdown.append(f']({self.link_url})')
            delattr(self, 'link_url')
        self.current_tag = None

    def handle_data(self, data):
        if self.current_tag not in ['script', 'style', 'nav']:
            # Clean up the data
            data = unescape(data)
            data = data.replace('\n', ' ').replace('\r', '')
            if data.strip():
                self.markdown.append(data)

    def get_markdown(self):
        text = ''.join(self.markdown)
        # Clean up multiple newlines
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()

def extract_meta(html):
    """Extract metadata from HTML"""
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_match.group(1) if title_match else 'Untitled'

    desc_match = re.search(r'<meta name="description" content="(.*?)"', html, re.IGNORECASE)
    description = desc_match.group(1) if desc_match else ''

    # Extract tags
    tag_pattern = r'<meta property="article:tag" content="(.*?)"'
    tags = re.findall(tag_pattern, html, re.IGNORECASE)

    return {
        'title': unescape(title),
        'description': unescape(description)[:160],
        'tags': tags[:5]
    }

def extract_content(html):
    """Extract main content from HTML"""
    # Find entry-content div
    content_match = re.search(r'<div class="entry-content[^"]*"[^>]*>(.*?)</div>\s*</article>', html, re.DOTALL)
    if not content_match:
        content_match = re.search(r'<div class="entry-content[^"]*"[^>]*>(.*?)$', html, re.DOTALL)

    if content_match:
        content_html = content_match.group(1)

        # Remove unwanted elements
        content_html = re.sub(r'<div[^>]*class="[^"]*ez-toc[^"]*"[^>]*>.*?</div>', '', content_html, flags=re.DOTALL)
        content_html = re.sub(r'<nav[^>]*>.*?</nav>', '', content_html, flags=re.DOTALL)
        content_html = re.sub(r'<script[^>]*>.*?</script>', '', content_html, flags=re.DOTALL)
        content_html = re.sub(r'<style[^>]*>.*?</style>', '', content_html, flags=re.DOTALL)

        # Convert to markdown
        parser = HTMLToMarkdown()
        parser.feed(content_html)
        return parser.get_markdown()

    return ''

# Load metadata
with open(DATA_DIR / 'metadata.json', 'r') as f:
    metadata = json.load(f)

# Create output directory if it doesn't exist
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Convert each file
for item in metadata['recovered_content']:
    if item['source'] == 'Bonus (Homepage)':
        print(f"Skipping homepage...")
        continue

    print(f"\nProcessing: {item['title']}")
    print(f"URL: {item['url']}")

    # Read HTML file
    html_path = DATA_DIR / item['filename']
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Extract metadata
    meta = extract_meta(html_content)

    # Extract content
    content = extract_content(html_content)

    # Extract slug from URL
    from urllib.parse import urlparse
    url_path = urlparse(item['url']).path
    parts = [p for p in url_path.split('/') if p]
    category = parts[0] if parts else 'general'
    slug = parts[1] if len(parts) > 1 else f"post-{item['filename'].split('_')[0]}"

    # Parse date
    date_str = item.get('archive_date', datetime.now().strftime('%Y-%m-%d'))

    # Escape quotes in title and description
    title_escaped = meta['title'].replace('"', '\\"')
    desc_escaped = meta['description'].replace('"', '\\"')
    target_kw = item.get('target_keyword', '')

    # Create frontmatter
    frontmatter = f'''---
title: "{title_escaped}"
description: "{desc_escaped}"
date: {date_str}
author: "The Travel Backpack"
tags: {json.dumps(meta['tags'])}
category: "guide"
featured_image:
  src: "/images/placeholder-backpack.jpg"
  alt: "{title_escaped}"
  width: 1200
  height: 630
affiliate_disclosure: true
draft: false
originalUrl: "{item['url']}"
recoveredFrom: "wayback-machine"
targetKeyword: "{target_kw}"
---

{content}
'''

    # Save to file
    output_path = OUTPUT_DIR / f"{slug}.md"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter)

    print(f"✓ Saved to: {output_path}")
    print(f"  Category: {category}")
    print(f"  Slug: {slug}")
    print(f"  Original URL path: /{category}/{slug}")

print('\n✅ Conversion complete!')
