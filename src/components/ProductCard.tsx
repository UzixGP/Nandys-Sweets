import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/products";
import { pastelBg } from "@/content/types";
import { fill, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/contact";
import { albumFor } from "@/lib/gallery";
import { CakeIllustration, WhatsAppIcon } from "./icons";

type Props = {
  product: Product;
  lang: Locale;
  labels: Dictionary["product"];
};

export function ProductCard({ product, lang, labels }: Props) {
  const name = product.name[lang];
  const album = albumFor(product);
  const cover = album?.images[0];

  const cta = (className: string) =>
    product.inquiry === "custom" ? (
      <Link
        href={localePath(lang, "/custom-cakes")}
        aria-label={fill(labels.quoteAria, { name })}
        className={className}
      >
        {labels.quote}
      </Link>
    ) : (
      <a
        href={whatsappLink(fill(labels.whatsappMessage, { name }))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={fill(labels.askAria, { name })}
        className={className}
      >
        <WhatsAppIcon className="size-5" />
        {labels.ask}
      </a>
    );

  return (
    <article className="group mx-auto flex w-full max-w-sm flex-col items-center text-center">
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-soft ring-4 ring-cream transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift ${pastelBg[product.bg]}`}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={name}
            fill
            placeholder="blur"
            blurDataURL={cover.blurDataURL}
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <CakeIllustration className="w-1/2 drop-shadow-sm" />
          </div>
        )}

        {/* Crumbl-style pill revealed on hover/focus (desktop). On phones the button sits below instead,
            so it never covers the label printed on the photo. */}
        <div className="absolute inset-x-4 bottom-4 hidden translate-y-3 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {cta(pillClass)}
        </div>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">{name}</h3>
      <p className="mt-2 max-w-xs text-cocoa-soft">{product.description[lang]}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-cream px-3 py-1 font-display text-sm font-semibold ring-1 ring-cocoa/10">
          {product.price ?? labels.priceOnRequest}
        </span>
        {album && album.images.length > 1 && (
          <Link
            href={localePath(lang, `/gallery#${album.id}`)}
            className="rounded-full px-3 py-1 font-display text-sm font-semibold underline decoration-pink-deep decoration-2 underline-offset-4 hover:bg-blush"
          >
            {fill(labels.morePhotos, { count: String(album.images.length) })}
          </Link>
        )}
      </div>
      <div className="mt-4 w-full md:hidden">{cta(pillClass)}</div>
    </article>
  );
}

const pillClass =
  "flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 font-display text-lg font-semibold text-cream shadow-soft transition hover:bg-cocoa-dark";
