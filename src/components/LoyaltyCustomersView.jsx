import React from 'react'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { ButtonWithIcon } from '@/components/ui/button-witn-icon'
import { CLIENTS } from '@/data/clients'
import { TESTIMONIALS } from '@/data/companyFacts'

export default function LoyaltyCustomersView({ onNavigate }) {
  return (
    <div className="page-view loyalty-view">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">Our Business</p>
          <h1 className="section-title">loyalty customers</h1>
          <p className="section-desc">
            Trusted by leading hypermarkets, wholesalers, and trade partners across Qatar —
            the relationships that move Five Group every day.
          </p>
          <div className="content-page-actions">
            <ButtonWithIcon onClick={() => onNavigate?.('contact-us')}>
              I&apos;m a retailer
            </ButtonWithIcon>
            <button
              type="button"
              className="content-page-secondary"
              onClick={() => onNavigate?.('brands-partner')}
            >
              I&apos;m a brand
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal className="loyalty-count" delay={60}>
          <strong>{CLIENTS.length}</strong>
          <span>loyalty partners listed</span>
        </ScrollReveal>

        <ul className="loyalty-logo-grid" aria-label="Loyalty customer logos">
          {CLIENTS.map((client, index) => (
            <ScrollReveal as="li" key={client.id} delay={Math.min(index * 25, 280)}>
              <article className="loyalty-logo-card">
                <div className="loyalty-logo-frame">
                  <img src={client.image} alt="" loading="lazy" decoding="async" />
                </div>
                <h2 className="loyalty-logo-name">{client.name}</h2>
              </article>
            </ScrollReveal>
          ))}
        </ul>

        <section className="content-page-testimonials loyalty-testimonials" aria-label="Partner testimonials">
          <ScrollReveal className="content-page-block-head">
            <p className="section-eyebrow">Testimonials</p>
            <h2 className="section-title">What partners say</h2>
          </ScrollReveal>
          <div className="content-page-testimonial-grid">
            {TESTIMONIALS.map((item, index) => (
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
      </div>
    </div>
  )
}
