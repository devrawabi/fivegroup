import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const ROTATING_WORDS = ['FMCG', 'Food', 'Non-Food', 'Cold-Chain', 'HORECA'];

export default function Hero() {
  const containerRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const darkenOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-navy text-white"
    >
      <motion.div
        data-hero-frame="true"
        initial={{
          clipPath:
            typeof window !== 'undefined' && window.innerWidth >= 768
              ? 'inset(22vh 18vw round 32px)'
              : 'inset(12vh 6vw round 24px)',
        }}
        animate={{ clipPath: 'inset(0vh 0vw round 0px)' }}
        transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }}
        className="absolute inset-0 overflow-hidden bg-navy shadow-2xl"
        style={{ willChange: 'clip-path' }}
        aria-hidden="true"
      >
        <motion.div
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 h-full w-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            poster="/hero/hero-bg.png"
            className="h-full w-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-[#1b1b1b]/75 via-[#1b1b1b]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1b1b1b]/45 via-[#1b1b1b]/20 to-[#1b1b1b]/80" />

        <motion.div
          data-hero-tint="true"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 bg-navy"
        />

        <motion.div
          data-hero-darken="true"
          style={{ opacity: darkenOpacity }}
          className="pointer-events-none absolute inset-0 bg-navy"
        />

        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-noise" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px overflow-hidden bg-white/10"
        >
          <div className="line-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky to-transparent opacity-60" />
        </div>
      </motion.div>

      <motion.div
        data-hero-content="true"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex min-h-[100svh] flex-col px-6 pb-10 pt-28 md:px-12 md:pb-16 md:pt-0"
      >
        <div className="mx-auto mt-auto w-full max-w-[1400px]">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.55rem,3.4vw,3rem)] font-[450] leading-[1.08] tracking-tight text-white"
            >
              <span className="block">An Enterprise Excelling</span>
              <span className="block">In Distribution Of</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 md:mt-4"
              aria-live="polite"
            >
              <div className="relative h-[1.15em] overflow-hidden font-display text-[clamp(1.55rem,3.4vw,3rem)] font-[450] leading-none tracking-tight text-sky">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={reduceMotion ? false : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 top-0 block"
                  >
                    {ROTATING_WORDS[wordIndex]}
                    <span className="text-white/50">.</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-lg text-[0.8125rem] font-light leading-relaxed text-white/75 md:mt-6 md:text-sm md:leading-[1.7]"
            >
              With two decades of expertise, we deliver seamless FMCG distribution across Qatar —
              sourcing quality products worldwide and supplying retail, restaurants, and hotels on
              time, every time.
            </motion.p>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
