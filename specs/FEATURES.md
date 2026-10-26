# Spécifications fonctionnelles / critères d'acceptation

## RR-001 — Rechercher
Étant donné une recherche partielle sur logiciel, éditeur ou projet, afficher uniquement les logiciels correspondants sans rechargement. Le champ `/` reçoit le focus clavier. Réinitialiser fonctionne.

## RR-002 — Filtrer
Les catégories et « reconstructions / alternatives » s'appliquent ensemble à la liste. Les compteurs doivent représenter le jeu de données observé, non un montant financier estimé.

## RR-003 — Dossier logiciel
Chaque logiciel possède une route stable `#/logiciel/:slug`, une liste des projets et une matrice de capacités déclaratives. Un slug inconnu présente un état clair.

## RR-004 — Preuves
Chaque projet renvoie vers son dépôt et une date de revue. `verified` ne doit pas être utilisé sans résultat de test reproductible lié.

## RR-005 — Activité GitHub
Afficher les étoiles et une date de dernière activité à partir de l'API publique, avec cache. En cas d'échec, conserver l'accès à la source et afficher un état neutre, pas zéro ou « abandonné ».

## RR-006 — Suivi local
Permettre de marquer un logiciel comme suivi dans le navigateur. N'afficher aucun message promettant une notification ou un compte.

## RR-007 — API
Endpoints décrits dans TRD, lecture seule. Dépôts inconnus exclus du proxy GitHub. Gestion 404/405/503.

## RR-008 — Accessibilité et prudence
Navigation clavier, contrastes raisonnables, viewport mobile, mouvement réduit ; expliciter les limites des affirmations, aucune extraction de code propriétaire.
