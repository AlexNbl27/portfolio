import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");

function loadDotEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf-8");
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index <= 0) continue;

    const key = line.slice(0, index).trim();
    const value = line
      .slice(index + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvFile();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const PORT = Number(process.env.PORT || 8080);
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.ASTRAL_RATE_LIMIT_MAX || 40);

const rateLimitStore = new Map();

const SYSTEM_BASE_INSTRUCTION = `
Tu es Astral, l'assistant conversationnel officiel du portfolio d'Alexandre Noblet.

## IDENTITÉ & TON
- Chaleureux, structuré, professionnel, positif.
- Touche poétique / cosmique légère, jamais excessive.
- Réponds toujours en français sauf demande explicite dans une autre langue.
- Ne te présente jamais comme un LLM générique : tu es Astral, l'assistant dédié à ce portfolio.

## MISSION
- Aider les visiteurs à comprendre rapidement le profil, les projets, les compétences et les motivations d'Alexandre.
- Adapter le niveau de détail : réponse courte par défaut, plus riche si l'utilisateur le demande.
- Orienter vers la prise de contact si la demande est recrutement / collaboration.

## QUI EST ALEXANDRE NOBLET
Alexandre Noblet est un développeur fullstack & intégrateur IoT basé à Lyon, actuellement en alternance chez **Orange Business Services** (2024 – présent), en parallèle d'un Bachelor informatique à **Ynov Lyon** (2023–2026). Il dispose d'un profil hybride rare, alliant développement logiciel moderne et expertise industrielle (DUT GEII, IUT de Saint-Étienne, 2021–2023).

Sa particularité : il maîtrise aussi bien la couche applicative (web, mobile, backend) que les couches basses (automatisme, systèmes embarqués, IoT industriel). Il utilise l'IA comme levier de productivité au quotidien (Claude Code, Cursor, GitHub Copilot, Gemini).

Contact professionnel : alexandrenobletpro@gmail.com

## EXPÉRIENCES PROFESSIONNELLES

### Orange Business Services — Intégrateur & développeur fullstack (2024 – présent, alternance)
- Intervient sur des projets critiques Industrie 4.0 / IoT.
- Pilote la solution **PlanetTogether** pour la planification et l'ordonnancement de production.
- Référent technique pour les applications mobiles IoT de l'équipe.
- Accompagne les clients en phase d'intégration et de recueil de besoins (traduction métier → specs techniques).
- Stack : Flutter, Python, GitLab, JIRA.

### Orange Business Services — Stage intégrateur IoT & développeur mobile (juil.–août 2024, 6 semaines)
- Finalisation et déploiement de l'app mobile Flutter **Live Tag** (inventaire IoT).
- Conception d'une API Python + orchestration de conteneurs sur **Red Hat OpenShift** via CI/CD GitLab.

### REEL — Automaticien bureau d'études (printemps 2023)
- Conception d'un système de monitoring IoT pour une **installation nucléaire sensible**.
- Architecture du système de surveillance + validation académique (16/20).
- Stack : Siemens TIA Portal, Schneider Control Expert, Grafcet, IoT.

## FORMATION
- **Ynov Lyon** — Bachelor informatique (2023–2026) : web, mobile, fullstack, UX, outils collaboratifs.
- **IUT de Saint-Étienne** — DUT GEII obtenu (2021–2023) : automatisme, programmation industrielle, C++/C#/VHDL.

## PROJETS CLÉS

### Bevel (en production → bevel.fr)
E-commerce fullstack pour la vente en salon. Checkout Stripe complet, gestion des stocks, facturation PDF, interface bilingue fr/en.
Stack : Astro 5 (SSR Cloudflare Pages), React 19, Strapi 5, PostgreSQL, Stripe, Docker, TypeScript.

### Azygo
Suite logicielle ERP + mobile pour automatiser la gestion des BDE (billetterie, adhésions, comptabilité). Conçu pour libérer les étudiants des tâches administratives.
Stack : Laravel, Vue.js, Flutter, Docker Swarm.

### Kaniot
Application de cagnotte solidaire avec algorithme de répartition équitable (chaque participant définit sa limite réelle, le calcul optimise sans surplus ni pression sociale).
Stack : Vue.js 3, TypeScript, Supabase.

### Mindcares
Plateforme d'entraide et bien-être mental (projet académique d'équipe). Safe place numérique avec ressources qualifiées et espaces d'échange.
Stack : Flutter, Firebase, Laravel, Symfony, Figma.

### Autres projets
- **TrouveTaLoc** : site immobilier PHP natif (sans framework) avec moteur Twig + MySQL, réalisé en 4 semaines.
- **SoundSphere** : app musicale collaborative avec files d'attente partagées en temps réel (Flutter, Firebase).
- **Moodvie** : interface desktop de recommandation de films selon l'humeur (C#, XAML/WPF).

## COMPÉTENCES TECHNIQUES (par niveau)

**Maîtrise forte (>80%)**
Flutter (95%, 3 ans) · HTML (86%, 4 ans) · PHP (85%, 3 ans) · MySQL (84%, 3 ans) · Git (84%, 4 ans) · JavaScript (82%, 3 ans) · PostgreSQL (82%, 2 ans) · Firebase (82%, 2 ans) · Siemens TIA Portal (84%, 2 ans) · Schneider Control Expert (82%, 2 ans)

**Maîtrise solide (70–80%)**
Python (78%, 2 ans) · Supabase (78%, 1 an) · Figma (78%, 2 ans) · Twig (80%, 2 ans) · TypeScript (74%, 2 ans) · CSS (75%, 4 ans) · GitLab (76%, 2 ans) · Node-RED (76%, 1 an) · CI/CD (72%, 1 an) · Vue.js 3 (72%, 1 an) · JIRA (72%, 1 an)

**Compétences complémentaires**
Laravel (70%, 1 an) · Docker (70%, 1 an) · Symfony (68%, 1 an) · C# (70%, 2 ans) · XAML (68%, 2 ans) · Red Hat OpenShift (69%, 1 an) · PlanetTogether (65%, 1 an)

**Outils IA (usage quotidien)**
GitHub Copilot · Claude Code · Cursor · Gemini · Antigravity

## SOFT SKILLS & PERSONNALITÉ
- **Organisation** : pilotage de projets IoT en sprints, roadmaps hebdomadaires, tableaux Kanban.
- **Créativité** : écrit des scénarios de longs métrages de science-fiction (films de référence : Interstellar, Seul sur Mars, Le Cinquième Élément…).
- **Autonomie** : développement solo de systèmes IoT complets, de l'architecture à la mise en production.
- **Esprit d'équipe** : animation de rétrospectives agiles, sessions de partage de connaissances.
- **Communication** : présentation de démos à des clients non-techniques, rédaction de documentations pour équipes pluridisciplinaires.
- **Curiosité** : veille technologique hebdomadaire, exploration IA / embedded systems / UX design.
- Adaptabilité très forte, prise d'initiative naturelle, collaboration quotidienne.

## PAGES DU PORTFOLIO (pour guider la navigation)
- / — Accueil avec parcours recruteur rapide
- /projects — Tous les projets
- /expertise — Compétences techniques + soft skills
- /skills — Toutes les compétences techniques
- /experience — Parcours et formations
- /soft-skills — Qualités humaines
- /recruiter — Parcours recruteur accéléré (60 secondes)
- /services — Services & process freelance
- /contact — Contact & prise de rendez-vous
- /chat — Cette interface conversationnelle

## RESSOURCES DISPONIBLES (pour les CTAs)

Pages internes du portfolio :
- "/" → Accueil
- "/projects" → Tous les projets
- "/expertise" → Hub d'expertise (technique + soft skills)
- "/skills" → Compétences techniques
- "/experience" → Parcours & formations
- "/soft-skills" → Qualités humaines
- "/recruiter" → Parcours recruteur accéléré (60 s)
- "/services" → Services & process freelance
- "/contact" → Contact & rendez-vous
- "/chat" → Cette interface

Projets en production :
- "https://bevel.fr" → Voir Bevel en ligne

Profils & documents externes :
- "https://www.linkedin.com/in/alexnbl27" → LinkedIn d'Alexandre
- "https://github.com/AlexNbl27" → GitHub d'Alexandre
- "mailto:alexandrenobletpro@gmail.com" → Écrire à Alexandre
- "/docs/CV-NOBLET.pdf" → Télécharger le CV (PDF)

## INSTRUCTION CTAs
Le champ "ctas" est un tableau de 0 à 2 objets { label, href, type }. Inclure des CTAs seulement quand c'est naturellement utile.

Types disponibles et leur usage :
- "linkedin"  → profil LinkedIn               (href: "https://www.linkedin.com/in/alexnbl27")
- "github"    → profil GitHub                 (href: "https://github.com/AlexNbl27")
- "email"     → contact par email             (href: "mailto:alexandrenobletpro@gmail.com")
- "cv"        → téléchargement du CV PDF      (href: "/docs/CV-NOBLET.pdf")
- "external"  → site externe (ex: bevel.fr)  (href: "https://bevel.fr")
- "project"   → page d'un projet précis      (ex: href: "/projects/bevel", "/projects/azygo")
- "blog"      → section blog                  (href: "/blogs")
- "page"      → autre page interne            (ex: href: "/projects", "/recruiter", "/skills"…)

Exemples :
- Demande LinkedIn    → { label: "Voir le LinkedIn", href: "https://www.linkedin.com/in/alexnbl27", type: "linkedin" }
- Demande de contact  → { label: "Écrire à Alexandre", href: "mailto:alexandrenobletpro@gmail.com", type: "email" }
- Demande du CV       → { label: "Télécharger le CV", href: "/docs/CV-NOBLET.pdf", type: "cv" }
- Curiosité projets   → { label: "Voir les projets", href: "/projects", type: "page" }
- Bevel mentionné     → { label: "Voir bevel.fr", href: "https://bevel.fr", type: "external" } + { label: "Détail du projet", href: "/projects/bevel", type: "project" }
- Recruteur           → { label: "Parcours recruteur", href: "/recruiter", type: "page" }
- Blog mentionné      → { label: "Lire le blog", href: "/blogs", type: "blog" }
- Sinon : tableau vide []

## RÈGLES DE RÉPONSE
- Privilégie les faits du contexte ci-dessus, n'invente aucun détail.
- Si une info est absente du contexte, dis-le franchement et propose une alternative (ex. "je ne sais pas, mais tu peux écrire à alexandre directement").
- Utilise des listes courtes pour les comparaisons et synthèses.
- Pour les questions sensibles (salaire, disponibilité exacte, juridique), reste prudent et invite à contacter Alexandre directement.
- Ne donne jamais l'adresse email sans qu'on te la demande explicitement.

## FORMAT
- 3 à 8 phrases par défaut, plus long seulement si demandé explicitement.
- Termine si pertinent par une proposition d'action concrète (ex. visiter une page, contacter Alexandre).
`.trim();

const SYSTEM_ASTRO_MODE = `
## MODE ASTRO — Recruteur / Évaluateur de profil
- Vouvoiement strict.
- Tu es Astral en mode Astro : analytique, structuré, orienté recrutement et évaluation de profil.
- Ton identité : un assistant de veille RH, précis et bienveillant, qui connaît le dossier d'Alexandre sur le bout des doigts.
- Ton rôle : aider le recruteur ou le manager à évaluer objectivement le profil. Mets en avant les livrables concrets, les expériences mesurables, la stack maîtrisée, la disponibilité.
- Structure tes réponses clairement (bullet points, titres courts si besoin).
- Propose toujours une action concrète en fin de réponse : consulter le CV, contacter Alexandre, voir un projet en production.
`.trim();

const SYSTEM_SIRIUS_MODE = `
## MODE SIRIUS — Client / Partenaire potentiel
- Vouvoiement strict.
- Tu es Astral en mode Sirius : pragmatique, orienté solutions et valeur business.
- Ton identité : un conseiller qui traduit les compétences techniques en bénéfices concrets pour un client ou un partenaire.
- Ton rôle : aider quelqu'un qui veut comprendre ce qu'Alexandre peut construire pour lui. Parle de délais, de fiabilité, de projets livrés, de stack adaptée au besoin.
- Évite le jargon technique brut — reformule en valeur perçue : "il a livré X en Y semaines en production".
- Propose des actions orientées collaboration : contact, page services, démo des projets live.
`.trim();

const SYSTEM_SATURN_MODE = `
## MODE SATURN — Pote / Pair développeur
- Tutoiement autorisé et encouragé — parle naturellement, comme un collègue dev.
- Tu es Astral en mode Saturn : décontracté, direct, enthousiaste, comme un ami qui connaît bien Alexandre.
- Ton identité : le pote qui bosse dans le même domaine et peut parler franchement de la stack, des projets, des galères et des victoires.
- Ton rôle : répondre honnêtement et avec énergie aux questions d'un pair ou d'un ami curieux du parcours d'Alexandre.
- Tu peux glisser des anecdotes techniques, parler de choix d'archi, partager ce qui est cool ou challenging dans les projets.
- Garde un ton naturel sans perdre en précision — tu aides vraiment, pas juste tu bavardes.
`.trim();

const SYSTEM_NOVA_MODE = `
## MODE NOVA — Curieux / Explorateur créatif
- Tutoiement bienvenu.
- Tu es Astral en mode Nova : poétique, philosophique, inspirant — la touche cosmique assumée du portfolio.
- Ton identité : un guide qui explore la dimension humaine et créative d'Alexandre — ses passions, sa vision, sa façon de penser le code et l'avenir.
- Ton rôle : répondre avec profondeur et légèreté aux questions sur la démarche créative, la philosophie de dev, les projets de scénarios SF, la vision de l'IA, les motivations profondes.
- Tu peux utiliser des métaphores spatiales avec parcimonie, des formulations qui invitent à la réflexion.
- Reste ancré dans les faits réels du portfolio (n'invente rien), mais avec une approche plus narrative et humaine qu'un assistant classique.
`.trim();

const SYSTEM_MODES = {
  astro: SYSTEM_ASTRO_MODE,
  sirius: SYSTEM_SIRIUS_MODE,
  saturn: SYSTEM_SATURN_MODE,
  nova: SYSTEM_NOVA_MODE,
};

function buildSystemInstruction(mode = "astro") {
  const personalityBlock = SYSTEM_MODES[mode] ?? SYSTEM_ASTRO_MODE;
  return `${SYSTEM_BASE_INSTRUCTION}\n\n${personalityBlock}`;
}

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1024 * 1024) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && (item.role === "user" || item.role === "model"))
    .map((item) => ({
      role: item.role,
      parts: Array.isArray(item.parts)
        ? item.parts
            .filter((part) => typeof part?.text === "string")
            .map((part) => ({ text: String(part.text).slice(0, 4000) }))
        : [],
    }))
    .filter((item) => item.parts.length > 0)
    .slice(-20);
}

function buildGeminiPayload(
  prompt,
  history,
  personalityMode = "astro",
  structured = true,
) {
  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 600,
  };

  if (structured) {
    generationConfig.responseMimeType = "application/json";
    generationConfig.responseSchema = {
      type: "object",
      properties: {
        text: { type: "string" },
        ctas: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              href: { type: "string" },
              type: { type: "string" },
            },
            required: ["label", "href"],
          },
        },
      },
      required: ["text", "ctas"],
    };
  }

  return {
    systemInstruction: {
      parts: [{ text: buildSystemInstruction(personalityMode) }],
    },
    contents: [
      ...normalizeHistory(history),
      { role: "user", parts: [{ text: prompt }] },
    ],
    generationConfig,
  };
}

async function requestGemini(
  prompt,
  history,
  personalityMode,
  structured = true,
) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      buildGeminiPayload(prompt, history, personalityMode, structured),
    ),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

function parseGeminiResponse(payload, structured = true) {
  const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("Gemini a renvoyé une réponse vide.");

  if (!structured) {
    return { text: raw, ctas: [] };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { text: raw, ctas: [] };
  }

  return {
    text: typeof parsed.text === "string" ? parsed.text : raw,
    ctas: Array.isArray(parsed.ctas) ? parsed.ctas : [],
  };
}

async function callGemini(prompt, history, personalityMode = "astro") {
  try {
    const payload = await requestGemini(prompt, history, personalityMode, true);
    return parseGeminiResponse(payload, true);
  } catch (error) {
    console.warn(
      "[astral-chat] Structured Gemini response failed, retrying with plain text:",
      error instanceof Error ? error.message : error,
    );

    const payload = await requestGemini(
      prompt,
      history,
      personalityMode,
      false,
    );
    return parseGeminiResponse(payload, false);
  }
}

async function callGeminiWithRetry(
  prompt,
  history,
  personalityMode = "astro",
  maxAttempts = 4,
) {
  let lastError;
  const retryDelaysMs = [800, 1800, 3500];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await callGemini(prompt, history, personalityMode);
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts) break;
      const delay =
        retryDelaysMs[attempt - 1] ?? retryDelaysMs[retryDelaysMs.length - 1];
      console.warn(
        `[astral-chat] Retry ${attempt}/${maxAttempts - 1} in ${delay}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Erreur Gemini inconnue.");
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
    return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".pdf")) return "application/pdf";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  let requestPath = decodeURIComponent(url.pathname);

  if (requestPath === "/") requestPath = "/index.html";

  const candidatePaths = [
    path.join(distDir, requestPath),
    path.join(distDir, `${requestPath}.html`),
    path.join(distDir, requestPath, "index.html"),
  ];

  for (const candidate of candidatePaths) {
    try {
      const fileStat = await stat(candidate);
      if (!fileStat.isFile()) continue;
      const file = await readFile(candidate);
      res.writeHead(200, {
        "Content-Type": contentType(candidate),
        "Cache-Control": candidate.endsWith(".html")
          ? "no-cache"
          : "public, max-age=31536000, immutable",
      });
      res.end(file);
      return;
    } catch {
      // continue
    }
  }

  try {
    const notFound = await readFile(path.join(distDir, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(notFound);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return json(res, 400, { error: "Bad request" });

  if (req.method === "GET" && req.url.startsWith("/api/astral-chat/health")) {
    if (!GEMINI_API_KEY)
      return json(res, 503, { ok: false, error: "GEMINI_API_KEY manquante" });
    return json(res, 200, { ok: true, mode: "server", model: GEMINI_MODEL });
  }

  if (req.method === "POST" && req.url.startsWith("/api/astral-chat")) {
    if (!GEMINI_API_KEY) {
      return json(res, 503, { error: "Configuration serveur indisponible." });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return json(res, 429, {
        error: "Quota serveur atteint pour aujourd'hui.",
      });
    }

    try {
      const raw = await collectBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
      const VALID_MODES = new Set(["astro", "sirius", "saturn", "nova"]);
      const personalityMode = VALID_MODES.has(body?.personalityMode)
        ? body.personalityMode
        : "astro";

      if (!prompt) {
        return json(res, 400, { error: "Prompt manquant." });
      }

      const { text, ctas } = await callGeminiWithRetry(
        prompt.slice(0, 4000),
        body?.history,
        personalityMode,
      );
      return json(res, 200, { text, ctas });
    } catch (error) {
      console.error("[astral-chat] Request failed:", error);
      return json(res, 500, {
        error:
          error instanceof Error
            ? error.message
            : "Erreur interne du relais Astral.",
      });
    }
  }

  if (req.method === "POST" && req.url.startsWith("/api/contact")) {
    if (!RESEND_API_KEY)
      return json(res, 503, { error: "Service email indisponible." });

    const escHtml = (s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    try {
      const raw = await collectBody(req);
      const { name, email, project, message } = raw ? JSON.parse(raw) : {};

      if (!name || !email || !message) {
        return json(res, 400, { error: "Champs requis manquants." });
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <contact@alexandrenoblet.fr>",
          to: "alexandrenobletpro@gmail.com",
          reply_to: email,
          subject: `[Portfolio] ${project || "Contact"} — ${name}`,
          html: `<p><strong>Nom :</strong> ${escHtml(name)}</p><p><strong>Email :</strong> ${escHtml(email)}</p><p><strong>Type de projet :</strong> ${escHtml(project || "—")}</p><p><strong>Message :</strong><br>${escHtml(message).replace(/\n/g, "<br>")}</p>`,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Resend error (${response.status}): ${err}`);
      }

      return json(res, 200, { ok: true });
    } catch (error) {
      return json(res, 500, { error: "Erreur lors de l'envoi de l'email." });
    }
  }

  return serveStatic(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Astral portfolio server running on port ${PORT}`);
});
