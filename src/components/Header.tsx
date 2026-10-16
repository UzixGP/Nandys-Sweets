"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { CloseIcon, InstagramIcon, MailIcon, MenuIcon, WhatsAppIcon } from "./icons";

type NavLink = { href: string; label: string };

type Props = {
  lang: Locale;
  links: NavLink[];
  labels: {
    openMenu: string;
    closeMenu: string;
    orderCta: string;
    orderCtaShort: string;
    switchLanguage: string;
    switchLanguageAria: string;
  };
  whatsappHref: string;
  emailHref: string | null;
  instagramUrl: string | null;
};

export function Header({ lang, links, labels, whatsappHref, emailHref, instagramUrl }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  // Close the drawer whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const opener = openRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-pink/95 shadow-[0_1px_0_rgb(104_75_71/0.08)] backdrop-blur">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
          <button
            ref={openRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex items-center gap-2 justify-self-start rounded-full py-2 pr-3 font-display text-lg font-semibold text-cocoa"
          >
            <MenuIcon className="size-7" />
            <span className="hidden sm:inline">{labels.openMenu}</span>
          </button>

          {/* On desktop the badge hangs a little below the bar, like a seal on a bakery box. */}
          <Link href={`/${lang}`} className="transition hover:scale-105 md:translate-y-4">
            <Logo priority className="w-16 sm:w-[4.5rem] md:w-24" />
          </Link>

          <div className="flex items-center gap-2 justify-self-end">
            <LanguageToggle
              lang={lang}
              label={labels.switchLanguage}
              ariaLabel={labels.switchLanguageAria}
              className="hidden md:inline-flex"
            />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 font-display text-sm font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-cocoa-dark sm:px-5 sm:text-base"
            >
              <WhatsAppIcon className="size-5" />
              <span className="sm:hidden">{labels.orderCtaShort}</span>
              <span className="hidden sm:inline">{labels.orderCta}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Slide-in drawer, Crumbl-style */}
      <div
        className={`fixed inset-0 z-50 bg-cocoa/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <nav
        id="site-menu"
        aria-label={labels.openMenu}
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(24rem,88vw)] flex-col rounded-r-[2rem] bg-cream shadow-lift transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
          <Logo className="w-16" />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.closeMenu}
            className="grid size-12 place-items-center rounded-full bg-pink text-cocoa transition hover:bg-pink-deep"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <ul className="flex-1 space-y-1 overflow-y-auto px-6 py-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-2xl px-3 py-3 font-display text-3xl font-bold tracking-tight transition hover:bg-blush ${
                    active ? "bg-blush text-cocoa" : "text-cocoa"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 border-t border-cocoa/10 px-6 py-6">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 font-display font-semibold text-cream"
          >
            <WhatsAppIcon className="size-5" />
            {labels.orderCta}
          </a>
          <div className="flex items-center justify-between">
            <LanguageToggle
              lang={lang}
              label={labels.switchLanguage}
              ariaLabel={labels.switchLanguageAria}
            />
            <div className="flex gap-2">
              {emailHref && (
                <a
                  href={emailHref}
                  aria-label="Email"
                  className="grid size-11 place-items-center rounded-full bg-blue text-cocoa"
                >
                  <MailIcon className="size-5" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-11 place-items-center rounded-full bg-yellow text-cocoa"
                >
                  <InstagramIcon className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
