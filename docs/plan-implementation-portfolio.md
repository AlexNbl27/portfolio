# Plan d'implémentation — Évolution du portfolio

_Date: 2026-04-20_

## Objectif
Structurer l'évolution du portfolio pour maximiser la conversion (prospects/recruteurs), tout en gardant une base Astro maintenable et une UX claire.

---

## Vue d'ensemble des phases

### Phase 1 — Quick wins (impact immédiat)
1. Refonte des pages projets en format **Problème → Contraintes → Solution → Résultats**.
2. SEO global via layout (canonical, Open Graph, Twitter cards).
3. Refonte homepage en portail interactif (CTA rapides + navigation guidée).

### Phase 2 — Conversion (services/contact)
1. Création page `/services` (packs, process, preuves sociales).
2. Création page `/contact` (formulaire + embed de réservation).
3. Ajout hub `/expertise` pour regrouper compétences techniques + soft skills.
4. Rationalisation navigation principale (liens orientés parcours).

### Phase 3 — IA Astral (personnalisation)
1. Ajout switch **Mode Pro / Mode Pote** dans l'interface de chat.
2. Transmission du mode côté frontend (`personalityMode`).
3. Composition dynamique du prompt côté serveur (base + mode).
4. Mise à jour des ressources recommandées IA (`/services`, `/contact`, `/expertise`).

### Phase 4 — Accessibilité et robustesse
1. Accessibilité des onglets home (ARIA + navigation clavier).
2. Micro-copy contextualisée selon mode de chat.
3. Nettoyage code mort/composants inutilisés.

---

## Détails techniques par lot

### Lot A — SEO et métadonnées globales
**Fichier clé**: `src/layouts/BaseLayout.astro`

- Ajouter props: `ogTitle`, `ogDescription`, `ogImage`, `canonical`.
- Générer `canonicalUrl` et `ogImageUrl` absolues.
- Injecter balises OG + Twitter cards dans `<head>`.

**Critères d'acceptation**
- Chaque page a une meta description exploitable.
- Les partages sociaux affichent titre, description, image.

---

### Lot B — Homepage orientée conversion
**Fichiers clés**:
- `src/pages/index.astro`
- `src/components/HomePortalTabs.astro`
- `src/components/HomeProofStrip.astro`
- `src/data/home-portal.ts`

- Garder un message principal clair (parcours recruteur / services / contact).
- Remplacer accumulation de cards par un bloc onglets interactif.
- Ajouter zone “preuves rapides” (KPI + preuve sociale).

**Critères d'acceptation**
- L'utilisateur comprend en <10s où cliquer selon son profil.
- Réduction de la surcharge visuelle sur la home.

---

### Lot C — Services / Contact / Expertise
**Fichiers clés**:
- `src/pages/services.astro`
- `src/pages/contact.astro`
- `src/pages/expertise.astro`
- Wrappers EN: `src/pages/en/services.astro`, `src/pages/en/contact.astro`, `src/pages/en/expertise.astro`
- Composants: `ServicePackCard`, `ProcessStep`, `BookingEmbed`, `TestimonialCard`
- Data: `src/data/services.ts`, `src/data/contact.ts`, `src/data/testimonials.ts`

- `/services`: présenter des offres lisibles + process + CTA.
- `/contact`: formulaire prêt à brancher + réservation.
- `/expertise`: point d'entrée unique vers skills/soft-skills.

**Critères d'acceptation**
- Parcours conversion continu: home → services → contact.
- Navigation cohérente FR/EN.

---

### Lot D — Astral (switch personnalité)
**Fichiers clés**:
- `src/components/AstralChatContent.astro`
- `src/scripts/astral-chat.ts`
- `server.mjs`

- UI: radio switch mode Pro / Pote.
- Front: persister le mode en session + reset conversation au changement.
- Back: sélectionner instruction système selon mode.

**Critères d'acceptation**
- Le ton de réponse change selon le mode choisi.
- L'historique ne pollue pas les changements de ton.

---

## Checklist QA

### Fonctionnel
- [ ] Navigation desktop/mobile cohérente.
- [ ] Routes FR/EN valides (`/services`, `/contact`, `/expertise`).
- [ ] Chat mode Pro/Pote opérationnel.

### Technique
- [ ] `npm run check`
- [ ] `npm run build`

### UX/Accessibilité
- [ ] Home tabs accessibles clavier.
- [ ] Libellés CTA explicites.
- [ ] Focus visible sur éléments interactifs.

---

## Itérations recommandées (prochaines étapes)

1. **Instrumentation analytics** (events CTA home/services/contact).
2. **Connexion réelle formulaire** (Resend ou Formspree).
3. **A/B tests copy** sur Hero + CTA principaux.
4. **Témoignages réels LinkedIn** (remplacer les mocks).
5. **Suivi KPIs mensuel** (taux clic CTA, taux contact, temps page).

---

## Commandes de validation

```bash
npm run check
npm run build
```

