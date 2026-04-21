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
      name: isEn ? "Showcase Website" : "Site vitrine",
      subtitle: isEn
        ? "A clear, fast website to present your business and turn visitors into contacts."
        : "Un site clair et rapide pour présenter votre activité et transformer les visites en prises de contact.",
      priceHint: isEn ? "from 1 week" : "à partir de 1 semaine",
      deliverables: isEn
        ? ["Multi-page responsive website", "Clear structure, contact flow, and key sections", "SEO, performance, and production deployment"]
        : ["Site responsive multi-pages", "Structure claire, sections clés et parcours de contact", "SEO, performance et mise en ligne"],
      idealFor: isEn
        ? "Small businesses, freelancers, associations, or startups that need a credible online presence."
        : "Indépendants, petites structures, associations ou startups qui ont besoin d'une présence en ligne crédible.",
    },
    {
      name: isEn ? "Simple E-commerce" : "E-commerce simple",
      subtitle: isEn
        ? "A streamlined online store with product pages, cart, checkout, and essential management."
        : "Une boutique en ligne simple avec fiches produit, panier, paiement et gestion de base.",
      priceHint: isEn ? "from 3 weeks" : "à partir de 3 semaines",
      deliverables: isEn
        ? ["Catalog, product pages, cart, and secure checkout", "Stripe integration, transactional emails, and key user flows", "Simple back office for products, orders, or stock"]
        : ["Catalogue, fiches produit, panier et paiement sécurisé", "Intégration Stripe, emails transactionnels et parcours d'achat", "Back-office simple pour produits, commandes ou stock"],
      idealFor: isEn
        ? "Brands that want to start selling online without building a heavy custom commerce stack."
        : "Marques qui veulent commencer à vendre en ligne sans lancer une usine à gaz.",
    },
    {
      name: isEn ? "Custom Product" : "Produit sur mesure",
      subtitle: isEn
        ? "A business-oriented web, mobile, or internal tool built around your real workflow."
        : "Un outil web, mobile ou métier pensé autour de votre vrai besoin et de vos contraintes.",
      priceHint: isEn ? "scope-based" : "sur cadrage",
      deliverables: isEn
        ? ["Functional and technical scoping", "Fullstack development, API, automation, or mobile app", "Iterative delivery, deployment, and handover"]
        : ["Cadrage fonctionnel et technique", "Développement fullstack, API, automatisation ou application mobile", "Livraison itérative, déploiement et passation"],
      idealFor: isEn
        ? "Teams with a specific process, internal tool, SaaS idea, or product that does not fit into a standard template."
        : "Équipes qui ont un process spécifique, un outil interne, une idée de SaaS ou un besoin qui ne rentre pas dans un template classique.",
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
      title: isEn ? "Scoping" : "Cadrage",
      description: isEn
        ? "Align on content, available designs, technical choices, and the first useful milestone before development."
        : "Aligner le contenu, les maquettes disponibles, les choix techniques et le premier jalon utile avant le développement.",
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
