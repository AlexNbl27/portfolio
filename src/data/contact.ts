import type { Locale } from "../i18n/config";

export const getContactCopy = (locale: Locale) => {
  const isEn = locale === "en";
  return {
    title: isEn ? "Contact" : "Contact",
    subtitle: isEn
      ? "Tell me about your project and book a slot directly if useful."
      : "Parlez-moi de votre projet et réservez un créneau directement si besoin.",
    submit: isEn ? "Send request" : "Envoyer la demande",
    bookingTitle: isEn ? "Book a call" : "Réserver un échange",
  };
};
