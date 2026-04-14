# Intégration Astral Chat (Astro static)

## Analyse rapide du projet

- Le site est construit avec **Astro + Tailwind v4** et une direction artistique cosmique déjà très marquée.
- Le layout global `BaseLayout.astro` est utilisé partout, donc c'est le point d'ancrage idéal pour un widget flottant desktop.
- Le projet est actuellement configuré en `output: "static"` (`astro.config.mjs`), donc **pas de backend runtime natif** dans cette configuration.

## Ce qui a été ajouté

- Composant `src/components/AstralChat.astro`.
  - Mode `floating` (desktop uniquement via `hidden lg:flex`), bouton astral animé.
  - Mode `page` pour la route mobile dédiée.
  - UI glassmorphism + historique + effet de génération typewriter.
  - System instruction longue et facilement éditable dans la constante `SYSTEM_INSTRUCTION`.
  - Quota local navigateur (20 messages/jour) via `localStorage`.

- Route `src/pages/chat.astro`.
  - Prévue pour être liée dans le burger menu mobile.

- Navigation mise à jour avec un lien `/chat`.

## Modes d'appel Gemini recommandés

### Mode B — choisi pour ce projet (Coolify + Docker, 1 seul service)

- Le front Astro reste buildé en statique (`dist`).
- Un serveur Node léger (`server.mjs`) sert les fichiers statiques **et** expose `/api/astral-chat`.
- La clé Gemini est privée côté serveur via `GEMINI_API_KEY`.
- Le rate limit est fait en mémoire (IP + fenêtre de 24h), adapté à une instance unique.

Avantages:
- **Un seul projet Coolify** suffit (pas besoin de plusieurs services pour ce portfolio).
- Clé privée non exposée au navigateur.
- Implémentation simple, sans base externe.

Limites:
- Le rate-limit mémoire se réinitialise au redémarrage du conteneur.
- Si vous passez un jour en multi-instance, il faudra passer à Redis/KV.

## Anti-abus / quota (ordre de robustesse)

1. **API route + in-memory limit** (**implémenté**): adapté à 1 instance.
2. **API route + Redis/KV**: utile seulement si montée en charge / multi-instance.

## Variables d'environnement attendues

- `GEMINI_API_KEY=...` (obligatoire)
- `GEMINI_MODEL=gemini-2.5-flash` (optionnel)
- `ASTRAL_RATE_LIMIT_MAX=40` (optionnel, défaut 40 / IP / 24h)
- `PORT=8080` (optionnel, Coolify le gère généralement automatiquement)
