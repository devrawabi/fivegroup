import React from 'react'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { ButtonWithIcon } from '@/components/ui/button-witn-icon'
import {
  GradientCard,
  GradientCardDescription,
  GradientCardTitle,
} from '@/components/ui/gradient-card'
import Locations from '@/components/Locations'
import BrandPortfolioGrid from '@/components/BrandPortfolioGrid'
import { PAGE_CONTENT } from '@/data/pages'

export default function ContentPage({ pageId, onNavigate }) {
  const page = PAGE_CONTENT[pageId]

  if (!page) {
    return (
      <div className="page-view">
        <div className="container">
          <header className="page-header">
            <p className="section-eyebrow">Five Group</p>
            <h1 className="section-title">Page not found</h1>
            <p className="section-desc">This section is being prepared. Please choose another page from the menu.</p>
            <ButtonWithIcon onClick={() => onNavigate?.('home')}>Back to home</ButtonWithIcon>
          </header>
        </div>
      </div>
    )
  }

  return (
    <div className="page-view content-page">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">{page.eyebrow}</p>
          <h1 className="section-title">{page.title}</h1>
          <p className="section-desc">{page.lead}</p>
          <div className="content-page-actions">
            {page.cta ? (
              <ButtonWithIcon onClick={() => onNavigate?.(page.cta.page)}>
                {page.cta.label}
              </ButtonWithIcon>
            ) : null}
            {page.secondaryCta ? (
              <button
                type="button"
                className="content-page-secondary"
                onClick={() => onNavigate?.(page.secondaryCta.page)}
              >
                {page.secondaryCta.label}
              </button>
            ) : null}
          </div>
        </ScrollReveal>

        {page.highlights?.length ? (
          <ScrollReveal className="content-page-highlights" delay={80}>
            {page.highlights.map((item) => (
              <div key={`${item.label}-${item.value}`} className="content-page-highlight">
                <span className="content-page-highlight-value">{item.value}</span>
                <span className="content-page-highlight-label">{item.label}</span>
              </div>
            ))}
          </ScrollReveal>
        ) : null}

        <div className="content-page-sections">
          {page.sections?.map((section, index) => (
            <ScrollReveal key={section.title} className="content-page-section" delay={index * 60}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </ScrollReveal>
          ))}
        </div>

        {page.cards?.length ? (
          <div className="content-page-cards">
            {page.cards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 70}>
                <GradientCard patternIndex={index % 4} className="page-card-shell content-page-card">
                  <GradientCardTitle className="mb-3 text-lg">{card.title}</GradientCardTitle>
                  <GradientCardDescription>{card.body}</GradientCardDescription>
                </GradientCard>
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        {page.badges?.length ? (
          <section className="content-page-badges" aria-label="Quality and compliance">
            <ScrollReveal className="content-page-block-head">
              <p className="section-eyebrow">Standards</p>
              <h2 className="section-title">Quality, safety &amp; compliance</h2>
            </ScrollReveal>
            <div className="content-page-badge-grid">
              {page.badges.map((badge, index) => (
                <ScrollReveal key={badge.title} delay={index * 60}>
                  <div className="content-page-badge">
                    <span className="content-page-badge-mark" aria-hidden="true" />
                    <h3>{badge.title}</h3>
                    <p>{badge.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        ) : null}

        {page.testimonials?.length ? (
          <section className="content-page-testimonials" aria-label="Partner testimonials">
            <ScrollReveal className="content-page-block-head">
              <p className="section-eyebrow">Partners</p>
              <h2 className="section-title">What partners say</h2>
            </ScrollReveal>
            <div className="content-page-testimonial-grid">
              {page.testimonials.map((item, index) => (
                <ScrollReveal key={item.name} delay={index * 70}>
                  <blockquote className="content-page-testimonial">
                    <p>&ldquo;{item.quote}&rdquo;</p>
                    <cite>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </cite>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </section>
        ) : null}

        {page.showBrandGrid ? <BrandPortfolioGrid /> : null}
      </div>

      {page.showLocations ? (
        <Locations onInquire={() => onNavigate?.('contact-us')} />
      ) : null}
    </div>
  )
}
