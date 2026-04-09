---
layout: ../../../layouts/BlogPostLayout.astro
title: "IoT & Protocoles : Du Modbus au MQTT"
description: "Plongée dans l'implémentation technique de la passerelle IoT entre les automates Schneider et le cloud."
date: "15/05/2023"
heroImage: "/images/reel-technical.png"
blogTitle: "Journal de bord : Stage chez REEL (Division Nucléaire)"
parentLink: "/blogs/stage-reel"
---

L'une des phases les plus denses de mon stage a été la mise en place de la chaîne de communication entre les dégrilleurs et la plateforme de supervision. Ma mission était claire : extraire les indicateurs de performance et les transmettre via le protocole **MQTT**.

## L'architecture Schneider Electric : une puissance de calcul industrielle

Le projet repose sur une dualité d'automates aux spécifications impressionnantes :
- **Modicon M340 (Serveur)** : Un processeur capable de gérer 1024 E/S, avec un temps de cycle de **0,12 µs** par opération booléenne.
- **Modicon M262 (Passerelle IIoT)** : Un contrôleur "Edge" nouvelle génération avec un temps de cycle de **0,5 ms** et 32 Mo de RAM dédiée au programme, supportant nativement MQTT et HTTPS.

## La programmation : une maîtrise du Structured Text

Le développement a nécessité une polyvalence sur les langages de programmation industriels (IEC 61131-3) :
- **Structured Text (ST) (~60%)** : Utilisé pour toute la logique complexe de calcul du M262, les initialisations et la gestion des défauts.
- **Grafcet (SFC) (~30%)** : Pour l'orchestration des modes de fonctionnement.
- **Ladder (LD) (~10%)** : Uniquement pour les transitions simples.

## Défi : L'extraction des données et le bug "mémorable"

La communication s'est structurée en deux étapes :
1. **Localement** : Utilisation du scrutateur **Modbus TCP**. Le M262 récupère les données du M340 sur un réseau dédié (84.0.2).
2. **L'adressage** : Ce fut un point critique. Je me souviendrai longtemps d'un bug d'adressage entre le format décimal et hexadécimal (adressage **%MW23006** vs **16#59DE**) qui m'a appris la rigueur absolue nécessaire en automatisme.

## Galère de composants et Flexibilité

En pleine crise mondiale des composants, trouver un M262 en stock relevait du miracle (délais annoncés de 3 à 6 mois). Nous avons dû faire preuve d'agilité en testant temporairement l'architecture sur des simulateurs et des matériels de remplacement (M580) avant de pouvoir enfin déployer sur la cible finale récupérée in extremis.

> "Passer d'un monde d'adresses mémoires à un monde de messages JSON via MQTT a été le véritable saut vers l'Industrie 4.0."

