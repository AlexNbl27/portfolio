import type { Locale } from "../config";
import frData from "../../data/soft-skills.json";

type SoftSkillsData = typeof frData;

const enData: SoftSkillsData = {
  ...frData,
  page: {
    title: "Alexandre Noblet | Soft skills",
    description: "Soft skills and human strengths of Alexandre Noblet.",
    intro:
      "Beyond technical expertise, I rely on organization, autonomy, creativity, and teamwork to move projects forward efficiently.",
  },
  planets: [
    {
      ...frData.planets[0],
      label: "Organization",
      movieRef: "The Martian",
      example:
        "I like creating a clear framework so everyone can move forward with confidence: readable sprints, a shared roadmap, and simple progress tracking over time.",
    },
    {
      ...frData.planets[1],
      label: "Creativity",
      example:
        "I keep creativity alive by writing science-fiction stories, which is a great playground for connecting ideas, imagining new worlds, and opening fresh directions.",
    },
    {
      ...frData.planets[2],
      label: "Autonomy",
      movieRef: "Valerian",
      example:
        "When a topic needs momentum, I can take ownership from the first idea to a clean, useful production release.",
    },
    {
      ...frData.planets[3],
      label: "Team spirit",
      movieRef: "The Fifth Element",
      example:
        "I genuinely enjoy creating momentum inside a team, whether through retrospectives, knowledge sharing, or simply helping everyone move forward together.",
    },
    {
      ...frData.planets[4],
      label: "Communication",
      movieRef: "Guardians of the Galaxy",
      example:
        "I like making things easy to understand, with clear demos, simple conversations, and documentation that genuinely helps both technical and non-technical people.",
    },
    {
      ...frData.planets[5],
      label: "Curiosity",
      example:
        "I stay actively curious through regular tech exploration and a real appetite for discovering fields ranging from AI to embedded systems and UX design.",
    },
  ],
  reperes: [
    { label: "Adaptability", value: "Very high" },
    { label: "Collaboration", value: "Daily" },
    { label: "Initiative", value: "Natural" },
  ],
};

const softSkillsByLocale: Record<Locale, SoftSkillsData> = {
  fr: frData,
  en: enData,
};

export function getSoftSkillsData(locale: Locale): SoftSkillsData {
  return softSkillsByLocale[locale] ?? softSkillsByLocale.fr;
}
