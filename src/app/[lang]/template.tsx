'use client';

import { motion } from 'framer-motion';
import { SPRING_SOFT } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.992, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={SPRING_SOFT}
    >
      {children}
    </motion.div>
  );
}
