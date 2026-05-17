#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['index.html', 'auth-modal.html', 'share-modal.html']);

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP.has(f));

let added = 0;
let skipped = 0;
let errors = [];

for (const f of files) {
  const full = path.join(ROOT, f);
  const html = fs.readFileSync(full, 'utf8');

  if (html.includes('"BreadcrumbList"')) {
    skipped++;
    continue;
  }

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) {
    errors.push(`${f}: no <h1> found`);
    continue;
  }
  const h1 = h1Match[1].replace(/<[^>]+>/g, '').trim();

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    errors.push(`${f}: no canonical found`);
    continue;
  }
  const canonical = canonicalMatch[1];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Efterplan", "item": "https://efterplan.se/" },
      { "@type": "ListItem", "position": 2, "name": h1, "item": canonical }
    ]
  };

  const script = `  <script type="application/ld+json">\n  ${JSON.stringify(breadcrumb, null, 2).replace(/\n/g, '\n  ')}\n  </script>\n</head>`;

  if (!html.includes('</head>')) {
    errors.push(`${f}: no </head> found`);
    continue;
  }

  const out = html.replace('</head>', script);
  fs.writeFileSync(full, out);
  added++;
}

console.log(`Added BreadcrumbList to ${added} pages.`);
console.log(`Skipped (already had it): ${skipped}`);
if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log('  ' + e));
}
