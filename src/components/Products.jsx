import React, { useMemo, useState } from 'react';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_PER_PAGE,
  getFeaturedHomeProducts,
  getProductsByCategory,
} from '../data/catalog';

function ProductCard({ prod, onProductClick }) {
  return (
    <div
      onClick={() => onProductClick?.(prod)}
      className="group bg-background p-6 md:p-8 flex flex-col h-full hover:bg-surface transition-colors cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onProductClick?.(prod);
      }}
    >
      {/* Top Tag: Brand / Origin in JetBrains Mono */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white bg-[#161833] px-2.5 py-0.5 rounded-[1px]">
          {prod.brand || 'Five Group'}
        </span>
        {prod.origin && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {prod.origin}
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square w-full flex items-center justify-center p-4 bg-white/50 overflow-hidden mb-6">
        <img
          src={prod.image}
          alt={prod.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <h3 className="font-display text-lg font-normal leading-snug text-foreground group-hover:text-navy transition-colors">
          {prod.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted font-light line-clamp-2">
          {prod.notes || 'Premium wholesale grade product distributed with full compliance controls.'}
        </p>

        {/* Footer Row */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-line/60">
          <span className="font-mono text-xs text-muted font-medium">
            {prod.priceText || 'Wholesale Inquire'}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-xs text-muted transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-foreground"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Products({
  onProductClick,
  limit,
  featured = false,
  heading,
  activeCategory = 'all',
  onSelectCategory,
  onCategoryChange,
  onViewAllProducts,
}) {
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const handleCategorySelect = (slug) => {
    setCurrentPageNum(1);
    onCategoryChange?.(slug);
    onSelectCategory?.({ slug });
  };

  const allProducts = useMemo(() => {
    if (featured) {
      if (activeCategory && activeCategory !== 'all') {
        return getProductsByCategory(activeCategory);
      }
      return getFeaturedHomeProducts();
    }
    return getProductsByCategory(activeCategory);
  }, [featured, activeCategory]);

  const displayedProducts = useMemo(() => {
    if (limit) {
      return allProducts.slice(0, limit);
    }
    const start = (currentPageNum - 1) * PRODUCTS_PER_PAGE;
    return allProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [allProducts, limit, currentPageNum]);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const scrollToCatalogTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(350);
    } else {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`border-t border-line px-6 bg-background ${
        featured ? 'py-24 md:py-32' : 'pt-32 pb-24 md:pt-44 md:pb-32'
      }`}
      id="products"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
              Curated Portfolio · Produits &amp; Marques
            </div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.04] tracking-tight font-[450] text-foreground">
              <span className="block overflow-hidden pb-[0.14em]">
                <span className="block">{heading || 'Wholesale Assortment & Food Lines'}</span>
              </span>
            </h2>
          </div>

          {featured && onViewAllProducts && (
            <button
              type="button"
              onClick={onViewAllProducts}
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground hover:text-[#161833] transition-colors pb-1 border-b border-foreground/30 hover:border-foreground self-start md:self-auto"
            >
              <span>View Full Catalog ({allProducts.length}+)</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          )}
        </div>

        {/* Category Tabs in Monospace Uppercase Tracking */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar border-b border-line">
          <div className="flex items-center gap-6 min-w-max">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`group relative font-mono text-xs uppercase tracking-[0.22em] py-2 transition-colors ${
                activeCategory === 'all'
                  ? 'text-foreground font-semibold'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              All Categories
              <span
                className={`absolute -bottom-2 left-0 h-0.5 w-full bg-[#161833] transition-transform duration-300 ${
                  activeCategory === 'all' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>

            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`group relative font-mono text-xs uppercase tracking-[0.22em] py-2 transition-colors ${
                    isSelected
                      ? 'text-foreground font-semibold'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {cat.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 w-full bg-[#161833] transition-transform duration-300 ${
                      isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid in Swiss Hairline Bento Style */}
        <div className="grid gap-px border border-line bg-line grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((prod) => (
            <ProductCard key={prod.id} prod={prod} onProductClick={onProductClick} />
          ))}
        </div>

        {/* Catalog Pagination (for full catalog view) */}
        {!limit && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
            <button
              type="button"
              disabled={currentPageNum === 1}
              onClick={() => {
                setCurrentPageNum((p) => Math.max(1, p - 1));
                scrollToCatalogTop();
              }}
              className="font-mono text-xs uppercase tracking-[0.22em] text-foreground disabled:opacity-30 hover:text-muted transition"
            >
              ← Previous Page
            </button>

            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Page {currentPageNum} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPageNum === totalPages}
              onClick={() => {
                setCurrentPageNum((p) => Math.min(totalPages, p + 1));
                scrollToCatalogTop();
              }}
              className="font-mono text-xs uppercase tracking-[0.22em] text-foreground disabled:opacity-30 hover:text-muted transition"
            >
              Next Page →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
