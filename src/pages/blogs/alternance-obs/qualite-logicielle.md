---
layout: ../../../layouts/BlogPostLayout.astro
title: "Qualité logicielle en milieu industriel : tests, typage et débogage"
description: "Comment nous avons renforcé la fiabilité d'integration-unify : suite pytest, Pyright en mode strict et correction d'un bug critique en production."
date: "01/03/2025"
blogTitle: "Blog d'alternance chez Orange Business Services"
parentLink: "/blogs/alternance-obs"
---

Dans un pipeline dont la défaillance bloque une chaîne de production industrielle, la qualité logicielle n'est pas optionnelle. Cette phase de l'alternance a été entièrement consacrée à renforcer la fiabilité d'integration-unify.

## Audit Pyright : 323 erreurs à zéro

Le premier chantier a été le typage statique. Le projet utilisait déjà Pyright, mais en mode permissif — des dizaines d'erreurs dormaient dans la base de code sans bloquer quoi que ce soit. J'ai configuré `pyrightconfig.json` en **mode standard** dans chaque sous-projet et entrepris de corriger les 323 erreurs remontées.

Les patterns les plus fréquents :

- **Narrowing manquant** sur les `Optional` — Pyright refuse d'utiliser une valeur potentiellement `None` sans vérification explicite.
- **Types Pandas non inférés** — `df["col"]` retourne `Series[Any]` par défaut, ce qui propage l'imprécision partout.
- **Retours de fonction ambigus** — des chemins de code qui ne retournaient rien de façon implicite là où un type était attendu.

Résultat : 0 erreur Pyright, et une base de code où les IDE peuvent enfin donner de l'aide utile.

## La suite de tests pytest

En parallèle du typage, j'ai contribué à étendre la couverture de tests, passant de 57% à ~63%. Les tests les plus intéressants à écrire ont été ceux qui simulent des DataFrames réels :

```python
@pytest.fixture(autouse=True)
def configure_formatter():
    UserFieldFormatter.configure(use_short_format=True)
    yield
    UserFieldFormatter._instance = None  # reset singleton entre les tests
```

`UserFieldFormatter` est un singleton qui doit être configuré avant toute création de `ResourceOperations`. Sans ce fixture `autouse`, les tests s'influençaient mutuellement de façon non déterministe — le genre de bug qui disparaît quand on les relance seul mais réapparaît en CI.

## Un bug critique : Machine unhashable

Le moment le plus formateur de cette période a été la correction d'un bug qui bloquait silencieusement la production.

**Symptôme** : `TypeError: unhashable type: 'Machine'` lors de l'exécution de `AttributeCodeTable.create()`, qui utilisait `set(sm_obj.Machines)` en interne.

**Cause racine** : les dataclasses Python avec `@dataclass(slots=True)` et `eq=True` (défaut) posent automatiquement `__hash__ = None` — comportement spécifié dans la PEP 557 pour éviter les incohérences. La classe `Machine` avait un champ `Capabilities: List[Capability]`, ce qui rendait `unsafe_hash=True` inutilisable (les listes ne sont pas hashables).

**Correction** :

```python
@dataclass(slots=True, eq=False)
class Machine:
    Id: str
    Capabilities: List[Capability]
    # ...

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Machine):
            return NotImplemented
        return self.Id == other.Id

    def __hash__(self) -> int:
        return hash(self.Id)
```

En désactivant `eq` automatique et en implémentant manuellement `__eq__` et `__hash__` basés uniquement sur l'`Id`, la machine devient hashable sans que ses champs mutables ne posent problème.

**Règle retenue** : tout modèle utilisé dans un `set()` ou comme clé de `dict` doit implémenter `__hash__` manuellement, basé uniquement sur son identifiant immuable.

## Ce que cette phase m'a apporté

Travailler sur la qualité d'un système existant est un exercice très différent de construire quelque chose from scratch. On apprend à lire les signaux faibles, à comprendre pourquoi un bug n'est pas apparu plus tôt, et à mesurer l'impact réel d'une correction. C'est probablement l'aspect le plus précieux de l'alternance : la confrontation avec des problèmes que les projets académiques n'exposent jamais.
