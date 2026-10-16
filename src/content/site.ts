/**
 * Business details shown across the site. Edit these values in one place.
 */
export const site = {
  name: "Nandy's Sweets & Cakes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nandys-sweets.vercel.app",

  // WhatsApp number in international format, digits only: +1 (973) 745-3357.
  whatsappNumber: "19737453357",
  phoneDisplay: "+1 (973) 745-3357",

  email: "nandysweetsandcakes@gmail.com",

  instagramUrl: "https://www.instagram.com/nandysweetsandcakes/",
  instagramHandle: "@nandysweetsandcakes",

  // Pickup & delivery. Most orders are picked up; delivery needs the address confirmed first.
  pickupArea: "East Orange, NJ 07017",
  deliveryRadiusMiles: 5,
  deliveryFee: "$10",

  // Order notice: at least 24h (48h recommended for big cakes). Orders confirmed after the cutoff
  // count from the next day. Times are East Orange (New York) time.
  timeZone: "America/New_York",
  minNoticeHours: 24,
  bigCakeNoticeHours: 48,
  orderCutoffHour: 18, // 6 PM

  // Shows the 50% deposit + Zelle/PayPal/cash policy (confirmed by Nandy, 2026-10-16).
  showPolicies: true,
};
