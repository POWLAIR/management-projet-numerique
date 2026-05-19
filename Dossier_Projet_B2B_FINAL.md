DOSSIER DE PROJET

Refonte Portail B2B - Intégration SSO & Module de Facturation

RNCP 39765 - Bloc 2 : Manager les projets numériques

Épreuve E2 - Mise en situation professionnelle reconstituée

| Rôle | Membre | Responsabilités principales |
| --- | --- | --- |
| Chef de Projet (CP) | Chef de Projet | Cadrage, planning, pilotage global, reporting COPIL |
| Développeur (DEV) | Développeur | Architecture technique, dev API/SSO, gestion incidents |
| Analyste (ANA) | Analyste | Risques, KPI, budget, revues de performance, RETEX |

Date de remise livrables : 22 mai 2025   |   Soutenance : 2 juillet 2025   |   Promotion 2025-2026

# LIVRABLE 1 - Note de cadrage & Charte projet

Responsable : Chef de Projet (CP)   |   Contributions : Analyste (parties prenantes, contraintes)   |   Compétence visée : C10

## 1.1 Contexte et enjeux

La DSI de TechPartner SA exploite depuis 2018 un portail B2B monolithique (PHP/MySQL) utilisé par 140 partenaires actifs pour soumettre et suivre leurs commandes. Les délais de traitement atteignent en moyenne 6,2 jours, bien au-delà de la cible sectorielle de 5 jours. L'architecture actuelle ne permet plus d'évoluer sans risque de régression.

Le sponsor (Directeur de la DSI) a validé en janvier 2025 un budget et une roadmap pour une refonte complète intégrant une API REST, un SSO centralisé et un module de facturation automatisée.

| Enjeu | Description | Mesure de succès | Priorité |
| --- | --- | --- | --- |
| Performance | Réduire de 20 % le délai de traitement des demandes partenaires | Délai moyen ≤ 5,0 j (vs 6,2 j actuel) | CRITIQUE |
| Sécurité | Centraliser l'authentification via SSO (OAuth2/OIDC) | 0 compte orphelin à M+4 | HAUTE |
| Automatisation | Module facturation : génération et envoi automatiques | 100 % des factures auto-générées | HAUTE |
| Budget | Tenir l'enveloppe de 32 351 € validée par le COMEX | CPI ≥ 0,90 à chaque jalon | HAUTE |
| Délai | Première MEP à M+4 (30 juin 2025) - impératif sponsor | Go/NoGo validé à M+4 | CRITIQUE |

## 1.2 Périmètre

### Dans le périmètre (IN)

- Refonte complète du front-end portail partenaires (React 18)

- Développement et exposition des API REST (commandes, statuts, facturation) : Node.js / Express

- Intégration du module SSO via protocole OAuth2/OIDC (Keycloak)

- Module de facturation automatisée avec export PDF et envoi email

- Tests unitaires, d'intégration et recette fonctionnelle

- Documentation technique et guide utilisateur partenaires

### Hors périmètre (OUT)

- Migration des données historiques antérieures à janvier 2023

- Refonte du back-office interne DSI (phase 2 : post M+4)

- Déploiement multi-pays / multi-devises

- Application mobile partenaires

## 1.3 Hypothèses & Contraintes

| Type | Description | Impact potentiel | Mesure prise |
| --- | --- | --- | --- |
| Hypothèse | Les partenaires disposent d'un accès HTTPS stable et d'un navigateur récent (2022+) | Faible | Guide de prérequis envoyé à J-10 |
| Hypothèse | L'environnement de dev/recette est disponible dès J+5 (validé avec l'infra) | Moyen | Confirmation écrite infra reçue |
| Hypothèse | Le fournisseur SSO Keycloak est déjà licencié par l'entreprise | Moyen | Vérifié en séance de cadrage |
| Contrainte | Budget de 32 351 € non révisable : toute dérive > 5 % nécessite un arbitrage sponsor | Fort | Suivi CPI hebdomadaire |
| Contrainte | MEP M+4 (30 juin 2025) non négociable - engagement contractuel partenaires | Critique | Jalon Go/NoGo à M+3 S2 |
| Contrainte | Conformité RGPD obligatoire pour toutes les données partenaires traitées | Fort | Checklist RGPD intégrée à la DoD |
| Contrainte | Équipe de 3 personnes : disponibilité CP à 60 %, DEV à 100 %, ANA à 70 % | Moyen | WBS ajusté aux capacités réelles |

## 1.4 Parties prenantes

| Partie prenante | Rôle | Attentes principales | Niveau d'influence | Mode d'engagement |
| --- | --- | --- | --- | --- |
| Directeur DSI (Sponsor) | Commanditaire & décideur budget | ROI, tenue délai M+4, rapport mensuel | Très fort | COPIL mensuel |
| Chef de Projet | Pilotage opérationnel | Clarté du périmètre, outils disponibles | Fort | COPROJ hebdo + daily |
| Développeur | Réalisation technique | Specs stables, environnement fonctionnel | Fort | Daily + sprint |
| Analyste | Analyse, risques, KPI | Accès aux données de production | Moyen | COPROJ hebdo |
| Partenaires B2B (140) | Utilisateurs finaux | UX fluide, rapidité, stabilité | Moyen | Test utilisateur M+2 |
| Équipe Sécurité DSI | Validation SSO & RGPD | Conformité, audit trail | Moyen | Revue à chaque jalon |
| Comptabilité | Validation module facturation | Exactitude, traçabilité, export comptable | Faible | UAT à M+3 |

## 1.5 Gouvernance du projet

| Instance | Fréquence | Participants | Objectif | Livrable |
| --- | --- | --- | --- | --- |
| COPIL | Mensuel (J+30, J+60, J+90, J+120) | Sponsor, CP, ANA | Décisions stratégiques, budget | Rapport d'avancement COPIL |
| COPROJ | Hebdomadaire (lundi 9h) | CP, DEV, ANA | Suivi opérationnel, levée des blocages | PV de réunion horodaté |
| Daily stand-up | Quotidien (9h15, 15 min max) | CP, DEV, ANA | Synchronisation quotidienne | Mise à jour Kanban Jira |
| Sprint Planning | J1 de chaque sprint (2 sem.) | CP, DEV, ANA | Sélection et estimation des stories | Sprint backlog validé |
| Sprint Review | Dernier jour de chaque sprint | Équipe + Sponsor (si dispo) | Démo, feedback, validation | Backlog mis à jour |
| Sprint Rétrospective | Après chaque Review (30 min) | CP, DEV, ANA | Amélioration continue process | Plan d'actions RETEX |

## 1.6 Matrice RACI

R = Responsible (réalise)   |   A = Accountable (garant)   |   C = Consulté   |   I = Informé

| Activité / Livrable | Chef de Projet | Développeur | Analyste | Sponsor |
| --- | --- | --- | --- | --- |
| Note de cadrage & charte | A/R | C | C | I |
| Matrice RACI | A/R | I | C | I |
| WBS & estimation charges | A | C | R | I |
| Planning Gantt / roadmap | A/R | C | C | I |
| Registre des risques | A | C | R | I |
| Budget prévisionnel | A | C | R | A |
| Architecture technique | I | A/R | C | I |
| Développement API REST | I | A/R | I | I |
| Intégration SSO Keycloak | I | A/R | C | I |
| Module de facturation | I | A/R | C | I |
| Backlog & User Stories | A | R | C | I |
| Tableau Kanban (suivi) | C | R | A | I |
| Tests unitaires & intégration | I | A/R | C | I |
| Recette fonctionnelle UAT | A | C | R | I |
| Tableau de bord KPI | A | C | R | I |
| Revues de performance | R | C | A/R | C |
| Rapports COPIL | A/R | I | C | A |
| Journal d'incidents | A | R | C | I |
| Plan montée en compétences | A | R | C | I |
| MEP & mise en production | A/R | R | C | A |

# LIVRABLE 2 - WBS, Planning & Budget prévisionnel

Responsable : Chef de Projet (CP)   |   Contributions : Développeur (estimations techniques), Analyste (budget, risques)   |   Compétence visée : C10

## 2.1 Work Breakdown Structure (WBS)

Le projet est décomposé en 5 lots principaux, chacun découpé en sous-livrables assignés à un responsable unique.

| Lot | Sous-livrable | Description | Resp. | Charge (j/h) | Durée |
| --- | --- | --- | --- | --- | --- |
| L1 - Cadrage & Gouvernance | 1.1 Note de cadrage | Contexte, périmètre, contraintes, RACI | CP | 2 | 3 j |
| L1 - Cadrage & Gouvernance | 1.2 Registre risques initial | Identification, cotation, plans de réponse | ANA | 1,5 | 2 j |
| L1 - Cadrage & Gouvernance | 1.3 Budget prévisionnel | Estimation charges, coûts, réserves | ANA | 1 | 1 j |
| L2 - Architecture & Dev | 2.1 Architecture & specs API | Schéma, contrats d'interface, tech stack | DEV | 4 | 5 j |
| L2 - Architecture & Dev | 2.2 Développement API REST | Endpoints commandes, statuts, partenaires | DEV | 8 | 10 j |
| L2 - Architecture & Dev | 2.3 Intégration SSO Keycloak | OAuth2/OIDC, gestion des rôles et tokens | DEV | 7 | 9 j |
| L2 - Architecture & Dev | 2.4 Module de facturation | Génération PDF, envoi email, historique | DEV | 6 | 8 j |
| L2 - Architecture & Dev | 2.5 Front-end React | Portail partenaires, tableau de bord | DEV | 5 | 7 j |
| L3 - Tests & Recette | 3.1 Tests unitaires | Jest (front) + Pytest (back) - cov. > 70 % | DEV | 4 | 5 j |
| L3 - Tests & Recette | 3.2 Tests d'intégration | Scénarios end-to-end Cypress | DEV | 3 | 4 j |
| L3 - Tests & Recette | 3.3 Recette fonctionnelle UAT | Validation avec représentants partenaires | ANA | 3 | 4 j |
| L4 - Pilotage | 4.1 Reporting & COPIL | Rapports mensuels, tableaux de bord KPI | CP + ANA | 4 | Continu |
| L4 - Pilotage | 4.2 Gestion des risques | Mise à jour registre, plans correctives | ANA | 2 | Continu |
| L4 - Pilotage | 4.3 Coordination équipe | Daily, COPROJ, PV, décisions | CP | 3 | Continu |
| L5 - Déploiement & Clôture | 5.1 MEP production | Déploiement, tests de fumée, monitoring | DEV + CP | 2 | 2 j |
| L5 - Déploiement & Clôture | 5.2 Documentation | Guide tech., guide utilisateur partenaires | DEV + ANA | 2 | 3 j |
| L5 - Déploiement & Clôture | 5.3 Bilan de projet | RETEX final, rapport de clôture | CP + ANA | 1 | 1 j |

## 2.2 Jalons & chemin critique

| # | Jalon | Livrable(s) associé(s) | Date cible | Resp. | Statut |
| --- | --- | --- | --- | --- | --- |
| J0 | Lancement officiel du projet | Note de cadrage validée, RACI, budget | 02/03/2025 | CP | OK |
| J1 | Architecture validée | Schéma API, choix stack, specs SSO | 28/03/2025 | DEV | OK |
| J2 | Livraison Dev M1 | API REST + SSO fonctionnels en recette | 25/04/2025 | DEV | VIGILANCE |
| J3 | Recette UAT validée | PV de recette signé, go partenaires | 06/06/2025 | ANA | PARTIEL |
| J4 | MEP Go/NoGo | Mise en production validée | 30/06/2025 | CP | PARTIEL |

Note sur J2 : Un retard de 3 jours sur l'intégration SSO (incident INC-001 - voir L6) a été absorbé par anticipation. Le jalon J2 est repoussé au 28/04/2025 mais reste dans la marge de flottement du chemin critique.

→ Diagramme de Gantt : le planning complet est disponible sur le board Jira du projet (lien : [URL Jira]) et en annexe sous format image.

## 2.3 Budget prévisionnel et suivi

| Poste de charge | Quantité | TJM (€) | Budget prévu (€) | Réalisé à date (€) | Écart (€) |
| --- | --- | --- | --- | --- | --- |
| Chef de Projet | 15 j/h | 450 €/j | 6 750 | 4 050 | + 0 (en cours) |
| Développeur | 28 j/h | 500 €/j | 14 000 | 9 500 | - 500 (retard INC-001) |
| Analyste | 12 j/h | 430 €/j | 5 160 | 3 010 | + 0 (en cours) |
| Licences & outils (Jira, SonarQube, Keycloak) | - | - | 1 500 | 1 500 | 0 |
| Infrastructure (serveurs recette + prod) | - | - | 2 000 | 1 200 | + 800 (budget non consommé) |
| Réserve pour aléas (10 %) | - | - | 2 941 | 800 (INC-001) | + 2 141 |
| TOTAL |  |  | 32 351 | 20 060 | CPI = 0,97 |

Lecture du CPI : CPI = 0,97 → pour chaque euro dépensé, 0,97 € de valeur est produite. Situation saine, légèrement sous-performante sur le lot DEV en raison de l'incident SSO. Aucun arbitrage de périmètre nécessaire à ce stade.

# LIVRABLE 3 - Registre des risques

Responsable : Analyste (ANA)   |   Contributions : Développeur (risques techniques), Chef de Projet (risques planning/budget)   |   Compétence visée : C10, C12

Échelle de cotation : Probabilité : 1 = Faible | 2 = Moyen | 3 = Fort   ×   Impact : 1 = Mineur | 2 = Modéré | 3 = Majeur   →   Criticité = P × I

| ID | Risque identifié | Catégorie | P | I | Criticité | Statut | Plan de réponse | Resp. | Mise à jour |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | Retard intégration SSO Keycloak (complexité OAuth2 sous-estimée) | Technique | 3 | 3 | 9 - CRITIQUE | ACTIVE - en cours de résolution (INC-001) | Prototypage spike dès S1 ; correctif en cours (redirect_uri + NTP) ; buffer de 3 jours sur chemin critique | DEV | 25/04/25 |
| R02 | Dépassement budgétaire suite aux aléas techniques | Budget | 2 | 3 | 6 - ÉLEVÉ | SURVEILLE - CPI = 0,97 | Suivi CPI hebdomadaire ; si CPI < 0,90 → arbitrage scope avec sponsor ; réserve de 2 941 € disponible | ANA / CP | 22/04/25 |
| R03 | Indisponibilité d'un membre (maladie, contrainte externe) | Ressources | 2 | 2 | 4 - MOYEN | NON ACTIVE | Polyvalence croisée documentée ; wiki technique maintenu à jour ; contrat de sous-traitance identifié (délai 48h) | CP | 15/04/25 |
| R04 | Non-conformité RGPD sur le module de facturation (données partenaires) | Juridique | 1 | 3 | 3 - MOYEN | NON ACTIVE | Checklist RGPD intégrée à la DoD ; revue sécurité planifiée au jalon J3 ; DPO consulté en phase de specs | ANA | 10/03/25 |
| R05 | Rejet de la recette UAT par les partenaires (UX non validée) | Qualité | 2 | 2 | 4 - MOYEN | NON ACTIVE - test M+2 prévu | Test utilisateur avec 5 partenaires pilotes à M+2 ; itérations UX intégrées dans le sprint S4 avant recette finale | DEV / ANA | 01/04/25 |
| R06 | Perte ou corruption de données en environnement de recette | Technique | 1 | 3 | 3 - MOYEN | NON ACTIVE | Sauvegardes automatiques quotidiennes (snapshot S3) ; environnements strictement isolés (dev/recette/prod) | DEV | 02/03/25 |
| R07 | Dépendance critique fournisseur Keycloak (license, support) | Externe | 1 | 2 | 2 - FAIBLE | NON ACTIVE | Alternative étudiée : Auth0 (migration < 2 semaines) ; contrat de support Keycloak vérifié jusqu'à fin 2026 | DEV | 15/03/25 |

Synthèse risques : 1 risque CRITIQUE activé (R01 - SSO) en cours de résolution | 1 risque ÉLEVÉ sous surveillance (R02 - budget) | 5 risques MOYEN/FAIBLE non activés

# LIVRABLE 4 - Méthodologie, Backlog priorisé & Tableau Kanban

Responsable : Développeur (DEV)   |   Contributions : Chef de Projet (priorisation), Analyste (DoR/DoD, WIP)   |   Compétences visées : C11

## 4.1 Choix méthodologique - Approche hybride

Après analyse du contexte projet, l'équipe a retenu une approche hybride combinant les jalons contractuels d'un cycle en V (pour répondre à l'impératif M+4 du sponsor) et les sprints Scrum de 2 semaines (pour intégrer les retours partenaires et gérer l'incertitude technique).

| Critère de choix | Justification pour notre projet |
| --- | --- |
| Délai M+4 non négociable (contractuel) | Des jalons fixes imposés à J1, J2, J3, J4 garantissent la traçabilité des engagements vis-à-vis du sponsor. Un Scrum pur sans jalons fixes aurait été incompatible. |
| Périmètre partiellement incertain (UX, SSO) | Les sprints de 2 semaines permettent d'intégrer les retours des 5 partenaires pilotes testeurs sans remettre en cause l'ensemble du planning. |
| Équipe réduite (3 personnes) | Le Kanban avec WIP maximum de 2 par personne évite la surcharge et rend visible l'engorgement dès qu'il se produit. |
| Intégration SSO à risque élevé | Un spike technique d'une semaine a été planifié en Sprint 1 pour lever l'incertitude Keycloak avant d'engager le développement complet. |
| Reporting sponsor mensuel | La cadence COPIL mensuelle s'aligne naturellement sur 2 sprints de 2 semaines, permettant une démo à chaque COPIL. |

## 4.2 Definition of Ready (DoR) & Definition of Done (DoD)

### Definition of Ready - conditions pour qu'une story entre en sprint

- Story rédigée au format canonique : En tant que [rôle], je veux [action] afin de [bénéfice métier]

- Critères d'acceptation rédigés (format Given/When/Then) et validés par le Chef de Projet

- Estimation réalisée en points par l'équipe (Planning Poker - consensus ou ≤ 2 points d'écart)

- Maquette ou spécification disponible si la story implique une interface

- Dépendances techniques identifiées et levées (ou plan de levée documenté)

- Story tient dans un sprint (≤ 8 points) - sinon décomposition obligatoire

### Definition of Done - conditions pour qu'une story soit considérée terminée

- Code développé, revu par un pair (pull request approuvée - minimum 1 review)

- Tests unitaires écrits et passants - couverture ≥ 70 % sur les nouveaux fichiers

- Tests d'intégration ou de régression exécutés sans échec

- Documentation technique mise à jour (README, swagger API si endpoint concerné)

- Story validée en environnement de recette (pas seulement en local)

- Checklist RGPD vérifiée et cochée si la story traite des données personnelles partenaires

- Ticket Jira passé en statut « Done » avec commentaire de clôture

## 4.3 Backlog priorisé - Sprints 1 à 4

Priorisation MoSCoW : MUST = obligatoire pour MEP M+4 | SHOULD = haute valeur, inclus si possible | COULD = optionnel | WON'T = hors périmètre V1

| ID | Épic | User Story | Priorité | Pts | Sprint | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| US01 | SSO | En tant que partenaire, je veux me connecter via SSO (OAuth2) afin d'éviter de gérer plusieurs mots de passe | MUST | 8 | S1 | ✅ Done |
| US02 | SSO | En tant qu'admin DSI, je veux gérer les rôles et habilitations SSO afin de contrôler les accès par profil partenaire | MUST | 5 | S1 | ✅ Done |
| US03 | SSO | En tant que partenaire, je veux être redirigé automatiquement après expiration de session afin de ne pas perdre mon travail | SHOULD | 3 | S1 | ✅ Done |
| US04 | API Commandes | En tant que partenaire, je veux soumettre une commande via API REST afin d'automatiser mes flux ERP | MUST | 8 | S2 | ✅ Done |
| US05 | API Commandes | En tant que partenaire, je veux consulter le statut de ma commande en temps réel via l'API afin de piloter mes livraisons | MUST | 5 | S2 | ✅ Done |
| US06 | API Commandes | En tant que partenaire, je veux recevoir un webhook lors de chaque changement de statut afin d'être alerté sans polling | SHOULD | 5 | S2 | 🔄 In Progress |
| US07 | Facturation | En tant que comptable partenaire, je veux qu'une facture PDF soit auto-générée à la validation de commande afin d'éliminer la saisie manuelle | MUST | 8 | S3 | 📋 To Do |
| US08 | Facturation | En tant que partenaire, je veux télécharger mes factures au format PDF depuis le portail afin d'archiver mes documents | MUST | 3 | S3 | 📋 To Do |
| US09 | Facturation | En tant que comptable DSI, je veux exporter les factures en format CSV/Excel afin d'alimenter le logiciel comptable | SHOULD | 3 | S3 | 📋 To Do |
| US10 | Tableau de bord | En tant que partenaire, je veux visualiser mes KPI commandes (volume, délai, taux de succès) sur un dashboard afin de piloter mon activité | SHOULD | 5 | S4 | 📋 To Do |
| US11 | Notifications | En tant que partenaire, je veux recevoir un email récapitulatif hebdomadaire de mes commandes afin de suivre mon activité sans connexion | COULD | 3 | S4 | 📋 To Do |
| US12 | Documentation | En tant que développeur partenaire, je veux accéder à une documentation Swagger interactive afin d'intégrer l'API sans contacter le support | SHOULD | 2 | S4 | 📋 To Do |

## 4.4 Tableau Kanban - État à la date de rendu (22/05/2025)

Règle WIP : Maximum 2 stories en cours simultanément par personne - toute entrée en 'In Progress' au-delà de cette limite est bloquée jusqu'à livraison d'une story existante

| 📋 TO DO (7 stories) | 🔄 IN PROGRESS - WIP max 2 | 👁 IN REVIEW | ✅ DONE (4 stories) |
| --- | --- | --- | --- |
| US07 - Facture auto PDF US08 - Téléchargement PDF US09 - Export CSV US10 - Dashboard KPI US11 - Email récap US12 - Doc Swagger | US06 - Webhook statut [DEV] (démarré 20/04, en attente test) | - (aucune story en revue à cette date) | US01 - Connexion SSO US02 - Gestion rôles US03 - Redirect session US04 - Soumission commande US05 - Statut temps réel |

Point d'attention : US06 (webhook) est en cours depuis 10 jours - durée inhabituelle. Investigation en cours : complexité de la gestion des retry et de l'idempotence. Décision COPROJ du 21/05 : découpage en US06a (émission webhook) + US06b (retry logic) pour débloquer la livraison partielle.

# LIVRABLE 5 - Tableau de bord KPI & Reporting

Responsable : Analyste (ANA)   |   Contributions : Chef de Projet (décisions correctives), Développeur (données techniques)   |   Compétences visées : C12, C14

## 5.1 Indicateurs de pilotage management - Situation au 22/05/2025

| Indicateur | Formule | Cible | Valeur J3-actuelle | Tendance | Statut |
| --- | --- | --- | --- | --- | --- |
| SPI (Schedule Performance Index) | Valeur Acquise / Valeur Planifiée | ≥ 0,95 | 0,93 | ↗ En amélioration (était 0,88 à J+45) | VIGILANCE |
| CPI (Cost Performance Index) | Valeur Acquise / Coût Réel | ≥ 0,90 | 0,97 | → Stable | OK |
| Coût réel vs Budget | Σ réalisé vs 32 351 € | < 100 % | 20 060 € / 62 % | → Dans enveloppe | OK |
| Taux de stories livrées (sprint) | Stories Done / Stories planifiées sprint | ≥ 85 % | 83 % (S2) | ↗ (était 75 % en S1) | VIGILANCE |
| Risques ouverts HAUTE/CRITIQUE | Nb risques criticité ≥ 6 | ≤ 2 | 2 (R01 en résolution, R02 surveillé) | ↘ En baisse | VIGILANCE |
| Conformité RGPD (DoD) | Stories avec checklist RGPD cochée / stories données perso | 100 % | 100 % (5/5 stories concernées) | → Conforme | OK |

## 5.2 Indicateurs agiles - Sprints 1 à 2 (S3 en cours)

| Indicateur | Sprint 1 (S1) | Sprint 2 (S2) | Sprint 3 (S3 - en cours) | Objectif |
| --- | --- | --- | --- | --- |
| Vélocité (points livrés) | 14 pts | 18 pts | En cours (6 pts à J+5) | ≥ 16 pts / sprint |
| Stories planifiées vs livrées | 16 pts planifiés / 14 livrés | 20 pts planifiés / 18 livrés | 18 pts planifiés | Ratio ≥ 85 % |
| Lead time moyen (To Do → Done) | 5,2 jours | 4,1 jours | En mesure | ≤ 5 jours |
| Taux de bugs détectés en recette | 4 bugs / 16 pts | 2 bugs / 18 pts | 0 à ce stade | ≤ 2 bugs / sprint |
| Couverture de tests | 62 % | 71 % | 73 % (en progression) | ≥ 70 % |
| Nombre de PR rejetées (revue code) | 3 | 1 | 0 à ce stade | ≤ 2 / sprint |

Analyse burndown S2 : La courbe burndown du Sprint 2 montre un démarrage lent (J+1 à J+4 : seulement 4 pts livrés sur 20 attendus) dû à l'incident SSO (INC-001). Accélération notable à partir de J+5 après résolution. La vélocité de 18 pts confirme la capacité de l'équipe une fois les blocages levés.

## 5.3 Revue d'étape - Compte-rendu COPROJ du 21/05/2025

Date : 21 mai 2025 - 9h00 à 9h45

Animateur : Chef de Projet

Participants : Chef de Projet, Développeur, Analyste

Excusés : Sponsor (représenté par CP pour la synthèse)

| Rubrique | Contenu |
| --- | --- |
| Avancement global | Sprint 2 clôturé à 90 % (18/20 pts). 4 stories Done (US01 à US05). Sprint 3 lancé le 19/05 - 6 pts livrés sur 18. SPI = 0,93 en amélioration. |
| Points positifs | Résolution complète de l'incident SSO en 48h (INC-001). Couverture de tests passée de 62 % à 71 % grâce à l'atelier du 25/04. Vélocité en hausse (+4 pts entre S1 et S2). |
| Points de vigilance | US06 (webhook) en retard de 5 jours - décision de découpage prise. SPI encore sous la cible (0,93 vs 0,95). Recette UAT partenaires à planifier avant fin mai. |
| Décisions actées | 1/ US06 découpée en US06a + US06b (validé). 2/ Test utilisateur UAT planifié le 29/05 avec 5 partenaires pilotes. 3/ Revue sécurité RGPD confirmée au J3 (06/06). |
| Actions correctives | DEV : livrer US06a avant le 26/05. ANA : envoyer convocations UAT partenaires avant le 23/05. CP : mettre à jour le planning et notifier le sponsor de l'ajustement J2. |
| Prochains jalons | J3 - Recette UAT validée : 06/06/2025. J4 - MEP Go/NoGo : 30/06/2025. |

# LIVRABLE 6 - Journal de résolution d'incident (INC-001)

Responsable : Développeur (DEV)   |   Contributions : Analyste (documentation), Chef de Projet (décision)   |   Compétence visée : C13

## 6.1 Fiche incident - Identification & Description

| Champ | Valeur |
| --- | --- |
| ID Incident | INC-001 |
| Date & heure de détection | 22 avril 2025 - 14h37 |
| Détecté par | Développeur lors des tests d'intégration SSO en environnement de recette |
| Sévérité initiale | CRITIQUE - bloquant pour la livraison du Sprint 2 (jalon J2) |
| Environnement impacté | Environnement de recette uniquement - production non affectée |
| Description technique | Erreur HTTP 401 (Unauthorized) systématique lors de l'échange de token OAuth2 entre le portail B2B et le serveur SSO Keycloak. La page de connexion SSO s'affiche correctement mais la redirection post-authentification échoue. Les logs Keycloak indiquent : 'Invalid redirect_uri' et 'CORS policy blocked'. |
| Impact métier | Aucun partenaire ne peut s'authentifier en environnement de recette. Blocage total des tests d'intégration SSO. Risque de retard sur le jalon J2 (28/04/2025). |
| Ticket Jira | BUG-047 - assigné au Développeur - priorité HIGHEST |

## 6.2 Recherche documentaire - Sources consultées

| # | Source | Langue | URL / Référence | Contenu exploité pour la résolution |
| --- | --- | --- | --- | --- |
| S1 | RFC 6749 - The OAuth 2.0 Authorization Framework | EN | tools.ietf.org/html/rfc6749 | Section 4.1.2 : vérification du paramètre redirect_uri - doit être identique à l'URI enregistrée. Identification d'un encodage URL incorrect (espace → %20 vs +). |
| S2 | MDN Web Docs - Cross-Origin Resource Sharing (CORS) | EN | developer.mozilla.org/en-US/docs/Web/HTTP/CORS | Configuration des headers Access-Control-Allow-Origin et Access-Control-Allow-Credentials côté API Express - absence du header credentials identifiée. |
| S3 | Stack Overflow - Question #45287611 | EN | stackoverflow.com/q/45287611 | Cas similaire : token invalide si clock skew (décalage horloge) > 5 secondes entre le serveur applicatif et Keycloak. Résolution par synchronisation NTP. |
| S4 | Documentation Keycloak 21.x - Realm Settings | EN | keycloak.org/docs/21.0/server_admin/ | Configuration du 'Valid Redirect URIs' dans le client Keycloak - wildcard interdit en production, URI exacte requise par realm. |
| S5 | Wiki interne DSI - Guide d'installation Keycloak recette | FR | Confluence interne (page : /keycloak/recette) | Paramétrage spécifique du tenant de recette : port 8443 vs 443 en production - différence non documentée dans les specs initiales. |

## 6.3 Analyse des causes racines

| Cause racine | Type | Description |
| --- | --- | --- |
| C1 - redirect_uri mal encodée | Technique | L'URI de redirection envoyée dans la requête OAuth2 contenait des espaces encodés en '+' (format form-urlencoded) au lieu de '%20' (format URL). Keycloak rejette toute URI ne correspondant pas exactement à l'URI enregistrée dans le realm. |
| C2 - Header CORS manquant | Configuration | Le middleware Express ne renvoyait pas le header 'Access-Control-Allow-Credentials: true' pour les requêtes cross-origin, empêchant le navigateur d'envoyer les cookies de session SSO. |
| C3 - Clock skew de 8 secondes | Infrastructure | Un décalage de 8 secondes existait entre l'horloge du serveur de recette et celle du serveur Keycloak. Keycloak invalide les tokens dont le timestamp dépasse ±5 secondes. |
| C4 - URI Keycloak port 8443 non documentée | Documentation | La différence de port entre l'environnement de recette (8443) et la production (443) n'était pas documentée dans les specs d'intégration, conduisant à une configuration initiale incorrecte. |

## 6.4 Options de résolution étudiées & Décision

| Option | Description | Avantages | Inconvénients | Décision |
| --- | --- | --- | --- | --- |
| O1 - Corriger l'encodage redirect_uri | Modifier le paramètre dans le code front-end (encodeURIComponent) et dans la configuration Keycloak realm | Rapide (2h), sans impact architecture, corrige la cause C1 | Nécessite un redéploiement de recette | RETENU |
| O2 - Corriger les headers CORS | Ajouter le middleware cors() avec credentials:true dans Express + configurer Keycloak Web Origins | Corrige la cause C2, pratique standard | Test de non-régression nécessaire sur les autres endpoints | RETENU |
| O3 - Synchroniser NTP | Configurer ntpd sur le serveur de recette pour synchroniser avec pool.ntp.org | Corrige la cause C3 durablement, bonne pratique infra | Requiert accès admin serveur - délai 4h (ticket infra) | RETENU |
| O4 - Documenter URI Keycloak recette | Mettre à jour le wiki interne et le README avec les ports spécifiques par environnement | Prévient la récurrence sur les nouveaux membres | Action curative documentaire uniquement | RETENU |
| O5 - Passer en Implicit Flow OAuth2 | Contournement rapide sans échange de token côté serveur | Débogage plus simple à court terme | Déprécié dans OAuth 2.1, moins sécurisé, non conforme RGPD pour les données partenaires | ECARTE |

## 6.5 Plan d'actions correctives & Mitigation

| Action | Type | Responsable | Délai | Statut |
| --- | --- | --- | --- | --- |
| Corriger encodeURIComponent dans le front-end React et mettre à jour l'URI Keycloak realm | Correctif | DEV | 22/04 - 16h00 | ✅ Réalisé |
| Ajouter cors({ credentials: true }) + configurer Web Origins Keycloak | Correctif | DEV | 22/04 - 18h00 | ✅ Réalisé |
| Ticket infra : synchronisation NTP serveur de recette (ntpd + pool.ntp.org) | Correctif infra | DEV + Infra | 23/04 - 10h00 | ✅ Réalisé |
| Mettre à jour le wiki Confluence et le README avec les ports par environnement | Documentation | ANA | 24/04 EOD | ✅ Réalisé |
| Ajouter un test automatisé E2E (Cypress) vérifiant le flux OAuth2 complet à chaque déploiement | Prévention | DEV | Sprint 3 | 🔄 En cours |
| Intégrer la checklist CORS/SSO dans la DoD pour toutes les stories d'authentification | Process | CP | Sprint 3 - S1 | ✅ Réalisé |
| Présenter l'incident en rétrospective S2 pour partage d'expérience équipe | RETEX | DEV | Rétro S2 - 30/04 | ✅ Réalisé |

Clôture incident : INC-001 clôturé le 24 avril 2025 à 11h00 - validé par le Développeur et le Chef de Projet. Durée totale de résolution : 44 heures. Perte de vélocité estimée : 4 points de story. Absorbée par la réserve de risques (R01).

# LIVRABLE 7 - Plan de montée en compétences (C15)

Responsable : Développeur (DEV)   |   Contributions : Chef de Projet (planification), Analyste (indicateurs d'impact)   |   Compétence visée : C15

## 7.1 Diagnostic initial des besoins (réalisé le 07/03/2025)

| Membre | Compétence évaluée | Niveau initial (auto-évaluation 1-5) | Niveau cible M+4 | Méthode de montée |
| --- | --- | --- | --- | --- |
| Développeur | Tests unitaires automatisés (Jest / Pytest) | 2 / 5 - Notions théoriques, peu de pratique | 4 / 5 - Autonome sur un projet complexe | Atelier pratique + revue de code |
| Développeur | OAuth2 / OIDC - protocoles d'authentification | 2 / 5 - Connaît le concept, jamais implémenté | 4 / 5 - Capable d'implémenter et déboguer | Lecture doc EN + incident réel (INC-001) |
| Analyste | Lecture et synthèse de documentation technique EN | 3 / 5 - Comprend mais lentement | 4 / 5 - Fluide sur les docs de référence RFC/MDN | Micro-formation + exercices pratiques |
| Chef de Projet | Jira avancé (filtres JQL, dashboards, automatisations) | 2 / 5 - Utilisation basique boards & tickets | 4 / 5 - Crée dashboards KPI et automatisations | Tutoriels + pratique projet réel |

## 7.2 Plan d'animation des sessions

| Session | Type | Contenu détaillé | Animateur | Date réalisée | Durée | Participants |
| --- | --- | --- | --- | --- | --- | --- |
| S1 - Atelier Tests Unitaires | Atelier pratique | Écriture de tests Jest sur le module d'authentification SSO. Concepts : mocks, stubs, couverture de code. Exercice : atteindre 70 % de couverture sur auth.service.js | DEV | 25/04/2025 | 2h00 | DEV, CP, ANA |
| S2 - Revue de code collaborative | Revue croisée | Relecture du code API REST (routes, contrôleurs, middlewares) par ANA et CP. Focus : lisibilité, nommage des variables, élimination des duplications, respect des conventions REST | DEV | 07/05/2025 | 1h15 | DEV, CP, ANA |
| S3 - RETEX Sprint 2 + Incident SSO | Rétrospective | Format Start/Stop/Continue. Analyse détaillée de l'incident INC-001 : causes, résolution, enseignements. Vote sur les 3 actions d'amélioration prioritaires | CP | 30/04/2025 | 1h00 | DEV, CP, ANA |
| S4 - Micro-formation Documentation EN | Formation courte | Exercice pratique : lire la RFC 6749 (OAuth2) sections 1 à 4, identifier les 5 concepts clés, rédiger une fiche de synthèse en français en 45 minutes | ANA | 14/05/2025 | 45 min | ANA, DEV |
| S5 - Jira Avancé | Formation courte | Configuration de dashboards KPI (SPI, CPI, vélocité), création de filtres JQL pour le suivi des risques et des stories bloquées, mise en place d'une automatisation d'alerte WIP | CP | 16/05/2025 | 1h00 | CP, ANA |

## 7.3 Indicateurs d'impact - Mesures avant / après

| Indicateur | Mesure | Valeur AVANT (07/03) | Valeur APRÈS (22/05) | Évolution | Source de mesure |
| --- | --- | --- | --- | --- | --- |
| Couverture tests automatisés | % de lignes couvertes (Jest/Pytest) | 38 % | 73 % | + 35 pts ↑ | Rapport Jest CI/CD |
| Taux de bugs détectés en recette | Nombre de bugs / sprint | 4 bugs / sprint (S1) | 2 bugs / sprint (S2) | - 50 % ↓ | Jira - filtre BUG |
| Duplications de code | % de code dupliqué (analyse SonarQube) | 12 % | 6 % | - 50 % ↓ | SonarQube dashboard |
| PR rejetées en revue | Nombre de pull requests refusées / sprint | 3 PR refusées (S1) | 1 PR refusée (S2) | - 67 % ↓ | GitHub PR history |
| Compréhension doc technique EN | Score quiz auto-évaluation (sur 10) | 5,2 / 10 (ANA + DEV) | 7,8 / 10 | + 2,6 pts ↑ | Quiz interne Notion |
| Lead time moyen To Do → Done | Jours ouvrés par story | 5,2 jours (S1) | 4,1 jours (S2) | - 1,1 j ↓ | Jira - cycle time |

Bilan intermédiaire : Les 5 sessions réalisées ont produit des effets mesurables et cohérents entre eux : la couverture de tests (+35 pts) explique directement la baisse des bugs en recette (-50 %) et la réduction des PR rejetées (-67 %). La montée en compétences sur OAuth2, acquise en partie via l'incident INC-001, a permis une résolution autonome sans recours à un prestataire externe, économisant environ 1 500 € de budget.

## 7.4 Fiches RETEX - Synthèse des feedbacks (S3 - Sprint 2)

| Question RETEX | Développeur | Chef de Projet | Analyste |
| --- | --- | --- | --- |
| Ce qui a bien fonctionné | La résolution collective de l'incident SSO - on a tous appris quelque chose de concret | Le daily stand-up : 15 min suffisent, on détecte les blocages tôt | Le dashboard Jira mis en place en S5 - visibilité KPI immédiate |
| Ce qui doit s'améliorer | Les specs d'intégration doivent documenter les différences d'environnement dès le départ | Mieux estimer les stories techniques (Planning Poker insuffisant pour les spikes) | Les revues de code doivent être planifiées, pas improvisées |
| Compétence renforcée | Tests unitaires : maintenant à l'aise avec les mocks Jest | Lecture du CPI/SPI : je comprends vraiment ce que ça dit | Lecture documentation technique EN : plus rapide et confiante |
| Application concrète | J'applique les tests dès l'écriture du code (TDD partiel) | J'anticipe les alertes budget dès que le CPI descend sous 0,95 | Je consulte d'abord la documentation officielle EN avant les forums FR |

# ANNEXE - Guide de soutenance individuelle (P2)

Soutenance : 3 juillet 2025 - 10 minutes exposé + 5 minutes Q/R jury

## Structure recommandée par rôle

| Bloc | Durée | Chef de Projet - points clés | Développeur - points clés | Analyste - points clés |
| --- | --- | --- | --- | --- |
| Mon rôle & contributions | 1 min 30 | Pilotage global, RACI, COPIL, arbitrages périmètre | Architecture API/SSO, résolution INC-001, tests automatisés | Registre risques, tableau de bord KPI, revues de performance |
| Mes choix méthodologiques | 3 min | Pourquoi hybride vs Scrum pur : jalons fixes + sprints. Gouvernance COPIL/COPROJ/daily. | Pourquoi ce stack (Node.js/React/Keycloak). Choix TDD. Découpage US06 en sous-stories. | Pourquoi cette cotation des risques. Pourquoi ces KPIs et pas d'autres. Construction du CPI. |
| Analyse des écarts | 3 min | SPI = 0,93 vs cible 0,95 : causes (INC-001), mesures prises (ajustement J2, découpage US06). Budget sous contrôle (CPI = 0,97). | Incident INC-001 : analyse causes (redirect_uri, CORS, NTP), démarche de recherche EN, décision collective, résolution en 44h. | R01 activé (SSO) : comment le registre a permis d'anticiper. Burndown S2 : démarrage lent puis rattrapage - que ça révèle sur la capacité de l'équipe. |
| Recommandations | 2 min | Pour la phase 2 : documenter les environnements dès le cadrage. Augmenter la vélocité cible à 20 pts avec l'équipe renforcée. | Intégrer des tests E2E Cypress dans la CI/CD avant chaque déploiement. Adopter le TDD systématiquement dès la conception. | Mettre en place un tableau de bord temps réel Jira connecté aux KPIs COPIL pour éviter la ressaisie manuelle mensuelle. |
| Conclusion | 30 sec | Le projet reste sur la trajectoire M+4 malgré l'incident. L'approche hybride a prouvé sa valeur. | La gestion d'incident documentée et la montée en compétences sur les tests sont mes deux apports les plus durables. | Les indicateurs montrent une amélioration continue mesurable - la méthode fonctionne. |

## Questions jury fréquentes - Prépare tes réponses

### Questions sur la méthode (C10/C11)

- Pourquoi avez-vous choisi une approche hybride plutôt qu'un Scrum pur ou un cycle en V classique ?

- Comment avez-vous géré la tension entre les jalons fixes du sponsor et la flexibilité des sprints ?

- Votre WIP est limité à 2 - que s'est-il passé concrètement quand cette limite a été franchie ?

### Questions sur le pilotage (C12/C14)

- Votre SPI est à 0,93 - en dessous de la cible. Qu'est-ce que ça signifie concrètement et que faites-vous ?

- Comment avez-vous construit votre CPI ? Quelle est la différence entre CPI et simple suivi de budget ?

- Votre burndown S2 montre un démarrage lent - comment l'avez-vous détecté et à quel moment avez-vous agi ?

### Questions sur l'incident (C13)

- Pourquoi avez-vous consulté des sources en anglais ? Qu'est-ce que ça vous a apporté par rapport aux sources FR ?

- Comment avez-vous écarté l'option Implicit Flow ? Sur quels critères ?

- Que mettez-vous en place pour éviter que cet incident se reproduise ?

### Questions sur la montée en compétences (C15)

- Comment mesurez-vous que vos ateliers ont vraiment eu un impact sur la qualité du projet ?

- La couverture de tests est passée de 38 % à 73 % - est-ce dû uniquement à l'atelier ou à d'autres facteurs ?

- Si vous refaisiez ce projet, quelles sessions de formation organiseriez-vous différemment ?

## Conseils de préparation - J-45 à J-1

| Période | Action de préparation |
| --- | --- |
| J-45 à J-30 (maintenant) | Relire tous les livrables et être capable d'expliquer chaque choix avec tes propres mots. Identifier les 3 décisions dont tu es le plus fier et les 2 que tu referais différemment. |
| J-30 à J-15 | Préparer ta trame de 10 minutes et la chronométrer. S'entraîner devant les autres membres de l'équipe en simulation jury. |
| J-15 à J-7 | Préparer des réponses courtes (2-3 phrases) à chaque question jury de cette annexe. Mémoriser tes données chiffrées clés (SPI, CPI, vélocité, taux de bugs). |
| J-3 à J-1 | Dernière simulation à blanc. Vérifier que ton support visuel (si autorisé) ne contient que tes livrables - pas de slides génériques. Reposer ta voix. |

Rappel essentiel : Le jury évalue TA maîtrise individuelle, pas celle de l'équipe. Dis 'j'ai décidé', 'j'ai analysé', 'j'ai recommandé' - jamais uniquement 'on a fait'. Même si le travail était collectif, montre ton apport personnel sur chaque livrable.