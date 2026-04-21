import type { Locale } from "../i18n/config";

export const getContactCopy = (locale: Locale) => {
  const isEn = locale === "en";
  return {
    title: isEn ? "Contact" : "Contact",
    subtitle: isEn
      ? "Tell me about your project and book a slot directly if useful."
      : "Parlez-moi de votre projet et réservez un créneau directement si besoin.",
    heroCards: [
      {
        label: isEn ? "Response rhythm" : "Rythme de réponse",
        value: isEn ? "Under 48h opening hours" : "Sous 48h ouvrés",
      },
      {
        label: isEn ? "Formats" : "Formats",
        value: isEn ? "Mail, visio, async" : "Mail, visio, asynchrone",
      },
      {
        label: isEn ? "First step" : "Premier pas",
        value: isEn ? "Project scoping" : "Cadrage du projet",
      },
    ],
    formTitle: isEn ? "Get in touch" : "Contactez-moi",
    formIntro: isEn
      ? "A quick brief helps me understand your needs before we speak."
      : "Quelques informations suffisent pour me donner le bon contexte avant d'échanger.",
    formPoints: isEn
      ? [
        "Scope, redesign, new feature or technical support",
        "Context, timing and expected outcome"
      ]
      : [
        "Cadrage, refonte, nouvelle fonctionnalité ou renfort technique",
        "Contexte, timing et résultat attendu"
      ],
    submit: isEn ? "Send request" : "Envoyer la demande",
    bookingTitle: isEn ? "Book a call" : "Réserver un échange",
    bookingIntro: isEn
      ? "If a live discussion is easier, pick a slot and we can turn your brief into a concrete next step."
      : "Si un échange en direct est plus simple, choisissez un créneau et nous transformerons votre brief en prochaine étape concrète.",
    emailTitle: "Email",
    emailIntro: isEn
      ? "Prefer a direct message?"
      : "Vous préférez un message direct ?",
    emailMeta: isEn ? "For direct messages or project documents." : "Pour un message direct ou des documents projet.",
  };
};
