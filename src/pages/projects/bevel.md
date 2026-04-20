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

## Problème

Une marque vendant en salon et en ligne avait besoin d'un site e-commerce fiable, rapide et administrable sans dépendre d'un développeur au quotidien.

## Contraintes

- Budget contraint et maintenance en solo.
- Nécessité d'un parcours d'achat simple sur mobile comme desktop.
- Fiabilité des commandes et du stock en environnement de production.
- Besoin d'un SEO solide pour capter du trafic organique.

## Solution

- Architecture Astro SSR pour des pages performantes et un rendu optimisé SEO.
- Intégration Stripe (checkout + webhooks) pour sécuriser la chaîne de commande.
- Strapi pour un back-office administrable par le client en autonomie.
- PostgreSQL pour la cohérence des données stock/commandes.
- Déploiement frontend + backend conteneurisé pour faciliter les mises à jour.

## Résultats

- ✅ Site en production sur **bevel.fr**.
- ✅ Process d'achat opérationnel de bout en bout (panier → paiement → confirmation).
- ✅ Administration du catalogue et des contenus réalisable sans intervention technique quotidienne.
- 🔢 KPI à confirmer : taux de conversion, panier moyen, temps de gestion hebdo.
