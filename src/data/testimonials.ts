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
        "Alexandre sait adapter son discours à son interlocuteur, comprendre et clarifier son besoin et proposer rapidement une solution efficace et adaptée.",
      author: "Charles Linsolas",
      role: "Chef de projet",
      company: "Orange Business",
      sourceLabel: "Profil LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/charles-linsolas/",
    },
    {
      quote:
        "Ambassadeur de choix pour représenter l'apprentissage chez Orange Business. Quand les compétences techniques rejoignent les qualités humaines. Merci Alexandre ! You rock !",
      author: "Cécile Déléry",
      role: "Manager - chaîne d'approvisionnement et des flux d'information",
      company: "Orange Business",
      sourceLabel: "Profil LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/c%C3%A9cile-d%C3%A9l%C3%A9ry-88101b42/",
    },
  ],
  en: [
    {
      quote:
        "Alexandre knows how to adapt his speech to his interlocutor, understand and clarify their needs, and quickly propose an effective and appropriate solution.",
      author: "Charles Linsolas",
      role: "Project Manager",
      company: "Orange Business",
      sourceLabel: "LinkedIn profile",
      sourceUrl: "https://www.linkedin.com/in/charles-linsolas/",
    },
    {
      quote:
        "Reliable, proactive, and structured — he can both prototype fast and harden production-grade solutions.",
      author: "Cécile Déléry",
      role: "Manager - supply chain and information flows",
      company: "Orange Business",
      sourceLabel: "LinkedIn profile",
      sourceUrl: "https://www.linkedin.com/in/c%C3%A9cile-d%C3%A9l%C3%A9ry-88101b42/",
    },
  ],
};

export const getTestimonials = (locale: Locale) => testimonials[locale] ?? testimonials.fr;
