"use client";

import { useEffect, useRef, useState } from "react";
import { TemplateSlug } from "@/lib/cv-templates";
import { CV_EXEMPLE } from "@/lib/cv-exemple";
import CVPreview from "@/components/CVPreview";
import PreviewModerne from "./PreviewModerne";
import PreviewElegant from "./PreviewElegant";

// Largeur "virtuelle" du CV avant scale (≈ A4 à 72 dpi).
// Le rendu est réduit par CSS transform pour tenir dans le container.
const LARGEUR_VIRTUELLE = 595;
const HAUTEUR_VIRTUELLE = (LARGEUR_VIRTUELLE * 4) / 3; // ratio 3:4 = aspect-[3/4]

// Miniature réaliste : rend le vrai composant de preview avec CV_EXEMPLE,
// scalé pour s'adapter à la largeur du container (responsive via ResizeObserver).
export default function ApercuMini({ slug }: { slug: TemplateSlug }) {
  const ref = useRef<HTMLDivElement>(null);
  // Scale initiale calculée pour 180px (largeur typique) — recalculée au mount
  const [scale, setScale] = useState(180 / LARGEUR_VIRTUELLE);

  useEffect(() => {
    if (!ref.current) return;
    const mesurer = () => {
      if (ref.current) {
        const largeur = ref.current.clientWidth;
        if (largeur > 0) setScale(largeur / LARGEUR_VIRTUELLE);
      }
    };
    mesurer();
    const observer = new ResizeObserver(mesurer);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white rounded-md overflow-hidden ring-1 ring-gray-200 shadow-sm relative aspect-[3/4] w-full"
    >
      <div
        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
        style={{
          width: `${LARGEUR_VIRTUELLE}px`,
          height: `${HAUTEUR_VIRTUELLE}px`,
          transform: `scale(${scale})`,
        }}
      >
        {slug === "classique-ats" && <CVPreview cv={CV_EXEMPLE} />}
        {slug === "moderne" && <PreviewModerne cv={CV_EXEMPLE} />}
        {slug === "elegant" && <PreviewElegant cv={CV_EXEMPLE} />}
      </div>
    </div>
  );
}
