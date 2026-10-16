// TODO: swap the text wordmark for the official logo (public/brand/logo.png) with next/image once it's added.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-display text-[1.65em] font-bold tracking-tight text-cocoa">
        Nandy&apos;s
      </span>
      <span className="font-display text-[0.7em] font-semibold uppercase tracking-[0.35em] text-cocoa-soft">
        Sweets
      </span>
    </span>
  );
}
