import type { Locale } from "../i18n/config";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

const testimonials: Record<Locale, Testimonial[]> = {
  fr: [
    {
      quote:
        "Alexandre comprend vite les enjeux métier et transforme des besoins flous en livrables concrets.",
      author: "Manager IoT",
      role: "Responsable projet",
      company: "Orange Business",
      sourceLabel: "Recommandation LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
    {
      quote:
        "Fiable, proactif et structuré : il sait autant prototyper vite que stabiliser une solution en production.",
      author: "Lead technique",
      role: "Encadrant",
      sourceLabel: "Voir le profil",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
    {
      quote:
        "Un profil hybride rare web + IoT + produit, avec un vrai sens de la collaboration.",
      author: "Partenaire projet",
      role: "Chef de produit",
      sourceLabel: "LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
  ],
  en: [
    {
      quote:
        "Alexandre quickly understands business constraints and turns fuzzy requests into concrete deliverables.",
      author: "IoT Manager",
      role: "Project lead",
      company: "Orange Business",
      sourceLabel: "LinkedIn recommendation",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
    {
      quote:
        "Reliable, proactive, and structured — he can both prototype fast and harden production-grade solutions.",
      author: "Tech lead",
      role: "Mentor",
      sourceLabel: "See profile",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
    {
      quote:
        "A rare hybrid profile combining web, IoT, and product mindset with strong team collaboration.",
      author: "Project partner",
      role: "Product manager",
      sourceLabel: "LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/alexnbl27",
    },
  ],
};

export const getTestimonials = (locale: Locale) => testimonials[locale] ?? testimonials.fr;
