import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Scallop } from "@/components/ui";
import { activeCategories } from "@/content/products";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.menuPage.title,
    description: dict.menuPage.subtitle,
    alternates: { canonical: `/${lang}/menu`, languages: { es: "/es/menu", en: "/en/menu" } },
  };
}

// Alternating backgrounds per category section.
const sectionStyles = [
  { bg: "bg-cream", text: "text-cream" },
  { bg: "bg-blush", text: "text-blush" },
  { bg: "bg-blue", text: "text-blue" },
  { bg: "bg-yellow", text: "text-yellow" },
];

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHero
        eyebrow={dict.menuPage.eyebrow}
        title={dict.menuPage.title}
        subtitle={dict.menuPage.subtitle}
        bg="bg-pink"
      />

      {/* Category chips */}
      <nav
        aria-label={dict.menuPage.jumpTo}
        className="sticky top-20 z-30 border-y border-cocoa/10 bg-cream/95 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          {activeCategories.map((category) => (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                className="block rounded-full bg-blush px-4 py-2 font-display font-semibold transition hover:bg-pink"
              >
                {category.name[lang]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {activeCategories.map((category, i) => {
        const style = sectionStyles[i % sectionStyles.length];
        const next = sectionStyles[(i + 1) % sectionStyles.length];
        const isLast = i === activeCategories.length - 1;
        return (
          <div key={category.id}>
            <section
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              className={`${style.bg} scroll-mt-36 px-4 py-14 sm:px-6 md:py-20`}
            >
              <h2
                id={`${category.id}-title`}
                className="mb-12 text-center font-display text-4xl font-bold tracking-tight sm:text-5xl"
              >
                {category.name[lang]}
              </h2>
              <ProductGrid products={category.products} lang={lang} labels={dict.product} />
            </section>
            {/* The footer adds its own cream scallop, so the last section blends into cream. */}
            <Scallop from={style.text} to={isLast ? "bg-cream" : next.bg} />
          </div>
        );
      })}
    </>
  );
}
