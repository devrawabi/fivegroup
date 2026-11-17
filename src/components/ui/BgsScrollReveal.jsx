import React from 'react';
import { motion } from 'framer-motion';

export function BgsScrollReveal({
  children,
  className = '',
  as: Component = 'div',
  y = 24,
  delay = 0,
  duration = 1.0,
}) {
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        ease: [0.25, 1, 0.5, 1], // exact power3.out from BGS Law
        delay,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default BgsScrollReveal;
