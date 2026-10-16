import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "light" | "whatsapp";

const variants: Record<Variant, string> = {
  solid: "bg-cocoa text-cream hover:bg-cocoa-dark",
  outline: "border-2 border-cocoa text-cocoa hover:bg-cocoa hover:text-cream",
  light: "bg-cream text-cocoa hover:bg-white",
  whatsapp: "bg-cocoa text-cream hover:bg-cocoa-dark",
};

/** Pill button styles shared by links and buttons. */
export const buttonClass = (variant: Variant = "solid", extra = "") =>
  `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-semibold shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 ${variants[variant]} ${extra}`;

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-block rounded-full bg-cream/80 px-4 py-1.5 font-display text-sm font-semibold text-cocoa ring-1 ring-cocoa/10 ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl font-bold tracking-tight text-cocoa sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-cocoa-soft">{subtitle}</p>}
    </div>
  );
}

/**
 * Scalloped frosting edge between two sections.
 * `from` is the upper section's text-* color, `to` is the lower section's bg-* color.
 */
export function Scallop({ from, to }: { from: string; to: string }) {
  return <div aria-hidden className={`scallop ${from} ${to}`} />;
}
