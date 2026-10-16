import type { Product } from "@/content/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  lang,
  labels,
}: {
  products: Product[];
  lang: Locale;
  labels: Dictionary["product"];
}) {
  return (
    <div className="mx-auto grid max-w-6xl justify-center gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} lang={lang} labels={labels} />
      ))}
    </div>
  );
}
