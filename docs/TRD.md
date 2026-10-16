# TRD — Rebuild Radar

## Architecture MVP

```
Navigateur HTML/CSS/JS
    │ recherche/filtres/détails et favoris locaux
    ▼
Node.js HTTP server (ESM, zéro dépendance)
    ├─ GET /api/health       → statut + invariants
    ├─ GET /api/catalog      → seed éditorial
    ├─ GET /api/apps/:slug   → fiche
    ├─ GET /api/projects     → projets
    └─ GET /api/github/:owner/:repo → cache 15 min → GitHub REST
```

**Pourquoi zéro dépendance pour P0 ?** Pour disposer d'un MVP immédiatement exécutable dans l'environnement de vérification, facile à auditer, sans installation de packages. Ce choix n'interdit pas une migration vers Next.js/React après les premiers retours. Pour P1, séparer la couche de domaine du rendu, garder les contrats JSON et passer la persistance à PostgreSQL.

## Entités métier

- `Software`: slug, name, maker, category, pitch, featureKeys[] et projects[].
- `Project`: id, name, repository, mode `rebuild|alternative`, maturity, summary, lastReviewed, evidence, features.
- `Evidence`: type, URL, level (le MVP contient uniquement `source-declared`).
- `FeatureClaim`: featureKey, status `unknown|declared|documented|partial|verified`; extension P1 : source revision, date, testRunId, methodology.
- `GitHubActivity`: stars, forks, openIssues, pushedAt, archived, observedAt ; **aucun champ readiness/compatibility**.

## Règles d'intégrité

- Slugs uniques, repositories syntaxiquement valides.
- Tous les projets ont une URL de preuve et une date de revue.
- Aucun `verified` dans les seeds tant qu'aucun benchmark indépendant n'est disponible.
- Le proxy GitHub accepte uniquement les dépôts répertoriés pour éviter l'usage en proxy public.
- Aucun token requis ; limite API GitHub et erreurs 503 gérées.

## Sûreté

- `GET` uniquement, CSP restrictive, contenu JSON typé, réponses sans cache pour API éditoriale.
- Aucun collecte d'identifiant ou dépôt de documents de visiteurs.
- Données initiales = assertions éditoriales attribuées ; vérification des affirmations à faire projet par projet avant publication large.
- `localStorage` uniquement pour les favoris, sans envoi au serveur.

## Tests

Node built-in test runner : invariants catalogue, preuve source, no readiness inferred, routes 200/404/405, proxy allowlist, CSP. `npm run check`, `npm test`.

## Architecture cible P1

PostgreSQL + migrations, API versionnée, workers de collecte GitHub, immutabilité des observations, mécanisme de review et files de tests reproductibles. Réserver des droits opérateur limités pour les agents. Aucun crawl d'application mobile sans autorisation explicite.

## Exploitation

- Node 20+ ; `npm start` sur 127.0.0.1:3000 par défaut.
- Mettre derrière un reverse proxy HTTPS pour exposition publique ; ajouter rate limiting externe.
- Aucun lancement en production n'est inclus.
