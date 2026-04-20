import type { Locale } from "../i18n/config";

export type ServicePack = {
  name: string;
  subtitle: string;
  priceHint: string;
  deliverables: string[];
  idealFor: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export const getServicePacks = (locale: Locale): ServicePack[] => {
  const isEn = locale === "en";
  return [
    {
      name: "Starter Sprint",
      subtitle: isEn ? "Landing page + clear conversion path" : "Landing page + parcours de conversion clair",
      priceHint: isEn ? "from 5 days" : "à partir de 5 jours",
      deliverables: isEn
        ? ["UX-focused page structure", "Astro implementation", "SEO + performance baseline"]
        : ["Structure de page orientée UX", "Implémentation Astro", "Base SEO + performance"],
      idealFor: isEn ? "Founders who need a fast and credible web presence." : "Fondateurs qui veulent une présence web crédible rapidement.",
    },
    {
      name: "Growth Build",
      subtitle: isEn ? "Multi-page website with CMS/API integration" : "Site multi-pages avec intégration CMS/API",
      priceHint: isEn ? "from 2 weeks" : "à partir de 2 semaines",
      deliverables: isEn
        ? ["Design system light", "Content workflows", "Analytics and conversion tracking"]
        : ["Design system léger", "Workflows de contenu", "Analytics et suivi conversion"],
      idealFor: isEn ? "Teams that need robust delivery and scalability." : "Équipes qui veulent un delivery robuste et scalable.",
    },
    {
      name: isEn ? "Custom Product" : "Produit sur mesure",
      subtitle: isEn ? "Web/mobile + automation + AI integrations" : "Web/mobile + automatisation + intégrations IA",
      priceHint: isEn ? "scope-based" : "sur cadrage",
      deliverables: isEn
        ? ["Technical scoping", "Fullstack implementation", "Runbook + handover"]
        : ["Cadrage technique", "Implémentation fullstack", "Runbook + passation"],
      idealFor: isEn ? "Complex projects with business and technical constraints." : "Projets complexes avec contraintes métier et techniques.",
    },
  ];
};

export const getProcessSteps = (locale: Locale): ProcessStep[] => {
  const isEn = locale === "en";
  return [
    {
      title: isEn ? "Discovery" : "Découverte",
      description: isEn
        ? "Clarify goals, constraints, and success metrics."
        : "Clarifier objectifs, contraintes et métriques de succès.",
    },
    {
      title: isEn ? "Mockup" : "Maquette",
      description: isEn
        ? "Validate UX flows and information architecture before coding."
        : "Valider les parcours UX et l'architecture d'information avant le code.",
    },
    {
      title: isEn ? "Development" : "Développement",
      description: isEn
        ? "Iterative implementation with weekly demos and adjustments."
        : "Implémentation itérative avec démos hebdomadaires et ajustements.",
    },
    {
      title: isEn ? "Delivery" : "Livraison",
      description: isEn
        ? "Production release, documentation, and autonomy transfer."
        : "Mise en production, documentation et transfert d'autonomie.",
    },
  ];
};
