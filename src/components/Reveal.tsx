'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ENTER_FROM, ENTER_TO, SPRING_SOFT } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className || undefined}
      initial={ENTER_FROM}
      animate={inView ? ENTER_TO : ENTER_FROM}
      transition={{ ...SPRING_SOFT, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
