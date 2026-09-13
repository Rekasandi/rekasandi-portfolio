"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const isInitial = React.useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    // Flash brief progress bar on route change
    setIsNavigating(true);
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#0a0a0a] origin-left z-[9999] pointer-events-none"
        >
          {/* Accent glow tip */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#d7ff3f] shadow-[0_0_8px_#d7ff3f]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
