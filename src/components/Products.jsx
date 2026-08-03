import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_PER_PAGE,
  getFeaturedHomeProducts,
  getProductsByCategory,
} from '../data/catalog';
import { getHomeCategoryImage } from '../data/homeCategories';

function ProductCard({ prod, isFav, onToggleFavorite, onProductClick }) {
  return (
    <div
      className="product-card"
      onClick={() => onProductClick?.(prod)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onProductClick?.(prod);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="product-card-top">
        <button
          type="button"
          className={`product-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => onToggleFavorite(e, prod.id)}
          aria-label="Add to shortlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={isFav ? '#c45c4a' : 'none'}
            stroke={isFav ? '#c45c4a' : 'currentColor'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div className="product-img-wrapper">
          <img
            src={prod.image}
            alt={prod.name}
            className="product-img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="product-info">
        <span className="product-brand">{prod.brand}</span>
        <h3 className="product-name">{prod.name}</h3>
        <p className="product-notes">{prod.notes}</p>

        <div className="product-footer">
          <span className="product-price">{prod.priceText}</span>
          <button
            type="button"
            className="product-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onProductClick?.(prod);
            }}
            aria-label="View product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products({
  onProductClick,
  limit,
  featured = false,
  random = false,
  heading,
  activeCategory = 'all',
  onCategoryChange,
  onSelectCategory,
  onViewAllProducts,
  showCategoryStrip = false,
}) {
  const [favorites, setFavorites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const isFullCatalog = !limit;
  const bestSellersImage = useMemo(() => getFeaturedHomeProducts()[0]?.image || '', []);
  const stripCategories = useMemo(() => {
    const cats = PRODUCT_CATEGORIES.filter((cat) => cat.slug !== 'all').slice(0, 6);
    return [
      {
        id: 'best-sellers',
        slug: 'best-sellers',
        name: 'Best Sellers',
        image: bestSellersImage,
      },
      ...cats,
    ];
  }, [bestSellersImage]);

  const filteredProducts = useMemo(() => {
    if (
      activeCategory === 'best-sellers' ||
      (featured && (!activeCategory || activeCategory === 'all'))
    ) {
      return getFeaturedHomeProducts();
    }
    return getProductsByCategory(activeCategory);
  }, [activeCategory, featured]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    if (!isFullCatalog) {
      const pool = [...filteredProducts];
      if (random) {
        for (let i = pool.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
      }
      return pool.slice(0, limit);
    }
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, isFullCatalog, limit, random, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, isFullCatalog]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeCategoryMeta = PRODUCT_CATEGORIES.find((cat) => cat.slug === activeCategory);

  return (
    <ScrollReveal as="section" id="products" className={`products-section ${isFullCatalog ? 'products-section--full' : ''}`}>
      <div className="container">
        {showCategoryStrip && (
          <ScrollReveal delay={80} className="features-category-strip-wrap products-category-strip-wrap">
            <div className="features-category-strip" role="list" aria-label="Product categories">
              {stripCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="listitem"
                  className={`features-category-chip${activeCategory === cat.slug ? ' is-active' : ''}`}
                  aria-pressed={activeCategory === cat.slug}
                  onClick={() => onSelectCategory?.(cat)}
                >
                  <span className="features-category-chip-media">
                    <img
                      src={getHomeCategoryImage(cat.slug) || cat.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="features-category-chip-name">{cat.name}</span>
                </button>
              ))}

              <button
                type="button"
                className="features-category-more"
                onClick={() => onViewAllProducts?.()}
                aria-label="View all products"
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="products-header">
          <div className="products-header-copy">
            <p className="section-eyebrow">{isFullCatalog ? 'Products' : 'Catalog'}</p>
            <h2 className="section-title">{heading || 'Our Premium Trading Goods'}</h2>
            {isFullCatalog && (
              <p className="products-intro">
                Currently, Five Group holds an unavoidable position in the industry. We offer more
                than 500 product lines of the best quality.
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className={`products-layout ${isFullCatalog ? 'products-layout--with-sidebar' : ''}`}>
          {isFullCatalog && (
            <ScrollReveal variant="left" className="products-sidebar-wrap">
            <aside className="products-sidebar" aria-label="Product categories">
              <h3 className="products-sidebar-title">Categories</h3>
              <ul className="products-category-list">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`products-category-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                      onClick={() => onCategoryChange?.(cat.slug)}
                    >
                      <span>{cat.name}</span>
                      <span className="products-category-count">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            </ScrollReveal>
          )}

          <div className="products-main">
            {isFullCatalog && (
              <div className="products-results-bar">
                <p>
                  Showing <strong>{paginatedProducts.length}</strong> of{' '}
                  <strong>{filteredProducts.length}</strong> products
                  {activeCategoryMeta && activeCategory !== 'all' && (
                    <>
                      {' '}
                      in <strong>{activeCategoryMeta.name}</strong>
                    </>
                  )}
                </p>
              </div>
            )}

            <div className={`products-grid ${isFullCatalog ? 'products-grid--catalog' : ''}`}>
              {paginatedProducts.map((prod, index) => (
                <ScrollReveal key={prod.id} delay={Math.min((index % 4) * 70, 210)} threshold={0.12}>
                  <ProductCard
                    prod={prod}
                    isFav={!!favorites[prod.id]}
                    onToggleFavorite={toggleFavorite}
                    onProductClick={onProductClick}
                  />
                </ScrollReveal>
              ))}
            </div>

            {paginatedProducts.length === 0 && (
              <div className="products-empty">
                <p>No products found in this category.</p>
              </div>
            )}

            {isFullCatalog && totalPages > 1 && (
              <nav className="products-pagination" aria-label="Product pages">
                <button
                  type="button"
                  className="products-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <div className="products-page-list">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`products-page-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="products-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
