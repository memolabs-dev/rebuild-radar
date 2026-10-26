# PRD — Rebuild Radar

**Version :** 0.1 · **Date :** 2026-10-16 · **Statut :** MVP construit / validation à poursuivre · **Owner :** Memo Labs

## 1. Pourquoi

Une nouvelle vague de projets vise à réimplémenter des logiciels propriétaires avec l'aide d'outils modernes, dont REA, mais les progrès sont difficiles à évaluer. Les agrégateurs existants répondent à « Quelle alternative existe ? » ; Rebuild Radar ajoute « Qui reconstruit quoi, quelles capacités sont réellement présentes et selon quelles preuves ? ».

## 2. Publics cibles

- **Créatifs et particuliers :** découvrir une alternative et comprendre les compromis.
- **Développeurs et contributeurs :** trouver des projets de reconstruction actifs et les fonctionnalités manquantes.
- **Équipes techniques/DSI :** préparer une pré-évaluation de migration, sans confondre maturité GitHub et validation métier.
- **Chercheurs/analystes :** observer l'évolution d'un écosystème reproductible et sourcé.

## 3. Jobs-to-be-done

1. Quand je paie Photoshop, je veux rechercher les projets qui couvrent ses usages et leurs limites.
2. Quand un projet annonce une compatibilité, je veux remonter à une source datée.
3. Quand je songe à migrer, je veux connaître les parcours à tester avec mes fichiers.
4. Quand je contribue, je veux connaître les fonctionnalités encore non vérifiées.

## 4. Principes non négociables

- Distinguer **reconstruction** (réimplémentation) et **alternative** (produit indépendant).
- Ne jamais déduire un « % de remplacement » de stars, commits ou README.
- Modéliser chaque affirmation avec état, date, provenance et environnement de test éventuel.
- Un état **vérifié** exige un protocole reproductible, résultat et artefact.
- Ne pas redistribuer de ressources propriétaires ; protéger les données des personnes.
- UX accessible, responsive, utilisable sans compte, en français d'abord.

## 5. MVP (P0)

- Page d'accueil, moteur de recherche et filtres par secteur et démarche.
- Pages dédiées aux applications propriétaires.
- Projets avec mode, maturité déclarative, lien dépôt, date de revue.
- Matrice capacités × projets avec niveaux de preuve.
- Métadonnées GitHub live mises en cache et clairement séparées des évaluations.
- Suivi local via navigateur (localStorage), sans prétendre fournir des notifications.
- Page « Méthode » et transparence des limites.

## 6. Extensions

**P1 :** base PostgreSQL, imports planifiés GitHub, propositions de contributions, historique d'événements, moteur de déduplication, recherche plein texte, piste d'audit des modifications.

**P2 :** collecteurs de tests de compatibilité, protocoles d'import/export de formats, résultats avec artefacts et comparaisons entre versions.

**P3 :** alertes opt-in, API publique, programmes de contribution, observatoire longitudinal, pont avec Mobile Explorer pour les applications évaluées légalement.

## 7. Hors périmètre initial

- Scraping agressif, clonage automatique d'interfaces propriétaires, décompilation de binaires protégés, publication de fichiers propriétaires.
- Scores de compatibilité inventés ou déterminés par un LLM seul.
- Newsletter/alertes présentées comme actives sans infrastructure correspondante.

## 8. Indicateurs de succès (objectifs, non réalisés)

- P0 : 10 logiciels documentés, 18+ projets identifiés, 100 % des projets sourcés.
- ≥ 90 % des pages utiles accessibles sans interaction complexe.
- 0 affirmation « vérifiée » sans résultats de tests associés.
- Qualité : tests de contrat API verts et navigation utilisable clavier/smartphone.
- Validation produit à suivre : recherches sans résultat, retours qualitatifs, utilisateurs revenants (consentement si analytics).

## 9. Risques et arbitrages

- **Biais des annonces** : afficher explicitement « déclaré », « documenté », « partiel », « inconnu ».
- **Repository 404 ou renommé** : revue humaine et statuts périmés ; pas de faux signal automatique.
- **Noms de marque** : mention informative, aucun partenariat implicite.
- **Coûts** : privilégier Node, cache mémoire, collecte GitHub raisonnable ; pas d'IA appelée à chaque page.
- **Marché** : différenciation à valider face à Gratos et AlternativeTo par la preuve plutôt que la liste.

## 10. Critères de validation du MVP

`npm test` réussit ; `/api/health`, `/api/catalog`, `/api/apps/:slug` fonctionnent ; la page affiche recherche, filtres, fiche et matrice ; un projet pointe vers sa source ; un dépôt inconnu ne peut pas être interrogé à travers notre API.
