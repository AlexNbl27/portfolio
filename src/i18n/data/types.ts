export type ProjectCategory = "saas" | "web" | "mobile" | "desktop";

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
}
