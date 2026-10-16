import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryView } from "@/components/GalleryView";
import { PageHero } from "@/components/PageHero";
import { Scallop, buttonClass } from "@/components/ui";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.gallery.title,
    description: dict.gallery.subtitle,
    alternates: {
      canonical: `/${lang}/gallery`,
      languages: { es: "/es/gallery", en: "/en/gallery" },
    },
  };
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHero
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.title}
        subtitle={dict.gallery.subtitle}
        bg="bg-blue"
      />
      <Scallop from="text-blue" to="bg-cream" />

      <section className="bg-cream px-4 py-14 sm:px-6 md:py-20">
        <GalleryView lang={lang} labels={dict.gallery} />

        <div className="mx-auto mt-20 max-w-2xl rounded-[2rem] bg-yellow p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-display text-3xl font-bold tracking-tight">{dict.customPromo.title}</h2>
          <p className="mt-3 text-cocoa-soft">{dict.customPromo.body}</p>
          <Link href={localePath(lang, "/custom-cakes")} className={buttonClass("solid", "mt-6")}>
            {dict.customPromo.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
