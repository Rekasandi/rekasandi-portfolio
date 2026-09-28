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
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background text-foreground p-8 sm:p-14 select-none pointer-events-auto border-b border-border shadow-2xl"
        >
          {/* Top Clean Editorial Row */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-muted-foreground tracking-widest uppercase border-b border-border pb-6">
            <span className="text-foreground font-medium">REKASANDI</span>
            <span>JAKARTA</span>
          </div>

          {/* Center Brand Identity */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-foreground">
                REKASANDI
              </h1>
              <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-widest uppercase mt-3">
                DIGITAL PRODUCT STUDIO
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Row */}
          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex items-end justify-between font-mono text-xs text-muted-foreground">
              <span className="text-muted-foreground tracking-widest uppercase">LOADING EXPERIENCE</span>
              <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
                [{String(progress).padStart(3, "0")}%]
              </span>
            </div>

            {/* Editorial Line Meter */}
            <div className="w-full h-[2px] bg-muted rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-accent transition-[width] duration-75 ease-out"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
