import type { Localized } from "./types";

/**
 * Codes used in gallery photo file names, e.g. "01-BD_Fem_TresLeches.png":
 *   01         -> display order inside the album
 *   BD, Fem…   -> tags below (shown on the photo and in the lightbox)
 *   TresLeches -> the dessert (ignored here; the folder already says it)
 * Add a new code here to start using it in file names. Unknown codes are simply ignored.
 */
export const photoTags: Record<string, Localized> = {
  BD: { es: "Cumpleaños", en: "Birthday" },
  Fem: { es: "Para ella", en: "For her" },
  Man: { es: "Para él", en: "For him" },
};
