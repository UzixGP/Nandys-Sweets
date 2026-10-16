import { site } from "@/content/site";

/** WhatsApp click-to-chat link with a pre-filled message. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
