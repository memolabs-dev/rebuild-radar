# Mobile Explorer → Rebuild Radar (validation locale)

Importer un export JSONL dans le validateur en lecture seule :

```bash
node scripts/preview-observations.mjs ./export.jsonl
```

Le fichier n'est ni envoyé au réseau ni ajouté au catalogue. Le résumé ne contient pas les notes libres, noms d'applications, identifiants ou détails d'environnement. Le validateur impose 1 Mio / 500 lignes maximum et refuse les déclarations `verified` sans test automatisé identifié. Une validation de structure n'est **pas** une preuve de compatibilité et n'autorise aucune publication. La revue humaine des droits, de la source et des notes reste obligatoire.
