#!/usr/bin/env node
/**
 * Générateur PDF — Dossier Projet B2B
 *
 * Pipeline :
 *   Markdown → HTML (marked + highlight.js) → Puppeteer → PDF A4
 *   Mermaid  : bundle local (aucun réseau)
 *   Sommaire : généré dynamiquement avec numéros de page estimés
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { marked }    = require('marked');
const hljs          = require('highlight.js');

// ── Chemins ───────────────────────────────────────────────────────────────
const ROOT    = path.resolve(__dirname, '..');
const MD_FILE = path.join(ROOT, 'docs md', 'Dossier_Projet_B2B_FINAL.md');
const OUT_PDF = path.join(ROOT, 'docs md', 'Dossier_Projet_B2B_FINAL.pdf');
const CSS_PRINT     = path.join(__dirname, 'print.css');
const MERMAID_JS    = path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js');
const HIGHLIGHT_CSS = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.css');

// ── Configuration marked ──────────────────────────────────────────────────
// Les blocs Mermaid ne passent PAS par highlight.js (injecte des <span> qui cassent Mermaid)
marked.setOptions({
  gfm: true,
  breaks: false,
  highlight(code, lang) {
    if (lang === 'mermaid') return code;
    if (lang && hljs.getLanguage(lang)) {
      try { return hljs.highlight(code, { language: lang }).value; } catch (_) { /* skip */ }
    }
    try { return hljs.highlightAuto(code).value; } catch (_) { return code; }
  },
});

// ── Lecture des fichiers source ───────────────────────────────────────────
console.log('📄 Lecture du fichier Markdown…');
const mdContent    = fs.readFileSync(MD_FILE, 'utf8');
const printCss     = fs.readFileSync(CSS_PRINT, 'utf8');
const mermaidJs    = fs.readFileSync(MERMAID_JS, 'utf8');
const highlightCss = fs.readFileSync(HIGHLIGHT_CSS, 'utf8');

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Convertit les <img src="chemin/relatif"> en data URIs base64.
 * Nécessaire car page.setContent() n'a pas de base URL pour résoudre les
 * chemins relatifs, et notre interception réseau bloque les file:// requests.
 * @param {string} html       - HTML généré par marked
 * @param {string} baseDir    - Répertoire du fichier Markdown source
 */
function inlineImages(html, baseDir) {
  return html.replace(/<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, pre, src, post) => {
    // Ignorer les data URIs et les URLs absolues
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      return match;
    }
    try {
      // Décoder les %20 etc., résoudre le chemin relatif par rapport au MD
      const decoded  = decodeURIComponent(src);
      const fullPath = path.resolve(baseDir, decoded);
      const ext      = path.extname(fullPath).slice(1).toLowerCase();
      const mimeMap  = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
                         gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp' };
      const mime     = mimeMap[ext] || 'image/png';
      const data     = fs.readFileSync(fullPath).toString('base64');
      return `<img ${pre}src="data:${mime};base64,${data}"${post}>`;
    } catch (err) {
      console.warn(`⚠️  Image non trouvée : ${src} (${err.message})`);
      return match; // laisser tel quel si introuvable
    }
  });
}

// ── Conversion Markdown → HTML body ──────────────────────────────────────
console.log('🔄 Conversion Markdown → HTML…');
let bodyHtml = marked.parse(mdContent);

// Convertit <pre><code class="language-mermaid">…</code></pre>
// en <div class="mermaid">…</div> requis par Mermaid.js
// + décode les entités HTML (&gt; → >) qui casseraient le parsing Mermaid
bodyHtml = bodyHtml.replace(
  /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
  (_, encoded) => {
    const decoded = encoded
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return `<div class="mermaid">${decoded}</div>`;
  }
);

// Convertit les images relatives en data URIs (résout le problème de base URL)
const MD_DIR = path.dirname(MD_FILE);
bodyHtml = inlineImages(bodyHtml, MD_DIR);

// Enveloppe le contenu avant le premier <h1> dans un div.cover-page
const firstH1Index = bodyHtml.indexOf('<h1');
if (firstH1Index > 0) {
  bodyHtml = `<div class="cover-page">${bodyHtml.slice(0, firstH1Index)}</div>${bodyHtml.slice(firstH1Index)}`;
}

// ── Construction du document HTML complet ────────────────────────────────
const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Horizon B2B — Dossier de projet</title>
  <style>${highlightCss}</style>
  <style>${printCss}</style>
</head>
<body class="markdown-body">
${bodyHtml}
<script>${mermaidJs}<\/script>
<script>
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  themeVariables: { fontSize: '12px', fontFamily: 'Segoe UI, Arial, sans-serif' },
  flowchart:     { useMaxWidth: true, htmlLabels: true },
  gantt:         { useMaxWidth: true },
  quadrantChart: { useMaxWidth: true },
  sequence:      { useMaxWidth: true },
  securityLevel: 'loose',
});
window.__mermaidDone = false;
mermaid.run({ querySelector: '.mermaid' })
  .then(() => { window.__mermaidDone = true; })
  .catch(() => { window.__mermaidDone = true; });
<\/script>
</body>
</html>`;

// ── Génération PDF via Puppeteer ──────────────────────────────────────────
(async () => {
  console.log('🚀 Lancement de Chromium…');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
           '--disable-web-security', '--allow-file-access-from-files'],
  });

  try {
    const page = await browser.newPage();

    // Bloquer toutes les ressources réseau externes (100% offline)
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (req.url().startsWith('data:') || req.url() === 'about:blank') req.continue();
      else req.abort();
    });

    // ── Chargement + rendu Mermaid ─────────────────────────────────────
    console.log('📝 Chargement du HTML dans le navigateur…');
    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded', timeout: 30000 });

    console.log('⏳ Attente du rendu Mermaid…');
    try {
      await page.waitForFunction('window.__mermaidDone === true', { timeout: 30000 });
      console.log('✅ Mermaid rendu avec succès');
    } catch (_) {
      console.warn('⚠️  Timeout Mermaid — on continue quand même');
    }

    // ── Mise à l'échelle des SVG trop grands ──────────────────────────
    // (> 850px de haut = plus grand qu'une page → page blanche sans ça)
    await page.evaluate(() => {
      const MAX_H = 850;
      document.querySelectorAll('.mermaid svg').forEach(svg => {
        const rect = svg.getBoundingClientRect();
        if (rect.height > MAX_H) {
          const scale = MAX_H / rect.height;
          const nW = Math.round(rect.width * scale);
          const nH = Math.round(rect.height * scale);
          svg.setAttribute('viewBox', `0 0 ${Math.round(rect.width)} ${Math.round(rect.height)}`);
          svg.setAttribute('width',  nW + 'px');
          svg.setAttribute('height', nH + 'px');
          svg.style.width  = nW + 'px';
          svg.style.height = nH + 'px';
        }
      });
    });

    await new Promise(r => setTimeout(r, 1000));

    // ── Mesure des positions pour le sommaire ─────────────────────────
    console.log('📋 Génération du sommaire…');
    const headings = await page.evaluate(() => {
      // Constante de calibration (px → page) mesurée sur ce document :
      // "1.7 Matrice RACI" à 4408px → page 6 dans le PDF sans sommaire
      // → 4408 / 5 pages de contenu ≈ 882px/page
      const PAGE_H = 882;
      // Décalage : 1 page de couverture + 1 page de sommaire = +2
      const OFFSET = 2;

      return Array.from(document.querySelectorAll('h1, h2, h3'))
        .map(el => {
          const top  = Math.round(el.getBoundingClientRect().top + window.scrollY);
          const page = Math.max(1, Math.ceil(top / PAGE_H) + OFFSET);
          return {
            tag:  el.tagName.toLowerCase(),  // h1, h2, h3
            text: el.textContent.trim().replace(/\s+/g, ' '),
            id:   el.id || '',
            page,
          };
        });
    });

    // ── Construction du HTML du sommaire ──────────────────────────────
    const tocItems = headings
      .filter(h => h.tag === 'h1' || h.tag === 'h2') // H1 + H2 seulement
      .map(h => {
        const cls   = h.tag === 'h1' ? 'toc-h1' : 'toc-h2';
        const label = h.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const href  = h.id ? `href="#${h.id}"` : '';
        return `<li class="${cls}">
          <a ${href}><span class="toc-label">${label}</span><span class="toc-page">${h.page}</span></a>
        </li>`;
      })
      .join('\n');

    const tocHtml = `
<div class="toc" id="toc">
  <h2 class="toc-title">Sommaire</h2>
  <ul class="toc-list">
    ${tocItems}
  </ul>
</div>`;

    // ── Injection du sommaire dans le DOM (après cover-page, avant premier H1) ─
    await page.evaluate((tocHtml) => {
      const coverPage = document.querySelector('.cover-page');
      if (coverPage) {
        coverPage.insertAdjacentHTML('afterend', tocHtml);
      } else {
        document.body.insertAdjacentHTML('afterbegin', tocHtml);
      }
    }, tocHtml);

    // Attendre que le rendu se stabilise après l'injection
    await new Promise(r => setTimeout(r, 1500));

    // ── Génération du PDF ──────────────────────────────────────────────
    console.log('🖨️  Génération du PDF…');
    await page.pdf({
      path: OUT_PDF,
      format: 'A4',
      printBackground: true,
      margin: { top: '22mm', right: '18mm', bottom: '24mm', left: '18mm' },
      displayHeaderFooter: true,
      headerTemplate: `
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          .hdr { width:100%; font-family:'Segoe UI',Arial,sans-serif; font-size:8pt; color:#666;
                 display:flex; justify-content:space-between; align-items:center; padding:0 18mm; }
          .hdr-l { font-weight:600; color:#1f3a5f; }
          .hdr-r { color:#888; font-style:italic; }
        </style>
        <div class="hdr">
          <span class="hdr-l">Horizon B2B &mdash; Dossier de projet</span>
          <span class="hdr-r">RNCP 39765 &middot; Bloc 2 &middot; &#201;preuve E2</span>
        </div>`,
      footerTemplate: `
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          .ftr { width:100%; font-family:'Segoe UI',Arial,sans-serif; font-size:8pt; color:#888;
                 display:flex; justify-content:center; align-items:center; padding:0 18mm; }
        </style>
        <div class="ftr">
          <span class="pageNumber"></span>&nbsp;/&nbsp;<span class="totalPages"></span>
        </div>`,
    });

    console.log(`\n✅ PDF généré : ${OUT_PDF}`);
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error('❌ Erreur fatale :', err);
  process.exit(1);
});
