import React from 'react';
import { NEWS_ARCHIVE_INTRO, NEWS_ITEMS } from '../data/news';

export default function NewsView({ onArticleClick }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-44">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
          Press & Media
        </div>
        <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.8rem)] font-[450] leading-[1.03] tracking-tight text-foreground">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">Company News</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">& Market Updates</span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted md:text-lg">
          {NEWS_ARCHIVE_INTRO}
        </p>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {NEWS_ITEMS.map((item) => (
              <li key={item.id} className="border border-line bg-background">
                <article
                  onClick={() => onArticleClick?.(item)}
                  className="group flex h-full cursor-pointer flex-col transition-colors hover:bg-surface"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onArticleClick?.(item);
                    }
                  }}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Press Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-[11px]">
                      <span>{item.date || '2026'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-navy">
                        {item.category || item.tag || 'Bulletin'}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-navy md:text-xl">
                      {item.title}
                    </h2>

                    {item.excerpt ? (
                      <p className="line-clamp-3 text-sm font-light leading-relaxed text-muted">
                        {item.excerpt}
                      </p>
                    ) : null}

                    <span className="mt-auto pt-3 font-mono text-xs text-muted transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-foreground">
                      Read article →
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />
    </div>
  );
}
