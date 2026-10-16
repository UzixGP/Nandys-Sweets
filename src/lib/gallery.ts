import manifest from "@/content/gallery.generated.json";
import { products, type Product } from "@/content/products";
import type { Localized } from "@/content/types";

export type GalleryImage = (typeof manifest.albums)[number]["images"][number];

export type Album = {
  id: string;
  name: Localized;
  images: GalleryImage[];
};

/** "TresLeches" / "tres-leches" -> "Tres Leches", for folders without a matching product. */
const prettify = (folder: string) =>
  folder
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const productIndex = (folder: string) => {
  const i = products.findIndex((p) => p.album === folder);
  return i === -1 ? products.length : i;
};

/** Every photo folder, named after its product when one points at it. Product order first, then the rest. */
export const albums: Album[] = [...manifest.albums]
  .sort((a, b) => productIndex(a.folder) - productIndex(b.folder))
  .map((album) => {
    const product = products.find((p) => p.album === album.folder);
    const fallback = prettify(album.folder);
    return {
      id: album.folder,
      name: product?.name ?? { es: fallback, en: fallback },
      images: album.images,
    };
  });

export const albumFor = (product: Product) =>
  product.album ? albums.find((a) => a.id === product.album) : undefined;

export const coverFor = (product: Product) => albumFor(product)?.images[0];

/** Round-robin across albums so a preview shows variety instead of one album's photos. */
export function mixedPhotos(limit: number) {
  const out: { image: GalleryImage; album: Album }[] = [];
  for (let i = 0; out.length < limit; i++) {
    const before = out.length;
    for (const album of albums) {
      if (album.images[i] && out.length < limit) out.push({ image: album.images[i], album });
    }
    if (out.length === before) break;
  }
  return out;
}
