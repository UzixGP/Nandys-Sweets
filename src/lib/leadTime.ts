import { site } from "@/content/site";

/**
 * Earliest pickup/delivery date (YYYY-MM-DD) for an order placed now, in the bakery's time zone:
 * before the 6 PM cutoff -> tomorrow (24h notice); after it -> the day after tomorrow.
 */
export function earliestOrderDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);

  const daysAhead = get("hour") < site.orderCutoffHour ? 1 : 2;
  // Date.UTC handles month/year rollover (e.g. Dec 31 + 2 days).
  return new Date(Date.UTC(get("year"), get("month") - 1, get("day") + daysAhead))
    .toISOString()
    .slice(0, 10);
}

/** Values for the {hours}, {bigHours} and {cutoff} placeholders in order-notice text. */
export const leadTimeTerms = {
  hours: String(site.minNoticeHours),
  bigHours: String(site.bigCakeNoticeHours),
  cutoff: `${site.orderCutoffHour % 12 || 12} ${site.orderCutoffHour < 12 ? "AM" : "PM"}`,
};
