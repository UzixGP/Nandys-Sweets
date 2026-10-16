import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Scallop, buttonClass } from "@/components/ui";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.aboutPage.eyebrow,
    description: dict.aboutPage.intro,
    alternates: { canonical: `/${lang}/about`, languages: { es: "/es/about", en: "/en/about" } },
  };
}

const valueColors = ["bg-pink", "bg-blue", "bg-yellow"];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const page = dict.aboutPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.intro} bg="bg-blue" />
      <Scallop from="text-blue" to="bg-cream" />

      {/* TODO(Nandy): add the real story of Nandy's Sweets & Cakes here (and a photo) once she shares it. */}
      <section className="bg-cream px-4 py-16 sm:px-6 md:py-20">
        <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {page.values.map((value, i) => (
            <li
              key={value.title}
              className={`rounded-[2rem] p-8 text-center shadow-soft ${valueColors[i % valueColors.length]}`}
            >
              <h2 className="font-display text-2xl font-bold">{value.title}</h2>
              <p className="mt-3 text-cocoa-soft">{value.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href={localePath(lang, "/menu")} className={buttonClass("solid")}>
            {page.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
