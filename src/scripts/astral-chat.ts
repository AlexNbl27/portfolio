const DAILY_LIMIT = 20;
const STORAGE_KEY = "astral-chat-quota";
const HISTORY_KEY = "astral-chat-history";
const MODE_KEY = "astral-chat-mode";
const MAX_CHARS = 800;

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^[-•]\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(?!<[pul])(.+)$/, "<p>$1</p>");
}

function initAstralChat() {
  document.querySelectorAll("[data-astral-chat-root]").forEach((root) => {
    if (root.getAttribute("data-init") === "true") return;
    root.setAttribute("data-init", "true");

    const isFloating = root.getAttribute("data-mode") === "floating";
    const trigger = root.querySelector(".astral-chat__trigger") as HTMLElement;
    const panel = root.querySelector(".astral-chat__panel") as HTMLElement;
    const closeBtn = root.querySelector(".astral-chat__close") as HTMLButtonElement;
    const form = root.querySelector(".astral-chat__composer") as HTMLFormElement;
    const messages = root.querySelector(".astral-chat__messages") as HTMLElement;
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    const overlay = root.querySelector(".astral-chat__overlay") as HTMLElement;
    const personalityInputs = root.querySelectorAll<HTMLInputElement>("[data-astral-personality]");
    const isEnglish = () => document.documentElement.lang === "en";
    const copy = {
      get thinking() { return isEnglish() ? "Astral is thinking..." : "Astral réfléchit..."; },
      get unavailable() { return isEnglish() ? "Astral cannot answer right now." : "Astral ne peut pas répondre pour le moment."; },
      get greetingAstro() { return isEnglish() ? "Hello, I'm Astral ✨ Astro mode enabled. Analytical and professional, I can help you review Alexandre's profile." : "Bonjour, je suis Astral ✨ Mode Astro activé. Analytique et professionnel, je vous aide à évaluer le profil d'Alexandre."; },
      get greetingSirius() { return isEnglish() ? "Hello, I'm Astral ✨ Sirius mode enabled. Focused on business and solutions, I can tell you what Alexandre can build for you." : "Bonjour, je suis Astral ✨ Mode Sirius activé. Orienté solutions et pragmatisme, je vous explique comment Alexandre peut vous aider."; },
      get greetingSaturn() { return isEnglish() ? "Hey, I'm Astral ✨ Saturn mode enabled. Friendly and direct, ask me anything about Alexandre's journey." : "Salut, je suis Astral ✨ Mode Saturn activé. Pote et direct, pose-moi tes questions sur le parcours d'Alexandre."; },
      get greetingNova() { return isEnglish() ? "Greetings, I'm Astral ✨ Nova mode enabled. Creative and philosophical, let's explore concepts together." : "Salutations, je suis Astral ✨ Mode Nova activé. Créatif et philosophique, explorons les concepts ensemble."; },
      get quotaReached() { return isEnglish() ? "Daily quota reached for this browser. Please come back tomorrow or contact Alexandre directly." : "Quota journalier atteint pour ce navigateur. Revenez demain ou contactez Alexandre directement."; },
      get genericError() { return isEnglish() ? "✦ The message was lost in space due to an error… Please try again in a few moments." : "✦ Le message s'est perdu dans l'espace suite à une erreur… Réessayez dans quelques instants."; },
    };

    const getCurrentMode = (): "astro" | "saturn" | "nova" | "sirius" => {
      const selectedInput = Array.from(personalityInputs).find((input) => input.checked);
      const selected = selectedInput?.value || sessionStorage.getItem(MODE_KEY) || "astro";
      if (selected === "saturn") return "saturn";
      if (selected === "nova") return "nova";
      if (selected === "sirius") return "sirius";
      return "astro";
    };

    const setCurrentMode = (mode: "astro" | "saturn" | "nova" | "sirius") => {
      sessionStorage.setItem(MODE_KEY, mode);
      personalityInputs.forEach((input) => {
        input.checked = input.value === mode;
      });
      // also set data-theme on root to style messages
      root.setAttribute("data-theme", mode);
    };

    const getGreeting = () => {
      const mode = getCurrentMode();
      if (mode === "saturn") return copy.greetingSaturn;
      if (mode === "nova") return copy.greetingNova;
      if (mode === "sirius") return copy.greetingSirius;
      return copy.greetingAstro;
    };

    const loadHistory = () => {
      try {
        const raw = sessionStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    };

    const saveHistory = () => {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    };

    const history: Array<{
      role: "user" | "model";
      parts: Array<{ text: string }>;
      _ctas?: Cta[];
    }> = loadHistory();

    const disableChat = () => {
      root.classList.remove("astral-chat--booting");
      root.classList.add("astral-chat--disabled");
    };

    const enableChat = () => {
      root.classList.remove("astral-chat--booting");
    };

    const appendMessage = (
      role: "assistant" | "user",
      text: string,
      isStreaming = false,
      skipAnim = false,
    ) => {
      const bubble = document.createElement("article");
      bubble.className = `astral-chat__bubble astral-chat__bubble--${role}`;
      if (!skipAnim) {
        bubble.style.animation = "bubble-fade 220ms ease-out";
      }

      if (isStreaming) {
        bubble.classList.add("is-streaming");
        bubble.innerHTML = `<span class="astral-chat__skeleton">${copy.thinking}</span>`;
      } else if (role === "assistant") {
        bubble.innerHTML = renderMarkdown(text);
      } else {
        bubble.textContent = text;
      }

      messages?.appendChild(bubble);
      if (isFloating) {
        messages?.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      return bubble;
    };

    const growTextarea = () => {
      if (!textarea) return;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    textarea?.addEventListener("input", growTextarea);

    textarea?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form?.requestSubmit();
      }
    });

    const typewriter = async (el: HTMLElement, fullText: string) => {
      el.textContent = "";
      const chars = Array.from(fullText);
      for (let i = 0; i < chars.length; i++) {
        el.textContent += chars[i];
        if (i % 3 === 0) {
          if (isFloating) {
            messages?.scrollTo({ top: messages.scrollHeight, behavior: "auto" });
          } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
          }
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
      el.innerHTML = renderMarkdown(fullText);
      el.classList.remove("is-streaming");
    };

    const getQuota = () => {
      const today = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const fresh = { date: today, count: 0 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        return fresh;
      }
      const data = JSON.parse(raw);
      if (data.date !== today) {
        const reset = { date: today, count: 0 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
        return reset;
      }
      return data;
    };

    const incrementQuota = () => {
      const quota = getQuota();
      quota.count += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quota));
    };

    const canSend = () => getQuota().count < DAILY_LIMIT;

    const canAccessQuotaStorage = () => {
      try {
        getQuota();
        return true;
      } catch {
        return false;
      }
    };

    type Cta = { label: string; href: string; type?: string };

    const CTA_ICONS: Record<string, string> = {
      linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
      github: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
      email: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
      external: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      page: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
      cv: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
      project: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      blog: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    };

    class FatalChatError extends Error {}

    const sendWithServerRoute = async (prompt: string): Promise<{ text: string; ctas: Cta[] }> => {
      const en = isEnglish();
      const personalityMode = getCurrentMode();
      const localizedPrompt = en
        ? `Please answer in English. User message: ${prompt}`
        : prompt;
      const response = await fetch("/api/astral-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: localizedPrompt, history, locale: en ? "en" : "fr", personalityMode }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = payload?.error || copy.unavailable;
        if (response.status === 503) throw new FatalChatError(message);
        throw new Error(message);
      }

      const data = await response.json();
      return { text: data.text ?? "", ctas: Array.isArray(data.ctas) ? data.ctas : [] };
    };

    const renderCtas = (ctas: Cta[]) => {
      if (!ctas.length) return;
      const container = document.createElement("div");
      container.className = "astral-chat__ctas";
      ctas.forEach(({ label, href, type }, i) => {
        const a = document.createElement("a");
        a.href = href;
        a.className = `astral-chat__cta-btn astral-chat__cta-btn--${type ?? "page"}`;
        a.style.animationDelay = `${i * 80}ms`;
        if (href.startsWith("http") || href.startsWith("mailto") || type === "cv") {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        const icon = CTA_ICONS[type ?? "page"] ?? CTA_ICONS.page;
        a.innerHTML = `${icon}<span>${label}</span>`;
        container.appendChild(a);
      });
      messages?.appendChild(container);
      if (isFloating) {
        messages?.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    };

    const bootHealthCheck = async () => {
      if (!canAccessQuotaStorage()) return false;
      try {
        const health = await fetch("/api/astral-chat/health", { method: "GET" });
        if (!health.ok) return false;
        const payload = await health.json();
        if (payload?.ok !== true) return false;
      } catch {
        return false;
      }
      return true;
    };

    bootHealthCheck().then((ok) => {
      if (!ok) { disableChat(); return; }
      enableChat();
    });

    const togglePanel = (show: boolean) => {
      if (!panel || !trigger) return;
      if (show) {
        panel.classList.remove("hidden");
        void panel.offsetWidth;
        panel.classList.add("is-active");

        if (isFloating) {
          trigger.style.transition = "transform 0.3s ease, opacity 0.3s ease";
          trigger.style.transform = "scale(0.5)";
          trigger.style.opacity = "0";
          trigger.style.pointerEvents = "none";
          overlay?.classList.remove("opacity-0", "pointer-events-none");
          overlay?.classList.add("pointer-events-auto", "opacity-100");
        }
        trigger.setAttribute("aria-expanded", "true");
        setTimeout(() => textarea?.focus(), 50);
      } else {
        panel.classList.add("hidden");
        panel.classList.remove("is-active");

        if (isFloating) {
          trigger.style.transform = "scale(1)";
          trigger.style.opacity = "1";
          trigger.style.pointerEvents = "auto";
          overlay?.classList.add("opacity-0", "pointer-events-none");
          overlay?.classList.remove("pointer-events-auto", "opacity-100");
        }
        trigger.setAttribute("aria-expanded", "false");
      }
    };

    if (isFloating) {
      trigger?.addEventListener("click", () => togglePanel(true));
      overlay?.addEventListener("click", () => togglePanel(false));

      // Global delegation to intercept ANY chat link clicks on Desktop
      const handleGlobalClick = (e: MouseEvent) => {
        if (!window.matchMedia("(min-width: 1024px)").matches) return;
        
        const link = (e.target as HTMLElement).closest("a");
        if (!link) return;

        // Use URL object to get a clean pathname regardless of host/trailing slash
        const url = new URL(link.href, window.location.origin);
        const path = url.pathname.replace(/\/$/, "");
        const isChatLink = path === "/chat" || path === "/en/chat" || path === "/fr/chat";
        const isFullscreen = link.classList.contains("astral-chat__fullscreen");

        if (isChatLink && !isFullscreen) {
          e.preventDefault();
          e.stopImmediatePropagation();
          togglePanel(true);
        }
      };

      document.addEventListener("click", handleGlobalClick, { capture: true });
    }

    closeBtn?.addEventListener("click", () => togglePanel(false));

    const clearBtn = root.querySelector(".astral-chat__clear") as HTMLButtonElement;
    const resetConversation = () => {
      sessionStorage.removeItem(HISTORY_KEY);
      history.length = 0;
      if (messages) messages.innerHTML = "";
      appendMessage(
        "assistant",
        getGreeting(),
        false,
        false,
      );
    };
    clearBtn?.addEventListener("click", resetConversation);

    if (personalityInputs.length > 0) {
      setCurrentMode(getCurrentMode());
      personalityInputs.forEach((input) => {
        input.addEventListener("change", () => {
          const val = input.value;
          const nextMode = val === "saturn" ? "saturn" : val === "nova" ? "nova" : val === "sirius" ? "sirius" : "astro";
          setCurrentMode(nextMode);
          resetConversation();
        });
      });
    }

    document.addEventListener("astro:before-preparation", () => {
      if (panel && !panel.classList.contains("hidden")) togglePanel(false);
    });

    if (history.length > 0) {
      history.forEach((item) => {
        appendMessage(
          item.role === "model" ? "assistant" : "user",
          item.parts[0].text,
          false,
          true,
        );
        if (item.role === "model" && item._ctas?.length) {
          renderCtas(item._ctas);
        }
      });
    } else if (messages && !messages.hasChildNodes()) {
      appendMessage(
        "assistant",
        getGreeting(),
        false,
        true,
      );
    }

    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const prompt = textarea?.value?.trim();
      if (!prompt) return;

      if (!canSend()) {
        appendMessage(
          "assistant",
          copy.quotaReached,
        );
        return;
      }

      appendMessage("user", prompt);
      history.push({ role: "user", parts: [{ text: prompt }] });
      saveHistory();
      if (textarea) textarea.value = "";

      const streamingBubble = appendMessage("assistant", "", true);
      if (!streamingBubble) return;

      try {
        const { text, ctas } = await sendWithServerRoute(prompt);
        history.push({ role: "model", parts: [{ text }], _ctas: ctas });
        saveHistory();
        incrementQuota();
        await typewriter(streamingBubble, text);
        renderCtas(ctas);
      } catch (error) {
        if (error instanceof FatalChatError) disableChat();
        streamingBubble.classList.remove("is-streaming");
        streamingBubble.classList.add("astral-chat__bubble--error");
        streamingBubble.textContent = copy.genericError;
      }
    });
  });
}

document.addEventListener("astro:page-load", initAstralChat);
