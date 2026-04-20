---
layout: ../../layouts/ProjectDetailLayout.astro
title: "Bevel"
description: "Site e-commerce vitrine pour la vente en salon — actuellement en production sur bevel.fr."
heroImage: "/images/bevel.png"
projectCategory: "E-commerce · En production"
technologies:
  - Astro 5
  - React 19
  - Strapi 5
  - PostgreSQL
  - Stripe
  - Cloudflare Pages
  - Docker
  - TypeScript
links:
  - label: "Consulter le site"
    url: "https://bevel.fr"
    variant: "primary"
theme:
  accent: "#bf1717"
  accentSoft: "#f5c6c6"
  glowA: "rgba(191, 23, 23, 0.28)"
  glowB: "rgba(191, 23, 23, 0.14)"
  titleFont: "'bookish', serif"
  bodyFont: "'JetBrains Mono', monospace"
  bodyWeight: 400
fontImports:
  - "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
  - "https://fonts.cdnfonts.com/css/bookish"
---

## Le Projet

**Bevel** est un projet client — un site e-commerce conçu pour une marque vendant ses produits en salon et en ligne. Développé et déployé de A à Z en autonomie, il est actuellement **en production sur [bevel.fr](https://bevel.fr)**. L'enjeu : livrer un outil professionnel, fiable et facile à gérer au quotidien sans intervention technique.

## Ce que ça permet

### Pour les clients

- Parcourir un catalogue avec variations de produits (couleur, taille, disponibilité)
- Ajouter au panier et payer en toute sécurité via Stripe
- Recevoir une confirmation par email et suivre sa commande en temps réel

### Pour le gérant

- Gérer les produits, les commandes et les codes promo depuis une interface dédiée
- Suivre chaque commande étape par étape jusqu'à la livraison
- Télécharger les factures générées automatiquement
- Préparer et prévisualiser les contenus avant publication

## Pourquoi cette stack ?

Ce projet m'a demandé de faire des choix d'architecture concrets, avec des contraintes réelles : budget limité, maintenance en solo, site en production.

- **Astro 5 (SSR)** : les pages sont rendues côté serveur pour le SEO et la vitesse — seules les parties interactives (panier, checkout) embarquent du JavaScript. Résultat : un site rapide sans sacrifier l'expérience utilisateur.
- **Strapi 5** : plutôt que de coder un back-office sur mesure, j'ai choisi un headless CMS qui offre une interface d'administration prête à l'emploi. Le gérant peut mettre à jour ses produits et contenus sans toucher au code.
- **PostgreSQL** : nécessaire pour garantir la cohérence du stock sous charge — les transactions ACID évitent les surventes en cas d'achats simultanés.
- **Stripe** : intégration native des webhooks pour fiabiliser la confirmation de commande même en cas de coupure réseau côté client.
- **Cloudflare Pages + VPS Docker** : frontend sur CDN mondial pour la performance, backend conteneurisé pour l'isolation et la facilité de mise à jour — le tout géré et maintenu en autonomie.
