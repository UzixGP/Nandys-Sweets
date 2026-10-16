import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomCakeForm } from "@/components/CustomCakeForm";
import { PageHero } from "@/components/PageHero";
import { Scallop, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/custom-cakes">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.customPage.eyebrow,
    description: dict.customPage.subtitle,
    alternates: {
      canonical: `/${lang}/custom-cakes`,
      languages: { es: "/es/custom-cakes", en: "/en/custom-cakes" },
    },
  };
}

const stepColors = ["bg-pink", "bg-blue", "bg-yellow", "bg-lavender"];

export default async function CustomCakesPage({ params }: PageProps<"/[lang]/custom-cakes">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const page = dict.customPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} bg="bg-pink" />
      <Scallop from="text-pink" to="bg-cream" />

      {/* How it works */}
      <section className="bg-cream px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading title={page.stepsTitle} />
        <ol className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {page.steps.map((step, i) => (
            <li key={step.title} className="rounded-[2rem] bg-white/60 p-6 text-center shadow-soft ring-1 ring-cocoa/5">
              <span
                className={`mx-auto grid size-14 place-items-center rounded-full font-display text-2xl font-bold ${stepColors[i % stepColors.length]}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-cocoa-soft">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-yellow px-5 py-4 text-center font-semibold">
          {page.pricingNote}
        </p>
        {site.showPolicies && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-blue px-5 py-4 text-center">
            <h3 className="font-display text-lg font-bold">{dict.policies.title}</h3>
            <p className="mt-1">{dict.policies.deposit}</p>
            <p>{dict.policies.methods}</p>
          </div>
        )}
      </section>
      <Scallop from="text-cream" to="bg-blush" />

      {/* Inquiry form */}
      <section id="form" className="bg-blush px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading title={page.formTitle} subtitle={page.formSubtitle} />
        <div className="mx-auto mt-10 max-w-3xl">
          <CustomCakeForm labels={dict.form} />
        </div>
      </section>
      <Scallop from="text-blush" to="bg-cream" />
    </>
  );
}
