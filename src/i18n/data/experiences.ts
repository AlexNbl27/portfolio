import type { Locale } from "../config";
import type { ExperienceItem } from "./types";
import frExperiences from "../../data/experience.json";

const experiencesByLocale: Record<Locale, ExperienceItem[]> = {
  fr: frExperiences as ExperienceItem[],
  en: [
    {
      ...(frExperiences[0] as ExperienceItem),
      role: "Fullstack developer and integrator",
      period: "2024 - Present",
      description:
        "At Orange Business Services, I work on critical Industry 4.0 and IoT projects. In a context where AI is reshaping the field, I focus on functional delivery: translating business challenges into clear technical specifications.",
      achievements: [
        "Led PlanetTogether integration for production planning and scheduling.",
        "Supported customers through integration and discovery workshops.",
        "Became mobile technical referent for the IoT ecosystem.",
      ],
    },
    {
      ...(frExperiences[1] as ExperienceItem),
      role: "IoT integrator and mobile developer",
      period: "Jul 2024 - Aug 2024",
      description:
        "6-week intensive internship focused on an inventory mobile solution to optimize stock workflows with Flutter.",
      achievements: [
        "Completed and deployed Flutter mobile features for the Live Tag project.",
        "Designed a Python API and orchestrated containers on Red Hat OpenShift through CI/CD.",
      ],
    },
    {
      ...(frExperiences[2] as ExperienceItem),
      role: "Industrial automation engineer (design office)",
      period: "Spring 2023",
      description:
        "Immersion in a constrained industrial environment to design a 4.0 monitoring and automation system for a sensitive nuclear installation.",
      achievements: [
        "Designed an IoT monitoring architecture for critical infrastructure.",
        "Validated technical work with a 16/20 academic evaluation.",
      ],
    },
    {
      ...(frExperiences[3] as ExperienceItem),
      role: "Computer science student",
      period: "2023 - 2026",
      description:
        "After a DUT in Electrical Engineering and Industrial IT, I specialized in software engineering to strengthen web, mobile, and fullstack product skills.",
      achievements: [
        "Delivered multiple team and personal projects with a product mindset.",
        "Deepened expertise in software development, UX, and collaboration tooling.",
      ],
    },
    {
      ...(frExperiences[4] as ExperienceItem),
      role: "DUT GEII graduated",
      period: "2021 - 2023",
      description:
        "Training in Electrical Engineering and Industrial Computing, which provided strong foundations in automation, programming, and industrial systems.",
      achievements: [
        "Graduated with DUT GEII (2-year degree).",
        "Built a hybrid profile across software and automation.",
      ],
    },
  ],
};

export function getExperiences(locale: Locale): ExperienceItem[] {
  return experiencesByLocale[locale] ?? experiencesByLocale.fr;
}
