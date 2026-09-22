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
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0a0a0a] text-[#f7f6f2] p-8 sm:p-14 select-none pointer-events-auto"
        >
          {/* Top Editorial Status Row */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#7a7870] tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#d7ff3f] animate-pulse" />
              <span className="text-[#f7f6f2] font-semibold">JAKARTA [UTC+7]</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>SYSTEM ARCHITECTURE</span>
              <span>●</span>
              <span>EDITION 2026</span>
            </div>
            <div>[INITIALIZING STUDIO]</div>
          </div>

          {/* Center Brand Identity */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="font-mono text-xs text-[#d7ff3f] tracking-[0.3em] uppercase font-semibold">
                {"// REKASANDI"}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#f7f6f2]">
                DIGITAL PRODUCT STUDIO
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#7a7870] max-w-sm tracking-wide mt-2">
                Engineering category-defining web experiences & intelligent software.
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Row */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between font-mono text-xs text-[#7a7870]">
              <div className="flex items-center gap-2">
                <span className="text-[#f7f6f2] font-semibold">ASSETS PRELOAD</span>
                <span className="text-[#55544e]">/</span>
                <span>CACHE PREFETCH READY</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#d7ff3f]">
                  [{String(progress).padStart(3, "0")}%]
                </span>
              </div>
            </div>

            {/* Editorial Line Meter */}
            <div className="w-full h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#d7ff3f]/60 to-[#d7ff3f] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(215,255,63,0.8)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
