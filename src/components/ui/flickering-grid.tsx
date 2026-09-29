"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
}

export function FlickeringGrid({
  squareSize = 3,
  gridGap = 11,
  flickerChance = 0.06,
  color = "rgb(0 112 243)",
  maxOpacity = 0.12,
  className,
  ...props
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let squares = new Float32Array();
    let animationFrame = 0;
    let visible = false;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastFrame = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;

      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          const opacity = squares[column * rows + row];
          if (opacity < 0.01) continue;
          context.globalAlpha = opacity;
          context.fillRect(
            column * (squareSize + gridGap),
            row * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      columns = Math.ceil(width / (squareSize + gridGap));
      rows = Math.ceil(height / (squareSize + gridGap));
      squares = Float32Array.from(
        { length: columns * rows },
        () => Math.random() * maxOpacity,
      );
      draw();
    };

    const animate = (time: number) => {
      if (!visible || reducedMotion) return;
      animationFrame = requestAnimationFrame(animate);
      if (time - lastFrame < 100) return;
      lastFrame = time;

      for (let index = 0; index < squares.length; index++) {
        if (Math.random() < flickerChance) squares[index] = Math.random() * maxOpacity;
      }
      draw();
    };

    const start = () => {
      cancelAnimationFrame(animationFrame);
      if (visible && !reducedMotion) animationFrame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      reducedMotion = motionQuery.matches;
      start();
    };

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    motionQuery.addEventListener("change", updateMotion);
    resize();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, [color, flickerChance, gridGap, maxOpacity, squareSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
}
