export type ProjectCategory = "saas" | "web" | "mobile" | "desktop" | "integration";

export interface ProjectItem {
  title: string;
  description: string;
  details: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  detailPage?: string;
  category: ProjectCategory;
  recruiterFeatured: boolean;
  inProduction?: boolean;
  company?: string;
  year?: number;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: "pro" | "formation";
  recruiterVisible: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  blogSlug?: string;
}
