# Diagnostic architecture - Playtrack (semaine 2)

## Back-end (dossier: server)

- État actuel: Archi propre.
- Verdict: Rien à changer.

## Front-end (dossier: client)

- État actuel: Archi à refaire.
- Problème identifiés:
  - feature/dashboard (vide) => à supprimer.
  - feature/hooks => à déplacer, src/hooks + renommer les 3 fichiers avec préfixe use (fix ESlint)
  - Page/ + feature/auth/ => à garder tel quels, décision assumé d'exception feature-based pour l'auth
  - point de nommage mineur sur Page/ (je viens de le corriger)
- Décision: feature-based juste pour auth, le reste en layer-based pourquoi car auth est une assez grosse feature pour avoir son dossier à elle

## Action prévu pour le refactor (semaine 3-4)

- Revoir l'archi du dossier client (front-end)
  - supprimer feature/dashboard
  - hooks à déplacer dans un dossier a lui à la racine de src/
  - Renommer les 3 fichier avec préfixe use (fix ESlint)
