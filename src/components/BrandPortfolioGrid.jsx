import React, { useMemo, useState } from 'react'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { CATALOG, PRODUCT_CATEGORIES } from '@/data/catalog'

function buildBrandPortfolio() {
  const map = new Map()
  for (const product of CATALOG) {
    const name = (product.brand || '').trim()
    if (!name) continue
    const key = name.toLowerCase()
    if (map.has(key)) continue
    map.set(key, {
      id: key.replace(/\s+/g, '-'),
      name,
      category: product.category,
      image: product.image,
    })
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}

const BRANDS = buildBrandPortfolio()

export default function BrandPortfolioGrid() {
  const [active, setActive] = useState('all')

  const filters = useMemo(() => {
    const used = new Set(BRANDS.map((b) => b.category))
    return [
      { slug: 'all', name: 'All' },
      ...PRODUCT_CATEGORIES.filter((c) => c.slug !== 'all' && used.has(c.slug)).map((c) => ({
        slug: c.slug,
        name: c.name,
      })),
    ]
  }, [])

  const visible = useMemo(() => {
    if (active === 'all') return BRANDS
    return BRANDS.filter((b) => b.category === active)
  }, [active])

  return (
    <section className="brand-portfolio" aria-label="Brand portfolio by category">
      <ScrollReveal className="brand-portfolio-head">
        <p className="section-eyebrow">Portfolio</p>
        <h2 className="section-title">Brands by category</h2>
        <p className="section-desc">
          Filterable brand grid grouped from our live catalog — explore lines by category.
        </p>
      </ScrollReveal>

      <ScrollReveal className="brand-portfolio-filters" delay={60}>
        <div className="brand-portfolio-filter-row" role="tablist" aria-label="Brand categories">
          {filters.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              role="tab"
              aria-selected={active === filter.slug}
              className={`brand-portfolio-filter ${active === filter.slug ? 'is-active' : ''}`}
              onClick={() => setActive(filter.slug)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ul className="brand-portfolio-grid" aria-label="Brand logos">
        {visible.map((brand, index) => (
          <ScrollReveal as="li" key={brand.id} delay={Math.min(index * 30, 240)}>
            <article className="brand-portfolio-card">
              <div className="brand-portfolio-frame">
                <img src={brand.image} alt="" loading="lazy" decoding="async" />
              </div>
              <h3 className="brand-portfolio-name">{brand.name}</h3>
            </article>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  )
}
