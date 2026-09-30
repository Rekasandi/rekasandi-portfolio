"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface InfiniteScrollingImagesItem {
  alt?: string;
  src: string;
}

export interface InfiniteScrollingImagesProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Enable automatic frame progression. @default false */
  autoplay?: boolean;
  /** Seconds between auto-advance steps when autoplay is enabled. @default 3 */
  autoplayIntervalSeconds?: number;
  /** Vertical spacing between cards in pixels. @default -30 */
  frameOffset?: number;
  /** Number of visible cards (excluding buffered cards). @default 3 */
  framesVisible?: number;
  /** Cards to display in an infinite loop. */
  items: InfiniteScrollingImagesItem[];
  /** Stop at the first and last item instead of looping. @default true */
  infinite?: boolean;
  /** Whether ArrowUp / ArrowDown keys should move frames. @default true */
  keyboardControls?: boolean;
  /** Minimum ms between frame updates while scrolling. @default 75 */
  minUpdateInterval?: number;
  /** Number of cards rendered before/after visible range. @default 8 */
  renderBuffer?: number;
  /** Notifies when the active image index changes. */
  onActiveIndexChange?: (index: number) => void;
  /** Scroll delta threshold before moving to next frame. @default 40 */
  scrollThreshold?: number;
}

const REMOTE_IMAGE_SRC = /^https?:\/\//;

function isRemoteImageSrc(src: string): boolean {
  return REMOTE_IMAGE_SRC.test(src);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

function InfiniteScrollingImages({
  autoplay = false,
  autoplayIntervalSeconds = 3,
  className,
  frameOffset = -30,
  framesVisible = 3,
  items,
  infinite = true,
  keyboardControls = true,
  minUpdateInterval = 75,
  renderBuffer = 8,
  onActiveIndexChange,
  scrollThreshold = 40,
  ...props
}: InfiniteScrollingImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulatorRef = useRef(0);
  // Seeded at 0, not Date.now(): reading the clock during render breaks
  // Next.js static prerendering. The actual value doesn't matter here — it
  // only needs to be far enough in the past that the first scroll flush
  // isn't throttled by the `elapsed < minUpdateInterval` check below.
  const lastUpdateTimeRef = useRef(0);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (items.length > 0) {
      onActiveIndexChange?.(infinite
        ? wrapIndex(currentIndex, items.length)
        : clamp(currentIndex, 0, items.length - 1));
    }
  }, [currentIndex, infinite, items.length, onActiveIndexChange]);

  const updateFrame = useCallback(
    (delta: number) => {
      if (items.length === 0 || delta === 0) {
        return;
      }
      setCurrentIndex((previous) =>
        infinite
          ? previous + delta
          : clamp(previous + delta, 0, items.length - 1)
      );
    },
    [infinite, items.length]
  );

  const shouldReleaseToPage = useCallback(
    (delta: number) =>
      !infinite && (
        (delta > 0 && currentIndex >= items.length - 1) ||
        (delta < 0 && currentIndex <= 0)
      ),
    [currentIndex, infinite, items.length]
  );

  const flushScrollAccumulator = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastUpdateTimeRef.current;

    if (Math.abs(scrollAccumulatorRef.current) < scrollThreshold) {
      return;
    }

    if (elapsed < minUpdateInterval) {
      return;
    }

    const delta = scrollAccumulatorRef.current > 0 ? 1 : -1;
    updateFrame(delta);
    scrollAccumulatorRef.current = 0;
    lastUpdateTimeRef.current = now;
  }, [minUpdateInterval, scrollThreshold, updateFrame]);

  useEffect(() => {
    if (!keyboardControls) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        updateFrame(1);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        updateFrame(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [keyboardControls, updateFrame]);

  useEffect(() => {
    if (!autoplay || items.length === 0) {
      return;
    }

    const intervalMs = Math.max(0.25, autoplayIntervalSeconds) * 1000;
    const intervalId = window.setInterval(() => {
      updateFrame(1);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoplay, autoplayIntervalSeconds, items.length, updateFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (shouldReleaseToPage(event.deltaY)) {
        scrollAccumulatorRef.current = 0;
        return;
      }
      event.preventDefault();
      scrollAccumulatorRef.current += event.deltaY;
      flushScrollAccumulator();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - touchY;
      touchStartYRef.current = touchY;
      if (shouldReleaseToPage(deltaY)) {
        scrollAccumulatorRef.current = 0;
        return;
      }
      event.preventDefault();
      scrollAccumulatorRef.current += deltaY;
      flushScrollAccumulator();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [flushScrollAccumulator, shouldReleaseToPage]);

  const safeFramesVisible = Math.max(1, framesVisible);
  const start = currentIndex - renderBuffer;
  const end = currentIndex + safeFramesVisible + renderBuffer;
  const visibleCards: Array<{ imageIndex: number; index: number }> = [];
  const firstIndex = infinite ? start : Math.max(0, start);
  const lastIndex = infinite ? end : Math.min(items.length - 1, end);

  for (let index = firstIndex; index <= lastIndex; index += 1) {
    visibleCards.push({
      imageIndex: infinite ? wrapIndex(index, items.length) : index,
      index,
    });
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      ref={containerRef}
      {...props}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {visibleCards.map((card) => {
          const item = items[card.imageIndex];
          if (!item) {
            return null;
          }

          const offsetIndex = card.index - currentIndex;
          const blur = currentIndex > card.index ? 2 : 0;
          const opacity = currentIndex > card.index ? 0 : 1;
          const scale = clamp(1 - offsetIndex * 0.08, 0.08, 2);
          const y = clamp(
            offsetIndex * frameOffset,
            frameOffset * safeFramesVisible,
            Number.POSITIVE_INFINITY
          );

          return (
            <motion.div
              animate={{
                scale,
                y,
                transition: {
                  damping: 20,
                  mass: 0.5,
                  stiffness: 250,
                  type: "spring",
                },
              }}
              className="absolute aspect-video w-[94%] max-w-[1100px] overflow-hidden rounded-lg bg-black shadow-2xl lg:aspect-[2.1/1]"
              initial={false}
              key={card.index}
              style={{
                filter: `blur(${blur}px)`,
                opacity,
                transitionDuration: "200ms",
                transitionProperty: "opacity, filter",
                transitionTimingFunction: "ease-in-out",
                willChange: "opacity, filter, transform",
                zIndex: 1000 - card.index,
              }}
            >
              <Image
                alt={item.alt ?? ""}
                className="h-full w-full object-cover"
                draggable={false}
                fill
                referrerPolicy={
                  isRemoteImageSrc(item.src) ? "no-referrer" : undefined
                }
                sizes="(max-width: 768px) 85vw, 800px"
                src={item.src}
                unoptimized={isRemoteImageSrc(item.src)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export { InfiniteScrollingImages };
