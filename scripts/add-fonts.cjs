#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['auth-modal.html', 'share-modal.html']);

const FONTS_BLOCK = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..600,30..80;1,9..144,400..600,30..80&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..600,30..80;1,9..144,400..600,30..80&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"></noscript>
`;

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP.has(f));

let added = 0;
let skipped = 0;
let errors = [];

for (const f of files) {
  const full = path.join(ROOT, f);
  const html = fs.readFileSync(full, 'utf8');

  if (html.includes('fonts.googleapis.com')) {
    skipped++;
    continue;
  }

  const styleSheetRe = /(\s*)<link rel="stylesheet" href="style\.css"/;
  if (!styleSheetRe.test(html)) {
    errors.push(`${f}: no style.css link found`);
    continue;
  }

  const out = html.replace(styleSheetRe, (m, ws) => `\n${FONTS_BLOCK}${ws.replace(/^\n/, '')}<link rel="stylesheet" href="style.css"`);
  fs.writeFileSync(full, out);
  added++;
}

console.log(`Added fonts to ${added} pages.`);
console.log(`Skipped (already had fonts): ${skipped}`);
if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log('  ' + e));
}
