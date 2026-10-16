import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/products";
import { pastelBg } from "@/content/types";
import { fill, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/contact";
import { CakeIllustration, WhatsAppIcon } from "./icons";

type Props = {
  product: Product;
  lang: Locale;
  labels: Dictionary["product"];
};

export function ProductCard({ product, lang, labels }: Props) {
  const name = product.name[lang];
  const isCustom = product.inquiry === "custom";

  const cta = isCustom ? (
    <Link
      href={localePath(lang, "/custom-cakes")}
      aria-label={fill(labels.quoteAria, { name })}
      className={pillClass}
    >
      {labels.quote}
    </Link>
  ) : (
    <a
      href={whatsappLink(fill(labels.whatsappMessage, { name }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={fill(labels.askAria, { name })}
      className={pillClass}
    >
      <WhatsAppIcon className="size-5" />
      {labels.ask}
    </a>
  );

  return (
    <article className="group mx-auto flex w-full max-w-sm flex-col items-center text-center">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-soft ring-4 ring-cream transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift ${pastelBg[product.bg]}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <CakeIllustration className="w-1/2 drop-shadow-sm" />
          </div>
        )}

        {/* Crumbl-style pill: always visible on touch screens, revealed on hover/focus on desktop. */}
        <div className="absolute inset-x-4 bottom-4 transition duration-300 md:translate-y-3 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {cta}
        </div>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">{name}</h3>
      <p className="mt-2 max-w-xs text-cocoa-soft">{product.description[lang]}</p>
      <p className="mt-3 rounded-full bg-cream px-3 py-1 font-display text-sm font-semibold ring-1 ring-cocoa/10">
        {product.price ?? labels.priceOnRequest}
      </p>
    </article>
  );
}

const pillClass =
  "flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 font-display text-lg font-semibold text-cream shadow-soft transition hover:bg-cocoa-dark";
