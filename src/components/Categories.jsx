import React from 'react';
import { PRODUCT_CATEGORIES } from '../data/catalog';
import { getHomeCategoryImage } from '../data/homeCategories';
import ScrollReveal from '@/components/ui/scroll-reveal';

export default function Categories({ onSelect, limit = 4 }) {
  const categoriesList = PRODUCT_CATEGORIES.filter((cat) => cat.slug !== 'all').slice(0, limit);

  return (
    <section id="categories" className="categories-section">
      <div className="container">
        <ScrollReveal className="section-head">
          <p className="section-eyebrow">Product Lines</p>
          <h2 className="section-title">Categories</h2>
          <p className="section-desc">
            More than 500 product lines across grocery essentials and specialty imports.
          </p>
        </ScrollReveal>
        <div className="categories-grid">
          {categoriesList.map((cat, index) => (
            <ScrollReveal
              key={cat.id}
              delay={index * 80}
              variant={index % 2 === 0 ? 'up' : 'fade'}
            >
              <button
                type="button"
                className="category-card"
                onClick={() => onSelect?.(cat)}
              >
                <img
                  src={getHomeCategoryImage(cat.slug) || cat.image}
                  alt=""
                  className="category-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="category-overlay" />
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} products</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
