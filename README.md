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
- Budget cible : **32 351 €** — Première MEP à **M+4** (30 juin 2025)

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
├── README.md                              ← ce fichier
│
├── Dossier_Projet_B2B_FINAL.md            ← dossier de projet complet (livrables collectifs)
├── plan_realisations_m1_projet_numerique.md  ← plan de réalisation phase par phase
├── Bloc2_Syllabus.md                      ← syllabus du module + fiche épreuve
├── RNCP_notation_module.md                ← grille d'évaluation EC02 (C10 → C15)
│
└── docs base/                             ← documents sources
    ├── RNCP39765-BC02-EC02.pdf            ← référentiel officiel de l'épreuve
    ├── Bloc 2- Syllabus - Management de Projet Numérique (EC).pdf
    ├── Dossier_Projet_B2B_FINAL.docx      ← version Word originale du dossier
    └── plan_realisations_m1_projet_numerique.html
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
| **Dossier de projet complet** | `Dossier_Projet_B2B_FINAL.md` | Tous les livrables collectifs (cadrage → MEP) |
| **Plan de réalisation** | `plan_realisations_m1_projet_numerique.md` | Feuille de route phase par phase avec mapping compétences |
| **Syllabus & fiche épreuve** | `Bloc2_Syllabus.md` | Objectifs pédagogiques, plan de cours, consignes E2 |
| **Grille d'évaluation** | `RNCP_notation_module.md` | Critères de notation C10 → C15 (barème 0 / 2 / 3 / 5) |

---

## Références

- **Référentiel RNCP 39765** — [France Compétences](https://www.francecompetences.fr/recherche/rncp/39765/)
- *A Guide to the Project Management Body of Knowledge (PMBOK® Guide)* — PMI, 7e éd. (2021)
- *Scrum Guide* — Schwaber & Sutherland (2020) — [scrumguides.org](https://scrumguides.org)
- *Site Reliability Engineering* — Google (2016) — référence SLI / SLO / error budgets
- [OWASP Top 10](https://owasp.org/Top10/) — sécurité API & SSO
- [RFC 6749 — OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) — protocole SSO / OIDC
