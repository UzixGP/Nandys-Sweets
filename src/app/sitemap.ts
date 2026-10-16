import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";

const paths = ["", "/menu", "/gallery", "/custom-cakes", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}/es${path}`,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
    },
  }));
}
