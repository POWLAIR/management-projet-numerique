# Notes orales — Chef de Projet
## Paul Claverie · Soutenance E2-P2 · 3 juillet 2026

> **10 minutes + 5 minutes Q/R**
> Navigation : `← →` ou clic · `N` pour les notes dans la présentation · `F` plein écran

---

## Slide 1 — Couverture _(0:00 – 0:20)_

Bonjour à tous. Je suis Paul Claverie, Chef de Projet sur le projet Horizon B2B pour TechPartner SA.

Mon rôle : cadrer, planifier, piloter, coordonner. Pendant ces quatre mois, chaque décision stratégique est passée par moi — du périmètre initial au Go/NoGo MEP.

En 10 minutes, on va vous montrer comment on a piloté ce projet, les choix qu'on a faits, pourquoi on les a faits, et ce qu'on en retient.

---

## Slide 2 — Le projet _(0:20 – 1:10)_

TechPartner SA utilise depuis 2018 un portail monolithique pour gérer ses partenaires. Trois problèmes concrets qu'on a dû adresser :

- Des délais de traitement des commandes au-delà de la cible sectorielle — l'objectif est de les réduire de vingt pour cent.
- Une authentification fragmentée, sans centralisation des accès.
- Une facturation entièrement manuelle, source d'erreurs et de délais.

La contrainte principale qu'on a dû gérer dès le cadrage : une date de mise en production non négociable. M+4, contractuellement engagée vis-à-vis des partenaires. C'est cette contrainte qui a guidé toutes nos décisions de planification.

---

## Slide 3 — Mon rôle _(1:10 – 2:30)_

En tant que Chef de Projet, j'avais quatre responsabilités — définies dans la RACI qu'on a construite.

**Le cadrage et la charte.** C'est moi qui ai défini ce qui est dans le périmètre et ce qui n'y est pas. Un périmètre mal défini au départ, c'est un projet qui dérive. On a formalisé les engagements dans la note de cadrage validée par le client.

**La planification.** On a construit le WBS, le Gantt, et identifié le chemin critique. Cette étape nous a révélé que le lot SSO Keycloak était sur le chemin critique — ce qui a directement justifié un spike technique en Sprint 1 pour lever l'incertitude avant d'engager le développement complet.

**Le pilotage et les arbitrages.** Chaque semaine, on reçoit les indicateurs de l'analyste et on décide des actions. Quand le jalon J2 a été menacé par l'incident SSO, c'est moi qui ai pris la décision d'ajuster le jalon plutôt que de sacrifier du périmètre.

**La coordination et le reporting.** On anime les dailys, les COPROJ hebdomadaires, et on présente au client lors des COPIL mensuels. Mon rôle : traducteur entre l'équipe technique et la direction.

---

## Slide 4 — Gouvernance _(2:30 – 3:30)_

On a mis en place une gouvernance à quatre niveaux. Ce n'est pas un organigramme de papier — c'est ce qui a permis au projet de rester aligné en permanence.

**Le COPIL mensuel** avec le client. Décisions stratégiques, validation des jalons, arbitrages budgétaires. On a choisi d'aligner chaque COPIL sur deux sprints terminés — on peut toujours présenter une démo fonctionnelle, pas une présentation de chiffres abstraits.

**Le COPROJ hebdomadaire** tous les lundis. Chaque réunion produit un PV horodaté avec les décisions prises et leurs responsables. Un PV horodaté, c'est la traçabilité des décisions. Quand un incident arrive, on sait exactement ce qui a été décidé, par qui, et quand.

**Le daily stand-up** à 9h15, quinze minutes maximum. Trois questions : hier, aujourd'hui, blocage. C'est là où les problèmes remontent avant de devenir des incidents — comme on l'a vécu avec l'incident SSO.

**Les cérémonies Scrum** à chaque sprint. La Review devient la démo du COPIL mensuel — elles s'articulent naturellement.

---

## Slide 5 — Choix méthodologique _(3:30 – 5:00)_

Le choix de la méthode, c'est la première vraie décision stratégique d'un Chef de Projet. Et on va vous expliquer comment on y est arrivé — pas par intuition, mais par analyse des contraintes.

**Le Cycle en V** nous aurait donné des jalons fixes et un budget clair par phase — exactement ce que le client voulait. Mais il exigeait de figer les spécifications dès le début. Or l'intégration SSO avec Keycloak comportait une incertitude technique que ni moi ni le développeur ne pouvions quantifier avant d'avoir lancé un prototype. En Cycle en V, cette incertitude aurait généré des avenants en cours de projet — exactement ce qu'on voulait éviter.

**Le Scrum pur** aurait résolu le problème de l'incertitude technique — les sprints permettent d'ajuster au fur et à mesure. Mais le client avait un engagement contractuel avec les partenaires : une date de MEP fixe. En Scrum pur, pas de jalon contractuel. Impossible d'engager une date ferme.

**L'hybride**, c'est notre réponse aux deux contraintes simultanément. Des jalons fixes J0 à J4 pour les engagements. Des sprints de deux semaines pour absorber l'incertitude et intégrer les retours des partenaires pilotes. C'est la seule approche cohérente avec ce contexte — et on l'a argumentée devant le client lors du COPIL de lancement.

---

## Slide 6 — Les jalons _(5:00 – 6:00)_

En hybride, les jalons fixent nos **engagements de livraison** en COPIL — pas un suivi d'avancement. Les sprints organisent le travail entre deux jalons.

**J0 — Kick-off.** Cadrage validé, RACI, budget. Le cadre contractuel du projet.

**J1 — Architecture validée.** Schéma API, specs SSO, revue sécurité DSI. On verrouille la technique avant le dev massif.

**J2 — Livraison Dev M1.** API REST + SSO fonctionnels en recette. Sur le chemin critique — le cœur métier doit être intégrable.

**J3 — Recette UAT.** PV signé, validation par les partenaires pilotes. Le produit est validé métier avant la MEP.

**J4 — MEP Go/NoGo.** Décision de mise en production avec le client. Engagement M+4 — le jalon le plus contraignant.

Les jalons disent **quoi livrer** ; les sprints disent **comment y arriver**.

---

## Slide 7 — L'imprévu _(6:00 – 7:30)_

Tout projet connaît des imprévus. La qualité d'un Chef de Projet se mesure à sa façon de les gérer, pas à leur absence.

En Sprint 2, le développeur détecte une erreur critique sur le flux d'authentification SSO. Blocage total des tests. Risque sur J2.

**Détecter.** Le daily stand-up nous a donné l'information le jour même. Sans daily, l'information aurait mis plusieurs jours à remonter.

**Décider.** On a immédiatement ouvert un ticket priorité critique, dédié le développeur exclusivement à la résolution, et suspendu toute nouvelle fonctionnalité. En tant que CP, la priorisation c'est ma responsabilité.

**Absorber.** On avait planifié un flottement sur le chemin critique. On a utilisé ce flottement pour décaler J2 de trois jours — sans sacrifier de périmètre, sans dépasser le budget. Notre décision : ajuster le jalon plutôt que réduire ce qu'on livre. Le client a été informé dans les vingt-quatre heures.

**Capitaliser.** Lors de la rétrospective Sprint 2, on a organisé un RETEX collectif. Résultat concret : une checklist de vérification SSO/CORS est maintenant intégrée à la définition de terminé pour toutes les stories d'authentification. L'erreur ne peut plus se reproduire sans être détectée.

---

## Slide 8 — Mesures correctives _(7:30 – 8:30)_

Un plan sans mesures correctives n'est pas un plan — c'est un vœu pieux. On a défini trois scénarios d'écart avec leurs actions associées, avant même que les problèmes se produisent.

**Retard planning.** Deux leviers : découper les stories trop grandes en sous-stories livrables indépendamment — c'est ce qu'on a fait avec la story webhook en Sprint 2 — et ajuster les jalons dans le flottement disponible. Si ça ne suffit pas, arbitrage de périmètre avec le client.

**Tension budgétaire.** On avait intégré une réserve pour aléas dès le budget prévisionnel. Quand le risque se matérialise, on l'active. Si la dérive persiste, on gèle les stories optionnelles.

**Dette technique.** La définition de terminé bloque automatiquement toute story sans couverture de tests suffisante. Ce n'est pas une option — c'est une règle qu'on a imposée dès Sprint 1. Résultat : on n'a jamais eu à choisir entre qualité et délai.

---

## Slide 9 — Recommandations _(8:30 – 9:30)_

**Recommandation 1 : documenter les environnements dès le kick-off.**
L'incident SSO nous a appris que la différence de configuration entre recette et production n'était pas documentée. Une fiche par environnement livrée avec la note de cadrage. Ce n'est pas un détail technique — c'est un risque projet qui m'appartient en tant que CP d'éliminer dès J0.

**Recommandation 2 : revoir la vélocité cible à la hausse.**
L'équipe a fortement progressé entre Sprint 1 et Sprint 2. Pour la phase 2, avec une équipe renforcée et les compétences acquises, on calibrerait la cible sprint à la hausse dès le planning initial — pour ne pas partir avec une trajectoire trop conservative.

**Recommandation 3 : formaliser le grooming comme rituel fixe.**
Pendant ce projet, on a collecté des retours clients qui attendent d'être instruits. En phase 2, le grooming sera un créneau fixe dans le calendrier — pas une session convoquée la veille du Sprint Planning. Un Sprint Planning avec un backlog non préparé, c'est une demi-journée perdue et un sprint qui démarre mal.

---

## Slide 10 — Conclusion _(9:30 – 10:00)_

Trois choses qu'on retient de ce projet.

**La gouvernance n'est pas de la bureaucratie.** Le daily stand-up a détecté l'incident SSO le jour même. Le COPIL mensuel a maintenu le client informé et impliqué. Ces instances ont une valeur opérationnelle concrète.

**La planification, c'est prévoir les marges.** On avait prévu un flottement sur le chemin critique et une réserve pour aléas dans le budget. Quand l'incident s'est produit, on avait les outils pour absorber sans catastrophe.

**L'approche hybride a prouvé sa valeur.** Les jalons fixes ont rassuré le client. Les sprints ont absorbé l'incertitude. Et malgré l'incident, le projet reste sur la trajectoire MEP M+4.

Piloter un projet, c'est décider à temps avec des informations incomplètes. C'est exactement ce qu'on a fait.

Je suis à votre disposition pour vos questions.

---

## Questions jury — Réponses préparées

**Q : Pourquoi l'hybride et pas Scrum pur ?**
L'engagement M+4 était contractuel vis-à-vis des partenaires. En Scrum pur, pas de jalon fixe — impossible d'honorer cet engagement. L'hybride nous a permis d'avoir les jalons pour le client et les sprints pour absorber l'incertitude technique.

**Q : Comment avez-vous géré la tension entre jalons fixes et flexibilité des sprints ?**
Les jalons fixent des livrables, pas du contenu détaillé. Le contenu de chaque sprint peut évoluer sans compromettre le jalon. On avait aussi planifié des flottements sur le chemin critique — précisément pour pouvoir absorber des imprévus sans remettre en cause les engagements.

**Q : Votre SPI est en dessous de la cible. Qu'est-ce que vous faites ?**
On regarde la tendance, pas juste la valeur. Le SPI était plus bas en fin de Sprint 1 et remonte. C'est une récupération, pas un dérapage. Mon seuil d'escalade est défini : si on reste sous un certain niveau sur deux sprints consécutifs, on ouvre un arbitrage de périmètre avec le client. On n'y est pas.

**Q : Comment votre WIP max de 2 a-t-il fonctionné concrètement ?**
Quand un membre de l'équipe voulait commencer une troisième story alors qu'il en avait déjà deux en cours, le Kanban bloquait. Il devait d'abord terminer une story existante avant d'en démarrer une nouvelle. Ça évite l'illusion du progrès — avoir dix stories "en cours" à 50 % ne vaut pas trois stories livrées.

**Q : Qu'est-ce que vous auriez fait différemment ?**
Documenter les environnements dès le kick-off. C'est ma première recommandation. L'incident SSO aurait pu être évité si la différence de configuration entre recette et production avait été écrite noir sur blanc dès le départ. C'est une leçon concrète qu'on porterait dès J0 en phase 2.

**Q : Comment avez-vous géré la relation avec le client pendant l'incident ?**
Transparence immédiate. On l'a informé dans les vingt-quatre heures — pas quand le problème était résolu, mais quand on savait ce qui se passait et ce qu'on faisait pour y remédier. Un client informé est un client qui fait confiance. Un client surpris est un client qui demande des comptes.
