import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { deliveryTerms } from "@/lib/contact";

/** Pickup location + delivery terms (radius, fee, address confirmation). */
export function PickupDeliveryInfo({
  labels,
  className = "",
}: {
  labels: Dictionary["pickupDelivery"];
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <h3 className="text-center font-display text-2xl font-bold">{labels.title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] bg-pink p-6 text-center shadow-soft">
          <p aria-hidden className="text-3xl">🏠</p>
          <h4 className="mt-2 font-display text-xl font-bold">{labels.pickupTitle}</h4>
          <p className="mt-1 text-cocoa-soft">{fill(labels.pickupBody, deliveryTerms)}</p>
        </div>
        <div className="rounded-[1.5rem] bg-blue p-6 text-center shadow-soft">
          <p aria-hidden className="text-3xl">🚗</p>
          <h4 className="mt-2 font-display text-xl font-bold">{labels.deliveryTitle}</h4>
          <p className="mt-1 text-cocoa-soft">{fill(labels.deliveryBody, deliveryTerms)}</p>
        </div>
      </div>
    </div>
  );
}
