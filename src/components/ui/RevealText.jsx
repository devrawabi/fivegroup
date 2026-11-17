import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function RevealText({
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.08,
  ...rest
}) {
  const ref = useRef(null);
  // Observe the heading itself — not the clipped motion lines.
  // Lines start at y:110% inside overflow:hidden, so whileInView on them
  // never intersects and the text stays invisible forever.
  const isInView = useInView(ref, { once: true, amount: 0.25, margin: '0px 0px -8% 0px' });

  const lines = Array.isArray(children)
    ? children
    : typeof children === 'string'
      ? children.split('\n').filter(Boolean)
      : [children];

  return (
    <Component ref={ref} className={className} {...rest}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-[0.18em]">
          <motion.span
            data-reveal-line="true"
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + idx * stagger,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

export default RevealText;
