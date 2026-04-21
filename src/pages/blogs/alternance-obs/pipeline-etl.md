---
layout: ../../../layouts/BlogPostLayout.astro
title: "Concevoir un pipeline ETL pour l'industrie"
description: "Plongée dans PythonTemplateExtraction : lecture multi-source, transformation des données et écriture vers PlanetTogether."
date: "10/01/2025"
blogTitle: "Blog d'alternance chez Orange Business Services"
parentLink: "/blogs/alternance-obs"
---

Après avoir compris l'architecture globale du monorepo, je me suis plongé dans le cœur du système : **PythonTemplateExtraction**, le pipeline ETL qui nourrit PlanetTogether en données de production.

## Le défi : des sources hétérogènes

Les usines clientes ne produisent pas leurs données dans un format unique et propre. Les informations arrivent depuis deux canaux très différents :

- Des **fichiers Excel** exportés par les opérateurs — données sur les ressources humaines, les capacités machines, les calendriers de production.
- Des **tables de staging SQL Server** — ordres de fabrication, gammes opératoires, matrices de réglage.

Le rôle du pipeline est de réconcilier ces sources, d'appliquer les transformations métier, et d'écrire le résultat dans une base de données structurée que PlanetTogether peut consommer.

## L'orchestrateur : `main.py`

Tout commence dans `main.py`, qui expose deux fonctions principales :

```python
def _read_all() -> PipelineData:
    # 8 sous-fonctions de lecture, une par entité métier
    ...

def _write_all(data: PipelineData) -> None:
    # Écriture séquentielle dans la base de destination
    ...
```

`PipelineData` est un dataclass qui encapsule l'ensemble des entités lues — machines, ressources humaines, gammes, ordres de fabrication… — et les transporte jusqu'à l'étape d'écriture.

## Accès sécurisé aux DataFrames

L'un des points les plus délicats avec Pandas, c'est la gestion des données manquantes ou mal typées. Un `KeyError` silencieux peut passer inaperçu et produire des données corrompues en base. Pour y remédier, une helper function centralise tous les accès :

```python
get_val(row, key, cast_type, apply_func, default)
```

Elle tente l'accès, applique le cast et la transformation, retourne le défaut en cas d'absence — sans jamais lever d'exception non contrôlée. Tous les `model.read(df)` passent par là.

## `DataWriter` : abstraction de la persistance

L'écriture vers SQL Server se fait via `DataWriter`, une classe qui encapsule SQLAlchemy. L'avantage : si demain l'ORM change ou qu'on migre vers une autre base, un seul fichier est à modifier. Les modèles n'ont aucune dépendance directe vers SQLAlchemy — ils ne connaissent que `DataWriter`.

## Les `ErrorCodes` : des erreurs qui parlent à l'outil

PlanetTogether dispose d'une interface de reporting. Certaines erreurs métier doivent lui être remontées pour être affichées aux planificateurs. C'est le rôle des `ErrorCodes` : des NamedTuples avec un code, un message lisible, et un booléen `is_display_in_pt`.

```python
ErrorCodes.MACHINE_CAPACITY_MISSING = ErrorCode(
    code="E_CAP_001",
    message="Capacité machine manquante pour ressource {id}",
    is_display_in_pt=True
)
```

Cette granularité permet aux équipes terrain de comprendre ce qui a échoué sans avoir à fouiller les logs Python.

## Un pipeline qui tourne en production

Ce qui rend ce travail concret, c'est que ce pipeline s'exécute réellement, planifié par **Windows Task Scheduler**, chez de vraies usines clientes. Chaque matin, les planificateurs démarrent leur journée avec un PlanetTogether à jour — ou pas, si le pipeline a échoué. Cette responsabilité m'a donné une perspective sur la différence entre du code qui fonctionne et du code en lequel on peut avoir confiance.
