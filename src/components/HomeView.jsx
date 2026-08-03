import React, { useMemo, useState } from 'react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  GradientCard,
  GradientCardDescription,
  GradientCardTitle,
} from '@/components/ui/gradient-card';
import { NEWS_INTRO, NEWS_ITEMS } from '../data/news';
import { PRODUCT_CATEGORIES } from '../data/catalog';
import { SEO_FAQS } from '../data/seo';
import fleetImg from '../assets/locations/fleet.jpg';
import Hero from './Hero';
import Features from './Features';
import Locations from './Locations';
import Products from './Products';

const BEST_SELLERS_SLUG = 'best-sellers';

export default function HomeView({ onNavigate, onProductClick, onNewsClick }) {
  const [activeCategory, setActiveCategory] = useState(BEST_SELLERS_SLUG);

  const activeCategoryName = useMemo(() => {
    if (activeCategory === BEST_SELLERS_SLUG) return 'Best Sellers';
    return PRODUCT_CATEGORIES.find((cat) => cat.slug === activeCategory)?.name || 'Best Sellers';
  }, [activeCategory]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.slug);
  };

  return (
    <div className="home-view">
      <Hero onExplore={() => onNavigate('products')} onScrollDown={scrollToAbout} />

      <Features />

      <Products
        onProductClick={onProductClick}
        limit={8}
        featured
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onViewAllProducts={() => onNavigate('products')}
        showCategoryStrip
        heading={activeCategoryName}
      />

      <Locations onInquire={() => onNavigate('contact')} />

      <section className="news-section" id="news">
        <div className="container">
          <ScrollReveal className="news-header section-head">
            <p className="section-eyebrow">Updates</p>
            <h2 className="section-title">News and Events</h2>
            <p className="section-desc">{NEWS_INTRO}</p>
          </ScrollReveal>
          <div className="news-grid">
            {NEWS_ITEMS.slice(0, 4).map((item, index) => (
              <ScrollReveal as="article" key={item.id} delay={index * 100} className="news-card-wrap">
                <button
                  type="button"
                  className="news-card news-card--media"
                  onClick={() => onNewsClick?.(item)}
                  aria-label={`Read more: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="news-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="news-card-overlay" />
                  <div className="news-card-content">
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="news-section-cta" delay={200}>
            <ButtonWithIcon onClick={() => onNavigate('news')}>View all news</ButtonWithIcon>
          </ScrollReveal>
        </div>
      </section>

      <section className="home-fleet-faq-section" id="faq" aria-labelledby="home-faq-title">
        <div className="container">
          <div className="home-fleet-faq-row">
            <ScrollReveal variant="fade" delay={60} className="home-fleet-faq-cta">
              <article className="fleet-teaser-card">
                <div className="fleet-teaser-copy">
                  <p className="section-eyebrow">Distribution</p>
                  <h2>Vehicle Fleets</h2>
                  <p>
                    A strong distribution network supported by a large multi-temperature fleet —
                    moving dry, chilled, and frozen goods across Qatar every day.
                  </p>
                  <ButtonWithIcon onDark onClick={() => onNavigate('logistics')}>
                    Explore Logistics
                  </ButtonWithIcon>
                </div>
                <div
                  className="fleet-teaser-visual"
                  style={{ backgroundImage: `url('${fleetImg}')` }}
                  role="img"
                  aria-label="Five Group distribution fleet"
                />
              </article>
            </ScrollReveal>

            <div className="home-fleet-faq-panel">
              <ScrollReveal className="section-head home-fleet-faq-head">
                <p className="section-eyebrow">FAQ</p>
                <h2 className="section-title" id="home-faq-title">
                  Answers about Five Group
                </h2>
                <p className="section-desc">
                  Quick facts for partners, retailers, and brands evaluating distribution in Qatar.
                </p>
              </ScrollReveal>
              <div className="home-faq-list">
                {SEO_FAQS.map((item, index) => (
                  <ScrollReveal key={item.question} delay={Math.min(index * 60, 240)}>
                    <details className="home-faq-item">
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="container">
          <ScrollReveal variant="fade" delay={80}>
            <GradientCard
              tone="dark"
              showPattern={false}
              className="home-cta-card text-center"
              contentClassName="items-center justify-center text-center"
            >
              <p className="home-cta-eyebrow">Wholesale &amp; B2B</p>
              <GradientCardTitle className="mb-3 text-center text-white md:text-4xl">
                Partner with Five Group
              </GradientCardTitle>
              <GradientCardDescription className="mx-auto mb-7 max-w-xl text-center text-white/75">
                From global brands entering Qatar to retailers needing reliable bulk supply — our team
                is ready to support your distribution needs.
              </GradientCardDescription>
              <ButtonWithIcon onDark onClick={() => onNavigate('contact')}>
                Wholesale Inquiry
              </ButtonWithIcon>
            </GradientCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
