/**
 * Configuration md-to-pdf
 * Dossier Projet B2B — Horizon B2B · TechPartner SA
 * https://github.com/simonhaenisch/md-to-pdf
 */
'use strict';

const path = require('path');

module.exports = {
  /* ── Sortie ──────────────────────────────────────────────── */
  dest: path.resolve(__dirname, '../docs md/Dossier_Projet_B2B_FINAL.pdf'),

  /* ── CSS ─────────────────────────────────────────────────── */
  stylesheet: [path.resolve(__dirname, 'print.css')],

  /* ── Options de page Puppeteer ───────────────────────────── */
  pdf_options: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '22mm',
      right: '18mm',
      bottom: '24mm',
      left: '18mm',
    },
    displayHeaderFooter: true,
    /* En-tête : titre aligné à droite */
    headerTemplate: `
      <style>
        .header-wrap {
          width: 100%;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 8pt;
          color: #666;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18mm;
          box-sizing: border-box;
        }
        .header-left { font-weight: 600; color: #1f3a5f; }
        .header-right { color: #888; font-style: italic; }
      </style>
      <div class="header-wrap">
        <span class="header-left">Horizon B2B &mdash; Dossier de projet</span>
        <span class="header-right">RNCP 39765 &middot; Bloc 2 &middot; E2</span>
      </div>`,
    /* Pied de page : numérotation centrée */
    footerTemplate: `
      <style>
        .footer-wrap {
          width: 100%;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 8pt;
          color: #888;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 18mm;
          box-sizing: border-box;
        }
      </style>
      <div class="footer-wrap">
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`,
  },

  /* ── Options Puppeteer (Chromium) ────────────────────────── */
  launch_options: {
    /* Indispensable sous WSL / Docker / CI sans sandbox */
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  },

  /* ── Mermaid : injection du script pour le rendu diagrammes ─ */
  /* md-to-pdf gère Mermaid nativement via un script injecté.    */
  /* On force mermaid ≥ 10 pour quadrantChart et gantt.          */
  body_class: 'markdown-body',

  /* ── Marked options ──────────────────────────────────────── */
  marked_options: {
    gfm: true,
    breaks: false,
  },
};
