import type { Locale } from "../config";
import frData from "../../data/soft-skills.json";

type SoftSkillsData = typeof frData;

const enData: SoftSkillsData = {
  ...frData,
  page: {
    title: "Alexandre Noblet | Soft skills",
    description: "Soft skills and human strengths of Alexandre Noblet.",
    heading: "My soft skills",
    intro:
      "Beyond technical expertise, I rely on organization, autonomy, creativity, and teamwork to move projects forward efficiently.",
  },
  planets: [
    {
      ...frData.planets[0],
      label: "Organization",
      movieRef: "The Martian",
      example:
        "Planning IoT projects with sprint cycles, weekly roadmaps, and progress tracking through Kanban boards.",
    },
    {
      ...frData.planets[1],
      label: "Creativity",
      example:
        "Writing long-form science-fiction movie scripts to train narrative and concept framing.",
    },
    {
      ...frData.planets[2],
      label: "Autonomy",
      movieRef: "Valerian",
      example:
        "Building a complete IoT monitoring system solo, from architecture decisions to production rollout.",
    },
    {
      ...frData.planets[3],
      label: "Team spirit",
      movieRef: "The Fifth Element",
      example:
        "Facilitating retrospectives and knowledge-sharing sessions inside cross-functional agile teams.",
    },
    {
      ...frData.planets[4],
      label: "Communication",
      movieRef: "Guardians of the Galaxy",
      example:
        "Presenting product demos to non-technical stakeholders and writing clear documentation for multidisciplinary teams.",
    },
    {
      ...frData.planets[5],
      label: "Curiosity",
      example:
        "Weekly technology watch and exploration across AI, embedded systems, and UX design.",
    },
  ],
  reperes: [
    { label: "Adaptability", value: "Very high" },
    { label: "Collaboration", value: "Daily" },
    { label: "Initiative", value: "Natural" },
  ],
  contact: {
    ...frData.contact,
    title: "Discuss a project",
    description: "Always happy to discuss product, software engineering, and IoT.",
    buttonText: "Contact me",
  },
};

const softSkillsByLocale: Record<Locale, SoftSkillsData> = {
  fr: frData,
  en: enData,
};

export function getSoftSkillsData(locale: Locale): SoftSkillsData {
  return softSkillsByLocale[locale] ?? softSkillsByLocale.fr;
}
