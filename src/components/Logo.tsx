import Image from "next/image";
import logo from "../../public/brand/logo.png";

/** Round Nandy's Sweets & Cakes badge. Size it with a width class, e.g. "w-16". */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Nandy's Sweets & Cakes"
      priority={priority}
      sizes="160px"
      className={`h-auto drop-shadow-[0_2px_6px_rgb(104_75_71/0.18)] ${className}`}
    />
  );
}
