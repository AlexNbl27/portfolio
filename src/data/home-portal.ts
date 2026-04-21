import type { Locale } from "../i18n/config";
import { localizePath } from "../i18n/utils";
import blogs, { sortBlogsByRecentPostDesc } from "./blogs";
import { getRecentPersonalProjects } from "../i18n/data/projects";

export type HomePortalTab = {
  id: string;
  label: string;
  items: Array<{ title: string; description: string; href: string }>;
  viewAllLabel: string;
  viewAllHref: string;
};

const getProjectItems = (locale: Locale) =>
  getRecentPersonalProjects(locale)
    .slice(0, 2)
    .map((project) => ({
      title: project.title,
      description: project.description,
      href: localizePath(project.detailPage ?? "/projects", locale),
    }));

const getContentItems = (locale: Locale) => {
  const isEn = locale === "en";
  const recentBlogs = sortBlogsByRecentPostDesc(blogs).slice(0, 2);
  const blogItems = recentBlogs.map((blog) => ({
    title: blog.title,
    description: blog.summary,
    href: localizePath(`/blogs/${blog.slug}`, locale),
  }));

  return [
    ...blogItems,
    {
      title: isEn ? "AI chat" : "Chat IA",
      description: isEn
        ? "Use Astral to navigate pages faster and get context-aware answers."
        : "Utilisez Astral pour naviguer plus vite et obtenir des réponses contextualisées.",
      href: localizePath("/chat", locale),
    },
  ].slice(0, 2);
};

export const getHomePortalTabs = (locale: Locale): HomePortalTab[] => {
  const isEn = locale === "en";

  return [
    {
      id: "projects",
      label: isEn ? "Projects" : "Projets",
      items: getProjectItems(locale),
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
      id: "content",
      label: isEn ? "Content" : "Contenus",
      items: getContentItems(locale),
      viewAllLabel: isEn ? "Open resources" : "Ouvrir les ressources",
      viewAllHref: localizePath("/blogs", locale),
    },
  ];
};
