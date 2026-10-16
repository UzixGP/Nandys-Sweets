"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

/** Links to the same page in the other language. */
export function LanguageToggle({
  lang,
  label,
  ariaLabel,
  className = "",
}: {
  lang: Locale;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname();
  const target: Locale = lang === "es" ? "en" : "es";
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={ariaLabel}
      className={`rounded-full px-3 py-2 font-display text-sm font-semibold text-cocoa ring-1 ring-cocoa/25 transition hover:bg-cream/70 ${className}`}
    >
      {label}
    </Link>
  );
}
