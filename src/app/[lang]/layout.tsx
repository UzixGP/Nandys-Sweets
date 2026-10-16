import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { notFound } from "next/navigation";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";
import { hasLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import "../globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "es" ? "es_US" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
  };
}

const navLinks = (lang: Locale, dict: Dictionary) => [
  { href: localePath(lang), label: dict.nav.home },
  { href: localePath(lang, "/menu"), label: dict.nav.menu },
  { href: localePath(lang, "/gallery"), label: dict.nav.gallery },
  { href: localePath(lang, "/custom-cakes"), label: dict.nav.customCakes },
  { href: localePath(lang, "/about"), label: dict.nav.about },
  { href: localePath(lang, "/contact"), label: dict.nav.contact },
];

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const links = navLinks(lang, dict);
  const whatsappHref = whatsappLink(dict.contactStrip.genericMessage);
  const emailHref = site.email ? mailtoLink(site.name, "") : null;
  const instagramUrl = site.instagramUrl || null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.name,
    url: site.url,
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "East Orange",
      addressRegion: "NJ",
      postalCode: "07017",
      addressCountry: "US",
    },
    ...(site.email && { email: site.email }),
    ...(site.whatsappNumber && { telephone: `+${site.whatsappNumber}` }),
    ...(site.instagramUrl && { sameAs: [site.instagramUrl] }),
  };

  return (
    <html lang={lang} className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header
          lang={lang}
          links={links}
          labels={dict.nav}
          whatsappHref={whatsappHref}
          emailHref={emailHref}
          instagramUrl={instagramUrl}
        />
        <main className="flex-1">{children}</main>
        <Footer
          dict={dict}
          links={links}
          whatsappHref={whatsappHref}
          emailHref={emailHref}
          instagramUrl={instagramUrl}
        />
        <FloatingWhatsApp href={whatsappHref} label={dict.floating.aria} />
      </body>
    </html>
  );
}
