import type { Locale } from "../i18n/config";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  long?: boolean;
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
    {
      quote:
        "Dans le cadre de son apprentissage, au sein d'une équipe spécialisée dans l'IoT, Alexandre a su prendre sa place et s'est montré suffisamment audacieux pour prendre, en sus de ses sujets cœur, d'autres problématiques, plus complexes, en lien avec l'optimisation de la production.\n\nIl nous démontre tous les jours que ses qualités humaines, sa capacité d'analyse et sa curiosité technique sont trois forces qui lui permettent de trouver des solutions adaptées à des besoins client complexes.\n\nAinsi, il fait maintenant parti de nos référents dans le domaine de la RFID et de l'intégration de la planification intelligente chez des clients industriels clef. Pour ce second sujet, il est, à la fois, capable de comprendre l'approche fonctionnelle, les contraintes métiers, les leviers à utiliser dans l'outils ad hoc, et les exigences d'un projet d'intégration IT/OT.\n\nPour ne rien gâcher, il est très agréable de travailler avec Alexandre car il est force de propositions techniques, adaptable et témoigne du même respect à tous ses interlocuteurs.\n\nIl apporte à l'équipe son sérieux et sa bonne compagnie.",
      author: "Cécile Déléry",
      role: "Manager - chaîne d'approvisionnement et des flux d'information",
      company: "Orange Business",
      sourceLabel: "Profil LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/c%C3%A9cile-d%C3%A9l%C3%A9ry-88101b42/",
      long: true,
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
    {
      quote:
        "Throughout his apprenticeship, within a team specializing in IoT, Alexandre found his place and showed enough initiative to take on — beyond his core topics — more complex challenges related to production optimization.\n\nEvery day, he demonstrates that his interpersonal skills, analytical mindset, and technical curiosity are three strengths that allow him to find solutions tailored to complex client needs.\n\nHe has now become one of our key references in RFID and intelligent scheduling integration for key industrial clients. On the latter topic, he is equally capable of understanding the functional approach, business constraints, the levers available in the relevant tool, and the requirements of an IT/OT integration project.\n\nOn top of that, Alexandre is a genuine pleasure to work with: he proactively brings technical proposals, adapts easily, and treats every stakeholder with the same respect.\n\nHe brings the team both his commitment and his great company.",
      author: "Cécile Déléry",
      role: "Manager - supply chain and information flows",
      company: "Orange Business",
      sourceLabel: "LinkedIn profile",
      sourceUrl: "https://www.linkedin.com/in/c%C3%A9cile-d%C3%A9l%C3%A9ry-88101b42/",
      long: true,
    },
  ],
};

export const getTestimonials = (locale: Locale) => testimonials[locale] ?? testimonials.fr;
export const getShortTestimonials = (locale: Locale) => getTestimonials(locale).filter((t) => !t.long);
export const getLongTestimonials = (locale: Locale) => getTestimonials(locale).filter((t) => t.long);
