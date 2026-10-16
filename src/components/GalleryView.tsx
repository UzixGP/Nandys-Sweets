"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/contact";
import { albums, type Album, type GalleryImage } from "@/lib/gallery";
import { ArrowIcon, CloseIcon, WhatsAppIcon } from "./icons";

type Labels = Dictionary["gallery"];
type Photo = { image: GalleryImage; album: Album; index: number };

// The selected album lives in the URL hash (/gallery#TresLeches) so product cards can link straight to it.
const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => decodeURIComponent(window.location.hash.slice(1));
const selectAlbum = (id: string) => {
  history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};

export function GalleryView({ lang, labels }: { lang: Locale; labels: Labels }) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const active = albums.find((a) => a.id === hash);
  const shown = active ? [active] : albums;

  const photos: Photo[] = shown.flatMap((album) =>
    album.images.map((image, index) => ({ image, album, index })),
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap justify-center gap-2">
        <Chip pressed={!active} onClick={() => selectAlbum("")}>
          {labels.all}
        </Chip>
        {albums.map((album) => (
          <Chip key={album.id} pressed={active?.id === album.id} onClick={() => selectAlbum(album.id)}>
            {album.name[lang]} <span className="opacity-60">({album.images.length})</span>
          </Chip>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {shown.map((album) => (
          <section key={album.id} aria-labelledby={`album-${album.id}`}>
            <h2
              id={`album-${album.id}`}
              className="mb-6 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {album.name[lang]}
            </h2>
            {/* Flex instead of grid so albums with only a few photos stay centered. */}
            <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-5">
              {album.images.map((image, index) => {
                const position = photos.findIndex((p) => p.album === album && p.index === index);
                return (
                  <li
                    key={image.src}
                    className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.834rem)] lg:w-[calc(25%-0.9375rem)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(position)}
                      aria-label={fill(labels.openPhoto, {
                        album: album.name[lang],
                        n: String(index + 1),
                      })}
                      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-blush shadow-soft ring-4 ring-cream transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                        sizes="(min-width: 1024px) 18rem, (min-width: 768px) 30vw, 46vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {open !== null && photos[open] && (
        <Lightbox
          photos={photos}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          lang={lang}
          labels={labels}
        />
      )}
    </>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 font-display font-semibold transition ${
        pressed ? "bg-cocoa text-cream shadow-soft" : "bg-cream text-cocoa ring-1 ring-cocoa/15 hover:bg-pink"
      }`}
    >
      {children}
    </button>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
  lang,
  labels,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  lang: Locale;
  labels: Labels;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { image, album } = photos[index];
  const go = (step: number) => onIndex((index + step + photos.length) % photos.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  // The lightbox only opens after a click, so window is always available here.
  const message = fill(labels.wantThisMessage, {
    album: album.name[lang],
    url: `${window.location.origin}${image.src}`,
  });

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      aria-label={album.name[lang]}
      className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-cocoa-dark/80 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex h-full flex-col items-center justify-center gap-4 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="relative h-[68vh] w-full max-w-3xl sm:h-[75vh]">
          <Image
            key={image.src}
            src={image.src}
            alt={`${album.name[lang]} ${index + 1}`}
            fill
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            sizes="(min-width: 768px) 48rem, 100vw"
            className="rounded-3xl object-contain"
          />
        </div>

        <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 text-cream">
          <p className="font-display font-semibold">
            {album.name[lang]} · {index + 1} / {photos.length}
          </p>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-display font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-5" />
            {labels.wantThis}
          </a>
        </div>

        {photos.length > 1 && (
          <>
            <NavButton side="left" label={labels.previous} onClick={() => go(-1)} />
            <NavButton side="right" label={labels.next} onClick={() => go(1)} />
          </>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-pink text-cocoa shadow-soft transition hover:bg-pink-deep"
        >
          <CloseIcon className="size-6" />
        </button>
      </div>
    </dialog>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-cocoa shadow-soft transition hover:bg-cream ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <ArrowIcon className={`size-6 ${side === "left" ? "rotate-180" : ""}`} />
    </button>
  );
}
