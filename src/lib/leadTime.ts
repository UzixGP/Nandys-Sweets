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

/** Pickup/delivery time options as 24h "HH:MM" strings, e.g. ["08:00", "08:30", …, "20:00"]. */
export function timeSlots({ first, last, stepMinutes } = site.timeSlots) {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: string[] = [];
  for (let t = toMinutes(first); t <= toMinutes(last); t += stepMinutes) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return slots;
}

/** Values for the {hours}, {bigHours} and {cutoff} placeholders in order-notice text. */
export const leadTimeTerms = {
  hours: String(site.minNoticeHours),
  bigHours: String(site.bigCakeNoticeHours),
  cutoff: `${site.orderCutoffHour % 12 || 12} ${site.orderCutoffHour < 12 ? "AM" : "PM"}`,
};
