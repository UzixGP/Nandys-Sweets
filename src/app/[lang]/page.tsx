import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, CakeIllustration, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { PhotoSlideshow } from "@/components/PhotoSlideshow";
import { ProductGrid } from "@/components/ProductGrid";
import { Eyebrow, Scallop, SectionHeading, buttonClass } from "@/components/ui";
import { featuredProducts } from "@/content/products";
import { site } from "@/content/site";
import { pastelBg } from "@/content/types";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import { coverFor, mixedPhotos } from "@/lib/gallery";

// Center card on top, the other two tilted behind it.
const fanPositions = [
  "top-0 left-1/2 z-10 -translate-x-1/2",
  "top-[12%] left-0 -rotate-6",
  "top-[12%] right-0 rotate-6",
];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const collage = featuredProducts.slice(0, 3);
  const galleryPreview = mixedPhotos(8);
  const promoPhotos = mixedPhotos(Infinity).map((p) => p.image);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blush">
        <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-yellow/70 blur-3xl" />
        <div aria-hidden className="absolute -right-20 bottom-0 size-80 rounded-full bg-blue/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {dict.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cocoa-soft sm:text-xl lg:mx-0">
              {dict.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href={localePath(lang, "/menu")} className={buttonClass("solid")}>
                {dict.hero.primaryCta}
              </Link>
              <Link href={localePath(lang, "/custom-cakes")} className={buttonClass("outline")}>
                {dict.hero.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Fan of featured desserts, like photos spread on a table */}
          <div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
            {collage.map((product, i) => {
              const cover = coverFor(product);
              return (
                <Link
                  key={product.slug}
                  href={localePath(lang, "/menu")}
                  aria-label={product.name[lang]}
                  className={`absolute aspect-[3/4] w-[52%] overflow-hidden rounded-[2rem] shadow-lift ring-4 ring-cream transition duration-300 hover:z-20 hover:-translate-y-2 ${pastelBg[product.bg]} ${fanPositions[i]}`}
                >
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt={product.name[lang]}
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL={cover.blurDataURL}
                      sizes="(min-width: 1024px) 17rem, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <CakeIllustration className="w-3/5" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Scallop from="text-blush" to="bg-cream" />

      {/* Featured */}
      <section className="bg-cream px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          eyebrow={dict.featured.eyebrow}
          title={dict.featured.title}
          subtitle={dict.featured.subtitle}
        />
        <div className="mt-14">
          <ProductGrid products={featuredProducts} lang={lang} labels={dict.product} />
        </div>
        <div className="mt-14 text-center">
          <Link href={localePath(lang, "/menu")} className={buttonClass("outline")}>
            {dict.featured.viewAll}
            <ArrowIcon className="size-5" />
          </Link>
        </div>
      </section>
      <Scallop from="text-cream" to="bg-blue" />

      {/* Gallery teaser */}
      <section className="bg-blue px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          eyebrow={dict.galleryTeaser.eyebrow}
          title={dict.galleryTeaser.title}
          subtitle={dict.galleryTeaser.subtitle}
        />
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {galleryPreview.map(({ image, album }) => (
            <li key={image.src}>
              <Link
                href={localePath(lang, `/gallery#${album.id}`)}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-soft ring-4 ring-cream transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <Image
                  src={image.src}
                  alt={album.name[lang]}
                  fill
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  sizes="(min-width: 1024px) 18rem, 46vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href={localePath(lang, "/gallery")} className={buttonClass("solid")}>
            {dict.galleryTeaser.cta}
            <ArrowIcon className="size-5" />
          </Link>
        </div>
      </section>
      <Scallop from="text-blue" to="bg-yellow" />

      {/* Custom cake promo */}
      <section className="bg-yellow px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2.5rem] bg-cream/70 p-8 shadow-soft sm:p-12 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow className="bg-pink">{dict.customPromo.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.customPromo.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-cocoa-soft">{dict.customPromo.body}</p>
            <Link href={localePath(lang, "/custom-cakes")} className={buttonClass("solid", "mt-8")}>
              {dict.customPromo.cta}
              <ArrowIcon className="size-5" />
            </Link>
          </div>
          {/* Display-only slideshow of every gallery photo (changes every 7s, no controls). */}
          <PhotoSlideshow
            photos={promoPhotos}
            className="mx-auto aspect-[3/4] w-56 rotate-2 rounded-[2rem] bg-pink shadow-lift ring-8 ring-cream sm:w-64"
          />
        </div>
      </section>
      <Scallop from="text-yellow" to="bg-blush" />

      {/* About teaser */}
      <section className="bg-blush px-4 py-16 text-center sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={dict.aboutTeaser.eyebrow}
            title={dict.aboutTeaser.title}
            subtitle={dict.aboutTeaser.body}
          />
          <Link href={localePath(lang, "/about")} className={buttonClass("outline", "mt-8")}>
            {dict.aboutTeaser.cta}
          </Link>
        </div>
      </section>
      <Scallop from="text-blush" to="bg-cream" />

      {/* Contact strip */}
      <section className="bg-cream px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title={dict.contactStrip.title} subtitle={dict.contactStrip.body} />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(dict.contactStrip.genericMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("whatsapp")}
            >
              <WhatsAppIcon className="size-5" />
              {dict.contactStrip.whatsapp}
            </a>
            {site.email && (
              <a href={mailtoLink(site.name, "")} className={buttonClass("outline")}>
                <MailIcon className="size-5" />
                {dict.contactStrip.email}
              </a>
            )}
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("outline")}
              >
                <InstagramIcon className="size-5" />
                {dict.contactStrip.instagram}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
