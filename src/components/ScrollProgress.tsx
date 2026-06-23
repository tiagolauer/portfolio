'use client';

import { useScroll, motion } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'oklch(0.60 0.155 20)',
        transformOrigin: '0%',
        zIndex: 200,
      }}
    />
  );
}
