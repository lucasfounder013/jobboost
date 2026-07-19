"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  label?: string;
};

/**
 * Mini-player vidéo pour illustrer une brique produit :
 * autoplay muted loop, pause hors du viewport pour économiser du CPU.
 */
export default function DemoClip({ src, label }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm bg-[#fafafa] md:min-h-[480px] flex flex-col">
      {/* Chrome minimaliste */}
      <div className="flex-shrink-0 bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        {label && (
          <span className="ml-auto text-xs font-semibold text-gray-500 tracking-wide">
            {label}
          </span>
        )}
      </div>
      <video
        ref={videoRef}
        className="w-full flex-1 object-cover aspect-video"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label ?? "Démonstration Rivjob"}
      />
    </div>
  );
}
