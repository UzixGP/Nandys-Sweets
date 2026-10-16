import Link from "next/link";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";
import { Scallop } from "./ui";

type Props = {
  dict: Dictionary;
  links: { href: string; label: string }[];
  whatsappHref: string;
  emailHref: string | null;
  instagramUrl: string | null;
};

export function Footer({ dict, links, whatsappHref, emailHref, instagramUrl }: Props) {
  return (
    <footer className="mt-auto">
      <Scallop from="text-cream" to="bg-pink" />
      <div className="bg-pink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div className="space-y-3">
            <Logo className="w-28" />
            <p className="max-w-xs text-cocoa-soft">{dict.footer.tagline}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">{dict.footer.explore}</h2>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">{dict.footer.contact}</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <WhatsAppIcon className="size-5" /> {site.phoneDisplay}
                </a>
              </li>
              {emailHref && (
                <li>
                  <a href={emailHref} className="inline-flex items-center gap-2 hover:underline">
                    <MailIcon className="size-5" /> {site.email}
                  </a>
                </li>
              )}
              {instagramUrl && (
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:underline"
                  >
                    <InstagramIcon className="size-5" /> {site.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Extra bottom padding keeps the floating WhatsApp button off the text on phones. */}
        <p className="border-t border-cocoa/10 px-4 pt-5 pb-24 text-center text-sm text-cocoa-soft sm:pb-5">
          © <CopyrightYear /> Nandy&apos;s Sweets. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
