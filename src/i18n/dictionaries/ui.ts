import type { Locale } from "../config";

type UiDictionary = {
  projects: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
    noResultsTitle: string;
    noResultsDescription: string;
  };
  footer: {
    localeLabel: string;
    copyright: string;
  };
};

export const uiDictionaries: Record<Locale, UiDictionary> = {
  fr: {
    projects: {
      title: "Mes projets",
      subtitle:
        "Une sélection de projets réalisés en formation, en stage ou sur mon temps personnel, avec un intérêt constant pour les produits utiles, concrets et bien pensés.",
    },
    experience: {
      title: "Mon parcours",
      subtitle:
        "De la formation GEII à l’informatique, puis à l’IoT en entreprise : un parcours construit entre technique, terrain et développement produit.",
      noResultsTitle: "Il semble que ce chemin n'existe pas encore... 🛸",
      noResultsDescription: "Aucun parcours trouvé pour cette recherche.",
    },
    footer: {
      localeLabel: "Langue",
      copyright: "© 2023-2026 Alexandre Noblet — portfolio personnel.",
    },
  },
  en: {
    projects: {
      title: "My projects",
      subtitle:
        "A selection of projects built during studies, internships, or personal time, with a constant focus on useful and well-crafted products.",
    },
    experience: {
      title: "My journey",
      subtitle:
        "From GEII studies to software engineering and IoT in enterprise contexts: a path shaped by delivery, product thinking, and technical depth.",
      noResultsTitle: "Looks like this path does not exist yet... 🛸",
      noResultsDescription: "No experience matched this search.",
    },
    footer: {
      localeLabel: "Language",
      copyright: "© 2023-2026 Alexandre Noblet — personal portfolio.",
    },
  },
};
