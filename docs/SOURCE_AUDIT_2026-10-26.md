# Audit des dépôts référencés — 26 octobre 2026

**Périmètre contrôlé :** 19 entrées de projet sur 10 logiciels, correspondant à **18 dépôts GitHub distincts** (`LibreOffice/core` est utilisé par Calc et Writer).

**Méthode :** interrogation de l'API GitHub de chaque dépôt le 26 octobre 2026 ; contrôles d'existence, visibilité publique, archivage, licence déclarée via l'API et description du dépôt. **18/18 dépôts accessibles, non privés, non archivés lors de ce contrôle.** Ceci ne valide pas les capacités déclarées dans la matrice.

| Dépôt | Licence signalée par l’API | Observation |
| --- | --- | --- |
| [`storytold/photocraft`](https://github.com/storytold/photocraft) | Apache-2.0 | Dépôt public accessible |
| [`GNOME/gimp`](https://github.com/GNOME/gimp) | indéterminée via l’API | miroir GitHub (GitLab GNOME) |
| [`KDE/krita`](https://github.com/KDE/krita) | GPL-3.0 | Dépôt public accessible |
| [`storytold/vectorcraft`](https://github.com/storytold/vectorcraft) | Apache-2.0 | Dépôt public accessible |
| [`inkscape/inkscape`](https://github.com/inkscape/inkscape) | indéterminée via l’API | miroir GitHub (GitLab Inkscape) |
| [`storytold/filmcraft`](https://github.com/storytold/filmcraft) | Apache-2.0 | Dépôt public accessible |
| [`KDE/kdenlive`](https://github.com/KDE/kdenlive) | GPL-3.0 | Dépôt public accessible |
| [`storytold/effectcraft`](https://github.com/storytold/effectcraft) | Apache-2.0 | Dépôt public accessible |
| [`storytold/gridcraft`](https://github.com/storytold/gridcraft) | Apache-2.0 | Dépôt public accessible |
| [`LibreOffice/core`](https://github.com/LibreOffice/core) | GPL-3.0 | miroir GitHub en lecture seule ; utilisé pour Calc et Writer |
| [`storytold/wordcraft`](https://github.com/storytold/wordcraft) | Apache-2.0 | Dépôt public accessible |
| [`storytold/deckcraft`](https://github.com/storytold/deckcraft) | Apache-2.0 | Dépôt public accessible |
| [`storytold/cadcraft`](https://github.com/storytold/cadcraft) | Apache-2.0 | Dépôt public accessible |
| [`LibreCAD/LibreCAD`](https://github.com/LibreCAD/LibreCAD) | indéterminée via l’API | Dépôt public accessible |
| [`penpot/penpot`](https://github.com/penpot/penpot) | MPL-2.0 | Dépôt public accessible |
| [`open-pencil/open-pencil`](https://github.com/open-pencil/open-pencil) | MIT | Dépôt public accessible |
| [`AppFlowy-IO/AppFlowy`](https://github.com/AppFlowy-IO/AppFlowy) | AGPL-3.0 | Dépôt public accessible |
| [`toeverything/AFFiNE`](https://github.com/toeverything/AFFiNE) | indéterminée via l’API | Dépôt public accessible |

## Interprétation et limites

- **Dépôt actif ≠ fonctionnalité testée.** Les étoiles, la date de mise à jour, les releases et la présence d'un README ne prouvent pas la compatibilité avec une application propriétaire.
- Une licence « indéterminée via l'API » signifie que l'API GitHub n'a pas fourni d'identifiant SPDX exploitable ; elle n'implique pas l'absence de licence. Une vérification du texte de licence upstream reste à faire.
- Des projets tels que GIMP, Inkscape et LibreOffice utilisent des miroirs GitHub ; pour des preuves de fonctionnalité, privilégier leurs documentations et dépôts amont.
- **Aucune des revendications `documented` ou `partial` du seed n'a fait l'objet d'une revue de fonctionnalité avec URL de page/version dans cet audit.** Ne pas les publier comme preuves d'un test indépendant.
- Les résultats sont un instantané : exécuter `npm run audit:repositories` pour une nouvelle observation. Un échec réseau, une limitation de quota ou un dépôt renommé produit une catégorie non validée, pas une affirmation de suppression.

## Prochaine étape éditoriale

Pour chaque couple application/capacité : préciser le lien de la documentation, une version ou un commit, une date de vérification, un statut prudent et des limites. Un statut « vérifié » exige un protocole et des artefacts reproductibles.

