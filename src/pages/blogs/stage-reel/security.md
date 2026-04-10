---
layout: ../../../layouts/BlogPostLayout.astro
title: "Cybersécurité : Connecter l’Ultra-Sensible"
description: "Comment garantir l'intégrité et la sécurité des données IoT dans un environnement nucléaire."
date: "10/06/2023"
heroImage: "/images/reel-security.jpg"
blogTitle: "Journal de bord : Stage chez REEL (Division Nucléaire)"
parentLink: "/blogs/stage-reel"
---

Le 16 juin 2023, j'ai participé à la présentation stratégique du projet devant les experts d'**EDF**. L'enjeu n'était plus technique, mais sécuritaire : comment prouver qu'une solution connectée ne fragilise pas la souveraineté d'une centrale nucléaire ?

## L'architecture "Air-Gap" et le double réseau

Pour convaincre, nous avons misé sur une isolation physique et logique drastique via le Modicon M262 :
- **Interfaces distinctes** : Utilisation des deux ports Ethernet indépendants du M262. Le port **ETH1 (84.0.2.50)** gère le réseau local des dégrilleurs, tandis que le port **ETH2 (85.0.2.2)** est dédié à la remontée de données MQTT.
- **Segmentation** : Aucun routage n'est autorisé entre les deux réseaux, créant une barrière infranchissable pour tout flux non désiré.

## Flexibilité et Souveraineté du stockage

Nous avons proposé à EDF une matrice de solutions s'adaptant à la sensibilité des données et aux infrastructures du site :
- **Solutions de communication** : Modem 4G, WiFi industriel, Ethernet ou déploiement logiciel local.
- **Stockage des données** : Choix entre un **Cloud sécurisé** ou une installation sur les **serveurs internes d'EDF** (On-Premise) pour une maîtrise totale.

## La valeur ajoutée : Le Monitoring CSC

L'argumentaire final a reposé sur la règle **CSC**, pilier de l'Industrie 4.0 :
- **Contrôler** : Vision temps réel via REEL VISION® → Réactivité immédiate en cas d'anomalie.
- **Surveiller** : Statistiques détaillées (top 10 défauts, taux de présence par grille) pour optimiser les cycles.
- **Connaître** : Analyse long terme pour la maintenance prédictive, évitant les arrêts non programmés.

> "Dans le nucléaire, la cybersécurité n'est pas un frein à l'innovation, c'est le cadre qui la rend possible."

