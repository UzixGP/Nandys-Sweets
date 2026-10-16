import { site } from "@/content/site";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { deliveryTerms } from "@/lib/contact";
import { leadTimeTerms } from "@/lib/leadTime";

/** "Before you order" cards: notice needed, payments, pickup location and delivery terms. */
export function OrderInfo({
  labels,
  className = "",
}: {
  labels: Dictionary["orderInfo"];
  className?: string;
}) {
  const terms = { ...deliveryTerms, ...leadTimeTerms };
  const cards = [
    { icon: "⏰", title: labels.leadTitle, body: labels.leadBody, bg: "bg-lavender" },
    ...(site.showPolicies
      ? [{ icon: "💳", title: labels.paymentTitle, body: labels.paymentBody, bg: "bg-yellow" }]
      : []),
    { icon: "🏠", title: labels.pickupTitle, body: labels.pickupBody, bg: "bg-pink" },
    { icon: "🚗", title: labels.deliveryTitle, body: labels.deliveryBody, bg: "bg-blue" },
  ];

  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <h3 className="text-center font-display text-3xl font-bold tracking-tight">{labels.title}</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className={`rounded-[1.5rem] p-6 text-center shadow-soft ${card.bg}`}>
            <p aria-hidden className="text-3xl">
              {card.icon}
            </p>
            <h4 className="mt-2 font-display text-xl font-bold">{card.title}</h4>
            <p className="mt-1 text-cocoa-soft">{fill(card.body, terms)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
