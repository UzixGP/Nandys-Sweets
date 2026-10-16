import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    title: "Nandy's Sweets & Cakes | Homemade Desserts",
    description:
      "Custom cakes, chocoflan, gelatin mosaic and homemade desserts made with love for your celebrations.",
  },
  nav: {
    home: "Home",
    menu: "Menu",
    gallery: "Gallery",
    customCakes: "Custom Cakes",
    about: "About",
    contact: "Contact",
    openMenu: "Menu",
    closeMenu: "Close menu",
    orderCta: "Order on WhatsApp",
    orderCtaShort: "Order",
    switchLanguage: "Español",
    switchLanguageAria: "Switch to Spanish",
  },
  hero: {
    eyebrow: "Homemade",
    title: "Sweet Moments, Made with Love.",
    subtitle:
      "From beautiful custom cakes to delicious homemade desserts, Nandy's Sweets & Cakes brings a little extra sweetness to every celebration.",
    primaryCta: "Explore Our Desserts",
    secondaryCta: "Request a Custom Cake",
  },
  featured: {
    eyebrow: "House favorites",
    title: "Our Desserts",
    subtitle: "Handmade desserts, one by one, for your special moments.",
    viewAll: "See the full menu",
  },
  galleryTeaser: {
    eyebrow: "Our work",
    title: "Every cake is one of a kind",
    subtitle: "A peek at orders we've made, each with its own decoration and filling.",
    cta: "See the gallery",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Our Previous Work",
    subtitle:
      "Every order is unique: different decorations, fillings and celebrations. Tap a photo to see it up close and ask for something similar.",
    filterLabel: "Filter by dessert",
    all: "All",
    openPhoto: "View photo {n} of {album}",
    previous: "Previous photo",
    next: "Next photo",
    close: "Close",
    wantThis: "I want one like this",
    wantThisMessage:
      "Hi Nandy's Sweets & Cakes! I saw this dessert in your gallery ({album}) and I'd like something similar: {url}",
  },
  product: {
    ask: "Ask",
    askAria: "Ask about {name} on WhatsApp",
    quote: "Get a quote",
    quoteAria: "Get a quote for {name}",
    priceOnRequest: "Price on request",
    priceFrom: "From {price}",
    morePhotos: "See {count} photos",
    whatsappMessage:
      "Hi Nandy's Sweets & Cakes! I'm interested in: {name}. Could you tell me about availability and price?",
  },
  customPromo: {
    eyebrow: "Made just for you",
    title: "Celebrating something special?",
    body: "Tell us your idea: the date, how many guests and the style you're dreaming of. We'll design your cake and send you a personalized quote.",
    cta: "Request my cake",
  },
  aboutTeaser: {
    eyebrow: "Nandy's Sweets & Cakes",
    title: "Made with care, not mass-produced",
    body: "Every dessert is prepared with dedication, creativity and attention to detail. It's not a mass-produced dessert: it's made thinking of you and your celebration.",
    cta: "Get to know us",
  },
  contactStrip: {
    title: "Have an order in mind?",
    body: "Message us on WhatsApp and we'll gladly help with your order or questions.",
    whatsapp: "Message us on WhatsApp",
    email: "Send an email",
    instagram: "Instagram",
    genericMessage: "Hi Nandy's Sweets & Cakes! I have a question:",
  },
  menuPage: {
    eyebrow: "Menu",
    title: "Our Menu",
    subtitle:
      "Everything is made to order. Tap “Ask” on any dessert to check availability and price on WhatsApp.",
    jumpTo: "Jump to category",
  },
  customPage: {
    eyebrow: "Custom Cakes",
    title: "Your cake, your way",
    subtitle:
      "Birthdays, weddings, baby showers, graduations… Tell us what you're celebrating and we'll create a one-of-a-kind cake for you.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "Share your idea",
        body: "Fill out the form with the date, servings, flavor and your inspiration.",
      },
      {
        title: "We review and quote",
        body: "We review your request and send you a price based on the design, size and details.",
      },
      {
        title: "Confirm your order",
        body: "If you like the quote, we'll send you the instructions to confirm your order.",
      },
      {
        title: "Time to celebrate!",
        body: "We'll coordinate the date and time for pickup or delivery of your cake.",
      },
    ],
    pricingNote:
      "Every cake is unique: pricing depends on the design, number of servings and complexity.",
    formTitle: "Request your quote",
    formSubtitle: "The more details you share, the more accurate your quote will be.",
  },
  form: {
    name: "Your name",
    phone: "Phone",
    date: "Pickup or delivery date",
    time: "Time",
    leadTimeNote:
      "We need at least {hours} hours' notice ({bigHours} hours for large cakes). Orders confirmed after {cutoff} count from the next day.",
    fulfillment: "How would you like to get your order?",
    fulfillmentShort: "Pickup or delivery",
    pickup: "Pickup",
    pickupHint: "In {area}",
    delivery: "Delivery",
    deliveryHint: "+{fee} · up to {radius} miles",
    address: "Delivery address",
    addressPlaceholder: "Street, city and ZIP code",
    deliveryNote:
      "We deliver within a {radius}-mile radius of East Orange for an extra {fee}. Before confirming your order, we'll check that your address is within the area.",
    pickupMessage: "Pickup in {area}",
    deliveryMessage: "Delivery (+{fee}, address to be confirmed)",
    servings: "Number of servings",
    flavor: "Preferred flavor",
    flavorPlaceholder: "E.g. vanilla, chocolate, tres leches…",
    size: "Approximate size or height",
    sizePlaceholder: "E.g. 2 tiers, 8 inches…",
    budget: "Approximate budget",
    budgetPlaceholder: "80",
    details: "Design and special instructions",
    detailsPlaceholder: "Colors, theme, filling, message on the cake, allergies…",
    optional: "(optional)",
    photoNote:
      "Have a reference photo? Attach it in the WhatsApp chat after sending your request.",
    submitWhatsapp: "Send on WhatsApp",
    submitEmail: "Send by email",
    errors: {
      required: "This field is required.",
      dateTooSoon: "The earliest available date is {date}.",
      servings: "Enter a valid number of servings.",
      summary: "Please check the highlighted fields to continue.",
    },
    success: {
      title: "All set! We opened your request",
      body: "Check the WhatsApp or email window and press send. We'll get back to you with a quote as soon as possible.",
      note: "Your order is confirmed only once we agree on the details and price together.",
      again: "Make another request",
    },
    message: {
      intro: "Hi Nandy's Sweets & Cakes! I'd like a quote for a custom cake:",
      emailSubject: "Custom cake request",
    },
  },
  orderInfo: {
    title: "Before you order",
    leadTitle: "Order ahead",
    leadBody:
      "Please order at least {hours} hours ahead ({bigHours} hours for large cakes). Orders confirmed after {cutoff} count from the next day.",
    paymentTitle: "Payments",
    paymentBody:
      "A 50% deposit confirms your order; the other 50% is due at pickup or delivery. We accept Zelle, PayPal and cash.",
    pickupTitle: "Pickup",
    pickupBody: "Most of our orders are picked up in {area}.",
    deliveryTitle: "Delivery",
    deliveryBody:
      "We also deliver within a {radius}-mile radius for an extra {fee}. We'll confirm your address first.",
  },
  aboutPage: {
    eyebrow: "About",
    title: "Homemade sweetness",
    intro:
      "At Nandy's Sweets & Cakes we believe every celebration deserves a special dessert. That's why every order is prepared with care, creativity and attention to detail.",
    values: [
      {
        title: "Handmade",
        body: "Every dessert is made to order, in small batches.",
      },
      {
        title: "Attention to detail",
        body: "We care about the flavor and presentation of every order.",
      },
      {
        title: "Made for you",
        body: "We listen to your idea and turn it into something unique.",
      },
    ],
    cta: "See the menu",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Let's talk about your order",
    subtitle: "The fastest way to reach us is on WhatsApp.",
    whatsappTitle: "WhatsApp",
    whatsappBody: "Orders, quotes and questions.",
    emailTitle: "Email",
    emailBody: "Prefer email? That works too.",
    instagramTitle: "Instagram",
    instagramBody: "See our latest creations.",
  },
  footer: {
    tagline: "Homemade cakes and desserts for your special moments.",
    explore: "Explore",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  floating: {
    aria: "Message us on WhatsApp",
  },
  notFound: {
    title: "Page not found",
    body: "Looks like someone already ate this dessert.",
    cta: "Back to home",
  },
};
