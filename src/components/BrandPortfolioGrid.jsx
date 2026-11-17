import React, { useMemo, useState } from 'react';
import { CATALOG, PRODUCT_CATEGORIES } from '@/data/catalog';

function buildBrandPortfolio() {
  const map = new Map();
  for (const product of CATALOG) {
    const name = (product.brand || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (map.has(key)) continue;
    map.set(key, {
      id: key.replace(/\s+/g, '-'),
      name,
      category: product.category,
      image: product.image,
    });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const BRANDS = buildBrandPortfolio();

export default function BrandPortfolioGrid() {
  const [active, setActive] = useState('all');

  const filters = useMemo(() => {
    const used = new Set(BRANDS.map((b) => b.category));
    return [
      { slug: 'all', name: 'All Categories' },
      ...PRODUCT_CATEGORIES.filter((c) => c.slug !== 'all' && used.has(c.slug)).map((c) => ({
        slug: c.slug,
        name: c.name,
      })),
    ];
  }, []);

  const visible = useMemo(() => {
    if (active === 'all') return BRANDS;
    return BRANDS.filter((b) => b.category === active);
  }, [active]);

  return (
    <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
            Brand Roster · Portefeuille
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
            Distributed Brands &amp; Manufacturer Labels
          </h2>
        </div>

        {/* Filter Pills in Monospace */}
        <div className="mb-12 flex flex-wrap gap-2 border-b border-line pb-6">
          {filters.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActive(filter.slug)}
              className={`font-mono text-xs uppercase tracking-[0.18em] px-4 py-2 transition-all ${
                active === filter.slug
                  ? 'bg-[#161833] text-white'
                  : 'bg-background border border-line text-muted hover:text-foreground'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Hairline Bento Grid */}
        <ul className="grid gap-px bg-line border border-line grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 list-none p-0 m-0">
          {visible.map((brand) => (
            <li
              key={brand.id}
              className="bg-background p-6 flex flex-col items-center justify-between text-center hover:bg-surface transition-colors aspect-square"
            >
              <div className="flex-1 flex items-center justify-center p-2 w-full">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-20 max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="font-display text-xs font-medium text-foreground tracking-tight mt-2">
                {brand.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
