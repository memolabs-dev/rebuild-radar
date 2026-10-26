# Vérifier un export Mobile Explorer dans le navigateur

La route `#/preuves` permet de sélectionner un fichier JSONL depuis Rebuild Radar. Le navigateur vérifie localement le contrat v0.1 : 1 Mio et 500 observations au maximum, sans requête d'import ni publication.

Le même code de validation est utilisé par `node scripts/preview-observations.mjs fichier.jsonl` ; les tests de régression Node continuent de s'appliquer.

**Confidentialité :** l'interface n'affiche ni noms d'applications, ni notes saisies ni références de source. Les erreurs de schéma sont affichées pour diagnostic. Un export original reste privé jusqu'à ce que son auteur décide de le partager ; aucun contrôle sur les droits, la véracité ou les données sensibles du fichier n'est possible avec la seule validation syntaxique.

Ce mode ne modifie aucune fiche publique. Il n'offre ni import automatique ni statut `verified` à une observation manuelle.
