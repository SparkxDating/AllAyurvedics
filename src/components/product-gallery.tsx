"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; width: number; height: number; alt: string };
type GalleryVideo = { src: string; poster: string; width: number; height: number; label: string };

export function ProductGallery({
  images,
  video,
  labels,
}: {
  images: GalleryImage[];
  video?: GalleryVideo;
  labels: { gallery: string; showImage: string; showVideo: string };
}) {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoIndex = video ? images.length : -1;

  function select(i: number) {
    if (i !== videoIndex) videoRef.current?.pause();
    setActive(i);
  }

  return (
    <div aria-label={labels.gallery} role="region">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-white">
        {images.map((img, i) => (
          <div key={img.src} className={cn("absolute inset-0 p-6", active === i ? "block" : "hidden")}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority={i === 0}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-contain"
            />
          </div>
        ))}
        {video && (
          <div className={cn("absolute inset-0 bg-[#1f1a14]", active === videoIndex ? "block" : "hidden")}>
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              width={video.width}
              height={video.height}
              controls
              playsInline
              muted
              preload="metadata"
              aria-label={video.label}
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => select(i)}
            aria-label={`${labels.showImage} ${i + 1}`}
            aria-pressed={active === i}
            className={cn(
              "relative size-20 overflow-hidden rounded-xl border-2 bg-white p-1.5 transition-colors",
              active === i ? "border-primary" : "border-border hover:border-primary/40",
            )}
          >
            <Image src={img.src} alt="" width={img.width} height={img.height} sizes="80px" className="h-full w-full object-contain" />
          </button>
        ))}
        {video && (
          <button
            type="button"
            onClick={() => select(videoIndex)}
            aria-label={labels.showVideo}
            aria-pressed={active === videoIndex}
            className={cn(
              "relative size-20 overflow-hidden rounded-xl border-2 bg-[#1f1a14] transition-colors",
              active === videoIndex ? "border-primary" : "border-border hover:border-primary/40",
            )}
          >
            <Image src={video.poster} alt="" width={video.width} height={video.height} sizes="80px" className="h-full w-full object-cover opacity-90" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-primary shadow">
                <Play className="size-4 fill-current" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
