import Image from "next/image";
import Link from "next/link";
import { activeCategories } from "@/content/products";
import { pastelBg } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { CakeIllustration } from "./icons";

/** Round category shortcuts (inspired by Crumbl's drinks row) that jump to a menu section. */
export function CategoryCircles({ lang }: { lang: Locale }) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-10">
      {activeCategories.map((category) => {
        const image = category.products.find((p) => p.image)?.image;
        return (
          <li key={category.id}>
            <Link
              href={localePath(lang, `/menu#${category.id}`)}
              className="group flex w-36 flex-col items-center text-center sm:w-44"
            >
              <span
                className={`relative grid size-36 place-items-center overflow-hidden rounded-full shadow-soft ring-4 ring-cream transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift sm:size-44 ${pastelBg[category.bg]}`}
              >
                {image ? (
                  <Image src={image} alt="" fill sizes="11rem" className="object-cover" />
                ) : (
                  <CakeIllustration className="w-3/5" />
                )}
              </span>
              <span className="mt-4 font-display text-lg font-bold leading-tight group-hover:underline">
                {category.name[lang]}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
