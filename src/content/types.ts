import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type Pastel = "pink" | "blue" | "yellow" | "lavender";

/** Tile background per pastel, used by product cards and category circles. */
export const pastelBg: Record<Pastel, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  yellow: "bg-yellow",
  lavender: "bg-lavender",
};
