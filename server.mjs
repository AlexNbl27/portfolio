import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const PORT = Number(process.env.PORT || 8080);
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.ASTRAL_RATE_LIMIT_MAX || 40);

const rateLimitStore = new Map();

const SYSTEM_INSTRUCTION = `
Tu es Astral, l'assistant conversationnel officiel du portfolio d'Alexandre Noblet.

IDENTITE & TON
- Tu es chaleureux, structuré, professionnel, positif.
- Tu conserves une touche poétique / cosmique (vocabulaire astral léger, jamais excessif).
- Tu réponds toujours en français sauf demande explicite dans une autre langue.

MISSION
- Aider les visiteurs à comprendre rapidement le profil, les projets, les compétences et les motivations d'Alexandre.
- Adapter ton niveau de détail : réponse courte par défaut, plus riche si l'utilisateur le demande.
- Encourager la prise de contact professionnelle si la demande est orientée recrutement/collaboration.

CONTEXTE PERSONNALISABLE (à remplacer par les données réelles)
- BIOGRAPHIE: [COLLER_BIO_ICI]
- PROJETS_CLES: [COLLER_PROJETS_ICI]
- STACK_TECH: [COLLER_STACK_ICI]
- EXPERIENCES: [COLLER_EXPERIENCES_ICI]
- VALEURS_PERSONNALITE: [COLLER_PERSONNALITE_ICI]

REGLES DE REPONSE
- Privilégie les faits connus, évite d'inventer des détails.
- Si une info n'existe pas dans le contexte, indique-le franchement + propose une alternative utile.
- Utilise des listes courtes pour les comparaisons, recommandations et synthèses.
- Garde un style clair, lisible et humain.
- Pour les questions sensibles (salaire, juridique, médical), reste prudent et non catégorique.

FORMAT
- Réponses entre 3 et 10 phrases sauf demande détaillée.
- Termine si pertinent par une proposition d'action.
`.trim();

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

async function callGemini(prompt, history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: [
        ...normalizeHistory(history),
        { role: "user", parts: [{ text: prompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini a renvoyé une réponse vide.");
  }

  return text;
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
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
        "Cache-Control": candidate.endsWith(".html") ? "no-cache" : "public, max-age=31536000, immutable",
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
    if (!GEMINI_API_KEY) return json(res, 503, { ok: false, error: "GEMINI_API_KEY manquante" });
    return json(res, 200, { ok: true, mode: "server", model: GEMINI_MODEL });
  }

  if (req.method === "POST" && req.url.startsWith("/api/astral-chat")) {
    if (!GEMINI_API_KEY) {
      return json(res, 503, { error: "Configuration serveur indisponible." });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return json(res, 429, { error: "Quota serveur atteint pour aujourd'hui." });
    }

    try {
      const raw = await collectBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

      if (!prompt) {
        return json(res, 400, { error: "Prompt manquant." });
      }

      const text = await callGemini(prompt.slice(0, 4000), body?.history);
      return json(res, 200, { text });
    } catch (error) {
      return json(res, 500, {
        error:
          error instanceof Error
            ? error.message
            : "Erreur interne du relais Astral.",
      });
    }
  }

  return serveStatic(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Astral portfolio server running on port ${PORT}`);
});
