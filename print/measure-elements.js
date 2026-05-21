#!/usr/bin/env node
'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

const ROOT = path.resolve(__dirname, '..');
const A4_H_PX = 1045; // hauteur utile A4 à 96dpi après marges (22+24mm soit ~174px de marges)

marked.setOptions({
  gfm: true, breaks: false,
  highlight(code, lang) {
    if (lang === 'mermaid') return code;
    if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
    try { return hljs.highlightAuto(code).value; } catch (_) { return code; }
  },
});

const mdContent    = fs.readFileSync(path.join(ROOT, 'docs md', 'Dossier_Projet_B2B_FINAL.md'), 'utf8');
const printCss     = fs.readFileSync(path.join(__dirname, 'print.css'), 'utf8');
const mermaidJs    = fs.readFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), 'utf8');
const highlightCss = fs.readFileSync(path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.css'), 'utf8');

let bodyHtml = marked.parse(mdContent);
bodyHtml = bodyHtml.replace(
  /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
  (_, encoded) => {
    const decoded = encoded.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
                           .replace(/&quot;/g,'"').replace(/&#39;/g,"'");
    return `<div class="mermaid">${decoded}</div>`;
  }
);
const firstH1 = bodyHtml.indexOf('<h1');
if (firstH1 > 0) bodyHtml = `<div class="cover-page">${bodyHtml.slice(0,firstH1)}</div>${bodyHtml.slice(firstH1)}`;

const fullHtml = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
<style>${highlightCss}</style><style>${printCss}</style>
</head><body class="markdown-body">${bodyHtml}
<script>${mermaidJs}<\/script>
<script>
mermaid.initialize({startOnLoad:false,theme:'neutral',securityLevel:'loose',
  themeVariables:{fontSize:'12px'},flowchart:{useMaxWidth:true},gantt:{useMaxWidth:true}});
window.__mermaidDone=false;
mermaid.run({querySelector:'.mermaid'}).then(()=>{window.__mermaidDone=true;}).catch(()=>{window.__mermaidDone=true;});
<\/script></body></html>`;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 30000 });
  await page.setRequestInterception(true);
  page.on('request', req => req.url().startsWith('data:') ? req.continue() : req.abort());
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction('window.__mermaidDone===true', { timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const data = await page.evaluate((A4) => {
    const results = [];

    // Mesurer chaque .mermaid
    document.querySelectorAll('.mermaid').forEach((el, i) => {
      const svg = el.querySelector('svg');
      const h = el.getBoundingClientRect().height;
      const firstLine = (el.textContent||'').trim().split('\n')[0].substring(0,40);
      results.push({
        type: 'mermaid', index: i+1,
        height: Math.round(h),
        tooTall: h > A4,
        firstLine,
      });
    });

    // Mesurer chaque table
    document.querySelectorAll('table').forEach((el, i) => {
      const h = el.getBoundingClientRect().height;
      const rows = el.querySelectorAll('tr').length;
      results.push({
        type: 'table', index: i+1,
        height: Math.round(h),
        tooTall: h > A4,
        rows,
      });
    });

    return results;
  }, A4_H_PX);

  const mermaidData = data.filter(d => d.type === 'mermaid');
  const tableData   = data.filter(d => d.type === 'table');

  console.log(`\n=== Diagrammes Mermaid (A4 utile ≈ ${A4_H_PX}px) ===`);
  mermaidData.forEach(d => {
    const flag = d.tooTall ? '⚠️  PLUS GRAND QU\'UNE PAGE' : '✅';
    console.log(`${flag} Diag ${d.index}: ${d.height}px — ${d.firstLine}`);
  });

  console.log(`\n=== Tableaux trop grands (> ${A4_H_PX}px) ===`);
  const bigTables = tableData.filter(d => d.tooTall);
  if (bigTables.length === 0) console.log('Aucun tableau ne dépasse une page.');
  bigTables.forEach(d => console.log(`⚠️  Table ${d.index}: ${d.height}px (${d.rows} lignes)`));

  console.log(`\n=== Résumé tableaux ===`);
  console.log(`Total: ${tableData.length} tableaux`);
  console.log(`< 200px: ${tableData.filter(d=>d.height<200).length}`);
  console.log(`200-${A4_H_PX}px: ${tableData.filter(d=>d.height>=200&&!d.tooTall).length}`);
  console.log(`> ${A4_H_PX}px: ${bigTables.length}`);

  await browser.close();
})().catch(e => { console.error('ERREUR:', e.message); process.exit(1); });
