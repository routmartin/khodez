import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function MagneticLink({ href, className = "", children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Motion values to drive hardware-accelerated coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Bind values with clean physical springs
  const springConfig = { damping: 15, stiffness: 200, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate item midpoint of coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance offset
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Magnetic pull ratio
    const pullRatio = 0.35;
    x.set(deltaX * pullRatio);
    y.set(deltaY * pullRatio);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <span className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </span>
    </motion.a>
  );
}
