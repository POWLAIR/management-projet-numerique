# Management de Projets Numériques — RNCP 39765 · Bloc 2

> Certification **Expert en Architecture et Développement Logiciel** — Épreuve E2  
> Promotion 2025-2026 · Méthodologie hybride · MEP M+4

---

## Contexte

Ce dépôt regroupe l'ensemble des livrables et documents de référence produits dans le cadre du **Bloc 2 — BC02 : Manager les projets numériques** du titre RNCP 39765.

Le scénario de mise en situation porte sur la **refonte d'un portail B2B** pour TechPartner SA :

- Refonte complète d'un portail partenaires (API REST + React 18)
- Intégration d'un **SSO centralisé** (Keycloak / OAuth2 / OIDC)
- Module de **facturation automatisée** (export PDF, envoi email)
- Objectif : réduire de **−20 %** le délai de traitement des demandes partenaires
- Budget cible : **64 702 €** — Première MEP à **M+4** (30 juin 2026)

---

## Compétences couvertes

| Code | Intitulé |
|:----:|:---------|
| **C10** | Planifier et conduire le projet numérique |
| **C11** | Coordonner les équipes de projet |
| **C12** | Effectuer le suivi continu des indicateurs de performance |
| **C13** | Analyser des contenus de diverses sources d'informations spécialisées |
| **C14** | Réaliser des évaluations périodiques de l'avancement de projet |
| **C15** | Organiser des ateliers pratiques, revues de code et séances RETEX |

---

## Structure du dépôt

```
.
├── README.md
├── package.json                           ← pipeline de génération PDF
│
├── docs md/                               ← livrables Markdown
│   ├── Dossier_Projet_B2B_FINAL.md        ← dossier de projet complet (livrables collectifs)
│   ├── Dossier_Projet_B2B_FINAL.pdf       ← export PDF généré (npm run pdf)
│   ├── plan_realisations_m1_projet_numerique.md  ← plan de réalisation phase par phase
│   ├── Bloc2_Syllabus.md                  ← syllabus du module + fiche épreuve
│   ├── RNCP_notation_module.md            ← grille d'évaluation EC02 (C10 → C15)
│   └── ANNEXE_guide_soutenance_individuelle_P2.md  ← guide soutenance individuelle E2-P2
│
├── docs base/                             ← documents sources
│   ├── RNCP39765-BC02-EC02.pdf            ← référentiel officiel de l'épreuve
│   ├── Bloc 2- Syllabus - Management de Projet Numérique (EC).pdf
│   ├── Dossier_Projet_B2B_FINAL.docx      ← version Word originale du dossier
│   └── plan_realisations_m1_projet_numerique.html
│
├── asset/                                 ← captures d'écran Jira
│   ├── Screenshot 2026-05-20 170850.png   ← Sprint S1 — Socle SSO
│   ├── Screenshot 2026-05-20 170914.png   ← Sprint S3 — Facturation
│   └── Screenshot 2026-05-20 170931.png   ← Backlog retours client
│
└── print/                                 ← pipeline de génération PDF
    ├── generate-pdf.js                    ← script Puppeteer principal
    ├── print.css                          ← feuille de style A4
    └── md-to-pdf.config.cjs               ← config de référence
```

---

## Livrables produits

### Partie 1 — Collectif (E2-P1)

| # | Livrable | Compétence |
|:-:|:---------|:----------:|
| 1 | Note de cadrage, charte projet & matrice RACI | C10 |
| 2 | WBS, planning Gantt / roadmap, registre des risques, budget prévisionnel | C10 · C12 |
| 3 | Backlog priorisé (épics → stories, DoR / DoD), tableau Kanban Jira | C11 |
| 4 | Tableau de bord KPI (SPI / CPI, burndown, vélocité), plan d'actions correctives | C12 · C14 |
| 5 | Journal d'incident technique (sources FR + EN) | C13 |
| 6 | Mini-plan de montée en compétences (ateliers, RETEX, revues de code) + indicateurs d'impact | C15 |

### Partie 2 — Individuel (E2-P2)

Soutenance orale de **10 minutes** (+ 5 min Q/R jury) présentant :
- Rôle & apports personnels dans l'équipe
- Choix méthodologique hybride argumenté
- Analyse des écarts et mesures correctives
- Recommandations & leçons apprises

---

## Résumé

| Livrable | Fichier | Rôle |
|:---------|:--------|:-----|
| **Dossier de projet complet** | `docs md/Dossier_Projet_B2B_FINAL.md` | Tous les livrables collectifs (cadrage → MEP) |
| **Export PDF** | `docs md/Dossier_Projet_B2B_FINAL.pdf` | Version imprimable générée via `npm run pdf` |
| **Plan de réalisation** | `docs md/plan_realisations_m1_projet_numerique.md` | Feuille de route phase par phase avec mapping compétences |
| **Syllabus & fiche épreuve** | `docs md/Bloc2_Syllabus.md` | Objectifs pédagogiques, plan de cours, consignes E2 |
| **Grille d'évaluation** | `docs md/RNCP_notation_module.md` | Critères de notation C10 → C15 (barème 0 / 2 / 3 / 5) |
| **Annexe soutenance individuelle** | `docs md/ANNEXE_guide_soutenance_individuelle_P2.md` | Guide de préparation E2-P2 |

---

## Génération PDF

Le dossier de projet est exportable en PDF A4 via un pipeline Node.js / Puppeteer intégré au dépôt.

```bash
npm install        # installe les dépendances (Puppeteer, Mermaid, highlight.js) — une seule fois
npm run pdf        # génère docs md/Dossier_Projet_B2B_FINAL.pdf  (~8 secondes)
```

Fonctionnalités du pipeline :

- **12 diagrammes Mermaid** rendus (flowchart, gantt, quadrantChart, XY chart…) depuis un bundle local sans réseau
- **Sommaire automatique** avec numéros de page estimés et liens cliquables internes
- **Images Jira intégrées** en base64 (aucune dépendance externe au moment de la génération)
- **Sauts de page maîtrisés** : titres jamais orphelins, tableaux paginables ligne par ligne, diagrammes mis à l'échelle
- **En-tête / pied de page** : titre du dossier, référence RNCP, numérotation `n / total`

---

## Références

- **Référentiel RNCP 39765** — [France Compétences](https://www.francecompetences.fr/recherche/rncp/39765/)
- *A Guide to the Project Management Body of Knowledge (PMBOK® Guide)* — PMI, 7e éd. (2021)
- *Scrum Guide* — Schwaber & Sutherland (2020) — [scrumguides.org](https://scrumguides.org)
- *Site Reliability Engineering* — Google (2016) — référence SLI / SLO / error budgets
- [OWASP Top 10](https://owasp.org/Top10/) — sécurité API & SSO
- [RFC 6749 — OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) — protocole SSO / OIDC
