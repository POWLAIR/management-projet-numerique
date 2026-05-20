
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
