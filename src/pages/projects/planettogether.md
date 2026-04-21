---
layout: ../../layouts/ProjectDetailLayout.astro
title: "PlanetTogether"
description: "Pipeline d'intégration industrielle connectant SAP et SQL Server pour automatiser la planification de production — développé en alternance chez Orange Business."
heroImage: "/images/planettogether.png"
projectCategory: "Intégration industrielle · En production"
technologies:
  - Python
  - SQL Server
  - SQLAlchemy
  - GitLab CI
  - Pytest
  - PlanetTogether
links:
  - label: "Lire le journal d'alternance"
    url: "/blogs/alternance-obs"
    variant: "primary"
theme:
  accent: "#1AABE4"
  accentSoft: "#d0eef9"
  glowA: "rgba(26, 171, 228, 0.28)"
  glowB: "rgba(26, 171, 228, 0.14)"
  titleFont: "'Poppins', 'Manrope', sans-serif"
  bodyFont: "'Manrope', sans-serif"
---

## Le Projet

**PlanetTogether** est le cœur d'un monorepo Python développé en alternance chez **Orange Business** au sein d'une équipe de trois développeurs. L'objectif : automatiser la chaîne de planification de production pour les usines clientes, en connectant leurs systèmes SAP à l'outil de scheduling industriel **PlanetTogether**.

Projet confidentiel — déployé et opérationnel en production.

## La Chaîne d'Intégration

L'architecture repose sur une dépendance critique entre trois maillons :

```
PythonTemplateExtraction → PlanetTogether → PythonPublishToSAP → SAP
```

Chaque maillon est indépendant, mais la panne du premier bloque l'ensemble de la chaîne de production.

### PythonTemplateExtraction — ETL Amont

Pipeline ETL qui lit les données depuis des fichiers Excel et des tables de staging SQL Server, les transforme selon les contraintes métier, puis les écrit dans la base de destination que PlanetTogether consomme pour générer son planning.

- Lecture multi-source : Excel (données opérateurs, ressources) + SQL Server (ordres de fabrication)
- Modèles domaine typés (`Machine`, `HumanResources`, `Routings`, `ManufacturingOrders`…)
- Validation des données avec `ErrorCodes` métier (code, message, affichage dans PT)
- Logging rotatif configurable (`RotatingFileHandler`)

### PythonPublishToSAP — Publication Aval

Une fois PlanetTogether ayant généré le planning optimisé, ce module restitue les résultats dans les ordres de fabrication SAP — fermant la boucle entre l'outil de scheduling et le système ERP.

## Architecture Technique

```
src/
  main.py          — orchestrateur : _read_all() + _write_all()
  config/          — enums, ErrorCodes, DataWriter, configuration globale
  functions/       — helpers : dbo.py, excel.py, datetime_helper.py…
  models/          — modèles domaine avec __slots__ et méthodes read/write
  logs/            — configuration logging
tests/             — suite pytest (~63% de couverture)
```

**Patterns clés :**
- Dataclasses avec `slots=True` pour la performance mémoire
- Chaque modèle expose `read(df)` et `write(writer, ...)` — interface cohérente sur tout le domaine
- `DataWriter` abstrait `SQLAlchemy` pour les écritures — un seul point de changement si l'ORM évolue
- Accès Pandas sécurisé via `get_val(row, key, cast_type, default)` — pas de KeyError silencieux

## Déploiement

- **Windows Task Scheduler** — exécution planifiée des scripts Python selon les cycles de production
- **SQL Server Agent** — stored procedures déclenchées côté base de données
- **GitLab CI** — pipeline de tests automatisés sur chaque Merge Request (`python:3.12-slim`)

## Ce que j'ai appris

Ce projet m'a confronté à des problématiques que le développement web ne couvre pas : **logique métier industrielle**, contraintes de **données hétérogènes** (Excel terrain ↔ SQL Server ↔ ERP), et criticité d'un système où une régression bloque une chaîne de production entière.

Travailler sur un outil comme PlanetTogether, déployé chez de grands groupes industriels, m'a appris à mesurer l'impact réel d'une décision technique.
