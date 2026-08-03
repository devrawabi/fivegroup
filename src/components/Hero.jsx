import React from 'react';
import { ArrowDown } from 'lucide-react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';

const HERO_BG = '/hero/hero-bg.png';

export default function Hero({ onExplore, onScrollDown }) {
  return (
    <section className="hero-section" aria-label="Five Group hero">
      <div className="hero-slideshow-container">
        <img
          className="hero-bg-image"
          src={HERO_BG}
          alt="Five Group Trading warehouse and product distribution in Qatar"
          width={1024}
          height={455}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-slide-overlay" />
      </div>

      <ScrollReveal className="hero-content" threshold={0.05} rootMargin="0px">
        <p className="hero-subtitle">Premium goods from</p>
        <h1 className="hero-title">five group</h1>
        <p className="hero-desc">
          Founded in 2006 as a premium division of Rawabi Group. With 500+ product lines,
          we bring trusted quality into homes and retail shelves across the Middle East.
        </p>
      </ScrollReveal>

      <ScrollReveal className="hero-action-block" variant="up" delay={280} threshold={0.05}>
        <ButtonWithIcon onDark onClick={onExplore}>
          Explore Catalog
        </ButtonWithIcon>
        <Button
          type="button"
          size="icon"
          className="arrow-down-btn size-12 shrink-0 rounded-full bg-primary text-primary-foreground"
          onClick={onScrollDown}
          aria-label="Scroll to about section"
        >
          <ArrowDown size={18} />
        </Button>
      </ScrollReveal>
    </section>
  );
}
