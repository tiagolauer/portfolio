import type { Transition } from 'framer-motion';

export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 190, damping: 26, mass: 1 };

export const SPRING_SNAPPY: Transition = { type: 'spring', stiffness: 420, damping: 30, mass: 0.9 };

export const ENTER_FROM = { opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' };

export const ENTER_TO = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };

export const PRESS = { scale: 0.97 };

export const HOVER_LIFT = { y: -4, scale: 1.01 };
