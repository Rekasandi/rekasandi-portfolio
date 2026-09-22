"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PREFETCH_ROUTES = [
  "/work",
  "/services",
  "/about",
  "/insights",
  "/contact",
];

export default function StudioPreloader() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const hasLoaded = sessionStorage.getItem("rekasandi_preloader_seen");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Lock page scroll during preloader
    document.body.style.overflow = "hidden";

    // Silently prefetch all core routes in parallel
    PREFETCH_ROUTES.forEach((route) => {
      try {
        router.prefetch(route);
      } catch {
        // silent catch
      }
    });

    // High-precision non-linear counter
    const startTime = performance.now();
    const duration = 1600; // 1.6s studio intro

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic progress
      const eased = 1 - Math.pow(1 - t, 3);
      const currentVal = Math.floor(eased * 100);

      setProgress(currentVal);

      if (t < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("rekasandi_preloader_seen", "true");
        }, 200);
      }
    };

    requestAnimationFrame(updateCounter);

    return () => {
      document.body.style.overflow = "";
    };
  }, [router]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="studio-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.9,
              ease: [0.87, 0, 0.13, 1], // High-end editorial easing
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#f7f6f2] text-[#0a0a0a] p-8 sm:p-14 select-none pointer-events-auto border-b border-[#e2e0d8] shadow-2xl"
        >
          {/* Top Editorial Status Row */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#7a7870] tracking-widest uppercase border-b border-[#e2e0d8] pb-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#0a0a0a] font-semibold">JAKARTA [UTC+7]</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>SYSTEM ARCHITECTURE</span>
              <span>●</span>
              <span>EDITION 2026</span>
            </div>
            <div className="text-[#0a0a0a] font-medium">[INITIALIZING STUDIO]</div>
          </div>

          {/* Center Brand Identity */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e2e0d8] bg-white shadow-xs mb-2">
                <span className="size-2 rounded-full bg-[#d7ff3f] border border-[#0a0a0a]/30" />
                <span className="font-mono text-xs text-[#0a0a0a] tracking-[0.25em] uppercase font-bold">
                  REKASANDI STUDIO
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0a0a0a]">
                DIGITAL PRODUCT STUDIO
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#55544e] max-w-sm tracking-wide mt-2">
                Engineering category-defining web experiences & intelligent software.
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Row */}
          <div className="flex flex-col gap-4 border-t border-[#e2e0d8] pt-6">
            <div className="flex items-end justify-between font-mono text-xs text-[#7a7870]">
              <div className="flex items-center gap-2">
                <span className="text-[#0a0a0a] font-semibold">ASSETS PRELOAD</span>
                <span className="text-[#7a7870]">/</span>
                <span>CACHE PREFETCH READY</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#0a0a0a]">
                  [{String(progress).padStart(3, "0")}%]
                </span>
              </div>
            </div>

            {/* Editorial Line Meter */}
            <div className="w-full h-[2px] bg-[#e2e0d8] rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#0a0a0a] transition-[width] duration-75 ease-out"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
