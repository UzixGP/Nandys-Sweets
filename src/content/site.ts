/**
 * Business details shown across the site. Edit these values in one place.
 */
export const site = {
  name: "Nandy's Sweets",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nandys-sweets.vercel.app",

  // TODO(Nandy): WhatsApp number in international format, digits only (e.g. "13055551234").
  // While empty, WhatsApp links open the app and let the customer pick a chat.
  whatsappNumber: "",

  // TODO(Nandy): business email.
  email: "",

  // TODO(Nandy): full Instagram profile URL. Hidden while empty.
  instagramUrl: "",

  // Shows the 50% deposit + Zelle/PayPal/cash policy. Turn on only after Nandy confirms it's current.
  showPolicies: false,
};
