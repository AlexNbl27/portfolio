---
layout: ../../../layouts/BlogPostLayout.astro
title: "Architecture d'un monorepo d'intégration industrielle"
description: "Comment nous avons structuré integration-unify : deux pipelines Python, une chaîne critique et une logique métier exigeante."
date: "15/11/2024"
heroImage: "/images/planettogether.png"
blogTitle: "Blog d'alternance chez Orange Business Services"
parentLink: "/blogs/alternance-obs"
---

Après quelques semaines d'immersion sur PlanetTogether, la mission s'est précisée : contribuer à **integration-unify**, le monorepo Python maison qui connecte les systèmes de production à l'outil de scheduling.

## Un projet, deux pipelines

Le monorepo repose sur une architecture en deux sous-projets indépendants mais séquentiels :

- **PythonTemplateExtraction** — pipeline ETL amont qui lit les données depuis des fichiers Excel et des tables SQL Server, les transforme, puis alimente la base de données que PlanetTogether consomme.
- **PythonPublishToSAP** — module aval qui récupère le planning généré par PlanetTogether et le restitue dans les ordres de fabrication SAP.

La chaîne est simple à comprendre, mais critique à opérer :

```
PythonTemplateExtraction → PlanetTogether → PythonPublishToSAP → SAP
```

Un crash sur le premier maillon, et c'est l'ensemble du cycle de planification qui s'effondre. Cette réalité a immédiatement façonné notre approche : **fiabilité avant tout**.

## Une architecture pensée pour la maintenance

Ce qui m'a frappé en découvrant le code, c'est sa cohérence structurelle. Chaque sous-projet suit le même schéma :

```
src/
  main.py       — orchestrateur central
  config/       — énumérations, codes d'erreur, configuration globale
  functions/    — helpers métier (accès DB, Excel, dates, DataFrames)
  models/       — modèles domaine typés
  logs/         — configuration du logging rotatif
tests/          — suite pytest
```

Cette uniformité n'est pas cosmétique. Elle signifie qu'un développeur qui comprend un sous-projet comprend l'autre. Dans une équipe de trois personnes, c'est une décision d'architecture qui fait gagner un temps précieux.

## Des modèles domaine au cœur du système

La partie la plus dense à appréhender a été les **modèles domaine** de PythonTemplateExtraction. Des dizaines de classes représentant le vocabulaire de la production industrielle : `Machine`, `HumanResources`, `Routings`, `ManufacturingOrders`, `SetupMatrices`, `Capability`…

Chaque modèle implémente deux méthodes statiques :
- `read(df)` — transforme un DataFrame Pandas en instance du modèle
- `write(writer, ...)` — écrit l'instance dans la base de destination

Cette interface uniforme m'a permis de contribuer rapidement : comprendre le pattern une fois, l'appliquer partout.

## Ce que ça m'a appris

Entrer dans un projet existant avec une logique métier aussi dense est un exercice de rigueur. On ne peut pas inventer — chaque champ, chaque contrainte, chaque code d'erreur représente une décision prise face à une réalité industrielle. Apprendre à lire du code avant d'en écrire, c'est la première compétence que cette alternance m'a renforcée.
