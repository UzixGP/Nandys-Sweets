import { categories } from "./categories";
import type { Localized, Pastel } from "./types";

export type Product = {
  slug: string;
  category: string;
  name: Localized;
  description: Localized;
  /** Path under /public, e.g. "/images/products/chocoflan.jpg". A placeholder shows while empty. */
  image?: string;
  /** Only prices Nandy has confirmed, e.g. "$35". Leave null to show "price on request". */
  price: string | null;
  featured?: boolean;
  bg: Pastel;
  /** "whatsapp" asks about the product in chat; "custom" sends the visitor to the custom-cake form. */
  inquiry: "whatsapp" | "custom";
};

// TODO(Nandy): confirm names/descriptions, add photos and any confirmed prices, and add more desserts.
export const products: Product[] = [
  {
    slug: "pastel-personalizado",
    category: "custom-cakes",
    name: { es: "Pastel Personalizado", en: "Custom Cake" },
    description: {
      es: "Diseñado a tu medida para cumpleaños, bodas, baby showers y más.",
      en: "Designed just for you for birthdays, weddings, baby showers and more.",
    },
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
