# Portfolio Alexandre Noblet

Portfolio personnel développé avec Astro, pensé comme une expérience immersive autour d'un univers cosmique premium.

Ce README est rédigé pour qu'une IA puisse intervenir rapidement et correctement sur le projet, sans casser la direction artistique, la structure ou les comportements UX déjà en place.

## 1) Contexte Produit

Objectif principal:
- Présenter le profil d'Alexandre Noblet à travers des sections claires: projets, compétences techniques, soft skills, expérience, contenus de blog.

Positionnement:
- Ton visuel: premium, spatial, élégant, légèrement futuriste.
- Priorité: lisibilité, cohérence visuelle, micro-interactions discrètes mais qualitatives.

Public cible:
- Recruteurs, leads techniques, clients potentiels, partenaires de projets.

## 2) Stack Technique

- Astro 5
- Tailwind CSS
- TypeScript
- CSS custom (animations, thème global, composants)

Scripts npm utiles:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## 3) Structure du Projet

Arborescence importante:

- src/pages: routes Astro
- src/components: composants UI
- src/layouts: layouts partagés
- src/data: contenu JSON et TS
- src/styles: styles globaux et animations
- public: assets statiques (images, docs)

Routes principales:

- /
- /projects
- /projects/[slug] via pages markdown
- /skills
- /soft-skills
- /experience
- /ai-portal
- /blogs et sous-routes

## 4) Direction Artistique (DA)

### ADN visuel

- Univers cosmique sombre avec effets de profondeur (dégradés radiaux, glow, glassmorphism).
- Contraste fort entre fond nocturne et accents lumineux.
- UI moderne mais pas minimaliste plate.

### Palette principale (globale)

- Fond: #040916
- Texte principal: #f3f0e2
- Texte secondaire: #b4b8ca
- Accent or: #f6d40d
- Accent rose: #e3a4d6

### Typographies

- Titres: Cormorant Garamond
- Texte courant: Manrope
- Projets spécifiques: surcharge possible en Poppins et police custom via variables de thème

### Animations

- Transitions de page: fondu léger (180ms)
- Animations décoratives: drift, twinkle, pulse
- Respect du mode reduced motion déjà implémenté

Règle:
- Toute nouvelle animation doit rester subtile et ne pas gêner la lecture.

## 5) Système de Thème pour Pages Projet

Layout concerné:
- src/layouts/ProjectDetailLayout.astro

Frontmatter supporté:
- title
- description
- heroImage
- logo (optionnel)
- projectCategory
- technologies
- links
- parentLink
- theme

Variables de thème disponibles:
- --project-accent
- --project-accent-soft
- --project-glow-a
- --project-glow-b
- --project-title-font
- --project-body-font

Comportements établis:
- Si heroImage et logo sont identiques, le hero peut être masqué pour éviter les doublons.
- Le contenu markdown hérite du thème projet (couleurs, police titre, accents liens).

## 6) Conventions UX Déjà En Place

### Liste des projets

- Les cards sont harmonisées en hauteur.
- L'image de card est en crop cover, ratio type bannière.
- Clic sur card = navigation vers page détail si detailPage existe.
- Les liens externes (démo, github) gardent leur comportement propre.

### Page projet détaillée

- Hero en object-cover pour éviter les bandes vides.
- Bloc contenu markdown dans une carte glass dédiée.
- Actions en boutons primary ou ghost selon le frontmatter.

## 7) Sources de Données

Fichiers principaux:

- src/data/projects.json
- src/data/experience.json
- src/data/skills.json

Convention projets:

- detailPage est optionnel.
- Si detailPage est défini, la card devient navigable vers la page dédiée.
- imageUrl doit pointer vers un asset réel de public/images.

## 8) Règles d'Intervention pour une IA

Objectif:
- Modifier le moins possible pour atteindre le besoin.
- Préserver la DA et les comportements UX existants.

À faire:
- Préférer des changements ciblés.
- Garder la cohérence des classes Tailwind et styles globaux.
- Vérifier les impacts responsive desktop/mobile.
- Lancer npm run build après modifications significatives.

À éviter:
- Refonte visuelle non demandée.
- Changement arbitraire de palette ou de typo.
- Suppression des animations reduced motion.
- Introduction de patterns visuels génériques qui cassent l'identité cosmique.

## 9) Workflow Recommandé pour Contribuer

1. Lire les layouts et styles globaux.
2. Identifier si la demande est page-spécifique ou globale.
3. Modifier le composant ou le style le plus local possible.
4. Vérifier la cohérence des assets et routes.
5. Exécuter la build.
6. Fournir un résumé clair des fichiers modifiés et du résultat.

## 10) Git et Fichiers Utiles

Le projet ignore déjà:

- node_modules
- dist
- .astro
- logs npm/yarn/pnpm
- .env et variantes
- fichiers éditeur/OS

But:
- Commiter uniquement le code source, la config, les contenus et les assets utiles.

## 11) Checklist Avant Commit

- Les pages se compilent avec npm run build
- Aucun asset manquant dans public
- Les liens de navigation fonctionnent
- Le rendu mobile reste propre
- La DA cosmique est conservée
- Les changements restent alignés avec la demande utilisateur

---

Si une IA doit intervenir sur ce repository, elle doit traiter ce README comme la source de vérité produit et visuelle, sauf instruction explicite contraire de l'utilisateur.

## 12) Astral Chatbot IA

Une intégration initiale du chatbot Astral est disponible avec une documentation dédiée:

- docs/astral-chat-integration.md

Le document détaille les deux modes (site statique vs API route serveur), la configuration Gemini et la stratégie de limitation de quota.

Implémentation actuelle recommandée pour Coolify:

- build Astro statique (`dist`)
- serveur Node unique (`server.mjs`) dans le même container Docker
- endpoint `/api/astral-chat` avec clé privée (`GEMINI_API_KEY`) + rate limit mémoire
