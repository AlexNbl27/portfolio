---
layout: ../../../layouts/BlogPostLayout.astro
title: "Acquérir de nouvelles compétences"
description: "Quand Flutter ne suffit plus : API Python, conteneurs et CI/CD."
date: "30/07/2024"
heroImage: "/images/skills.png"
blogTitle: "Blog de stage chez Orange Business Services"
parentLink: "/blogs/stage-obs"
---

Alors que le socle mobile se consolidait, les besoins ont évolué vers un défi plus complexe : la conception d'un moteur de calcul de position déporté, nécessitant l'implémentation d'une **API Python**.

## Un saut vers l'ingénierie Backend

N'ayant jamais conçu d'API dans un cadre professionnel, cette mission a été une opportunité de montée en compétence fulgurante. J'ai dû rapidement appréhender les fondamentaux du développement backend :

- **Structuration de l'API** : Choix des frameworks et organisation de la logique de calcul.
- **Interopérabilité** : Gestion des flux de données entre l'application Flutter et le moteur Python.
- **Processus de déploiement** : Préparation de l'environnement pour une exécution fiable en production.

## Maîtrise des conteneurs et du CI/CD

Le défi majeur a été l'hébergement de cette solution. Après une phase de recherche intensive, j'ai réussi à orchestrer le déploiement de l'API sous forme de **conteneur** sur la plateforme **Red Hat OpenShift**.

Pour pérenniser ce travail, j'ai implémenté une pipeline **CI/CD** via **GitLab**. Désormais, chaque modification du code déclenche automatiquement la reconstruction de l'image et sa mise à jour en environnement de test/prod.

## Bilan de cette étape charnière

Cette mission a sans doute été la plus formatrice de mon stage. Elle m'a permis de transformer des concepts théoriques en expertises opérationnelles :
- **Développement Python** appliqué aux services web.
- **Automatisation industrielle** via GitLab CI/CD.
- **Orchestration Cloud** avec OpenShift.

> C’est dans cette phase de pivot technique que j'ai réalisé la puissance de l'approche Fullstack : être capable de maîtriser la chaîne de valeur du mobile jusqu'à l'infrastructure.

