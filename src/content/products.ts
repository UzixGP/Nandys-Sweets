import { categories } from "./categories";
import type { Localized, Pastel } from "./types";

export type Product = {
  slug: string;
  category: string;
  name: Localized;
  description: Localized;
  /** Photo folder under public/images/products/. Its first photo is the card cover and all of them appear in the gallery. */
  album?: string;
  /** Only prices Nandy has confirmed, e.g. "$35". Leave null to show "price on request". */
  price: string | null;
  featured?: boolean;
  bg: Pastel;
  /** "whatsapp" asks about the product in chat; "custom" sends the visitor to the custom-cake form. */
  inquiry: "whatsapp" | "custom";
};

// TODO(Nandy): confirm descriptions, add any confirmed prices, and add more desserts as albums grow.
export const products: Product[] = [
  {
    slug: "tres-leches",
    category: "cakes",
    name: { es: "Pastel de Tres Leches", en: "Tres Leches Cake" },
    description: {
      es: "Bizcocho esponjoso bañado en tres leches, con el relleno y la decoración que tú elijas.",
      en: "Fluffy sponge cake soaked in three milks, with the filling and decoration of your choice.",
    },
    album: "TresLeches",
    price: null,
    featured: true,
    bg: "pink",
    inquiry: "custom",
  },
  {
    slug: "chocoflan",
    category: "chocoflan",
    name: { es: "Chocoflan", en: "Chocoflan" },
    description: {
      es: "Pastel de chocolate con una suave capa de flan.",
      en: "Chocolate cake with a smooth layer of flan.",
    },
    album: "Chocoflan",
    price: null,
    featured: true,
    bg: "yellow",
    inquiry: "whatsapp",
  },
  {
    slug: "mosaico-de-gelatina",
    category: "mosaico",
    name: { es: "Mosaico de Gelatina", en: "Mosaico de Gelatina" },
    description: {
      es: "Cubitos de gelatina de colores en una gelatina cremosa.",
      en: "Colorful gelatin cubes set in a creamy gelatin.",
    },
    album: "Mosaico",
    price: null,
    featured: true,
    bg: "blue",
    inquiry: "whatsapp",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

/** Categories that currently have at least one product, in display order. */
export const activeCategories = categories
  .map((category) => ({
    ...category,
    products: products.filter((p) => p.category === category.id),
  }))
  .filter((c) => c.products.length > 0);
