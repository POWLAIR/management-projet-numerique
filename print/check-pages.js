#!/usr/bin/env node
/**
 * Capture des pages problématiques du document pour vérification visuelle.
 * Lance Puppeteer, charge le HTML, prend des screenshots autour des sections WBS et RACI.
 */
'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
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
const printCss = fs.readFileSync(path.join(__dirname, 'print.css'), 'utf8');
const mermaidJs = fs.readFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), 'utf8');
const highlightCss = fs.readFileSync(path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.css'), 'utf8');

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
const firstH1 = bodyHtml.indexOf('<h1');
if (firstH1 > 0) {
  bodyHtml = `<div class="cover-page">${bodyHtml.slice(0, firstH1)}</div>${bodyHtml.slice(firstH1)}`;
}

const fullHtml = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
<style>${highlightCss}</style><style>${printCss}</style>
</head><body class="markdown-body">${bodyHtml}
<script>${mermaidJs}<\/script>
<script>
mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose',
  themeVariables: { fontSize: '12px', fontFamily: 'Segoe UI, Arial, sans-serif' },
  flowchart: { useMaxWidth: true }, gantt: { useMaxWidth: true } });
window.__mermaidDone = false;
mermaid.run({ querySelector: '.mermaid' })
  .then(() => { window.__mermaidDone = true; })
  .catch(() => { window.__mermaidDone = true; });
<\/script></body></html>`;

// A4 à 96dpi : 794 x 1123px
const PAGE_H = 1123;
const PAGE_W = 794;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H * 20 }); // viewport très haut pour tout voir
  await page.setRequestInterception(true);
  page.on('request', req => req.url().startsWith('data:') ? req.continue() : req.abort());
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction('window.__mermaidDone === true', { timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Trouver les positions des sections clés
  const sections = await page.evaluate(() => {
    const targets = [
      { selector: 'h2', text: '1.7 Matrice RACI' },
      { selector: 'h2', text: '2.1 Work Breakdown' },
      { selector: 'h3', text: 'Vue arborescente' },
    ];
    return targets.map(({ selector, text }) => {
      const els = Array.from(document.querySelectorAll(selector));
      const el = els.find(e => e.textContent.includes(text));
      return { text, top: el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1 };
    });
  });

  console.log('Positions trouvées:');
  sections.forEach(s => console.log(' ', s.text + ':', s.top + 'px'));

  // Capturer 200px avant chaque section clé sur ~900px de haut
  for (const s of sections) {
    if (s.top < 0) { console.log('Section non trouvée:', s.text); continue; }
    const y = Math.max(0, s.top - 100);
    const label = s.text.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const outPath = `/tmp/check-${label}.png`;
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y, width: PAGE_W, height: 900 },
    });
    console.log(`Screenshot "${s.text}": ${outPath}`);
  }

  await browser.close();
})().catch(e => { console.error('ERREUR:', e.message); process.exit(1); });
