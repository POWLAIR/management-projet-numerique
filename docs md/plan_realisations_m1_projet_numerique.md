# Plan de réalisation — Projet M1 Management Numérique

> De la mise en place jusqu'au diaporama P2 — Méthodologie hybride — MEP M+4

---

## Légende des compétences

| Code | Compétence |
|:----:|:-----------|
| **C10** | Planification |
| **C11** | Coordination |
| **C12** | KPI |
| **C13** | Incidents |
| **C14** | Revues |
| **C15** | Compétences (montée en compétences) |

---

## Phase 1 — Cadrage & gouvernance

> *Livrables fondateurs — À produire en premier*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **Note de cadrage & charte projet** | `C10.1` | Enjeux · Périmètre (API + front + facturation + SSO) · Hypothèses · Contraintes · Objectif **−20 %** délai partenaires · Budget cible · **MEP M+4** |
| **Matrice RACI** | `C10.1` `C11.2` | Rôles : Chef de projet · Tech lead · Dev front · Dev back · QA · Sponsor DSI · Partenaires métier · Inclure PSH |
| **Cartographie des parties prenantes** | `C10.1` | Grille influence / intérêt · Plan de communication associé |
| **Gouvernance & comités** | `C10.1` | COPIL mensuel · COPRO bimensuel · Daily standup · Matrice de décision |

---

## Phase 2 — Planification & budget

> *Structure du projet — Jalons — Risques*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **WBS (Work Breakdown Structure)** | `C10.2` | Décomposition : Cadrage · Architecture API · Dev front · Module facturation · SSO · Tests · Déploiement · Formation · **3 niveaux minimum** |
| **Planning Gantt / roadmap avec jalons** | `C10.2` | Phase prédictive (M0 → M1) + sprints agiles (M1 → M4) · Chemin critique identifié · Jalons : kick-off · fin cadrage · fin sprint 1–4 · recette · MEP |
| **Budget prévisionnel** | `C12.1` | Estimations par lots (charges × TJM) · Réserve pour aléas (**10–15 %**) · Ventilation mensuelle · Baseline budgétaire signée sponsor |
| **Registre des risques** | `C10.2` | Colonnes : ID · Description · Probabilité (1 → 5) · Impact (1 → 5) · Criticité · Propriétaire · Plan de réponse · Statut · **Minimum 8 risques** couvrant tech, budget, RH, planning |
| **Plan qualité** | `C10.2` | Critères d'acceptation · Processus de review · Outils de test · Seuils de couverture |

---

## Phase 3 — Méthodologie & coordination agile

> *Choix hybride argumenté — Backlog — Outils*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **Note de choix méthodologique** | `C11.1` | Justification hybride : cadrage prédictif (périmètre fixe SSO / facturation) + sprints agiles (front évolutif) · Comparatif **agile pur vs hybride vs cycle en V** |
| **Backlog priorisé (épics → stories)** | `C11.1` | Épics : Auth SSO · Portail B2B · API partenaires · Facturation · Admin · **DoR** et **DoD** définis · Stories avec critères d'acceptation · Priorisation **MoSCoW** |
| **Tableau Kanban / Jira configuré** | `C11.1` | Colonnes : Backlog · To Do · In Progress · Review · Done · Limites **WIP** définies · Procès-verbaux des décisions horodatés |
| **Définition des rituels agiles** | `C11.2` | Sprint planning · Daily standup · Sprint review · Rétrospective · Fréquences et durées · Rôles dans chaque rituel |

---

## Phase 4 — KPI, reporting & suivi budgétaire

> *Tableau de bord — Indicateurs agiles — Écarts*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **Tableau de bord KPI** | `C12.1` `C14.1` | **Coût** : Budget consommé vs prévu · CPI (Cost Performance Index) · EV, AC, PV · **Délai** : SPI (Schedule Performance Index) · **Qualité** : taux de bugs · couverture tests · taux de stories livrées |
| **Indicateurs agiles : burndown & vélocité** | `C12.1` | Burndown chart par sprint (idéal vs réel) · Burnup cumulé · Vélocité moyenne · Prévision de livraison |
| **Plan d'actions correctives** | `C12.2` | Tableau : Écart identifié · Cause racine · Action corrective · Responsable · Délai · KPI de suivi · **Au moins 3 scénarios** (retard planning · dépassement budget · dette technique) |
| **Revue de performance & rapport d'étape** | `C14.1` `C14.2` | Structure : Avancement vs plan · KPI période · Risques actifs · Décisions prises · Points d'attention · Prochaines actions · **1 rapport par sprint minimum** |

---

## Phase 5 — Résolution d'incidents

> *Journal structuré — Sources FR/EN — `C13`*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **Journal d'incident technique** | `C13.1` `C13.2` | **1 incident réaliste** (ex : SSO token expiry · API rate limit · régression facturation) · Champs : Date · Description · Impacts · Analyse cause · Options étudiées (sources EN) · Décision retenue · Mitigation · Clôture · **Sources en anglais citées** |

> 💡 **Exemples de sources EN à mobiliser :** OWASP, RFC OAuth2, Stripe API docs, Swagger / OpenAPI spec, NIST incident handling guide.

---

## Phase 6 — Montée en compétences (`C15`)

> *Ateliers — RETEX — Revues de code — Mesure d'impact*

| Livrable | Compétences | Détail |
|:---------|:-----------:|:-------|
| **Mini-plan d'animation** | `C15.1` | Atelier SSO / OAuth (1 h) · Revue de code collaborative (bi-hebdo) · RETEX fin de sprint · Format · Animateur · Durée · Objectifs pédagogiques · Actions post-session |
| **Indicateurs d'impact mesurables** | `C15.2` | Réduction des bugs (%) · Amélioration couverture tests · Réduction lead time · Score satisfaction équipe (1–5) · Réduction duplications de code · **Évolution entre sprint 1 et sprint 4** |

---

## Phase 7 — Diaporama P2 — Soutenance individuelle

> *10 min présentation + 5 min Q/R — Anonymat obligatoire*

### Structure du diaporama (12–15 slides)

| Slide | Contenu | Compétence |
|:-----:|:--------|:----------:|
| **1** | Contexte & enjeux du projet *(30 s)* | — |
| **2** | Mon rôle & mes apports dans l'équipe *(1 min)* | — |
| **3** | Choix méthodologique hybride argumenté | `C10.1` |
| **4** | Planification : WBS, jalons, chemin critique | `C10.2` |
| **5** | Gouvernance, RACI, rituels agiles | `C11` |
| **6** | Backlog & DoR / DoD | `C11.1` |
| **7** | Tableau de bord KPI : SPI / CPI, burndown | `C12.1` |
| **8** | Analyse des écarts & mesures correctives | `C12.2` |
| **9** | Journal d'incident (FR + sources EN) | `C13` |
| **10** | Revue de performance & rapport d'étape | `C14` |
| **11** | Plan de montée en compétences + indicateurs d'impact | `C15` |
| **12** | Recommandations & leçons apprises | — |
| **13** | Conclusion & ouverture *(30 s)* | — |

### Préparation aux questions jury

- Pourquoi **hybride** plutôt que **Scrum pur** ?
- Comment avez-vous géré le dérapage X ?
- Que signifie un **CPI < 1** ?
- Comment mesurez-vous la **réduction de 20 %** ?
- Quelle source EN pour l'incident SSO ?

> ⚠️ **Règle anonymat :** aucun nom, prénom ou identifiant personnel dans les slides. **Numéro de candidat uniquement.**
