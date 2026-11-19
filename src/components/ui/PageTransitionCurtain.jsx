import React, { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TransitionContext, usePageTransition } from './TransitionContext';

export { usePageTransition, TransitionContext };

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const curtainRef = useRef(null);
  const tlRef = useRef(null);

  // Keep curtain off-screen on mount. CSS already starts it at translateY(100%)
  // so first paint is never a solid navy cover (GSAP-only set was too late).
  useEffect(() => {
    if (curtainRef.current) {
      gsap.set(curtainRef.current, { yPercent: 100 });
    }
  }, []);

  // Exact BGS Law Page Transition Pipeline (GSAP Timeline)
  // Wipes UP to cover (0.45s power3.in), holds (0.18s), wipes UP to reveal (0.55s power3.out)
  const navigateWithTransition = useCallback((callback) => {
    const s = curtainRef.current;
    if (!s) {
      if (typeof callback === 'function') callback();
      return;
    }

    tlRef.current?.kill();
    setIsTransitioning(true);
    gsap.set(s, { yPercent: 100 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        tlRef.current = null;
        gsap.set(s, { yPercent: 100 });
      },
    });

    tl.to(s, {
      yPercent: 0,
      duration: 0.45,
      ease: 'power3.in',
    })
      .call(() => {
        if (typeof callback === 'function') {
          callback();
        }
        // Immediate scroll reset behind solid curtain
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      })
      .to({}, { duration: 0.18 })
      .to(s, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.out',
      });

    tlRef.current = tl;
  }, []);

  // Block wheel & touchmove during active transition (exact BGS Law listener)
  useEffect(() => {
    if (!isTransitioning) return;
    const prevent = (e) => e.preventDefault();
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
    };
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Logo-green page transition curtain */}
      <div
        ref={curtainRef}
        aria-hidden={!isTransitioning}
        className="pointer-events-none fixed inset-0 z-[80] bg-[#8abd3f]"
        style={{ willChange: 'transform', transform: 'translateY(100%)' }}
      />
    </TransitionContext.Provider>
  );
}
