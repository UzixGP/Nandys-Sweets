export const locales = ["es", "en"] as const;
export const defaultLocale = "es";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Builds a path inside the given locale, e.g. localePath("es", "/menu") -> "/es/menu". */
export const localePath = (lang: Locale, path = "") => `/${lang}${path}`;

/** Fills {placeholders} in a dictionary string. */
export const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
