import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Only initialize smooth scroll on non-reduced-motion devices
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Exact BGS Law Lenis initialization
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    // Connect Lenis to GSAP Ticker matching BGS Law
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
