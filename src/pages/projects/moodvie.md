---
layout: ../../layouts/ProjectDetailLayout.astro
title: "Moodvie"
description: "Une application desktop intuitive qui recommande des films et séries en fonction de votre état émotionnel."
heroImage: "/images/moodvie.png"
projectCategory: "Application Desktop (C#)"
technologies:
  - C#
  - .NET
  - XAML
  - WPF
links:
  - label: "Voir sur GitHub"
    url: "https://github.com/AlexNbl27/Moodvie"
    variant: "primary"
theme:
  accent: "#FFB000"
  accentSoft: "#FFF4DA"
  glowA: "rgba(255, 176, 0, 0.35)"
  glowB: "rgba(230, 57, 70, 0.22)"
  titleFont: "'Poppins', 'Manrope', sans-serif"
---

## L'Expérience

Moodvie est né d'un constat universel : nous passons parfois plus de temps à choisir un film qu'à le regarder. Pour résoudre ce "paradoxe du choix", l'application propose une approche centrée sur **l'intelligence émotionnelle**. En sélectionnant votre état d'esprit actuel (joyeux, stressé, nostalgique, etc.), Moodvie analyse vos besoins pour suggérer instantanément les contenus les plus pertinents de votre catalogue.

## Architecture & Technologie

Ce projet a été conçu avec la stack **.NET / C#**, utilisant **WPF (Windows Presentation Foundation)** pour offrir une interface desktop à la fois fluide et performante. L'accent a été mis sur la séparation stricte des responsabilités (pattern MVVM) pour garantir une maintenance simplifiée :

- **Algorithme d'Appairage** : Un moteur de recommandation croisant les genres cinématographiques avec des pondérations émotionnelles spécifiques.
- **Expérience Utilisateur (UX)** : Une interface moderne en **XAML**, pensée pour la clarté et la rapidité d'exécution.
- **Gestion Dynamique** : Une structure de données flexible permettant l'intégration facile de nouvelles sources de contenus.

## Impact & Apprentissages

Développé durant mon cursus en **DUT GEII**, Moodvie a été un projet pivot pour consolider mes bases en programmation orientée objet. Il témoigne de ma capacité à concevoir des outils desktop robustes tout en plaçant la psychologie de l'utilisateur au coeur de la réflexion technique.
