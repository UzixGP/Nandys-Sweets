import type { Localized, Pastel } from "./types";

export type Category = {
  id: string;
  name: Localized;
  bg: Pastel;
};

/** Display order of the menu sections. Categories without products are hidden automatically. */
export const categories: Category[] = [
  { id: "custom-cakes", name: { es: "Pasteles Personalizados", en: "Custom Cakes" }, bg: "pink" },
  { id: "chocoflan", name: { es: "Chocoflan", en: "Chocoflan" }, bg: "yellow" },
  { id: "mosaico", name: { es: "Mosaico de Gelatina", en: "Gelatin Mosaic" }, bg: "blue" },
  { id: "other-desserts", name: { es: "Otros Postres", en: "Other Desserts" }, bg: "lavender" },
  { id: "seasonal", name: { es: "De Temporada", en: "Seasonal" }, bg: "pink" },
];
