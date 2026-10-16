import { Eyebrow } from "./ui";

/** Title band at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  bg,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bg: "bg-pink" | "bg-blush" | "bg-blue" | "bg-yellow";
}) {
  return (
    <section className={`relative overflow-hidden ${bg} px-4 py-14 text-center sm:px-6 md:py-20`}>
      <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full bg-cream/40 blur-2xl" />
      <div aria-hidden className="absolute -bottom-20 -left-10 size-56 rounded-full bg-yellow/50 blur-2xl" />
      <div className="relative mx-auto max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-cocoa-soft">{subtitle}</p>}
      </div>
    </section>
  );
}
