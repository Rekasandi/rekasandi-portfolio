"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  url: string;
  caption?: string;
  alt?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9";
}

interface CaseStudyGalleryProps {
  title?: string;
  description?: string;
  images: GalleryImage[];
}

const ASPECT_RATIO_CLASSES: Record<string, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

export default function CaseStudyGallery({
  title,
  description,
  images,
}: CaseStudyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : 0
        );
      }
    },
    [activeIdx, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full my-12">
      {/* Header if provided */}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-2">
              {"// "}{title}
            </span>
          )}
          {description && (
            <p className="text-base text-[#55544e] max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Media Grid */}
      <div
        className={`grid gap-6 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {images.map((item, idx) => {
          const aspectClass =
            ASPECT_RATIO_CLASSES[item.aspectRatio || "16/9"] || "aspect-[16/9]";

          return (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className="group relative flex flex-col rounded-[8px] overflow-hidden border border-[#e2e0d8] bg-white shadow-xs cursor-zoom-in transition-all duration-300 hover:shadow-md hover:border-[#0a0a0a]"
            >
              <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#e8e6df]`}>
                <Image
                  src={item.url}
                  alt={item.alt || item.caption || `Gallery artifact ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-end p-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#0a0a0a] shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {item.caption && (
                <div className="p-4 border-t border-[#e2e0d8] bg-[#fdfdfc] flex items-center justify-between">
                  <p className="text-xs text-[#55544e] font-mono leading-relaxed truncate">
                    {item.caption}
                  </p>
                  <span className="font-mono text-[10px] text-[#7a7870] shrink-0 ml-2">
                    [0{idx + 1}]
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setActiveIdx(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((prev) =>
                      prev !== null
                        ? (prev - 1 + images.length) % images.length
                        : 0
                    );
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                  aria-label="Previous Artifact"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((prev) =>
                      prev !== null ? (prev + 1) % images.length : 0
                    );
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                  aria-label="Next Artifact"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Active Image Stage */}
            <div
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={images[activeIdx].url}
                  alt={
                    images[activeIdx].alt ||
                    images[activeIdx].caption ||
                    "Full resolution inspection"
                  }
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Caption metadata */}
              <div className="mt-4 flex items-center justify-between w-full text-white/80 font-mono text-xs px-2">
                <span>
                  {images[activeIdx].caption || "ARCHITECTURAL_MEDIA_ARTIFACT"}
                </span>
                <span>
                  {activeIdx + 1} / {images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
