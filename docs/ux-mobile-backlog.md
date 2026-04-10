# Backlog UX — Portfolio unique, intuitif et mobile-first (sans audio)

## Objectifs produit
- Créer une expérience mémorable sans surcharger l'interface.
- Conserver une identité visuelle forte avec un maximum d'un effet “signature” par écran.
- Garantir une navigation intuitive sur mobile (360px+) et desktop.
- Éviter toute dépendance audio pour préserver l'accessibilité et le confort d'usage.

## Backlog priorisé

### P0 — Clarté immédiate (impact fort, effort faible)
1. **Clarifier la proposition de valeur en page d'accueil**
   - Ajouter un bloc “Parcours rapide en 60 secondes”.
   - Mettre en avant 3 priorités lisibles (produit, technique, mobilité).
2. **Rendre les CTA plus explicites**
   - Boutons “Voir mes projets”, “Parcours 60 sec”, “Me contacter”.
3. **Équilibrer densité de contenu mobile**
   - Réduire la longueur des paragraphes “above the fold”.
   - Garder une seule action principale visible rapidement.

### P1 — Responsive et intuitivité (impact fort, effort moyen)
1. **Améliorer les cibles tactiles et le confort mobile**
   - Taille minimale des zones interactives à 44px.
   - Espacements adaptés aux petits écrans.
2. **Renforcer les états de focus clavier**
   - Focus visible cohérent sur les liens et boutons.
3. **Conserver la lisibilité dans toutes les sections**
   - Hiérarchie de titres stable.
   - Blocs de texte à largeur maîtrisée.

### P2 — Motion design maîtrisé (impact moyen, effort moyen)
1. **Respecter `prefers-reduced-motion`**
   - Désactiver les animations complexes si l'utilisateur préfère moins de mouvement.
2. **Limiter les animations progressives**
   - Désactiver les séquences longues en mode réduit.
3. **Uniformiser les transitions**
   - Durées courtes (150–300ms) et cohérentes.

## Implémentation réalisée dans ce lot
- ✅ P0.1, P0.2, P0.3
- ✅ P1.1, P1.2
- ✅ P2.1, P2.2

## Prochain lot recommandé
- Tester la navigation mobile sur 360/390/430px (iOS + Android).
- Mesurer Lighthouse mobile (performance/accessibilité).
- Optimiser les sections projet pour parcours recruteur en moins de 60 secondes.
