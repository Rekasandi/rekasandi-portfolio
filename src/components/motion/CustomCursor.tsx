"use client";

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "pointer" | "project" | "drag" | "hidden";

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  cursorText: "",
  setCursorVariant: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setVariant] = useState<CursorVariant>("default");
  const [cursorText, setText] = useState("");

  const setCursorVariant = (variant: CursorVariant, text = "") => {
    setVariant(variant);
    setText(text);
  };

  const resetCursor = () => {
    setVariant("default");
    setText("");
  };

  return (
    <CursorContext.Provider
      value={{ cursorVariant, cursorText, setCursorVariant, resetCursor }}
    >
      {children}
      <CustomCursorInner variant={cursorVariant} text={cursorText} />
    </CursorContext.Provider>
  );
}

function subscribeMedia(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mqlFine = window.matchMedia("(pointer: fine)");
  const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  mqlFine.addEventListener("change", callback);
  mqlReduced.addEventListener("change", callback);
  return () => {
    mqlFine.removeEventListener("change", callback);
    mqlReduced.removeEventListener("change", callback);
  };
}

function getCanUseCursorSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return hasFinePointer && !prefersReduced;
}

function getServerSnapshot(): boolean {
  return false;
}

function CustomCursorInner({
  variant,
  text,
}: {
  variant: CursorVariant;
  text: string;
}) {
  const canUseCursor = useSyncExternalStore(subscribeMedia, getCanUseCursorSnapshot, getServerSnapshot);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    if (!canUseCursor) return;

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [canUseCursor, mouseX, mouseY]);

  if (!canUseCursor || !isVisible || variant === "hidden") {
    return null;
  }

  const isPill = variant === "project" || variant === "drag";

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: springX,
        y: springY,
      }}
    >
      {isPill ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="bg-[#0a0a0a] text-[#d7ff3f] px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider flex items-center gap-1.5 shadow-xl whitespace-nowrap border border-black/20"
        >
          {text || (variant === "project" ? "VIEW PROJECT ↗" : "DRAG ← →")}
        </motion.div>
      ) : variant === "pointer" ? (
        <motion.div
          animate={{ scale: 1.8, opacity: 0.85 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="size-8 rounded-full border border-[#0a0a0a]/30 bg-[#0a0a0a]/5 backdrop-blur-[1px]"
        />
      ) : (
        <div className="relative flex items-center justify-center">
          <div className="size-2.5 rounded-full bg-[#0a0a0a]" />
          <div className="absolute size-7 rounded-full border border-[#0a0a0a]/20" />
        </div>
      )}
    </motion.div>
  );
}

export default CursorProvider;
