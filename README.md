# 7 Wonders Score

Application web de notation de score pour le jeu **7 Wonders**.

Le projet est pensé comme une **PWA mobile-first**, utilisable sur ordinateur, tablette ou smartphone, avec une approche pédagogique : les fichiers PWA sont gérés manuellement sans plugin dédié.

## Objectif

Faciliter la saisie des scores de fin de partie et conserver des données propres pour permettre, à terme, des statistiques par joueur, par type de points et par extension.

## Fonctionnalités prévues

- Création d’une partie de 3 à 7 joueurs
- Sélection des joueurs depuis une liste
- Ajout de nouveaux joueurs
- Saisie des scores par joueur, par catégorie ou cellule par cellule
- Calcul automatique du total
- Détection du gagnant
- Départage en cas d’égalité par les points de monnaie
- Support des extensions :
  - Armada
  - Cities
  - Leaders
  - Edifice
- Sauvegarde locale des parties
- Préparation des données pour des statistiques futures

## Catégories de score

Catégories de base :

- Merveille
- Monnaie
- Bleu
- Jaune
- Vert
- Rouge
- Violet

Catégories ajoutées par les extensions :

- Armada : guerre maritime, îles
- Cities : noir
- Leaders : blanc
- Edifice : orange

## Stack technique

- Vite
- React
- TypeScript
- PWA sans plugin
- IndexedDB pour le stockage local

## Installation

```bash
npm install
```

## Lancement en développement
```bash
npm run dev
```
## Build
```bash
npm run build
```

## Modèle de données

Le projet distingue plusieurs entités principales :

- Player : joueur global avec un identifiant stable
- Game : partie jouée
- GamePlayer : participation d’un joueur à une partie
- ScoreEntry : score d’un joueur pour une catégorie donnée
- ScoreCategory : catégorie de score disponible

Cette structure permet de conserver les scores détaillés et de calculer plus tard des statistiques comme :

- nombre de victoires par joueur
- score moyen par joueur
- performance par couleur
- impact des extensions
- styles de victoire

## Statut

Projet en cours de conception / développement.