# Rebuild Radar

> Le radar indépendant des alternatives et reconstructions open source. Inspiration UX : [Gratos.app](https://gratos.app/), avec un objectif distinct : la **preuve de compatibilité**, pas uniquement la découverte.

**État : prototype local, pas de déploiement public.**

## Démarrer

Node.js 20+ uniquement, **aucune dépendance à installer** :

```bash
npm start       # http://127.0.0.1:3000
npm test
npm run check
```

## Ce qui fonctionne

Recherche instantanée, filtres, 10 fiches propriétaires, 18+ projets, matrice de capacités attribuées aux projets, métadonnées GitHub en direct (lorsque l'API répond), favoris locaux, API HTTP en lecture seule.

Ce qui **n'est pas encore fait** : déploiement, collecte automatisée multi-source, audits de compatibilité indépendants, notifications, connexion à Mobile Explorer, base PostgreSQL. Les statuts de l'inventaire initial nécessitent une revue humaine avant communication comme état actuel d'un produit.

## Documentation

- [PRD](docs/PRD.md)
- [TRD](docs/TRD.md)
- [Spécifications](specs/FEATURES.md)
- [Backlog](specs/TASKS.md)

## Sources & limites

Chaque projet est relié à son dépôt. Les revendications de fonctionnalité ne sont pas des benchmarks indépendants ; voir `/methode` depuis l'interface. Aucune association commerciale avec Adobe, Microsoft, Figma, Autodesk, etc.

MIT. Projet préparé pour Memo Labs ; dépôt distant à créer.

## Captures de validation

- `preview-desktop.png` — validation Chromium isolée, données de catalogue injectées localement.
- `preview-mobile.png` — contrôle responsive 390px, aucun débordement détecté.
