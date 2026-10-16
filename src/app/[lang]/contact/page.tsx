import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Scallop } from "@/components/ui";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailtoLink, whatsappLink } from "@/lib/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.contactPage.eyebrow,
    description: dict.contactPage.subtitle,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { es: "/es/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const page = dict.contactPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} bg="bg-yellow" />
      <Scallop from="text-yellow" to="bg-cream" />

      <section className="bg-cream px-4 py-16 sm:px-6 md:py-20">
        <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <ContactCard
            href={whatsappLink(dict.contactStrip.genericMessage)}
            external
            color="bg-pink"
            icon={<WhatsAppIcon className="size-8" />}
            title={page.whatsappTitle}
            body={page.whatsappBody}
            action={dict.contactStrip.whatsapp}
          />
          {site.email && (
            <ContactCard
              href={mailtoLink(site.name, "")}
              color="bg-blue"
              icon={<MailIcon className="size-8" />}
              title={page.emailTitle}
              body={page.emailBody}
              action={site.email}
            />
          )}
          {site.instagramUrl && (
            <ContactCard
              href={site.instagramUrl}
              external
              color="bg-lavender"
              icon={<InstagramIcon className="size-8" />}
              title={page.instagramTitle}
              body={page.instagramBody}
              action={dict.contactStrip.instagram}
            />
          )}
        </ul>
      </section>
    </>
  );
}

function ContactCard({
  href,
  external,
  color,
  icon,
  title,
  body,
  action,
}: {
  href: string;
  external?: boolean;
  color: string;
  icon: ReactNode;
  title: string;
  body: string;
  action: string;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group flex h-full flex-col items-center rounded-[2rem] p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${color}`}
      >
        <span className="grid size-16 place-items-center rounded-full bg-cream">{icon}</span>
        <h2 className="mt-4 font-display text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-cocoa-soft">{body}</p>
        <span className="mt-5 font-display font-semibold break-all underline-offset-4 group-hover:underline">
          {action}
        </span>
      </a>
    </li>
  );
}
