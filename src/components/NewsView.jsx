import React from 'react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { NEWS_ARCHIVE_INTRO, NEWS_ITEMS } from '../data/news';

export default function NewsView({ onArticleClick }) {
  return (
    <div className="page-view news-page">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">Insights &amp; Archive</p>
          <h1 className="section-title">news and events</h1>
          <p className="section-desc mx-auto text-center">{NEWS_ARCHIVE_INTRO}</p>
        </ScrollReveal>

        <div className="news-archive-grid">
          {NEWS_ITEMS.map((item, index) => (
            <ScrollReveal
              as="article"
              key={item.id}
              className="news-card-wrap"
              delay={Math.min(index * 80, 240)}
            >
              <button
                type="button"
                className="news-card news-card--media"
                onClick={() => onArticleClick?.(item)}
                aria-label={`Read: ${item.title}`}
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
                  {item.tag ? <span className="news-card-tag">{item.tag}</span> : null}
                  {item.date ? <span className="news-card-date">{item.date}</span> : null}
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="news-card-cta">Read more</span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
