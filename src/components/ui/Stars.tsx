import * as React from "react";
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __starsCache?: Record<string, string>;
    __starsMountedOnce?: boolean;
  }
}

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

function getStableStarField(count: number, starColor: string) {
  if (typeof window === "undefined") {
    return generateStars(count, starColor);
  }

  window.__starsCache ??= {};
  const key = `${count}-${starColor}`;
  if (!window.__starsCache[key]) {
    window.__starsCache[key] = generateStars(count, starColor);
  }
  return window.__starsCache[key];
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  className,
  ...props
}: StarLayerProps) {
  // Keep star coordinates stable across remounts/page navigations.
  const boxShadow = React.useMemo(
    () => getStableStarField(count, starColor),
    [count, starColor],
  );

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn("absolute top-0 left-0 w-full h-[2000px]", className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
};

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#fff",
  ...props
}: StarsBackgroundProps) {
  const isFirstMount = typeof window !== "undefined" ? !window.__starsMountedOnce : true;

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.__starsMountedOnce = true;
    }
  }, []);

  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      data-slot="stars-background"
      className={cn("relative size-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Fade in only on first ever mount; skip on subsequent mounts (page navigation) */}
      <motion.div
        initial={isFirstMount ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={isFirstMount ? { duration: 0.6, ease: "easeOut" } : undefined}
        style={{ x: springX, y: springY }}
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: "linear" }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: "linear" }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}
