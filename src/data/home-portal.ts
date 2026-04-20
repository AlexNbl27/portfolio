import type { Locale } from "../i18n/config";
import { localizePath } from "../i18n/utils";

export type HomePortalTab = {
  id: string;
  label: string;
  items: Array<{ title: string; description: string; href: string }>;
  viewAllLabel: string;
  viewAllHref: string;
};

export const getHomePortalTabs = (locale: Locale): HomePortalTab[] => {
  const isEn = locale === "en";

  return [
    {
      id: "projects",
      label: isEn ? "Projects" : "Projets",
      items: [
        {
          title: "Bevel",
          description: isEn
            ? "Production e-commerce platform with Stripe checkout and bilingual storefront."
            : "Plateforme e-commerce en production avec checkout Stripe et vitrine bilingue.",
          href: localizePath("/projects/bevel", locale),
        },
        {
          title: "Azygo",
          description: isEn
            ? "ERP + mobile suite built to automate student association operations."
            : "Suite ERP + mobile conçue pour automatiser la gestion associative étudiante.",
          href: localizePath("/projects/azygo", locale),
        },
      ],
      viewAllLabel: isEn ? "Browse all projects" : "Voir tous les projets",
      viewAllHref: localizePath("/projects", locale),
    },
    {
      id: "expertise",
      label: isEn ? "Expertise" : "Expertise",
      items: [
        {
          title: isEn ? "Technical skills" : "Compétences techniques",
          description: isEn
            ? "A complete stack from web/mobile product development to industrial IoT."
            : "Un stack complet du produit web/mobile jusqu'à l'IoT industriel.",
          href: localizePath("/skills", locale),
        },
        {
          title: isEn ? "Soft skills" : "Soft skills",
          description: isEn
            ? "Communication, autonomy, and product-oriented execution mindset."
            : "Communication, autonomie et posture orientée exécution produit.",
          href: localizePath("/soft-skills", locale),
        },
      ],
      viewAllLabel: isEn ? "Explore expertise" : "Explorer l'expertise",
      viewAllHref: localizePath("/expertise", locale),
    },
    {
      id: "journey",
      label: isEn ? "Journey" : "Parcours",
      items: [
        {
          title: "Orange Business Services",
          description: isEn
            ? "Apprenticeship focused on Industry 4.0 projects and mobile IoT delivery."
            : "Alternance orientée projets Industrie 4.0 et delivery mobile IoT.",
          href: localizePath("/experience", locale),
        },
        {
          title: "Recruiter flow",
          description: isEn
            ? "A dedicated 60-second flow for recruiters and hiring managers."
            : "Un parcours dédié de 60 secondes pour recruteurs et hiring managers.",
          href: localizePath("/recruiter", locale),
        },
      ],
      viewAllLabel: isEn ? "See full journey" : "Voir le parcours complet",
      viewAllHref: localizePath("/experience", locale),
    },
    {
      id: "content",
      label: isEn ? "Content" : "Contenus",
      items: [
        {
          title: isEn ? "Blog notes" : "Notes de blog",
          description: isEn
            ? "Field notes and feedback loops from internships and apprenticeship."
            : "Notes terrain et retours d'expérience de stage et d'alternance.",
          href: localizePath("/blogs", locale),
        },
        {
          title: isEn ? "AI chat" : "Chat IA",
          description: isEn
            ? "Use Astral to navigate pages faster and get context-aware answers."
            : "Utilisez Astral pour naviguer plus vite et obtenir des réponses contextualisées.",
          href: localizePath("/chat", locale),
        },
      ],
      viewAllLabel: isEn ? "Open resources" : "Ouvrir les ressources",
      viewAllHref: localizePath("/blogs", locale),
    },
  ];
};
