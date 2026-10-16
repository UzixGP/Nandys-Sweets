import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition hover:-translate-y-1 hover:scale-105 sm:right-6 sm:bottom-6 sm:size-16"
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
