"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

const INTERVAL_MS = 7000;

/**
 * Display-only slideshow: crossfades through the photos with no controls and no interaction.
 * Only the current, previous (fading out) and next (preloading) photos are mounted, so long albums stay light.
 * Stays on the first photo for visitors who prefer reduced motion.
 */
export function PhotoSlideshow({ photos, className = "" }: { photos: GalleryImage[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [count]);

  if (count === 0) return null;
  const prev = (index - 1 + count) % count;
  const next = (index + 1) % count;

  return (
    <div
      aria-hidden
      className={`pointer-events-none relative overflow-hidden select-none ${className}`}
    >
      {photos.map((photo, i) =>
        i === index || i === prev || i === next ? (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            draggable={false}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            sizes="(min-width: 640px) 16rem, 14rem"
            className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}
    </div>
  );
}
