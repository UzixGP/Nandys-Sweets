import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
} as const;

export const MenuIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 6h18M3 12h12M3 18h18" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

export const InstagramIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const WhatsAppIcon = (props: IconProps) => (
  <svg aria-hidden focusable={false} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.3 11.3 0 0 0 5.36 1.37h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03" />
  </svg>
);

/** Friendly cake illustration used as a stand-in until real product photos are added. */
export const CakeIllustration = (props: IconProps) => (
  <svg aria-hidden focusable={false} viewBox="0 0 120 120" {...props}>
    <rect x="22" y="62" width="76" height="34" rx="10" fill="#FFF9F2" />
    <rect x="30" y="38" width="60" height="28" rx="10" fill="#FCE4EC" />
    <path
      d="M30 50c5 0 5 6 10 6s5-6 10-6 5 6 10 6 5-6 10-6 5 6 10 6 5-6 10-6"
      stroke="#F8C8DC"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M22 76c6 0 6 7 12.7 7s6.3-7 12.6-7 6.4 7 12.7 7 6.3-7 12.6-7 6.4 7 12.7 7 6.3-7 12.7-7"
      stroke="#C9EAF3"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <rect x="57" y="20" width="6" height="18" rx="3" fill="#FFF0B3" />
    <path d="M60 8c4 5 4 9 0 11-4-2-4-6 0-11z" fill="#F8C8DC" />
    <rect x="16" y="94" width="88" height="6" rx="3" fill="#684B47" opacity="0.15" />
  </svg>
);
