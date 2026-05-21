#!/usr/bin/env node
'use strict';

const puppeteer = require('puppeteer');
const fs  = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

const ROOT = path.resolve(__dirname, '..');

marked.setOptions({
  gfm: true, breaks: false,
  highlight(code, lang) {
    if (lang === 'mermaid') return code;
    if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
    try { return hljs.highlightAuto(code).value; } catch (_) { return code; }
  },
});

const mdContent = fs.readFileSync(path.join(ROOT, 'docs md', 'Dossier_Projet_B2B_FINAL.md'), 'utf8');
const mermaidJs = fs.readFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), 'utf8');

let bodyHtml = marked.parse(mdContent);
bodyHtml = bodyHtml.replace(
  /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
  (_, encoded) => {
    const decoded = encoded
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return `<div class="mermaid">${decoded}</div>`;
  }
);

const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>.mermaid{margin:20px;padding:10px;border:1px solid #ccc;background:#fff;}</style>
</head><body style="background:#f5f5f5">
${bodyHtml}
<script>${mermaidJs}<\/script>
<script>
mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
window.__mermaidDone = false;
mermaid.run({ querySelector: '.mermaid' })
  .then(() => { window.__mermaidDone = true; })
  .catch(() => { window.__mermaidDone = true; });
<\/script>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  await page.setRequestInterception(true);
  page.on('request', req => req.url().startsWith('data:') ? req.continue() : req.abort());
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction('window.__mermaidDone === true', { timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  // Détecter les erreurs par innerText
  const results = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.mermaid')).map((el, i) => {
      const text = (el.innerText || el.textContent || '').trim();
      const hasError = text.includes('Syntax error') || text.includes('Parse error') || text.includes('parse error');
      return { index: i + 1, hasError, snippet: text.substring(0, 100).replace(/\n/g, ' ') };
    })
  );

  console.log('=== Rapport Mermaid ===');
  results.forEach(r => {
    console.log(`${r.hasError ? '❌' : '✅'} Diagramme ${r.index}: ${r.snippet}`);
  });

  // Screenshot des diagrammes en erreur
  const elements = await page.$$('.mermaid');
  for (let i = 0; i < elements.length; i++) {
    if (results[i] && results[i].hasError) {
      const outPath = `/tmp/mermaid-err-${i + 1}.png`;
      await elements[i].screenshot({ path: outPath });
      console.log(`  → Screenshot: ${outPath}`);
    }
  }

  await browser.close();
})().catch(e => { console.error('ERREUR:', e.message); process.exit(1); });
