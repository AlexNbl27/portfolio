import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [, maybeLocale] = pathname.split("/");
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const parts = cleanPath.split("/");
  if (parts[1] && isLocale(parts[1])) {
    const next = `/${parts.slice(2).join("/")}`;
    return next === "/" ? "/" : next.replace(/\/$/, "") || "/";
  }
  return cleanPath || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);
  if (locale === DEFAULT_LOCALE) return basePath;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}
