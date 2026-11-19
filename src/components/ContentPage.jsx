import React from 'react';
import { PAGE_CONTENT } from '@/data/pages';
import Locations from '@/components/Locations';
import BrandPortfolioGrid from '@/components/BrandPortfolioGrid';

export default function ContentPage({ pageId, onNavigate }) {
  const page = PAGE_CONTENT[pageId];

  if (!page) {
    return (
      <div className="bg-background text-foreground min-h-screen pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
            Section Introuvable · 404
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-foreground">
            Page Under Preparation
          </h1>
          <p className="text-muted font-light max-w-md mx-auto">
            This section is currently being updated in our commercial repository.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="font-mono text-xs uppercase tracking-[0.22em] bg-[#1b1b1b] text-white px-6 py-3 hover:bg-[#8abd3f] hover:text-[#1b1b1b] transition"
          >
            Return to Home →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Page Header matching BGS Law */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24 max-w-[1400px] mx-auto">
        <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
          {page.eyebrow || 'Information Note'}
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-foreground max-w-5xl">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">{page.title}</span>
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl">
          {page.lead}
        </p>

        {/* Highlights Row */}
        {page.highlights?.length ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
            {page.highlights.map((item) => (
              <div key={`${item.label}-${item.value}`} className="bg-background p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                  {item.label}
                </span>
                <span className="font-display text-2xl font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* 2. Structured Sections in Swiss Hairline Bento Grid */}
      {page.sections?.length ? (
        <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid gap-px bg-line border border-line md:grid-cols-2">
              {page.sections.map((sec, idx) => (
                <div key={sec.title} className="bg-background p-8 md:p-12 flex flex-col justify-between hover:bg-surface transition-colors">
                  <div>
                    <span className="font-mono text-xs text-[#1b1b1b] font-semibold block mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-2xl font-normal text-foreground mb-4">
                      {sec.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. Cards Grid */}
      {page.cards?.length ? (
        <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
              {page.cards.map((card, idx) => (
                <div key={card.title} className="bg-background p-8 hover:bg-surface transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-muted block mb-2">Item {idx + 1}</span>
                    <h4 className="font-display text-xl font-normal text-foreground mb-3">{card.title}</h4>
                    <p className="text-sm text-muted font-light leading-relaxed">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.showBrandsGrid && <BrandPortfolioGrid onNavigate={onNavigate} />}
      {page.showLocations && <Locations onInquire={() => onNavigate?.('contact')} />}
    </div>
  );
}
