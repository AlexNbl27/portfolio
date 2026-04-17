import type { Locale } from "./config";
import { uiDictionaries } from "./dictionaries/ui";

export function useTranslations(locale: Locale) {
  const dictionary = uiDictionaries[locale];
  return function t<TKey extends keyof typeof dictionary>(key: TKey) {
    return dictionary[key];
  };
}
