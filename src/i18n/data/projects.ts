import type { Locale } from "../config";
import type { ProjectItem } from "./types";
import frProjects from "../../data/projects.json";

const projectsByLocale: Record<Locale, ProjectItem[]> = {
  fr: frProjects as ProjectItem[],
  en: [
    {
      ...(frProjects[0] as ProjectItem),
      description:
        "Production e-commerce website on bevel.fr — Stripe checkout, stock management, PDF invoices, and bilingual FR/EN interface.",
      details:
        "Bevel is a fullstack e-commerce website designed for in-store sales. The stack combines Astro 5 (SSR on Cloudflare Pages) with a Strapi 5 + PostgreSQL backend hosted on a Docker VPS.",
    },
    {
      ...(frProjects[1] as ProjectItem),
      description:
        "ERP + mobile suite that automates student association management and frees teams to focus on campus life.",
      details:
        "AZYGO simplifies operations like ticketing, memberships, and accounting. It combines a robust Laravel/Vue ERP with a Flutter mobile app for daily use.",
    },
    {
      ...(frProjects[2] as ProjectItem),
      description:
        "A community fund solution focused on fairness and transparency.",
      details:
        "Born as an academic project at Ynov, Kaniot rethinks group contributions. Each participant sets a real limit and the algorithm computes the fairest split to reach the goal without overpayment.",
    },
    {
      ...(frProjects[3] as ProjectItem),
      description:
        "Innovative desktop interface that recommends content based on the user's emotional state.",
      details:
        "Built with C# / XAML (WPF), Moodvie maps selected moods to relevant movie and series recommendations, exploring emotion-aware UX in entertainment.",
    },
  ],
};

export function getProjects(locale: Locale): ProjectItem[] {
  return projectsByLocale[locale] ?? projectsByLocale.fr;
}
